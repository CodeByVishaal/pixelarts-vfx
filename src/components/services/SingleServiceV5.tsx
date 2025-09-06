import useHoverEffect from "../../hooks/useHoverEffect";

interface DataType {
  id: number;
  number: string;
  title: string;
  thumb: string;
}

const SingleServiceV5 = ({ service }: { service: DataType }) => {
  //@ts-ignore
  const { number, title, thumb } = service;

  const { handleMouseMove, handleMouseLeave } = useHoverEffect();

  return (
    <>
      <li>
        <div
          className="image-hover-item"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="item-content">
            <h2>{title}</h2>
          </div>
          <div className="image-hover-wrapper">
            <img
              className="image-hover-placeholder"
              src={`/assets/img/portfolio/${thumb}`}
              alt="Image Not Found"
              width={600}
              height={600}
            />
          </div>
        </div>
      </li>
    </>
  );
};

export default SingleServiceV5;
