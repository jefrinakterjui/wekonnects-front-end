/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import "../../components/layout/layout.css";
import { createCompanyProfile } from "../../api/api";
import toast from "react-hot-toast";

const CreateProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    establishmentYear: "",
    location: "",
    numberOfEmployees: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.companyName || !formData.location) {
      toast.error("Please fill required fields");
      return;
    }

    setLoading(true);
    try {
      await createCompanyProfile(formData);
      toast.success("Company Profile Created!");
      setFormData({
        companyName: "",
        establishmentYear: "",
        location: "",
        numberOfEmployees: "",
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-content">
      <h1 className="page-title">Company Profile</h1>

      <div className="create-profile-card">
        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <label>Company Name</label>
              <input name="companyName" type="text" placeholder="Company Name" value={formData.companyName} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Establishment Year</label>
              <input name="establishmentYear" type="text" placeholder="YYYY" value={formData.establishmentYear} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input name="location" type="text" placeholder="Location" value={formData.location} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Number of Employees</label>
              <input name="numberOfEmployees" type="text" placeholder="e.g. 50-100" value={formData.numberOfEmployees} onChange={handleChange} />
            </div>
          </div>

          <div className="form-actions">
            <button className="save-edit-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? "Saving..." : "Save / Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;