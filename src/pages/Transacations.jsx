import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";

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

    // transaction_id | transaction_date | transaction_time | transaction_total | transaction_status | transaction_type | transaction_payment | reservation_id

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

    useEffect(() => {
        const response = fetch("http://localhost:7723/transactions");
        response
            .then((res) => res.json())
            .then((data) => {
                setTransactions(data);
            });
    }, []);

    return (
        <section className="dashboard__section h-screen bg-blue-100 flex flex-row">
            <Sidebar roleID={roleID} />
            <div className="clients__container p-5 flex flex-col w-full">
                <div className="table p-4 bg-white rounded-lg shadow-lg overflow-x-auto w-full">
                    <div className="flex justify-between">
                        <h3 className="text-2xl">Transactions</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <DataTable columns={columns} data={transactions} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Transaction;
