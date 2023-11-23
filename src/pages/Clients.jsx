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
            }
        }
    }, []);

    useEffect(() => {
        const getClients = async () => {
            try {
                const response = await fetch("http://localhost:7723/clients");
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
        <section className="clients__section h-screen bg-blue-100 flex flex-row">
            <Sidebar roleID={roleID} />
            <div className="clients__container p-5 flex flex-col w-full">
                <div className="table p-4 bg-white rounded-lg shadow-lg overflow-x-auto w-full">
                    <div className="search-container flex justify-start items-center w-content mb-2">
                        <input
                            type="text"
                            className="search-input border border-gray-300 rounded-md p-2"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <span className="search-icon">
                            <FaSearch />
                        </span>
                    </div>
                    <div className="divider my-1"></div>
                    <div className="box">
                        <DataTable
                            title="Clients"
                            columns={columns}
                            data={clients}
                            pagination={true}
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[
                                5, 10, 15, 20, 25, 30,
                            ]}
                            paginationComponentOptions={{
                                rowsPerPageText: "Rows per page:",
                            }}
                            noHeader={true}
                            fixedHeader={true}
                            fixedHeaderScrollHeight="600px"
                            highlightOnHover={true}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Clients;
