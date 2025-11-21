import React from "react";
import "../../components/layout/layout.css";

const CreateEvent: React.FC = () => {
  return (
    <div className="dashboard-content">
      <h1 className="page-title">Create Event</h1>

      <div className="dashboard-card event-form">
        <h2 className="section-title">Events Management</h2>

        <div className="form-section">
          {/* === Event Name === */}
          <div className="form-group">
            <label>Event Name</label>
            <input type="text" placeholder="Enter Event Name" />
          </div>

          {/* === Event Image === */}
          <div className="form-group">
            <label>Events Image</label>
            <input type="file" />
          </div>

          {/* === Event Mode === */}
          <div className="form-group">
            <label>Event Mode</label>
            <select>
              <option>Select status</option>
              <option>Online</option>
              <option>Offline</option>
              <option>Hybrid</option>
            </select>
          </div>

          {/* === Description === */}
          <div className="form-group">
            <label>Desceration</label>
            <textarea rows={6} placeholder="Enter Event Description"></textarea>
          </div>

          {/* === Action Button === */}
          <div className="form-actions align-right">
            <button className="save-btn">Add Event</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
