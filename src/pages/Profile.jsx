import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Reservations from "../components/Reservations";
import Ratings from "../components/Ratings";
import Profilee from "../components/Profile";
import { FaCalendarCheck, FaSignOutAlt, FaStar, FaUser } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";

const Profile = () => {
    const [customerID, setCustomerID] = useState(
        localStorage.getItem("userID")
    );
    const [roleID, setRoleID] = useState(localStorage.getItem("roleID"));
    const [client, setClient] = useState([]);
    const [clientData, setClientData] = useState({});

    const { page } = useParams();

    console.log(page);

    useEffect(() => {
        if (!customerID) {
            window.location.href = "/login";
        } else {
            if (roleID !== "ROLE001") {
                window.location.href = "/";
            }
        }
    }, []);

    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await fetch(
                    "https://ccsreservaton.online/api/client/",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ client_id: customerID }),
                    }
                );
                const result = await response.json();

                setClientData(result);
            } catch (err) {
                console.log(err);
            }
        };
        if (roleID === "ROLE001") {
            fetchClientData();
        }
        setReload(false);
    }, [reload]);
    return (
        <>
            <Navbar clientData={clientData} />
            <section className="profile bg-blue-100 py-20">
                <div className="bg-white mx-auto w-[90%] min-h-screen flex bg-white">
                    <aside className="profile__aside bg-white w-1/4">
                        <div className="avatar container my-5 w-1/2 flex justify-center mx-auto items-center flex-col">
                            <img
                                src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                                alt="Avatar"
                                className="image rounded-full"
                            />
                            <h4 className="text-center text-2xl title">
                                {clientData.client_fname}
                            </h4>
                        </div>
                        <ul className="menu bg-white">
                            <li className="w-full">
                                <Link
                                    to="/user/profile"
                                    className={`${
                                        page === "profile" ? "active" : ""
                                    } rounded-md px-5 py-2 text-base`}
                                >
                                    <FaUser className="inline-block" />
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/user/reservations"
                                    className={`${
                                        page === "reservations" ? "active" : ""
                                    } rounded-md px-5 py-2 text-base`}
                                >
                                    <FaCalendarCheck className="inline-block" />
                                    Reservations
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/user/ratings"
                                    className={`${
                                        page === "ratings" ? "active" : ""
                                    } rounded-md px-5 py-2 text-base`}
                                >
                                    <FaStar className="inline-block" />
                                    Ratings
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/login"
                                    className="rounded-md px-5 py-2 text-base"
                                    onClick={() => {
                                        localStorage.removeItem("userID");
                                        localStorage.removeItem("roleID");
                                    }}
                                >
                                    <FaSignOutAlt className="inline-block" />
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </aside>
                    <div className="profile__content w-3/4">
                        {page === "profile" ? (
                            <Profilee
                                clientData={clientData}
                                setReload={setReload}
                            />
                        ) : page === "reservations" ? (
                            <Reservations />
                        ) : (
                            <Ratings clintData={clientData} />
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profile;
