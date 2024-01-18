import React from 'react';
import DocotrList from '../../../Components/UserComponents/DoctorList/DocotrList';
import Header from '../../../Components/UserComponents/Header/Header';
import Footer from '../../../Components/UserComponents/Footer/Footer';

const DoctorListPage = () => {
  return (
    <div>
      <Header />
      <div className='min-h-screen bg-blue-50'>
        <DocotrList />
      </div>
      <Footer />
    </div>
  );
};
export default DoctorListPage;