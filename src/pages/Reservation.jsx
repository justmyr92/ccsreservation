import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const Reservation = () => {
    const [foods, setFoods] = useState([]);
    const [customerID, setCustomerID] = useState(
        localStorage.getItem("userID")
    );
    const [roleID, setRoleID] = useState(localStorage.getItem("roleID"));
    const [client, setClient] = useState([]);
    const [clientData, setClientData] = useState({});

    const { event_type_param } = useParams();

    const [error, setError] = useState("");

    const [foodTypes, setFoodTypes] = useState([]);

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                //via post request

                const response = await fetch(
                    "https://ccsreservaton.online/api/client/",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ client_id: customerID }),
                    }
                );
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

    const [addsOn, setAddsOn] = useState([
        { name: "Sounds & Lights (On the day)", included: false },
        {
            name: "Sounds & Lights (A day before and on the day)",
            included: false,
        },
        { name: "Lechon", included: false },
        { name: "Scaffold", included: false },
        { name: "Cake", included: false },
        { name: "Clown", included: false },
        { name: "Hair & Make up", included: false },
        { name: "Host", included: false },
        { name: "Flower Bouquet", included: false },
        { name: "Give-Away", included: false },
        { name: "Coordinator", included: false },
        { name: "Invitations", included: false },
    ]);

    const handleCheckboxChange = (index) => {
        setAddsOn((prevAddsOn) => {
            const newAddsOn = [...prevAddsOn];
            newAddsOn[index] = {
                ...newAddsOn[index],
                included: !newAddsOn[index].included,
            };
            return newAddsOn;
        });
    };

    useEffect(() => {
        console.log(addsOn);
    }, [addsOn]);

    // const addInput = () => {
    //     setAddsOnInputs([...addsOnInputs, ""]); // Add a new empty input field
    // };

    // const handleChange = (index, value) => {
    //     const updatedInputs = [...addsOnInputs];
    //     updatedInputs[index] = value;
    //     setAddsOnInputs(updatedInputs);
    // };

    // const removeInput = (index) => {
    //     const updatedInputs = addsOnInputs.filter((_, i) => i !== index);
    //     setAddsOnInputs(updatedInputs);
    // };

    const event_types = [
        "baptismal",
        "wedding",
        "birthday",
        "company's party",
        "office and school party",
        "children's party",
        "anniversary",
        "inauguration",
        "house warming",
        "others",
    ];

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");

    const [eventName, setEventName] = useState("");
    const [eventType, setEventType] = useState(
        event_type_param === "more" ? "" : event_type_param
    );
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventVenue, setEventVenue] = useState("");
    const [specifiedEventType, setSpecifiedEventType] = useState("");
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
    const [eventDateError, setEventDateError] = useState("");

    useEffect(() => {}, [eventType]);

    const stepIncrement = () => {
        //event must be in the future
        const today = new Date();
        const eventDate2 = new Date(eventDate);
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
        } else if (stepCount === 2 && eventDate2 < today) {
            setError("Event date must be in the future");
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
            const response = await fetch(
                "https://ccsreservaton.online/api/foods"
            );
            const data = await response.json();
            setFoods(data);
        };
        const fetchCustomer = async () => {
            const client_id = customerID;
            const response = await fetch(
                "https://ccsreservaton.online/api/client",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ client_id }),
                }
            );
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

    useEffect(() => {
        const fetchFoodTypes = async () => {
            const response = await fetch(
                "https://ccsreservaton.online/api/distinct/food_types"
            );
            const data = await response.json();
            setFoodTypes(data);
        };
        fetchFoodTypes();
    }, []);

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
        const groupedFoods = foods.reduce((acc, food) => {
            const type = food.food_type || "Other";
            acc[type] = [...(acc[type] || []), food];
            return acc;
        }, {});
        const reservationCount = await fetch(
            "https://ccsreservaton.online/api/reservation_count",
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
                    window.location.href = "/user/reservations";
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
                    event_type:
                        eventType === "Others" ? specifiedEventType : eventType,
                    event_date: eventDate,
                    event_time: eventTime,
                    event_venue: eventVenue,
                    event_venue_final: eventVenueFinal,
                    event_theme: eventTheme,
                    event_motif: eventMotif,
                    event_guests: eventGuests,
                };

                const response = await fetch(
                    "https://ccsreservaton.online/api/events",
                    {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify(eventDetails),
                    }
                );

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
                        "https://ccsreservaton.online/api/reservation",
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
                        //send email to admin
                        const emailDetails = {
                            from_email: email,
                            to_name: "Admin",
                            message: `You have a new reservation with the following details: \n
                            ID : ${reservationData.reservation_id} \n
                            Name: ${fname} ${lname} \n
                            Email: ${email} \n
                            Contact: ${contact} \n
                            Event Name: ${eventName} \n
                            Event Type: ${eventType} \n
                            Event Date: ${eventDate} \n
                            Event Time: ${eventTime} \n
                            Event Venue: ${eventVenue} \n
                            Event Theme: ${eventTheme} \n
                            Please check your reservations for more details.`,
                        };

                        const sendEmail = (e) => {
                            e.preventDefault();

                            emailjs
                                .send(
                                    "service_a4n0u6e",
                                    "template_s33vriw",
                                    emailDetails,
                                    "gqPl6Tqkq5adomnIU"
                                )
                                .then(
                                    (result) => {
                                        console.log(result.text);
                                    },
                                    (error) => {
                                        console.log(error.text);
                                    }
                                );
                        };

                        sendEmail(e);

                        for (const addOn of addsOn) {
                            if (addOn.included) {
                                const addsOnDetails = {
                                    adds_on_name: addOn.name,
                                    reservation_id:
                                        reservationData.reservation_id,
                                };

                                const addsOnResponse = await fetch(
                                    "https://ccsreservaton.online/api/adds_on",
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
                                "https://ccsreservaton.online/api/reservation_food",
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
                        window.location.href = "/user/reservations";
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

    const [agreement, setAgreement] = useState(false);

    const [foodType, setFoodType] = useState("All");

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
                                        <div className="form-control w-full col-span-2">
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

                                        <div className="form-control w-full col-span-2">
                                            <label className="label">
                                                <span className="label-text">
                                                    Event Type
                                                </span>
                                            </label>
                                            <select
                                                className={`select select-bordered w-full focus:outline-none outline-none capitalize ${
                                                    error && eventType === ""
                                                        ? "select-error"
                                                        : ""
                                                }`}
                                                name="eventType"
                                                value={eventType}
                                                onChange={(e) =>
                                                    setEventType(e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    Select an event type
                                                </option>
                                                {event_types.map(
                                                    (type, index) => (
                                                        <option
                                                            key={index}
                                                            value={type}
                                                        >
                                                            {type}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>

                                        <div className="form-control w-full col-span-2">
                                            <label className="label">
                                                <span className="label-text">
                                                    If other's, please specify
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Specify Event Type"
                                                className={`input input-bordered w-full focus:outline-none outline-none ${
                                                    error &&
                                                    eventType === "others" &&
                                                    specifiedEventType === ""
                                                        ? "input-error"
                                                        : ""
                                                }`}
                                                name="specifiedEventType"
                                                value={specifiedEventType}
                                                onChange={(e) =>
                                                    setSpecifiedEventType(
                                                        e.target.value
                                                    )
                                                }
                                                disabled={
                                                    eventType !== "others"
                                                } // Disable the input field unless "others" is selected
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
                                            {/* {addsOnInputs.map(
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
                                            </button> */}

                                            {/* Make a adds on check list */}
                                            <div className="grid grid-cols-2 gap-4">
                                                {addsOn.map((item, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox w-5 h-5"
                                                            checked={
                                                                item.included
                                                            }
                                                            onChange={() =>
                                                                handleCheckboxChange(
                                                                    index
                                                                )
                                                            }
                                                        />
                                                        {item.name}
                                                    </li>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : stepCount === 3 ? (
                                <>
                                    <h3 className="text-xl title font-bold text-start mb-10">
                                        Food Information
                                    </h3>
                                    <div className="grid grid-cols-4 gap-2 mb-3">
                                        <button
                                            type="button"
                                            className={`text-sm ${
                                                foodType === "All"
                                                    ? "btn btn-primary"
                                                    : ""
                                            }`}
                                            onClick={() => setFoodType("All")}
                                        >
                                            All
                                        </button>
                                        {foodTypes.map((foodtype, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() =>
                                                    setFoodType(
                                                        foodtype.food_type
                                                    )
                                                }
                                                className={`text-sm ${
                                                    foodtype.food_type ===
                                                    foodType
                                                        ? "btn btn-primary"
                                                        : ""
                                                }`}
                                            >
                                                {foodtype.food_type}
                                            </button>
                                        ))}
                                    </div>

                                    <h3 className="text-xl title font-bold text-start">
                                        {foodType}
                                    </h3>
                                    <hr className="border-b-1 border-black mt-4 mb-10" />
                                    <div className="grid grid-cols-3 gap-4">
                                        {foods
                                            .filter((food) => {
                                                // Filter foods based on the selected foodType
                                                return (
                                                    foodType === "All" ||
                                                    food.food_type === foodType
                                                );
                                            })
                                            .map((food, index) => (
                                                <FoodCard
                                                    key={food.food_id}
                                                    food={food}
                                                    foodID={foodID}
                                                    setFoodID={setFoodID}
                                                />
                                            ))}
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
                                        {/* {addsOnInputs.length !== 0 && (
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
                                        )} */}
                                        {addsOn.length !== 0 && (
                                            <>
                                                <div className="divider my-2"></div>
                                                <div className="add-ons">
                                                    <h6 className="font-bold text-start title text-xl">
                                                        Add Ons
                                                    </h6>
                                                    <ul className="list-none text-start">
                                                        {addsOn.map(
                                                            (addOn, index) =>
                                                                addOn.included && (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {index +
                                                                            1}
                                                                        .{" "}
                                                                        {
                                                                            addOn.name
                                                                        }
                                                                    </li>
                                                                )
                                                        )}
                                                    </ul>
                                                </div>
                                            </>
                                        )}{" "}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-xl title font-bold text-start">
                                        Calinao's Catering Services -
                                        Reservation Terms
                                    </h3>

                                    <p class="mb-4">
                                        Before submitting your reservation,
                                        kindly note the following:
                                    </p>

                                    <ol class="list-decimal ml-6 mb-4">
                                        <li class="mb-2">
                                            **Reservation Confirmation:**
                                            <ul class="list-disc ml-6">
                                                <li>
                                                    Your reservation is subject
                                                    to availability.
                                                </li>
                                                <li>
                                                    A Calinao's representative
                                                    will confirm details with
                                                    you.
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="mb-2">
                                            **Proposal and Payment:**
                                            <ul class="list-disc ml-6">
                                                <li>
                                                    A detailed proposal will be
                                                    provided.
                                                </li>
                                                <li>
                                                    Deposit may be required,
                                                    with payment details in the
                                                    proposal.
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="mb-2">
                                            **Changes and Cancellations:**
                                            <ul class="list-disc ml-6">
                                                <li>
                                                    Changes must be communicated
                                                    promptly.
                                                </li>
                                                <li>
                                                    Cancellations are subject to
                                                    our policy outlined in the
                                                    proposal.
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="mb-2">
                                            **Communication:**
                                            <ul class="list-disc ml-6">
                                                <li>
                                                    Ensure accurate and
                                                    monitored contact
                                                    information.
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="mb-2">
                                            **Final Confirmation:**
                                            <ul class="list-disc ml-6">
                                                <li>
                                                    Reservation is finalized
                                                    upon agreement and payment.
                                                </li>
                                            </ul>
                                        </li>
                                    </ol>

                                    <p class="mt-4">
                                        We appreciate your understanding. Expect
                                        the proposal soon—please wait for
                                        further notice.
                                    </p>

                                    <p class="mt-4">
                                        Thank you for choosing Calinao's
                                        Catering Services!
                                    </p>

                                    <div class="mt-4">
                                        <label class="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                class="form-checkbox"
                                                checked={agreement}
                                                onChange={() =>
                                                    setAgreement(!agreement)
                                                }
                                            />
                                            <span class="ml-2">
                                                I agree to the terms and
                                                conditions
                                            </span>
                                        </label>
                                    </div>
                                </>
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
                                        disabled={agreement === false}
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
                                            disabled={agreement === false}
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
