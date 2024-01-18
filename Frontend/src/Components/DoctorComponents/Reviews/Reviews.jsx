import React, { useState, useEffect } from 'react';
import { getReviews } from '../../../Api/doctorApi';
import { useSelector } from 'react-redux';
import Loading from "../../../Components/Loading/Loading";

const Reviews = () => {
    const { _id } = useSelector((state) => state.reducer.doctorReducer.doctor);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [pagination, setPagination] = useState({});


    useEffect(() => {
        setLoading(true);
        getReviews(_id, currentPage, itemsPerPage)
            .then((res) => {
                setReviews(res?.data?.data);
                setPagination(res?.data?.pagination);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, [_id, itemsPerPage, currentPage]);

    return (
        <div className='bg-blue-50 min-h-screen'>
            <div className="flex justify-center">
                {loading ? (
                    <Loading />
                ) : reviews.length > 0 ? (
                    <div className="max-w-screen-xl w-full p-4">
                        <div className="text-center text-3xl p-6 underline text-black">
                            <p>Reviews</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reviews.map((rev) => (
                                <div key={rev._id} className="bg-white rounded-lg overflow-hidden shadow-md">
                                    <div className="p-4">
                                        <div className="flex items-center mb-4">
                                            <img
                                                src={rev.postedBy.photo}
                                                alt="User"
                                                className="h-12 w-12 rounded-full mr-4"
                                            />
                                            <p className="text-gray-700">Posted by: {rev.postedBy.name}</p>
                                        </div>
                                        <p className="text-xl font-semibold mb-4">{rev.text}</p>
                                        <div className="flex items-center mb-2 space-x-1 rtl:space-x-reverse">
                                            {Array.from({ length: rev?.star }, (_, index) => (
                                                <svg
                                                    key={index}
                                                    className="w-5 h-5 text-yellow-300"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 22 20"
                                                >
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <p className="text-gray-500">Posted Date: {new Date(rev.postedDate).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-3xl p-6 underline text-black">
                        <p>No reviews available</p>
                    </div>
                )}
            </div>

            {pagination && pagination.totalPages && reviews.length > 0 && (
                <div className="flex justify-center mt-4 ">
                    {Array.from({ length: pagination.totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`pagination-btn border w-10 ${index + 1 === currentPage ? "border-black" : "border-gray-200"}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Reviews;
