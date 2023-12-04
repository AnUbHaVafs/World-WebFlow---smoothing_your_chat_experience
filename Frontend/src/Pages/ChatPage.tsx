import { useState } from "react";
import { Box } from "@chakra-ui/layout";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const ChatPage: any = () => {
  const [fetchAgain, setFetchAgain] = useState<any>(false);
  const [expand, setExpand] = useState<any>(true);
  const { user }: any = ChatState();
  console.log(expand);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {user && <SideDrawer expand={expand} setExpand={setExpand} />}
      <Box
        display="flex"
        justifyContent="space-between"
        // w="100%"
        h="92.5vh"
        p="1px"
        backgroundColor={"white"}
      >
        {user && <MyChats expand={expand} fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
