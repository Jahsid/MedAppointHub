import React from 'react'
import { useFormik } from 'formik'
import Swal from 'sweetalert2';
import { reportSchema } from '../../../validations/doctor/reportValidation';
import { addMedicalReport } from '../../../Api/doctorApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const Report = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const { date, userName, appoId, userId } = location.state || {}
    const { name } = useSelector((state) => state.reducer.doctorReducer.doctor);

    const onSubmit = async () => {
        try {
            const response = await addMedicalReport({ values, drName: name, userName, userId, appoDate: date, appoId })
            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
            });

            Toast.fire({
                icon: 'success',
                title: response.data.message,
            });

            navigate('/doctor/appointment');
        } catch (error) {
            console.log(error.message);
        }
    }



    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            history: '',
            investigation: '',
            age: '',
            gender: '',
            weight: '',
            complaint: '',
            diagnosis: '',
            additionalInfo: '',

        },
        validationSchema: reportSchema,
        onSubmit
    });




    return (
        <div className='min-h-screen bg-blue-50'>
            <div className="min-h-screen flex items-center justify-center  ">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full m-10 max-w-[700px]">

                    <h2 className="text-3xl mb-6 font-bold text-center text-green-500">Medical Report Form</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="patientName" className="block text-gray-700 text-sm font-bold mb-2">
                                Patient Name:
                            </label>
                            <input
                                type="text"
                                id="patientName"
                                name="patientName"
                                className="border rounded w-full py-2 px-3"
                                required
                                value={userName}

                            />

                        </div>

                        <div className="mb-4">
                            <label htmlFor="history" className="block text-gray-700 text-sm font-bold mb-2">
                                Past Medical History:
                            </label>
                            <input
                                type="text"
                                id="history"
                                name="history"
                                className="border rounded w-full py-2 px-3"
                                required
                                value={values.history}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.history && touched.history && (
                                <p className='text-red-600'>{errors.history}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">
                                Gender:
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                className="border rounded w-full py-2 px-3"
                                required
                                value={values.gender}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="" disabled hidden>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && touched.gender && (
                                <p className='text-red-600'>{errors.gender}</p>
                            )}
                        </div>



                        <div className="mb-4">
                            <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">
                                Age:
                            </label>
                            <input type="text" id="age" name="age" className="border rounded w-full py-2 px-3" required value={values.age}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            {errors.age && touched.age && (
                                <p className='text-red-600'>{errors.age}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="bmi" className="block text-gray-700 text-sm font-bold mb-2">
                                Weight:
                            </label>
                            <input
                                type="text"
                                id="weight"
                                name="weight"
                                className="border rounded w-full py-2 px-3"
                                required
                                value={values.weight}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.weight && touched.weight && (
                                <p className='text-red-600'>{errors.weight}</p>
                            )}
                        </div>



                        <div className="mb-4">
                            <label htmlFor="investigation" className="block text-gray-700 text-sm font-bold mb-2">
                                Investigation:
                            </label>
                            <input
                                type="text"
                                id="investigation"
                                name="investigation"
                                className="border rounded w-full py-2 px-3"
                                required
                                value={values.investigation}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.investigation && touched.investigation && (
                                <p className='text-red-600'>{errors.investigation}</p>
                            )}
                        </div>



                        <div className="mb-4">
                            <label htmlFor="symptoms" className="block text-gray-700 text-sm font-bold mb-2">
                                Present complaints:
                            </label>
                            <textarea
                                id="complaint"
                                name="complaint"
                                rows="4"
                                className="border rounded w-full py-2 px-3"
                                required
                                value={values.complaint}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            ></textarea>
                            {errors.complaint && touched.complaint && (
                                <p className='text-red-600'>{errors.complaint}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="diagnosis" className="block text-gray-700 text-sm font-bold mb-2">
                                Diagnosis:
                            </label>
                            <textarea
                                id="diagnosis"
                                name="diagnosis"
                                rows="4"
                                className="border rounded w-full py-2 px-3"
                                required
                                value={values.diagnosis}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            ></textarea>
                            {errors.diagnosis && touched.diagnosis && (
                                <p className='text-red-600'>{errors.diagnosis}</p>
                            )}
                        </div>


                        <div className="mb-4 col-span-2">
                            <label htmlFor="additionalInfo" className="block text-gray-700 text-sm font-bold mb-2">
                                Additional Information:
                            </label>
                            <textarea
                                id="additionalInfo"
                                name="additionalInfo"
                                rows="4"
                                className="border rounded w-full py-2 px-3"
                                value={values.additionalInfo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            ></textarea>
                            {errors.additionalInfo && touched.additionalInfo && (
                                <p className='text-red-600'>{errors.additionalInfo}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        {/* <button
                            type="submit"
                            className=""
                        >
                            Submit
                        </button> */}
                        <button className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700' type='submit'>
                            Submit
                        </button>
                    </div>

                </form>
            </div>
        </div>

    )
}

export default Report