interface DataType {
    id?: number;
    serviceName?: string;
    count?: string;
}

const ServiceList = ({ service }: { service: DataType }) => {
    const { serviceName, count } = service


    return (
        <>
            <div className="icon">
                <i className="fas fa-long-arrow-right" />
            </div>
            <span>{count}</span>
            {serviceName}
        </>
    );
};

export default ServiceList;