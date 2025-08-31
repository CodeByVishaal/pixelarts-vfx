import Animate from "../animation/Animate";

interface DataType {
    id?: number;
    title?: string;
    icon?: string;
    year?: number;
    delay?: string;
}

const SingleAwardV1 = ({ item }: { item: DataType }) => {
    const { title, icon, year, delay } = item;

    return (
        <>
            <Animate className="animate__animated animate__fadeInUp" delay={delay}>
                <div className="award-style-two-item">
                    <div className="award">
                        <i className={icon} />
                        <h4>{title}</h4>
                    </div>
                    <div className="date">{year}</div>
                </div>
            </Animate>
        </>
    );
};

export default SingleAwardV1;