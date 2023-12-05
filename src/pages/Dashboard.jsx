import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBurger,
    faCalendar,
    faDollar,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Dashboard = () => {
    const [userID, setUserID] = useState(localStorage.getItem("userID"));
    const [roleID, setRoleID] = useState(localStorage.getItem("roleID"));
    const [loadingProfits, setLoadingProfits] = useState(true);
    const [profits, setProfits] = useState([]);
    const [client, setClient] = useState([]);
    const [reservation, setReservation] = useState([]);
    const [menu, setMenu] = useState([]);
    const [status, setStatus] = useState([]);

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

    useEffect(() => {
        const getStatus = async () => {
            try {
                const response = await fetch(
                    "https://ccsreservaton.online/api/status_count"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch profits");
                }

                const data = await response.json();
                if (data.count === null) {
                    setStatus([]);
                } else {
                    setStatus(data);
                }
            } catch (error) {
                console.error("Error fetching profits:", error);
                // Handle the error, e.g., show a message to the user
            } finally {
                setLoadingProfits(false);
            }
        };
        getStatus();
    }, []);

    const [monthlyProfits, setMonthlyProfits] = useState({});

    // Extract months and profits for chart
    const months = Object.keys(monthlyProfits);
    const profitss = Object.values(monthlyProfits);

    // Chart.js configuration
    const chartData = {
        labels: months,
        datasets: [
            {
                label: "Monthly Profits for 2023",
                data: profitss,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const chartData2 = {
        labels: status.map((item) => item.status),
        datasets: [
            {
                data: status.map((item) => item.count),
                backgroundColor: [
                    "#36A2EB",
                    "#FFCE56",
                    "#FF6384",
                    "#4BC0C0",
                    "#FF8C00",
                ],
                hoverBackgroundColor: [
                    "#36A2EB",
                    "#FFCE56",
                    "#FF6384",
                    "#4BC0C0",
                    "#FF8C00",
                ],
            },
        ],
    };

    useEffect(() => {
        const getProfit = async () => {
            try {
                const response = await fetch(
                    "https://ccsreservaton.online/api/payment_amount"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch profits");
                }

                const data = await response.json();
                if (data.sum === null) {
                    setProfits(0);
                } else {
                    setProfits(data.sum);
                }
            } catch (error) {
                console.error("Error fetching profits:", error);
                // Handle the error, e.g., show a message to the user
            } finally {
                setLoadingProfits(false);
            }
        };

        //clinte count

        const getClientCount = async () => {
            try {
                const response = await fetch(
                    "https://ccsreservaton.online/api/client_count"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch profits");
                }

                const data = await response.json();
                if (data.count === null) {
                    setClient(0);
                } else {
                    setClient(data.count);
                }
            } catch (error) {
                console.error("Error fetching profits:", error);
                // Handle the error, e.g., show a message to the user
            } finally {
                setLoadingProfits(false);
            }
        };

        const getReservationCount = async () => {
            try {
                const response = await fetch(
                    "https://ccsreservaton.online/api/reservation_count"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch profits");
                }

                const data = await response.json();
                if (data.count === null) {
                    setReservation(0);
                } else {
                    setReservation(data.count);
                }
            } catch (error) {
                console.error("Error fetching profits:", error);
                // Handle the error, e.g., show a message to the user
            } finally {
                setLoadingProfits(false);
            }
        };

        const getMenuCount = async () => {
            try {
                const response = await fetch(
                    "https://ccsreservaton.online/api/menu_count"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch profits");
                }

                const data = await response.json();
                if (data.count === null) {
                    setMenu(0);
                } else {
                    setMenu(data.count);
                }
            } catch (error) {
                console.error("Error fetching profits:", error);
                // Handle the error, e.g., show a message to the user
            } finally {
                setLoadingProfits(false);
            }
        };

        const fetchMonthlyProfit = async (month) => {
            try {
                const response = await fetch(
                    `https://ccsreservaton.online/api/transaction_sum/${month}`
                );

                if (!response.ok) {
                    throw new Error(`Failed to fetch profits for ${month}`);
                }

                const data = await response.json();
                console.log(data.sum, "sum");
                return data.sum;
            } catch (error) {
                console.error(`Error fetching profits for ${month}:`, error);
                return 0; // Return 0 in case of an error
            }
        };

        const updateMonthlyProfits = async () => {
            const months = [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
            ];
            const updatedProfits = {};

            try {
                // Use Promise.all to fetch profits for all months concurrently
                const profits = await Promise.all(
                    months.map(async (month) => await fetchMonthlyProfit(month))
                );

                // Update the monthlyProfits object
                months.forEach((month, index) => {
                    //to number
                    updatedProfits[month] = parseInt(profits[index]);
                });
            } catch (error) {
                console.error("Error updating monthly profits:", error);
            } finally {
                setLoadingProfits(false);
                setMonthlyProfits(updatedProfits);
            }
        };

        updateMonthlyProfits();

        getMenuCount();

        getReservationCount();

        getClientCount();
        getProfit();

        console.log(profits, client);
    }, []);

    return (
        <section className="dashboard__section h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-row">
            <Sidebar roleID={roleID} />
            <div className="flex flex-col w-full h-full p-3 overflow-auto">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-3xl font-bold title tracking-wide">
                            Dashboard
                        </h1>
                    </div>
                    <hr className="my-2" />
                    <div className="stats shadow mb-3 w-full">
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <FontAwesomeIcon
                                    icon={faDollar}
                                    className="text-3xl text-secondary"
                                />
                            </div>
                            <div className="stat-title">Profits</div>
                            {loadingProfits ? (
                                <div>Loading...</div>
                            ) : (
                                <>
                                    <div className="stat-value text-primary">
                                        {profits}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <FontAwesomeIcon
                                    icon={faUsers}
                                    className="text-3xl text-secondary"
                                />
                            </div>
                            <div className="stat-title">Clients</div>
                            {loadingProfits ? (
                                <div>Loading...</div>
                            ) : (
                                <>
                                    <div className="stat-value text-primary">
                                        {client}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <FontAwesomeIcon
                                    icon={faBurger}
                                    className="text-3xl text-secondary"
                                />
                            </div>
                            <div className="stat-title">Foods</div>
                            {loadingProfits ? (
                                <div>Loading...</div>
                            ) : (
                                <>
                                    <div className="stat-value text-primary">
                                        {menu}
                                    </div>
                                </>
                            )}
                        </div>{" "}
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <FontAwesomeIcon
                                    icon={faCalendar}
                                    className="text-3xl text-secondary"
                                />
                            </div>
                            <div className="stat-title">Reservations</div>
                            {loadingProfits ? (
                                <div>Loading...</div>
                            ) : (
                                <>
                                    <div className="stat-value text-primary">
                                        {reservation}
                                    </div>
                                </>
                            )}
                        </div>
                        {/* Add other stats here */}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-2xl font-bold">
                                    Monthly Profits
                                </h1>
                            </div>
                            <hr className="my-2" />
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-2xl font-bold">
                                    Reservation Status
                                </h1>
                            </div>
                            <hr className="my-2" />
                            <Pie data={chartData2} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
