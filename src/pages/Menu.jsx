import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";
import { FaPlusSquare } from "react-icons/fa";

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
            const response = await fetch("http://localhost:7723/foods");
            const result = await response.json();
            setMenu(result);
            setReload(false);
        };
        fetchMenu();
    }, [reload]);

    useEffect(() => {
        console.log(foodName, foodType, foodPrice, foodDescription, foodImage);
    }, [foodName, foodType, foodPrice, foodDescription, foodImage]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        var formData = new FormData();

        formData.append("food_name", foodName);
        formData.append("food_type", foodType);
        formData.append("food_price", foodPrice);
        formData.append("food_description", foodDescription);
        formData.append("food_image", foodImage); // Assuming foodImage is a File object

        for (var pair of formData.entries()) {
            console.log(pair[0] + ", " + pair[1]);
        }

        try {
            const response = await fetch("http://localhost:7723/foods", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (result) {
                setReload(!reload);
                setFoodName("");
                setFoodType("");
                setFoodPrice("");
                setFoodDescription("");
                inputRef.current.value = "";
                setFoodImage("");
                document.getElementById("add_food_modal").close();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const food = {
            food_name: updateFoodName,
            food_type: updateFoodType,
            food_price: updateFoodPrice,
            food_description: updateFoodDescription,
        };

        try {
            const response = await fetch(
                `http://localhost:7723/foods/${selectedFoodID}`,
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
    };

    const handleUpdateClose = () => {
        document.getElementById("update_food_modal").close();
    };
    return (
        <section className="menu__section h-screen bg-blue-100 flex flex-row">
            <Sidebar roleID={roleID} />
            <div className="menu__container p-5 flex flex-col h-full overflow-y-auto w-[80%]">
                {/* Add Food Modal*/}
                <dialog id="add_food_modal" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Add Food</h3>
                        <p className="py-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptatem, nesciunt.
                        </p>
                        <div className="modal-action">
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
                                    onChange={(e) =>
                                        setFoodName(e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Food Type"
                                    className="input input-bordered w-full"
                                    onChange={(e) =>
                                        setFoodType(e.target.value)
                                    }
                                    name="foodType"
                                    value={foodType}
                                />
                                <input
                                    type="number"
                                    placeholder="Food Price"
                                    className="input input-bordered w-full"
                                    onChange={(e) =>
                                        setFoodPrice(e.target.value)
                                    }
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
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >
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
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    Update
                                </button>
                                <button
                                    className="btn"
                                    onClick={handleUpdateClose}
                                >
                                    Close
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
                <div className="table w-full p-4 bg-white rounded-lg shadow-lg">
                    <div className="search-container flex justify-between items-center w-content mb-2">
                        <input
                            type="text"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="Search"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                document
                                    .getElementById("add_food_modal")
                                    .showModal()
                            }
                        >
                            <FaPlusSquare />
                        </button>
                    </div>
                    <DataTable
                        columns={columns}
                        data={menu}
                        pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 10, 15, 20]}
                    />
                </div>
            </div>
        </section>
    );
};

export default Menu;
