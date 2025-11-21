import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { createState } from "../../api/api";
import "../../components/layout/layout.css";

interface FormData {
  name: string;
  status: "active" | "inactive";
}

const CreateState: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    status: "active",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Handle text/select change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    setFileName(file ? file.name : "No file chosen");
    setError(null);
  };

  // Submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("State name is required.");
      return;
    }
    if (!imageFile) {
      setError("Please upload a state image.");
      return;
    }

    const payload = new FormData();
    payload.append("name", formData.name.trim());
    payload.append("status", formData.status);
    payload.append("image", imageFile); // key must match backend: req.file('image')

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await createState(payload);
      setSuccess(true);

      // Reset form
      setFormData({ name: "", status: "active" });
      setImageFile(null);
      setFileName("No file chosen");
      // Reset file input
      const fileInput = document.getElementById("state-image") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create state");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-content">
      <h1 className="page-title">Create State</h1>

      <div className="dashboard-card">
        <h2 className="section-title">State Management</h2>

        <form className="form-section" onSubmit={handleSubmit}>
          {/* State Name */}
          <div className="form-group full-width">
            <label>State Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Enter state name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* State Image */}
          <div className="form-group full-width">
            <label>State Image *</label>
            <div className="file-upload-container">
              <label htmlFor="state-image" className="file-btn">
                Choose File
              </label>
              <span className="file-name">{fileName}</span>
              <input
                id="state-image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>

          {/* State Status */}
          <div className="form-group full-width">
            <label>State Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Messages */}
          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">State created successfully!</p>}

          {/* Submit */}
          <div className="form-actions">
            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add State"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateState;