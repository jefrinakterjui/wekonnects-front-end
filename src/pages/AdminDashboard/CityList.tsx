import React, { useState, useEffect } from "react";
import { getAllCities } from "../../api/api"; // adjust path
import "../../components/layout/layout.css";

interface City {
  _id: string;
  name: string;
  image?: string;     // optional if not all cities have images
  status: "active" | "inactive";
  state?: { name: string }; // optional: if you want to show state
}

const CitiesList: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch cities on mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getAllCities();
        const data = res.data?.data || res.data || [];
        setCities(data);
      } catch (err: any) {
        setError("Failed to load cities. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  // Toggle status (client-side only)
  const toggleStatus = (id: string) => {
    setCities((prev) =>
      prev.map((city) =>
        city._id === id
          ? { ...city, status: city.status === "active" ? "inactive" : "active" }
          : city
      )
    );
  };

  // Loading UI
  if (loading) {
    return (
      <div className="dashboard-content">
        <div className="page-header-flex">
          <h1 className="page-title">Cities List</h1>
        </div>
        <p>Loading cities...</p>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="dashboard-content">
        <div className="page-header-flex">
          <h1 className="page-title">Cities List</h1>
        </div>
        <p className="error-text">{error}</p>
      </div>
    );
  }

  // Empty state
  if (cities.length === 0) {
    return (
      <div className="dashboard-content">
        <div className="page-header-flex">
          <h1 className="page-title">Cities List</h1>
        </div>
        <p>No cities found.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <div className="page-header-flex">
        <h1 className="page-title">Cities List</h1>
        {/* Uncomment when CreateCity page is linked */}
        {/* <button className="add-category-btn">Create City</button> */}
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
              <th>City Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {cities.map((city, index) => (
              <tr key={city._id}>
                <td>{index + 1}</td>

                {/* City Image */}
                <td>
                  {city.image ? (
                    <img
                      src={city.image}
                      alt={city.name}
                      className="state-logo-img"
                      onError={(e) => {
                        e.currentTarget.src = "/fallback-city-icon.jpg";
                      }}
                    />
                  ) : (
                    <div className="no-image-placeholder">
                      No Image
                    </div>
                  )}
                </td>

                <td>{city.name}</td>

                {/* Status Toggle */}
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={city.status === "active"}
                      onChange={() => toggleStatus(city._id)}
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
          Showing 1 to {Math.min(10, cities.length)} of {cities.length} entries
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

export default CitiesList;
