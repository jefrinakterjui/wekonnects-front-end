import React, { useState, useEffect } from "react";
import { createCity, getStates } from "../../api/api";
import "../../components/layout/layout.css";
import toast from "react-hot-toast";

interface State {
  _id: string;
  name: string;
}

const CreateCity: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    status: "active" as "active" | "inactive",
    stateId: "",
  });

  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Fetch States on Mount
  useEffect(() => {
    const fetchStates = async () => {
      // const loadingToast = toast.loading("Loading states...");
      try {
        setLoading(true);
        const res = await getStates();
        setStates(res.data.data || res.data);
        // toast.success("States loaded successfully", { id: loadingToast });
      } catch (err: any) {
        toast.error("Failed to load states");
      } finally {
        setLoading(false);
      }
    };
    fetchStates();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("City name is required.");
      return;
    }
    if (!formData.stateId) {
      toast.error("Please select a state.");
      return;
    }

    const submitToast = toast.loading("Creating city...");

    setSubmitLoading(true);

    try {
      await createCity({
        name: formData.name.trim(),
        status: formData.status,
        stateId: formData.stateId,
      });

      toast.success("City created successfully!", { id: submitToast });

      // Reset form after success
      setFormData({
        name: "",
        status: "active",
        stateId: "",
      });
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to create city";
      toast.error(message, { id: submitToast });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="dashboard-content">
      <h1 className="page-title">Create City</h1>

      <div className="dashboard-card">
        <h2 className="section-title">City Management</h2>

        <form className="form-section" onSubmit={handleSubmit}>
          {/* Select State */}
          <div className="form-group full-width">
            <label>State *</label>
            <select
              name="stateId"
              value={formData.stateId}
              onChange={handleChange}
              required
              disabled={loading || submitLoading}
            >
              <option value="">
                {loading ? "Loading states..." : "Select State"}
              </option>
              {states.map((state) => (
                <option key={state._id} value={state._id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          {/* City Name */}
          <div className="form-group full-width">
            <label>City Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Enter city name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={submitLoading}
            />
          </div>

          {/* City Status */}
          <div className="form-group full-width">
            <label>City Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              disabled={submitLoading}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button
              type="submit"
              className="save-btn"
              disabled={submitLoading || loading}
            >
              {submitLoading ? "Adding..." : "Add City"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCity;