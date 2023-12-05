import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FaSearch } from "react-icons/fa";

const Reservations = () => {
    const [userID, setUserID] = useState(localStorage.getItem("userID"));
    const [roleID, setRoleID] = useState(localStorage.getItem("roleID"));
    const [addsOn, setAddsOn] = useState([]);
    const [event, setEvent] = useState([]);
    const [search, setSearch] = useState("");
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
            const response = await fetch(
                "https://ccsreservaton.online/api/reservations"
            );
            const result = await response.json();
            if (search !== "") {
                setReservations(
                    result.filter(
                        (res) =>
                            res.reservation_id
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            res.client_fname
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            res.client_lname
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            res.client_email
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            res.client_contact
                                .toLowerCase()
                                .includes(search.toLowerCase())
                    )
                );
            } else {
                setReservations(result);
            }
        };
        getReservations();
    }, [search]);
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
        <section className="h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-row">
            <Sidebar roleID={roleID} />
            <div className="flex flex-col w-full h-full p-3 overflow-auto">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-3xl font-bold title tracking-wide">
                            Reservations
                        </h1>
                        <div className="flex items-center space-x-2 relative">
                            <input
                                type="text"
                                className="border border-gray-300 text-gray-900 rounded-md px-3 py-2.5 focus:outline-none focus:border-blue-500"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <FaSearch className="absolute right-4 text-gray-500" />
                        </div>
                    </div>
                    <hr className="my-2 border-blue-500 border-b-2" />
                    <div className="box">
                        <DataTable
                            columns={columns}
                            data={reservations}
                            pagination={true}
                            noHeader={true}
                            fixedHeader={true}
                            fixedHeaderScrollHeight="600px"
                            highlightOnHover={true}
                            striped={true}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reservations;
