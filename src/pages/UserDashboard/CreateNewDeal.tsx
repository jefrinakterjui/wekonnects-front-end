// CreateNewDealForm.tsx
import React, { useState } from "react";
import "./UserDashboard.css"; 

const CreateNewDeal: React.FC = () => {
  const [formData, setFormData] = useState({
    givenByName: "Harikrishna Prasad Dunga",
    date: "2025-06-22",
    memberType: "",
    name: "",
    phoneNumber: "",
    groupName: "",
    requirements: "",
    dealStatus: "",
    dealAmount: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Deal Submitted:", formData);
    alert("Deal created successfully!");
  };

  return (
    <div className="create-deal-container">
      <h2 className="deal-form-title">Create New Deal</h2>

      <form onSubmit={handleSubmit} className="deal-form">

        {/* Row 1: Given By Name, Date, Member Type */}
        <div className="form-row top-row">
          <div className="input-group">
            <label>Given By Name</label>
            <input
              type="text"
              name="givenByName"
              value={formData.givenByName}
              onChange={handleChange}
              readOnly
              className="readonly-input"
            />
          </div>

          <div className="input-group date-group">
            <label>Date</label>
            <div className="date-wrapper">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              <span className="calendar-icon">Calendar</span>
            </div>
          </div>

          <div className="input-group">
            <label>Member Type</label>
            <input
              type="text"
              name="memberType"
              value={formData.memberType}
              onChange={handleChange}
              placeholder="e.g. Premium, Regular"
            />
          </div>
        </div>

        {/* Row 2: Name, Phone Number, Group Name */}
        <div className="form-row">
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          <div className="input-group">
            <label>Group Name</label>
            <input
              type="text"
              name="groupName"
              value={formData.groupName}
              onChange={handleChange}
              placeholder="Enter group name"
            />
          </div>
        </div>

        {/* Row 3: Requirements + Deal Status & Amount */}
        <div className="form-row bottom-row">
          <div className="input-group textarea-group">
            <label>Requirements</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={6}
              placeholder="Describe the requirements..."
            />
          </div>

          <div className="right-column">
            <div className="input-group">
              <label>Deal Status</label>
              <input
                type="text"
                name="dealStatus"
                value={formData.dealStatus}
                onChange={handleChange}
                placeholder="e.g. Pending, Confirmed, Closed"
              />
            </div>

            <div className="input-group">
              <label>Deal Amount</label>
              <input
                type="text"
                name="dealAmount"
                value={formData.dealAmount}
                onChange={handleChange}
                placeholder="Enter amount"
              />
            </div>

            <button type="submit" className="confirm-btn">
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNewDeal;