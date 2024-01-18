import React from 'react';
import Header from '../../../Components/AdminComponents/Header/Header';
import SideNav from '../../../Components/AdminComponents/SideNav/SideNav';
import Footer from '../../../Components/AdminComponents/Footer/Footer';
import AppointmentList from '../../../Components/AdminComponents/AppointmentList/AppointmentList';

const Appointment = () => {



    return (
        <>
            <Header />
            <div className='flex'>
                <SideNav />
                <AppointmentList />
            </div>
            <Footer />
        </>
    );
};

export default Appointment;
