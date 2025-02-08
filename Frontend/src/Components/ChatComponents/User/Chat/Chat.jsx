import React, { useEffect, useState } from 'react';
import { chatData } from '../../../../Api/chatApi';
import { useSelector } from 'react-redux';
import ChatList from '../../User/ChatList/ChatList';
import ChatBox from '../../User/ChatBox/ChatBox';
import { io } from 'socket.io-client';

const END_POINT = process.env.REACT_APP_BASE_URL;
// const END_POINT = 'http://localhost:3001/';

let socket;

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const { _id } = useSelector((state) => state.reducer.userReducer.user);
  console.log("Hello",_id);
  const userId = _id;

  useEffect(() => {
    chatData(userId)
      .then((res) => {
        setConversations(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    socket = io(END_POINT);
  }, []);

  useEffect(() => {
    socket?.emit("setup", userId);
    socket?.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      if (data?.chatId === currentChat?._id) {
        const message = [...messages, data];
        setMessages(message);
      }

      const updatedConversations = conversations.map((chat) => {
        if (chat._id === data.chatId) {
          return { ...chat, lastMessage: Date.parse(data.createdAt) };
        }
        return chat;
      });

      const sortedConversations = [...updatedConversations].sort((a, b) => {
        const aTimestamp = a.lastMessage || 0;
        const bTimestamp = b.lastMessage || 0;
        return bTimestamp - aTimestamp;
      });

      setConversations(sortedConversations);
    });
  }, [messages, currentChat, conversations]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== userId);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className='bg-blue-50'>
      <div className='min-h-screen bg-blue-50 flex justify-center'>
        <div className='min-h-screen bg-blue-50'>
          <div className='w-full md:w-96 h-screen bg-white mx-auto md:me-10'>
            <div className='overflow-y-auto h-screen md:h-screen'>
              {conversations.length === 0 ? (
                <div className='text-xl text-gray-600 text-center'>
                  <p className='m-20'>No chats</p>

                </div>
              ) : (
                conversations.map((chat) => (
                  <div
                    key={chat._id}
                    onClick={() => {
                      setCurrentChat(chat);
                      socket?.emit("join room", chat._id);
                    }}
                  >
                    <ChatList data={chat}
                      currentUserId={userId}
                      online={checkOnlineStatus(chat)}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={userId}
          setMessages={setMessages}
          messages={messages}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default Chat;
