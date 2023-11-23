import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faStar,
  faStarHalf,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Ratings = ({ clientData }) => {
  const [reload, setReload] = useState(false);
  const [ratings, setRatings] = useState([]);
  const ID = localStorage.getItem("userID");
  useEffect(() => {
    const getRatings = async () => {
      const response = await fetch(
        `http://localhost:7723/event_reservation_rating/${ID}`
      );

      const data = await response.json();
      console.log(data);

      setRatings(data);
    };
    getRatings();
    setReload(false);
  }, [ID, reload]);

  const deleteRating = async (rating_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",

      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(
          `http://localhost:7723/ratings/${rating_id}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        console.log(data);

        setReload(true);
      }
    });
  };

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
            {ratings.map((event, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{event.event_type}</td>
                <td>{new Date(event.event_date).toLocaleDateString()}</td>
                <td>{new Date(event.event_date).toLocaleDateString()}</td>
                <td>
                  <div className="rating flex flex-row">
                    {/* Render stars based on event.rating_value */}
                    {[...Array(event.rating_value)].map((_, i) => (
                      <input
                        key={i}
                        type="radio"
                        name={`rating-${index}`}
                        className="mask mask-star-2 bg-yellow-400"
                      />
                    ))}
                  </div>
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn bg-red-500 text-white"
                    onClick={() => deleteRating(event.rating_id)}
                  >
                    {/* Add your delete logic here */}
                    Delete
                  </button>
                  <button className="btn btn-info text-white">
                    {/* Add your edit logic here */}
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ratings;
