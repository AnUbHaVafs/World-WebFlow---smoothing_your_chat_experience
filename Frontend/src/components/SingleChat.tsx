// import React from "react";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import "./styles.css";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Spinner,
  useDisclosure,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { Responses } from "./Responses.js";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon, ChatIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";

import io from "socket.io-client";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { ChatState } from "../Context/ChatProvider";
import { generateReponse } from "../helpers/helpers.js";
const ENDPOINT = "https://world-webflow-backend-1.onrender.com"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket: any, selectedChatCompare: any;

// type Props = {};

const SingleChat = ({ fetchAgain, setFetchAgain }: any) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<any>("");
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [typing, setTyping] = useState<boolean>(false);
  const [istyping, setIsTyping] = useState<boolean>(false);
  const toast = useToast();

  const [size, setSize] = useState("md");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    onOpen();
  };

  const defaultOptions: any = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:5000/api/message/${selectedChat._id}`,
        config
      );
      console.log(data);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event: any) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        // console.log(newMessage, selectedChat);
        setNewMessage("");
        const { data } = await axios.post(
          "https://world-webflow-backend-1.onrender.com/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
        fetchMessages();
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    // socket.on("flowMessage", () => handleFlowMessage());

    //  eslint-disable-next-line
  }, []);

  const handleGenerateResponse = async (isAnyQuery: boolean) => {
    let query = "";
    if (messages.length) {
      query = messages[messages.length - 1].content;
    } else {
      query = "Hello!";
    }
    // console.log(query);

    if (selectedChat?.latestMessage?.content) {
      if (!isAnyQuery) {
        query =
          "Generate a random question which usually highly skilled Software Engineer while collaborating with other Software Engineers working together on a crucial project ask in range of 40 words and question should be technical?";
      } else {
        query += "generate a response to this in 50 words!";
      }
      console.log(query);
      const res = await generateReponse(query);
      console.log(res);
      setResponse(res);
      setNewMessage(res);
      fetchMessages();

      toast({
        title: "Message Sent!",
        description: "Auto messaging is on!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    // console.log(selectedChat);
    fetchMessages();

    // console.log(selectedChat?.latestMessage?.content, user._id);
    if (selectedChat?.latestMessage?.content) {
      const lastMessage = selectedChat?.latestMessage?.content;
      console.log(lastMessage);
      setPrompt(lastMessage);
    }

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved: any) => {
      if (
        !selectedChatCompare || // if chat is not selected or incoming message doesn't match current chat.
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e: any) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              aria-label="Search database"
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                {/* These are all the messages of a Chat */}
                <ScrollableChat messages={messages} />
              </div>
            )}

            {/* Input for sending chat messages */}
            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "20px",
                }}
              >
                <Input
                  variant="filled"
                  bg="#E0E0E0"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={typingHandler}
                />
                <ChatIcon onClick={() => handleClick()} boxSize={5} />
              </div>
            </FormControl>
          </Box>
          <Drawer onClose={onClose} isOpen={isOpen} size={size}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader
                style={{
                  textDecoration: "underline",
                  // display: "flex",
                  // flexDirection: "row",
                  // justifyContent: "center",
                }}
              >{`Canned Messages`}</DrawerHeader>
              <DrawerBody>
                <Stack
                  direction="column"
                  style={{ overflow: "hidden" }}
                  spacing={4}
                  align="center"
                >
                  <div className="generate-resp-btns">
                    <Button
                      style={{ width: "50%", height: "50px" }}
                      colorScheme="teal"
                      // variant="outline"
                      onClick={() => handleGenerateResponse(true)}
                    >
                      {"Generate Response"}
                    </Button>
                    <Button
                      style={{ width: "50%", height: "50px" }}
                      colorScheme="teal"
                      // variant="outline"
                      onClick={() => handleGenerateResponse(false)}
                    >
                      {"Start Flow"}
                    </Button>
                  </div>
                  {Responses.map((response: any) => (
                    <Button
                      style={{ width: "95%", height: "50px" }}
                      colorScheme="teal"
                      variant="outline"
                      onClick={() => setNewMessage(response.text)}
                    >
                      {response["text"].substring(0, 50)}
                    </Button>
                  ))}
                  {/* <Button
                    style={{ width: "95%" }}
                    colorScheme="teal"
                    variant="outline"
                  >
                    Button
                  </Button>
                  <Button
                    style={{ width: "95%" }}
                    colorScheme="teal"
                    variant="outline"
                  >
                    Button
                  </Button> */}
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        // to get socket.io on same page
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="5xl" pb={3} fontFamily="Qwitcher Grypen">
            Create a <span style={{ color: "blue" }}>flow</span> with your
            friend
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
