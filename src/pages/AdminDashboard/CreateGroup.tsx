import React, { useState, useEffect } from "react";
import { createGroup, getStates, getCities } from "../../api/api";
import "../../components/layout/layout.css";
import toast from "react-hot-toast"; // ← Added

interface State {
  _id: string;
  name: string;
}

interface City {
  _id: string;
  name: string;
}

const CreateGroup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    status: "active" as "active" | "inactive",
    stateId: "",
    cityId: "",
  });

  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Fetch States on Mount
  useEffect(() => {
    const fetchStates = async () => {
      // const toastId = toast.loading("Loading states...");
      try {
        setLoading(true);
        const res = await getStates();
        setStates(res.data.data || res.data);
        // toast.success("States loaded", { id: toastId });
      } catch (err: any) {
        // toast.error("Failed to load states", { id: toastId });
      } finally {
        setLoading(false);
      }
    };
    fetchStates();
  }, []);

  // Fetch Cities when State changes
  useEffect(() => {
    if (!formData.stateId) {
      setCities([]);
      return;
    }

    const fetchCities = async () => {
      const toastId = toast.loading("Loading cities...");
      try {
        setLoading(true);
        const res = await getCities(formData.stateId);
        setCities(res.data.data || res.data);
        // toast.success("Cities loaded", { id: toastId });
      } catch (err: any) {
        setCities([]);
        toast.error("Failed to load cities", { id: toastId });
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, [formData.stateId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "stateId" && { cityId: "" }), // reset city when state changes
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name.trim()) {
      toast.error("Group name is required.");
      return;
    }
    if (!formData.stateId) {
      toast.error("Please select a state.");
      return;
    }
    if (!formData.cityId) {
      toast.error("Please select a city.");
      return;
    }

    const submittingToast = toast.loading("Creating group...");

    setSubmitLoading(true);

    try {
      await createGroup({
        name: formData.name.trim(),
        status: formData.status,
        stateId: formData.stateId,
        cityId: formData.cityId,
      });

      toast.success("Group created successfully! 🎉", { id: submittingToast });

      // Reset form
      setFormData({
        name: "",
        status: "active",
        stateId: "",
        cityId: "",
      });
      setCities([]); // Clear cities when resetting
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to create group";
      toast.error(message, { id: submittingToast });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="dashboard-content">
      <h1 className="page-title">Create Group</h1>

      <div className="dashboard-card group-form">
        <form className="form-section" onSubmit={handleSubmit}>
          {/* Group Name */}
          <div className="form-group">
            <label>Group Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Enter group name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={submitLoading}
            />
          </div>

          {/* Select State */}
          <div className="form-group">
            <label>Select State *</label>
            <select
              name="stateId"
              value={formData.stateId}
              onChange={handleChange}
              required
              disabled={loading || submitLoading}
            >
              <option value="">
                {loading ? "Loading states..." : "Select a state"}
              </option>
              {states.map((state) => (
                <option key={state._id} value={state._id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          {/* Select City */}
          <div className="form-group">
            <label>Select City *</label>
            <select
              name="cityId"
              value={formData.cityId}
              onChange={handleChange}
              required
              disabled={loading || !formData.stateId || submitLoading}
            >
              <option value="">
                {!formData.stateId
                  ? "Select state first"
                  : loading
                  ? "Loading cities..."
                  : "Select a city"}
              </option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="form-actions align-right">
            <button
              type="submit"
              className="save-btn"
              disabled={submitLoading || loading}
            >
              {submitLoading ? "Creating..." : "Create Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;