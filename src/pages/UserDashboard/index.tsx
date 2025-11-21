import React, { useState } from "react";
import { Plus, } from "lucide-react";
import "./UserDashboard.css";

const UserDashboardPage: React.FC = () => {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showOneToOneModal, setShowOneToOneModal] = useState(false);

  // Mock data (replace with API later)
  const stats = {
    linksReceived: 150008,
    dealsGiven: 1050501,
    dealsReceived: 1050501,
    oneToOneCount: 0,
    attendanceCount: 0,
    totalPoints: 1050501,
  };

  return (
    <div className="user-dashboard-container">
      {/* Top Purple Bar */}
      <div className="top-stats-bar">
        <div className="top-stat-item">
          <button className="plus-btn" onClick={() => setShowLinkModal(true)}>
            <Plus size={28} />
          </button>
          <p>Create Link Given</p>
        </div>
        <div className="top-stat-item">
          <button className="plus-btn" onClick={() => setShowOneToOneModal(true)}>
            <Plus size={28} />
          </button>
          <p>Create one to one</p>
        </div>
        <div className="top-stat-item">
          <span className="count">15</span>
          <p>Link Received</p>
        </div>
        <div className="top-stat-item highlight">
          <span className="count">1.3K</span>
          <p>Deals Given</p>
        </div>
        <div className="top-stat-item highlight">
          <span className="count">98.6K</span>
          <p>Deal Received</p>
        </div>
      </div>

      {/* Individual Stats */}
      <div className="stats-section">
        <h3 className="section-title">Individual Business</h3>
        <div className="stats-grid">
          <div className="stat-box red-gradient">
            <p className="stat-label">Links Received</p>
            <p className="stat-value">{stats.linksReceived.toLocaleString()}</p>
          </div>
          <div className="stat-box red-gradient">
            <p className="stat-label">Deals Given</p>
            <p className="stat-value">{stats.dealsGiven.toLocaleString()}</p>
          </div>
          <div className="stat-box red-gradient">
            <p className="stat-label">Deals Received</p>
            <p className="stat-value">{stats.dealsReceived.toLocaleString()}</p>
          </div>
          <div className="stat-box red-gradient">
            <p className="stat-label">One to one count</p>
            <p className="stat-value">Rs 0.00</p>
          </div>
          <div className="stat-box red-gradient">
            <p className="stat-label">Attendance count</p>
            <p className="stat-value">Rs 0.00</p>
          </div>
          <div className="stat-box red-gradient">
            <p className="stat-label">Total Points</p>
            <p className="stat-value">{stats.totalPoints.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Group Business */}
      <div className="stats-section">
        <h3 className="section-title purple">Group Business</h3>
        <div className="stats-grid">
          <div className="stat-box red-gradient">
            <p className="stat-label">Links Received</p>
            <p className="stat-value">{stats.linksReceived.toLocaleString()}</p>
          </div>
          <div className="stat-box red-gradient">
            <p className="stat-label">Deals Given</p>
            <p className="stat-value">{stats.dealsGiven.toLocaleString()}</p>
          </div>
          <div className="stat-box red-gradient">
            <p className="stat-label">Deals Received</p>
            <p className="stat-value">{stats.dealsReceived.toLocaleString()}</p>
          </div>
          <div className="stat-box red-gradient full-width">
            <p className="stat-label">Deals Received</p>
            <p className="stat-value">{stats.dealsReceived.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showLinkModal && (
        <div className="modal-overlay" onClick={() => setShowLinkModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create Link Given</h2>
            <form className="modal-form">
              <input type="text" placeholder="Member Name" required />
              <input type="tel" placeholder="Phone Number" required />
              <input type="text" placeholder="Business Category" required />
              <textarea placeholder="Remarks (Optional)" rows={3}></textarea>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowLinkModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showOneToOneModal && (
        <div className="modal-overlay" onClick={() => setShowOneToOneModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create One to One</h2>
            <form className="modal-form">
              <input type="text" placeholder="With Member Name" required />
              <input type="date" required />
              <input type="text" placeholder="Location" required />
              <textarea placeholder="Discussion Points" rows={4}></textarea>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowOneToOneModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Schedule One-to-One
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboardPage;