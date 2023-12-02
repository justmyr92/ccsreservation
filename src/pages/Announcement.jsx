import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const Announcement = () => {
    const [userID, setUserID] = useState(localStorage.getItem("userID"));
    const [roleID, setRoleID] = useState(localStorage.getItem("roleID"));
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!userID) {
            window.location.href = "/login";
        } else {
            if (roleID === "ROLE001") {
                window.location.href = "/";
            }
        }
    }, []);

    const form = useRef();

    const [clients, setClients] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [search, setSearch] = useState("");

    const columns = [
        {
            name: "Announcement ID",
            selector: (row) => row.announcement_id,
            sortable: true,
        },
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Message",
            selector: (row) => row.announcement_message,
            sortable: true,
        },
        {
            name: "Date Posted",
            // format date to MM/DD/YYYY HH:MM:SS AM/PM
            selector: (row) => {
                const date = new Date(row.announcement_date);

                const options = {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                };

                return date.toLocaleDateString("en-US", options);
            },
            sortable: true,
        },

        {
            name: "Actions",
            selector: (row) => row.announcement_id,
            sortable: true,
            cell: (row) => (
                <div className="flex gap-2">
                    <button className="btn btn-primary">
                        <FaEdit />
                    </button>
                    <button className="btn btn-error">
                        <FaTrash />
                    </button>
                </div>
            ),
        },
    ];

    useEffect(() => {
        const getClients = async () => {
            const response = await fetch("http://localhost:7723/clients");
            const data = await response.json();
            setClients(data);
        };
        getClients();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:7723/announcements");
            const data = await response.json();
            return data;
        };

        const filterAnnouncements = (data) => {
            const filteredAnnouncements = data.filter((announcement) => {
                const searchLowerCase = search.toLowerCase();
                return (
                    announcement.announcement_id
                        .toString()
                        .toLowerCase()
                        .includes(searchLowerCase) ||
                    announcement.title
                        .toLowerCase()
                        .includes(searchLowerCase) ||
                    announcement.announcement_message
                        .toString()
                        .toLowerCase()
                        .includes(searchLowerCase) ||
                    announcement.announcement_date
                        .toString()
                        .toLowerCase()
                        .includes(searchLowerCase)
                );
            });

            setAnnouncements(filteredAnnouncements);
        };

        const fetchDataAndFilter = async () => {
            const data = await fetchData();

            if (search === "") {
                setAnnouncements(data);
            } else {
                filterAnnouncements(data);
            }
        };

        fetchDataAndFilter();
    }, [search]);

    // const sendEmail = async (e) => {
    //     e.preventDefault();

    //     // Loop through clients
    //     // Loop through clients
    //     for (const client of clients) {
    //         // Set the values for the current client
    //         form.current["to_name"].value = client.client_fname;
    //         form.current["to_email"].value = client.client_email;
    //         form.current["announcement_date_posted"].value =
    //             new Date().toLocaleDateString();

    //         // Log the values for the current client
    //         console.log("to_name:", form.current["to_name"].value);
    //         console.log("to_email:", form.current["to_email"].value);
    //         console.log(
    //             "announcement_date_posted:",
    //             form.current["announcement_date_posted"].value
    //         );

    //         try {
    //             // Send the email for the current client
    //             const result = await emailjs.sendForm(
    //                 "service_a4n0u6e", //
    //                 "template_xag31xl",
    //                 form.current,
    //                 "gqPl6Tqkq5adomnIU"
    //             );

    //             console.log(result.text);
    //             console.log("Message sent to", client.client_email);
    //         } catch (error) {
    //             console.error(error.text);
    //         }
    //     }

    //     const announcement_id = "ANN" + Math.floor(Math.random() * 9000 + 1000);
    //     const title = form.current["announcement_title"].value;
    //     const announcement_message = form.current["message"].value;
    //     const announcement_date = new Date();

    //     const insertAnnouncement = async () => {
    //         try {
    //             const response = await fetch(
    //                 "http://localhost:7723/announcements",
    //                 {
    //                     method: "POST",
    //                     headers: { "Content-Type": "application/json" },
    //                     body: JSON.stringify({
    //                         announcement_id,
    //                         title,
    //                         announcement_message,
    //                         announcement_date,
    //                     }),
    //                 }
    //             );
    //             const result = await response.json();
    //             console.log(result);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };

    //     insertAnnouncement();

    //     // Close the modal after sending emails
    //     document.getElementById("my_modal_4").close();
    // };

    const sendEmail = async (e) => {
        e.preventDefault();

        // Display loading spinner or any other loading indication
        // You can use state to control the loading state
        setLoading(true);

        // Loop through clients
        for (const client of clients) {
            // Set the values for the current client
            form.current["to_name"].value = client.client_fname;
            form.current["to_email"].value = client.client_email;
            form.current["announcement_date_posted"].value =
                new Date().toLocaleDateString();

            // Log the values for the current client
            console.log("to_name:", form.current["to_name"].value);
            console.log("to_email:", form.current["to_email"].value);
            console.log(
                "announcement_date_posted:",
                form.current["announcement_date_posted"].value
            );

            try {
                // Send the email for the current client
                const result = await emailjs.sendForm(
                    "service_a4n0u6e",
                    "template_xag31xl",
                    form.current,
                    "gqPl6Tqkq5adomnIU"
                );

                console.log(result.text);
                console.log("Message sent to", client.client_email);
            } catch (error) {
                console.error(error.text);
            }
        }

        // After sending emails, proceed with inserting the announcement
        const announcement_id = "ANN" + Math.floor(Math.random() * 9000 + 1000);
        const title = form.current["announcement_title"].value;
        const announcement_message = form.current["message"].value;
        const announcement_date = new Date();

        const insertAnnouncement = async () => {
            try {
                const response = await fetch(
                    "http://localhost:7723/announcements",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            announcement_id,
                            title,
                            announcement_message,
                            announcement_date,
                        }),
                    }
                );
                const result = await response.json();
                console.log(result);
            } catch (err) {
                console.log(err);
            }
        };

        insertAnnouncement();

        // Close the modal after sending emails
        document.getElementById("my_modal_4").close();

        // Hide loading spinner or reset loading state
        setLoading(false);
    };

    return (
        <>
            <section className="h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-row">
                <Sidebar roleID={roleID} />
                <div className="flex flex-col w-full h-full p-3 overflow-auto">
                    <div className="bg-white rounded-lg shadow-lg p-6 min-h-full">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="text-3xl font-bold title tracking-wide">
                                Announcements
                            </h1>
                            <div className="flex gap-2">
                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        document
                                            .getElementById("my_modal_4")
                                            .showModal()
                                    }
                                >
                                    Send Announcement
                                </button>
                                <div className="flex items-center space-x-2 relative">
                                    <input
                                        type="text"
                                        className="border border-gray-300 text-gray-900 rounded-md px-3 py-2.5 focus:outline-none focus:border-blue-500"
                                        placeholder="Search"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                    <FaSearch className="absolute right-4 text-gray-500" />
                                </div>
                            </div>
                        </div>
                        <hr className="my-2 border-blue-500 border-b-2" />

                        <div className="box">
                            <DataTable
                                columns={columns}
                                data={announcements}
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

            <dialog id="my_modal_4" className="modal">
                <div className="modal-box ">
                    <div className="modal-action flex flex-col gap-2 m-0">
                        <form
                            method="dialog"
                            ref={form}
                            onSubmit={sendEmail}
                            className="flex-col flex justify-center gap-2 items-start"
                        >
                            <label className="text-xl font-bold title">
                                Title
                            </label>
                            <input
                                type="text"
                                name="announcement_title"
                                placeholder="Title"
                                className="input input-bordered w-full"
                            />

                            <label className="text-xl font-bold title">
                                Annoucement
                            </label>
                            <textarea
                                placeholder="type here"
                                name="message"
                                className="textarea textarea-bordered textarea-lg w-full"
                            ></textarea>
                            <input type="hidden" name="to_name" value="" />
                            <input type="hidden" name="to_email" value="" />
                            <input
                                type="hidden"
                                name="announcement_date_posted"
                                value=""
                            />
                            <input
                                type="hidden"
                                name="reply_to"
                                placeholder="Reply to"
                                className="input input-bordered w-full"
                            />

                            <button
                                className="btn btn-primary w-full"
                                type="submit"
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-ring loading-sm"></span>
                                        Sending...
                                    </>
                                ) : (
                                    "Send"
                                )}
                            </button>

                            <span
                                className="btn btn-error w-full"
                                onClick={() =>
                                    document
                                        .getElementById("my_modal_4")
                                        .close()
                                }
                            >
                                close
                            </span>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Announcement;
