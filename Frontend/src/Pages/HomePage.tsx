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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
// import Signup from "../components/Authentication/Signup";
import "./HomePage.css";
import { advancedStaggeringAnimation } from "../helpers/helpers";
import anime from "animejs";

function Homepage() {
  const navigate = useNavigate();
  const [toogle, setToogle] = useState<boolean>(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userInfo");
    if (isLoggedIn) {
      const user: any = JSON.parse(isLoggedIn);
      console.log(user);
      if (user) navigate("/chat");
    }
    advancedStaggeringAnimation();
    // face animation
    const eyeOpenL =
      "M60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30Z";
    const eyeOpenR =
      "M208 31C208 47.5685 194.569 61 178 61C161.431 61 148 47.5685 148 31C148 14.4315 161.431 1 178 1C194.569 1 208 14.4315 208 31Z";
    const eyeClosedL =
      "M60 0.000190258C60 16.5687 46.5685 30.0002 30 30.0002C13.4315 30.0002 0 16.5687 0 0.000190258C0 0.000190258 13.4315 5.5 30 5.5C46.5685 5.5 60 0.000190258 60 0.000190258Z";
    const eyeClosedR =
      "M208 0.999969C208 17.5685 194.569 31 178 31C161.431 31 148 17.5685 148 0.999969C148 0.999969 161.431 9.00001 178 9.00001C194.569 9.00001 208 0.999969 208 0.999969Z";
    const mouthOpen =
      "M77 60H130V73.5C130 88.1355 118.136 100 103.5 100C88.8645 100 77 88.1355 77 73.5V60Z";
    const mouthClosed =
      "M77 30H130V30.3375C130 30.7034 118.136 31 103.5 31C88.8645 31 77 30.7034 77 30.3375V30Z";
    const closedEyeLeft = document.querySelector(".eye-left");
    const closedEyeRight = document.querySelector(".eye-right");
    const closedMouth = document.querySelector(".mouth");
    console.log(closedEyeLeft, closedEyeRight, closedMouth);
    const face = document.querySelector(".innerSwitch");
    const switchBG = document.querySelector(".switch-background");
    const background = document.querySelector("body");
    let switched = false;

    face && face.addEventListener("click", () => {
      const tl = anime.timeline({
        easing: "easeOutExpo",
        duration: 1050,
      });
      tl.add(
        {
          targets: [face],
          translateX: switched ? -1 : 250,
          rotate: switched ? -360 : 360,
          backgroundColor: switched ? "rgb(225,225,225)" : "rgb(243,255,148)",
        },
        500
      )
        .add(
          {
            targets: [switchBG, background],
            backgroundColor: switched
              ? "rgb(225,225,225)"
              : "rgb(45 134 93 / 79%)",
          },
          500
        )
        .add(
          {
            targets: ".eye-left",

            d: [
              {
                value: switched ? eyeClosedL : eyeOpenL,
              },
            ],
          },
          "-=1200"
        )
        .add(
          {
            targets: ".eye-right",
            d: [
              {
                value: switched ? eyeClosedR : eyeOpenR,
              },
            ],
          },
          "-=1210"
        )
        .add(
          {
            targets: ".mouth",
            d: [
              {
                value: switched ? mouthClosed : mouthOpen,
              },
            ],
          },
          "-=1210"
        );

      if (switched == true && switchBG) {
        //if true
        if (switchBG.classList.contains("on-shadow")) {
          switchBG.classList.remove("on-shadow");
        }
        switchBG.classList.add("off-shadow");
        switched = false;
      } else {
        if (switchBG && switchBG.classList.contains("off-shadow")) {
          switchBG && switchBG.classList.remove("off-shadow");
        }
        switchBG && switchBG.classList.add("on-shadow");
        switched = true;
      }
    });
  }, [navigate]);


  const handleToogle = ()=>{
    setToogle(!toogle);
  };

  return (
    // centerContent,maxW=xl, media queries for applying fw to form
    <Container
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: toogle ? "" : "rgb(225,225,225)",
      }}
      maxW="l"
    >
      <div className="animation-body">
        <div className="animation-wrapper">
          <div className="stagger-visualizer">
            <div className="cursor color-red"></div>
            <div className="dots-wrapper"></div>
          </div>
        </div>
      </div>
      <div style={{ width: "45%", height: "90%", zIndex: "2" }}>
        <Box
          display="flex"
          justifyContent="center"
          p={3}
          // bg="rgb(225,225,225)"
          color={!toogle ? "#3182ce" : "white"}
          w="100%"
          m="40px 0 15px 0"
          // style={{zIndex:"10"}}
          // borderRadius="lg"
          // borderWidth="1px"
        >
          <Text
            className={toogle ? "" : "typewriter"}
            fontSize="5xl"
            fontFamily="Work sans"
            zIndex={1}
            // style={{ textDecoration: "underline" }}
          >
            World Web Flow
          </Text>
        </Box>
        <Box
          zIndex={1}
          bg="none"
          w="100%"
          p={4}
          borderRadius="20px"
          borderWidth="0px"
        >
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
      </div>

      <div onClick={handleToogle} style={{ zIndex: "2" }}>
        <div className="container">
          <div className="switch-background off-shadow">
            <div className="innerSwitch">
              <svg
                width="285"
                height="150"
                viewBox="0 0 208 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="face"
              >
                <path
                  className="mouth"
                  d="M77 30H130V30.3375C130 30.7034 118.136 31 103.5 31C88.8645 31 77 30.7034 77 30.3375V30Z"
                  fill="#E76060"
                />
                <path
                  className="eye eye-left"
                  d="M60 0.000190258C60 16.5687 46.5685 30.0002 30 30.0002C13.4315 30.0002 0 16.5687 0 0.000190258C0 0.000190258 13.4315 5.5 30 5.5C46.5685 5.5 60 0.000190258 60 0.000190258Z"
                  fill="#474747"
                />
                <path
                  className="eye eye-right"
                  d="M208 0.999969C208 17.5685 194.569 31 178 31C161.431 31 148 17.5685 148 0.999969C148 0.999969 161.431 9.00001 178 9.00001C194.569 9.00001 208 0.999969 208 0.999969Z"
                  fill="#474747"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Homepage;

 {
   /* <script src="app.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/animejs@3.2.0/lib/anime.min.js"></script> */
 }