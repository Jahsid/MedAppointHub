import React from 'react';
import { Routes, Route } from 'react-router-dom';

import DoctorSide from '../../Pages/DoctorPages/DoctorSide/DoctorSide';
import SignupPage from '../../Pages/DoctorPages/SignupPage/SignupPage';
import LoginPage from '../../Pages/DoctorPages/LoginPage/LoginPage';
import DoctorOtp from '../../Pages/DoctorPages/DoctorOtp/DoctorOtp';
import Dashboard from '../../Pages/DoctorPages/Dashboard/Dashboard';
import DoctorProtect from './DoctorProtect';
import DoctorPublic from './DoctorPublic';
import DoctorProfile from '../../Pages/DoctorPages/DoctorProfile/DoctorProfile';
import DoctorSlotsPage from '../../Pages/DoctorPages/DoctorSlotsPage/DoctorSlotsPage';
import AppointmentPage from '../../Pages/DoctorPages/AppointmentPage/AppointmentPage';
import ChatPage from '../../Pages/DoctorPages/ChatPage/ChatPage';
import VideoPage from '../../Pages/DoctorPages/VideoPage/VideoPage'
import PrescriptionPage from '../../Pages/DoctorPages/PrescriptionPage/PrescriptionPage';
import ForgotPassword from '../../Pages/DoctorPages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../Pages/DoctorPages/ResetPassword/ResetPassword';
import MedicalReport from '../../Pages/DoctorPages/MedicalReport/MedicalReport';
import Error404 from '../../Components/Error/404'
import Error500 from '../../Components/Error/500'
import ReviewPage from '../../Pages/DoctorPages/ReviewPage/ReviewPage';

const DoctorRoute = () => {
    return (
        <Routes>
            <Route path='/doctorside' element={<DoctorPublic><DoctorSide /></DoctorPublic>} />
            <Route path='/signup' element={<DoctorPublic><SignupPage /></DoctorPublic>} />
            <Route path='/login' element={<DoctorPublic><LoginPage /></DoctorPublic>} />
            <Route path='/forgotpassword' element={<DoctorPublic><ForgotPassword /></DoctorPublic>} />
            <Route path='/resetpassword/:id/:token' element={<DoctorPublic><ResetPassword /></DoctorPublic>} />
            <Route path='/doctorotp' element={<DoctorPublic><DoctorOtp /></DoctorPublic>} />
            <Route path='/dashboard' element={<DoctorProtect><Dashboard /></DoctorProtect>} />
            <Route path='/doctorprofile' element={<DoctorProtect><DoctorProfile /></DoctorProtect>} />
            <Route path='/slots' element={<DoctorProtect><DoctorSlotsPage /></DoctorProtect>} />
            <Route path='/appointment' element={<DoctorProtect><AppointmentPage /></DoctorProtect>} />
            <Route path='/chatpagedoctor' element={<DoctorProtect><ChatPage /></DoctorProtect>} />
            <Route path='/video' element={<DoctorProtect><VideoPage /></DoctorProtect>} />
            <Route path='/priscription' element={<DoctorProtect><PrescriptionPage /></DoctorProtect>} />
            <Route path='/medicalreport' element={<DoctorProtect><MedicalReport /></DoctorProtect>} />
            <Route path="*" element={<Error404 />} />
            <Route path="/pageNotFound" element={<Error404 />} />
            <Route path="/internalError" element={<Error500 />} />
            <Route path='/reviews' element={<DoctorProtect><ReviewPage /></DoctorProtect>} />
        </Routes >
    );
};
export default DoctorRoute;