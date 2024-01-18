import React from 'react';
import Chat from '../../../Components/ChatComponents/Doctor/Chat/Chat'
import Header from '../../../Components/DoctorComponents/Header/Header';
// import Footer from '../../../Components/DoctorComponents/Footer/Footer';

const ChatPage = () => {
  return (
    <div className='bg-blue-50 min-h-screen'>
      <Header/>
        <Chat/>
      {/* <Footer/> */}
    </div>
  );
};

export default ChatPage;