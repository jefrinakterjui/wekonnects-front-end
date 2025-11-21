import React from "react";
import { Plus } from "lucide-react";
import "../../components/layout/layout.css";

const PostJob: React.FC = () => {
  return (
    <div className="dashboard-content">
      <h1 className="page-title">Post Job</h1>

      {/* ===== JOB DETAILS BOX ===== */}
      <div className="postjob-card">
        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <label>Job Name</label>
              <input type="text" placeholder="Enter Job Name" />
            </div>

            <div className="form-group">
              <label>Salary Range</label>
              <select>
                <option>Select One</option>
                <option>10k - 20k</option>
                <option>20k - 50k</option>
                <option>50k - 1L</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Number of Vacancies</label>
              <input type="number" placeholder="Enter number of vacancies" />
            </div>

            <div className="form-group">
              <label>Job Type</label>
              <select>
                <option>Select Type</option>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Internship</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input type="text" placeholder="Select status" />
            </div>

            <div className="form-group">
              <label>Last Date of Job</label>
              <input type="date" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Job Mode</label>
              <input type="text" placeholder="Enter job mode (Remote / Office)" />
            </div>

            <div className="form-group">
              <label>Gender Type</label>
              <select>
                <option>Select One</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ===== JOB DESCRIPTION ===== */}
      <div className="postjob-section">
        <label>Job Description</label>
        <textarea placeholder="Enter job description here..."></textarea>
      </div>

      {/* ===== JOB QUALIFICATION ===== */}
      <div className="postjob-section">
        <div className="label-with-icon">
          <label>Job Qualification</label>
          <button className="add-btn">
            <Plus size={18} />
          </button>
        </div>
        <input type="text" placeholder="Add qualification..." />
      </div>

      {/* ===== REQUIRED SKILLS ===== */}
      <div className="postjob-section">
        <div className="label-with-icon">
          <label>Required Skills</label>
          <button className="add-btn">
            <Plus size={18} />
          </button>
        </div>
        <input type="text" placeholder="Add required skills..." />
      </div>

      {/* ===== BENEFITS ===== */}
      <div className="postjob-section">
        <label>Benefits</label>
        <input type="text" placeholder="Enter benefits..." />
      </div>

      {/* ===== SAVE BUTTON ===== */}
      <div className="form-actions">
        <button className="save-edit-btn">Save / Edit</button>
      </div>
    </div>
  );
};

export default PostJob;
