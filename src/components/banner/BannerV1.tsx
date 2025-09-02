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
            top: "50%",
            left: "50%",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
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
