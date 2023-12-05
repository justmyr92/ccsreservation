import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
const Quotation = () => {
    const [userID, setUserID] = useState(localStorage.getItem("userID"));
    const [roleID, setRoleID] = useState(localStorage.getItem("roleID"));
    const [addsOn, setAddsOn] = useState([]);
    const [event, setEvent] = useState([]);
    const [reservation, setReservation] = useState([]);

    const [paymentType, setPaymentType] = useState("Over the Counter");
    const [paymentStatus, setPaymentStatus] = useState("Completed");
    const [paymentAmount, setPaymentAmount] = useState(0);

    const [foods, setFoods] = useState([]);
    const [reservedFoods, setReservedFoods] = useState([]);

    const [balance, setBalance] = useState(0);

    const [error, setError] = useState("");

    useEffect(() => {
        const getBalance = async () => {
            const response = await fetch(
                `https://ccsreservaton.online/api/balance/${reservation_id}`
            );
            const res = await response.json();

            setBalance(res.balance);

            console.log(res);
        };
        getBalance();
    }, []);

    const { reservation_id } = useParams();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (paymentAmount > balance) {
            setError("Payment amount is greater than balance");
            return;
        }

        let paymentStatus =
            balance - paymentAmount === 0 ? "Completed" : "Partial";

        let reservationStatus =
            balance - paymentAmount === 0 ? "Completed" : "Approve";

        const data = {
            transaction_id: Math.random().toString(36).substr(2, 9),
            transaction_date: new Date().toISOString().split("T")[0],
            transaction_time: new Date()
                .toISOString()
                .split("T")[1]
                .split(".")[0],
            transaction_total: reservation.total_price,
            transaction_status: paymentStatus,
            transaction_type: paymentType,
            transaction_payment: paymentAmount,
            reservation_id: reservation.reservation_id,
        };

        try {
            const response = await fetch(
                "https://ccsreservaton.online/api/transaction",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
            );

            const result = await response.json();

            if (response.ok) {
                try {
                    const response2 = await fetch(
                        `https://ccsreservaton.online/api/update-reservation-status/${reservation_id}`,
                        {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ status: reservationStatus }),
                        }
                    );

                    document.getElementById("my_modal_1").close();
                    if (response2.ok) {
                        Swal.fire({
                            title: "Success!",
                            text: "Reservation status updated",
                            icon: "success",
                            confirmButtonText: "Ok",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = "/transactions";
                            }
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong",
                            icon: "error",
                            confirmButtonText: "Ok",
                        });
                    }
                } catch (error) {
                    console.error("Error during form submission:", error);
                }
            }

            console.log(result);

            window.location.href = "/transactions";
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (!userID) {
            window.location.href = "/login";
        } else {
            if (roleID === "ROLE001") {
                window.location.href = "/";
            }
        }
    }, []);

    useEffect(() => {
        const getReservationDetails = async () => {
            const response = await fetch(
                `https://ccsreservaton.online/api/reservations/${reservation_id}`
            );
            const res = await response.json();

            const response2 = await fetch(
                `https://ccsreservaton.online/api/event/${res.event_id}`
            );
            const res2 = await response2.json();

            const response3 = await fetch(
                `https://ccsreservaton.online/api/adds_on/${reservation_id}`
            );
            const res3 = await response3.json();

            const response4 = await fetch(
                `https://ccsreservaton.online/api/foods/
                `
            );

            const res4 = await response4.json();

            const response5 = await fetch(
                `https://ccsreservaton.online/api/reservation_food/${reservation_id}`
            );

            const res5 = await response5.json();

            setFoods(res4);
            setReservedFoods(res5);
            setAddsOn(res3);
            setReservation(res);
            setEvent(res2);

            console.log(res, res2);
        };
        getReservationDetails();
    }, []);

    const [newStatus, setNewStatus] = useState("Approve"); // "Approve" or "Decline"
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState([]); // File object

    const handleUpdate = async (e) => {
        e.preventDefault();

        // Create FormData object to send files
        // const formData = new FormData();
        // formData.append("status", newStatus);

        // if (newStatus === "Approve") {
        //     formData.append("price", price);
        //     formData.append("file", file);
        // }

        let data = {
            status: newStatus,
        };
        const new_file = file.name + v4();
        if (newStatus === "Approve") {
            data = {
                status: newStatus,
                price: price,
                file: new_file,
            };
        }

        try {
            let response = "";
            if (newStatus === "Approve") {
                response = await fetch(
                    `https://ccsreservaton.online/api/update-reservation/${reservation_id}`,
                    {
                        method: "PATCH",
                        body: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
            } else {
                response = await fetch(
                    `https://ccsreservaton.online/api/update-status/${reservation_id}`,
                    {
                        method: "PATCH",
                        body: JSON.stringify({ status: newStatus }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
            }

            document.getElementById("my_modal_2").close();

            if (response.ok) {
                const imageRef = ref(storage, `reservation/${new_file}`);
                uploadBytes(imageRef, file).then(() => {
                    Swal.fire({
                        title: "Success!",
                        text: "Reservation status updated",
                        icon: "success",
                        confirmButtonText: "Ok",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href =
                                "/quotation/" + reservation_id;
                        }
                    });
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            }
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    };

    return (
        <section className="h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-row">
            <Sidebar roleID={roleID} />
            <div className="flex flex-col w-full h-full p-3 overflow-auto">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="header">
                        <div className="flex flex-row justify-between items-center mb-2">
                            <h1 className="text-3xl font-bold title tracking-wide">
                                Quotation
                            </h1>
                            <Link
                                to="/reservations"
                                className="btn btn-primary"
                            >
                                Back
                            </Link>
                        </div>
                        <p className="text-gray-900 text-sm">
                            Experience the epitome of culinary excellence with
                            Calinao Catering Services. Our online reservation
                            system streamlines the process, offering
                            personalized quotations that detail your selected
                            menu, services, and costs. Elevate your events with
                            ease and precision – reserve your extraordinary
                            catering experience today.
                        </p>
                    </div>
                    <hr className="my-2 border-gray-300" />
                    <table className="table table-zebra">
                        <tbody>
                            {reservation && (
                                <>
                                    <tr>
                                        <th className="title text-xl font-bold">
                                            Client Details:
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>Status:</th>
                                        <td>{reservation.status}</td>
                                    </tr>
                                    <tr>
                                        <th>Reservation ID:</th>
                                        <td>{reservation.reservation_id}</td>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <td>
                                            {reservation.client_fname}{" "}
                                            {reservation.client_lname}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Contact Number:</th>
                                        <td>{reservation.client_contact}</td>
                                    </tr>
                                    <tr>
                                        <th>Email Address:</th>
                                        <td>{reservation.client_email}</td>
                                    </tr>
                                </>
                            )}
                            {
                                <>
                                    <tr>
                                        <th>Event Name:</th>
                                        <td>{event.event_name}</td>
                                    </tr>
                                    <tr>
                                        <th>Event Type:</th>
                                        <td>{event.event_type}</td>
                                    </tr>
                                    <tr>
                                        <th>Event Date:</th>
                                        <td>
                                            {event.event_date &&
                                                event.event_date.split("T")[0] +
                                                    " " +
                                                    event.event_time}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Event Venue:</th>
                                        <td>{event.event_venue}</td>
                                    </tr>
                                    <tr>
                                        <th>Event Theme:</th>
                                        <td>{event.event_theme}</td>
                                    </tr>
                                    <tr>
                                        <th>Event Motif</th>
                                        <td>{event.event_motif}</td>
                                    </tr>
                                    <tr>
                                        <th>Event Guests</th>
                                        <td>{event.event_guests}</td>
                                    </tr>
                                </>
                            }
                            {addsOn && (
                                <tr>
                                    <th
                                        className="title text-xl font-bold"
                                        colSpan={2}
                                    >
                                        Adds On:
                                    </th>
                                </tr>
                            )}
                            {addsOn &&
                                addsOn.map((add, index) => (
                                    <tr key={index}>
                                        <td colSpan={2}>{add.adds_on_name}</td>
                                    </tr>
                                ))}

                            {foods && (
                                <tr>
                                    <th
                                        className="title text-xl font-bold"
                                        colSpan={2}
                                    >
                                        Foods:
                                    </th>
                                </tr>
                            )}

                            {foods &&
                                foods.map((food, foodIndex) => (
                                    <tr key={foodIndex}>
                                        {/* map reserved foods * and compare to food.food_id * and print food.food_name */}
                                        {reservedFoods &&
                                            reservedFoods.map(
                                                (reservedFood, reservedIndex) =>
                                                    reservedFood.food_id ===
                                                    food.food_id ? (
                                                        <td colSpan={2}>
                                                            {food.food_name}
                                                        </td>
                                                    ) : null
                                            )}
                                    </tr>
                                ))}
                            {
                                <>
                                    <tr>
                                        <th>Total Price:</th>
                                        <td>{reservation.total_price}</td>
                                    </tr>
                                </>
                            }
                        </tbody>
                    </table>
                    <div className="btn__container p-5 flex flex-row justify-end gap-2">
                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                document
                                    .getElementById("my_modal_1")
                                    .showModal()
                            }
                            disabled={
                                reservation.status === "Pending" ||
                                reservation.status === "Completed" ||
                                reservation.status === "Decline"
                            }
                        >
                            Set Payment
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                document
                                    .getElementById("my_modal_2")
                                    .showModal()
                            }
                            disabled={reservation.status !== "Pending"}
                        >
                            Update Status
                        </button>

                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">
                                    Set Payment
                                </h3>
                                <div className="modal-action">
                                    <form
                                        method="dialog"
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-4 w-full"
                                    >
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">
                                                    Payment Type
                                                </span>
                                            </label>
                                            <select
                                                className="select select-bordered w-full"
                                                value={paymentType}
                                                onChange={(e) =>
                                                    setPaymentType(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option>
                                                    Over the Counter
                                                </option>
                                                <option disabled>
                                                    Bank Transfer
                                                </option>
                                            </select>
                                        </div>
                                        {/* Amount  if  payment type is over the counter */}

                                        {paymentType === "Over the Counter" && (
                                            <div className="form-control w-full">
                                                <label className="label">
                                                    <span className="label-text">
                                                        Payment Amount{" "}
                                                        <span className="text-red-500">
                                                            {balance} left
                                                        </span>
                                                    </span>
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Payment Amount"
                                                    className="input input-bordered w-full outline-none focus:outline-none"
                                                    name="paymentAmount"
                                                    required
                                                    value={paymentAmount}
                                                    onChange={(e) =>
                                                        setPaymentAmount(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {error !== "" && (
                                                    <p className="text-red-500">
                                                        {error}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                        <div className="form-control w-full">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                        <button
                                            className="btn"
                                            type="button"
                                            onClick={() => {
                                                document
                                                    .getElementById(
                                                        "my_modal_1"
                                                    )
                                                    .close();
                                            }}
                                        >
                                            Close
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                        <dialog id="my_modal_2" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">
                                    Update Status
                                </h3>
                                <div className="modal-action">
                                    <form
                                        method="dialog"
                                        className="flex flex-col gap-4 w-full"
                                        onSubmit={handleUpdate}
                                    >
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">
                                                    Status
                                                </span>
                                            </label>
                                            <select
                                                className="select select-bordered w-full"
                                                value={newStatus}
                                                onChange={(e) =>
                                                    setNewStatus(e.target.value)
                                                }
                                            >
                                                <option value="Approve">
                                                    Approve
                                                </option>
                                                <option value="Decline">
                                                    Decline
                                                </option>
                                            </select>
                                        </div>

                                        {newStatus === "Approve" && (
                                            <>
                                                <div className="form-control w-full">
                                                    <label className="label">
                                                        <span className="label-text">
                                                            Price
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder="Price"
                                                        className="input input-bordered w-full outline-none focus:outline-none"
                                                        name="price"
                                                        required={
                                                            newStatus ===
                                                            "Approve"
                                                        }
                                                        value={price}
                                                        onChange={(e) =>
                                                            setPrice(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>

                                                <div className="form-control w-full">
                                                    <label className="label">
                                                        <span className="label-text">
                                                            File
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="file"
                                                        className="file-input input-bordered w-full outline-none focus:outline-none"
                                                        name="file"
                                                        required={
                                                            newStatus ===
                                                            "Approve"
                                                        }
                                                        onChange={(e) =>
                                                            setFile(
                                                                e.target
                                                                    .files[0]
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </>
                                        )}

                                        <div className="form-control w-full">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                Submit
                                            </button>
                                        </div>

                                        <button
                                            className="btn"
                                            type="button"
                                            onClick={() => {
                                                document
                                                    .getElementById(
                                                        "my_modal_2"
                                                    )
                                                    .close();
                                            }}
                                        >
                                            Close
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Quotation;
