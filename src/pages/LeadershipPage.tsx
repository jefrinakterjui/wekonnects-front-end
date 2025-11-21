import React, { useState } from 'react';
import { MapPin,Mic,Search } from 'lucide-react';
import "../styles/about.css";
import "../styles/leadership.css";
import city1 from "../assets/city1.png";
import city2 from "../assets/city2.png";
import city3 from "../assets/city3.png";
import leader1 from "../assets/leader1.png";
import leader2 from "../assets/leader1.png";
import leader3 from "../assets/leader1.png";
import leadershipBanner from "../assets/leadership-team.png";

interface Member {
  id: number;
  name: string;
  position: string;
  img: string;
}

interface CityData {
  id: number;
  name: string;
  img: string;
  headTable: Member[];
  coordinators: Member[];
  members: Member[];
}
const Leadership: React.FC = () => {
 
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  

    const cities: CityData[] = [
    {
      id: 1,
      name: "Vijayawada",
      img: city1,
      headTable: [
        { id: 1, name: "Harikrishna Prasad Dunga", position: "President", img: leader1 },
        { id: 2, name: "Kiran Kumar", position: "Vice President", img: leader2 },
        { id: 3, name: "Sai Teja", position: "Secretary", img: leader3 },
        { id: 4, name: "Ravi Varma", position: "Treasurer", img: leader1 },
      ],
      coordinators: [
        { id: 5, name: "Anil Kumar", position: "Coordinator", img: leader2 },
        { id: 6, name: "Venkatesh", position: "Coordinator", img: leader3 },
        { id: 7, name: "Mahesh", position: "Coordinator", img: leader1 },
      ],
      members: [
        { id: 8, name: "Suresh", position: "Member", img: leader2 },
        { id: 9, name: "Rajesh", position: "Member", img: leader3 },
        { id: 10, name: "Deepak", position: "Member", img: leader1 },
        { id: 11, name: "Praveen", position: "Member", img: leader2 },
      ],
    },
    {
      id: 2,
      name: "Indrakiladri",
      img: city2,
      headTable: [
        { id: 1, name: "Vijay Kumar", position: "President", img: leader3 },
        { id: 2, name: "Suresh Babu", position: "Vice President", img: leader2 },
      ],
      coordinators: [
        { id: 3, name: "Anand", position: "Coordinator", img: leader1 },
      ],
      members: [
        { id: 4, name: "Chaitanya", position: "Member", img: leader2 },
        { id: 5, name: "Raghav", position: "Member", img: leader3 },
      ],
    },
    {
      id: 3,
      name: "Amaravathi",
      img: city3,
      headTable: [
        { id: 1, name: "Siva Kumar", position: "President", img: leader1 },
      ],
      coordinators: [
        { id: 2, name: "Teja", position: "Coordinator", img: leader3 },
      ],
      members: [
        { id: 3, name: "Madhav", position: "Member", img: leader2 },
      ],
    },
  ];

  const tabs = ["Head Table", "Coordinators", "Members"];

  const [selectedCity, ] = useState<CityData>(cities[0]);
  const [activeTab, setActiveTab] = useState("Head Table");

  // Get members based on tab
  const currentData =
    activeTab === "Head Table"
      ? selectedCity.headTable
      : activeTab === "Coordinators"
      ? selectedCity.coordinators
      : selectedCity.members;
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
            src={leadershipBanner} 
            alt="We Konnects Community" 
            className="hero-banner-image"
          />
        </div>
      </section>

      {/* About Us Content Section */}
      <section className="about-content-section">
        <div className="about-us-badge">
          <h2>LEADERSHIP TEAM</h2>
        </div>
        
        <h1 className="about-heading">We Konnects Near by Team’s </h1>
        
        <p className="about-description">
         With We konnects, foster meaningful collaborations,
            unlock new business opportunities, and broaden your
            professional network for growth and success.
        </p>
 
        
      
      </section>

     <section className="leadership-section">
         <h1 className="about-heading">Our Leadership Team</h1>
      {/* ===== CITIES SCROLLER ===== */}
      <div className="cities-scroll">
        {cities.map((city) => (
          <div className="city-card" key={city.id}>
            <img src={city.img} alt={city.name} />
            <div className="city-info">
              <h4>{city.name}</h4>
              <button className="view-btn">View ➜</button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== TABS ===== */}
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

      {/* ===== TEAM GRID ===== */}
      <div className="team-grid">
        {currentData.map((leader: Member) => (
          <div key={leader.id} className="team-card">
            <img src={leader.img} alt={leader.name} />
            <div className="leader-info">
              <h5>{leader.name}</h5>
              <p>{leader.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>



    </div>
  );
};

export default Leadership;
