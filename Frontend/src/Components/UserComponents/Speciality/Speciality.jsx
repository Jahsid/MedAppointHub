import React, { useEffect, useState } from 'react';
import { userSpecialityList } from '../../../Api/userApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';


const Speciality = () => {
    const [slist, setSlist] = useState(null);

    useEffect(() => {
        userSpecialityList()
            .then((res) => {
                setSlist(res?.data?.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    const handleClick = async (id) => {
        try {

        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <div className='bg-blue-50'>
                <div className='text-center bg-blue-50'>
                    <h1 className="text-3xl font-bold text-black underline">Specialities</h1>
                </div>
                <div className="bg-blue-50 flex items-center justify-center h-96">
                    <span className='m-2 sm:m-10 text-sm'><FontAwesomeIcon icon={faArrowLeft} /></span>
                    <div className="carousel w-full sm:w-[1300px] flex flex-row border  bg-white shadow-2xl rounded-xl overflow-x-scroll">
                        <div className="carousel rounded-box ">
                            {slist && slist.map((speciality) => (
                                <div key={speciality._id} className="carousel-item cursor-pointer " onClick={() => handleClick(speciality._id)}>
                                    <div className="max-w-xs mx-auto p-2 sm:p-4 bg-white flex flex-col items-center space-y-2 sm:space-y-5 text-center">
                                        <div className='mx-2 sm:mx-10'>
                                            <img className="w-full h-16 sm:h-32 object-cover mb-2 sm:mb-4" src={speciality.photo} alt={speciality.speciality} />
                                            <p className="text-sm sm:text-lg text-black font-semibold">{speciality.speciality}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <span className='m-2 sm:m-10 text-sm'><FontAwesomeIcon icon={faArrowRight} /></span>
                    <br />
                </div>
            </div>
        </>


    );
};

export default Speciality;
