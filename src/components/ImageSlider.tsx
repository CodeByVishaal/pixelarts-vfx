import React from "react";
import left_twod from "../../public/assets/img/portfolio/2D_left.png";
import right_twod from "../../public/assets/img/portfolio/2D_right.png";
import cg_left from "../../public/assets/img/portfolio/cg_left.png";
import cg_right from "../../public/assets/img/portfolio/cg_right.jpeg";
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
            height="250px"
          />
          <p className="text-white mt-3 text-center">Rotoscope</p>
        </div>

        <div className="col-md-6 col-12">
          <ImageCompare
            leftImage="https://feathervfx.com/assets/images/services/PP-IN.jpeg"
            rightImage="https://feathervfx.com/assets/images/services/PP-OUT.jpeg"
            height="250px"
          />
          <p className="text-white mt-3 text-center">Paint Prep</p>
        </div>

        <div className="col-md-6 col-12">
          <ImageCompare
            leftImage="https://feathervfx.com/assets/images/services/COS_OUT.jpg"
            rightImage="https://feathervfx.com/assets/images/services/COS_IN.jpg"
            height="250px"
          />
          <p className="text-white mt-3 text-center">Cosmetic Fix</p>
        </div>

        <div className="col-md-6 col-12">
          <ImageCompare
            leftImage="https://feathervfx.com/assets/images/services/MM_IN.jpg"
            rightImage="https://feathervfx.com/assets/images/services/MM_OUT.jpg"
            height="250px"
          />
          <p className="text-white mt-3 text-center">Compositing</p>
        </div>

        <div className="col-md-6 col-12">
          <ImageCompare
            leftImage="https://feathervfx.com/assets/images/services/COMP_OUT.jpeg"
            rightImage="https://feathervfx.com/assets/images/services/COMP_IN.jpeg"
            height="250px"
          />
          <p className="text-white mt-3 text-center">Matchmove</p>
        </div>
        <div className="col-md-6 col-12">
          <ImageCompare
            leftImage={cg_left}
            rightImage={cg_right}
            height="250px"
          />
          <p className="text-white mt-3 text-center">Color Grading</p>
        </div>
        <div className="col-md-6 col-12">
          <ImageCompare
            leftImage={left_twod}
            rightImage={right_twod}
            height="250px"
          />
          <p className="text-white mt-3 text-center">2D</p>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
