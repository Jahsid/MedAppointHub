
import React, { useEffect, useState } from 'react';
import Header from '../../../Components/UserComponents/Header/Header';
import Footer from '../../../Components/UserComponents/Footer/Footer';
import { useSelector } from 'react-redux';
import { getUserDetails, setDetails } from '../../../Api/userApi';
import { useFormik } from 'formik';
import { editSchema } from '../../../validations/user/editValidaton';
import Swal from 'sweetalert2';
import { Button, Modal } from 'flowbite-react';
import './Profile.css'
import Loading from "../../../Components/Loading/Loading";
import { editPhoto } from '../../../Api/userApi';


const Profile = () => {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.reducer.userReducer);
  const _id = user ? user._id : null;
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [img, setImg] = useState(null)
  const [render, setRender] = useState(false)
  const [change, setChange] = useState(false)


  const onSubmit = async () => {
    try {
      setOpenModalEdit(false)
      const response = await setDetails({ ...values, _id, img });
      setUserData(response?.data?.user);
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        didOpen: (toast) => {
        }
      });
      Toast.fire({
        icon: "success",
        title: response?.data?.message
      });

      closeModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    getUserDetails(_id)
      .then((response) => {
        setLoading(false);
        setUserData(response?.data?.user);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
      });
  }, [setUserData, img, render]);

  const { name, email, mobile, age, gender, photo, wallet } = userData || {};
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: name,
      mobile: mobile,
      age: age,
      gender: gender
    },
    validationSchema: editSchema,
    onSubmit,
    enableReinitialize: true
  });

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhotoToBase(selectedPhoto);
  };


  const setPhotoToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImg(reader.result);
      setChange(true)
    };
  };

  useEffect(() => {
    let debounceTimer;

    if (change) {
      // Debounce time set to 500 milliseconds (adjust as needed)
      debounceTimer = setTimeout(() => {
        async function edit() {
          const res = await editPhoto({ img, _id });
          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            didOpen: (toast) => { }
          });
          Toast.fire({
            icon: "success",
            title: res?.data?.message
          });
          if (render) {
            setRender(false);
          } else {
            setRender(true);
          }
        }
        edit();
      }, 500);
    }

    // Cleanup the timer when the component unmounts or when change is false
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [change, img, _id]);




  return (
    <div className='bg-blue-50'>
      <Header />
      <div className='min-h-screen bg-blue-50'>

        {
          loading ? (
            <div className="fixed inset-0 flex items-center justify-center min-h-screen">
              <div className="spinnerouter">
                <Loading />
              </div>
            </div>
          ) : (
            <div className='min-h-screen'>
              <div className='min-h-screen bg-blue-50 flex items-center justify-center'>
                <div className='bg-white p-8 rounded-lg shadow-2xl w-full md:w-[700px]'>
                  <div className="button-borders">
                    <div className="primary-button">
                      <h1 className='text-center'>
                        PROFILE
                      </h1>
                    </div>
                  </div>
                  <br />
                  <div className='flex flex-col md:flex-row items-center justify-center md:justify-start'>
                    <div className='h-24 w-24  bg-blue-500 rounded-full overflow-hidden border mb-4 md:mb-0 md:mr-4'>
                      <label htmlFor='fileInput'>
                        <input
                          type='file'
                          id='fileInput'
                          accept='image/*'
                          style={{ display: 'none' }}
                          onChange={handlePhotoChange}
                        />
                        <img
                          className='h-full w-full object-cover'
                          src={photo ? photo : 'icon.jpg'}
                          alt='Profile'
                        />
                      </label>
                    </div>
                    <div>
                      <h1 className='text-2xl font-semibold text-gray-800'>{name}</h1>
                      <p className='text-sm text-gray-500'>{email}</p>
                    </div>
                  </div>
                  <hr className='my-4' />
                  <div className='mb-4'>
                    <p className='text-sm font-semibold text-gray-600'>Mobile:</p>
                    <p className='text-sm text-gray-800'>{mobile ? mobile : 'Not added'}</p>
                  </div>
                  <div className='mb-4'>
                    <p className='text-sm font-semibold text-gray-600'>Age:</p>
                    <p className='text-sm text-gray-800'>{age ? age : 'Not added'}</p>
                  </div>
                  <div className='mb-4'>
                    <p className='text-sm font-semibold text-gray-600'>Gender:</p>
                    <p className='text-sm text-gray-800'>{gender ? gender : 'Not added'}</p>
                  </div>

                  <div className='flex flex-col md:flex-row items-center justify-center md:justify-between space-y-4 md:space-y-0 md:space-x-4'>
                    <button
                      onClick={() => setOpenModalEdit(true)}
                      className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setOpenModal(true)}
                      className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
                    >
                      Wallet
                    </button>
                    {/* <button className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
              Reports
            </button> */}


                  </div>
                </div>
              </div>


              <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Wallet</Modal.Header>
                <Modal.Body className='flex justify-center'>
                  <div className="cardx wallet ">
                    <div className="overlay"></div>
                    <div className="circle">
                      <svg xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="23 29 78 60" height="60px" width="78px">
                        <defs></defs>
                        <g transform="translate(23.000000, 29.500000)" fillRule="evenodd" fill="none" strokeWidth="1" stroke="none" id="icon">
                          <rect rx="4.70247832" height="21.8788565" width="9.40495664" y="26.0333433" x="67.8357511" fill="#AC8BE9" id="Rectangle-3"></rect>
                          <rect rx="4.70247832" height="10.962961" width="9.40495664" y="38.776399" x="67.8357511" fill="#6A5297" id="Rectangle-3"></rect>
                          <polygon points="57.3086772 0 67.1649301 26.3776902 14.4413177 45.0699507 4.58506484 18.6922605" fill="#6A5297" id="Rectangle-2"></polygon>
                          <path fill="#8B6FC0" id="Rectangle" d="M0,19.6104296 C0,16.2921718 2.68622235,13.6021923 5.99495032,13.6021923 L67.6438591,13.6021923 C70.9547788,13.6021923 73.6388095,16.2865506 73.6388095,19.6104296 L73.6388095,52.6639057 C73.6388095,55.9821635 70.9525871,58.672143 67.6438591,58.672143 L5.99495032,58.672143 C2.68403068,58.672143 0,55.9877847 0,52.6639057 L0,19.6104296 Z"></path>
                          <path fill="#F6F1FF" id="Fill-12" d="M47.5173769,27.0835169 C45.0052827,24.5377699 40.9347162,24.5377699 38.422622,27.0835169 L36.9065677,28.6198808 L35.3905134,27.0835169 C32.8799903,24.5377699 28.8078527,24.5377699 26.2957585,27.0835169 C23.7852354,29.6292639 23.7852354,33.7559532 26.2957585,36.3001081 L36.9065677,47.0530632 L47.5173769,36.3001081 C50.029471,33.7559532 50.029471,29.6292639 47.5173769,27.0835169"></path>
                          <rect height="12.863158" width="15.6082259" y="26.1162588" x="58.0305835" fill="#AC8BE9" id="Rectangle-4"></rect>
                          <ellipse ry="2.23319575" rx="2.20116007" cy="33.0919007" cx="65.8346965" fill="#FFFFFF" id="Oval"></ellipse>
                        </g>
                      </svg>
                    </div>
                    <p>Wallet</p>
                    <p className='text-black'>Credits :  <span className='text-green-500'>  ₹{wallet}</span> </p>
                  </div>


                </Modal.Body>
                <Modal.Footer>
                  {/* <p>History</p> */}
                  <div>

                  </div>

                </Modal.Footer>
              </Modal>

              {/* edit--------------------------------------------------------------------------------------------------------- */}

              <Modal show={openModalEdit} onClose={() => setOpenModalEdit(false)}>
                <Modal.Header>Edit Profile</Modal.Header>
                <Modal.Body>
                  <form onSubmit={handleSubmit} >
                    <div className="mb-4">
                      <label htmlFor="username" className="block text-gray-600">Username:</label>
                      <input
                        className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
                        name='name'
                        type="text"
                        placeholder="Type name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.name && touched.name && (
                        <p className="text-red-600 mt-2">{errors.name}</p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="mobile" className="block text-gray-600">Mobile:</label>
                      <input
                        className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
                        name='mobile'
                        type="text"
                        placeholder="Type number"
                        value={values.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.mobile && touched.mobile && (
                        <p className="text-red-600 mt-2">{errors.mobile}</p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="age" className="block text-gray-600">Age:</label>
                      <input
                        className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
                        type="text"
                        name="age"
                        placeholder='Age'
                        value={values.age}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.age && touched.age && (
                        <p className="text-red-600 mt-2">{errors.age}</p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="gender" className="block text-gray-600">Gender:</label>
                      <select
                        className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
                        id="gender"
                        name="gender"
                        value={values.gender}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="" disabled>Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      {errors.gender && touched.gender && (
                        <p className="text-red-600 mt-2">{errors.gender}</p>
                      )}
                    </div>

                    <div className="flex justify-end space-x-4 mt-8">
                      <Button type="submit" className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">Save changes</Button>
                      <Button className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#ff3434] before:to-[rgb(255,44,44)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]" onClick={() => setOpenModalEdit(false)}>Decline</Button>
                    </div>
                  </form>

                </Modal.Body>
              </Modal>
            </div>
          )
        }
      </div>

      <Footer />

    </div >
  );
};

export default Profile;