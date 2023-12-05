import {
    faEye,
    faFile,
    faStar,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import Swal from "sweetalert2";
const Reservations = () => {
    const [reservations, setReservations] = useState([]);

    const [userID, setUserID] = useState(localStorage.getItem("userID"));

    const [ratingValue, setRatingValue] = useState(0);
    const [ratingComment, setRatingComment] = useState("");
    const [submittingRating, setSubmittingRating] = useState(false);

    const handleSubmitRatings = async (e) => {
        e.preventDefault();

        try {
            setSubmittingRating(true); // Set loading state to true

            const response = await fetch(
                "https://ccsreservaton.online/api/ratings",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        rating_id: generateRatingId(), // Implement a function to generate a unique ID
                        rating_value: ratingValue,
                        rating_comment: ratingComment,
                        reservation_id: selectedReservation.reservation_id,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to submit rating");
            }

            document.getElementById("my_modal_3").close();
        } catch (error) {
            console.error("Error submitting rating:", error.message);
        } finally {
            setSubmittingRating(false); // Set loading state back to false
        }
    };

    const generateRatingId = () => {
        // Implement a function to generate a unique ID (e.g., UUID)
        return "R" + Math.random().toString(36).substr(2, 9);
    };

    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        };
        const formattedDate = new Date(dateString).toLocaleDateString(
            undefined,
            options
        );
        return formattedDate;
    };

    const [ratingCount, setRatingCount] = useState([]);

    useEffect(() => {
        console.log(userID);

        const getReservations = async () => {
            try {
                const res = await fetch(
                    `https://ccsreservaton.online/api/reservations/client/${userID}`
                );
                if (!res.ok) {
                    throw new Error("Failed to fetch reservations");
                }
                const data = await res.json();
                if (res.ok) {
                    const updateReservations = data.map(async (reservation) => {
                        const imageRef = ref(
                            storage,
                            `reservation/${reservation.proposal}`
                        );
                        const url = await getDownloadURL(imageRef);
                        return { ...reservation, proposal: url };
                    });

                    if (data.proposal) {
                        const updatedReservations = await Promise.all(
                            updateReservations
                        );
                        setReservations(updatedReservations);
                    } else {
                        setReservations(data);
                    }

                    setRatingCount([]);

                    // Use Promise.all to wait for all asynchronous calls to complete
                    const ratingPromises = data.map(async (reservation) => {
                        try {
                            const result = await fetch(
                                `https://ccsreservaton.online/api/ratings/${reservation.reservation_id}`
                            );
                            if (result.ok) {
                                const ratingsData = await result.json();
                                console.log(ratingsData);
                                return {
                                    reservation_id: reservation.reservation_id,
                                    count: parseInt(ratingsData),
                                };
                            } else {
                                console.error(
                                    `Error fetching data for reservation ${reservation.reservation_id}`
                                );
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    });

                    const ratings = await Promise.all(ratingPromises);
                    setRatingCount(ratings);
                }
            } catch (error) {
                console.error("Error fetching reservations:", error.message);
            }
        };

        getReservations();
    }, [userID]);

    const [page, setPage] = useState(1);

    const [selectedReservation, setSelectedReservation] = useState(null);

    const viewReservation = (reservation) => {
        setSelectedReservation(reservation);
        console.log("Reservation:", reservation);
        setPage(2);
    };

    useEffect(() => {
        console.log(ratingCount);
    }, [ratingCount]);

    const viewProposal = (reservation) => {
        setSelectedReservation(reservation);
        console.log("Reservation:", reservation);
        setPage(3);
    };

    const viewRatings = (reservation) => {
        setSelectedReservation(reservation);
        console.log("Reservation:", reservation);
        document.getElementById("my_modal_3").showModal();
    };

    const [addsOn, setAddsOn] = useState([]);
    const [event, setEvent] = useState([]);
    const [reservation, setReservation] = useState([]);
    const [foods, setFoods] = useState([]);
    const [reservedFoods, setReservedFoods] = useState([]);

    const handleDeleteReservation = async (reservationId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            confirmButtonText: "Yes, delete it!",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            cancelButtonColor: "#d33",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(
                        `https://ccsreservaton.online/api/reservations/${reservationId}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Failed to delete reservation");
                    }

                    // Update state to remove the deleted reservation
                    setReservations((prevReservations) =>
                        prevReservations.filter(
                            (reservation) =>
                                reservation.reservation_id !== reservationId
                        )
                    );

                    Swal.fire(
                        "Deleted!",
                        "Your reservation has been cancelled.",
                        "success"
                    );
                } catch (error) {
                    console.error("Error deleting reservation:", error.message);
                }
            }
        });
    };

    useEffect(() => {
        const getReservationDetails = async () => {
            console.log(selectedReservation);
            try {
                const response = await fetch(
                    `https://ccsreservaton.online/api/reservations/${selectedReservation.reservation_id}`
                );
                const res = await response.json();

                const response2 = await fetch(
                    `https://ccsreservaton.online/api/event/${res.event_id}`
                );
                const res2 = await response2.json();

                const response3 = await fetch(
                    `https://ccsreservaton.online/api/adds_on/${selectedReservation.reservation_id}`
                );
                const res3 = await response3.json();
                console.log(res3, "Asd");
                const response4 = await fetch(
                    `https://ccsreservaton.online/api/foods`
                );

                const res4 = await response4.json();

                const response5 = await fetch(
                    `https://ccsreservaton.online/api/reservation_food/${selectedReservation.reservation_id}`
                );

                const res5 = await response5.json();

                setFoods(res4);
                setReservedFoods(res5);
                setAddsOn(res3);
                setReservation(res);
                setEvent(res2);

                console.log(res, res2);
            } catch (error) {
                console.error(
                    "Error fetching reservation details:",
                    error.message
                );
            }
        };

        console.log("Page:", page);

        if (page === 2 && selectedReservation) {
            console.log("Fetching reservation details");
            getReservationDetails();
        }
    }, [page, selectedReservation]);

    const column = [
        {
            name: "ID",
            selector: (row) => row.reservation_id,
            width: "15%",
        },
        {
            name: "Date",
            width: "15%",
            selector: (row) =>
                //event date is consist of date and time then convert it to Date Time AM/PM
                formatDate(row.event_date.split("T")[0]) + " " + row.event_time,
            //

            // row.event_date,
        },
        {
            name: "Reservation",
            selector: (row) => row.event_name,
            width: "15%",
        },
        {
            width: "15%",
            name: "Venue",
            selector: (row) => row.event_venue,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            width: "15%",
        },
        {
            name: "Action",
            width: "25%",

            selector: (row, index) => (
                <div className="flex gap-3">
                    {row.status === "Pending" && (
                        <button
                            className="btn bg-red-500 text-white btn-sm"
                            onClick={() =>
                                handleDeleteReservation(row.reservation_id)
                            }
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    )}
                    {
                        row.status === "Approve" && row.proposal !== "" && (
                            <button
                                className="btn bg-green-500 text-white btn-sm"
                                onClick={() => viewProposal(row)}
                            >
                                <FontAwesomeIcon icon={faFile} />
                            </button>
                        ) //approved
                    }
                    {
                        row.status === "Completed" && (
                            <button
                                className="btn bg-green-500 text-white btn-sm"
                                onClick={() => viewProposal(row)}
                            >
                                <FontAwesomeIcon icon={faFile} />
                            </button>
                        ) //approved
                    }

                    <>
                        <button
                            className="btn bg-green-500 text-white btn-sm"
                            disabled={
                                row.status !== "Completed" ||
                                ratingCount.find(
                                    (rating) =>
                                        rating.reservation_id ===
                                        row.reservation_id
                                )?.count === 1
                            }
                            onClick={() => viewRatings(row)}
                        >
                            <FontAwesomeIcon icon={faStar} />
                        </button>
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box">
                                {/* if there is a button in form, it will close the modal */}
                                <button
                                    ype="button"
                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                >
                                    ✕
                                </button>
                                <form
                                    method="dialog"
                                    onSubmit={handleSubmitRatings}
                                >
                                    <div className="form-control">
                                        <label
                                            htmlFor="rating"
                                            className="label title text-xl"
                                        >
                                            Rating
                                        </label>
                                        <div className="rating-stars mb-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FontAwesomeIcon
                                                    key={star}
                                                    icon={faStar}
                                                    className={
                                                        star <= ratingValue
                                                            ? "text-yellow-500 text-lg"
                                                            : "text-lg"
                                                    }
                                                    onClick={() =>
                                                        setRatingValue(star)
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="form-control">
                                        <label
                                            htmlFor="comment"
                                            className="label title text-xl"
                                        >
                                            Comment
                                        </label>
                                        <textarea
                                            id="comment"
                                            className="textarea border border-black outline-none"
                                            style={{
                                                resize: "none",
                                            }}
                                            value={ratingComment}
                                            onChange={(e) =>
                                                setRatingComment(e.target.value)
                                            }
                                        />
                                    </div>
                                    <br />
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={submittingRating} // Disable the button when submittingRating is true
                                    >
                                        {submittingRating
                                            ? "Submitting..."
                                            : "Submit Rating"}
                                    </button>
                                </form>
                            </div>
                        </dialog>
                    </>

                    <button
                        className="btn btn-info text-white btn-sm"
                        onClick={() => viewReservation(row)}
                    >
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="ratings__main bg-gradient-to-r from-cyan-500 to-blue-500 w-[100%] p-6 h-[100%] overflow-y-auto">
            <div className="container bg-white p-6 rounded-lg min-h-[100%] w-[100%]">
                {page === 1 && (
                    <>
                        <div className="flex justify-between">
                            <h3 className="text-3xl title">
                                Reservation History
                            </h3>
                        </div>
                        <hr className="my-2 border-gray-400" />
                        <div className="box overflow-x-auto w-full border">
                            <DataTable
                                columns={column}
                                data={reservations}
                                pagination={true}
                                noHeader={true}
                                fixedHeader={true}
                                fixedHeaderScrollHeight="600px"
                                highlightOnHover={true}
                                striped={true}
                            />
                        </div>
                    </>
                )}
                {page === 2 && (
                    <>
                        <div className="flex justify-between">
                            <h3 className="text-2xl title">
                                Reservation Details
                            </h3>
                            <button
                                className="btn btn-info text-white mb-3"
                                onClick={() => setPage(1)}
                            >
                                Back
                            </button>
                        </div>
                        <div className="w-full bg-white rounded-lg shadow relative p-5">
                            <table className="table">
                                <thead className="bg-gray-200">
                                    <tr className="text-white">
                                        <th
                                            colSpan="2"
                                            className="text-center p-5 text-lg text-gray-800"
                                        >
                                            Quotation
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservation && (
                                        <>
                                            <tr>
                                                <td>Client Name:</td>
                                                <td>
                                                    {reservation.client_fname}{" "}
                                                    {reservation.client_lname}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Contact Number:</td>
                                                <td>
                                                    {reservation.client_contact}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Email Address:</td>
                                                <td>
                                                    {reservation.client_email}
                                                </td>
                                            </tr>
                                        </>
                                    )}
                                    {
                                        <>
                                            <tr>
                                                <td>Event Name:</td>
                                                <td>{event.event_name}</td>
                                            </tr>
                                            <tr>
                                                <td>Event Type:</td>
                                                <td>{event.event_type}</td>
                                            </tr>
                                            <tr>
                                                <td>Event Date:</td>
                                                <td>
                                                    {event.event_date &&
                                                        event.event_date.split(
                                                            "T"
                                                        )[0] +
                                                            " " +
                                                            event.event_time}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Event Venue:</td>
                                                <td>{event.event_venue}</td>
                                            </tr>
                                            <tr>
                                                <td>Event Theme:</td>
                                                <td>{event.event_theme}</td>
                                            </tr>
                                            <tr>
                                                <td>Event Motif</td>
                                                <td>{event.event_motif}</td>
                                            </tr>
                                            <tr>
                                                <td>Event Guests</td>
                                                <td>{event.event_guests}</td>
                                            </tr>
                                        </>
                                    }
                                    {addsOn && (
                                        <tr>
                                            <th>Adds On:</th>
                                        </tr>
                                    )}
                                    {addsOn &&
                                        addsOn.map((add) => (
                                            <tr>
                                                <td>{add.adds_on_name}</td>
                                            </tr>
                                        ))}

                                    {
                                        foods && (
                                            <tr>
                                                <th>Food:</th>
                                            </tr>
                                        ) //food
                                    }

                                    {foods &&
                                        foods.map((food) => (
                                            <tr>
                                                {/* map reserved foods * and compare to food.food_id * an prnit food.food_name */}
                                                {reservedFoods &&
                                                    reservedFoods.map(
                                                        (reservedFood) =>
                                                            reservedFood.food_id ===
                                                                food.food_id && (
                                                                <td>
                                                                    {
                                                                        food.food_name
                                                                    }
                                                                </td>
                                                            )
                                                    )}
                                            </tr>
                                        ))}
                                    {
                                        <>
                                            <tr>
                                                <td>Total:</td>
                                                <td>
                                                    {reservation.total_price}
                                                </td>
                                            </tr>
                                        </>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
                {page === 3 && (
                    <>
                        <div className="flex justify-between">
                            <h3 className="text-2xl title">
                                Reservation Details
                            </h3>
                            <button
                                className="btn btn-info text-white mb-3"
                                onClick={() => setPage(1)}
                            >
                                Back
                            </button>
                        </div>
                        <div className="w-full bg-white rounded-lg shadow relative p-5">
                            <iframe
                                src={selectedReservation.proposal}
                                width="100%"
                                height="600px"
                            ></iframe>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Reservations;
