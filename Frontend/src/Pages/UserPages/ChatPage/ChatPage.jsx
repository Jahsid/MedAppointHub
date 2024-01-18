import React from 'react';

import Header from '../../../Components/UserComponents/Header/Header';
// import Footer from '../../../Components/UserComponents/Footer/Footer';
import Chat from '../../../Components/ChatComponents/User/Chat/Chat';




const ChatPage = () => {
  return (

    <div>
        <Header/>
        <Chat/>
        {/* <Footer/> */}
    </div>
  );
};

export default ChatPage;