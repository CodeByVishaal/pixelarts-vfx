import ImageCompare from "./ImageCompare";

const ImageSlider = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-8">
      <h1 className="text-3xl font-bold text-center text-white mt-5 mb-8">
        VFX Before & After
      </h1>

      <div className="flex image-slider space-x-6 overflow-x-auto">
        <div className="w-[350px] h-auto flex flex-col items-center">
          <ImageCompare
            leftImage="https://feathervfx.com/assets/images/services/ROTO_OUT.jpg"
            rightImage="https://feathervfx.com/assets/images/services/ROTO_IN.jpg"
          />
          <p className="text-white mt-4 text-center">Rotoscope</p>
        </div>
        <div className="w-[350px] h-auto flex flex-col items-center">
          <ImageCompare
            leftImage="https://feathervfx.com/assets/images/services/PP-IN.jpeg"
            rightImage="https://feathervfx.com/assets/images/services/PP-OUT.jpeg"
          />
          <p className="text-white mt-4 text-center">Paint Prep</p>
        </div>

        <div className="w-[350px] h-auto flex flex-col items-center">
          <ImageCompare
            leftImage="https://feathervfx.com/assets/images/services/COS_OUT.jpg"
            rightImage="https://feathervfx.com/assets/images/services/COS_IN.jpg"
          />
          <p className="text-white mt-4 text-center">Cosmetic Fix</p>
        </div>

        <div className="w-[350px] h-auto flex flex-col items-center">
          <ImageCompare
            leftImage="https://feathervfx.com/assets/images/services/MM_IN.jpg"
            rightImage="https://feathervfx.com/assets/images/services/MM_OUT.jpg"
          />
          <p className="text-white mt-4 text-center">Compositing</p>
        </div>

        <div className="w-[350px] h-auto flex flex-col items-center">
          <ImageCompare
            leftImage="https://feathervfx.com/assets/images/services/COMP_OUT.jpeg"
            rightImage="https://feathervfx.com/assets/images/services/COMP_IN.jpeg"
          />
          <p className="text-white mt-4 text-center">Matchmove</p>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
