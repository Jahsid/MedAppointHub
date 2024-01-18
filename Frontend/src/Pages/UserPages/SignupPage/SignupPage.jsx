import React, { useState } from 'react';
import Header from '../../../Components/UserComponents/Header/Header';
import Footer from '../../../Components/UserComponents/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { userSignup } from '../../../Api/userApi';
import { useFormik } from 'formik';
import { userSchema } from '../../../validations/user/signupValidation';
import Swal from 'sweetalert2';
import backgroundImage from '../../../Assets/image/loginImg.jpg';
import Loading from "../../../Components/Loading/Loading";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  async function onSubmit() {
    try {
      setLoading(true);
      const response = await userSignup({ ...values, photo });
      setLoading(false);
      const { userData, otpId } = response?.data;
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
        navigate('/userotp', {
          state: { userId: userData?._id, otpId: otpId }
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 5000,
        });

        Toast.fire({
          icon: 'error',
          title: 'Error',
        });
      }

    } catch (error) {
      console.log(error.message);
    }
  }
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


  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      password1: '',
      password2: '',

    },
    validationSchema: userSchema,
    onSubmit
  });

  return (
    <div>
      <Header />

      <div className='min-h-screen'>
        {
          loading ? (
            <div className="fixed inset-0 flex items-center justify-center min-h-screen">
              <div className="spinnerouter">
                <Loading />
              </div>
            </div>
          ) : (
            <div className='hero min-h-screen flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white h-screen' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
              <div className='card flex-shrink-0 w-full max-w-md shadow-2xl bg-transparent '>
                <div className='card-body'>
                  <div className='text-center lg:text-left'>
                    <h1 className='text-2xl font-bold'>Register now!</h1>
                  </div>

                  <form action='' onSubmit={handleSubmit} >
                    <div>
                      <input
                        name='name'
                        type='text'
                        placeholder='Enter name'
                        className='block  rounded-md border-0 py-1.5 text-white  shadow-sm ring-1 ring-inset ring-black placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input input-bordered w-full'
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div>
                        {errors.name && touched.name && (
                          <p className='text-red-600'>{errors.name}</p>
                        )}
                      </div>
                      <br />


                      <input
                        name='mobile'
                        type='text'
                        placeholder='Enter phone number'
                        className='block  rounded-md border-0 py-1.5 text-white  shadow-sm ring-1 ring-inset  ring-black placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input input-bordered w-full'
                        value={values.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div>
                        {errors.mobile && touched.mobile && (
                          <p className='text-red-600'>{errors.mobile}</p>
                        )}
                      </div>
                      <br />


                      <input
                        name='email'
                        type='email'
                        placeholder='Enter email'
                        className='block  rounded-md border-0 py-1.5 text-white  shadow-sm ring-1 ring-inset  ring-black placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input input-bordered w-full'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />


                      <div>
                        {errors.email && touched.email && (
                          <p className='text-red-600'>{errors.email}</p>
                        )}
                      </div>
                      <br />

                      <input
                        name='password1'
                        type='password'
                        placeholder='Enter password'
                        className='block  rounded-md border-0 py-1.5 text-white  shadow-sm ring-1 ring-inset  ring-black placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input input-bordered w-full'
                        value={values.password1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <div>
                        {errors.password1 && touched.password1 && (
                          <p className='text-red-600'>{errors.password1}</p>
                        )}

                      </div>
                      <br />

                      <input
                        name='password2'
                        type='password'
                        placeholder='Re-enter password'
                        className='block  rounded-md border-0 py-1.5 text-white  shadow-sm ring-1 ring-inset  ring-black placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input input-bordered w-full'
                        value={values.password2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div>
                        {errors.password2 && touched.password2 && (
                          <p className='text-red-600'>{errors.password2}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className='label'>
                        <span className='label-text'>Upload your photo</span>
                      </label>
                      <input
                        type='file'
                        className='file-input file-input-bordered file-input-primary w-full '
                        onChange={handlePhotoChange}
                        accept='image/*'
                      // required
                      />
                    </div>

                    <div className='form-control mt-6'>
                      <button className='btn btn-primary' type='submit'>
                        Signup
                      </button>
                    </div>
                    <br />

                    Already have an account?{' '}
                    <Link to={'/login'} className='font-medium text-orange-900'>
                      Login
                    </Link>
                  </form>

                </div>
              </div>
            </div>

          )
        }

      </div>

      <Footer />
    </div>
  );
};
export default SignupPage;