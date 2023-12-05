import React, { useState, useEffect } from "react";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
const Profilee = ({ clientData, setReload }) => {
    const [isEdit, setIsEdit] = useState(false);

    // State to manage the client data
    const [client, setClient] = useState({
        client_fname: "",
        client_lname: "",
        client_email: "",
        client_contact: "",
        client_street: "",
        client_barangay: "",
        client_city: "",
    });

    // Set the initial state when clientData changes
    useEffect(() => {
        setClient({
            client_fname: clientData.client_fname,
            client_lname: clientData.client_lname,
            client_email: clientData.client_email,
            client_contact: clientData.client_contact,
            client_street: clientData.client_street,
            client_barangay: clientData.client_barangay,
            client_city: clientData.client_city,
        });
    }, [clientData]);

    // Handler function to update the client state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient((prevClient) => ({
            ...prevClient,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",

            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(
                        `https://ccsreservaton.online/api/client/${clientData.client_id}`,
                        {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(client),
                        }
                    );
                    const data = await response.json();
                    console.log(data);
                    setIsEdit(false);
                    setReload(true);
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };

    const handleCancel = () => {
        // Reset the client state to the original data when canceling
        setClient({
            client_fname: clientData.client_fname,
            client_lname: clientData.client_lname,
            client_email: clientData.client_email,
            client_contact: clientData.client_contact,
            client_street: clientData.client_street,
            client_barangay: clientData.client_barangay,
            client_city: clientData.client_city,
        });
        setIsEdit(false); // Disable editing mode
    };

    return (
        <div className="profile__main bg-gradient-to-r from-cyan-500 to-blue-500 w-[100%] p-6 h-[100%] overflow-y-auto">
            <div className="container bg-white p-6 rounded-lg min-h-[100%]">
                <div className="flex justify-between mb-2 items-center">
                    <h3 className="text-3xl title">Profile</h3>
                    <button
                        onClick={() =>
                            Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes!",
                            }).then((result) => {
                                if (result.value) {
                                    setIsEdit(true);
                                }
                            })
                        }
                        className={`btn btn-primary ${isEdit && "hidden"}`}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </div>

                <hr className="mb-2 border-gray-400" />

                {/* <div className="grid grid-cols-2 gap-1 mb-2">
                    <input
                        type="text"
                        placeholder="First Name"
                        className="input w-full bg-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        name="client_fname"
                        value={client.client_fname}
                        readOnly={!isEdit}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="input w-full bg-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        name="client_lname"
                        value={client.client_lname}
                        readOnly={!isEdit}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="grid mb-2 grid-cols-3 gap-1">
                    <input
                        type="text"
                        placeholder="Email"
                        className="input w-full bg-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500col-span-2"
                        name="client_email"
                        value={client.client_email}
                        readOnly={!isEdit}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Contact"
                        className="input w-full bg-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        name="client_contact"
                        value={client.client_contact}
                        readOnly={!isEdit}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-1 mb-2">
                    <input
                        type="text"
                        placeholder="Street"
                        className="input w-full bg-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        name="client_street"
                        value={client.client_street}
                        readOnly={!isEdit}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Barangay"
                        className="input w-full bg-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        name="client_barangay"
                        value={client.client_barangay}
                        readOnly={!isEdit}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-1 mb-2">
                    <input
                        type="text"
                        placeholder="City"
                        className="input w-full bg-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        name="client_city"
                        value={client.client_city}
                        readOnly={!isEdit}
                        onChange={handleChange}
                        required
                    />
                </div> */}

                <div className="grid grid-cols-2 gap-1 mb-2">
                    <div className="flex flex-col">
                        <label
                            htmlFor="client_fname"
                            className="text-sm text-gray-600 mb-1"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            placeholder="First Name"
                            className="input w-full bg-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            name="client_fname"
                            id="client_fname"
                            value={client.client_fname}
                            readOnly={!isEdit}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="client_lname"
                            className="text-sm text-gray-600 mb-1"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="input w-full bg-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            name="client_lname"
                            id="client_lname"
                            value={client.client_lname}
                            readOnly={!isEdit}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="grid mb-2 grid-cols-3 gap-1">
                    <div className="flex flex-col col-span-2">
                        <label
                            htmlFor="client_email"
                            className="text-sm text-gray-600 mb-1"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            placeholder="Email"
                            className="input w-full bg-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            name="client_email"
                            id="client_email"
                            value={client.client_email}
                            readOnly={!isEdit}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="client_contact"
                            className="text-sm text-gray-600 mb-1"
                        >
                            Contact
                        </label>
                        <input
                            type="text"
                            placeholder="Contact"
                            className="input w-full bg-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            name="client_contact"
                            id="client_contact"
                            value={client.client_contact}
                            readOnly={!isEdit}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-1 mb-2">
                    <div className="flex flex-col">
                        <label
                            htmlFor="client_street"
                            className="text-sm text-gray-600 mb-1"
                        >
                            Street
                        </label>
                        <input
                            type="text"
                            placeholder="Street"
                            className="input w-full bg-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            name="client_street"
                            id="client_street"
                            value={client.client_street}
                            readOnly={!isEdit}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="client_barangay"
                            className="text-sm text-gray-600 mb-1"
                        >
                            Barangay
                        </label>
                        <input
                            type="text"
                            placeholder="Barangay"
                            className="input w-full bg-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            name="client_barangay"
                            id="client_barangay"
                            value={client.client_barangay}
                            readOnly={!isEdit}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-1 mb-2">
                    <div className="flex flex-col">
                        <label
                            htmlFor="client_city"
                            className="text-sm text-gray-600 mb-1"
                        >
                            City
                        </label>
                        <input
                            type="text"
                            placeholder="City"
                            className="input w-full bg-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            name="client_city"
                            id="client_city"
                            value={client.client_city}
                            readOnly={!isEdit}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div
                    className={`flex justify-end gap-2 mt-2 ${
                        !isEdit && "hidden"
                    }`}
                >
                    <button className="btn btn-active" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button
                        className="btn bg-blue-500 text-white"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profilee;
