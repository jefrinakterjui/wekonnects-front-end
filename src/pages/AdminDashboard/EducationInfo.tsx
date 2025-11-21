import React from "react";
import "../../components/layout/layout.css";

const EducationInfo: React.FC = () => {
  return (
    <div className="dashboard-content">
      <h1 className="page-title">Education Info</h1>

      <div className="dashboard-card">
        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <label>Level of Education</label>
              <select>
                <option>Select One</option>
                <option>High School</option>
                <option>Bachelor’s</option>
                <option>Master’s</option>
              </select>
            </div>

            <div className="form-group">
              <label>Exam/Degree</label>
              <select>
                <option>Select One</option>
                <option>B.Sc</option>
                <option>MBA</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>University / Institute</label>
              <input type="text" placeholder="Enter University Name" />
            </div>

            <div className="form-group">
              <label>Group</label>
              <input type="text" placeholder="Enter Group Name" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>CGPA / Marks</label>
              <input type="text" placeholder="Enter Marks" />
            </div>

            <div className="form-group">
              <label>Scale</label>
              <input type="text" placeholder="Enter Scale" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Duration</label>
              <div className="duration-field">
                <input type="text" placeholder="Enter Duration" />
                <span className="duration-label">Year</span>
              </div>
            </div>

            <div className="form-group">
              <label>Year of Pass</label>
              <input type="text" placeholder="Enter Year of Passing" />
            </div>
          </div>

          <div className="form-actions">
            <button className="save-btn">Save / Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationInfo;
