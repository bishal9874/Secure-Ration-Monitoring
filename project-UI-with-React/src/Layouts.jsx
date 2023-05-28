import React from 'react'
import Header from "./components/header/Header";
import Hero from "./components/Hero/Hero";
import "./App.css";
import Companies from "./components/Companies/Companies";
import Services from "./components/services/Services";
import Contact from "./components/contact/Contact";
import Footer from './components/Footer/Footer';
const Layouts = () => {
  return (
    <div className="Layout">
        <div>
          <div className="white-gradient" />
          <Header />
          <Hero />
        </div>
        <Companies />
        <Services />
        <Contact/>
        <Footer/>
      </div>
      
  )
}

export default Layouts