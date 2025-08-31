import RatingsStar from '../utilities/RatingsStar';

interface DataType {
    id?: number;
    ratings?: any;
    text?: string;
    avatar?: string;
    name?: string;
    designation?: string;
}

const SingleTestimonialV3 = ({ testimonial }: { testimonial: DataType }) => {
    const { ratings, text, avatar, name, designation } = testimonial

    return (
        <>
            <div className="testimonial-style-three-item">
                <div className="tes-rating">
                    <span className='me-3'>{ratings}</span>
                    <div className="icon">
                        <RatingsStar ratings={ratings} />
                    </div>
                </div>
                <p>{text}</p>
                <div className="tm-provider">
                    <div className="thumb">
                        <img src={`/assets/img/team/${avatar}`} alt="Image Not Found" width={200} height={200} />
                    </div>
                    <div className="content">
                        <h4>{name}</h4>
                        <span>{designation}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleTestimonialV3;