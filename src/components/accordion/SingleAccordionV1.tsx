interface DataType {
    id: number;
    thumb: string;
    title: string;
    category: string;
    modalId: string;
}

const SingleAccordionV1 = ({ data }: { data: DataType }) => {
    const { title, category, modalId } = data;

    const [titleFirst, ...titleRest] = title.split(" ");
    const titleLast = titleRest.join(" ");

    return (
        <>
            <h3>{title}</h3>
            <div className="accordion-overlay">
                <h2>
                    <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target={`#${modalId}`}
                    >
                        {titleFirst} <strong>{titleLast}</strong>
                    </a>
                </h2>
                <span>{category}</span>
            </div>
        </>
    );
};

export default SingleAccordionV1;
