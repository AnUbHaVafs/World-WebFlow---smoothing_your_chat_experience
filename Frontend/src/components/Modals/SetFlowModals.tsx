import React from "react";
import "./SetFlowModals.css";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
} from "@chakra-ui/react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";
// import { IonDatetime } from "@ionic/react";

const SetFlowModals = (props: any) => {
  const { setFlowModal, flowModal, children } = props;

  const handleModalOpen = (flowModalVal: boolean) => {
    flowModalVal ? setFlowModal(false) : setFlowModal(true);
  };

  const { onClose } = useDisclosure();
  const [value, onChange] = useState<any>(new Date());
  const [groupChatName, setGroupChatName] = useState<any>();
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const [search, setSearch] = useState<any>("");
  const [searchResult, setSearchResult] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [openDateModal, setOpenDateModal] = useState<boolean>(false);
  const toast = useToast();

  const { user, chats, setChats } = ChatState();

  const handleGroup = (userToAdd: any) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query: any) => {
    setSearch(query);
    if (!query) {
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
        `http://localhost:5000/api/user?search=${search}`,
        config
      );
      console.log(data);
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

  const handleDelete = (delUser: any) => {
    setSelectedUsers(
      selectedUsers.filter((sel: any) => sel._id !== delUser._id)
    );
  };

  const handleSubmit = async () => {
    if (!value || !groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const dateObject = new Date(value);
    const isoFormat = dateObject.toISOString();
    const receiversIds = selectedUsers.map((u: any) => u._id);

    const payload = {
      sender: user._id,
      message: groupChatName,
      receivers: receiversIds,
      flowTime: isoFormat,
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/flow`,
        payload,
        config
      );
      console.log(data._id);

      onClose();
      toast({
        title: "Flow has been Set!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error: any) {
      toast({
        title: "Flow has not set!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <span onClick={() => handleModalOpen(flowModal)}>{children}</span>
      <Modal
        onClose={() => handleModalOpen(flowModal)}
        isOpen={flowModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            Set Flow Alarm
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Your Message"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Flow Receivers - eg: John, Piyush, Jane"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedUsers.map((u: any) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading ? (
              // <ChatLoading />
              <div>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user: any) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
            {/* <button onClick={() => setOpenDateModal(true)}>
              Open Date Picker
            </button> */}
            <DateTimePicker
              className={"date-picker"}
              onChange={onChange}
              value={value}
              calendarClassName={"calender-picker"}
              minDate={new Date()}
            ></DateTimePicker>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleSubmit()} colorScheme="blue">
              Set Flow
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SetFlowModals;

{
  /* <div className={openDateModal ? "active popup" : "popup"} id="popup-1">
  <div className="overlay"></div>
  <div className="content">
    <h2>Hello</h2>
    <button
      onClick={() => {
        handleModalOpen(flowModal);
      }}
    >
      Close
    </button>
  </div>
</div> */
}
//  <div className={openDateModal ? "active popup" : "popup"} id="popup-1">
//    <div className="overlay"></div>
//    <div className="content">
//      <h2>Hello</h2>
//      {/* <IonDatetime></IonDatetime> */}
//      {/* <DatePicker label="Basic date picker" /> */}

//      <button
//        onClick={() => {
//          handleModalOpen(flowModal);
//        }}
//      >
//        Close
//      </button>
//    </div>
//  </div>;
