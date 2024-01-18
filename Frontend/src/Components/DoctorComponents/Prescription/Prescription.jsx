import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { priscription } from '../../../Api/doctorApi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Priscription = () => {
    const location = useLocation();
    const { _id } = useSelector((state) => state.reducer.doctorReducer.doctor);
    const navigate = useNavigate()

    const { date, start, end, userId, appoId } = location.state || {}

    const [medicineData, setMedicineData] = useState({
        medicine: '',
        duration: '',
        frequency: ''
    });

    const [medicines, setMedicines] = useState([]);
    const [note, setNote] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate if all fields are filled before adding to the array
        if (
            medicineData.medicine.trim() !== '' &&
            medicineData.duration.trim() !== '' &&
            medicineData.frequency.trim() !== ''
        ) {
            setMedicines(prevMedicines => [...prevMedicines, medicineData]);
            setMedicineData({
                medicine: '',
                duration: '',
                frequency: ''
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'medicine') {
            setMedicineData(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else if (name === 'duration') {
            // Validate duration as a positive number
            const isValidDuration = /^\d+$/.test(value) || value === '';
            if (isValidDuration) {
                setMedicineData(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        } else if (name === 'frequency') {
            // Validate frequency as a positive number
            const isValidFrequency = /^\d+$/.test(value) || value === '';
            if (isValidFrequency) {
                setMedicineData(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        }
    };

    const handleNoteChange = (e) => {
        try {

            setNote(e.target.value)

        } catch (error) {
            console.log(error.message)
        }
    }

    const noteSubmit = async (e) => {
        try {
            e.preventDefault();

            if (!note.trim() || medicines.length === 0) {
                const errorMessage = !note.trim()
                    ? "Note cannot be empty"
                    : "Please add at least one medicine";

                const Toast = Swal.mixin({
                    toast: true,
                    position: "top",
                    showConfirmButton: false,
                    timer: 3000,
                });

                Toast.fire({
                    icon: "error",
                    title: errorMessage
                });

                return;
            }


            const response = await priscription({
                medicines,
                note,
                drId: _id,
                date,
                start,
                end,
                userId,
                appoId,
            });


            if (response.status === 200) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top",
                    showConfirmButton: false,
                    timer: 3000,
                    // timerProgressBar: true,
                    // didOpen: (toast) => {
                    //     toast.onmouseenter = Swal.stopTimer;
                    //     toast.onmouseleave = Swal.resumeTimer;
                    // }
                });

                Toast.fire({
                    icon: "success",
                    title: response.data.message
                });
                navigate('/doctor/appointment')
            }
        } catch (error) {
            e.preventDefault();

            const response = await priscription({
                medicines,
                note,
                drId: _id,
                date,
                start,
                end,
                userId
            });
            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
            });

            Toast.fire({
                icon: "success",
                title: response.data.message
            });

            console.log(error.message);

        }
    };



    return (
        <>
            <div className='bg-blue-50'>
                <h1 className='text-center text-2xl pt-10  text-black'>PRESCRIPTION</h1>
            </div>
            <div className='bg-blue-50 min-h-screen flex flex-col items-center text-black'>

                <div className='flex flex-col justify-center w-full md:flex-row'>

                    {/* Add Medicine Section */}
                    <div className='p-5 m-5 md:w-[50%] lg:w-[40%] xl:w-[30%]'>
                        <div className='p-8 border bg-white rounded-2xl shadow-2xl'>
                            <h2 className='text-center text-2xl font-bold text-gray-800 mb-5'>Add Medicine</h2>

                            <form onSubmit={handleSubmit} className='space-y-3'>
                                <div>
                                    <label className='block text-sm font-semibold text-gray-600 mb-1'>Medicine</label>
                                    <input
                                        type='text'
                                        name='medicine'
                                        value={medicineData.medicine}
                                        onChange={handleInputChange}
                                        className='w-full border p-3 rounded-md focus:outline-none focus:border-blue-500'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-semibold text-gray-600 mb-1'>Duration (e.g., 7 days)</label>
                                    <input
                                        type='text'
                                        name='duration'
                                        value={medicineData.duration}
                                        onChange={handleInputChange}
                                        className='w-full border p-3 rounded-md focus:outline-none focus:border-blue-500'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-semibold text-gray-600 mb-1'>Frequency (e.g., 2 times a day)</label>
                                    <input
                                        type='text'
                                        name='frequency'
                                        value={medicineData.frequency}
                                        onChange={handleInputChange}
                                        className='w-full border p-3 rounded-md focus:outline-none focus:border-blue-500'
                                    />
                                </div>
                                <button
                                    type='submit'
                                    className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue'
                                >
                                    Add Medicine
                                </button>
                            </form>
                        </div>
                    </div>


                    {/* Medicines List Section */}
                    <div className='p-5 m-5 md:w-[50%] lg:w-[60%] xl:w-[38%]'>
                        <div className='p-10 border bg-white overflow-auto h-[420px] shadow-2xl rounded-2xl'>
                            <h2 className='text-2xl font-bold text-center mb-5 text-gray-800'>Medicines</h2>
                            <hr className='my-5 border-t-2 border-gray-200' />
                            <ul>
                                {medicines.map((medicine, index) => (
                                    <li key={index} className='mb-8 p-6 border rounded-md shadow-md'>
                                        <h1 className='text-xl font-semibold text-green-500 mb-3'>Medicine {index + 1}</h1>
                                        <p className='text-sm text-gray-700'>
                                            <span className='font-semibold'>Medicine:</span> {medicine.medicine}<br />
                                            <span className='font-semibold'>Duration:</span> {medicine.duration} Days<br />
                                            <span className='font-semibold'>Frequency:</span> {medicine.frequency} Times a Day
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>


                </div>

                {/* Add Note Section */}
                <div className='p-5 m-5 md:w-[100%] lg:w-[80%] xl:w-[70%]'>
                    <div className='p-10 border bg-white shadow-2xl rounded-2xl'>
                        <h2 className='text-lg text-center'>Add Note</h2>
                        <form onSubmit={noteSubmit} className='space-y-3'>
                            <label className='block text-sm text-gray-600'>Note</label>
                            <textarea
                                name='note'
                                value={note}
                                onChange={handleNoteChange}
                                className='w-full border p-2 rounded'
                                rows='8'
                                cols='50'
                            />

                            <button className="btn btn-outline btn-success w-full">DONE</button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Priscription;
