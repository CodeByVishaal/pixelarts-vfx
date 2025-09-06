import { useState, useEffect } from 'react';
import './BannerV1.css';

const BannerV1 = () => {
  const [videoError, setVideoError] = useState(false);

  const handleVideoError = () => {
    setVideoError(true);
    console.log('Video failed to load');
  };

  useEffect(() => {
    // Reset video error state when component mounts
    setVideoError(false);
  }, []);

  return (
    <div className={`banner-style-one-area ${videoError ? 'video-error' : ''}`}>
      {/* Video overlay for better text visibility */}
      <div className="video-overlay"></div>

      {/* Video container */}
      <div className="video-container">
        <video
          className="background-video"
          autoPlay
          loop
          muted
          playsInline
          onError={handleVideoError}
        >
          <source src="/assets/video/hero animation.m4v" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Fallback background in case video fails */}
        <div 
          className="video-fallback"
          style={{ backgroundImage: 'url(/assets/img/banner/banner-bg.jpg)' }}
        ></div>
      </div>

      {/* Banner content */}
      <div className="banner-content">
        <div className="container">
          <div className="row">
            <div className="col-xl-7">
              <div className="banner-style-one-heading">
                <div className="banner-title">
                  <h2 className="title-left split-text"></h2>
                  <h2 className="title-right split-text"></h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerV1;
