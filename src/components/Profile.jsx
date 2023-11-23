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
                        `http://localhost:7723/client/${clientData.client_id}`,
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
        <div className="profile__main bg-blue-100 w-[100%] p-6 h-[100%]">
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
            <div className="grid grid-cols-2 gap-1 mb-2">
                <input
                    type="text"
                    placeholder="First Name"
                    className="input w-full"
                    name="client_fname"
                    value={client.client_fname}
                    readOnly={!isEdit}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    className="input w-full"
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
                    className="input w-full col-span-2"
                    name="client_email"
                    value={client.client_email}
                    readOnly={!isEdit}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    placeholder="Contact"
                    className="input w-full"
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
                    className="input w-full"
                    name="client_street"
                    value={client.client_street}
                    readOnly={!isEdit}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    placeholder="Barangay"
                    className="input w-full"
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
                    className="input w-full"
                    name="client_city"
                    value={client.client_city}
                    readOnly={!isEdit}
                    onChange={handleChange}
                    required
                />
            </div>

            <div
                className={`flex justify-end gap-2 mt-2 ${!isEdit && "hidden"}`}
            >
                <button className="btn btn-active" onClick={handleCancel}>
                    Cancel
                </button>
                <button className="btn bg-cyan-600" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Profilee;
