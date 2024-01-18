import React from 'react';
import Header from '../../../Components/DoctorComponents/Header/Header';
import Footer from '../../../Components/DoctorComponents/Footer/Footer';
import { Link } from 'react-router-dom';
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { doctorForgetPassword } from '../../../Api/doctorApi';
import Swal from 'sweetalert2';
import 'animate.css';


const ForgotPassword = () => {
    const navigate = useNavigate()
    const formSchema = yup.object().shape({
        email: yup
            .string()
            .email("Please enter a valid email")
            .required("Required"),
    });

    const onSubmit = async () => {
        try {
            const res = await doctorForgetPassword(values.email);
            if (res?.status === 200) {
                Swal.fire({
                    title: res?.data?.message,
                    showClass: {
                        popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
                    },
                    hideClass: {
                        popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
                    }
                });
                navigate("/login");
            }
        } catch (error) {
            console.log(error.message);
            // toast.error(error.response?.data?.message);
        }
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: {
                email: "",
            },
            validationSchema: formSchema,
            onSubmit,
        });
    return (
        <>
            <Header />
            <div>
                <div className='hero min-h-screen bg-teal-700'>
                    <div className='hero-content flex-col lg:flex-col'>
                        <div className='text-center lg:text-left'>
                            <h1 className='text-5xl font-bold'>Forgot Password?</h1>
                        </div>
                        <div className='card flex-shrink-0 w-full max-w-5xl shadow-2xl bg-base-100'>
                            <form onSubmit={handleSubmit} className='card-body'>
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        className='input input-bordered w-96'
                                    />
                                    {errors.email && touched.email && (
                                        <p className="text-red-600">{errors.email}</p>
                                    )}
                                </div>
                                <div className='form-control mt-6'>
                                    <button className='btn btn-primary'>Reset Password</button>
                                </div>
                                <div>
                                    <br />
                                    Remember your password?{' '}
                                    <Link to={'/doctor/login'} className='font-medium text-orange-900'>
                                        Login
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ForgotPassword;
