import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext: any = createContext(null);

const ChatProvider = ({ children }: any): any => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userInfo");
    if (isLoggedIn) {
      const userInfo: any = JSON.parse(isLoggedIn);
      setUser(userInfo);

      if (!userInfo) navigate("/");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState: any = (): any => {
  return useContext(ChatContext);
};

export default ChatProvider;
