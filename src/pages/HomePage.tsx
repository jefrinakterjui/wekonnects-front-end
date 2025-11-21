import React, { useState } from 'react';
import { MapPin, Mic, Search } from 'lucide-react';
import "../styles/about.css";
import "../styles/homenetworking.css";
import logo from "../assets/logo.png";
import gallery1 from "../assets/food-banner.png"
import networkingImg from "../assets/target.png";
import client1 from "../assets/leader1.png";
import { Building2, Users2, UserRound, Link, IndianRupee,ChevronDown,ChevronUp } from "lucide-react";


const Home: React.FC = () => {
  const handleJoinNow = () => {
    // Add your navigation logic here
    window.location.href = '/signup';
  };
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");

   const stats = [
    { id: 1, icon: <Building2 size={40} />, label: "Cities", value: "50+" },
    { id: 2, icon: <Users2 size={40} />, label: "Groups", value: "100+" },
    { id: 3, icon: <UserRound size={40} />, label: "Members", value: "200+" },
    { id: 4, icon: <Link size={40} />, label: "Referral Links", value: "14000+" },
    { id: 5, icon: <IndianRupee size={40} />, label: "Turnover", value: "2.3cr+" },
  ];

  const [expanded, setExpanded] = useState<string | null>(null);

  const networkingSections = [
    {
      id: "networking",
      title: "Networking",
      icon: "📶",
      content: `Wekonnects provides opportunities to meet and 
network with other business professionals in your 
community. You can attend 1 networking meeting 
and 2 SOM per month.`,
    },
    {
      id: "referrals",
      title: "Referrals",
      icon: "🚀",
      content: `Grow your business through trusted referrals from 
other verified members within your city or chapter.`,
    },
    {
      id: "professional",
      title: "Professional Development",
      icon: "💼",
      content: `We offer skill-development programs and workshops 
to help members enhance their professional abilities.`,
    },
  ];

  const clients = [
    { id: 1, name: "MALLIKARJUNA", company: "MVC Capital", img: client1 },
    { id: 2, name: "MALLIKARJUNA", company: "MVC Capital", img: client1 },
    { id: 3, name: "MALLIKARJUNA", company: "MVC Capital", img: client1 },
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
            src={logo} 
            alt="We Konnects Community" 
            className="hero-banner-image"
          />
        </div>
      </section>

      {/* About Us Content Section */}
      <section className="about-content-section">
        <div className="about-us-badge">
          <h2>HOME</h2>
        </div>
        
        <h1 className="about-heading">Fast Growing</h1>
         <p className="about-description">Business Networking Organisation</p>
        
        <p className="about-description">
            Helping business to increase their clientilele and grow their business.
            We Konnects strength lies in its diverse and
            experienced team.        </p>

       
      </section>

    
     

         <section className="home-sections">
      {/* ================= NETWORKING ================= */}
      <div className="networking-section">
        <div className="networking-left">
          <img src={networkingImg} alt="Networking" />
        </div>
        <div className="networking-right">
          <h2 className="networking-heading">We Konnects strength lies in its diverse and experienced team.</h2>
          <ul className="networking-list">
            <li>✅ Networking</li>
            <li>✅ Business Growth</li>
            <li>✅ Knowledge Sharing</li>
            <li>✅ Collaboration</li>
            <li>✅ Innovation</li>
          </ul>
          <button className="know-more-btn">
            Know More <span>↗</span>
          </button>
        </div>
      </div>


      {/* ================= EXPANDABLE CARDS ================= */}
      <div className="networking-cards">
        {networkingSections.map((item) => (
          <div key={item.id} className="network-card">
            <div className="network-card-header" onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
              <span className="icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <button className="expand-btn">
                {expanded === item.id ? <ChevronUp color="#FF6C00" /> : <ChevronDown color="#FF6C00" />}
              </button>
            </div>
            {expanded === item.id && (
              <p className="network-card-content">{item.content}</p>
            )}
          </div>
        ))}
      </div>
        {/* === Stats Section === */}
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>

      {/* ================= CLIENTS SECTION ================= */}
      <div className="clients-section">
        <div className="clients-title">Clients</div>
        <h2 className="clients-heading">What our valuable customers said</h2>

        <div className="clients-grid">
          {clients.map((c) => (
            <div key={c.id} className="client-card">
              <img src={c.img} alt={c.name} className="client-img" />
              <div className="stars">
                {"⭐".repeat(5)}
              </div>
              <h4>{c.name}</h4>
              <p>{c.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
       <div className="gallery-grid">
          <div className="gallery-card">
            <img src={gallery1} alt="Gallery 1" />
            <div className="play-btn">▶</div>
          </div>
          <div className="gallery-card">
            <img src={gallery1} alt="Gallery 2" />
            <div className="play-btn">▶</div>
          </div>
        </div>
        
      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-heading">Start scaling your business with We Konnects</h2>
          <button className="cta-button" onClick={handleJoinNow}>
            JOIN NOW
          </button>
        </div>
      </section>
     
    </div>
  );
};

export default Home;