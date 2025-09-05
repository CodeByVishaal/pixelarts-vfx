const express = require('express');
const { query } = require('express-validator');
const Admin = require('../models/Admin');
const Media = require('../models/Media');
const { verifyToken, requireSuperAdmin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get dashboard statistics
// @access  Private (Admin only)
router.get('/dashboard', verifyToken, async (req, res) => {
  try {
    // Get media statistics
    const mediaStats = await Media.getStats();
    
    // Get admin statistics (if superadmin)
    let adminStats = null;
    if (req.admin.role === 'superadmin') {
      adminStats = await Admin.getStats();
    }

    // Recent uploads (last 7 days)
    const recentUploads = await Media.find({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      isActive: true
    }).select('title type createdAt').sort({ createdAt: -1 }).limit(10);

    res.json({
      success: true,
      data: {
        mediaStats: mediaStats[0] || {},
        adminStats: adminStats ? adminStats[0] : null,
        recentUploads,
        currentAdmin: {
          username: req.admin.username,
          role: req.admin.role,
          lastLogin: req.admin.lastLogin
        }
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/admin/admins
// @desc    Get all admins (superadmin only)
// @access  Private (Superadmin only)
router.get('/admins', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
], verifyToken, requireSuperAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [admins, total] = await Promise.all([
      Admin.find({})
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Admin.countDocuments({})
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        admins,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/admin/admins/:id/status
// @desc    Update admin status (activate/deactivate)
// @access  Private (Superadmin only)
router.put('/admins/:id/status', verifyToken, requireSuperAdmin, async (req, res) => {
  try {
    const { isActive } = req.body;
    const adminId = req.params.id;

    // Prevent deactivating yourself
    if (adminId === req.admin._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot deactivate your own account'
      });
    }

    const admin = await Admin.findByIdAndUpdate(
      adminId,
      { isActive, updatedAt: Date.now() },
      { new: true, select: '-password' }
    );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      message: `Admin ${isActive ? 'activated' : 'deactivated'} successfully`,
      data: { admin }
    });

  } catch (error) {
    console.error('Update admin status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   DELETE /api/admin/admins/:id
// @desc    Delete admin (superadmin only)
// @access  Private (Superadmin only)
router.delete('/admins/:id', verifyToken, requireSuperAdmin, async (req, res) => {
  try {
    const adminId = req.params.id;

    // Prevent deleting yourself
    if (adminId === req.admin._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }

    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Check if admin has uploaded media
    const mediaCount = await Media.countDocuments({ uploadedBy: adminId });

    if (mediaCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete admin who has uploaded ${mediaCount} media items. Deactivate instead.`
      });
    }

    await Admin.findByIdAndDelete(adminId);

    res.json({
      success: true,
      message: 'Admin deleted successfully'
    });

  } catch (error) {
    console.error('Delete admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/admin/media
// @desc    Get all media for admin management
// @access  Private (Admin only)
router.get('/media', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('type').optional().isIn(['image', 'video']),
  query('category').optional().isIn(['showreel', 'portfolio', 'demo', 'tutorial', 'behind-scenes']),
  query('isActive').optional().isBoolean(),
  query('search').optional().isLength({ max: 100 })
], verifyToken, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      type,
      category,
      isActive,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query (admins can see inactive media too)
    const query = {};
    
    if (type) query.type = type;
    if (category) query.category = category;
    if (isActive !== undefined) query.isActive = isActive === 'true';
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;
    
    const [media, total] = await Promise.all([
      Media.find(query)
        .populate('uploadedBy', 'username email')
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit)),
      Media.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        media,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get admin media error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/admin/media/:id/toggle-status
// @desc    Toggle media active status
// @access  Private (Admin only)
router.put('/media/:id/toggle-status', verifyToken, async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found'
      });
    }

    media.isActive = !media.isActive;
    media.updatedAt = Date.now();
    await media.save();

    await media.populate('uploadedBy', 'username');

    res.json({
      success: true,
      message: `Media ${media.isActive ? 'activated' : 'deactivated'} successfully`,
      data: { media }
    });

  } catch (error) {
    console.error('Toggle media status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;