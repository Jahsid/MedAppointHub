import React from 'react';
import Header from '../../../Components/AdminComponents/Header/Header';
import SideNav from '../../../Components/AdminComponents/SideNav/SideNav';
import Footer from '../../../Components/AdminComponents/Footer/Footer';
import DoctorList from '../../../Components/AdminComponents/DoctorList/DoctorList';


const DoctorListPage = () => {



    return (
        <>
            <Header />
            <div className='flex'>
                <SideNav />
                <div className='flex-grow ' >
                    <DoctorList/>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default DoctorListPage;