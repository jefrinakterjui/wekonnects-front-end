import React, { useState, useEffect } from "react";
import "../../components/layout/layout.css";
import toast from "react-hot-toast";
import {
  getPendingBusinessList,
  approveOrRejectBusiness,
} from "../../api/api";

const IMAGE_BASE_URL = "http://localhost:5000"; 

interface Business {
  _id: string;
  businessName: string;
  phone: string;
  image: string;
  ownerName: string;
  ownerImage?: string;
  categoryId: { _id: string; name: string };
  cityId: { _id: string; name: string };
  userId: { name: string; email: string };
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const BusinessList: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null); // Prevent double clicks

  const fetchPendingBusinesses = async () => {
    const toastId = toast.loading("Loading pending businesses...");
    try {
      const res = await getPendingBusinessList();
      if (res.data.success && res.data.data) {
        setBusinesses(res.data.data);
        toast.success("Pending businesses loaded", { id: toastId });
      } else {
        toast.error("No data received", { id: toastId });
        setBusinesses([]);
      }
    } catch (err: any) {
      toast.error("Failed to load pending businesses", { id: toastId });
      console.error(err);
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingBusinesses();
  }, []);

  const handleStatusChange = async (id: string, action: "approve" | "reject") => {
    if (processingId === id) return; // Prevent double submission

    const toastId = toast.loading(`${action === "approve" ? "Approving" : "Rejecting"} business...`);
    setProcessingId(id);

    try {
      // Optimistically remove from UI
      setBusinesses((prev) => prev.filter((b) => b._id !== id));

      // Send the correct body: { status: "approved" } or { status: "rejected" }
      await approveOrRejectBusiness(id, { status: action === "approve" ? "approved" : "rejected" });

      toast.success(`Business ${action === "approve" ? "approved" : "rejected"} successfully!`, {
        id: toastId,
      });
    } catch (err: any) {
      const message = err.response?.data?.message || `Failed to ${action} business`;
      toast.error(message, { id: toastId });

      // Revert optimistic update on error
      await fetchPendingBusinesses();
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-GB");
  };

  if (loading) {
    return (
      <div className="dashboard-content">
        <h1 className="page-title">Pending Business Approval</h1>
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <p>Loading pending businesses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <h1 className="page-title">Pending Business Approval</h1>

      <div className="category-header" style={{ marginBottom: "1rem" }}>
        <div className="entries-select">
          <span>Showing {businesses.length} pending business(es)</span>
        </div>
      </div>

      <div className="business-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Business Name</th>
              <th>Category</th>
              <th>Logo</th>
              <th>Owner</th>
              <th>City</th>
              <th>Join Date</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {businesses.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", padding: "3rem", color: "#888" }}>
                  No pending businesses for approval
                </td>
              </tr>
            ) : (
              businesses.map((b, idx) => (
                <tr key={b._id}>
                  <td>{idx + 1}</td>
                  <td className="bold-text">{b.businessName}</td>
                  <td>{b.categoryId.name}</td>

                  <td>
                    <img
                      src={`${IMAGE_BASE_URL}/${b.image}`}
                      alt={b.businessName}
                      className="business-logo"
                      style={{
                        width: 70,
                        height: 70,
                        objectFit: "cover",
                        borderRadius: 10,
                        border: "2px solid #eee",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                      onError={(e) => {
                        e.currentTarget.src = ""; 
                      }}
                    />
                  </td>

                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {b.ownerImage ? (
                        <img
                          src={`${IMAGE_BASE_URL}/${b.ownerImage}`}
                          alt={b.ownerName}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "2px solid #ddd",
                          }}
                          onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                      ) : (
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            background: "#ddd",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            color: "#666",
                          }}
                        >
                          No Photo
                        </div>
                      )}
                      <div>
                        <div className="bold-text" style={{ fontSize: "0.95rem" }}>
                          {b.ownerName}
                        </div>
                        <small style={{ color: "#666" }}>{b.userId.email}</small>
                      </div>
                    </div>
                  </td>

                  <td className="bold-text">{b.cityId.name}</td>
                  <td>{formatDate(b.createdAt)}</td>
                  <td>{b.phone}</td>

                  <td>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        className="save-btn"
                        onClick={() => handleStatusChange(b._id, "approve")}
                        disabled={processingId === b._id}
                        style={{ padding: "8px 14px", fontSize: "0.9rem" }}
                      >
                        {processingId === b._id ? "Approving..." : "Approve"}
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleStatusChange(b._id, "reject")}
                        disabled={processingId === b._id}
                        style={{ padding: "8px 14px", fontSize: "0.9rem" }}
                      >
                        {processingId === b._id ? "Rejecting..." : "Reject"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusinessList;