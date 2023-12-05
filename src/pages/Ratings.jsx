import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

const Ratings = () => {
    const [userID, setUserID] = useState(localStorage.getItem("userID"));
    const [roleID, setRoleID] = useState(localStorage.getItem("roleID"));
    const [ratings, setRatings] = useState([]);
    const [ratingCount, setRatingCount] = useState(0);
    const [ratingAverage, setRatingAverage] = useState(0);
    const [filteredRatings, setFilteredRatings] = useState("all");
    useEffect(() => {
        const getRatings = async () => {
            const response = await fetch(
                "https://ccsreservaton.online/api/ratings"
            );
            const data = await response.json();
            if (data.length === null || data.length === 0) {
                setRatings([]);
                setRatingCount(0);

                setRatingAverage(0);
            } else {
                setRatings(data);
                setRatingCount(data.length);
                let total = 0;
                data.forEach((rating) => {
                    total += rating.rating_value;
                });
                setRatingAverage(total / data.length);
            }
        };
        getRatings();
    }, []);

    useEffect(() => {
        if (!userID) {
            window.location.href = "/login";
        } else {
            if (roleID === "ROLE001") {
                window.location.href = "/";
            } else if (roleID === "ROLE002") {
                window.location.href = "/menu";
            }
        }
    }, []);

    const maxStars = 5;

    const fullStars = Math.floor(ratingAverage);
    const hasHalfStar = ratingAverage % 1 !== 0;
    // Calculate counts for each star value
    const starCounts = Array.from(
        { length: maxStars },
        (_, i) =>
            ratings.filter((review) => review.rating_value === i + 1).length
    );
    return (
        <>
            <section className="h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-row">
                <Sidebar roleID={roleID} />
                <div className="flex flex-col w-full h-full p-3 overflow-auto">
                    <div className="bg-white rounded-lg shadow-lg p-6 min-h-screen max-h-fit">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="text-3xl font-bold title tracking-wide">
                                Ratings
                            </h1>
                        </div>
                        <hr className="my-2 border-blue-500 border-b-2" />
                        <div className="card__container flex flex-row justify-between items-center divide-x border-b-0 border divide-gray-200 rounded-none h-[10rem]">
                            <div className="card border-b h-full w-1/3 flex flex-col justify-center items-center p-3 rounded-sm">
                                <div className="stat-value">
                                    {ratingAverage.toFixed(2)}
                                </div>
                            </div>
                            <div className="card border-b h-full w-1/3 flex flex-col justify-center items-center p-3 rounded-sm">
                                <div className="rating flex flex-col justify-center items-center">
                                    <div className="flex flex-row justify-center items-center">
                                        {" "}
                                        {[...Array(fullStars)].map(
                                            (_, index) => (
                                                <FaStar className="text-yellow-400 text-2xl" />
                                            )
                                        )}
                                        {hasHalfStar && (
                                            <FaStarHalf className="text-yellow-400 text-2xl" />
                                        )}
                                        {[
                                            ...Array(
                                                maxStars -
                                                    fullStars -
                                                    (hasHalfStar ? 1 : 0)
                                            ),
                                        ].map((_, index) => (
                                            <FaStar
                                                className="text-gray-400 text-2xl"
                                                key={index + fullStars + 1}
                                            />
                                        ))}
                                    </div>
                                    <div className="text-center text-secondary mt-2">
                                        {ratingAverage.toFixed(2)} Ratings,{" "}
                                        {ratingCount} Reviews
                                    </div>
                                </div>
                            </div>
                            <div className="card border-b h-full w-1/3 flex flex-col justify-center items-center p-3 rounded-sm">
                                {starCounts
                                    .slice()
                                    .reverse()
                                    .map((count, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-row justify-center items-center"
                                        >
                                            <div className="text-center text-secondary">
                                                {starCounts.length - index}.0
                                            </div>
                                            <progress
                                                className="progress progress-warning w-56 ml-2"
                                                value={count}
                                                max={ratingCount}
                                            ></progress>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <hr className="my-3 border-gray-500 border-b-1" />
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="text-2xl font-bold title tracking-wide">
                                Reviews
                            </h1>
                            <select
                                className="select select-bordered w-56 outline-none focus:outline-none"
                                onChange={(e) =>
                                    setFilteredRatings(e.target.value)
                                }
                            >
                                <option value="all">All</option>
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="2">2 Stars</option>
                                <option value="1">1 Stars</option>
                            </select>
                        </div>

                        <div>
                            {ratings && ratings.length > 0 ? (
                                ratings.map(
                                    (review, index) =>
                                        (filteredRatings === "all" ||
                                            +filteredRatings ===
                                                review.rating_value) && (
                                            <div
                                                key={index}
                                                className="card w-full bg-base-100 shadow-xl mt-4"
                                            >
                                                <div className="card-body">
                                                    <h2 className="card-title">
                                                        {review.client_fname +
                                                            " " +
                                                            review.client_lname}
                                                    </h2>
                                                    <div className="flex">
                                                        {[
                                                            ...Array(
                                                                review.rating_value
                                                            ),
                                                        ].map((_, i) => (
                                                            <FontAwesomeIcon
                                                                key={i}
                                                                icon={faStar}
                                                                className="text-yellow-400"
                                                            />
                                                        ))}
                                                        {[
                                                            ...Array(
                                                                maxStars -
                                                                    review.rating_value
                                                            ),
                                                        ].map((_, i) => (
                                                            <FontAwesomeIcon
                                                                key={
                                                                    i +
                                                                    review.rating_value
                                                                }
                                                                icon={faStar}
                                                                className="text-gray-400"
                                                            />
                                                        ))}
                                                    </div>
                                                    <p>
                                                        {review.rating_comment}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                )
                            ) : (
                                <>
                                    <div className="w-full bg-base-100 mt-4 flex flex-col justify-center items-center p-3 rounded-sm h-[10rem] border">
                                        <h1 className="text-2xl font-bold title tracking-wide text-secondary">
                                            No Reviews
                                        </h1>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Ratings;
