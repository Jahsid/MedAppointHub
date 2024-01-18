import React from 'react';
import { Route, Routes } from 'react-router-dom';

import LoginPage from '../../Pages/AdminPages/LoginPage/LoginPage';
import Dashboard from '../../Pages/AdminPages/Dashboard/Dashboard';
import UserListPage from '../../Pages/AdminPages/UserListPage/UserListPage';
import DoctorListPage from '../../Pages/AdminPages/DoctorListPage/DoctorListPage';
import VerifyDoctor from '../../Pages/AdminPages/VerifyDoctor/VerifyDoctor';
import DoctorDetailsPage from '../../Pages/AdminPages/DoctorDetailsPage/DoctorDetailsPage';
import Appointment from '../../Pages/AdminPages/Appointment/Appointment';
import VerifyDetailsPage from '../../Pages/AdminPages/VerifyDetailsPage/verifyDetailsPage';
import Speciality from '../../Pages/AdminPages/Speciality/Speciality';
import Error404 from '../../Components/Error/404'
import Error500 from '../../Components/Error/500'

import AdminProtect from './AdminProtect';
import AdminPublic from './AdminPublic';


const AdminRoute = () => {
  return (
    <Routes>
      <Route path='/adminlogin' element={<AdminPublic><LoginPage /></AdminPublic>} />
      <Route path='/dashboard' element={<AdminProtect><Dashboard /></AdminProtect>} />
      <Route path='/userlist' element={<AdminProtect><UserListPage /></AdminProtect>} />
      <Route path='/doctorlist' element={<AdminProtect><DoctorListPage /></AdminProtect>} />
      <Route path='/verifydoctors' element={<AdminProtect><VerifyDoctor /></AdminProtect>} />
      <Route path='/appointments' element={<AdminProtect><Appointment /></AdminProtect>} />
      <Route path='/doctordetails/:id' element={<AdminProtect><DoctorDetailsPage /></AdminProtect>} />
      <Route path='/verifiedDetails/:id' element={<AdminProtect><VerifyDetailsPage /></AdminProtect>} />
      <Route path='/speciality' element={<AdminProtect><Speciality /></AdminProtect>} />
      <Route path="*" element={<Error404 />} />
      <Route path="/pageNotFound" element={<Error404 />} />
      <Route path="/internalError" element={<Error500 />} />

    </Routes>

  );
};

export default AdminRoute;