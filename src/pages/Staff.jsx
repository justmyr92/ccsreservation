import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";

const Staff = () => {
    const [userID, setUserID] = useState(localStorage.getItem("userID"));

    const [roleID, setRoleID] = useState(localStorage.getItem("roleID"));

    const [formData, setFormData] = useState({
        staff_id: "",
        staff_fname: "",
        staff_lname: "",
        staff_email: "",
        staff_password: "",
        role_id: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to the server)
        // You can add your logic here
        // closeModal(); // Close the modal after submission
    };

    useEffect(() => {
        if (!userID) {
            window.location.href = "/login";
        } else {
            if (roleID === "ROLE001") {
                window.location.href = "/";
            }
        }
    }, []);

    const [showPassword, setShowPassword] = useState(false);

    const staffData = [
        {
            staff_id: "1",
            staff_fname: "Mark",
            staff_lname: "Lopez",
            staff_email: "markl.4@example.com",
            staff_password: "@Mark123",
            role_id: "ROLE002",
        },
        {
            staff_id: "2",
            staff_fname: "Emily",
            staff_lname: "Smith",
            staff_email: "emilys@example.com",
            staff_password: "@Emily456",
            role_id: "ROLE002",
        },
        {
            staff_id: "3",
            staff_fname: "David",
            staff_lname: "Johnson",
            staff_email: "davidj@example.com",
            staff_password: "@David789",
            role_id: "ROLE002",
        },
        {
            staff_id: "4",
            staff_fname: "Sophia",
            staff_lname: "Garcia",
            staff_email: "sophiag@example.com",
            staff_password: "@Sophia123",
            role_id: "ROLE002",
        },
        {
            staff_id: "5",
            staff_fname: "Alex",
            staff_lname: "Martinez",
            staff_email: "alexm@example.com",
            staff_password: "@Alex456",
            role_id: "ROLE002",
        },
    ];

    const togglePasswordVisibility = (row) => {
        setShowPassword(showPassword === row.staff_id ? null : row.staff_id);
    };

    const columns = [
        { name: "Staff ID", selector: (row) => row.staff_id, sortable: true },
        {
            name: "First Name",
            selector: (row) => row.staff_fname,
            sortable: true,
        },
        {
            name: "Last Name",
            selector: (row) => row.staff_lname,
            sortable: true,
        },
        { name: "Email", selector: (row) => row.staff_email, sortable: true },
        {
            name: "Password",
            cell: (row) => (
                <div>
                    {showPassword === row.staff_id
                        ? row.staff_password
                        : "********"}
                    <button onClick={() => togglePasswordVisibility(row)}>
                        {showPassword === row.staff_id ? "Hide" : "Show"}
                    </button>
                </div>
            ),
            sortable: false,
        },
    ];

    return (
        <section className="dashboard__section h-screen bg-blue-100 flex flex-row">
            <Sidebar roleID={roleID} />
            <div className="flex flex-col w-full h-full p-6 overflow-auto">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-2xl font-bold">Staff</h1>
                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                document
                                    .getElementById("my_modal_4")
                                    .showModal()
                            }
                        >
                            Add Staff
                        </button>
                        <dialog id="my_modal_4" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Add Staff</h3>
                                <form
                                    method="dialog"
                                    className="modal-backdrop"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="form-group">
                                        <label htmlFor="staff_fname">
                                            First Name:
                                        </label>
                                        <input
                                            type="text"
                                            id="staff_fname"
                                            name="staff_fname"
                                            value={formData.staff_fname}
                                            onChange={handleChange}
                                            className="input input-bordered"
                                            style={{ color: "black" }} // Add this line
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="staff_lname">
                                            Last Name:
                                        </label>
                                        <input
                                            type="text"
                                            id="staff_lname"
                                            name="staff_lname"
                                            value={formData.staff_lname}
                                            onChange={handleChange}
                                            className="input input-bordered"
                                            style={{ color: "black" }} // Add this line
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="staff_email">
                                            Email:
                                        </label>
                                        <input
                                            type="email"
                                            id="staff_email"
                                            name="staff_email"
                                            value={formData.staff_email}
                                            onChange={handleChange}
                                            className="input input-bordered"
                                            style={{ color: "black" }} // Add this line
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="staff_password">
                                            Password:
                                        </label>
                                        <input
                                            type="password"
                                            id="staff_password"
                                            name="staff_password"
                                            value={formData.staff_password}
                                            onChange={handleChange}
                                            className="input input-bordered"
                                            style={{ color: "black" }} // Add this line
                                        />
                                    </div>
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        </dialog>
                    </div>
                    <DataTable columns={columns} data={staffData} pagination />
                </div>
            </div>
        </section>
    );
};

export default Staff;
