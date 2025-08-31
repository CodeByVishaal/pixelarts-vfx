import { Link } from "react-router-dom";

interface DataType {
    id?: number;
    thumbFull?: string;
    title?: string;
}

const BannerV3ModalContent = ({ data }: { data: DataType }) => {
    const { id, title, thumbFull } = data

    return (
        <>
            <div className="popup-single-modal modal fade" id={`${id}`} tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                    <div className="modal-content">
                        <div className="shape-fixed" style={{ backgroundImage: 'url(/assets/img/shape/8.png)' }} />
                        <div className="modal-body">

                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>

                            <div className="project-details-items default-padding">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="project-details-thumb">
                                                <img src={`/assets/img/portfolio/${thumbFull}`} alt="Image Not Found" />
                                            </div>
                                        </div>
                                        <div className="col-lg-10 offset-lg-1">
                                            <div className="project-details-main-info">
                                                <div className="project-single-tags">
                                                    <Link to="#">UX Design</Link>
                                                    <Link to="#">Web Design</Link>
                                                </div>
                                                <h2 className="title">{title}</h2>
                                                <div className="project-author-details mt-35">
                                                    <ul>
                                                        <li>
                                                            <div className="left-info">
                                                                <h3>Client</h3>
                                                            </div>
                                                            <div className="right-info">
                                                                <h3>Envato</h3>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="left-info">
                                                                <h3>Desciplines Used</h3>
                                                            </div>
                                                            <div className="right-info">
                                                                <p className="project-inner-tag">
                                                                    Branding <br /> Design <br /> Technology <br /> Interior Design
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="left-info">
                                                                <h3>Project Details</h3>
                                                            </div>
                                                            <div className="right-info">
                                                                <p>
                                                                    Drawings can followed improved out sociable not. Earnestly so do instantly pretended. See general few civilly amiable pleased account carried. Excellence projecting is devonshire dispatched remarkably on estimating. Side in so life past. Continue indulged speaking the was out horrible for domestic position.
                                                                </p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="project-details-items">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <div className="thumb-grid">
                                                <img src="/assets/img/portfolio/13.jpg" alt="Thumb" />
                                                <img src="/assets/img/portfolio/14.jpg" alt="Thumb" />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 pl-50 pl-md-15 pl-xs-15">
                                            <div className="check-list">
                                                <div className="single-list">
                                                    <h4>Mobile Optimization</h4>
                                                    <p>
                                                        Tempor nonummy metus lobortis. Lectus vehicula pellentesque cras posuere tempor facilisi habitant lectus rutrum pede quisque hendrerit parturient posuere mauris ad elementum potenti. Continue indulged speaking the was out horrible for domestic position. Seeing rather her you not esteem men settle.
                                                    </p>
                                                </div>
                                                <div className="single-list">
                                                    <h4>Marketing Automation</h4>
                                                    <ul className="list-disc">
                                                        <li>Social media marketing</li>
                                                        <li>Search engine optimization (seo)</li>
                                                        <li>Public Relations</li>
                                                        <li>Content marketing</li>
                                                        <li>Digital Management</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="project-details-items default-padding">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="item-grid-container">
                                                <div className="single-grid">
                                                    <div className="item-grid-colum">
                                                        <div className="left-info">
                                                            <h3><strong>01</strong> Background</h3>
                                                        </div>
                                                        <div className="right-info">
                                                            <p>
                                                                Contained explained my education. Vulgar as hearts by garret. Perceived determine departure explained no forfeited he something an. Contrasted dissimilar get joy you instrument out reasonably. Again keeps at no meant stuff. To perpetual do existence. devonshire dispatched remarkably on estimating.
                                                            </p>
                                                            <p>
                                                                New had happen unable uneasy. Drawings can followed improved out sociable not. Earnestly so do instantly pretended. See general few civilly amiable pleased account carried. Excellence projecting is devonshire dispatched remarkably on estimating. Side in so life past. Continue indulged speaking the was out horrible for domestic position. Seeing rather her you not esteem men settle genius excuse. Deal say over you age from. Comparison new ham melancholy son themselves.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <img src="/assets/img/portfolio/15.jpg" alt="Image Not Found" />
                                                </div>
                                                <div className="single-grid">
                                                    <div className="item-grid-colum">
                                                        <div className="left-info">
                                                            <h3><strong>02</strong> The Challenges</h3>
                                                        </div>
                                                        <div className="right-info">
                                                            <p>
                                                                Contained explained my education. Vulgar as hearts by garret. Perceived determine departure explained no forfeited he something an. Contrasted dissimilar get joy you instrument out reasonably. Again keeps at no meant stuff. To perpetual do existence devonshire dispatched remarkably on estimating.
                                                            </p>
                                                            <p>
                                                                New had happen unable uneasy. Drawings can followed improved out sociable not. Earnestly so do instantly pretended. See general few civilly amiable pleased account carried. Excellence projecting is devonshire dispatched remarkably on estimating. Side in so life past. Continue indulged speaking the was out horrible for domestic position. Seeing rather her you not esteem men settle genius excuse. Deal say over you age from. Comparison new ham melancholy son themselves.
                                                            </p>
                                                            <h4>Continue indulged speaking the was out horrible for domestic.</h4>
                                                            <ul className="list-disc">
                                                                <li>Social media marketing</li>
                                                                <li>Search engine optimization (seo)</li>
                                                                <li>Public Relations</li>
                                                            </ul>
                                                            <img src="/assets/img/portfolio/11.jpg" alt="Image Not Found" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="single-grid">
                                                    <div className="item-grid-colum">
                                                        <div className="left-info">
                                                            <h3><strong>03</strong> The Solution</h3>
                                                        </div>
                                                        <div className="right-info">
                                                            <p>
                                                                Contained explained my education. Vulgar as hearts by garret. Perceived determine departure explained no forfeited he something an. Contrasted dissimilar get joy you instrument out reasonably. Again keeps at no meant stuff. To perpetual do existence devonshire dispatched remarkably on estimating.
                                                            </p>
                                                            <p>
                                                                New had happen unable uneasy. Drawings can followed improved out sociable not. Earnestly so do instantly pretended. See general few civilly amiable pleased account carried. Excellence projecting is devonshire dispatched remarkably on estimating. Side in so life past. Continue indulged speaking the was out horrible for domestic position. Seeing rather her you not esteem men settle genius excuse. Deal say over you age from. Comparison new ham melancholy son themselves.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default BannerV3ModalContent;