import React from 'react';
import doctorsignup from '../../../Assets/image/doctorsignup.jpg';
import { Link } from 'react-router-dom';

const DoctorSide = () => {
  return (
    <div className='hero min-h-screen' style={{ backgroundImage: `url(${doctorsignup})` }}>
      <div className='hero-overlay bg-opacity-60'></div>
      <div className='hero-content text-center text-neutral-content'>
        <div className='max-w-md'>
          <h1 className='mb-5 text-5xl font-bold'>Hello Doctor</h1>
          <p className='mb-5'>
            Welcome, doctors! Your dedication to healthcare is commendable. Join our community to connect with peers, access resources, and enhance your medical journey. Already a member? Log in or sign up to make a positive impact on people's lives.
          </p>
          <Link to='/doctor/login' className='btn btn-secondary w-56'>Login</Link>
          <br />
          <br />
          <Link to='/doctor/signup' className='btn btn-accent w-56' >Signup</Link>
          <br />
          <br />
          <Link to='/' className='btn btn-primary w-56' >HOME</Link>

          <div>
            <br />
            <h1></h1>
          </div>

        </div>

      </div>

    </div>
  );
};

export default DoctorSide;