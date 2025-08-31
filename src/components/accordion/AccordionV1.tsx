import { useState } from "react";
import AccordionV1Data from "../../assets/jsonData/accordion/AccordionV1Data.json"
import SingleAccordionV1 from "./SingleAccordionV1";
import AccordionV1Modal from "./AccordionV1Modal";

const AccordionV1 = () => {

    const [activeIndex, setActiveIndex] = useState(1);

    const handleMouseEnter = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <>
            <div className="accrdion-portfolio-area">
                <div className="container-fluid">
                    <div className="row">
                        <ul className="accordion-portfolio-lists text-light" id="accordion">
                            {AccordionV1Data.map((data, id) => (
                                <li
                                    key={data.id}
                                    className={activeIndex === id ? 'out' : ''}
                                    onMouseEnter={() => handleMouseEnter(id)}
                                    style={{ backgroundImage: `url("/assets/img/portfolio/${data.thumb}")` }}
                                >
                                    <SingleAccordionV1 data={data} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <AccordionV1Modal />
        </>
    );
};

export default AccordionV1;