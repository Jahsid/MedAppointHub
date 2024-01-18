import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartSimple,
  faCalendarCheck,
  faUser,
  faUserDoctor,
  faCheck,
  faHospital,

} from '@fortawesome/free-solid-svg-icons';


const SideNav = () => {
  return (
    <div className='bg-gray-800 text-white min-h-screen w-full sm:w-1/2 md:w-1/4 p-4'>
      <ul className='list-none p-0'>
        <li className='mb-2 hover:bg-gray-700 p-2 rounded'>
          <Link to={'/admin/dashboard'}> <div><span className='mx-5'><FontAwesomeIcon icon={faChartSimple} /></span>  DASHBOARD</div></Link>
        </li>
        <li className='mb-2 hover:bg-gray-700 p-2 rounded'>
          <Link to={'/admin/appointments'}><div><span className='mx-5'><FontAwesomeIcon icon={faCalendarCheck} /></span>  APPOINTMENTS</div></Link>
        </li>
        <li className='mb-2 hover:bg-gray-700 p-2 rounded'>
          <Link to={'/admin/userlist'}><div><span className='mx-5'><FontAwesomeIcon icon={faUser} /></span> USERS LIST</div></Link>
        </li>
        <li className='mb-2 hover:bg-gray-700 p-2 rounded'>
          <Link to={'/admin/doctorlist'}><div><span className='mx-5'><FontAwesomeIcon icon={faUserDoctor} /></span> DOCTORS LIST</div></Link>
        </li>
        <li className='mb-2 hover:bg-gray-700 p-2 rounded'>
          <Link to={'/admin/verifydoctors'}><div><span className='mx-5'><FontAwesomeIcon icon={faCheck} /></span> VERIFY DOCTORS</div></Link>
        </li>
        <li className='mb-2 hover:bg-gray-700 p-2 rounded'>
          <Link to={'/admin/speciality'} ><div><span className='mx-5'> <FontAwesomeIcon icon={faHospital} /> </span> SPECIALITIES</div></Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
