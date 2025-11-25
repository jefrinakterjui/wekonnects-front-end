// LinkInquiryTable.tsx
import React, { useState } from "react";
import "./LinksManagement.css"; // We'll create this next

interface Inquiry {
  id: string;
  date: string;
  name: string;
  phone: string;
  city: string;
  status: "active" | "inactive";
}

const dummyData: Inquiry[] = [
  { id: "000001", date: "12/06/2025", name: "Harikrishna Prasad", phone: "9999999999", city: "Vijayawada", status: "active" },
  { id: "000001", date: "12/06/2025", name: "Harikrishna Prasad", phone: "9999999999", city: "Vijayawada", status: "inactive" },
  { id: "000001", date: "12/06/2025", name: "Harikrishna Prasad", phone: "9999999999", city: "Vijayawada", status: "active" },
  { id: "000001", date: "12/06/2025", name: "Harikrishna Prasad", phone: "9999999999", city: "Vijayawada", status: "inactive" },
];

const LinksManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"given" | "received">("given");
  const [data, setData] = useState<Inquiry[]>(dummyData);

  const toggleStatus = (index: number) => {
    setData(prev => {
      const updated = [...prev];
      updated[index].status = updated[index].status === "active" ? "inactive" : "active";
      return updated;
    });
  };
return (
    <div className="link-inquiry-container">
      <h2 className="section-title">Links Management</h2>

      {/* Perfectly matched toggle bar */}
      <div className="tab-switcher">
        <button
          className={`tab ${activeTab === "given" ? "active" : ""}`}
          onClick={() => setActiveTab("given")}
        >
          Link Given
        </button>
        <button
          className={`tab ${activeTab === "received" ? "active" : ""}`}
          onClick={() => setActiveTab("received")}
        >
          Link Received
        </button>
      </div>

      <div className="inquiry-table-wrapper">
        <table className="inquiry-table">
          <thead>
            <tr>
              <th>Inquiry Id <span className="sort-icon">↑</span></th>
              <th>Date <span className="sort-icon">↑</span></th>
              <th>Full Name <span className="sort-icon">↑</span></th>
              <th>Phone Number <span className="sort-icon">↑</span></th>
              <th>City Name <span className="sort-icon">↑</span></th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.date}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.city}</td>
                <td>
                  {/* Exactly like screenshot: small round toggle */}
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={item.status === "active"}
                      onChange={() => toggleStatus(index)}
                    />
                    <span className="slider"></span>
                  </label>
                </td>
                <td>
                  <button className="view-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default LinksManagement;