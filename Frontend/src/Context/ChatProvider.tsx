import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../services/services.service";

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
      isUserLoggedIn(userInfo);
      if (!userInfo || !isUserLoggedIn(userInfo)) navigate("/");
      setUser(userInfo);
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
