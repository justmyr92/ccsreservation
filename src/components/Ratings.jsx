import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenToSquare,
    faStar,
    faStarHalf,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";

const Ratings = ({ clientData }) => {
    const [reload, setReload] = useState(false);
    const [ratings, setRatings] = useState([]);
    const ID = localStorage.getItem("userID");
    useEffect(() => {
        const getRatings = async () => {
            const response = await fetch(
                `https://ccsreservaton.online/api/event_reservation_rating/${ID}`
            );

            const data = await response.json();
            console.log(data);

            setRatings(data);
        };
        getRatings();
        setReload(false);
    }, [ID, reload]);

    const deleteRating = async (rating_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",

            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes Delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await fetch(
                    `https://ccsreservaton.online/api/ratings/${rating_id}`,
                    {
                        method: "DELETE",
                    }
                );
                const data = await response.json();
                console.log(data);

                setReload(true);
            }
        });
    };

    const column = [
        {
            name: "ID",
            selector: (row) => row.rating_id,
        },
        {
            name: "Event Type",
            selector: (row) => row.event_type,
        },
        {
            name: "Date",
            selector: (row) => row.event_date,
        },
        {
            name: "Rate",
            selector: (row) => row.rating_value,
        },
        {
            name: "",
            selector: (row) => (
                <div className="flex gap-2">
                    <button
                        className="btn bg-red-500 text-white"
                        onClick={() => deleteRating(row.rating_id)}
                    >
                        {/* Add your delete logic here */}
                        Delete
                    </button>
                    <button className="btn btn-info text-white">
                        {/* Add your edit logic here */}
                        Edit
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="ratings__main bg-gradient-to-r from-cyan-500 to-blue-500 w-[100%] p-6 h-[100%] overflow-y-auto">
            <div className="container bg-white p-6 rounded-lg min-h-[100%]">
                <div className="flex justify-between">
                    <h3 className="text-3xl title">Rate Service</h3>
                </div>
                <div className="overflow-x-auto">
                    <DataTable
                        columns={column}
                        data={ratings}
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
    );
};

export default Ratings;
