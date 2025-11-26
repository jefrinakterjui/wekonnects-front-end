import logo from "../assets/logo.png";
import googleBadge from "../assets/google-play.png";
import appBadge from "../assets/app-store.png";
import secureIcon from "../assets/icons/secure-icon.png";
import supportIcon from "../assets/icons/customer-support-icon.png";

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      {/* === Top Gradient Section === */}
      <div className="container footer-top">
        {/* === Left Column === */}
        <div className="footer-brand">
          <img src={logo} alt="We Konnects" className="footer-logo" />
          <p className="footer-desc">
            Book appointments with the best Doctors and Specialists such as
            Gynecologists, Skin Specialists, Child Specialists, Surgeons, etc.
            Avail test services such as MRI, etc.
            and Online Doctor Video Consultations all across Pakistan
            conveniently.
          </p>

          {/* Company Links */}
          <div className="footer-company">
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
        </div>

        {/* === Major Cities Columns === */}
        {/* {[1, 2, 3, 4, 5].map((col) => (
          <div key={col} className="footer-cities">
            <h4>Major Cities</h4>
            <ul>
              <li>Karachi</li>
              <li>Lahore</li>
              <li>Islamabad</li>
              <li>Rawalpindi</li>
              <li>Multan</li>
              <li>Peshawar</li>
              <li>Gujranwala</li>
              <li>Faisalabad</li>
              <li>Sargodha</li>
              <li>Bahawalpur</li>
              <li>Quetta</li>
              <li>Wah Cantt</li>
              <li>Hyderabad</li>
              <li>Wah Cantt</li>
              {col === 5 ? <li className="view-all">View All</li> : <li>Hyderabad</li>}
            </ul>
          </div>
        ))} */}
      </div>

      {/* === Support / Payment / Apps Section === */}
      <div className="footer-info">
        <div className="container footer-info-inner">
          <div className="footer-support">
            <div className="footer-support-item">
              <div className="footer-support-icon">
                {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10zm1-14h-2v6h2zm0 8h-2v2h2z"/>
                </svg> */}
                <img src={supportIcon} alt="Google Play" />
              </div>
              <div>
                <h5>12/7 customer support</h5>
                <p>Well-trained & Supportive team</p>
              </div>
            </div>

            <div className="footer-support-item">
              <div className="footer-support-icon">
                {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 0 1-8-8 7.9 7.9 0 0 1 .2-1.7l6.3 6.3a1 1 0 0 0 1.4-1.4l-6.3-6.3A7.9 7.9 0 0 1 12 4a8 8 0 0 1 0 16Z"/>
                </svg> */}
                <img src={secureIcon} alt="Google Play" />
              </div>
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

      {/* === Copyright Section (White Background) === */}
      <div className="footer-copy">
        © Copyright © 2015–2024 wekonnects – All Rights Reserved
      </div>
    </footer>
  );
}
