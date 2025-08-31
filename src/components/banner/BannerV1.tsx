const BannerV1 = () => {
  return (
    <>
      <div className="banner-style-one-area bg-cover">
        <video
          className="background-video"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        >
          <source src="/assets/video/LogoAnimation.m4v" type="video/mp4" />
        </video>

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
    </>
  );
};

export default BannerV1;
