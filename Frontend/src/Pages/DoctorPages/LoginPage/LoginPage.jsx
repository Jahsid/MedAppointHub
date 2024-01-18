import React from 'react';
import doctorsignup from '../../../Assets/image/doctorsignup.jpg';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSchema } from '../../../validations/doctor/loginValidation';
import { doctorLogin } from '../../../Api/doctorApi';
import { setDoctor } from '../../../Redux/DoctorSlice/DoctorSlice';


const LoginPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const response = await doctorLogin(values);
      if (response?.status === 200) {
        localStorage.setItem('doctortoken', response?.data?.doctortoken);
        const doctorData = response?.data?.doctorData;

        dispatch(
          setDoctor({
            doctor: doctorData
          })
        );

        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
        });

        Toast.fire({
          icon: 'success',
          title: 'Logged in successfully',
        });

        navigate('/doctor/dashboard');
      }
    } catch (error) {

      console.log(error.message);

    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit
  });



  return (
    <>
      <div className='hero min-h-screen bg-base-200' style={{ backgroundImage: `url(${doctorsignup})` }}>
        <div className='hero-overlay bg-opacity-60'></div>
        <div className='hero-content flex-col lg:flex-row-reverse items-center lg:items-start'>
          <div className='card flex-shrink-0 w-96 max-w-sm shadow-2xl bg-base-100'>
            <div>
              <br />

              <h1 className='text-xl font-bold text-center'>DOCTOR LOGIN</h1>
            </div>
            <form className='card-body' onSubmit={handleSubmit}>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  className='input input-bordered w-full'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && <p className='text-red-600'>{errors.email}</p>}
              </div>
              <div className='form-control mt-4'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  className='input input-bordered w-full'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && <p className='text-red-600'>{errors.password}</p>}
                <label className='label mt-2'>
                  <a href='/doctor/forgotpassword' className='label-text-alt link link-hover'>Forgot password?</a>
                </label>
              </div>
              <div className='form-control mt-6'>
                <button type='submit' className='btn btn-primary w-full'>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>


  );
};

export default LoginPage;