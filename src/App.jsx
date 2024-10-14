import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Coins from "./assets/Components/Coins/Coins";
import Layout from "./assets/Components/Layout";
import Hero from "./assets/Components/Hero/Hero";
import Coinsdetails from "./assets/Components/CoinsDetails/Coinsdetails";
import News from "./assets/Components/News/News";

function App() {
  return (
    <>
    <Router>
      <Routes>
       
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero />} /> 
          <Route path="/coins" element={<Coins />} /> 
          <Route path="/coins/:id" element={<Coinsdetails/>}/>
          <Route path="/news" element={<News/>}/>
        </Route>
      </Routes>
    </Router>

    </>
  );
}

export default App;
