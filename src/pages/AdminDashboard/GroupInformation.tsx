import React, { useState, useEffect } from "react";
import "../../components/layout/layout.css";

import { Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { getGroups, UpdateGroup, deleteGroup } from "../../api/api";

interface Group {
  _id: string;
  name: string;
  status: "active" | "inactive";
  stateId: { _id: string; name: string };
  cityId: { _id: string; name: string };
  createdAt: string;
  updatedAt: string;
}

// Modal Component
const EditGroupModal: React.FC<{
  group: Group;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}> = ({ group, isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState(group.name);

  useEffect(() => {
  if (isOpen && group) {
    setName(group.name);
  }
}, [group, isOpen]);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Group name is required");
      return;
    }

    setSaving(true);
    try {
      await UpdateGroup(group._id, { name: name.trim() });
      // toast.success("Group name updated successfully!");
      onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update group");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Group</h2>
        <div className="form-group" style={{ margin: "20px 0" }}>
          <label>Group Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter group name"
            autoFocus
          />
        </div>

        <div className="form-actions" style={{ justifyContent: "flex-end" }}>
          <button className="cancel-btn" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button
            className="save-btn"
            onClick={handleSave}
            disabled={saving}
            style={{ marginLeft: "10px" }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

const GroupInformation: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState<{ open: boolean; group: Group | null }>({
    open: false,
    group: null,
  });

  const fetchGroups = async () => {
    // const toastId = toast.loading("Loading groups...");
    try {
      const res = await getGroups();
      if (res.data.success) {
        setGroups(res.data.data);
        // toast.success("Groups loaded", { id: toastId });
      }
    } catch (err) {
      toast.error("Failed to load groups");
      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  // Toggle Status (Real API)
  const toggleStatus = async (id: string, current: "active" | "inactive") => {
    const newStatus = current === "active" ? "inactive" : "active";

    // Optimistic update
    setGroups((prev) =>
      prev.map((g) => (g._id === id ? { ...g, status: newStatus } : g))
    );

    try {
      await UpdateGroup(id, { status: newStatus });
      toast.success(`Group ${newStatus === "active" ? "activated" : "deactivated"}`);
    } catch (err: any) {
      // Revert
      setGroups((prev) =>
        prev.map((g) => (g._id === id ? { ...g, status: current } : g))
      );
      toast.error("Failed to update status");
    }
  };

  // Delete Group
  const handleDelete = (id: string, name: string) => {
    toast(
      (t) => (
        <span>
          Delete <strong>{name}</strong>?
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                const deletingToast = toast.loading("Deleting...");
                try {
                  await deleteGroup(id);
                  setGroups((prev) => prev.filter((g) => g._id !== id));
                  toast.success("Group deleted", { id: deletingToast });
                } catch {
                  toast.error("Delete failed", { id: deletingToast });
                }
              }}
              style={{
                background: "#e74c3c",
                color: "white",
                border: "none",
                padding: "6px 12px",
                marginRight: "8px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Yes, Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              style={{
                background: "#95a5a6",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </span>
      ),
      { duration: Infinity }
    );
  };

  const openEditModal = (group: Group) => {
    setEditModal({ open: true, group });
  };

  const closeEditModal = () => {
    setEditModal({ open: false, group: null });
  };

  if (loading) {
    return (
      <div className="dashboard-content">
        <h1 className="page-title">Group Information</h1>
        <p>Loading groups...</p>
      </div>
    );
  }

  return (
    <>
      <div className="dashboard-content">
        <h1 className="page-title">Group Information</h1>

        <div className="applyjobs-table">
          <table>
            <thead>
              <tr>
                <th>SL.NO</th>
                <th>State</th>
                <th>City</th>
                <th>Group Name</th>
                <th>Members</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "3rem" }}>
                    No groups found
                  </td>
                </tr>
              ) : (
                groups.map((group, index) => (
                  <tr key={group._id}>
                    <td>{index + 1}</td>
                    <td>{group.stateId.name}</td>
                    <td>{group.cityId.name}</td>
                    <td>{group.name}</td>
                    <td>
                      <button className="view-btn">View</button>
                    </td>
                    <td>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={group.status === "active"}
                          onChange={() => toggleStatus(group._id, group.status)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </td>
                   <td>
                      <div className="action-buttons">
                        <button
                          className="icon-btn edit-btn"
                          onClick={() => openEditModal(group)}
                          title="Edit Group Name"
                        >
                          <Edit size={18} />
                        </button>

                        <button
                          className="icon-btn delete-btn"
                          onClick={() => handleDelete(group._id, group.name)}
                          title="Delete Group"
                        >
                          <Trash2 size={18} />
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
      {/* Edit Modal */}
      {editModal.open && editModal.group && (
  <EditGroupModal
    group={editModal.group}
    isOpen={editModal.open}
    onClose={closeEditModal}
    onSuccess={fetchGroups}
  />
)}
    </>
  
  );
};

export default GroupInformation;