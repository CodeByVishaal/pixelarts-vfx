require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

async function resetAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('🗑 Clearing old admins...');
    await Admin.deleteMany({});

    console.log('👑 Creating new default admin...');
    const admin = new Admin({
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'superadmin',
      isActive: true
    });

    await admin.save();
    console.log('✅ Admin created:', admin.username, admin.email);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error resetting admin:', err);
    process.exit(1);
  }
}

resetAdmin();