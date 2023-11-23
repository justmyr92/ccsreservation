import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Reservations = () => {
    const [userID, setUserID] = useState(localStorage.getItem("userID"));
    const [roleID, setRoleID] = useState(localStorage.getItem("roleID"));
    const [addsOn, setAddsOn] = useState([]);
    const [event, setEvent] = useState([]);

    useEffect(() => {
        if (!userID) {
            window.location.href = "/login";
        } else {
            if (roleID === "ROLE001") {
                window.location.href = "/";
            }
        }
    }, []);

    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const getReservations = async () => {
            const response = await fetch("http://localhost:7723/reservations");
            const result = await response.json();
            setReservations(result);
        };
        getReservations();
    }, []);

    // useEffect(() => {
    //     if (selectedReservation) {
    //         const getReservationDetails = async () => {
    //             const addsOnResponse = await fetch(
    //                 `http://localhost:7723/adds_on/${selectedReservation}`
    //             );
    //             const addsOnResult = await addsOnResponse.json();
    //             setAddsOn(addsOnResult);
    //         };
    //         getReservationDetails();
    //     }
    // }, [selectedReservation]);

    const columns = [
        { name: "ID", selector: (row) => row.reservation_id, sortable: true },
        {
            name: "Client Name",
            selector: (row) => row.client_fname + " " + row.client_lname,
            sortable: true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: "Email",
            selector: (row) => row.client_email,
            sortable: true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: "Contact",
            selector: (row) => row.client_contact,
            sortable: true,
        },
        {
            name: "Total Price",
            selector: (row) => row.total_price,
            sortable: true,
        },
        {
            name: "Actions",
            selector: (row) => (
                <>
                    <Link
                        to={`/quotation/${row.reservation_id}`}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-8 w-8 flex justify-center items-center"
                    >
                        <FontAwesomeIcon icon={faEye} />
                    </Link>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
        },
    ];

    return (
        <section className="clients__section h-screen bg-blue-100 flex flex-row">
            <Sidebar roleID={roleID} />
            <div className="clients__container p-5 flex flex-col w-full">
                <DataTable columns={columns} data={reservations} />
            </div>
        </section>
    );
};

export default Reservations;
