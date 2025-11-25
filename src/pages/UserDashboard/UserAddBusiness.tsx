import React, { useState, useEffect } from "react";
import { createBusiness, getAllCities, getAllCategories } from "../../api/api";
import { MapPin, Upload, Edit,Check } from "lucide-react";
import "../../components/layout/layout.css";
import { useNavigate } from "react-router-dom";
import toast  from 'react-hot-toast';

interface City {
  _id: string;
  name: string;
}

interface Category {
  _id: string;
  name: string;
}

const UserAddBusiness: React.FC = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    businessName: "",
    phone: "",
    altPhone: "",
    whatsapp: "",
    cityId: "",
    pincode: "",
    ownerName: "",
    ownerMobile: "",
    dob: "",
    categoryId: "",      
    subCategory: "",
    businessHours: "",
    businessType: "",
    description: "",
    latitude: "",
    longitude: "",
    status: "active",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);   // ← Fixed: was outside component
  const [, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [ownerImage, setOwnerImage] = useState<File | null>(null);

  // Fetch cities (unchanged)
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const res = await getAllCities();
        setCities(res.data?.data || []);
      } catch (err) {
        console.error("Failed to load cities");
      toast.error("Failed to load cities");
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  // ← Fixed: This useEffect was outside the component before
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        setCategories(res.data?.data || []);
      } catch (err) {
        console.error("Failed to load categories");
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);
  // ← End of fixed useEffect

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setMediaFiles((prev) => [...prev, ...files]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.businessName || !formData.phone || !imageFile || !formData.cityId || !formData.description) {
      setError("Business Name, Phone, Image, City and Description are required.");
      return;
    }
      if (!ownerImage) {
        setError("Owner Image is required.");
        return;
      }

    const payload = new FormData();
    payload.append("businessName", formData.businessName);
    payload.append("phone", formData.phone);
    payload.append("ownerImage", ownerImage); 
    if (formData.altPhone) payload.append("altPhone", formData.altPhone);
    if (formData.whatsapp) payload.append("whatsapp", formData.whatsapp);
    payload.append("cityId", formData.cityId);
    if (formData.pincode) payload.append("pincode", formData.pincode);
    if (formData.ownerName) payload.append("ownerName", formData.ownerName);
    payload.append("ownerMobile", formData.ownerMobile);
    if (formData.dob) payload.append("dob", formData.dob);
    
  
    if (formData.categoryId) payload.append("categoryId", formData.categoryId);
    
    if (formData.subCategory) payload.append("subCategory", formData.subCategory);
    if (formData.businessHours) payload.append("businessHours", formData.businessHours);
    if (formData.businessType) payload.append("businessType", formData.businessType);
    if (formData.description) payload.append("description", formData.description);
    if (formData.latitude) payload.append("latitude", formData.latitude);
    if (formData.longitude) payload.append("longitude", formData.longitude);
    payload.append("status", formData.status);

    payload.append("image", imageFile);
    mediaFiles.forEach((file) => payload.append("media", file));

    setSubmitLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await createBusiness(payload);
      toast.success("Business added successfully! It will be live after admin approval.");
      setSuccess(true);
      // Reset form
      setFormData({
        businessName: "",
        phone: "",
        altPhone: "",
        whatsapp: "",
        cityId: "",
        pincode: "",
        ownerName: "",
        ownerMobile: "",
        dob: "",
        categoryId: "",
        subCategory: "",
        businessHours: "",
        businessType: "",
        description: "",
        latitude: "",
        longitude: "",
        status: "active",
      });
      setImageFile(null);
      setMediaFiles([]);
      // Reset file inputs
      const inputs = document.querySelectorAll('input[type="file"]');
      inputs.forEach((i) => ((i as HTMLInputElement).value = ""));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create business");
      toast.error(err.response?.data?.message || "Failed to create business");
    } finally {
      setSubmitLoading(false);
    }
  };
// SUCCESS SCREEN — EXACTLY LIKE YOUR SCREENSHOT
  if (success) {
    return (
      <div className="dashboard-content add-business-page" style={{ textAlign: "center", paddingTop: "80px" }}>
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              width: "120px",
              height: "120px",
              backgroundColor: "#00C853",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 30px",
            }}
          >
            <Check size={70} color="white" strokeWidth={4} />
          </div>

          <h1 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "20px" }}>
            Congratulations !!
          </h1>

          <p style={{ fontSize: "20px", color: "#666", maxWidth: "600px", margin: "0 auto 40px" }}>
            Thank you for listing your business with wekonnects. please note that your
            listing will be activated once it has been approved by our admin
          </p>

          <button
            onClick={() => navigate("/user/dashboard")} 
            style={{
              backgroundColor: "transparent",
              color: "#0066FF",
              fontSize: "18px",
              textDecoration: "underline",
              border: "none",
              cursor: "pointer",
              padding: "10px 20px",
            }}
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="dashboard-content add-business-page">
      <h1 className="page-title">Add New Business</h1>

      {/* ===== Business Information Section ===== */}
      <form className="business-form" onSubmit={handleSubmit}>
        <h2 className="section-title">Business Information</h2>

        {/* === Row 1 === */}
        <div className="form-row">
          <div className="form-group required">
            <label>Business Name</label>
            <input
              type="text"
              name="businessName"
              placeholder="Enter Business name"
              value={formData.businessName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group required">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter Phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group required">
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            {imageFile && <p className="file-name">Selected: {imageFile.name}</p>}
          </div>

          <div className="form-group">
            <label>Alternative Number</label>
            <input
              type="text"
              name="altPhone"
              placeholder="Enter alternative number"
              value={formData.altPhone}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* === Row 2 === */}
        <div className="form-row">
          <div className="form-group">
            <label>Whatsapp Number</label>
            <input
              type="text"
              name="whatsapp"
              placeholder="Whatsapp Number"
              value={formData.whatsapp}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>City Name</label>
            <select
              name="cityId"
              value={formData.cityId}
              onChange={handleChange}
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>PIN Code</label>
            <input
              type="text"
              name="pincode"
              placeholder="Pin code"
              value={formData.pincode}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Owner Name</label>
            <input
              type="text"
              name="ownerName"
              placeholder="Owner name"
              value={formData.ownerName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* === Row 3 === */}
        <div className="form-row">
          <div className="form-group required">
            <label>Owner Mobile</label>
            <input
              type="text"
              name="ownerMobile"
              placeholder="Owner mobile"
              value={formData.ownerMobile}
              onChange={handleChange}
              required
            />
          </div>
          {/* === Add this new field === */}
<div className="form-group required">
  <label>Owner Image</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0] || null;
      setOwnerImage(file);   // you'll need this state
    }}
    required
  />
  {ownerImage && <p className="file-name">Selected: {ownerImage.name}</p>}
</div>

          <div className="form-group">
            <label>Date Of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          {/* ← Fixed: Now dynamic + uses real category _id */}
          <div className="form-group">
            <label>Business Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Choose category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          {/* ← End of fix */}

          <div className="form-group">
            <label>Sub Category</label>
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
            >
              <option>Choose subcategory</option>
            </select>
          </div>
        </div>

        {/* === Row 4 === */}
        <div className="form-row">
          <div className="form-group">
            <label>Business Hours</label>
            <select
              name="businessHours"
              value={formData.businessHours}
              onChange={handleChange}
            >
              <option>Choose hours</option>
            </select>
          </div>

          <div className="form-group">
            <label>Business Type</label>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
            >
              <option>Choose type</option>
            </select>
          </div>
        </div>

        {/* === Map === */}
        <div className="map-container">
          <div className="map-tabs">
            <button type="button" className="map-tab active">Map</button>
            <button type="button" className="map-tab">Satellite</button>
          </div>
          <input
            type="text"
            className="location-input"
            placeholder="Enter Location"
          />
          <div className="map-placeholder">
            <MapPin size={28} color="#8735BC" />
          </div>
        </div>

        {/* === Description & Media === */}
        <div className="form-row large">
          <div className="form-group">
            <label>Business Description</label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Images & Videos</label>
            <label className="upload-box">
              <Upload size={40} color="#8735BC" />
              <p>Upload files</p>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleMediaChange}
                style={{ display: "none" }}
              />
            </label>
            {mediaFiles.length > 0 && (
              <div className="media-preview">
                {mediaFiles.map((f, i) => (
                  <span key={i} className="media-item">
                    {f.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="form-group small">
            <label>Latitude</label>
            <input
              type="text"
              name="latitude"
              placeholder="Enter latitude"
              value={formData.latitude}
              onChange={handleChange}
            />
            <label>Longitude</label>
            <input
              type="text"
              name="longitude"
              placeholder="Enter longitude"
              value={formData.longitude}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Messages */}
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">Business created successfully!</p>}

        {/* === Submit === */}
        <div className="form-actions">
          <button
            type="submit"
            className="save-btn"
            disabled={submitLoading}
          >
            {submitLoading ? "Adding..." : "Add Business"}
          </button>
        </div>
      </form>

      {/* ===== Business Inquiry Section (Static for now) ===== */}
      <h2 className="section-title">Business Inquiry</h2>
      <div className="business-table">
        <table>
          <thead>
            <tr>
              <th>Inquiry Id</th>
              <th>Date</th>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>City Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>000001</td>
              <td>12/06/2025</td>
              <td>Harikrishna Prasad</td>
              <td>9999999999</td>
              <td>Vijayawada</td>
              <td>
                <Edit color="#0622AF" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAddBusiness;