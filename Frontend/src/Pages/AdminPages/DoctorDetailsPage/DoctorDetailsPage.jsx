import React from 'react';
import Header from '../../../Components/AdminComponents/Header/Header';
import Footer from '../../../Components/AdminComponents/Footer/Footer';
import SideNav from '../../../Components/AdminComponents/SideNav/SideNav';
import DoctorDetails from '../../../Components/AdminComponents/DoctorDetails/DoctorDetails';

const DoctorDetailsPage = () => {

    return (
        <>
            <Header />
            <div className='flex'>
                <SideNav />
                <div className='flex-grow ' >
                    <DoctorDetails/>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DoctorDetailsPage;
