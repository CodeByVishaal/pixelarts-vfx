interface DataType {
    id: number;
    modal: string;
    thumb: string;
    titleFirst: string;
    titleLast: string;
    textFirst: string;
    textLast: string;
    tags: string[];
}

const SingleBannerV11 = ({ banner }: { banner: DataType }) => {
    const { titleFirst, titleLast, textFirst, textLast, tags, thumb, modal } = banner;

    return (
        <>
            <img
                className="regular-img"
                src={`/assets/img/banner/${thumb}`}
                alt="Image Not Found"
            />
            <div className="banner-style-eleven">
                <div className="container container-full">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <div className="item-info">
                                <div className="content">
                                    <h2>
                                        <a
                                            href="#"
                                            className="cursor-target"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#${modal}`}
                                        >
                                            {titleFirst} <br /> {titleLast}
                                        </a>
                                    </h2>
                                    <div className="info">
                                        <p>
                                            {textFirst} <br /> {textLast}
                                        </p>
                                        <div className="tabs">
                                            <ul>
                                                {tags.map((tag, index) => (
                                                    <li key={index}>{tag}</li>
                                                ))}
                                            </ul>
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

export default SingleBannerV11;
