import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Reservations from "../components/Reservations";
import Ratings from "../components/Ratings";
import Profilee from "../components/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
    const [customerID, setCustomerID] = useState(
        localStorage.getItem("userID")
    );
    const [roleID, setRoleID] = useState(localStorage.getItem("roleID"));
    const [client, setClient] = useState([]);
    const [clientData, setClientData] = useState({});
    const [page, setPage] = useState("profile");

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
                const response = await fetch("http://localhost:7723/client/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ client_id: customerID }),
                });
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
            <section className="profile bg-blue-100 h-screen py-20">
                <div className="border-2 border-gray-400 bg-white mx-auto w-[90%] h-full flex">
                    <aside className="profile__aside bg-blue-200 w-1/4">
                        <div className="avatar container my-5 w-1/2 flex justify-center mx-auto items-center flex-col">
                            <img
                                src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                                alt="Avatar"
                                className="image rounded-full"
                            />
                            <h4 className="text-center text-2xl">
                                {clientData.client_fname}
                            </h4>
                        </div>
                        <ul className="menu bg-base-200">
                            <li>
                                <a onClick={() => setPage("profile")}>
                                    Profile
                                </a>
                            </li>
                            <li>
                                <a onClick={() => setPage("reservations")}>
                                    Reservations
                                </a>
                            </li>
                            <li>
                                <a onClick={() => setPage("ratings")}>
                                    Ratings
                                </a>
                            </li>
                            <li>
                                <a>
                                    <FontAwesomeIcon
                                        icon={faArrowRightFromBracket}
                                    />{" "}
                                    Logout
                                </a>
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
