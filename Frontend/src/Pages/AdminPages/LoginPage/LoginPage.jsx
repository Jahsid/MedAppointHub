import React from 'react';
import { useFormik } from 'formik';
import { adminSchema } from '../../../validations/admin/adminValidaton';
import { adminLogin } from '../../../Api/adminApi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const response = await adminLogin(values);
      localStorage.setItem('admintoken', response.data.admintoken);

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

      navigate('/admin/dashboard');


    } catch (error) {

      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
      });

      Toast.fire({
        icon: 'error',
        title: 'Invalid username or password',
      });
      console.log(error.message);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: adminSchema,
    onSubmit
  });

  return (
    <>
      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold'>ADMIN</h1>
            <br />
            <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
              <form className='card-body' onSubmit={handleSubmit}>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Username</span>
                  </label>
                  <input
                    type='text'
                    name='username'
                    placeholder='username'
                    className='input input-bordered'
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.username && touched.username && <p className='text-red-600'>{errors.username}</p>}
                </div>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Password</span>
                  </label>
                  <input
                    type='password'
                    name='password'
                    placeholder='password'
                    className='input input-bordered'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && <p className='text-red-600'>{errors.password}</p>}

                </div>
                <div className='form-control mt-6'>
                  <button type='submit' className='btn btn-primary'>
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;