import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";
import { FaPlusSquare } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const Menu = () => {
    const [userID, setUserID] = useState(localStorage.getItem("userID"));
    const [roleID, setRoleID] = useState(localStorage.getItem("roleID"));
    const [menu, setMenu] = useState([]);
    const [search, setSearch] = useState("");
    const [reload, setReload] = useState(false);
    const [foodName, setFoodName] = useState("");
    const [foodType, setFoodType] = useState("");
    const [foodPrice, setFoodPrice] = useState("");
    const [foodDescription, setFoodDescription] = useState("");
    const [foodImage, setFoodImage] = useState("");
    const inputRef = useRef(null);

    const [selectedFoodID, setSelectedFoodID] = useState("");
    const [updateFoodName, setUpdateFoodName] = useState("");
    const [updateFoodType, setUpdateFoodType] = useState("");
    const [updateFoodPrice, setUpdateFoodPrice] = useState("");
    const [updateFoodDescription, setUpdateFoodDescription] = useState("");

    const updateInputRef = useRef(null);

    const handleUpdateClick = (food) => {
        setSelectedFoodID(food.food_id);
        setUpdateFoodName(food.food_name);
        setUpdateFoodType(food.food_type);
        setUpdateFoodPrice(food.food_price);
        setUpdateFoodDescription(food.food_description);

        document.getElementById("update_food_modal").showModal();
    };

    const deleteFood = async (foodID) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(
                        `https://ccsreservaton.online/api/foods/${foodID}`,
                        {
                            method: "DELETE",
                        }
                    );

                    const result = await response.json();
                    if (result) {
                        setReload(!reload);
                        Swal.fire(
                            "Deleted!",
                            "Your file has been deleted.",
                            "success"
                        );
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        });
    };

    const columns = [
        { name: "ID", selector: (row) => row.food_id, sortable: true },
        {
            name: "Name",
            selector: (row) => row.food_name,
            sortable: true,
        },
        {
            name: "Image",
            selector: (row) => (
                <img
                    src={row.food_image}
                    alt={row.food_name}
                    className="w-20 object-cover"
                />
            ),
            sortable: true,
        },
        {
            name: "Type",
            selector: (row) => row.food_type,
            sortable: true,
        },
        {
            name: "Price",
            selector: (row) => row.food_price,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row.food_description,
            sortable: true,
        },
        {
            name: "Action",
            selector: (row) => (
                <div className="flex flex-row gap-2">
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleUpdateClick(row)}
                    >
                        Edit
                    </button>
                </div>
            ),
            sortable: true,
        },
    ];

    useEffect(() => {
        if (!userID) {
            window.location.href = "/login";
        } else {
            if (roleID === "ROLE001") {
                window.location.href = "/";
            }
        }
    }, []);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch(
                    "https://ccsreservaton.online/api/foods"
                );
                const result = await response.json();

                // Convert search to lowercase
                const searchLowerCase = search.toLowerCase();

                // Convert all relevant fields in foods to lowercase and perform case-insensitive comparison
                const filteredMenu = result.filter(
                    (food) =>
                        food.food_id
                            .toString()
                            .toLowerCase()
                            .includes(searchLowerCase) ||
                        food.food_name
                            .toLowerCase()
                            .includes(searchLowerCase) ||
                        food.food_type
                            .toLowerCase()
                            .includes(searchLowerCase) ||
                        food.food_price
                            .toString()
                            .toLowerCase()
                            .includes(searchLowerCase) ||
                        food.food_description
                            .toLowerCase()
                            .includes(searchLowerCase)
                );

                // Use Promise.all to handle asynchronous operations in parallel
                const updatedMenu = await Promise.all(
                    filteredMenu.map(async (food) => {
                        const imageRef = ref(
                            storage,
                            `foods/${food.food_image}`
                        );
                        const url = await getDownloadURL(imageRef);
                        return { ...food, food_image: url };
                    })
                );

                setMenu(updatedMenu);
                setReload(false);
            } catch (error) {
                console.error("Error fetching menu:", error);
            }
        };

        fetchMenu();
    }, [reload, search]);

    useEffect(() => {
        console.log(foodName, foodType, foodPrice, foodDescription, foodImage);
    }, [foodName, foodType, foodPrice, foodDescription, foodImage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const new_food_image = foodImage.name + v4();
        const data = {
            food_name: foodName,
            food_type: foodType,
            food_price: foodPrice,
            food_description: foodDescription,
            food_image: new_food_image,
        };

        document.getElementById("add_food_modal").close();

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(
                        "https://ccsreservaton.online/api/foods",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data),
                        }
                    );

                    const result = await response.json();
                    if (response.ok) {
                        const imageRef = ref(
                            storage,
                            `foods/${new_food_image}`
                        );
                        uploadBytes(imageRef, foodImage).then(() => {
                            setReload(!reload);
                            setFoodName("");
                            setFoodType("");
                            setFoodPrice("");
                            setFoodDescription("");
                            inputRef.current.value = "";
                            setFoodImage("");
                        });
                    }
                } catch (err) {
                    console.log(err);
                } finally {
                    // Set reload to false after the entire asynchronous process is complete
                    setReload(false);
                }
            } else {
                // Set reload to false if the user cancels the operation
                setReload(false);
            }
        });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const food = {
            food_name: updateFoodName,
            food_type: updateFoodType,
            food_price: updateFoodPrice,
            food_description: updateFoodDescription,
        };

        document.getElementById("update_food_modal").close();
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(
                        `https://ccsreservaton.online/api/foods/${selectedFoodID}`,
                        {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(food),
                        }
                    );

                    const result = await response.json();
                    if (result) {
                        setReload(!reload);
                        setUpdateFoodName("");
                        setUpdateFoodType("");
                        setUpdateFoodPrice("");
                        setUpdateFoodDescription("");

                        document.getElementById("update_food_modal").close();
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        });
    };

    const handleUpdateClose = () => {
        document.getElementById("update_food_modal").close();
    };
    return (
        <>
            <section className="menu__section h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-row relative">
                <div className="toast toast-bottom toast-end z-50">
                    {reload && (
                        <div className="alert alert-primary-content shadow-lg border border-gray-400">
                            <span className="flex items-center">
                                <span className="loading loading-dots loading-md mr-3"></span>
                                <span>Uploading...</span>
                            </span>
                        </div>
                    )}
                </div>
                <Sidebar roleID={roleID} />
                <div className="flex flex-col w-full h-full p-3 overflow-auto">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="text-3xl font-bold title tracking-wide">
                                Menu
                            </h1>
                            <div className="group flex flex-row items-center space-x-2">
                                <div className="flex items-center space-x-2 relative">
                                    <input
                                        type="text"
                                        className="border border-gray-300 text-gray-900 rounded-md px-3 py-2.5 focus:outline-none focus:border-blue-500"
                                        placeholder="Search"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                    <FaSearch className="absolute right-4 text-gray-500" />
                                </div>
                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        document
                                            .getElementById("add_food_modal")
                                            .showModal()
                                    }
                                >
                                    <FaPlusSquare className="mr-2" />
                                    Add Food
                                </button>
                            </div>
                        </div>

                        <hr className="my-2 border-blue-500 border-b-2" />
                        <div className="box">
                            <DataTable
                                columns={columns}
                                data={menu}
                                pagination={true}
                                noHeader={true}
                                fixedHeader={true}
                                fixedHeaderScrollHeight="600px"
                                highlightOnHover={true}
                                striped={true}
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* Add Food Modal*/}
            <dialog id="add_food_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-xl title">Add Food</h3>
                    <div className="modal-action h-full overflow-auto">
                        <form
                            method="dialog"
                            className="flex flex-col w-full gap-2"
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="text"
                                placeholder="Food Name"
                                className="input input-bordered w-full"
                                value={foodName}
                                name="foodName"
                                onChange={(e) => setFoodName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Food Type"
                                className="input input-bordered w-full"
                                onChange={(e) => setFoodType(e.target.value)}
                                name="foodType"
                                value={foodType}
                            />
                            <input
                                type="number"
                                placeholder="Food Price"
                                className="input input-bordered w-full"
                                onChange={(e) => setFoodPrice(e.target.value)}
                                name="foodPrice"
                                value={foodPrice}
                            />
                            <input
                                type="text"
                                placeholder="Food Description"
                                className="input input-bordered w-full"
                                onChange={(e) =>
                                    setFoodDescription(e.target.value)
                                }
                                name="foodDescription"
                                value={foodDescription}
                            />
                            <input
                                type="file"
                                placeholder="Food Image"
                                className="file-input input-bordered w-full"
                                onChange={(e) =>
                                    setFoodImage(e.target.files[0])
                                }
                                name="food_image"
                                ref={inputRef} // Assign the ref here
                            />
                            <button className="btn btn-primary" type="submit">
                                Add
                            </button>
                            <button
                                className="btn"
                                onClick={() => {
                                    setFoodName("");
                                    setFoodType("");
                                    setFoodPrice("");
                                    setFoodDescription("");
                                    inputRef.current.value = "";
                                    setFoodImage("");
                                    document
                                        .getElementById("add_food_modal")
                                        .close();
                                }}
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
            {/* Update Food Modal*/}
            <dialog id="update_food_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update Food</h3>

                    <div className="modal-action">
                        <form
                            method="dialog"
                            className="flex flex-col w-full gap-2"
                            onSubmit={handleUpdateSubmit}
                            encType="multipart/form-data"
                        >
                            <input
                                type="text"
                                placeholder="Food Name"
                                className="input input-bordered w-full"
                                value={updateFoodName}
                                onChange={(e) =>
                                    setUpdateFoodName(e.target.value)
                                }
                            />
                            <input
                                type="text"
                                placeholder="Food Type"
                                className="input input-bordered w-full"
                                onChange={(e) =>
                                    setUpdateFoodType(e.target.value)
                                }
                                value={updateFoodType}
                            />
                            <input
                                type="number"
                                placeholder="Food Price"
                                className="input input-bordered w-full"
                                onChange={(e) =>
                                    setUpdateFoodPrice(e.target.value)
                                }
                                value={updateFoodPrice}
                            />
                            <input
                                type="text"
                                placeholder="Food Description"
                                className="input input-bordered w-full"
                                onChange={(e) =>
                                    setUpdateFoodDescription(e.target.value)
                                }
                                value={updateFoodDescription}
                            />
                            <button className="btn btn-primary" type="submit">
                                Update
                            </button>
                            <button
                                className="btn"
                                type="button"
                                onClick={handleUpdateClose}
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Menu;
