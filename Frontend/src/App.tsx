import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import "./App.css";
function App() {
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
