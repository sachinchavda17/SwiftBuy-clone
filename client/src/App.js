import React, { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Category from "./components/Category/Category";
import Header from "./components/Header/Header";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";
import AppContext, { Context } from "./utils/context";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Cookies from "js-cookie";
import Checkout from "./components/Checkout/Checkout";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const varifiedUser = Cookies.get("swiftbuyToken");
  if (varifiedUser) {
    const { user } = JSON.parse(localStorage.getItem("swiftbuyUser")) || "";
    if (user?.role === "admin") setIsAdmin(true);
  }
  return (
    <BrowserRouter>
      <AppContext>
        <Toaster />
        <Header />
        <Routes>
          {!varifiedUser && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
          {isAdmin && <Route path="/admin" element={<Home />} />}

          <Route path="/" element={<Home />} />
          <Route path="/check" element={<Checkout />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          {/* <Route path="*" element={<Navigate to={"/"} />} /> */}
        </Routes>
        <Newsletter />
        <Footer />
      </AppContext>
    </BrowserRouter>
  );
};

export default App;
