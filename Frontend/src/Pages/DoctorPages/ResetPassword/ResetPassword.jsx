import React from 'react';
import Header from '../../../Components/DoctorComponents/Header/Header';
import Footer from '../../../Components/DoctorComponents/Footer/Footer';
import { Link, useParams, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { useFormik } from "formik";
import { doctorResetPassword } from '../../../Api/doctorApi';
import Swal from 'sweetalert2';
import 'animate.css';

const ResetPassword = () => {
    const { id, token } = useParams();
    const navigate = useNavigate();
    const formSchema = yup.object().shape({
        password: yup
            .string(),

        cpassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Password must match")
            .required("Required"),
    });

    const onSubmit = async () => {
        try {
            const res = await doctorResetPassword(id, token, values.password);
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
                navigate("/doctor/login");
            }
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: error?.response?.data?.status,
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
        }
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: {
                password: "",
                cpassword: "",
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
                            <h1 className='text-5xl font-bold'>Reset Password</h1>
                        </div>
                        <div className='card flex-shrink-0 w-full max-w-5xl shadow-2xl bg-base-100'>
                            <form className='card-body' onSubmit={handleSubmit}>
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>New Password</span>
                                    </label>
                                    <input
                                        type='password'
                                        placeholder='new password'
                                        className='input input-bordered w-96'
                                        required
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                    />
                                    {errors.password && touched.password && (
                                        <p className="text-red-600">{errors.password}</p>
                                    )}
                                </div>
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>Confirm Password</span>
                                    </label>
                                    <input
                                        type='password'
                                        placeholder='confirm password'
                                        className='input input-bordered w-96'
                                        required
                                        name="cpassword"
                                        value={values.cpassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.cpassword && touched.cpassword && (
                                        <p className="text-red-600">{errors.cpassword}</p>
                                    )}
                                </div>
                                <div className='form-control mt-6'>
                                    <button className='btn btn-primary'>Reset Password</button>
                                </div>
                                <div>
                                    <br />
                                    Remember your password?{' '}
                                    <Link to={'/login'} className='font-medium text-orange-900'>
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

export default ResetPassword;
