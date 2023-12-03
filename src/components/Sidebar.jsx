import React from "react";
import { Link } from "react-router-dom";
import {
    FaReceipt,
    FaUsers,
    FaFacebookMessenger,
    FaList,
    FaRegCalendarCheck,
    FaStar,
    FaChartPie,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ roleID }) => {
    let links = [];

    if (roleID === "ROLE003") {
        links = [
            { path: "/dashboard", icon: <FaChartPie />, label: "Dashboard" },
            { path: "/clients", icon: <FaUsers />, label: "Clients" },
            {
                path: "/transactions",
                icon: <FaReceipt />,
                label: "Transactions",
            },
            {
                path: "/announcements",
                icon: <FaFacebookMessenger />,
                label: "Announcements",
            },
            { path: "/menu", icon: <FaList />, label: "Menu" },
            { path: "/staff", icon: <FaUsers />, label: "Staff" },
            { path: "/ratings", icon: <FaStar />, label: "Ratings" },
            {
                path: "/reservations",
                icon: <FaRegCalendarCheck />,
                label: "Reservations",
            },
        ];
    } else if (roleID === "ROLE002") {
        links = [
            { path: "/menu", icon: <FaList />, label: "Menu" },
            // { path: "/events", icon: <FaRegCalendarCheck />, label: "Events" },
            {
                path: "/transactions",
                icon: <FaReceipt />,
                label: "Transactions",
            },
            {
                path: "/reservations",
                icon: <FaRegCalendarCheck />,
                label: "Reservations",
            },
        ];
    }

    const logout = () => {
        localStorage.removeItem("userID");
        localStorage.removeItem("roleID");
        window.location.href = "/login";
    };

    return (
        <aside className="sidebar h-screen bg-white w-[25%] p-2 shadow-lg">
            <div className="flex items-center justify-center mb-4">
                <img src="../src/assets/logo-v2.png" alt="logo" />
            </div>
            <ul className="menu w-full">
                {links.map((link, index) => (
                    <li key={index} className={`menu__item mb-1`}>
                        <Link
                            to={link.path}
                            className={`menu__link text-base hover:bg-primary hover:text-white transition-all duration-300 ease-in-out ${
                                link.path === window.location.pathname
                                    ? "bg-primary text-white"
                                    : "text-gray-900"
                            }`}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    </li>
                ))}
                <li className="menu__item">
                    <button
                        className="menu__link text-base hover:bg-primary hover:text-white transition-all duration-300 ease-in-out text-gray-900"
                        onClick={() => logout()}
                    >
                        {/* font aswesome for logout */}
                        <FontAwesomeIcon icon={faSignOut} />
                        Logout
                    </button>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
