import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
// import Signup from "../components/Authentication/Signup";
import "./HomePage.css";

function Homepage() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userInfo");
    if (isLoggedIn) {
      const user: any = JSON.parse(isLoggedIn);
      console.log(user);
      if (user) navigate("/chat");
    }
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        // bg="white"
        color="lightBlue"
        w="100%"
        m="40px 0 15px 0"
        // borderRadius="lg"
        // borderWidth="1px"
      >
        <Text
          className="typewriter"
          fontSize="5xl"
          fontFamily="Work sans"
          // style={{ textDecoration: "underline" }}
        >
          World Web Flow
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="20px" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Create Account</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
