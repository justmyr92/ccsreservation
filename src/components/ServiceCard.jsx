import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ image, title }) => {
    return (
        <Link to={`/reservation/${title}`}>
            <div className="service-card bg-white rounded-lg shadow-lg relative border h-60">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="overlay absolute top-0 left-0 w-full h-full bg-black bg-opacity-10 rounded-lg flex justify-center items-center hover:bg-opacity-0  hover:text-orange-500">
                    <div className="overlay-content text-center text-white">
                        <h3
                            className="text-4xl font-bold mb-2 title tracking-widest capitalize"
                            style={{ textShadow: "0 0 5px #000000" }}
                        >
                            {title}
                        </h3>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ServiceCard;
