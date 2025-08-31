interface DataType {
    title?: string;
    thumbLight?: string;
    text?: string;
}

const SingleProcessV1Light = ({ process }: { process: DataType }) => {
    const { thumbLight, title, text } = process

    return (
        <>
            <div className="item">
                <div className="icon">
                    <img src={`/assets/img/icon/${thumbLight}`} alt="Icon" width={200} height={230} />
                </div>
                <h4>{title}</h4>
                <p>{text}</p>
            </div>
        </>
    );
};

export default SingleProcessV1Light;