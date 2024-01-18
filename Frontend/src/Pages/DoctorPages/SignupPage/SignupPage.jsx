import React, { useState, useEffect } from 'react';
import doctorsignup from '../../../Assets/image/doctorsignup.jpg';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { doctorSchema } from '../../../validations/doctor/signupValidation';
import { doctorSignup } from '../../../Api/doctorApi';
import { specialityName } from '../../../Api/doctorApi';
import Loading from "../../../Components/Loading/Loading";

const SignupPage = () => {
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);
    const [certificates, setCertificates] = useState([]);
    const [speciality, setSpeciality] = useState();
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        try {
            setLoading(true);
            const response = await doctorSignup({ ...values, photo, certificates });
            setLoading(false);

            const { doctorData, otpId } = response?.data;
            if (response?.data?.status) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 5000,
                });

                Toast.fire({
                    icon: 'info',
                    title: 'Enter the OTP',
                });
                navigate('/doctor/doctorotp', {
                    state: { doctorId: doctorData._id, otpId: otpId }
                });
            }

        } catch (error) {
            console.log(error.message);
        }
    };

    const handlePhotoChange = (e) => {
        const selectedPhoto = e.target.files[0];
        setPhotoToBase(selectedPhoto);
    };

    const setPhotoToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPhoto(reader.result);
        };
    };

    const handleCertificatesChange = (e) => {
        const selectedCertificates = e.target.files;
        setCertificatesToBase(selectedCertificates);
    };

    const setCertificatesToBase = async (files) => {
        const certificatesArray = [];

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onloadend = () => {
                certificatesArray.push(reader.result);
                setCertificates([...certificatesArray]);
            };
        }
    };


    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            name: '',
            mobile: '',
            email: '',
            speciality: '',
            password1: '',
            password2: '',
        },
        validationSchema: doctorSchema,
        onSubmit

    });

    useEffect(() => {
        specialityName().then((res) => {
            setSpeciality(res?.data?.data);
        }).catch((error) => {
            console.log(error.message);
        });

    }, []);


    return (
        <>
            {loading ? (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="spinnerouter">
                        <Loading />
                    </div>
                </div>
            ) : (
                <div className='hero min-h-screen bg-base-200' style={{ backgroundImage: `url(${doctorsignup})` }}>
                    <div className='hero-overlay bg-opacity-60'></div>
                    <div className='hero-content flex-col lg:flex-row-reverse'>
                        <div className='text-center lg:text-left'>
                            <h1 className='text-5xl font-bold'>Signup now!
                            </h1>
                            <p className='py-6'>Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        </div>
                        <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
                            <form className='card-body' onSubmit={handleSubmit}>
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>Name</span>
                                    </label>
                                    <input
                                        name='name'
                                        type='text'
                                        placeholder='name'
                                        className='input input-bordered'
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.name && touched.name && <p className='text-red-600'>{errors.name}</p>}
                                </div>

                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>Number</span>
                                    </label>
                                    <input
                                        name='mobile'
                                        type='text'
                                        placeholder='mobile'
                                        className='input input-bordered'
                                        value={values.mobile}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.mobile && touched.mobile && <p className='text-red-600'>{errors.mobile}</p>}
                                </div>

                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>Email</span>
                                    </label>
                                    <input
                                        name='email'
                                        type='email'
                                        placeholder='email'
                                        className='input input-bordered'
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.email && touched.email && <p className='text-red-600'>{errors.email}</p>}
                                </div>

                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>Speciality</span>
                                    </label>
                                    <select
                                        name='speciality'
                                        className='input input-bordered'
                                        value={values.speciality}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <option value='' disabled>Select a speciality</option>
                                        {speciality && speciality.map((speciality) => (
                                            <option key={speciality.id} value={speciality.speciality}>
                                                {speciality.speciality}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.speciality && touched.speciality && <p className='text-red-600'>{errors.speciality}</p>}
                                </div>

                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>Password</span>
                                    </label>
                                    <input
                                        name='password1'
                                        type='password'
                                        placeholder='password'
                                        className='input input-bordered'
                                        value={values.password1}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.password1 && touched.password1 && <p className='text-red-600'>{errors.password1}</p>}
                                </div>

                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>Password again</span>
                                    </label>
                                    <input
                                        name='password2'
                                        type='password'
                                        placeholder='password again'
                                        className='input input-bordered'
                                        value={values.password2}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.password2 && touched.password2 && <p className='text-red-600'>{errors.password2}</p>}
                                </div>

                                <div>
                                    <label className='label'>
                                        <span className='label-text'>Upload your photo</span>
                                    </label>
                                    <input
                                        type='file'
                                        className='file-input file-input-bordered file-input-primary w-full max-w-xs'
                                        onChange={handlePhotoChange}
                                        accept='image/*'
                                        required
                                    />
                                </div>

                                <div>
                                    <label className='label'>
                                        <span className='label-text'>Upload your certificates</span>
                                    </label>
                                    <input
                                        type='file'
                                        className='file-input file-input-bordered file-input-info w-full max-w-xs'
                                        onChange={handleCertificatesChange}
                                        multiple
                                        required
                                    />
                                </div>

                                <div className='form-control mt-6'>
                                    <button type='submit' className='btn btn-outline btn-accent'>
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            )}

        </>
    );
};

export default SignupPage;