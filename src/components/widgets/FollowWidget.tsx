import SocialShareV3 from '../social/SocialShareV3';

const FollowWidget = () => {
    return (
        <>
            <div className="sidebar-item social-sidebar">
                <h4 className="title">follow us</h4>
                <div className="sidebar-info">
                    <ul>
                        <SocialShareV3 />
                    </ul>
                </div>
            </div>
        </>
    );
};

export default FollowWidget;