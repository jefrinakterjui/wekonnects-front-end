import React, { useState } from "react";
import "../../components/layout/layout.css";
import { MoreVertical } from "lucide-react";

interface JobData {
  id: string;
  date: string;
  company: string;
  role: string;
  status: string;
}

const ApplyJobsList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(3);

  // Static data for now
  const jobs: JobData[] = [
    { id: "#004562", date: "26 March 2024, 12:42 AM", company: "Harikrishna", role: "9999999999", status: "Vijayawada" },
    { id: "#004562", date: "26 March 2024, 12:42 AM", company: "Harikrishna", role: "9999999999", status: "Vijayawada" },
    { id: "#00456", date: "26 March 2024, 01:42 PM", company: "Harikrishna", role: "9999999999", status: "Vijayawada" },
    { id: "#00456", date: "26 March 2024, 01:42 PM", company: "Harikrishna", role: "9999999999", status: "Vijayawada" },
    { id: "#004561", date: "26 March 2024, 12:42 AM", company: "Harikrishna", role: "9999999999", status: "Vijayawada" },
    { id: "#00451", date: "26 March 2024, 12:42 AM", company: "Harikrishna", role: "9999999999", status: "Vijayawada" },
    { id: "#00451", date: "26 March 2024, 12:42 AM", company: "Harikrishna", role: "9999999999", status: "Vijayawada" },
    { id: "#00459", date: "26 March 2024, 12:42 AM", company: "Harikrishna", role: "9999999999", status: "Vijayawada" },
    { id: "#00458", date: "26 March 2024, 12:42 AM", company: "Harikrishna", role: "9999999999", status: "Vijayawada" },
    { id: "#00457", date: "26 March 2024, 02:12 AM", company: "Harikrishna", role: "9999999999", status: "Vijayawada" },
  ];

  return (
    <div className="dashboard-content">
      <h1 className="page-title">Apply Jobs List</h1>

      {/* ===== TABLE CONTAINER ===== */}
      <div className="applyjobs-table">
        <table>
          <thead>
            <tr>
              <th>Job Id</th>
              <th>Apply Date</th>
              <th>Company Name</th>
              <th>Job Role</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr
                key={job.id + index}
                className={ ""}
              >
                <td>{job.id}</td>
                <td>{job.date}</td>
                <td>{job.company}</td>
                <td>{job.role}</td>
                <td>{job.status}</td>
                <td className="view-icon">
                  <MoreVertical size={18} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ===== PAGINATION ===== */}
        <div className="pagination-container">
          <button className="pagination-btn prev">⟪ Previous</button>
          <div className="pagination-numbers">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                className={`page-num ${num === currentPage ? "active" : ""}`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <button className="pagination-btn next">Next ⟫</button>
        </div>
        <p className="pagination-info">Showing 10 from 46 data</p>
      </div>
    </div>
  );
};

export default ApplyJobsList;
