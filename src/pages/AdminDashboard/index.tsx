import React, { useEffect, useState } from "react";
import "../../components/layout/layout.css";
import {
  Users,
  Briefcase,
  Megaphone,
  FileText,
  Filter,
  Calendar,
} from "lucide-react";
import { getDashboardStats } from "../../api/api"; 
// Fix 1: Correct interface to match actual API response
interface DashboardStats {
  totalUsers: number;         // ← Fixed: was totalusers
  totalCategories: number;
  totalListings: number;      // ← Fixed: was totallistings
  pendingListings: number;
  totalActiveUsers: number;
}
const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        
        if (response.data?.data) {
          setStats(response.data?.data);
        } else {  
          setError("Failed to load stats");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Fallback values while loading
  const display = {
    activeUsers: stats?.totalActiveUsers ?? 0,
    totalUsers: stats?.totalUsers ?? 0,
    totalCategories: stats?.totalCategories ?? 0,
    totalListings: stats?.totalListings ?? 0,
    pendingListings: stats?.pendingListings ?? 0,
 
    approvedListings: (stats?.totalListings ?? 0) - (stats?.pendingListings ?? 0),
    rejectedListings: 0, 
  };

  if (loading) {
    return <div className="dashboard-home">Loading dashboard stats...</div>;
  }

  if (error) {
    return <div className="dashboard-home">Error: {error}</div>;
  }

  return (
    <div className="dashboard-home">
      {/* ======= PAGE HEADER ======= */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Welcome to Admin!</p>
        </div>
        <div className="dashboard-filters">
          <div className="filter-btn">
            <span>
              <Filter size={18} color="#8735BC" /> Filter
            </span>
          </div>
          <div className="filter-btn">
            <span>
              <Calendar size={18} color="#8735BC" /> Filter Period
            </span>
            <p className="filter-date">4 June 2024 – 4 July 2024</p>
          </div>
        </div>
      </div>

      {/* ======= DASHBOARD STATS ======= */}
      <div className="stats-grid">
        <div className="stat-card">
          <FileText className="stat-icon" color="#F58220" size={48} />
          <div>
            <h2>{display.totalUsers}</h2>
            <p>Total Users </p>
          </div>
        </div>
        <div className="stat-card">
          <Briefcase className="stat-icon" color="#F58220" size={48} />
          <div>
            <h2>{display.totalCategories}</h2>
            <p>Total Categories</p>
          </div>
        </div>
        <div className="stat-card">
          <Megaphone className="stat-icon" color="#F58220" size={48} />
          <div>
            <h2>{display.pendingListings}</h2>
            <p>Pending Listings</p>
          </div>
        </div>
        <div className="stat-card">
          <Megaphone className="stat-icon" color="#F58220" size={48} />
          <div>
            <h2>{display.totalListings}</h2>
            <p>Total Listings</p>
          </div>
        </div>
        <div className="stat-card">
          <Users className="stat-icon" color="#F58220" size={48} />
          <div>
            <h2>{display.activeUsers.toLocaleString()}</h2>
            <p>Active Users</p>
          </div>
        </div>
      </div>

      {/* ======= BUSINESS LISTING + USER ANALYTICS ======= */}
      {/* <div className="analytics-container">
        <div className="business-listing-card">
          <div className="card-header">
            <h3>Business Listing</h3>
            <div className="time-tabs">
              <button>Monthly</button>
              <button>Weekly</button>
              <button className="active">Today</button>
            </div>
          </div>
          <div className="listing-summary">
            <div className="summary-box">
              <div className="summary-count green-bg">{display.totalListings}</div>
              <span>New ●</span>
              <a href="#" className="manage-link">Manage ›</a>
            </div>
            <div className="summary-cards">
              <div className="mini-card">
                <h4>{display.totalListings}</h4>
                <p>Total Listings</p>
              </div>
              <div className="mini-card">
                <h4>{display.approvedListings}</h4>
                <p>Approved</p>
              </div>
              <div className="mini-card">
                <h4>{display.rejectedListings}</h4>
                <p>Rejected</p>
              </div>
            </div>
            <div className="chart-section">
              <div className="chart-pie"></div>
              <div className="chart-bars">
                <div className="bar-row">
                  <span>Total Taxes</span>
                  <div className="bar blue-bar" style={{ width: `${(display.totalListings / 30) * 100}%` }}></div>
                  <span className="bar-value">{display.totalListings}</span>
                </div>
                <div className="bar-row">
                  <span>Paid Taxes</span>
                  <div className="bar red-bar" style={{ width: `${(display.approvedListings / 30) * 100}%` }}></div>
                  <span className="bar-value">{display.approvedListings}</span>
                </div>
                <div className="bar-row">
                  <span>Pending Taxes</span>
                  <div className="bar green-bar" style={{ width: `${(display.pendingListings / 30) * 100}%` }}></div>
                  <span className="bar-value">{display.pendingListings}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="user-analytics-card">
          <div className="card-header">
            <h3>User Analytics</h3>
            <div className="time-tabs">
              <button>Monthly</button>
              <button>Weekly</button>
              <button className="active">Today</button>
            </div>
          </div>
          <div className="summary-cards">
            <div className="mini-card">
              <h4>{display.totalUsers.toLocaleString()}</h4>
              <p>Total Users</p>
            </div>
            <div className="mini-card">
              <h4>{display.activeUsers.toLocaleString()}</h4>
              <p>Active</p>
            </div>
            <div className="mini-card">
              <h4>{(display.totalUsers - display.activeUsers).toLocaleString()}</h4>
              <p>In Active</p>
            </div>
          </div>
          <div className="chart-bars analytics-bars">
            <div className="bar-row">
              <span>Total Owners</span>
              <div className="bar red-bar" style={{ width: "70%" }}></div>
              <span className="bar-value">{display.totalUsers.toLocaleString()}</span>
            </div>
            <div className="bar-row">
              <span>Active</span>
              <div className="bar blue-bar" style={{ width: `${(display.activeUsers / display.totalUsers) * 100 || 0}%` }}></div>
              <span className="bar-value">{display.activeUsers.toLocaleString()}</span>
            </div>
            <div className="bar-row">
              <span>In Active</span>
              <div className="bar green-bar" style={{ width: `${((display.totalUsers - display.activeUsers) / display.totalUsers) * 100 || 0}%` }}></div>
              <span className="bar-value">{(display.totalUsers - display.activeUsers).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardPage;