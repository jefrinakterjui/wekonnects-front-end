import { useState } from "react";
import "../styles/businessDetails.css";
import {
  MapPin,
  Mic,
  Search,
  Share2,
  Star,
  Link,
  Edit3,
} from "lucide-react";
import whatsappicon from "../assets/icons/whatsappicon.png"
import img1 from "../assets/businessphotos/parlor1.png";
import img2 from "../assets/businessphotos/parlor2.png";
import img3 from "../assets/businessphotos/parlor3.png";
import img4 from "../assets/businessphotos/parlor4.png";
import waxing from "../assets/icons/waxing.png";
import makeup from "../assets/icons/makeup.png";
import home from "../assets/icons/homeservices.png";
import facial from "../assets/icons/facialmask.png";
import ambience from "../assets/businessphotos/parlor1.png";
import massage from "../assets/businessphotos/parlor4.png";

export default function BusinessDetails() {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = ["Overview", "Catalogue", "Services", "Photos", "Reviews"];

  const catalogueItems = [
    { title: "Ear Piercing", desc: "Ear piercing service is conducted by trained...." },
    { title: "Nose Piercing", desc: "Nose piercing involves creating a hole in the...." },
    { title: "Hair Blow Dry", desc: "Experience a fabulous transformation with our...." },
  ];

  const highlights = [
    { title: "Waxing", icon: waxing },
    { title: "Bridal Makeup", icon: makeup },
    { title: "Home Services Offered", icon: home },
    { title: "Facial", icon: facial },
  ];
   const alsoListed = [
    "Beauty Spas",
    "Beauty Parlours",
    "Gyms Women’s",
    "Gyms",
    "Skin Care Clinics",
    "Mehendi Arts",
  ];

    const [location, setLocation] = useState("");
    const [search, setSearch] = useState("");

  return (
    <section className="business-details-page">

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
        {/* ==== IMAGE GRID ==== */}
        <div className="image-grid">
          <img src={img1} alt="1" className="img img1" />
          <img src={img2} alt="2" className="img img2" />
          <img src={img3} alt="3" className="img img3" />
          <img src={img4} alt="4" className="img img4" />
        </div>

      {/* ==== BUSINESS INFO ==== */}
      <div className="business-header">
        <h2 className="business-name">Sri Kalki Beauty Parlour</h2>

        <div className="rating-row">
          <div className="rating-box">4.4</div>
          <p className="ratings-text">45 Ratings</p>
          <span className="label">Top Search</span>
        </div>

        <div className="location-row">
          <span className="dot gray"></span>
          <span>Kottawada, Warangal</span>
          <span className="dot green"></span>
          <span className="available">Available until 9:00 pm</span>
        </div>

        <div className="buttons-row">
          <button className="view-btn">View</button>
          <button className="whatsapp-btn">
           <img src={whatsappicon} alt="WhatsApp" width={28} height={28} />
           Whatsapp
          </button>
        </div>

        <div className="rating-stars">
          <p>Click to Rate</p>
          <div className="stars">⭐ ⭐ ⭐ ⭐ ⭐</div>
        </div>
      </div>

      {/* ==== TABS ==== */}
      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ==== TAB CONTENT ==== */}
      <div className="tab-content">
        {activeTab === "Catalogue" && (
          <div className="catalogue-section">
            <h3>Catalogue</h3>
            <div className="catalogue-cards">
              {catalogueItems.map((item, i) => (
                <div key={i} className="catalogue-card">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                    <a href="#" style={{ color: "#8735BC", fontSize: "14px" }}>View Details</a>
                  <div className="catalogue-btns">
                    {/* <button className="view-details">View Details</button> */}
                    <button className="enquire-now">Enquire Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Overview" && (
          <div className="overview-section">
            <h3>Highlights from the business</h3>
            <div className="highlights-grid">
              {highlights.map((h, i) => (
                <div key={i} className="highlight-card">
                  <img src={h.icon} alt={h.title} />
                  <p>{h.title}</p>
                </div>
              ))}
            </div>

            <div className="services-grid2">
              <div>
                <h4>✅ Hair Care</h4>
                <p>Hair Extension, Hair Rebonding</p>
              </div>
              <div>
                <h4>✅ Skin Care</h4>
                <p>Face Lifting Treatment, Thermo Herb Facial</p>
              </div>
              <div>
                <h4>✅ Makeup</h4>
                <p>Groom Makeup, Basic Makeup</p>
              </div>
              <div>
                <h4>✅ Body Care</h4>
                <p>Steam Bath, Body Shaping</p>
              </div>
            </div>

            <button className="view-all-btn">View All</button>
          </div>
        )}
      </div>
       <div className="tab-content">
        {/* ======= PHOTOS TAB ======= */}
       {activeTab === "Photos" && (
  <div className="photos-section">
    <h3>Photos</h3>

    <div className="photos-grid">
      {/* ===== COLUMN 1 (4 Photos in 2x2 grid) ===== */}
      <div className="photo-column photo-grid-4">
        <div className="photo-4-grid">
          <div className="photo-item">
            <img src={img1} alt="Photo 1" />
          </div>
          <div className="photo-item">
            <img src={img2} alt="Photo 2" />
          </div>
          <div className="photo-item">
            <img src={img3} alt="Photo 3" />
          </div>
          <div className="photo-item viewall">
            <img src={img4} alt="Photo 4" />
            <div className="overlay">View All</div>
          </div>
        </div>
        <p className="photo-caption">
          <strong>All</strong> <br /> 60 Photos
        </p>
      </div>

      {/* ===== COLUMN 2 (Ambience) ===== */}
      <div className="photo-column">
        <img src={ambience} alt="Ambience" className="large-photo" />
        <p className="photo-caption">
          <strong>Ambience</strong> <br /> 1 Photo
        </p>
      </div>

      {/* ===== COLUMN 3 (Massage Room) ===== */}
      <div className="photo-column">
        <img src={massage} alt="Massage Room" className="large-photo" />
        <p className="photo-caption">
          <strong>Massage Room</strong> <br /> 1 Photo
        </p>
      </div>
    </div>
  </div>
)}

      </div>
      {/* ========= CONTACT SECTION ========= */}
      <div className="contact-section">
        <h2 className="contact-title">Contact</h2>
        <a href="#" className="show-number">
          Show Number
        </a>

        <h3 className="address-title">Address</h3>
        <p className="address-text">
          11-27-105/1, 11-27-105/1, Beside Airtel Office, Kothawada <br />
          Padmavathi Junior Collage Line, Kottawada-506002
        </p>

        <div className="address-actions">
          <a href="#" className="link"><MapPin size={18}/> Get Directions</a>
          <span>Copy</span>
          <span className="green-text">Available until 9:00 pm</span>
          <span>Suggest New Timings</span>
          <span>Send Enquiry by Email</span>
          <span><Star size={16}/> Tap to rate</span>
          <span>Get info via SMS/Email</span>
          <span><Edit3 size={16}/> Edit this Listing</span>
          <span><Share2 size={16}/> Share</span>
          <span><Link size={16}/> Add Website</span>
        </div>

        <div className="also-listed">
          <h4>Also listed in</h4>
          <div className="listed-buttons">
            {alsoListed.map((item, i) => (
              <button key={i} className="listed-btn">{item}</button>
            ))}
            <button className="more-btn">More</button>
          </div>
        </div>
      </div>

    </section>


    

  );
}
