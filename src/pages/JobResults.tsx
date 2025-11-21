import React from "react";
import "./../styles/jobresults.css";
import { MapPin,  } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo1 from "../assets/icons/company-logo.png"; // replace with your assets
const JobResults: React.FC = () => {
  const navigate = useNavigate();


const openJob = (id: number) => {
  navigate(`/jobs/${id}`);
};
//   const [filters, setFilters] = useState({
//     category: "",
//     type: "",
//     experience: "",
//   });

  const jobs = [
    {
      id: 1,
      logo: logo1,
      title: "Design Lead",
      company: "Blue Holdings",
      location: "Mumbai, Mumbai",
      type: "Full Time",
      salary: "₹20K–30K",
      applicants: "8 Applicants",
      posted: "3 Months ago",
    },
    {
      id: 2,
      logo: logo1,
      title: "Software Developer",
      company: "Tech Solutions",
      location: "Hyderabad, Telangana",
      type: "Full Time",
      salary: "₹25K–35K",
      applicants: "6 Applicants",
      posted: "3 Months ago",
    },
    {
      id: 3,
      logo: logo1,
      title: "Finance Trainer",
      company: "Future Corp",
      location: "Uptown, Houston",
      type: "Full Time",
      salary: "₹30K–45K",
      applicants: "8 Applicants",
      posted: "3 Months ago",
    },
    {
      id: 4,
      logo: logo1,
      title: "Finance Trainer",
      company: "Future Corp",
      location: "Uptown, Houston",
      type: "Full Time",
      salary: "₹30K–45K",
      applicants: "8 Applicants",
      posted: "3 Months ago",
    },
    {
      id: 5,
      logo: logo1,
      title: "Finance Trainer",
      company: "Future Corp",
      location: "Uptown, Houston",
      type: "Full Time",
      salary: "₹30K–45K",
      applicants: "8 Applicants",
      posted: "3 Months ago",
    },
  ];

  return (
    <div className="jr-wrapper">

      {/* LEFT FILTER PANEL */}
      <aside className="jr-filter-card">
        <h2 className="jr-filter-title">All Filters</h2>
         <hr></hr>

        {/* Category */}
        <div className="jr-filter-section">
          <h4>Category</h4>
          <ul>
            <li><input type="checkbox" /> Customer Support (155)</li>
            <li><input type="checkbox" /> Education/Training (155)</li>
            <li><input type="checkbox" /> Research / Consultancy (155)</li>
          </ul>
          <p className="jr-load-more">Load More</p>
        </div>
        <hr></hr>

        {/* Job Type */}
        <div className="jr-filter-section">
          <h4>Job Type</h4>
          <ul>
            <li><input type="checkbox" /> Full Time (155)</li>
            <li><input type="checkbox" /> Part Time (155)</li>
            <li><input type="checkbox" /> Work from Home (155)</li>
          </ul>
          <p className="jr-load-more">Load More</p>
        </div>
 <hr></hr>
        {/* Experience */}
        <div className="jr-filter-section">
          <h4>Experience</h4>
          <ul>
            <li><input type="checkbox" /> 2–3 Years (155)</li>
            <li><input type="checkbox" /> 4–5 Years (155)</li>
            <li><input type="checkbox" /> 1–2 Years (155)</li>
          </ul>
          <p className="jr-load-more">Load More</p>
        </div>
      </aside>

      {/* RIGHT JOB LIST PANEL */}
      <main className="jr-results-card">

        <h2 className="jr-total-jobs">
          Showing total <span>155</span> jobs
        </h2>

        {jobs.map((job) => (
            
          <div key={job.id} className="jr-job-box">

            {/* LEFT LOGO */}
            <img src={job.logo} className="jr-job-logo" alt="company logo" />

            {/* MIDDLE DETAILS */}
            <div className="jr-job-info">
              <h3 className="jr-job-title">{job.title}</h3>
              <p className="jr-job-company">{job.company}</p>

              <div className="jr-job-tags">
                <span className="jr-tag green">{job.type}</span>
                <span className="jr-tag purple">{job.salary}</span>
                <span className="jr-tag gray">{job.applicants}</span>
              </div>

              <div className="jr-job-meta">
                <MapPin size={14} /> <span>{job.location}</span>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="jr-right-info">
             <button className="view-btn" onClick={() => openJob(job.id)}>
                View
            </button>
              <p className="jr-posted">{job.posted}</p>

            </div>
       
          </div>
           
        ))}

        {/* PAGINATION */}
        <div className="jr-pagination">
          <button className="jr-prev">⟪ Previous</button>

          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              className={`jr-page ${page === 3 ? "active" : ""}`}
            >
              {page}
            </button>
          ))}

          <button className="jr-next">Next ⟫</button>
        </div>

      </main>
    </div>
  );
};

export default JobResults;
