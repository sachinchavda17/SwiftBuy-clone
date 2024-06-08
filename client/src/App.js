import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/Home/Home'
import SingleProduct from './components/SingleProduct/SingleProduct'
import Category from './components/Category/Category'
import Header from './components/Header/Header'
import Newsletter from './components/Footer/Newsletter/Newsletter'
import Footer from './components/Footer/Footer'
import AppContext from './utils/context'

const App = () => {
    return (
        <BrowserRouter>
            <AppContext>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/product/:id' element={<SingleProduct />} />
                    <Route path='/category/:id' element={<Category />} />
                    <Route path='*' element={<Home />} />
                </Routes>
                <Newsletter />
                <Footer />
            </AppContext>
        </BrowserRouter>
    )
}

export default App

