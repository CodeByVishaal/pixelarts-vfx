import CountUp from "react-countup";

interface CounterProps {
    end: number;
}

const Counter = ({ end }: CounterProps) => {
    return (
        <>
            <CountUp end={end} enableScrollSpy />
        </>
    );
};

export default Counter;