import React from 'react';
import Header from '../../../Components/AdminComponents/Header/Header';
import SideNav from '../../../Components/AdminComponents/SideNav/SideNav';
import Footer from '../../../Components/AdminComponents/Footer/Footer';
import VerifyList from '../../../Components/AdminComponents/VerifyList/VerifyList';

const VerifyDoctor = () => {

    return (
        <>
            <Header />
            <div className='flex'>
                <SideNav />
                <div className='flex-grow ' >
                    <VerifyList />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default VerifyDoctor;