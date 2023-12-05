import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";
import { FaSearch } from "react-icons/fa";

const Clients = () => {
    const [userID, setUserID] = useState(localStorage.getItem("userID"));
    const [roleID, setRoleID] = useState(localStorage.getItem("roleID"));
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState("");
    const columns = [
        { name: "ID", selector: (row) => row.client_id, sortable: true },
        {
            name: "First Name",
            selector: (row) => row.client_fname,
            sortable: true,
        },
        {
            name: "Last Name",
            selector: (row) => row.client_lname,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.client_email,
            sortable: true,
        },
        {
            name: "Contact",
            selector: (row) => row.client_contact,
            sortable: true,
        },
        {
            name: "Street",
            selector: (row) => row.client_street,
            sortable: true,
        },
        {
            name: "Barangay",
            selector: (row) => row.client_barangay,
            sortable: true,
        },
        {
            name: "City",
            selector: (row) => row.client_city,
            sortable: true,
        },
    ];

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

    useEffect(() => {
        const getClients = async () => {
            try {
                const response = await fetch(
                    "https://ccsreservaton.online/api/clients"
                );
                const result = await response.json();
                setClients(result);
            } catch (err) {
                console.log(err);
            }
        };

        if (search === "") {
            getClients();
        } else {
            const filteredClients = clients.filter((client) => {
                return (
                    client.client_fname
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    client.client_lname
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    client.client_email
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    client.client_contact
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    client.client_street
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    client.client_barangay
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    client.client_city
                        .toLowerCase()
                        .includes(search.toLowerCase())
                );
            });
            setClients(filteredClients);
        }
    }, [search]);

    return (
        <section className="clients__section h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-row">
            <Sidebar roleID={roleID} />
            <div className="flex flex-col w-full h-full p-3 overflow-auto">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-3xl font-bold title tracking-wide">
                            Clients
                        </h1>
                        <div className="flex items-center space-x-2 relative">
                            <input
                                type="text"
                                className="border border-gray-300 text-gray-900 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
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
                            data={clients}
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

export default Clients;
