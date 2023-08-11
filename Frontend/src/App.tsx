import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={HomePage} index />
        <Route path="/chat" Component={ChatPage} />
      </Routes>
    </>
  );
}

export default App;
