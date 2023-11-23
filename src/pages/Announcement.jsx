import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Announcement = () => {
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

    const form = useRef();

    const [clients, setClients] = useState([]);

    useEffect(() => {
        const getClients = async () => {
            const response = await fetch(
                "https://ccsreservaton.online/clients"
            );
            const data = await response.json();
            setClients(data);
        };
        getClients();
    }, []);

    useEffect(() => {
        console.log(clients);
    }, [clients]);

    const sendEmail = async (e) => {
        e.preventDefault();

        // Loop through clients
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
                    "service_a4n0u6e", //
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

        // Close the modal after sending emails
        document.getElementById("my_modal_4").close();
    };

    return (
        <section className="h-screen bg-blue-100 flex flex-row">
            <Sidebar roleID={roleID} />
            <div className="flex flex-col w-full h-full p-5">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-2xl font-bold">Announcement</h1>
                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            document.getElementById("my_modal_4").showModal()
                        }
                    >
                        Send Announcement
                    </button>
                </div>
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

                                <input
                                    className="btn btn-primary w-full"
                                    type="submit"
                                    value="Send"
                                />

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
                <div className="flex flex-col w-full h-full bg-white">
                    <div className="mb-20">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Announcement id</th>
                                    <th>Announcement</th>
                                    <th>Date Posted</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>1</th>
                                    <td>25% off discount month of October</td>
                                    <td>09-15-2023</td>
                                    <div className="flex gap-2">
                                        <button className="btn btn-primary">
                                            update
                                        </button>
                                        <button className="btn btn-error">
                                            delete
                                        </button>
                                    </div>
                                </tr>
                                {/* row 2 */}
                                <tr>
                                    <th>2</th>
                                    <td>New Foods</td>
                                    <td>09-15-2023</td>
                                    <div className="flex gap-2">
                                        <button className="btn btn-primary">
                                            update
                                        </button>
                                        <button className="btn btn-error">
                                            delete
                                        </button>
                                    </div>
                                </tr>
                                {/* row 3 */}
                                <tr>
                                    <th>3</th>
                                    <td>25% off discount month of October</td>
                                    <td>09-15-2023</td>
                                    <div className="flex gap-2">
                                        <button className="btn btn-primary">
                                            update
                                        </button>
                                        <button className="btn btn-error">
                                            delete
                                        </button>
                                    </div>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Announcement;
