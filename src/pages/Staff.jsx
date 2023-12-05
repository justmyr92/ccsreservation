import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";
import { faEye, faEyeSlash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaEye, FaSearch, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Staff = () => {
    const [userID, setUserID] = useState(localStorage.getItem("userID"));

    const [roleID, setRoleID] = useState(localStorage.getItem("roleID"));

    const [staffs, setStaffs] = useState([]);

    const [formData, setFormData] = useState({
        staff_fname: "",
        staff_lname: "",
        staff_email: "",
        staff_password: "",
        role_id: "ROLE002",
    });

    const [reload, setReload] = useState(false);
    const [search, setSearch] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const getStaff = async () => {
        try {
            const response = await fetch(
                "https://ccsreservaton.online/api/staff"
            );
            const jsonData = await response.json();

            if (search !== "") {
                //search no tcase sensitive
                const filteredData = jsonData.filter((staff) => {
                    return (
                        staff.staff_id
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        staff.staff_fname
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        staff.staff_lname
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        staff.staff_email
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    );
                });
                setStaffs(filteredData);
            } else {
                setStaffs(jsonData);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getStaff();
    }, [search, reload]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "https://ccsreservaton.online/api/staff",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );
            const data = await response.json();

            getStaff();
        } catch (error) {
            console.error(error.message);
        }

        document.getElementById("my_modal_4").close();
    };

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

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);

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
                        {showPassword === row.staff_id ? (
                            <FaEyeSlash className="text-gray-500 ml-2" />
                        ) : (
                            <FaEye className="text-gray-500 ml-2" />
                        )}
                    </button>
                </div>
            ),
            sortable: false,
        },
    ];

    return (
        <section className="dashboard__section h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-row">
            <Sidebar roleID={roleID} />
            <div className="flex flex-col w-full h-full p-6 overflow-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 min-h-full">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-700 title">
                            Staffs
                        </h1>
                        <div className="flex flex-row gap-2">
                            <div className="flex items-center space-x-2 relative">
                                <input
                                    type="text"
                                    className="border border-gray-300 text-gray-900 rounded-md px-3 py-2.5 focus:outline-none focus:border-blue-500"
                                    placeholder="Search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <FaSearch className="absolute right-4 text-gray-500" />
                            </div>
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
                        </div>
                        <dialog id="my_modal_4" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg title">
                                    Add Staff
                                </h3>
                                <hr className="my-2 border-b-2 border-blue-500" />
                                <button
                                    className="absolute top-2 right-4 text-gray-600 cursor-pointer focus:outline-none"
                                    onClick={() =>
                                        document
                                            .getElementById("my_modal_4")
                                            .close()
                                    }
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                                <form
                                    method="dialog"
                                    className="modal-backdrop"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="form-group flex flex-col gap-1 mb-4">
                                        <label
                                            htmlFor="staff_fname"
                                            className="text-gray-700 font-medium"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="staff_fname"
                                            name="staff_fname"
                                            value={formData.staff_fname}
                                            onChange={handleChange}
                                            className="input input-bordered text-gray-700"
                                            placeholder="Enter first name"
                                        />
                                    </div>
                                    <div className="form-group flex flex-col gap-1 mb-4">
                                        <label
                                            htmlFor="staff_lname"
                                            className="text-gray-700 font-medium"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="staff_lname"
                                            name="staff_lname"
                                            value={formData.staff_lname}
                                            onChange={handleChange}
                                            className="input input-bordered text-gray-700"
                                            placeholder="Enter last name"
                                        />
                                    </div>
                                    <div className="form-group flex flex-col gap-1 mb-4">
                                        <label
                                            htmlFor="staff_email"
                                            className="text-gray-700"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="staff_email"
                                            name="staff_email"
                                            value={formData.staff_email}
                                            onChange={handleChange}
                                            className="input input-bordered text-gray-700"
                                            placeholder="Enter email"
                                        />
                                    </div>
                                    <div className="form-group flex flex-col gap-1 mb-4 relative">
                                        <label
                                            htmlFor="staff_password"
                                            className="text-gray-700 font-medium"
                                        >
                                            Password:
                                        </label>
                                        <div className="flex items-center relative">
                                            <input
                                                type={
                                                    showPasswordForm
                                                        ? "text"
                                                        : "password"
                                                }
                                                id="staff_password"
                                                name="staff_password"
                                                value={formData.staff_password}
                                                onChange={handleChange}
                                                className="input input-bordered text-gray-700 w-full"
                                                placeholder="Enter password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowPasswordForm(
                                                        !showPasswordForm
                                                    );
                                                }}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer focus:outline-none"
                                            >
                                                <FontAwesomeIcon
                                                    icon={
                                                        showPasswordForm
                                                            ? faEyeSlash
                                                            : faEye
                                                    }
                                                />
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </dialog>
                    </div>
                    <DataTable
                        columns={columns}
                        data={staffs}
                        pagination={true}
                        noHeader={true}
                        fixedHeader={true}
                        fixedHeaderScrollHeight="600px"
                        highlightOnHover={true}
                        striped={true}
                    />
                </div>
            </div>
        </section>
    );
};

export default Staff;
