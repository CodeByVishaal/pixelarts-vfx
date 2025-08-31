import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard } from 'swiper/modules';
import SplitText from "../animation/SplitText.jsx";
import SingleTeamV1 from './SingleTeamV1';
import TeamV1Data from '../../../src/assets/jsonData/team/TeamV1Data.json';

interface DataType {
    sectionClass?: string;
    hasTitle?: boolean;
}

const TeamV1 = ({ sectionClass, hasTitle }: DataType) => {
    return (
        <>
            <div className={`team-style-one-area relative overflow-hidden default-padding-bottom ${sectionClass ? sectionClass : ""}`}>

                {/* Team Title  */}
                {hasTitle &&
                    <div className="team-style-one-heading">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 text-center">
                                    <div className="site-heading">
                                        <h4 className="sub-title">Team members</h4>
                                        <h2 className="title split-text">
                                            <SplitText
                                                delay={40}
                                                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                                easing="easeOutCubic"
                                                threshold={0.2}
                                                rootMargin="-50px"
                                            >
                                                Turn Information Into Actionable Insights
                                            </SplitText>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className="container">
                    <div className="team-style-one-items">
                        <div className="row">
                            <div className="col-xl-4">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1" type="button" role="tab" aria-controls="tab1" aria-selected="true">
                                            <strong>Managing Director</strong>
                                            <span>Head of department</span>
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2" type="button" role="tab" aria-controls="tab2" aria-selected="false">
                                            <strong>Marketing Manager</strong>
                                            <span>Sales Department</span>
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="tab3-tab" data-bs-toggle="tab" data-bs-target="#tab3" type="button" role="tab" aria-controls="tab3" aria-selected="false">
                                            <strong>Software Developer</strong>
                                            <span>App Department</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-xl-7 offset-xl-1">
                                <div className="tab-content">

                                    {/* Tab 1  */}
                                    <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                                        <Swiper className="team-style-one-carousel"
                                            loop={true}
                                            slidesPerView={1}
                                            spaceBetween={30}
                                            autoplay={false}
                                            breakpoints={{
                                                768: {
                                                    slidesPerView: 2,
                                                    spaceBetween: 60
                                                },
                                            }}
                                            modules={[Keyboard]}
                                        >
                                            <div className="swiper-wrapper">
                                                {TeamV1Data.slice(0, 4).map(team =>
                                                    <SwiperSlide key={team.id}>
                                                        <SingleTeamV1 team={team} />
                                                    </SwiperSlide>
                                                )}
                                            </div>
                                        </Swiper>
                                    </div>

                                    {/* Tab 2  */}
                                    <div className="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                                        <Swiper className="team-style-one-carousel"
                                            loop={true}
                                            slidesPerView={1}
                                            spaceBetween={30}
                                            autoplay={false}
                                            breakpoints={{
                                                768: {
                                                    slidesPerView: 2,
                                                    spaceBetween: 60
                                                },
                                            }}
                                            modules={[Keyboard]}
                                        >
                                            <div className="swiper-wrapper">
                                                {TeamV1Data.slice(3, 7).map(team =>
                                                    <SwiperSlide key={team.id}>
                                                        <SingleTeamV1 team={team} />
                                                    </SwiperSlide>
                                                )}
                                            </div>
                                        </Swiper>
                                    </div>

                                    {/* Tab 3 */}
                                    <div className="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab" >
                                        <Swiper className="team-style-one-carousel"
                                            loop={true}
                                            slidesPerView={1}
                                            spaceBetween={30}
                                            autoplay={false}
                                            breakpoints={{
                                                768: {
                                                    slidesPerView: 2,
                                                    spaceBetween: 60
                                                },
                                            }}
                                            modules={[Keyboard]}
                                        >
                                            <div className="swiper-wrapper">
                                                {TeamV1Data.slice(6, 10).map(team =>
                                                    <SwiperSlide key={team.id}>
                                                        <SingleTeamV1 team={team} />
                                                    </SwiperSlide>
                                                )}
                                            </div>
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeamV1;