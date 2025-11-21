import React, { useState } from 'react';
import {ChevronDown, Star, MapPin, Mic, Search} from 'lucide-react';
import "../styles/about.css";
import "../styles/homenetworking.css";
import massagebanner from "../assets/massage.png";
import "../styles/businesscategories.css";
import beauty1 from "../assets/beauty1.png";
import beauty2 from "../assets/beauty2.png";
import beauty3 from "../assets/beauty3.png";
import whatsappicon from "../assets/icons/whatsappicon.png";

const HomeCategories: React.FC = () => {
 
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, ] = useState("Top Rated");
  
  const [openNow, setOpenNow] = useState(false);

  const businesses = [
    {
      id: 1,
      name: "Annu Women’s Beauty Parlour",
      image: beauty1,
      rating: 4.4,
      reviews: 12,
      label: "Top Search",
      address: "Main Road Parkal, Warangal",
      tag: "Skin Treatment",
    },
    {
      id: 2,
      name: "Sri Kalki Beauty Parlour",
      image: beauty2,
      rating: 4.4,
      reviews: 45,
      label: "Top Search",
      address: "Junior College Line Kottawada, Warangal",
      tag: "Skin Treatment",
    },
    {
      id: 3,
      name: "Joy Angels Women’s Beauty Parlour",
      image: beauty3,
      rating: 4.4,
      reviews: 18,
      label: "Top Search",
      address: "Hanamkonda, Warangal",
      tag: "Skin Treatment",
    },
  ];

  const filteredBusinesses = businesses
    .filter((b) => (openNow ? b.rating > 4 : true))
    .sort((a, b) => (sortBy === "Top Rated" ? b.rating - a.rating : a.rating - b.rating));


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
            src={massagebanner} 
            width="1278px"   
             height="246px"
            alt="We Konnects Community" 
            className="hero-banner-image"
          />
        </div>
      </section>

     
     <section className="business-page">
      <div className="breadcrumbs">
        Warangal › Beauty in Warangal › Beauty Sports in Warangal › 3+ Listings
      </div>

      <h2 className="section-heading">
        Popular Beauty Sports in Vellampalli, Warangal
      </h2>

      {/* ===== FILTERS ===== */}
      <div className="filters">
        <div className="filter-item">
          Sort by <ChevronDown size={18} />
        </div>
        <div className="filter-item">
          Massage Styles <ChevronDown size={18} />
        </div>
        <div className="filter-item">
          Services <ChevronDown size={18} />
        </div>
        <div
          className={`filter-item ${openNow ? "active" : ""}`}
          onClick={() => setOpenNow(!openNow)}
        >
          Open Now <ChevronDown size={18} />
        </div>
      </div>

      {/* ===== BUSINESS LISTINGS ===== */}
      <div className="business-list">
        {filteredBusinesses.map((b) => (
          <div key={b.id} className="business-card">
            <img src={b.image} alt={b.name} className="business-img" />

            <div className="business-details">
              <h3 className="business-name">{b.name}</h3>

              <div className="business-rating">
                <div className="rating-box">
                  <Star fill="#fff" color="#fff" size={16} />
                  <span>{b.rating}</span>
                </div>
                <p className="rating-text">{b.reviews} Ratings</p>
                <span className="label">{b.label}</span>
              </div>

              <p className="address">
                <MapPin size={16} color="#8735BC" />
                {b.address}
              </p>

              <div className="tag">{b.tag}</div>

              <div className="buttons">
                <button className="view-btn" onClick={() => window.location.href = '/business-details'}>View</button>
                <button className="whatsapp-btn">
                  <img src={whatsappicon} alt="WhatsApp" width={28} height={28} />
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    
     

    
     
    </div>
  );
};

export default HomeCategories;
