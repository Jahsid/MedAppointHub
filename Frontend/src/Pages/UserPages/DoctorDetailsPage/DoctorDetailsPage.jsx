import React from 'react';
import Header from '../../../Components/UserComponents/Header/Header';
import Footer from '../../../Components/UserComponents/Footer/Footer';
import DoctorDetails from '../../../Components/UserComponents/DoctorDetails/DoctorDetails';

const DoctorDetailsPage = () => {
    return (
        <>
            <Header />
            <div className='min-h-screen bg-blue-50'>
                <DoctorDetails />
            </div>
            <Footer />
        </>

    );
};

export default DoctorDetailsPage;