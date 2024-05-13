import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footer";
import HomePage from "./layouts/homepage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./layouts/about/About";
import NoPage from "./layouts/utils/NoPage";
import BookDetail from "./layouts/products/BookDetail";
import RegisterUser from "./layouts/users/RegisterUser";
import ActiveUser from "./layouts/users/ActiveUser";
import LoginUser from "./layouts/users/LoginUser";
import { Test } from "./layouts/users/Test";
import BookForm_Admin from "./layouts/admin/BookForm";
import VNPAY_PAY from "./layouts/vnpay/VNPAY_PAY";
import { Socket, io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";

const App: React.FC = () => {
  const [textSearch, setTextSearch] = useState("");
  const [username, setUsername] = useState<string | null>("");
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    setSocket(socket);
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = jwtDecode(token);
      if (userData) {
        const decodedUsername = userData.sub + "";
        setUsername(decodedUsername);
        socket?.emit("newUser", username);
      }
    }
  }, [socket, username]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar textSearch={textSearch} setTextSearch={setTextSearch} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage  socket={socket} textSearch={textSearch} setTextSearch={setTextSearch} />
            }
          />
          <Route
            path="category/:id"
            element={
              <HomePage  socket={socket} textSearch={textSearch} setTextSearch={setTextSearch} />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/view-detail/book/:id" element={<BookDetail />} />
          <Route path="/user/register" element={<RegisterUser />} />
          <Route path="/user/login" element={<LoginUser />} />
          <Route path="/test" element={<Test />} />
          <Route path="/cart" element={<VNPAY_PAY />} />
          <Route path="/admin/create-book" element={<BookForm_Admin socket={socket}/>} />
          <Route path="/user/active/:email/:activationKey" element={<ActiveUser />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
