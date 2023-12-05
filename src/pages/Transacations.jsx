import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";
import { FaSearch } from "react-icons/fa";

const Transaction = () => {
    const [userID, setUserID] = useState(localStorage.getItem("userID"));
    const [roleID, setRoleID] = useState(localStorage.getItem("roleID"));

    useEffect(() => {
        if (!userID) {
            window.location.href = "/login";
        } else {
            if (roleID === "ROLE001") {
                window.location.href = "/";
            }
        }
    }, []);

    const [transactions, setTransactions] = useState([]);

    const columns = [
        {
            name: "ID",
            selector: (row) => row.transaction_id,
        },
        {
            name: "Date",
            selector: (row) => row.transaction_date,
        },
        {
            name: "Time",
            selector: (row) => row.transaction_time,
        },
        {
            name: "Total",
            selector: (row) => row.transaction_total,
        },
        {
            name: "Status",
            selector: (row) => row.transaction_status,
        },
        {
            name: "Type",
            selector: (row) => row.transaction_type,
        },
        {
            name: "Payment",
            selector: (row) => row.transaction_payment,
        },
        {
            name: "Reservation ID",
            selector: (row) => row.reservation_id,
        },
    ];
    const [search, setSearch] = useState("");
    useEffect(() => {
        const getClients = async () => {
            const response = fetch(
                "https://ccsreservaton.online/api/transactions"
            );
            const data = await (await response).json();
            setTransactions(data);
        };

        if (search === "") {
            getClients();
        } else {
            setTransactions(
                transactions.filter((transaction) => {
                    const searchLowerCase = search.toLowerCase();

                    return (
                        transaction.transaction_id
                            .toString()
                            .toLowerCase()
                            .includes(searchLowerCase) ||
                        transaction.transaction_date
                            .toString()
                            .toLowerCase()
                            .includes(searchLowerCase) ||
                        transaction.transaction_time
                            .toString()
                            .toLowerCase()
                            .includes(searchLowerCase) ||
                        transaction.transaction_total
                            .toString()
                            .toLowerCase()
                            .includes(searchLowerCase) ||
                        transaction.transaction_status
                            .toString()
                            .toLowerCase()
                            .includes(searchLowerCase) ||
                        transaction.transaction_type
                            .toString()
                            .toLowerCase()
                            .includes(searchLowerCase) ||
                        transaction.transaction_payment
                            .toString()
                            .toLowerCase()
                            .includes(searchLowerCase) ||
                        transaction.reservation_id
                            .toString()
                            .toLowerCase()
                            .includes(searchLowerCase)
                    );
                })
            );
        }
    }, [search]);

    return (
        <section className="dashboard__section h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-row">
            <Sidebar roleID={roleID} />
            <div className="flex flex-col w-full h-full p-3 overflow-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 min-h-full">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-3xl font-bold title tracking-wide">
                            Transactions
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
                            data={transactions}
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

export default Transaction;
