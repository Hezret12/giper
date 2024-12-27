import React from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Body/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllProduct from "./Components/Body/AllProduct";
import Basket from "./Components/Body/Basket";
import FirstLine from "./Components/Header/FirstLine";
import Single from "./Components/Body/Single/Single";
import ShopLogo from "./Components/Categories/ShopLogo";
import Brand from "./Components/Categories/Brand";
import Carts from "./Components/Categories/Carts";
import ShopProducts from "./Components/Categories/ShopProducts";
import SwipperPage from "./Components/Body/SwipperPage";
import SearchBar from "./Components/Body/SearchBar";


function App() {
  return (
    <BrowserRouter>
    <div>
    <FirstLine/>
    <div className='border-b-[0.1px] border-white'></div>
     <Header/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products/:id" element={<AllProduct/>}/>
      <Route path="/products/:id/:code" element={<ShopProducts/>}/>
      <Route path="/swipper/:id/:code" element={<SwipperPage/>}/>
      <Route path="/basket" element={<Basket/>}/>
      <Route path="/single/:id" element={<Single/>}/>
      <Route path="/magazine" element={<ShopLogo/>}/>
      <Route path="/brand" element={<Brand/>}/>
      <Route path="/brands/:code" element={<Carts/>}/>
      <Route path="/productSearch/:name" element={<SearchBar/>}/>
     </Routes>
     <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
