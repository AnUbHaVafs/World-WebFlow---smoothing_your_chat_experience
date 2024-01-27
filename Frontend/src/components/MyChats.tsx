// import React from "react";
import { AddIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import {
  Avatar,
  Button,
  Badge,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import "./styles.css";

const MyChats: any = ({ fetchAgain, expand }: any): any => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "https://world-webflow-backend-1.onrender.com/api/chat",
        config
      );
      setChats(data);
      console.log(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userInfo");
    if (isLoggedIn) {
      setLoggedUser(JSON.parse(isLoggedIn));
      fetchChats();
    }
    // eslint-disable-next-line
  }, [fetchAgain]);

  const handleSelectChat = (chatObj:any)=>{
    setSelectedChat(chatObj);
    toast({
      title: "Good Work!",
      description: "Don't Forget to use Our Automation Tools",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
  }

  return (
    <Box
      className="chats"
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: expand ? "115%" : "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Flows */}
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir={expand ? "row" : "column"}
        p={3}
        // bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack className={expand ? "stack-chats" : ""} overflowY="scroll">
            {chats.map((chat: any) => (
              <Box
                className={expand ? "each-chat" : ""}
                onClick={() => handleSelectChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : expand ? "" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
                _hover={{
                  background: "white",
                  color: "teal.500",
                }}
              >
                {expand ? (
                  <div className="card-while-expand">
                    <Avatar
                      className="user-pic-in-expand"
                      src={`${chat["users"][0].pic}`}
                    />
                    <p className="user-name-in-expand">
                      {!chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName}
                    </p>
                  </div>
                ) : (
                  <div>
                    <Flex>
                      {/* <Avatar src="https://bit.ly/sage-adebayo" /> */}
                      <Avatar src={`${chat["users"][0].pic}`} />
                      <Box ml="3">
                        <Text fontWeight="bold">
                          {/* Segun Adebayo */}
                          {!chat.isGroupChat
                            ? getSender(loggedUser, chat.users)
                            : chat.chatName}
                          {chat["status"] == undefined && (
                            <Badge ml="2" colorScheme="red">
                              Unresolved
                            </Badge>
                          )}

                          <Badge
                            ml="2"
                            colorScheme={
                              chat["status"] == "unresolved"
                                ? "red"
                                : chat["status"] == "pending"
                                ? "orange"
                                : "green"
                            }
                          >
                            {chat.status}
                          </Badge>
                        </Text>
                        {chat.latestMessage && (
                          <Text fontSize="sm">
                            <b>{chat.latestMessage.sender.name} : </b>
                            {chat.latestMessage.content.length > 50
                              ? chat.latestMessage.content.substring(0, 51) +
                                "..."
                              : chat.latestMessage.content}
                          </Text>
                        )}
                        {/* <Text fontSize="sm">UI Engineer</Text> */}
                      </Box>
                    </Flex>

                    {/* <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && (
                    <Text fontSize="xs">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )} */}
                  </div>
                )}
                {/* <ArrowDownIcon /> */}
                {!expand && (
                  <Menu>
                    <MenuButton
                      as={ArrowDownIcon}
                      aria-label="Options"
                      // icon={<ArrowDownIcon />}
                      // variant="outline"
                    />
                    <MenuList>
                      <MenuItem>
                        <Badge colorScheme="green">Resolved</Badge>
                      </MenuItem>
                      <MenuItem>
                        <Badge colorScheme="orange">Pending</Badge>
                      </MenuItem>
                      <MenuItem>
                        <Badge colorScheme="red">Unresolved</Badge>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
