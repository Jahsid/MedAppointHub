import React from 'react';
import Header from '../../../Components/AdminComponents/Header/Header';
import Footer from '../../../Components/AdminComponents/Footer/Footer';
import SideNav from '../../../Components/AdminComponents/SideNav/SideNav';
import SpecialityList from '../../../Components/AdminComponents/SpeicialityList/SpecialityList';

const Speciality = () => {
  return (
    <>
    <Header/>
    <div className='flex'>
      <SideNav/>
      <div className='flex-grow'>
        <SpecialityList/>

      </div>
    </div>

    <Footer/>
    </>
  );
};

export default Speciality;