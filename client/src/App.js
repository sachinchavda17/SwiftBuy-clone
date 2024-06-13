import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Category from "./components/Category/Category";
import Header from "./components/Header/Header";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";
import AppContext from "./utils/context";
import Login from "./components/Auth/login/Login";
import Signup from "./components/Auth/signup/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <AppContext>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
        <Newsletter />
        <Footer />
      </AppContext>
    </BrowserRouter>
  );
};

export default App;
