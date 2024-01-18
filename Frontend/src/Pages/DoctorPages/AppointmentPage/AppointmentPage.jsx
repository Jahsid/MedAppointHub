import React from 'react';
import Header from '../../../Components/DoctorComponents/Header/Header';
import Footer from '../../../Components/DoctorComponents/Footer/Footer';
import AppointmentList from '../../../Components/DoctorComponents/AppointmentList/AppointmentList';

const AppointmentPage = () => {
  return (
    <div>
        <Header/>
        <div className='min-h-screen bg-blue-50'>
        <AppointmentList/>

        </div>
        <Footer/>
    </div>
  );
};

export default AppointmentPage;