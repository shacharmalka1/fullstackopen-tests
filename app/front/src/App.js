import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from "./core/Home";
import Login from "./core/Login";
import React, { useState } from "react";
import Register from "./core/Register";
import Main from "./core/Main";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>   
    </Router>
  );
}