import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";

const Reservation = () => {
    const [foods, setFoods] = useState([]);
    const [customerID, setCustomerID] = useState(
        localStorage.getItem("userID")
    );
    const [roleID, setRoleID] = useState(localStorage.getItem("roleID"));
    const [client, setClient] = useState([]);
    const [clientData, setClientData] = useState({});

    let { event_type_param } = useParams();

    const [error, setError] = useState("");

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                //via post request

                const response = await fetch("http://localhost:7723/client/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ client_id: customerID }),
                });
                const result = await response.json();
                setClientData(result);
            } catch (err) {
                console.log(err);
            }
        };
        if (roleID === "ROLE001") {
            fetchClientData();
        }
    }, []);

    const [addsOnInputs, setAddsOnInputs] = useState([]); // Initialize with one input field

    const addInput = () => {
        setAddsOnInputs([...addsOnInputs, ""]); // Add a new empty input field
    };

    const handleChange = (index, value) => {
        const updatedInputs = [...addsOnInputs];
        updatedInputs[index] = value;
        setAddsOnInputs(updatedInputs);
    };

    const removeInput = (index) => {
        const updatedInputs = addsOnInputs.filter((_, i) => i !== index);
        setAddsOnInputs(updatedInputs);
    };

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");

    const [eventName, setEventName] = useState("");
    const [eventType, setEventType] = useState(
        event_type_param === "More" ? "" : event_type_param
    );
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventVenue, setEventVenue] = useState("");
    const [eventVenueFinal, setEventVenueFinal] = useState(true);
    const [eventTheme, setEventTheme] = useState("");
    const [eventMotif, setEventMotif] = useState("");
    const [eventGuests, setEventGuests] = useState("");
    const [stepCount, setStepCount] = useState(1);
    const [foodID, setFoodID] = useState([]);
    const [steps, setSteps] = useState([
        "Contact",
        "Event",
        "Food",
        "Summary",
        "Terms and Conditions",
    ]);

    const stepIncrement = () => {
        if (stepCount === steps.length) {
            return;
        }
        if (
            stepCount === 1 &&
            (fname === "" || lname === "" || email === "" || contact === "")
        ) {
            setError("Please fill out all fields");
            return;
        } else if (
            stepCount === 2 &&
            (eventName === "" ||
                eventType === "" ||
                eventDate === "" ||
                eventTime === "" ||
                eventVenue === "" ||
                eventTheme === "" ||
                eventMotif === "" ||
                eventGuests === "")
        ) {
            setError("Please fill out all fields");
            return;
        }
        setStepCount((prevCount) => prevCount + 1);
        error && setError("");
    };

    const stepDecrement = () => {
        if (stepCount === 1) {
            return;
        }
        setStepCount((prevCount) => prevCount - 1);
        error && setError("");
    };

    useEffect(() => {
        const fetchFoods = async () => {
            const response = await fetch("http://localhost:7723/foods");
            const data = await response.json();
            setFoods(data);
        };
        const fetchCustomer = async () => {
            const client_id = customerID;
            const response = await fetch("http://localhost:7723/client", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ client_id }),
            });
            const data = await response.json();
            setClient(data);

            setFname(data.client_fname);
            setLname(data.client_lname);
            setEmail(data.client_email);
            setContact(data.client_contact);
        };

        if (customerID) {
            fetchCustomer();
        }

        fetchFoods();
    }, [customerID]);

    const submitReservation = async (e) => {
        e.preventDefault();

        if (customerID === null) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You are not logged in. Please login first.",
                confirmButtonText: "Go to Login",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/login";
                }
            });
            return;
        }

        const reservationCount = await fetch(
            "http://localhost:7723/reservation_count",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ client_id: customerID }),
            }
        );
        const reservation_count = await reservationCount.json();
        console.log(reservation_count);
        if (reservation_count.count !== "0") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You already have a reservation. Please cancel your reservation first before making another one.",
                confirmButtonText: "Go to Reservations",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/profile";
                }
            });
            return;
        }

        Swal.fire({
            //confirming if will continue
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, submit it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const eventDetails = {
                    event_name: eventName,
                    event_type: eventType,
                    event_date: eventDate,
                    event_time: eventTime,
                    event_venue: eventVenue,
                    event_venue_final: eventVenueFinal,
                    event_theme: eventTheme,
                    event_motif: eventMotif,
                    event_guests: eventGuests,
                };

                const response = await fetch("http://localhost:7723/events", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(eventDetails),
                });

                const data = await response.json();

                if (response.ok) {
                    const reservationDetails = {
                        client_id: customerID,
                        client_fname: fname,
                        client_lname: lname,
                        client_email: email,
                        client_contact: contact,
                        event_id: data.event_id,
                        total_price: 56000,
                        status: "Pending",
                    };

                    const reservationResponse = await fetch(
                        "http://localhost:7723/reservation",
                        {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json",
                            },
                            body: JSON.stringify(reservationDetails),
                        }
                    );

                    const reservationData = await reservationResponse.json();

                    if (reservationResponse.ok) {
                        for (const input of addsOnInputs) {
                            if (input !== "") {
                                const addsOnDetails = {
                                    adds_on_name: input,
                                    reservation_id:
                                        reservationData.reservation_id,
                                };

                                const addsOnResponse = await fetch(
                                    "http://localhost:7723/adds_on",
                                    {
                                        method: "POST",
                                        headers: {
                                            "Content-type": "application/json",
                                        },
                                        body: JSON.stringify(addsOnDetails),
                                    }
                                );

                                const addsOnData = await addsOnResponse.json();

                                if (addsOnResponse.ok) {
                                    console.log(addsOnData);
                                }
                            }
                        }

                        //for each food incart

                        for (const id of foodID) {
                            // //reservation_food_table
                            // reservation_food_id varchar (25) //PK
                            // reservation_id varchar (25) //FK
                            // food_id varchar (25) //FK

                            const foodDetails = {
                                reservation_id: reservationData.reservation_id,
                                food_id: id,
                            };

                            const foodResponse = await fetch(
                                "http://localhost:7723/reservation_food",
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-type": "application/json",
                                    },
                                    body: JSON.stringify(foodDetails),
                                }
                            );
                        }
                    }
                }
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Your reservation has been submitted.",
                    confirmButtonText: "Go to Reservations",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/profile";
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Cancelled",
                    text: "Your reservation is safe :)",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        });
    };

    return (
        <>
            <Navbar clientData={clientData} />
            <section className="section bg-blue-100">
                <div className="container mx-auto py-20 h-content flex justify-center items-center min-h-screen">
                    <div className="reservation-container p-6 w-[60%] bg-white">
                        <div className="reservation-header">
                            <h1 className="text-3xl font-bold text-start">
                                Reservation
                            </h1>
                            <p className="text-sm text-start">
                                Please fill out the following details below:
                            </p>
                        </div>
                        <hr className="border-b-1 border-black my-4" />
                        <div className="step-container">
                            <ul className="steps text-center w-full text-[12px]">
                                {
                                    // eslint-disable-next-line array-callback-return
                                    steps.map((step, index) => {
                                        return (
                                            <li
                                                key={index}
                                                className={`step ${
                                                    index + 1 === stepCount
                                                        ? "step-primary"
                                                        : ""
                                                }`}
                                            >
                                                <span className="step-text">
                                                    {step}
                                                </span>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                        <hr className="border-b-1 border-black my-4" />
                        <div className="form-content mb-4">
                            {error !== "" && (
                                <div className="alert alert-error mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="stroke-current shrink-0 h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span className="text-sm">{error}</span>
                                </div>
                            )}
                            {stepCount === 1 ? (
                                <>
                                    <h3 className="text-xl title font-bold text-start">
                                        Contact Information
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="form-control w-full col-span-1">
                                            <label className="label">
                                                <span className="label-text">
                                                    First Name
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                className={`input input-bordered w-full focus:outline-none outline-none ${
                                                    error && fname === ""
                                                        ? "input-error"
                                                        : ""
                                                }`}
                                                name="fname"
                                                value={fname}
                                                onChange={(e) =>
                                                    setFname(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="form-control w-full col-span-1">
                                            <label className="label">
                                                <span className="label-text">
                                                    Last Name
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                className={`input input-bordered w-full focus:outline-none outline-none ${
                                                    error && lname === ""
                                                        ? "input-error"
                                                        : ""
                                                }`}
                                                name="lname"
                                                value={lname}
                                                onChange={(e) =>
                                                    setLname(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="form-control w-full col-span-2">
                                            <label className="label">
                                                <span className="label-text">
                                                    Email Address
                                                </span>
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className={`input input-bordered w-full focus:outline-none outline-none ${
                                                    error && email === ""
                                                        ? "input-error"
                                                        : ""
                                                }`}
                                                name="email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="form-control w-full col-span-2">
                                            <label className="label">
                                                <span className="label-text">
                                                    Contact Number
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Contact"
                                                className={`input input-bordered w-full focus:outline-none outline-none ${
                                                    error && contact === ""
                                                        ? "input-error"
                                                        : ""
                                                }`}
                                                name="contact"
                                                value={contact}
                                                onChange={(e) =>
                                                    setContact(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : stepCount === 2 ? (
                                <>
                                    <h3 className="text-xl title font-bold text-start">
                                        Event Information
                                    </h3>
                                    <div className="grid grid-cols-6 gap-4">
                                        <div className="form-control w-full col-span-3">
                                            <label className="label">
                                                <span className="label-text">
                                                    Event Name
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Event Name"
                                                className={`input input-bordered w-full focus:outline-none outline-none ${
                                                    error && eventName === ""
                                                        ? "input-error"
                                                        : ""
                                                }`}
                                                name="eventName"
                                                value={eventName}
                                                onChange={(e) =>
                                                    setEventName(e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="form-control w-full col-span-3">
                                            <label className="label">
                                                <span className="label-text">
                                                    Event Type
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Event Type"
                                                className={`input input-bordered w-full focus:outline-none outline-none ${
                                                    error && eventType === ""
                                                        ? "input-error"
                                                        : ""
                                                }`}
                                                name="eventType"
                                                value={eventType}
                                                onChange={(e) =>
                                                    setEventType(e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="form-control w-full col-span-2">
                                            <label className="label">
                                                <span className="label-text">
                                                    Event Date
                                                </span>
                                            </label>
                                            <input
                                                type="date"
                                                className={`input input-bordered w-full focus:outline-none outline-none ${
                                                    error && eventDate === ""
                                                        ? "input-error"
                                                        : ""
                                                }`}
                                                name="eventDate"
                                                value={eventDate}
                                                onChange={(e) =>
                                                    setEventDate(e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="form-control w-full col-span-2">
                                            <label className="label">
                                                <span className="label-text">
                                                    Event Time
                                                </span>
                                            </label>
                                            <input
                                                type="time"
                                                className={`input input-bordered w-full focus:outline-none outline-none ${
                                                    error && eventTime === ""
                                                        ? "input-error"
                                                        : ""
                                                }`}
                                                name="eventTime"
                                                value={eventTime}
                                                onChange={(e) =>
                                                    setEventTime(e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="form-control w-full col-span-2">
                                            <label className="label">
                                                <span className="label-text">
                                                    Event Venue
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Event Venue"
                                                className={`input input-bordered w-full focus:outline-none outline-none ${
                                                    error && eventVenue === ""
                                                        ? "input-error"
                                                        : ""
                                                }`}
                                                name="eventVenue"
                                                value={eventVenue}
                                                onChange={(e) =>
                                                    setEventVenue(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        {/* <div className="form-control w-full col-span-1">
                                            <label className="label">
                                                <span className="label-text">
                                                    Final Venue
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Final Venue"
                                                className="input input-bordered w-full focus:outline-none outline-none"
                                                name="eventVenueFinal"
                                                value={eventVenueFinal}
                                                onChange={(e) =>
                                                    setEventVenueFinal(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div> */}

                                        <div className="form-control w-full col-span-2">
                                            <label className="label">
                                                <span className="label-text">
                                                    Event Theme
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Event Theme"
                                                className={`input input-bordered w-full focus:outline-none outline-none ${
                                                    error && eventTheme === ""
                                                        ? "input-error"
                                                        : ""
                                                }`}
                                                name="eventTheme"
                                                value={eventTheme}
                                                onChange={(e) =>
                                                    setEventTheme(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="form-control w-full col-span-2">
                                            <label className="label">
                                                <span className="label-text">
                                                    Event Motif
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Event Motif"
                                                className={`input input-bordered w-full focus:outline-none outline-none ${
                                                    error && eventMotif === ""
                                                        ? "input-error"
                                                        : ""
                                                }`}
                                                name="eventMotif"
                                                value={eventMotif}
                                                onChange={(e) =>
                                                    setEventMotif(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="form-control w-full col-span-2">
                                            <label className="label">
                                                <span className="label-text">
                                                    No. of Guest:
                                                </span>
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Event Guests"
                                                className={`input input-bordered w-full focus:outline-none outline-none ${
                                                    error && eventGuests === ""
                                                        ? "input-error"
                                                        : ""
                                                }`}
                                                name="eventGuests"
                                                value={eventGuests}
                                                onChange={(e) =>
                                                    setEventGuests(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="form-control w-full col-span-6">
                                            <label className="label">
                                                <span className="label-text title text-base">
                                                    Add Ons
                                                </span>
                                            </label>
                                            {addsOnInputs.map(
                                                (input, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between w-full gap-2 mb-2"
                                                    >
                                                        <input
                                                            type="text"
                                                            value={input}
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    index,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="input input-bordered w-full focus:outline-none outline-none"
                                                        />
                                                        <button
                                                            onClick={() =>
                                                                removeInput(
                                                                    index
                                                                )
                                                            }
                                                            className="btn btn-error"
                                                            type="button"
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                            />
                                                        </button>
                                                    </div>
                                                )
                                            )}
                                            <button
                                                onClick={addInput}
                                                className="btn btn-primary"
                                                type="button"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : stepCount === 3 ? (
                                <>
                                    <h3 className="text-xl title font-bold text-start mb-10">
                                        Food Information
                                    </h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {foods &&
                                            foods.map((food) => {
                                                return (
                                                    <FoodCard
                                                        key={food.food_id}
                                                        food={food}
                                                        foodID={foodID}
                                                        setFoodID={setFoodID}
                                                    />
                                                );
                                            })}
                                    </div>
                                </>
                            ) : stepCount === 4 ? (
                                <>
                                    <div className="summary-review">
                                        <h3 className="text-xl title font-bold text-start">
                                            Summary Review
                                        </h3>
                                        <p className="text-start">
                                            Displayed below are the information
                                            you have provided. Please review the
                                            information before submitting.
                                        </p>
                                        <div className="divider my-2"></div>
                                        <div className="contact-info">
                                            <h6 className="font-bold text-start title text-xl">
                                                Contact Information
                                            </h6>
                                            <ul className="list-none text-start">
                                                <li>
                                                    <span className="font-bold">
                                                        Name:
                                                    </span>{" "}
                                                    {fname} {lname}
                                                </li>
                                                <li>
                                                    <span className="font-bold">
                                                        Email:
                                                    </span>{" "}
                                                    {email}
                                                </li>
                                                <li>
                                                    <span className="font-bold">
                                                        Contact:
                                                    </span>{" "}
                                                    {contact}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="divider my-2"></div>
                                        <div className="event-info">
                                            <h6 className="font-bold text-start title text-xl">
                                                Event Information
                                            </h6>
                                            <ul className="list-none text-start">
                                                <li>
                                                    <span className="font-bold">
                                                        Event Name:
                                                    </span>{" "}
                                                    {eventName}
                                                </li>
                                                <li>
                                                    <span className="font-bold">
                                                        Event Type:
                                                    </span>{" "}
                                                    {eventType}
                                                </li>
                                                <li>
                                                    <span className="font-bold">
                                                        Event Date:
                                                    </span>{" "}
                                                    {eventDate}
                                                </li>
                                                <li>
                                                    <span className="font-bold">
                                                        Event Time:
                                                    </span>{" "}
                                                    {eventTime}
                                                </li>
                                                <li>
                                                    <span className="font-bold">
                                                        Event Venue:
                                                    </span>{" "}
                                                    {eventVenue}
                                                </li>
                                                <li>
                                                    <span className="font-bold">
                                                        Event Theme:
                                                    </span>{" "}
                                                    {eventTheme}
                                                </li>
                                                <li>
                                                    <span className="font-bold">
                                                        Event Motif:
                                                    </span>{" "}
                                                    {eventMotif}
                                                </li>
                                                <li>
                                                    <span className="font-bold">
                                                        No. of Guest:
                                                    </span>{" "}
                                                    {eventGuests} pax
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="divider my-2"></div>
                                        <div className="food-info">
                                            <h6 className="font-bold text-start title text-xl">
                                                Food Information
                                            </h6>
                                            <ul className="list-none text-start">
                                                {foodID &&
                                                    foodID.map((id, index) => {
                                                        return (
                                                            <li key={id}>
                                                                {index + 1}
                                                                {". "}

                                                                {
                                                                    foods.find(
                                                                        (
                                                                            food
                                                                        ) =>
                                                                            food.food_id ===
                                                                            id
                                                                    ).food_name
                                                                }
                                                            </li>
                                                        );
                                                    })}
                                            </ul>
                                        </div>
                                        {/* display add ons */}
                                        {addsOnInputs.length !== 0 && (
                                            <>
                                                {" "}
                                                <div className="divider my-2"></div>
                                                <div className="add-ons">
                                                    <h6 className="font-bold text-start title text-xl">
                                                        Add Ons
                                                    </h6>
                                                    <ul className="list-none text-start">
                                                        {addsOnInputs.map(
                                                            (input, index) => {
                                                                return (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {index +
                                                                            1}
                                                                        {". "}
                                                                        {input}
                                                                    </li>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <h3 className="text-xl title font-bold text-start">
                                    Billing Information
                                </h3>
                            )}
                        </div>
                        <div className="button-container flex justify-between">
                            {stepCount === 1 ? (
                                <Link
                                    to="/"
                                    className="btn btn-link no-underline px-0"
                                >
                                    Back to Home
                                </Link>
                            ) : (
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={stepDecrement}
                                >
                                    Back
                                </button>
                            )}
                            {
                                // eslint-disable-next-line no-nested-ternary
                                stepCount === steps.length && customerID ? (
                                    <button
                                        className="btn btn-primary"
                                        onClick={submitReservation}
                                    >
                                        Submit
                                    </button>
                                ) : stepCount === steps.length &&
                                  !customerID ? (
                                    <>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "warning_modal"
                                                    )
                                                    .showModal()
                                            }
                                        >
                                            Submit
                                        </button>
                                        <dialog
                                            id="warning_modal"
                                            className="modal"
                                        >
                                            <div className="modal-box">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                        ✕
                                                    </button>
                                                </form>
                                                <h3 className="font-bold text-lg">
                                                    Warning
                                                </h3>
                                                <p className="py-4">
                                                    You are not logged in. You
                                                    will be redirected to the
                                                    login page by clicking the
                                                    "OK" button.
                                                </p>
                                                <Link
                                                    to="/login"
                                                    className="btn btn-primary"
                                                >
                                                    OK
                                                </Link>
                                            </div>
                                        </dialog>
                                    </>
                                ) : (
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={stepIncrement}
                                    >
                                        Next
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Reservation;
