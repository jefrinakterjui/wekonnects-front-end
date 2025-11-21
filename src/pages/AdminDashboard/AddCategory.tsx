import React, { useState } from "react";
import "../../components/layout/layout.css";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../api/api";

const AddCategory: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",           // ← Changed from categoryName
    status: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // ==========================
  // HANDLE INPUT CHANGE
  // ==========================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================
  // SUBMIT CATEGORY
  // ==========================
  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert("Category name is required");
      return;
    }
    if (!imageFile) {
      alert("Category image is required");
      return;
    }
    if (!formData.status) {
      alert("Select category status");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);        // ← Must be "name"
    data.append("status", formData.status);    // ← "active" or "inactive"
    data.append("image", imageFile);           // ← File

    try {
      setLoading(true);
      const res = await createCategory(data);
      console.log("Success:", res.data);

      alert("Category Created Successfully!");
      navigate("/admin/categories");
    } catch (err: any) {
      console.error("Failed to create category", err);
      const msg = err.response?.data?.message || "Failed to create category";
      alert("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-content">
      <h1 className="page-title">Category Management</h1>

      <div className="dashboard-card">
        <div className="form-section">

          {/* CATEGORY NAME */}
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              name="name"                    // ← name="name"
              placeholder="Enter category name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* CATEGORY IMAGE */}
          <div className="form-group">
            <label>Category Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(e.target.files ? e.target.files[0] : null)
              }
            />
            {imageFile && (
              <p className="file-name">Selected: {imageFile.name}</p>
            )}
          </div>

          {/* CATEGORY STATUS */}
          <div className="form-group">
            <label>Category Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* ACTION BUTTONS */}
          <div className="form-actions">
            <button
              className="add-category-btn"
              onClick={() => navigate("/admin/categories")}
              style={{ marginRight: "10px" }}
            >
              Back
            </button>

            <button
              className="save-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Add Category"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddCategory;
