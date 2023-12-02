{
    /* <div className="overflow-x-auto">
    <table className="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>RESERVATION</th>
                <th>VENUE</th>
                <th>STATUS</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {reservations.map((reservation, index) => (
                <tr key={reservation.reservation_id}>
                    <td>{reservation.reservation_id}</td>
                    <td>{formatDate(reservation.event_date)}</td>
                    <td>{reservation.event_name}</td>
                    <td>{reservation.event_venue}</td>
                    <td>{reservation.status}</td>
                    <td>
                        <div className="flex gap-3">
                            {reservation.status === "Pending" && (
                                <button
                                    className="btn bg-red-500 text-white"
                                    onClick={() =>
                                        handleDeleteReservation(
                                            reservation.reservation_id
                                        )
                                    }
                                >
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            )}
                            {
                                reservation.status === "Approved" && (
                                    <button
                                        className="btn bg-green-500 text-white"
                                        onClick={() =>
                                            viewProposal(reservation)
                                        }
                                    >
                                        <FontAwesomeIcon icon={faFile} />
                                    </button>
                                ) //approved
                            }
                            {
                                reservation.status === "Completed" && (
                                    <button
                                        className="btn bg-green-500 text-white"
                                        onClick={() =>
                                            viewProposal(reservation)
                                        }
                                    >
                                        <FontAwesomeIcon icon={faFile} />
                                    </button>
                                ) //approved
                            }

                            <>
                                <button
                                    className="btn bg-green-500 text-white"
                                    disabled={
                                        reservation.status !== "Completed"
                                    }
                                    onClick={() => viewRatings(reservation)}
                                >
                                    <FontAwesomeIcon icon={faStar} />
                                </button>
                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box">
                                        <form
                                            method="dialog"
                                            onSubmit={handleSubmitRatings}
                                        >
                                            {/* if there is a button in form, it will close the modal */
}
// <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
//     ✕
// </button>
// <div className="form-control">
//     <label
//         htmlFor="rating"
//         className="label title text-xl"
//     >
//         Rating
//     </label>
//     <div className="rating-stars mb-2">
// {[1, 2, 3, 4, 5].map(
//     (star) => (
//         <FontAwesomeIcon
//             key={star}
//             icon={faStar}
//             className={
//                 star <=
//                 ratingValue
//                     ? "text-yellow-500 text-lg"
//                     : "text-lg"
//             }
//             onClick={() =>
//                 setRatingValue(
//                     star
//                 )
//             }
//         />
//     )
// )}
//                                                 </div>
//                                             </div>
//                                             <div className="form-control">
//                                                 <label
//                                                     htmlFor="comment"
//                                                     className="label title text-xl"
//                                                 >
//                                                     Comment
//                                                 </label>
//                                                 <textarea
//                                                     id="comment"
//                                                     className="textarea border border-black outline-none"
//                                                     style={{
//                                                         resize: "none",
//                                                     }}
//                                                     value={ratingComment}
//                                                     onChange={(e) =>
//                                                         setRatingComment(
//                                                             e.target.value
//                                                         )
//                                                     }
//                                                 />
//                                             </div>
//                                             <br />
//                                             <button
//                                                 type="submit"
//                                                 className="btn btn-primary"
//                                                 disabled={submittingRating} // Disable the button when submittingRating is true
//                                             >
//                                                 {submittingRating
//                                                     ? "Submitting..."
//                                                     : "Submit Rating"}
//                                             </button>
//                                         </form>
//                                     </div>
//                                 </dialog>
//                             </>

//                             <button
//                                 className="btn btn-info text-white"
//                                 onClick={() => viewReservation(reservation)}
//                             >
//                                 <FontAwesomeIcon icon={faEye} />
//                             </button>
//                         </div>
//                     </td>
//                 </tr>
//             ))}
//         </tbody>
//     </table>
// </div>; */}

import React from "react";

const Samp = () => {
    return <div>Samp</div>;
};

export default Samp;
