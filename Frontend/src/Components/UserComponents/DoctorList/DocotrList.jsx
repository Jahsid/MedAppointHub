import React, { useEffect, useState } from 'react';
import { doctorList } from '../../../Api/userApi';
import { specialityName } from '../../../Api/doctorApi';
import { Link } from 'react-router-dom';
import Loading from "../../../Components/Loading/Loading";


const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [speciality, setSpeciality] = useState([]);
    const [select, setSelect] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState();
    const [sort, setSort] = useState();
    const noOfDoctors = 4;
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        doctorList(select, searchQuery, currentPage, noOfDoctors, sort)
            .then((response) => {
                setLoading(false);
                setDoctors(response?.data?.doctors);
                setTotalCount(response?.data?.totalCount);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, [select, searchQuery, currentPage, sort]);


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleSelectChange = (e) => {
        setSelect(e.target.value);
        setCurrentPage(1);
    };

    useEffect(() => {
        specialityName()
            .then((res) => {
                setSpeciality(res?.data?.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    const handleSortChange = (e) => {
        setSort(e.target.value);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(totalCount / noOfDoctors);

    return (

        <>
            <div className='bg-blue-50 min-h-screen'>
                <div className='flex justify-center space-x-4 p-4'>
                    {speciality && (
                        <div className='text-black'>
                            <select
                                name="speciality"
                                onChange={handleSelectChange}
                                className="input input-bordered bg-white border rounded-2xl"
                            >
                                <option value="">
                                    Select a speciality
                                </option>
                                {speciality.map((speciality) => (
                                    <option key={speciality.id} value={speciality.id}>
                                        {speciality.speciality}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className='text-black'>
                        <select
                            name="sort"
                            onChange={handleSortChange}
                            className="input input-bordered bg-white border rounded-2xl"
                        >
                            <option value="">Sort by</option>
                            <option value="experience">Experience</option>
                        </select>
                    </div>

                    <input
                        type='text'
                        placeholder='Search'
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className='input input-bordered w-full md:w-64 bg-white border text-black rounded-2xl'
                    />
                </div>

                {
                    loading ? (
                        <div className="fixed inset-0 flex items-center justify-center min-h-screen">
                            <div className="spinnerouter">
                                <Loading />
                            </div>
                        </div>) : (
                        <div>

                            <div className='max-w-screen-xl mx-auto p-4'>
                                {doctors.length === 0 ? (
                                    <div className='flex justify-center text-2xl text-blue-500 px'>
                                        <p> No doctors available</p>
                                    </div>) : (
                                    <div>

                                    </div>
                                )}
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 '>
                                    {doctors.length === 0 ? (
                                        <div>

                                        </div>
                                    ) : (
                                        doctors.map((doctor) => (
                                            <Link to={`/doctordetails/${doctor._id}`} key={doctor._id}>
                                                <div className='bg-white shadow-lg border h-96 rounded-lg overflow-hidden transition-transform transform hover:scale-105'>
                                                    <div className='p-4 text-gray-900'>
                                                        <img
                                                            src={doctor.photo}
                                                            alt={doctor.name}
                                                            className='w-24 h-24 rounded-full mb-4 mx-auto object-cover'
                                                        />
                                                        <h3 className='text-lg font-semibold text-center mb-2'>Dr. {doctor.name}</h3>
                                                    </div>
                                                    <div className='border-t p-4 text-black'>
                                                        <p className='mb-2'>Price: ₹299</p>
                                                        <p className='mb-2'>Speciality: {doctor.speciality}</p>
                                                        <p className='mb-2'>Experience: {doctor.experience ? doctor.experience : 'Not added'}</p>
                                                        <p className='mb-2'>Language: English, Malayalam</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Pagination */}
                            <div className='flex justify-center mt-4 bg-blue-50'>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`pagination-btn border w-10 ${index + 1 === currentPage ? "border-black" : "border-gray-300"}`}>
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )
                }
            </div >
        </>
    );
};

export default DoctorList;
