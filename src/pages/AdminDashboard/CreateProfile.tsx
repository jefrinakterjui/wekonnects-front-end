import React from "react";
import "../../components/layout/layout.css";

const CreateProfile: React.FC = () => {
  return (
    <div className="dashboard-content">
      {/* ======= PAGE TITLE ======= */}
      <h1 className="page-title">Company Profile</h1>

      {/* ======= MAIN BOX ======= */}
      <div className="create-profile-card">
        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <label>Company Name</label>
              <input type="text" placeholder="Company Name" />
            </div>

            <div className="form-group">
              <label>Establishment Year</label>
              <input type="text" placeholder="Establishment Year" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input type="text" placeholder="Location" />
            </div>

            <div className="form-group">
              <label>Number of Employees</label>
              <input type="text" placeholder="Number of Employees" />
            </div>
          </div>

          <div className="form-actions">
            <button className="save-edit-btn">Save / Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
