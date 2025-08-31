import CountUp from "react-countup";
import Animate from "../animation/Animate";

interface DataType {
    count: number;
    suffix?: string;
    label?: string;
    duration?: string;
    animation?: string
}

const SingleFactV1 = ({ fact }: { fact: DataType }) => {
    const { count, suffix, label, duration, animation } = fact

    return (
        <>
            <Animate className={`${animation}`} duration={duration}>
                <div className={`fun-fact`}>
                    <div className="counter">
                        <div className="timer"><CountUp end={count} enableScrollSpy /></div>
                        <div className="operator">{suffix}</div>
                    </div>
                    <span className="medium">{label}</span>
                </div>
            </Animate>
        </>
    );
};

export default SingleFactV1;