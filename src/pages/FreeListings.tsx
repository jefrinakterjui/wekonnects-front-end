import React, { useState } from "react";
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
} from "lucide-react";
import "../styles/freelistings.css";
import logo1 from "../assets/icons/company-logo.png";
import { useNavigate } from "react-router-dom";


const FreeListing: React.FC = () => {
const navigate = useNavigate();
const handleSearch = () => {
  navigate("/jobs/results"); 
}
  // -------------------------
  // CATEGORY CARDS
  // -------------------------
  const jobCategories = [
    { id: 1, title: "Customer Support", jobs: 165 },
    { id: 2, title: "Education/Training", jobs: 102 },
    { id: 3, title: "Research / Consultancy", jobs: 146 },
    { id: 4, title: "Production / Operation", jobs: 108 },
    { id: 5, title: "Health and Fitness", jobs: 139 },
    { id: 6, title: "Call Center", jobs: 136 },
    { id: 7, title: "Engineer / Architects", jobs: 134 },
    { id: 8, title: "Accounting / Finance", jobs: 130 },
  ];

  // -------------------------
  // FILTER BUTTONS
  // -------------------------
  const topFilters = [
    "All",
    "Accounting/Finance",
    "Production/Operation",
    "Bank/Non-Bank Fin .Institution",
    "Education/Training",
  ];

  const [activeFilter, setActiveFilter] = useState("All");

  // -------------------------
  // JOBS LIST (with category mapping)
  // -------------------------
  const jobsList = [
    {
      id: 1,
      logo: logo1,
      category: "Accounting/Finance",
      company: "Tech Technologies",
      role: "Data Coordinator",
      type: "Full Time",
      location: "Hyderabad",
      salary: "₹20K–30K",
    },
    {
      id: 2,
      logo: logo1,
      category: "Production/Operation",
      company: "Next Networks",
      role: "Software Engineer",
      type: "Full Time",
      location: "Chennai",
      salary: "₹25K–30K",
    },
    {
      id: 3,
      logo: logo1,
      category: "Education/Training",
      company: "Green Technologies",
      role: "Design Director",
      type: "Full Time",
      location: "Bangalore",
      salary: "₹40K–50K",
    },
    {
      id: 4,
      logo: logo1,
      category: "Accounting/Finance",
      company: "Smart Holdings",
      role: "Software Trainer",
      type: "Full Time",
      location: "Vijayawada",
      salary: "₹20K–25K",
    },
  ];

  // -------------------------
  // FILTERED JOBS
  // -------------------------
  const filteredJobs =
    activeFilter === "All"
      ? jobsList
      : jobsList.filter((job) => job.category === activeFilter);

  return (
    <div className="free-main">

      {/* HERO SECTION */}
      <section className="hero-container">
        <h1 className="hero-title">
          Discover More Than <span className="highlight">500+ Jobs</span>
        </h1>

        <p className="hero-subtext">
          It is an excellent platform for job seekers searching for new career
          heights and passionate about startups.
        </p>

        {/* SEARCH BAR */}
        <div className="search-wrapper">
          <div className="search-item">
            <Search size={22} />
            <input type="text" placeholder="Search by keyword" />
          </div>

          <div className="search-item">
            <BriefcaseBusiness size={22} />
            <select>
              <option>Select Job Type</option>
              <option>Full Time</option>
              <option>Part Time</option>
            </select>
          </div>

          <div className="search-item">
            <MapPin size={22} />
            <select>
              <option>Select Location</option>
              <option>Hyderabad</option>
              <option>Bangalore</option>
            </select>
          </div>

              <button
                className="search-btn1"
                onClick={handleSearch}
              >
                Search Job
              </button>

        </div>

        <p className="popular-searches">
          Popular Searches:
          <span> Job Seekers</span>, <span> Job Match</span>,
          <span> Salary Estimates</span>
        </p>
      </section>

      {/* CATEGORY SECTION */}
      <section className="category-section">
        <h2 className="section-title">
          Explore by <span className="purple">Category</span>
        </h2>

        <div className="category-grid">
          {jobCategories.map((cat) => (
            <div key={cat.id} className="category-card">
              <div className="cat-icon">
                <Building2 color="#8735BC" size={30} />
              </div>
              <h3>{cat.title}</h3>
              <p>{cat.jobs} jobs available</p>
              <ChevronRight className="cat-arrow" size={24} />
            </div>
          ))}
        </div>

        <p className="all-categories">All Categories →</p>
      </section>

      {/* HOT JOB SECTION */}
      <section className="hot-section">
        <h2 className="section-title">
          Top Hot 🔥 Job <span className="purple">Hiring Now</span>
        </h2>

        {/* FILTER BUTTONS */}
        <div className="filter-tabs">
          {topFilters.map((f) => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* JOB LIST */}
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
               <div className="job-top">
                <div className="job-logo-wrapper">
                  {/* render logo if present */}
                  {job.logo ? (
                    <img src={job.logo} alt={`${job.company} logo`} className="job-logo" />
                  ) : (
                    <div className="job-logo-placeholder" />
                  )}
                </div>
                <div className="job-type">{job.type}</div>
            </div>
              <h3 className="job-company">{job.company}</h3>
              <p className="job-role">{job.role}</p>

              <p className="job-description">
                Oversee production workflows and operations by managing tasks…
              </p>

              <div className="job-meta">
                <div className="meta-item">
                  <MapPin size={16} />
                  {job.location}
                </div>

                <div className="meta-item">
                  <BriefcaseBusiness size={16} />
                  {job.salary}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default FreeListing;
