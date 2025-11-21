import React, { useState, useEffect } from "react";
import "../../components/layout/layout.css";
import { useNavigate } from "react-router-dom";

// Import the API function
import { getAllCategories } from "../../api/api";

// Default static images (fallback)
import loansImg from "../../assets/icons/loans.png";
import softwareImg from "../../assets/icons/software.png";
import spaImg from "../../assets/icons/spa.png";

// Fallback static data (in case API fails)
const FALLBACK_CATEGORIES = [
  { id: 1, name: "Loans", image: loansImg, active: true },
  { id: 2, name: "Software", image: softwareImg, active: true },
  { id: 3, name: "Spa", image: spaImg, active: false },
];

interface Category {
  id: number;
  name: string;
  image: string; // URL from backend
  active: boolean;
}

const CategoriesList: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getAllCategories();
        const data = response.data?.data || [];

        // Transform API data to match UI expectations
        const transformed: Category[] = data.map((item: any) => ({
          id: item.id || item._id,
          name: item.name || "Unknown",
          image: item.image || getFallbackImage(item.name),
          active: item.active ?? true,
        }));

        setCategories(transformed.length > 0 ? transformed : FALLBACK_CATEGORIES);
      } catch (err: any) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories. Using demo data.");
        setCategories(FALLBACK_CATEGORIES); // Use fallback
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Helper: Match category name to fallback image
  const getFallbackImage = (name: string): string => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("loan")) return loansImg;
    if (lowerName.includes("software")) return softwareImg;
    if (lowerName.includes("spa")) return spaImg;
    return loansImg; // default
  };

  // Toggle active status (client-side only for now)
  const toggleStatus = (id: number) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  if (loading) {
    return (
      <div className="dashboard-content">
        <h1 className="page-title">Categories List</h1>
        <p>Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <h1 className="page-title">Categories List</h1>

      {error && <p className="error-text" style={{ color: "orange" }}>{error}</p>}

      <div className="category-header">
        <div className="entries-select">
          <span>Show</span>
          <select defaultValue="10">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
          <span>Entries</span>
        </div>

        <button
          className="add-category-btn"
          onClick={() => navigate("/admin/categories/add")}
        >
          Add Category
        </button>
      </div>

      <div className="categories-table">
        <table>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Gallery Image</th>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="category-image"
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = getFallbackImage(cat.name);
                    }}
                  />
                </td>
                <td className="category-name">{cat.name}</td>
                <td>
                  <div
                    className={`toggle-switch ${cat.active ? "on" : "off"}`}
                    onClick={() => toggleStatus(cat.id)}
                  >
                    <div className="toggle-circle"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination-container">
          <button className="pagination-btn prev" disabled>
            Previous
          </button>
          <div className="pagination-numbers">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                className={`page-num ${num === 1 ? "active" : ""}`}
              >
                {num}
              </button>
            ))}
          </div>
          <button className="pagination-btn next">Next</button>
        </div>

        <p className="pagination-info">
          Showing 1 to {categories.length} of {categories.length} entries
        </p>
      </div>
    </div>
  );
};

export default CategoriesList;