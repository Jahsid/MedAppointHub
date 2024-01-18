import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../../Redux/UserSlice/UserSlice';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRightToBracket, faUser, faUserDoctor, faBell, faCalendarCheck, faStethoscope, faComment } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const Header = () => {
  const { user } = useSelector((state) => state.reducer.userReducer);
  const photo = user ? user.photo : null;
  let token = localStorage.getItem('usertoken');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
    });
    Toast.fire({
      icon: 'info',
      title: 'Logged out successfully'
    });

    localStorage.removeItem('usertoken');
    dispatch(userLogout({
      user: ''
    }));
    navigate('/');
  };

  return (
    <div className='navbar bg-white text-black  ' >
      <div className='navbar-start'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-ghost lg:hidden'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' /></svg>
          </label>

          {
            token ?
              (
                <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52'>
                  <li><Link to='/'>HOME <FontAwesomeIcon icon={faHouse} /></Link></li>
                  <li><Link to='/doctorlist'>DOCTORS <FontAwesomeIcon icon={faUserDoctor} /></Link></li>
                  <li><Link to='/appointments'>APPOINTMENTS <FontAwesomeIcon icon={faCalendarCheck} /></Link></li>
                  <li><Link to='/chatuser'>CHATS<FontAwesomeIcon icon={faComment} /></Link></li>
                </ul>) : (
                <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>
                  <li><Link to='/'>HOME<FontAwesomeIcon icon={faHouse} /></Link></li>
                  <li><Link to='/login'>LOGIN <FontAwesomeIcon icon={faRightToBracket} /></Link></li>
                </ul>
              )
          }

        </div>

        <Link to={'/'} className='btn btn-ghost normal-case text-xl'>MedAppointHub <FontAwesomeIcon icon={faStethoscope} /></Link>

      </div>

      {token ? (
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>
            <li><Link to='/'>HOME <FontAwesomeIcon icon={faHouse} /></Link></li>
            <li><Link to='/doctorlist'>DOCTORS <FontAwesomeIcon icon={faUserDoctor} /></Link></li>
            <li><Link to='/appointments'>APPOINTMENTS <FontAwesomeIcon icon={faCalendarCheck} /></Link></li>
          </ul>
        </div>

      ) : (<div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <li><Link to='/'>HOME<FontAwesomeIcon icon={faHouse} /></Link></li>
          <li><Link to='/login'>LOGIN <FontAwesomeIcon icon={faRightToBracket} /></Link></li>
        </ul>
      </div>)
      }

      {
        token ? (
          <div className='navbar-end '>
            <div className='hidden lg:flex'>
              <Link to='/notifications'>
                <button
                  className="overflow-hidden me-10 mt-1  w-32 p-2 h-10 bg-black text-white border-none rounded-2xl font-bold cursor-pointer relative z-10 group"
                >
                  Notifications
                  <span
                    className="absolute w-36 h-32 -top-8 -left-2 bg-sky-200 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right"
                  ></span>
                  <span
                    className="absolute w-36 h-32 -top-8 -left-2 bg-sky-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-right"
                  ></span>
                  <span
                    className="absolute w-36 h-32 -top-8 -left-2 bg-sky-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right"
                  ></span>
                  <span
                    className="group-hover:opacity-100 group-hover:duration-1000  duration-100 opacity-0 absolute top-2.5 left-6 z-10"
                  ><FontAwesomeIcon className='mx-8' icon={faBell} />
                  </span>

                </button>
              </Link>
              <Link to='/chatuser' className='me-5 text-sm'  >
                <div className="group relative">
                  <button>
                    <svg
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      height="44"
                      width="44"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 hover:scale-125 duration-200 hover:stroke-blue-500"
                      fill="none"
                    >
                      <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
                      <path d="M8 9h8"></path>
                      <path d="M8 13h6"></path>
                      <path
                        d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </Link>
            </div>
            <div className='dropdown dropdown-end'>
              <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
                <div className="w-24  rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={photo} alt="profile" />
                </div>
              </label>
              <ul tabIndex={0} className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52'>
                <li><Link to='/profile'>Profile</Link></li>
                <li><a onClick={handleLogout}>Logout</a></li>
              </ul>
            </div>
          </div >
        ) : (
          <div className='navbar-end'>
            <div className='dropdown dropdown-end'>
              <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
                <div className='w-10 rounded-full'>
                  <img src='icon.jpg' />
                </div>
              </label>
              <ul tabIndex={0} className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52'>
                <li><Link to='/'>Home<FontAwesomeIcon icon={faHouse} /></Link></li>
                <li><Link to='/login'>Login <FontAwesomeIcon icon={faRightToBracket} /></Link></li>
              </ul>
            </div>
          </div>
        )
      }

    </div >
  );
};

export default Header;