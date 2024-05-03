import React, { useState } from "react";
import "./App.css";
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footer";
import HomePage from "./layouts/homepage/HomePage";

function App() {
  const [textSearch, setTextSearch] = useState("");

  return (
    <div className="App">
      <Navbar textSearch = {textSearch} setTextSearch = {setTextSearch} />
      <HomePage textSearch = {textSearch} setTextSearch = {setTextSearch}/>
      <Footer />
    </div>
  );
}

export default App;
