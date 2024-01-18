import React from 'react';
import Header from '../../../Components/AdminComponents/Header/Header';
import Footer from '../../../Components/AdminComponents/Footer/Footer';
import SideNav from '../../../Components/AdminComponents/SideNav/SideNav';
import VerifyDetails from '../../../Components/AdminComponents/VerifyDetails/VerifyDetails';

const verifyDetailsPage = () => {

    return (
        <>
            <Header />
            <div className='flex'>
                <SideNav />
                <div className='flex-grow ' >
                    <VerifyDetails />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default verifyDetailsPage;