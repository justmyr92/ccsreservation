import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaThumbsUp } from "react-icons/fa";
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
      const response = await fetch("http://localhost:7723/ratings");
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
      }
    }
  }, []);

  const maxStars = 5;

  const fullStars = Math.floor(ratingAverage);
  const hasHalfStar = ratingAverage % 1 !== 0;
  // Calculate counts for each star value
  const starCounts = Array.from(
    { length: maxStars },
    (_, i) => ratings.filter((review) => review.rating_value === i + 1).length
  );
  return (
    <section className="dashboard__section h-screen bg-blue-100 flex flex-row ">
      <Sidebar roleID={roleID} />
      <div className="flex flex-col overflow-y-auto w-[100%] p-10">
        <div className="shadow mt-3 bg-base-100 divide-x divide-gray-200 rounded-box flex flex-row justify-between items-center h-[18rem]">
          <div className="h-full w-1/3 flex flex-col justify-center items-center p-3">
            <div className="stat-value">{ratingAverage.toFixed(2)}</div>
          </div>

          <div className="h-full w-1/3 flex flex-col justify-center items-center p-3">
            <div className="rating flex flex-col justify-center items-center">
              <div>
                {[...Array(fullStars)].map((_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    className="text-yellow-400"
                  />
                ))}

                {hasHalfStar && (
                  <FontAwesomeIcon
                    icon={faStarHalf}
                    className="text-yellow-400"
                  />
                )}

                {[...Array(maxStars - fullStars - (hasHalfStar ? 1 : 0))].map(
                  (_, index) => (
                    <FontAwesomeIcon
                      key={index + fullStars + 1}
                      icon={faStar}
                      className="text-gray-400"
                    />
                  )
                )}
              </div>
              <div className="text-center text-secondary">
                {ratingAverage.toFixed(2)} Ratings, {ratingCount} Reviews
              </div>
            </div>
          </div>

          <div className="h-full w-1/3 flex flex-col justify-center items-center p-3">
            {starCounts.map((count, index) => (
              <div key={index}>
                {index + 1}.0
                <progress
                  className="progress progress-warning w-56 ml-2"
                  value={count}
                  max={ratingCount}
                ></progress>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className="flex flex-col mt-4">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl font-bold">Ratings</h1>
            <div className="flex flex-row items-center">
              <select
                className="select select-bordered select-primary w-56"
                onChange={(e) => setFilteredRatings(e.target.value)}
              >
                <option value="all">All</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Stars</option>
              </select>
            </div>
          </div>

          {ratings ? (
            ratings.map(
              (review, index) =>
                (filteredRatings === "all" ||
                  +filteredRatings === review.rating_value) && (
                  <div
                    key={index}
                    className="card w-full bg-base-100 shadow-xl mt-4"
                  >
                    <div className="card-body">
                      <h2 className="card-title">
                        {review.client_fname + " " + review.client_lname}
                      </h2>
                      <div className="flex">
                        {[...Array(review.rating_value)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className="text-yellow-400"
                          />
                        ))}
                        {[...Array(maxStars - review.rating_value)].map(
                          (_, i) => (
                            <FontAwesomeIcon
                              key={i + review.rating_value}
                              icon={faStar}
                              className="text-gray-400"
                            />
                          )
                        )}
                      </div>
                      <p>{review.rating_comment}</p>
                    </div>
                  </div>
                )
            )
          ) : (
            <div className="card w-full bg-base-100 shadow-xl mt-4">
              <div className="card-body">
                <h2 className="card-title">No Ratings</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Ratings;
