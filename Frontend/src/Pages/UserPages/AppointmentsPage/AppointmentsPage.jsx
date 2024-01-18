import React from 'react';
import Header from '../../../Components/UserComponents/Header/Header';
import Footer from '../../../Components/UserComponents/Footer/Footer';
import AppointmentList from '../../../Components/UserComponents/AppointmentList/AppointmentList';

const AppointmentsPage = () => {
    return (
        <div>

            <Header />
            <div className='min-h-screen bg-white flex justify-center'>
                <AppointmentList />
            </div>
            <Footer />

        </div >
    );
};

export default AppointmentsPage;