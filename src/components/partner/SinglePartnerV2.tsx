interface DataType {
    id?: number;
    category?: string;
    thumb?: string;
    website?: string;
}

const SinglePartnerV2 = ({ partner }: { partner: DataType }) => {
    const { category, thumb, website } = partner

    return (
        <>
            <div className="partner-two-item">
                <h5>{category}</h5>
                <img src={`/assets/img/brand/${thumb}`} alt="Image Not Found" width={350} height={100} />
                <h4>{website}</h4>
            </div>
        </>
    );
};

export default SinglePartnerV2;