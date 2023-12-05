import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

//Components
import Navbar from "../components/Navbar";
import ServiceCard from "../components/ServiceCard";

//Assets
import heroBackground from "../assets/hero-background.png";
import logo from "../assets/logo-no-bg-2.png";
import baptism from "../assets/baptism.jpg";
import wedding from "../assets/wedding.jpg";
import birthday from "../assets/birthday.jpg";
import party from "../assets/party.jpg";
import corporate from "../assets/corporate.jpg";
import cert from "../assets/ccs_cert.png";
import trophy from "../assets/ccs_trophy.png";

//Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRight,
    faEnvelope,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import StatementCard from "../components/StatementCard";

const Home = () => {
    const position = [13.773392, 120.9654284];
    const reasons = [
        {
            title: "Vision",
            content:
                "Calinao's Catering Services will be one among the best in providing catering services and event planning in the region. A Catering Services that will keep the good reputation of catering business by providing outstanding quality, service, cleanliness, and value, to make a full satisfaction for every customer. Wil compete actively and fairly in the catering trade and to establish its name in the society.",
        },
        {
            title: "Mission",
            content:
                "Calinao's Catering Services aims to provide a high quality of service for all catering needs, aims in providing a wide range of menu selections, food quality that will surpass the distinct taste of our client, a well planned program and competent work force.",
        },
        // {
        //     title: "Core Values",
        //     content:
        //     "•Excellence   •Creativity   •Customer Service •Reliability •Flexibility "
        // },
    ];

    const [roleID, setRoleID] = useState(localStorage.getItem("roleID"));
    const [customerID, setCustomerID] = useState(
        localStorage.getItem("userID")
    );

    const [announcements, setAnnouncements] = useState([
        {
            announcement_id: "ANN4303",
            title: "This is a test email, last attempt",
            announcement_message:
                "This is a test email for thesis, please ignore. Thank youa",
            announcement_date: "2023-11-28T16:00:00.000Z",
        },
    ]);

    const [clientData, setClientData] = useState({});

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                //via post request

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

        const fetchAnnouncements = async () => {
            try {
                const response = await fetch(
                    "https://ccsreservaton.online/api/announcements"
                );
                const result = await response.json();
                if (result.length > 0) {
                    setAnnouncements(result);
                    document.getElementById("my_modal_3").showModal();
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchAnnouncements();
    }, []);

    useEffect(() => {
        // Get the current URL
        const url = window.location.href;

        // Find the index of the '#' symbol in the URL
        const hashIndex = url.indexOf("#");

        // If there is a '#' symbol in the URL
        if (hashIndex !== -1) {
            // Extract the fragment identifier (the part of the URL after the '#')
            const fragment = url.substring(hashIndex + 1);

            // Find the element with the corresponding ID
            const targetElement = document.getElementById(fragment);

            // If the element exists, scroll to it
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, []);

    return (
        <>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    {/* if there is a button in form, it will close the modal */}
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() =>
                            document.getElementById("my_modal_3").close()
                        }
                    >
                        ✕
                    </button>

                    <h3 className="font-bold text-lg">Announcement!</h3>
                    <p className="text-sm">
                        Press ESC key or click on ✕ button to close
                    </p>
                    <hr className="border-1 border-gray-300 my-4" />
                    {announcements.map((announcement, index) => (
                        <div
                            className="flex flex-col items-start justify-center"
                            key={index}
                        >
                            <h3 className="font-bold text-lg">
                                {announcement.title}
                            </h3>
                            <p className="text-sm">
                                {announcement.announcement_message}
                            </p>
                            <p className="text-sm">
                                {new Date(
                                    announcement.announcement_date
                                ).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                    ))}
                </div>
            </dialog>
            <Navbar clientData={clientData} />
            {/* Hero Section */}
            <section
                id="home"
                className="hero h-screen relative"
                style={{
                    backgroundImage: `url(${heroBackground})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            >
                <div className="overlay bg-gray-100 absolute bg-opacity-20 w-full h-full">
                    <div className="container mx-auto px-2 sm:px-6 lg:px-8 h-full">
                        <div className="flex h-full justify-center items-center">
                            <div className="hero-content max-w-xl flex flex-col items-center">
                                <img src={logo} alt={logo} className="w-full" />
                                <p
                                    className="mb-5 text-2xl text-center text-white"
                                    style={{
                                        textShadow: "0 0 5px #000000",
                                    }}
                                >
                                    "Ready to Cater All Your Catering Needs"
                                </p>
                                <p
                                    className="mb-5 text-2xl text-center text-white w-[60rem]"
                                    style={{
                                        textShadow: "0 0 5px #000000",
                                    }}
                                >
                                    "Calinao's Catering Services, Siguradong
                                    Quality Service at Excellence "
                                </p>
                                <div className="flex justify-center items-center gap-2">
                                    <Link
                                        to="/reservation/more"
                                        className="make-reservation-btn py-3 hover:bg-sky-800 px-4 bg-sky-700 w-fit text-lg text-white shadow-sm"
                                    >
                                        Make a reservation{" "}
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Hero Section */}
            {/* Services Section */}
            <section className="services py-10" id="services">
                <div className="container mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center">
                        <h2 className="text-4xl font-bold mb-5 title">
                            What we offer you ?
                            <hr className="border-2 border-sky-700 w-20 mx-auto mt-3" />
                        </h2>
                        <p className="text-center mb-10 text-gray-900 text-lg w-3/5">
                            CCS offers a wide range of catering services. See
                            pictures below for further details.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <ServiceCard image={baptism} title="baptismal" />
                        <ServiceCard image={wedding} title="wedding" />
                        <ServiceCard image={birthday} title="birthday" />
                        <ServiceCard
                            image={corporate}
                            title="company's party"
                        />
                        <ServiceCard
                            image={party}
                            title="office and school party"
                        />
                        <ServiceCard image={party} title="more" />
                    </div>
                </div>
            </section>
            {/* End Services Section */}
            {/* About Section */}
            <section className="about py-10 bg-gray-50 w-full" id="about">
                <div className="container mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center">
                        <h2 className="text-4xl font-bold mb-5 title">
                            Why choose us ?
                            <hr className="border-2 border-orange-500 w-20 mx-auto mt-3" />
                        </h2>
                    </div>
                    <div className="grid-center grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                        {reasons.map((reason, index) => (
                            <div
                                className="flex flex-col items-center mb-2 border border-gray-200 rounded-lg p-5 hover:shadow-sm hover:-translate-y-1 cursor-pointer transition-transform bg-white"
                                key={index}
                            >
                                {/* <div className="flex justify-center items-center bg-white mb-2">
                                    <FontAwesomeIcon
                                        icon={faPaperPlane}
                                        color="#3B82F6"
                                        size="2x"
                                    />
                                </div> */}
                                <h3 className="text-3xl font-bold text-orange-500 mb-2 text-start">
                                    <FontAwesomeIcon
                                        icon={faPaperPlane}
                                        color="#3B82F6"
                                    />
                                    {" " + reason.title}
                                </h3>
                                <p className="text-center text-gray-900 text-lg text-start">
                                    {reason.content}
                                </p>
                            </div>
                        ))}
                        <div className="flex flex-col items-center border border-gray-200 rounded-lg p-5 hover:shadow-sm hover:-translate-y-1 cursor-pointer transition-transform bg-white">
                            {/* <div className="flex justify-center items-center bg-white mb-2">
                                    <FontAwesomeIcon
                                        icon={faPaperPlane}
                                        color="#3B82F6"
                                        size="2x"
                                    />
                                </div> */}
                            <h3 className="text-3xl font-bold text-orange-500 mb-2 text-start">
                                <FontAwesomeIcon
                                    icon={faPaperPlane}
                                    color="#3B82F6"
                                />
                                Core Values
                            </h3>
                            <div className="flex gap-20">
                                <p className="text-center text-gray-900 text-lg text-start">
                                    •Excellence
                                </p>
                                <p className="text-center text-gray-900 text-lg text-start">
                                    •Creativity
                                </p>
                                <p className="text-center text-gray-900 text-lg text-start">
                                    •Customer Service
                                </p>
                                <p className="text-center text-gray-900 text-lg text-start">
                                    •Reliability
                                </p>
                                <p className="text-center text-gray-900 text-lg text-start">
                                    •Flexibility
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* End About Section */}
                    {/* Achievements Section */}

                    <section
                        className=" about py-10 bg-gray-50 w-full"
                        id="achievements"
                    >
                        <div className="container mx-auto px-2 sm:px-6 lg:px-8">
                            <div className="flex flex-col items-center">
                                <h2 className="text-4xl font-bold mb-5 title">
                                    Achievements
                                    <hr className="border-2 border-orange-500 w-20 mx-auto mt-3" />
                                </h2>
                                <div className="mb-4">
                                    <div className="card card-side bg-base-100 shadow-xl">
                                        <figure>
                                            <img
                                                className="rounded-xl"
                                                src={cert}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                }}
                                            />
                                        </figure>
                                        <div className="card-body text-sm justify-end">
                                            <h2 className="card-title">
                                                BEST STANDARD QUALITY CATERING
                                                SERVICE PROVIDER
                                            </h2>
                                            <p className="justify-end">
                                                Calinao’s Catering Services was
                                                given a trophy and certificate
                                                of recognition as the BEST
                                                STANDARD QUALITY CATERING
                                                SERVICE PROVIDER during the
                                                Golden Globe Annual Award for
                                                Business and Excellence (GGAABE)
                                                2019 held at the Manila Hotel on
                                                September 20, 2019. This was
                                                because Calinao’s Catering
                                                Services met and accepted the
                                                criteria and qualifications
                                                based on the consumer survey and
                                                market research conducted by the
                                                National Data Research Examiner
                                                and Marketing Services
                                                Incorporated. It is broadcast by
                                                the media partners, GMA 7 and
                                                PTV 4.
                                            </p>
                                            <div className="card-actions justify-end"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card card-side bg-base-100 shadow-xl">
                                    <figure>
                                        <img
                                            className="rounded-xl"
                                            src={trophy}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        />
                                    </figure>
                                    <div className="card-body text-sm">
                                        <h2 className="card-title">
                                            BEST STANDARD QUALITY CATERING
                                            SERVICE PROVIDER
                                        </h2>
                                        <p>
                                            The endeavour is a joint undertaking
                                            of Golden Globe Awards Council,
                                            National Data Research and Marketing
                                            Services, Inc., Philippines Best
                                            Companies Com. Inc., Sining at Gabay
                                            ng Buhay (SINAG) Foundation Inc.,
                                            and SINAG News Magazine. Awards are
                                            bestowed upon companies that
                                            demonstrate business excellence,
                                            enhancement of business performance,
                                            practices, and capabilities and
                                            sharing of best choice for
                                            management practices among
                                            companies. In just 3 years of
                                            existence, Calinao’s Catering
                                            Services has already proven success
                                            and exemplary business undertakings.
                                        </p>
                                        <div className="card-actions justify-end"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* End Achievements Section */}
                    {/* Find Us Section */}
                    <section
                        className="about py-10 bg-gray-50 w-full"
                        id="find"
                    >
                        <div className="container mx-auto px-2 sm:px-6 lg:px-8">
                            <div className="flex flex-col items-center">
                                <h2 className="text-4xl font-bold mb-5 title">
                                    Find Us
                                    <hr className="border-2 border-orange-500 w-20 mx-auto mt-3" />
                                </h2>
                            </div>
                            <MapContainer
                                center={position}
                                zoom={20}
                                scrollWheelZoom={false}
                                style={{
                                    height: "400px",
                                    width: "100%",
                                    zIndex: "0",
                                }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={position}>
                                    <Popup>
                                        Calinao's Catering Services <br /> Sitio
                                        Ibaba, Brgy San Pedro, Bauan, Batangas
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </section>
                    {/* End Find Us Section */}
                    <hr className="border-1 border-gray-300 my-10" />
                    {/* Statement Section */}
                    <div className="header flex items-start justify-center h-fit gap-8">
                        <div className="header-container flex flex-col items-center justify-start w-3/5 h-full">
                            <h2 className="text-5xl font-bold mb-5 title leading-tight">
                                Here is what our clients say about{" "}
                                <span className="text-orange-500 title">
                                    Calinao's Catering Services
                                </span>
                            </h2>
                        </div>
                        <div className="paragraph-container flex flex-col items-center justify-start w-2/5 h-full">
                            <p className="text-center mb-10 text-gray-900 text-lg w-3/5">
                                "If you do build a great experience, customers
                                tell each other about that. Word of mouth is
                                very powerful."
                            </p>
                            <p>- Jeff Bezos</p>
                        </div>
                    </div>

                    <div className="statement py-10 w-full">
                        <div className="statement-container flex items-start justify-start overflow-x-auto">
                            <StatementCard />
                        </div>
                    </div>
                </div>
            </section>
            {/* End Statement Section */}
            <section className="about py-10 bg-gray-50 w-full" id="contact">
                <div className="container mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center">
                        <h2 className="text-4xl font-bold mb-5 title">
                            Contact Us
                            <hr className="border-2 border-orange-500 w-20 mx-auto mt-3" />
                        </h2>
                    </div>
                </div>
            </section>
            <footer className="footer p-10 bg-sky-700 text-neutral-content">
                <aside className="flex flex-col items-start justify-center p-8 ">
                    <img
                        className="h-20 w-30 ml-10 "
                        src={logo}
                        alt="Calinao's Logo"
                    />
                    <p>
                        Calinao's Catering Online Reservation
                        <br />
                        All rights reserved 2023
                    </p>
                </aside>
                <nav>
                    <header className="footer-title">
                        Contact Information
                    </header>
                    <div className="grid grid-flow-col-flex gap-10">
                        <a
                            className="flex items-center gap-2"
                            href="https://www.facebook.com/calinaoscatering"
                        >
                            <FontAwesomeIcon icon={faFacebook} size="2x" />{" "}
                            Calinao's Catering Services
                        </a>
                        <a
                            className="flex items-center gap-2"
                            href="calinaoaileen@gmail.com"
                        >
                            <FontAwesomeIcon icon={faEnvelope} size="2x" />
                            calinaoaileen@gmail.com
                        </a>
                        <a className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faPhone} size="2x" />
                            0905-453-2982
                        </a>
                    </div>
                </nav>
            </footer>
        </>
    );
};

export default Home;
