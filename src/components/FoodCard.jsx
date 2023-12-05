import React, { useState, useEffect } from "react";
import plate from "../assets/plate.png";
import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const FoodCard = ({ food, foodID, setFoodID }) => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("");

    const handleFoodClick = (food_id) => {
        //if foodID is in the array, remove it
        if (foodID.includes(food_id) && foodID.length > 0) {
            //remove foodID from the array
            setFoodID((prevFoodID) =>
                prevFoodID.filter((id) => id !== food_id)
            );
            return;
        }

        setLoading(true);
        //wait for 2 seconds
        setTimeout(() => {
            //set loading to false
            setLoading(false);
        }, 1000);

        setFoodID((prevFoodID) => [...prevFoodID, food_id]);
    };

    useEffect(() => {
        // Create a reference to the file we want to download
        const storageRef = ref(storage, `foods/${food.food_image}`);
        // Get the download URL
        getDownloadURL(storageRef)
            .then((url) => {
                // Insert url into an <img> tag to "download"
                setImage(url);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [food.food_image]);

    return (
        <div
            className="food-card border p-5 relative my-10 rounded-2xl hover:shadow-lg bg-sky-100"
            key={food.id}
        >
            <div className="absolute top-0 right-[50%] transform -translate-y-1/2 translate-x-1/2 w-[10rem] h-[10rem] rounded-full p-3 bg-white shadow-lg">
                <img
                    src={image}
                    alt={food.food_name}
                    className="food-card-image rounded-full w-full h-full object-cover"
                />
            </div>
            <div className="food-card-body mt-20">
                {/* <div className="img bg-white rounded-full w-[10rem] h-[10rem] mx-auto shadow-lg">
                    <img
                        src={image}
                        alt={food.food_name}
                        className="food-card-image w-full h-full object-cover"
                    />
                </div> */}
                <h5 className="food-card-title title text-xl text-center text-orange-500 mb-3">
                    {food.food_name}
                </h5>
                <p className="food-card-text text-sm text-center text-gray-500">
                    {food.food_description}
                </p>
                <div className="food-card-footer flex justify-between items-center mt-5">
                    {/* <div className="serving-container flex items-center flex-col">
                        <span className="text-sm text-gray-500 font-bold">
                            Serving
                        </span>
                        <span className="text-sm text-gray-500">
                            {food.food_servings}
                        </span>
                    </div> */}
                    <div className="price-container flex items-center flex-col">
                        <span className="text-sm text-gray-500 font-bold">
                            Price
                        </span>
                        <span className="text-sm text-gray-500">
                            {food.food_price}
                        </span>
                    </div>
                </div>

                <button
                    className="food-card-btn bg-orange-500 text-white px-5 py-2 rounded-full w-full mt-5"
                    disabled={loading}
                    onClick={() => handleFoodClick(food.food_id)}
                >
                    {loading ? (
                        <>
                            <span className="loading loading-spinner loading-sm"></span>
                            <p>Adding to cart...</p>
                        </>
                    ) : (
                        // Check if foodID is in the array
                        // If yes, show "Added to cart"
                        // Else show "Add to cart"
                        <>
                            {foodID.includes(food.food_id)
                                ? "Added to cart"
                                : "Add to cart"}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default FoodCard;
