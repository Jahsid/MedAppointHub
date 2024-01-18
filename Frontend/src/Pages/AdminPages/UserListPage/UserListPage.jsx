import React from 'react';
import Header from '../../../Components/AdminComponents/Header/Header';
import SideNav from '../../../Components/AdminComponents/SideNav/SideNav';
import Footer from '../../../Components/AdminComponents/Footer/Footer';
import { UserList } from '../../../Components/AdminComponents/UserList/UserList';

const UserListPage = () => {



    return (
        <>
            <Header />
            <div className='flex'>
                <SideNav />
                <div className='flex-grow ' >
                    <UserList/>

                </div>

            </div>
            <Footer/>
        </>
    );
};

export default UserListPage;