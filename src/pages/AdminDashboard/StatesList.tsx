import React, { useState, useEffect } from "react";
import { getStates } from "../../api/api"; // adjust path
import "../../components/layout/layout.css";

interface State {
  _id: string;
  name: string;
  image: string;     // URL from backend
  status: "active" | "inactive";
}

const StatesList: React.FC = () => {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch states on mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getStates();
        // Adjust based on your API response structure
        const data = res.data?.data || res.data || [];
        setStates(data);
      } catch (err: any) {
        setError("Failed to load states. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  // Toggle status (client-side only for now)
  const toggleStatus = (id: string) => {
    setStates((prev) =>
      prev.map((state) =>
        state._id === id
          ? { ...state, status: state.status === "active" ? "inactive" : "active" }
          : state
      )
    );
  };

  // Loading UI
  if (loading) {
    return (
      <div className="dashboard-content">
        <div className="page-header-flex">
          <h1 className="page-title">States List</h1>
        </div>
        <p>Loading states...</p>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="dashboard-content">
        <div className="page-header-flex">
          <h1 className="page-title">States List</h1>
        </div>
        <p className="error-text">{error}</p>
      </div>
    );
  }

  // Empty state
  if (states.length === 0) {
    return (
      <div className="dashboard-content">
        <div className="page-header-flex">
          <h1 className="page-title">States List</h1>
        </div>
        <p>No states found.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <div className="page-header-flex">
        <h1 className="page-title">States List</h1>
        {/* Uncomment when CreateState page is linked */}
        {/* <button className="add-category-btn">Create State</button> */}
      </div>

      <div className="entries-row">
        <span>Show</span>
        <select className="entries-dropdown">
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
        <span>Entries</span>
      </div>

      {/* TABLE */}
      <div className="applyjobs-table state-table">
        <table>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Gallery Image</th>
              <th>State Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {states.map((state, index) => (
              <tr key={state._id}>
                <td>{index + 1}</td>

                {/* State Image */}
                <td>
                  <img
                    src={state.image}
                    alt={state.name}
                    className="state-logo-img"
                    onError={(e) => {
                      e.currentTarget.src = "/fallback-state-icon.jpg"; // fallback
                    }}
                  />
                </td>

                <td>{state.name}</td>

                {/* Status Toggle */}
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={state.status === "active"}
                      onChange={() => toggleStatus(state._id)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* FOOTER */}
        <p className="pagination-info">
          Showing 1 to {Math.min(10, states.length)} of {states.length} entries
        </p>

        {/* Pagination */}
        <div className="pagination-container">
          <button className="pagination-btn prev" disabled>
            Previous
          </button>

          <div className="pagination-numbers">
            {[1, 2, 3, 4].map((p) => (
              <button
                key={p}
                className={`page-num ${p === 1 ? "active" : ""}`}
              >
                {p}
              </button>
            ))}
          </div>

          <button className="pagination-btn next">Next</button>
        </div>
      </div>
    </div>
  );
};

export default StatesList;
