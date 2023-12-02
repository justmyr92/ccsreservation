import React, { useState } from "react";
import logo from "../assets/logo-no-bg-2.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ clientData }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [customerID, setCustomerID] = useState(
        localStorage.getItem("userID")
    );

    const logout = () => {
        localStorage.removeItem("userID");
        localStorage.removeItem("roleID");
        window.location.href = "/";
    };

    return (
        <nav className="bg-sky-700 fixed w-full z-10 shadow-sm">
            <div className="container mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-full p-2 text-gray-400 hover:bg-white hover:text-black focus:outline-none "
                            aria-controls="mobile-menu"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            aria-expanded={isMobileMenuOpen ? "true" : "false"}
                        >
                            <span className="sr-only">Open main menu</span>

                            <svg
                                className="block h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>

                            <svg
                                className="hidden h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                        <div className="flex flex-shrink-0 items-center">
                            <img
                                className="h-8 w-auto"
                                src={logo}
                                alt="Your Company"
                            />
                        </div>
                        <div className="hidden sm:ml-6 md:block md:ml-10 sm:space-x-8 sm:block">
                            <div className="flex space-x-4 items-center">
                                <a
                                    href="/#home"
                                    className="hover:bg-white hover:text-black text-white rounded-full px-3 py-2 text-sm font-medium"
                                    aria-current="page"
                                >
                                    Home
                                </a>
                                <a
                                    href="/#services"
                                    className="text-white hover:bg-white hover:text-black rounded-full px-3 py-2 text-sm font-medium"
                                >
                                    Services
                                </a>
                                <a
                                    href="/#about"
                                    className="text-white hover:bg-white hover:text-black rounded-full px-3 py-2 text-sm font-medium"
                                >
                                    About
                                </a>
                                <a
                                    href="/#achievements"
                                    className="text-white hover:bg-white hover:text-black rounded-full px-3 py-2 text-sm font-medium"
                                >
                                    Achievements
                                </a>
                                <a
                                    href="/#find"
                                    className="text-white hover:bg-white hover:text-black rounded-full px-3 py-2 text-sm font-medium"
                                >
                                    Find Us
                                </a>
                                <a
                                    href="/#contact"
                                    className="text-white hover:bg-white hover:text-black rounded-full px-3 py-2 text-sm font-medium"
                                >
                                    Contact Us
                                </a>
                                {customerID ? (
                                    <div className="dropdown dropdown-end">
                                        <label
                                            tabIndex={0}
                                            className="btn text-sm font-medium px-3 py-2 capitalize"
                                        >
                                            {clientData.client_fname}
                                        </label>
                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-52 text-base font-medium"
                                        >
                                            <li>
                                                <Link to="/user/profile">
                                                    Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/user/reservations">
                                                    Reservations
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/user/ratings">
                                                    Ratings
                                                </Link>
                                            </li>

                                            <div className="divider my-1"></div>
                                            <li>
                                                <button
                                                    className="btn btn-primary btn-sm rounded-full"
                                                    onClick={() => {
                                                        logout();
                                                    }}
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="bg-white text-black
                                        hover:bg-white hover:text-black block
                                        rounded-full px-3 py-2 text-base
                                        font-medium"
                                    >
                                        {" "}
                                        Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`${isMobileMenuOpen ? "block" : "hidden"} sm:hidden`}
                id="mobile-menu"
            >
                <div className="space-y-1 px-2 pb-3 pt-2">
                    <p
                        className="text-white hover:bg-white hover:text-black block rounded-full px-3 py-2 text-base font-medium"
                        aria-current="page"
                    >
                        Dashboard
                    </p>
                    <p className="text-white hover:bg-white hover:text-black block rounded-full px-3 py-2 text-base font-medium">
                        Team
                    </p>
                    <p className="text-white hover:bg-white hover:text-black block rounded-full px-3 py-2 text-base font-medium">
                        Projects
                    </p>
                    <p className="text-white hover:bg-white hover:text-black block rounded-full px-3 py-2 text-base font-medium">
                        Calendar
                    </p>
                    {customerID ? (
                        <div className="dropdown dropdown-end">
                            <label
                                tabIndex={0}
                                className="btn px-3 py-2 text-base font-medium"
                            >
                                Click
                            </label>
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <a>Item 1</a>
                                </li>
                                <li>
                                    <a>Item 2</a>
                                </li>
                                <div className="divider"></div>
                                <li>
                                    <button
                                        className="btn btn-primary btn-sm rounded-full"
                                        onClick={() => {
                                            logout();
                                        }}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <p className="bg-white text-black hover:bg-white hover:text-black block rounded-full px-3 py-2 text-base font-medium">
                            Login
                        </p>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
