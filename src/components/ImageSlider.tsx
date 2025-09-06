import React from "react";
import ImageCompare from "./ImageCompare";

const ImageSlider: React.FC = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-white">VFX Before & After</h2>
      <div className="row g-4">
        <div className="col-md-6 col-12">
          <ImageCompare
            leftImage="https://feathervfx.com/assets/images/services/ROTO_OUT.jpg"
            rightImage="https://feathervfx.com/assets/images/services/ROTO_IN.jpg"
            height="450px"
          />
          <p className="text-white mt-3 text-center">Rotoscope</p>
        </div>

        <div className="col-md-6 col-12">
          <ImageCompare
            leftImage="https://feathervfx.com/assets/images/services/PP-IN.jpeg"
            rightImage="https://feathervfx.com/assets/images/services/PP-OUT.jpeg"
            height="450px"
          />
          <p className="text-white mt-3 text-center">Paint Prep</p>
        </div>

        <div className="col-md-6 col-12">
          <ImageCompare
            leftImage="https://feathervfx.com/assets/images/services/COS_OUT.jpg"
            rightImage="https://feathervfx.com/assets/images/services/COS_IN.jpg"
            height="450px"
          />
          <p className="text-white mt-3 text-center">Cosmetic Fix</p>
        </div>

        <div className="col-md-6 col-12">
          <ImageCompare
            leftImage="https://feathervfx.com/assets/images/services/MM_IN.jpg"
            rightImage="https://feathervfx.com/assets/images/services/MM_OUT.jpg"
            height="450px"
          />
          <p className="text-white mt-3 text-center">Compositing</p>
        </div>

        <div className="col-md-6 col-12">
          <ImageCompare
            leftImage="https://feathervfx.com/assets/images/services/COMP_OUT.jpeg"
            rightImage="https://feathervfx.com/assets/images/services/COMP_IN.jpeg"
            height="450px"
          />
          <p className="text-white mt-3 text-center">Matchmove</p>
        </div>
        <div className="col-md-6 col-12">
          <ImageCompare
            leftImage="assets/img/portfolio/2D_left.png"
            rightImage="assets/img/portfolio/2D_right.png"
            height="450px"
          />
          <p className="text-white mt-3 text-center">2D</p>
        </div>
        <div className="col-md-6 col-12">
          <ImageCompare
            leftImage="assets/img/portfolio/cg_left.png"
            rightImage="assets/img/portfolio/cg_right.jpeg"
            height="450px"
          />
          <p className="text-white mt-3 text-center">Color Grading</p>
        </div>
        <div className="col-md-6 col-12">
          <ImageCompare
            leftImage="assets/img/portfolio/3D_left.png"
            rightImage="assets/img/portfolio/3D_right.png"
            height="450px"
          />
          <p className="text-white mt-3 text-center">3D</p>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
