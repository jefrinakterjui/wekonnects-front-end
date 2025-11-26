import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import googleBadge from "../assets/google-play.png";
import appBadge from "../assets/app-store.png";
import secureIcon from "../assets/icons/secure-icon.png";
import supportIcon from "../assets/icons/customer-support-icon.png";
import "../styles/footer.css"; 
import { getAllCities } from "../api/api";

interface City {
  _id: string;
  name: string;
}

export default function Footer() {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await getAllCities();
        const data = res.data?.data || res.data || [];
        setCities(data);
      } catch (error) {
        console.error("Failed to load cities:", error);
      }
    };
    fetchCities();
  }, []);

  return (
    <footer className="site-footer">
      
      <div className="footer-header container">
        <img src={logo} alt="We Konnects" className="footer-logo" />
        <p className="footer-desc">
          Book appointments with the best Doctors and Specialists such as
          Gynecologists, Skin Specialists, Child Specialists, Surgeons, etc.
          Avail test services such as MRI, etc. and Online Doctor Video
          Consultations all across Pakistan conveniently.
        </p>
      </div>

      <div className="container footer-main-row">
        
        <div className="footer-column company-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About us</a></li>
            <li><a href="#">Privacy policy</a></li>
            <li><a href="#">Delivery Policy</a></li>
            <li><a href="#">Refund Policy</a></li>
            <li><a href="#">Payment Terms</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Cancellation Policy</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Process</a></li>
            <li><a href="#">Listing your Business</a></li>
            <li><a href="#">Advertisement with us</a></li>
          </ul>
        </div>

        <div className="footer-cities-grid">
          <h4 className="cities-heading">Major Cities</h4>
          <h4 className="cities-heading">Major Cities</h4>
          <h4 className="cities-heading">Major Cities</h4>
          <h4 className="cities-heading">Major Cities</h4>

          {cities.length > 0 ? (
             cities.slice(0, 20).map((city) => (
              <a key={city._id} href="#" className="city-link">
                {city.name}
              </a>
            ))
          ) : (
            <p>Loading cities...</p>
          )}
          
          <a href="#" className="city-link view-all">View All</a>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          
          {/* Support Items */}
          <div className="footer-support-group">
            <div className="support-item">
              <img src={supportIcon} alt="Support" />
              <div>
                <h5>12/7 customer support</h5>
                <p>Well-trained & Supportive team</p>
              </div>
            </div>

            <div className="support-item">
              <img src={secureIcon} alt="Secure" />
              <div>
                <h5>Secure online payment</h5>
                <p>We possess SSL / Secure certificate</p>
              </div>
            </div>
          </div>

          <div className="footer-badges">
            <img src={googleBadge} alt="Google Play" />
            <img src={appBadge} alt="App Store" />
          </div>
        </div>
      </div>

    </footer>
  );
}