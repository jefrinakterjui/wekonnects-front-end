// DealRatingForm.tsx
import React, { useState } from "react";
import { Star, Calendar } from "lucide-react";
import "./UserDashboard.css";

const DealRating: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    console.log("Rating:", rating, "Feedback:", feedback);
    alert("Thank you! Your rating & feedback has been submitted.");
    // Reset form if needed
    setRating(0);
    setFeedback("");
  };

  return (
    <div className="deal-rating-container">
      <h2 className="page-title">Give Rating & Feedback</h2>

      <form onSubmit={handleSubmit} className="rating-form">

        {/* Top Row */}
        <div className="form-row top-row">
          <div className="input-group">
            <label>Receiver's Name</label>
            <input type="text" value="Harikrishna Prasad Dunga" readOnly className="readonly" />
          </div>

          <div className="input-group date-group">
            <label>Date</label>
            <div className="date-wrapper">
              <input type="text" value="22/06/1997" readOnly />
              <Calendar className="calendar-icon" size={20} />
            </div>
          </div>

          <div className="input-group">
            <label>Member Type</label>
            <input type="text" placeholder="e.g. Premium" />
          </div>
        </div>

        {/* Middle Row */}
        <div className="form-row">
          <div className="input-group">
            <label>Name</label>
            <input type="text" placeholder="Enter name" />
          </div>
          <div className="input-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="Enter phone" />
          </div>
          <div className="input-group">
            <label>Group Name</label>
            <input type="text" placeholder="Enter group" />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="form-row bottom-section">
          <div className="input-group textarea-group">
            <label>Requirements</label>
            <textarea rows={6} placeholder="Describe the requirements..." readOnly className="readonly" />
          </div>

          <div className="right-column">
            <div className="input-group">
              <label>Deal Status</label>
              <input type="text" placeholder="e.g. Closed" readOnly />
            </div>

            <div className="input-group">
              <label>Deal Amount</label>
              <input type="text" placeholder="₹50,000" readOnly />
            </div>

            {/* Feedback */}
            <div className="input-group feedback-group">
              <label>Write your valuable Feedback</label>
              <textarea
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your experience..."
                required
              />
            </div>

            {/* Star Rating */}
            <div className="star-rating-group">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    size={48}
                    className="star-icon"
                    fill={value <= (hoveredRating || rating) ? "#FFC107" : "none"}
                    color={value <= (hoveredRating || rating) ? "#FFC107" : "#e0e0e0"}
                    strokeWidth={2}
                    onClick={() => handleStarClick(value)}
                    onMouseEnter={() => setHoveredRating(value)}
                    onMouseLeave={() => setHoveredRating(0)}
                    style={{ cursor: "pointer", transition: "all 0.2s" }}
                  />
                ))}
              </div>
            </div>

            {/* Save Button */}
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DealRating;