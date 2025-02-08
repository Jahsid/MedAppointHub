import React from 'react';
// import { useNavigate } from 'react-router-dom';
import banner from '../../../Assets/image/landing.jpg';
import Speciality from '../../../Components/UserComponents/Speciality/Speciality';
import { Link } from 'react-router-dom';


const Body = () => {

  // const navigate = useNavigate();
  let token = localStorage.getItem('usertoken');


  return (
    <div >
      {/* Banner */}
      <div className='banner relative w-full h-screen bg-white'>
        <img
          src={banner}
          alt='Banner'
          className='w-full h-full object-cover'
        />

        <div
          className='text-white text-3xl md:text-4xl lg:text-5xl absolute top-0 left-0 w-full h-full flex items-center justify-center'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
          <div className='row'>
            <div className='col-md-6'>
              <div className='card ' style={{ alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
                <div className='card-body'>
                  <h2 className='text-yellow-200'>How Doctor Consultation Works ?</h2>

                  {/* <h2 className='card-title text-green-500'>HOW TO CONSULT A DOCTOR ONLINE VIA TEXT/VIDEO?</h2> */}
                  <h2 className='card-title text-white'>1 . Select the speciality</h2>
                  <h2 className='card-title text-white'>2 . Choose the doctor</h2>
                  <h2 className='card-title text-white'>3 . Book a slot</h2>
                  <h2 className='card-title text-white'>4 . Make payment</h2>
                  <h2 className='card-title text-white'>5 . Be present on MedAppointHub at the time of the consultation. </h2>

                  <br />
                  {
                    token ? (
                      <Link to={'/doctorlist'}>

                        <button className="group w-full group-hover:before:duration-500 group-hover:after:duration-1000 after:duration-500 hover:border-sky-300  duration-500 before:duration-500 hover:duration-500 underline underline-offset-2    hover:after:-right-2 hover:before:top-8 hover:before:right-16 hover:after:scale-150 hover:after:blur-none hover:before:-bottom-8 hover:before:blur-none hover:bg-sky-300 hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-sky-900 relative bg-sky-800 h-16  border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-sky-400 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-cyan-600 after:right-8 after:top-3 after:rounded-full after:blur">
                          <p >Book Consultation Now</p>
                        </button>
                      </Link>

                    ) : (
                      <Link to={'/login'}>

                        <button className="group w-full group-hover:before:duration-500 group-hover:after:duration-1000 after:duration-500 hover:border-sky-300  duration-500 before:duration-500 hover:duration-500 underline underline-offset-2    hover:after:-right-2 hover:before:top-8 hover:before:right-16 hover:after:scale-150 hover:after:blur-none hover:before:-bottom-8 hover:before:blur-none hover:bg-sky-300 hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-sky-900 relative bg-sky-800 h-16  border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-sky-400 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-cyan-600 after:right-8 after:top-3 after:rounded-full after:blur">
                          <p >Book Consultation Now</p>
                        </button>
                      </Link>

                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className='bg-blue-50 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24'>
        <div className='mx-auto flex flex-wrap justify-center'>
          <div className='flex flex-col space-y-8 sm:space-y-0 sm:flex-row sm:space-x-8'>

            {/* Certified Doctors */}
            <div className='w-full sm:w-96 h-64 duration-500 group overflow-hidden relative rounded-2xl bg-neutral-800 text-neutral-50 p-4 flex flex-col justify-evenly'>
              <div className='absolute blur duration-500 group-hover:blur-none w-72 h-72 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-sky-900 right-1 -bottom-24'></div>
              <div className='absolute blur duration-500 group-hover:blur-none w-12 h-12 rounded-full group-hover:translate-x-12 group-hover:translate-y-2 bg-indigo-700 right-12 bottom-12'></div>
              <div className='absolute blur duration-500 group-hover:blur-none w-36 h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-indigo-800 right-1 -top-12'></div>
              <div className='absolute blur duration-500 group-hover:blur-none w-24 h-24 bg-sky-700 rounded-full group-hover:-translate-x-12'></div>
              <div className='z-10 flex flex-col justify-evenly w-full h-full'>
                <span className='text-2xl font-bold'>Certified Doctors</span>
                <p>We offer quality healthcare through our network of certified and experienced doctors.</p>
                <div className='flex justify-center'>
                  <img className='w-24 h-24' src='certified.svg' alt='' />
                </div>
              </div>
            </div>

            {/* 100% Confidential */}
            <div className='w-full sm:w-96 h-64 duration-500 group rounded-2xl overflow-hidden relative bg-neutral-800 text-neutral-50 p-4 flex flex-col justify-evenly'>
              <div className='absolute blur duration-500 group-hover:blur-none w-72 h-72 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-sky-900 right-1 -bottom-24'></div>
              <div className='absolute blur duration-500 group-hover:blur-none w-12 h-12 rounded-full group-hover:translate-x-12 group-hover:translate-y-2 bg-indigo-700 right-12 bottom-12'></div>
              <div className='absolute blur duration-500 group-hover:blur-none w-36 h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-indigo-800 right-1 -top-12'></div>
              <div className='absolute blur duration-500 group-hover:blur-none w-24 h-24 bg-sky-700 rounded-full group-hover:-translate-x-12'></div>
              <div className='z-10 flex flex-col justify-evenly w-full h-full'>
                <span className='text-2xl font-bold'>100% Confidential</span>
                <p>All advice & consultations are completely confidential. You can also delete chats whenever you want.</p>
                <div className='flex justify-center'>
                  <img className='w-24 h-24' src='confidential.svg' alt='' />
                </div>
              </div>
            </div>

            {/* Convenience */}
            <div className='w-full sm:w-96 h-64 duration-500 group overflow-hidden relative rounded-2xl bg-neutral-800 text-neutral-50 p-4 flex flex-col justify-evenly'>
              <div className='absolute blur duration-500 group-hover:blur-none w-72 h-72 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-sky-900 right-1 -bottom-24'></div>
              <div className='absolute blur duration-500 group-hover:blur-none w-12 h-12 rounded-full group-hover:translate-x-12 group-hover:translate-y-2 bg-indigo-700 right-12 bottom-12'></div>
              <div className='absolute blur duration-500 group-hover:blur-none w-36 h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-indigo-800 right-1 -top-12'></div>
              <div className='absolute blur duration-500 group-hover:blur-none w-24 h-24 bg-sky-700 rounded-full group-hover:-translate-x-12'></div>
              <div className='z-10 flex flex-col justify-evenly w-full h-full'>
                <span className='text-2xl font-bold'>Convenience</span>
                <p>Forget the hassle of long queues and rush hour. Seek expert opinion anytime, anywhere.</p>
                <div className='flex justify-center'>
                  <img className='w-24 h-24' src='convenience.svg' alt='' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Speciality />



      {/* to Doctors side*/}
      {
        token ? (
          <div>

          </div>
        ) : (
          <div className='bg-yellow-50 h-96 text-center p-8 shadow-lg'>
            <br />
            <h1 className='text-3xl font-bold text-green-500 mb-4'>Are you a Doctor?</h1>
            <p className='text-lg text-black mb-6'>Join our panel of specialists and connect with your patients from anywhere.</p>
            <Link to='/doctor/doctorside'>
              <button className="cursor-pointer relative group overflow-hidden m-10 border-2 px-8 py-2 border-green-500">
                <span className="font-bold text-white text-xl relative z-10 group-hover:text-green-500 duration-500">JOIN</span>
                <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:-translate-x-full h-full"></span>
                <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-x-full h-full"></span>
                <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
                <span className="absolute delay-300 top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-y-full h-full"></span>
              </button>
            </Link>
          </div>
        )
      }



    </div >
  );
};

export default Body;
