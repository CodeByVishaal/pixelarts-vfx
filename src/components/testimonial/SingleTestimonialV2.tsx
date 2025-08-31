interface DataType {
    name?: string;
    designation?: string;
    quote?: string;
}

const SingleTestimonialV2 = ({ testimonial }: { testimonial: DataType }) => {
    const { quote, name, designation } = testimonial

    return (
        <>
            <div className="testimonial-style-two">
                <p>{quote}</p>
                <div className="tm-provider">
                    <div className="content">
                        <h4>{name}</h4>
                        <span>{designation}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleTestimonialV2;