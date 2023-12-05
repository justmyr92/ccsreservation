import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Check if user is already logged in
        const roleID = localStorage.getItem("roleID");
        if (roleID === "ROLE001") {
            navigate("/");
        } else if (roleID === "ROLE002" || roleID === "ROLE003") {
            navigate("/");
        }
        console.log(roleID);
    }, [history]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        //run login api

        const data = {
            client_email: email,
            client_password: password,
        };

        try {
            const response = await fetch(
                "https://ccsreservaton.online/api/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
            );

            const result = await response.json();

            if (result.role_id === "ROLE001") {
                // set user to local storage
                localStorage.setItem("userID", result.client_id);
                localStorage.setItem("roleID", result.role_id);
                window.location.href = "/";
            } else if (result.role_id === "ROLE002") {
                localStorage.setItem("userID", result.staff_id);
                localStorage.setItem("roleID", result.role_id);
                window.location.href = "/dashboard";
            } else if (result.role_id === "ROLE003") {
                localStorage.setItem("userID", result.admin_id);
                localStorage.setItem("roleID", result.role_id);
                window.location.href = "/dashboard";
            } else {
                setError("Incorrect email or password. Please try again.");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const [error, setError] = useState("");

    return (
        <section className="login__section h-screen bg-blue-100">
            <div className="container mx-auto h-full flex justify-center items-center p-5">
                <div className="form__container bg-white p-10 rounded-lg shadow-2xl">
                    <div className="form__container">
                        <h1 className="text-3xl font-bold text-start">Login</h1>
                        <p className="text-center">
                            Please enter the your email address/contact number
                            and password.
                        </p>
                        <div className="divider my-1"></div>
                        {error && (
                            <div className="alert alert-error">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-current shrink-0 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="text-sm">{error}</span>
                            </div>
                        )}
                        <form className="form my-4" onSubmit={handleSubmit}>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">
                                        Email Address / Contact Number
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Email Address / Contact Number"
                                    className="input input-bordered w-full outline-none focus:outline-none"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-control w-full mb-2">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="input input-bordered w-full outline-none focus:outline-none"
                                    name="password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="form-control w-full col-span-2">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-primary"
                                        checked={showPassword}
                                        onChange={(e) =>
                                            setShowPassword(
                                                e.currentTarget.checked
                                            )
                                        }
                                    />
                                    <span className="ml-2">Show Password</span>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    className="btn btn-block btn-primary"
                                    type="submit"
                                >
                                    Login
                                </button>
                                <Link
                                    to="/signup"
                                    className="btn btn-block btn-link no-underline"
                                >
                                    Create an account
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
