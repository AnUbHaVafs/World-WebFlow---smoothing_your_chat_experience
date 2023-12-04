import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { handleUserLogin } from "./helpers/helpers";
import "./App.css";

declare global {
  const google: any;
}

function App() {
  const navigate = useNavigate();
  const handleCallbackResponse = async (res: any) => {
    let encodedPayload: string = "";
    Object.keys(res).map((key) => {
      if (key === "credential") {
        encodedPayload = res[key];
      }
    });
    const token = encodedPayload;
    const decoded = jwtDecode(token);
    const resp = await handleUserLogin(decoded);
    if (resp) {
      navigate("/chat");
    }
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "769870810839-bl5tchvlpq7bov7crs26da9qb6i4fbkk.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={HomePage} index />
        <Route path="/chat" Component={ChatPage} />
      </Routes>
    </div>
  );
}

export default App;
