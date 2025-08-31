import { Link } from "react-router-dom";
import portfolio13 from "/assets/img/portfolio/13.jpg";
import portfolio14 from "/assets/img/portfolio/14.jpg";
import portfolio15 from "/assets/img/portfolio/15.jpg";
import portfolio44 from "/assets/img/portfolio/44.jpg";
import PortfolioV4Data from "../../../src/assets/jsonData/portfolio/PortfolioV4Data.json";

interface DataType {
    id?: number;
    title?: string;
    tag?: string;
    thumbFull?: string;
}

interface ProjectDetailsProps {
    projectInfo?: DataType;
    sectionClass?: string;
    totalProjects?: number
}

const ProjectDetailsContent = ({ projectInfo, sectionClass, totalProjects }: ProjectDetailsProps) => {
    const { title, tag, id, thumbFull } = projectInfo || {};

    // Projects Navigation

    const currentId = id ? parseInt(id.toString(), 10) : 1;

    // Calculate the previous and next IDs dynamically
    const previousId = currentId === 1 ? totalProjects : currentId - 1;
    const nextId = currentId === totalProjects ? 1 : currentId + 1;

    // Get the previous and next project titles
    const previousProject = PortfolioV4Data.find((project) => project.id === previousId);
    const nextProject = PortfolioV4Data.find((project) => project.id === nextId);

    // Get the first two words of the project title
    const getFirstTwoWords = (text?: string) => text?.split(' ').slice(0, 2).join(' ') || "No Title";

    return (
        <>
            {/* 1st Section */}
            <div className={`project-details-items default-padding-bottom ${sectionClass ? sectionClass : ""}`}>
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
                                    <Link to="#">{`${tag ? tag : 'UX Design'}`}</Link>
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
                                                <h3>Disciplines Used</h3>
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

            {/* 2nd Section */}
            <div className="project-details-items bg-gray default-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="thumb-grid">
                                <img src={portfolio13} alt="Thumb" />
                                <img src={portfolio14} alt="Thumb" />
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

            {/* 3rd Section */}
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
                                    <img src={portfolio15} alt="Image Not Found" />
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
                                            <img src={portfolio44} alt="Image Not Found" />
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

            {/* 4th Section (Navigation) */}
            <div className="project-pagination default-padding-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="project-paginvation-items">
                                <div className="project-previous">
                                    <Link to={`/project-details/${previousId}`}>
                                        <div className="icon"><i className="fas fa-angle-double-left" /></div>
                                        <div className="nav-title"> Previous Post
                                            <h5>{getFirstTwoWords(previousProject?.title)}</h5>
                                        </div>
                                    </Link>
                                </div>
                                <div className="project-all">
                                    <Link to="#"><i className="fas fa-th-large" /></Link>
                                </div>
                                <div className="project-next">
                                    <Link to={`/project-details/${nextId}`}>
                                        <div className="nav-title">Next Post
                                            <h5>{getFirstTwoWords(nextProject?.title)}</h5>
                                        </div>
                                        <div className="icon"><i className="fas fa-angle-double-right" /></div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectDetailsContent;