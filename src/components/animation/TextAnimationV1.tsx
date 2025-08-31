import useScrollAnimation from "../../hooks/useScrollAnimation";

const TextAnimationV1 = () => {
    const containerRef = useScrollAnimation();

    return (
        <>
            <div className="default-padding-top mb-50 mb-xs-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="move-shape" />
                        </div>
                        <div className="col-lg-7 text-scroll-animation" ref={containerRef}>
                            <div className="about-four-title">
                                <h2 className="title text">Best creative <strong>digital agency Service</strong></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TextAnimationV1;