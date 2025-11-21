import React, { useState, useEffect } from "react";
import "../../components/layout/layout.css";
import { MoreVertical } from "lucide-react";
import { getAllUsers, updateUserStatus } from "../../api/api";  // ⬅ API IMPORT

interface UserData {
  _id: string;
  createdAt: string;
  name: string;
  phone: string;
  city?: string;
  status?: string;
}

const UsersList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<UserData[]>([]);
  const [toggleStates, setToggleStates] = useState<boolean[]>([]);

  // ========================
  // FETCH USERS FROM API
  // ========================
  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      const list = res.data?.data || [];

      setUsers(list);
      setToggleStates(list.map((u: UserData) => u.status === "active"));
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ========================
  // TOGGLE USER STATUS
  // ========================
  const toggleStatus = async (index: number, userId: string) => {
    const newStatus = !toggleStates[index];

    try {
      await updateUserStatus(userId, {
        status: newStatus ? "active" : "inactive",
      });
    } catch (err) {
      console.error("Failed to update status", err);
    }

    setToggleStates((prev) => {
      const updated = [...prev];
      updated[index] = newStatus;
      return updated;
    });
  };

  return (
    <div className="dashboard-content">
      <h1 className="page-title">Users List</h1>

      <div className="applyjobs-table">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Date</th>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>City Name</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{user._id.slice(-6)}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>{user.name || "—"}</td>
                <td>{user.phone}</td>
                <td>{user.city || "—"}</td>

                <td>
                  <div
                    className={`toggle-switch ${toggleStates[index] ? "on" : ""}`}
                    onClick={() => toggleStatus(index, user._id)}
                  >
                    <div className="toggle-circle"></div>
                  </div>
                </td>

                <td className="view-icon">
                  <MoreVertical size={18} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination-container">
          <button className="pagination-btn prev">⟪ Previous</button>
          <div className="pagination-numbers">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                className={`page-num ${num === currentPage ? "active" : ""}`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <button className="pagination-btn next">Next ⟫</button>
        </div>
        <p className="pagination-info">Showing {users.length} users</p>
      </div>
    </div>
  );
};

export default UsersList;
