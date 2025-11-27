/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import "../../components/layout/layout.css";
import { createEvent } from "../../api/api";
import toast from "react-hot-toast";

const CreateEvent: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    mode: "Online",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.description || !imageFile) {
      toast.error("Please fill all fields");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("mode", formData.mode);
    data.append("description", formData.description);
    data.append("image", imageFile);
    data.append("status", "active");

    setLoading(true);
    try {
      await createEvent(data);
      toast.success("Event created successfully!");
      setFormData({ name: "", mode: "Online", description: "" });
      setImageFile(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-content">
      <h1 className="page-title">Create Event</h1>

      <div className="dashboard-card event-form">
        <h2 className="section-title">Events Management</h2>

        <div className="form-section">
          <div className="form-group">
            <label>Event Name</label>
            <input 
                type="text" 
                placeholder="Enter Event Name" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Events Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} />
          </div>

          <div className="form-group">
            <label>Event Mode</label>
            <select value={formData.mode} onChange={(e) => setFormData({ ...formData, mode: e.target.value })}>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
                rows={6} 
                placeholder="Enter Event Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          <div className="form-actions align-right">
            <button className="save-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? "Creating..." : "Add Event"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;