import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { LuAlarmCheck } from "react-icons/lu";
import { LuArrowRightToLine, LuArrowLeftToLine } from "react-icons/lu";
import io from "socket.io-client";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import "./sideDrawer.css";
import SetFlowModals from "../Modals/SetFlowModals";
var socket: any;
const ENDPOINT = "https://world-webflow-backend-1.onrender.com";

const SideDrawer = (props: any) => {
  const { expand, setExpand } = props;
  const [search, setSearch] = useState<any>("");
  const [titleText, setTitleText] = useState("chat experience");
  const [flowReceiversNames, setFlowReceiversNames] = useState<string>("");
  const [alarmModal, setAlarmModal] = useState(false);
  const [searchResult, setSearchResult] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [loadingChat, setLoadingChat] = useState<any>(false);
  const synonymsOfTitle = [
    "chat experience",
    "communication",
    "conversational",
    "dialogue",
    "interaction",
  ];

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleFlowMessage = (res: any, receiverObj: any) => {
    if (!receiverObj) return;
    console.log("Done here!", res, receiverObj);
    const hasNames =
      Object.keys(receiverObj).length > 0 && Boolean(receiverObj.name);
    console.log(hasNames);
    console.log(receiverObj.name);

    if (hasNames) {
      setFlowReceiversNames(receiverObj.name);
      setNotification([...notification, res]);
    }
    // const names = hasNames ? (flowReceiversNames + " " + receiverObj.name) : flowReceiversNames;
    // setFlowReceiversNames(names);
    // setNotification([...notification, res]);
  };

  // Replace this function with your logic to generate new text
  const generateSynonymsOfTitle = () => {
    const randomIndex = Math.floor(Math.random() * 5);
    return synonymsOfTitle[randomIndex];
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("flowMessage", (res: any, receiverObj: any) =>
      handleFlowMessage(res, receiverObj)
    );
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Change the title text to a new value
      const newText = generateSynonymsOfTitle(); // You can replace this function with your logic
      setTitleText(newText);
    }, 4000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `https://world-webflow-backend-1.onrender.com/api/user?search=${search}`,
        config
      );

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId: any) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `https://world-webflow-backend-1.onrender.com/api/chat`,
        { userId },
        config
      );

      if (!chats.find((c: any) => c._id === data._id))
        setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error: any) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleAlarmSetModal = (alarmModalVal: boolean) => {
    console.log("fired");
    alarmModalVal ? setAlarmModal(false) : setAlarmModal(true);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        h="7%"
        className="header-box"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button
            className="search-users-up-button"
            variant="ghost"
            onClick={onOpen}
          >
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search Flow
            </Text>
          </Button>
        </Tooltip>
        <Text
          // style={{ fontFamily: "Dancing Script" }}
          fontSize="2xl"
          fontFamily="Work sans"
        >
          <span
            className="header-title"
            style={{ fontSize: "38px", margin: "0px", color: "#6f0000" }}
          >
            World Webflow
          </span>
          <span className="header-sub-title">
            {" "}
            - Smoothing
            <span className="titleText">{" " + titleText}</span>
          </span>
        </Text>
        <div className="menus dfr">
          <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
            <Button
              className="search-users-down-button"
              variant="ghost"
              onClick={onOpen}
            >
              <i className="fas fa-search"></i>
              <Text display={{ base: "none", md: "flex" }} px={4}>
                Search Flow
              </Text>
            </Button>
          </Tooltip>
          {expand ? (
            <LuArrowLeftToLine
              class="IAmExpander"
              onClick={() => setExpand(false)}
            />
          ) : (
            <LuArrowRightToLine
              class="IAmExpander"
              onClick={() => setExpand(true)}
            />
          )}
          <LuAlarmCheck
            onClick={() => handleAlarmSetModal(alarmModal)}
            class="IamAlarm"
          />

          {/* <ImAlarm></ImAlarm> */}
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon className="notif-icon" fontSize="2xl" m={0} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif: any) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(
                      notification.filter((n: any) => n !== notif)
                    );
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `${
                        flowReceiversNames.length > 0
                          ? "Message Flow sent to all users: "
                          : "New Message from"
                      } ${
                        flowReceiversNames.length > 0
                          ? flowReceiversNames + "..."
                          : getSender(user, notif.chat.users)
                      }`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton
              className="user-details"
              as={Button}
              bg="white"
              rightIcon={<ChevronDownIcon className="profile" />}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <SetFlowModals
        setFlowModal={setAlarmModal}
        flowModal={alarmModal}
      ></SetFlowModals>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user: any) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
