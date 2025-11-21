import { useState } from "react";
import heroMain from "../assets/hero-main.png"; 
import { Search, MapPin, Mic } from "lucide-react";

export default function Hero() {
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");

  return (
    <section className="hero-section">
      <div className="container hero-inner">
        {/* ======= Title ======= */}
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

        {/* ======= Cards Row ======= */}
        <div className="hero-cards">
          {/* Left big card */}
          <div className="hero-card image-card">
            <img src={heroMain} alt="Interior Designers" />
            <div className="card-overlay">
              
              {/* <button className="yellow-btn">Get Best Quotes</button> */}
            </div>
          </div>

          {/* Second column */}
          <div className="hero-card blue-card">
            <h3>B2B</h3>
            <p>Quick Quotes</p>
          </div>

          {/* Third column (small narrow one) */}
          <div className="hero-card blue-card">
               <h3>B2B</h3>
            <p>Quick Quotes</p>
          </div>

          {/* Fourth column */}
          <div className="hero-card blue-card">
            <h3>B2B</h3>
            <p>Quick Quotes</p>
          </div>
        </div>
      </div>
    </section>
  );
}
