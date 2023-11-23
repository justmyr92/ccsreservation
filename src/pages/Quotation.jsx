import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";

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

    const { reservation_id } = useParams();
    const handleSubmit = async (e) => {
        e.preventDefault();

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
            const response = await fetch("http://localhost:7723/transaction", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                try {
                    const response2 = await fetch(
                        `http://localhost:7723/update-reservation-status/${reservation_id}`,
                        {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ status: paymentStatus }),
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
                `http://localhost:7723/reservations/${reservation_id}`
            );
            const res = await response.json();

            const response2 = await fetch(
                `http://localhost:7723/event/${res.event_id}`
            );
            const res2 = await response2.json();

            const response3 = await fetch(
                `http://localhost:7723/adds_on/${reservation_id}`
            );
            const res3 = await response3.json();

            const response4 = await fetch(
                `http://localhost:7723/foods/
                `
            );

            const res4 = await response4.json();

            const response5 = await fetch(
                `http://localhost:7723/reservation_food/${reservation_id}`
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
    const [file, setFile] = useState(null);

    const handleUpdate = async (e) => {
        e.preventDefault();

        // Create FormData object to send files
        const formData = new FormData();
        formData.append("status", newStatus);
        formData.append("price", price);
        formData.append("file", file);

        try {
            const response = await fetch(
                `http://localhost:7723/update-reservation/${reservation_id}`,
                {
                    method: "PATCH",
                    body: formData,
                }
            );

            document.getElementById("my_modal_2").close();
            if (response.ok) {
                Swal.fire({
                    title: "Success!",
                    text: "Reservation status updated",
                    icon: "success",
                    confirmButtonText: "Ok",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/quotation/" + reservation_id;
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
        //
    };
    return (
        <section className="quotation__section h-screen bg-blue-100 flex flex-row">
            <Sidebar roleID={roleID} />

            <div className="clients__container p-5 flex flex-col w-[80%] h-full overflow-y-auto">
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
                                        <td>{reservation.client_contact}</td>
                                    </tr>
                                    <tr>
                                        <td>Email Address:</td>
                                        <td>{reservation.client_email}</td>
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
                                                event.event_date.split("T")[0] +
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
                                                            {food.food_name}
                                                        </td>
                                                    )
                                            )}
                                    </tr>
                                ))}
                            {
                                <>
                                    <tr>
                                        <td>Total:</td>
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
                                reservation.status === "Completed"
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
                                                        Payment Amount
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
                                                        required
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
                                                        required
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
