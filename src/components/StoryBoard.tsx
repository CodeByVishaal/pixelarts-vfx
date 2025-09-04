import React from "react";
import "../assets/css/gallery.css";
import ImageCompare from "./ImageCompare";

const StoryBoard: React.FC = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4" style={{ color: "#fff" }}>
        Story Board
      </h2>
      <div className="row g-4">
        <div className="col-lg-4 col-md-6 col-12">
          <ImageCompare
            leftImage="/assets/img/storyboard/1.jpg"
            rightImage="/assets/img/finalout/1.jpg"
          />
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          <ImageCompare
            leftImage="/assets/img/storyboard/2.jpg"
            rightImage="/assets/img/finalout/2.jpg"
          />
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          <ImageCompare
            leftImage="/assets/img/storyboard/3.jpg"
            rightImage="/assets/img/finalout/3.jpg"
          />
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          <ImageCompare
            leftImage="/assets/img/storyboard/4.jpg"
            rightImage="/assets/img/finalout/4.gif"
          />
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          <ImageCompare
            leftImage="/assets/img/storyboard/5.jpg"
            rightImage="/assets/img/finalout/5.jpg"
          />
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          <ImageCompare
            leftImage="/assets/img/storyboard/6.jpg"
            rightImage="/assets/img/finalout/6.jpg"
          />
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          <ImageCompare
            leftImage="/assets/img/storyboard/7.jpg"
            rightImage="/assets/img/finalout/7.jpg"
          />
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          <ImageCompare
            leftImage="/assets/img/storyboard/8.jpg"
            rightImage="/assets/img/finalout/8.jpg"
          />
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          <ImageCompare
            leftImage="/assets/img/storyboard/9.jpg"
            rightImage="/assets/img/finalout/9.jpg"
          />
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          <ImageCompare
            leftImage="/assets/img/storyboard/10.jpg"
            rightImage="/assets/img/finalout/10.jpg"
          />
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          <ImageCompare
            leftImage="/assets/img/storyboard/11.jpg"
            rightImage="/assets/img/finalout/11.jpg"
          />
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          <ImageCompare
            leftImage="/assets/img/storyboard/12.jpg"
            rightImage="/assets/img/finalout/12.jpg"
          />
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          <ImageCompare
            leftImage="/assets/img/storyboard/13.jpg"
            rightImage="/assets/img/finalout/13.jpg"
          />
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          <ImageCompare
            leftImage="/assets/img/storyboard/14.jpg"
            rightImage="/assets/img/finalout/14.jpg"
          />
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          <ImageCompare
            leftImage="/assets/img/storyboard/15.jpg"
            rightImage="/assets/img/finalout/15.jpg"
          />
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          <ImageCompare
            leftImage="/assets/img/storyboard/16.jpg"
            rightImage="/assets/img/finalout/16.jpg"
          />
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          <ImageCompare
            leftImage="/assets/img/storyboard/17.jpg"
            rightImage="/assets/img/finalout/17.jpg"
          />
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          <ImageCompare
            leftImage="/assets/img/storyboard/18.jpg"
            rightImage="/assets/img/finalout/18.jpg"
          />
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          <ImageCompare
            leftImage="/assets/img/storyboard/19.jpg"
            rightImage="/assets/img/finalout/19.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default StoryBoard;
