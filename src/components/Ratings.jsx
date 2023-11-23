import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenToSquare,
    faStar,
    faStarHalf,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Ratings = ({ clientData }) => {
    return (
        <div className="ratings__main bg-blue-100 w-[100%]  p-3">
            <div className="flex justify-between">
                <h3 className="text-2xl">Rate Service</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>EVENT TYPE</th>
                            <th>DATE</th>
                            <th>RESERVATION DATE</th>
                            <th>RATE</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Wedding</td>
                            <td>10-16-02</td>
                            <td>10-14-02</td>
                            <td>
                                <div className="rating flex flex-col">
                                    <div>
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-yellow-400"
                                        />
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-yellow-400"
                                        />
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-yellow-400"
                                        />
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-yellow-400"
                                        />
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-yellow-400"
                                            checked
                                        />
                                    </div>
                                </div>
                            </td>
                            <td className="flex gap-2">
                                <button className="btn bg-red-500 text-white">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <button className="btn btn-info text-white">
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Ratings;
