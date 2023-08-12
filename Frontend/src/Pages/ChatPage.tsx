import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

const ChatPage: any = (props: Props) => {
  const [chats, setChats] = useState<any>([]);
  const fetchChats = async () => {
    const { data } = await axios.get("http://localhost:5000/api/chat");
    console.log(data);
    setChats(data);
  };
  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div>
      {chats.map((chat: any) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;
