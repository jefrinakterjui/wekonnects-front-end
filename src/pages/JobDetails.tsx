import React from "react";
import "../styles/jobdetails.css";
import logo from "../assets/icons/company-logo.png";

const JobDetails: React.FC = () => {
  return (
    <div className="jobdetails-container">

      {/* LEFT MAIN JOB DETAILS CARD */}
      <div className="jobdetails-left-card">

        {/* HEADER */}
        <h1 className="jobdetails-title">Design Lead</h1>

        <p className="jobdetails-company">Blue Holdings</p>
        <p className="jobdetails-summary">
          Assist users by resolving technical or service issues by overseeing data
          processing in a fast-paced environment.
        </p>

        {/* TOP META SECTION */}
        <div className="jobdetails-meta-row">
          <p>Malad, Mumbai</p>
          <p>Hybrid</p>
          <p>💰 ₹2000K-3000K</p>
          <p>👥 0 Applicants</p>
        </div>

        <div className="jobdetails-badges">
          <span className="badge green">Full Time</span>
          <span className="badge red">Deadline: 21/05/2025</span>
        </div>

        <div className="jobdetails-posted">
          Posted: <b>3 months ago</b> | Vacancy: 5 | Applicants: 0 | Gender: <b>Male</b>
        </div>

        <hr className="divider" />

        {/* SECTION 1 */}
        <div className="jobdetails-section">
          <div className="number">1</div>
          <h2 className="section-title">Job Description</h2>
        </div>

        <p className="jobdetails-text">
          We are looking for a talented Entry Level Front-End Developer with a
          strong design sense to create high-fidelity prototypes and production
          code that adheres to UX guidelines. You will work closely with our
          design and development team…
        </p>

        {/* SECTION 2 */}
        <div className="jobdetails-section">
          <div className="number">2</div>
          <h2 className="section-title">Requirements</h2>
        </div>

        <ul className="jobdetails-list">
          <li>Must have a Bachelor's or Master's degree.</li>
          <li>Good working knowledge of Javascript & jQuery.</li>
          <li>Strong HTML & CSS skills.</li>
          <li>WordPress experience preferred.</li>
        </ul>

        {/* SECTION 3 */}
        <div className="jobdetails-section">
          <div className="number">3</div>
          <h2 className="section-title">Qualifications</h2>
        </div>

        <ul className="jobdetails-list">
          <li>Bachelor’s degree</li>
          <li>BSC IT / MSc IT</li>
          <li>Any equivalent degree</li>
        </ul>

        {/* SECTION 4 */}
        <div className="jobdetails-section">
          <div className="number">4</div>
          <h2 className="section-title">Required Skills</h2>
        </div>

        <ul className="jobdetails-list">
          <li>2+ years designing digital products.</li>
          <li>Strong visual design portfolio.</li>
          <li>Launched several products.</li>
          <li>Experience working in agile teams.</li>
        </ul>

        {/* SECTION 5 */}
        <div className="jobdetails-section">
          <div className="number">5</div>
          <h2 className="section-title">Benefits</h2>
        </div>

        <ul className="jobdetails-list">
          <li>Remote-first company.</li>
          <li>Health insurance premiums covered.</li>
          <li>Vacation stipend.</li>
          <li>Company holidays.</li>
          <li>Gym & wellness stipend.</li>
        </ul>
      </div>

      {/* RIGHT COMPANY CARD */}
      <div className="jobdetails-right">
        <div className="jobdetails-company-card">
          <img src={logo} alt="logo" className="company-logo" />
          <h3 className="company-name">Dunga Technologies</h3>
          <a className="view-profile">View Company Profile</a>

          <div className="company-info">
            <p><b>Category</b>: IT</p>
            <p><b>Employees</b>: 40</p>
            <p><b>Founded</b>: 2025</p>
            <p><b>Location</b>: Vijayawada</p>
          </div>
        </div>

        <button className="all-jobs-btn">All Jobs</button>
      </div>
    </div>
  );
};

export default JobDetails;
