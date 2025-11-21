import React, { useState } from 'react';
import "../styles/about.css";
import logo from "../assets/logo.png";
import founderImg from "../assets/founder.png";
import eventImg1 from "../assets/about1.png";
import eventImg2 from "../assets/event2.png";
import eventImg3 from "../assets/event3.png";
import eventImg4 from "../assets/event4.png";
import { MapPin, Mic, Search } from 'lucide-react';
// Timeline data
const timelineData = [
  {
    year: '2019',
    title: 'Connected through WhatsApp Group',
    description: 'In 2019, We Connects was born as an innovative networking platform via a simple WhatsApp group. It started with a small community of professionals eager to connect and collaborate.'
  },
  {
    year: '2020',
    title: 'Connected through WhatsApp Group',
    description: 'In 2019, We Connects was born as an innovative networking platform via a simple WhatsApp group. It started with a small community of professionals eager to connect and collaborate.'
  },
  {
    year: '2021',
    title: 'Early Adoption',
    description: 'The informal group quickly gained momentum, with members actively engaging in discussions, sharing business ideas, and providing support to each other.'
  },
  {
    year: '2022',
    title: 'Early Adoption',
    description: 'The informal group quickly gained momentum, with members actively engaging in discussions, sharing business ideas, and providing support to each other.'
  },
  {
    year: '2023',
    title: 'Vision for Expansion',
    description: 'This year marked the foundational phase where the goal of creating a formal platform for structured business networking became clearer, setting the stage for future growth.'
  },
  {
    year: '2024',
    title: 'Vision for Expansion',
    description: 'This year marked the foundational phase where the goal of creating a formal platform for structured business networking became clearer, setting the stage for future growth.'
  },
  {
    year: '2025',
    title: 'Current Growth',
    description: 'Continuing to expand and help small entrepreneurs become business tycoons through meaningful networking and collaboration.'
  }
];

const AboutUs: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2019');

  const selectedTimeline = timelineData.find(item => item.year === selectedYear) || timelineData[0];

  const handleJoinNow = () => {
    // Add your navigation logic here
    window.location.href = '/signup';
  };
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
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
          <h2>ABOUT US</h2>
        </div>
        
        <h1 className="about-heading">We konnects</h1>
        
        <p className="about-description">
          With We Connects, foster meaningful collaborations, unlock new business opportunities, and broaden your professional network for growth and success.
        </p>

        {/* Images Grid */}
        <div className="images-grid">
          <img 
            src={eventImg1}
            alt="Networking Event 1" 
            className="grid-image top-left"
          />
          <img 
            src={founderImg}
            alt="Main Event" 
            className="grid-image center"
          />
          <img 
            src={eventImg2} 
            alt="Networking Event 2" 
            className="grid-image bottom-left"
          />
          <img 
            src={eventImg3}
            alt="Networking Event 3" 
            className="grid-image top-right"
          />
          <img 
            src={eventImg4}
            alt="Networking Event 4" 
            className="grid-image bottom-right"
          />
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="timeline-container">
          <div className="timeline-years">
            {timelineData.map((item) => (
              <button
                key={item.year}
                className={`year-button ${selectedYear === item.year ? 'active' : ''}`}
                onClick={() => setSelectedYear(item.year)}
              >
                {item.year}
              </button>
            ))}
          </div>
          
          <div className="timeline-content">
            <h3 className="timeline-title">{selectedTimeline.title}</h3>
            <p className="timeline-description">{selectedTimeline.description}</p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="founder-section">
        <h2 className="founder-heading">Meet Our Founder</h2>
        
        <div className="founder-container">
          <div className="founder-image-wrapper">
            <img 
              src={founderImg}
              alt="KVN Sai Babu - Founder" 
              className="founder-image"
            />
          </div>
          
          <div className="founder-content">
            <p className="founder-intro">
              KVN Sai Babu, the founder & CEO of wekonnects, is a visionary leader with a passion for connecting businesses and fostering growth. With extensive experience in business development, he has shaped a pivotal role in shaping wekonnects into a trusted platform for entrepreneurs. His expertise has been instrumental in driving the success of wekonnects, helping it evolve into a trusted network for entrepreneurs and professionals alike.
            </p>
            
            {/* <div className="founder-highlights">
              <div className="highlight-item">
                <span className="highlight-icon">👤</span>
                <div>
                  <strong>Founder & CEO of wekonnects:</strong> KVN Sai Babu is the driving force behind the establishment and success of wekonnects, a platform aimed at building strong business communities.
                </div>
              </div>
              
              <div className="highlight-item">
                <span className="highlight-icon">💼</span>
                <div>
                  <strong>Experienced Business Leader:</strong> With over 15 years of expertise in business, and also has worked with more than 2,000 clients, making him a trusted name in the industry.
                </div>
              </div>
              
              <div className="highlight-item">
                <span className="highlight-icon">🎯</span>
                <div>
                  <strong>Visionary and Strategist:</strong> His forward-thinking approach has enabled wekonnects to become a thriving network, connecting professionals and businesses across multiple industries.
                </div>
              </div>
              
              <div className="highlight-item">
                <span className="highlight-icon">📈</span>
                <div>
                  <strong>Commitment to Growth:</strong> Under his leadership, wekonnects has continuously expanded, offering entrepreneurs a platform to collaborate and grow together.
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <h2 className="mission-heading">
          Helping small entrepreneurs to become business tycoons
        </h2>
        
        <div className="mission-cards">
          <div className="mission-card">
            <div className="mission-icon">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="20" r="8" fill="#4A90E2"/>
                <circle cx="15" cy="35" r="6" fill="#4A90E2"/>
                <circle cx="45" cy="35" r="6" fill="#4A90E2"/>
                <line x1="30" y1="28" x2="15" y2="29" stroke="#4A90E2" strokeWidth="2"/>
                <line x1="30" y1="28" x2="45" y2="29" stroke="#4A90E2" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Networking</h3>
            <p>Build meaningful connections that foster collaboration and create new opportunities.</p>
          </div>
          
          <div className="mission-card">
            <div className="mission-icon">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <rect x="15" y="35" width="8" height="15" fill="#4A90E2"/>
                <rect x="26" y="25" width="8" height="25" fill="#4A90E2"/>
                <rect x="37" y="15" width="8" height="35" fill="#4A90E2"/>
              </svg>
            </div>
            <h3>Business Growth</h3>
            <p>Build meaningful connections that foster collaboration and create new opportunities.</p>
          </div>
          
          <div className="mission-card">
            <div className="mission-icon">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path d="M25 20L35 30L25 40" stroke="#4A90E2" strokeWidth="3" fill="none"/>
                <path d="M35 20L25 30L35 40" stroke="#4A90E2" strokeWidth="3" fill="none"/>
              </svg>
            </div>
            <h3>Collaboration</h3>
            <p>Build meaningful connections that foster collaboration and create new opportunities.</p>
          </div>
        </div>
      </section>

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

export default AboutUs;