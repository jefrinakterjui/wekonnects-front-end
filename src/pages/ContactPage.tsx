import React, { useState } from 'react';
import {  Mail, MapPin, Mic, PhoneCall, Search } from 'lucide-react';
import "../styles/about.css";

import contactBanner from "../assets/contact.png"



const Contact: React.FC = () => {

  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");

   const stats = [
    { id: 1, icon: <Mail size={40} />, label: "wekonnectsforu@gmail.com", value: "Mail Us" },
    { id: 2, icon: <MapPin size={40} />, label: `Shop No : 226, 3rd Floor, 
Vasavi Pharma Complex, Gollapudi`, value: "Visit Us" },
    { id: 3, icon: <PhoneCall size={40} />, label: "+91 8500509249", value: "Calls Us" },
    
  ];
  return (
    <div className="about-us-page">
       <h1 className="hero-title">
          Search across<span className="highlight">‘4.7 Crore+’</span> Businesses
        </h1>
         {/* ======= Search Row ======= */}

        <div className="hero-search">
          {/* Location Box */}
          <div className="hero-input location-box">
            <MapPin size={22} color="#0F7DD8" />
            <input
              type="text"
              placeholder="Vellampalli, Warangal"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Search Box */}
          <div className="hero-input search-box">
            <input
              type="text"
              placeholder="Search for Spa Salons"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="mic-btn">
              <Mic size={20} color="#0F7DD8" />
            </button>
            <button className="search-btn">
              <Search color="#fff" size={20} />
            </button>
          </div>
        </div>
      {/* Hero Banner Section */}
      <section className="hero-banner-section">
        <div className="hero-banner-container">
          <img 
            src={contactBanner} 
            alt="We Konnects Community" 
            className="hero-banner-image"
          />
        </div>
      </section>
<section className="about-content-section">
       <div className="about-us-badge">
          <h2>CONTACT US</h2>
        </div>
        
        <h1 className="about-heading">Let's Get In Touch</h1>
        
        <p className="about-description">
       Feel free t o reach out to us using the options below,our dedicated team will respond to your inquiries promptly
        </p>
</section>
  

      {/* === Stats Section === */}
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-card-contact">
                <h3>{stat.value}</h3>
              <div className="stat-icon">{stat.icon}</div>
              
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
       
        
     
     
    </div>
  );
};

export default Contact;