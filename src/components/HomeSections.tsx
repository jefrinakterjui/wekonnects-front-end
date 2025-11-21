import stepsImg from "../assets/steps-image.jpg";
import foodBanner from "../assets/food-banner.png";
import city1 from "../assets/city1.png";
import city2 from "../assets/city2.png";
import city3 from "../assets/city3.png";
import city4 from "../assets/city4.png";
import gallery1 from "../assets/food-banner.png";

import { Building2, Users2, UserRound, Link, IndianRupee } from "lucide-react";

export default function HomeSections() {
  const cities = [
    { id: 1, name: "Hyderabad", img: city1 },
    { id: 2, name: "Bangalore", img: city2 },
    { id: 3, name: "Chennai", img: city3 },
    { id: 4, name: "Hampi", img: city4 },
  ];

  const stats = [
    { id: 1, icon: <Building2 size={40} />, label: "Cities", value: "50+" },
    { id: 2, icon: <Users2 size={40} />, label: "Groups", value: "100+" },
    { id: 3, icon: <UserRound size={40} />, label: "Members", value: "200+" },
    { id: 4, icon: <Link size={40} />, label: "Referral Links", value: "14000+" },
    { id: 5, icon: <IndianRupee size={40} />, label: "Turnover", value: "2.3cr+" },
  ];

  return (
    <section className="home-sections">
      <div className="container">
        {/* === 3 Steps to Success === */}
        <h2 className="steps-title">3 Steps to Success</h2>
        <p className="steps-sub">
          Get invited to a We Konnects networking meeting and witness the power of referrals in action.
        </p>
        <img src={stepsImg} alt="Steps to Success" className="steps-img" />

        {/* === Food Banner Section === */}
        <img src={foodBanner} alt="Food Banner" className="food-banner" />

        {/* === Explore Top Cities === */}
        <h2 className="cities-title">Explore Top Cities</h2>
        <div className="cities-grid">
          {cities.map((city) => (
            <div key={city.id} className="city-card">
              <img src={city.img} alt={city.name} className="city-img" />
              <div className="city-info">
                <h3>{city.name}</h3>
                <a href="#" className="city-link">
                  Explore &gt;
                </a>
              </div>
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

        {/* === Gallery Section === */}
        <h2 className="gallery-title">Gallery</h2>
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
      </div>
    </section>
  );
}
