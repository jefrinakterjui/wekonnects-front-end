/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteJob, getAllJobs, updateJob } from "../../api/api";

interface Company {
  _id: string;
  businessName: string;
  image?: string;
}

interface Job {
  _id: string;
  companyId: Company | null;
  jobName: string;
  salaryRange: string;
  numberOfVacancys: string;
  jobType: "remote" | "onsite" | "hybrid";
  location: string;
  lastDateOfJob: string;
  jobMode: string;
  status: "approved" | "pending" | "rejected";
  createdAt: string;
}



const JobsList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    jobName: "",
    salaryRange: "",
    location: "",
    numberOfVacancys: "",
  });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await getAllJobs();
      setJobs(res.data?.data || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openEditModal = (job: Job) => {
    setEditingJob(job);
    setFormData({
      jobName: job.jobName,
      salaryRange: job.salaryRange || "",
      location: job.location || "",
      numberOfVacancys: job.numberOfVacancys || "",
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingJob(null);
  };

  const handleUpdate = async () => {
    if (!editingJob) return;

    try {
      await updateJob(editingJob._id, formData);
      toast.success("Job updated successfully!");
      fetchJobs(); // Refresh list
      closeEditModal();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update job");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this job permanently?")) return;

    try {
      setDeletingId(id);
      await deleteJob(id);
      toast.success("Job deleted");
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (error: any) {
      toast.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  if (loading) {
    return (
      <div className="dashboard-content">
        <div className="loading-spinner">Loading jobs...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1 className="page-title">All Jobs</h1>
        <p className="page-subtitle">
          {jobs.length} Job{jobs.length !== 1 ? "s" : ""} Listed
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="empty-state">
          <p>No jobs found</p>
        </div>
      ) : (
        <>
          <div className="table-container">
            <table className="jobs-table">
              <thead>
                <tr>
                  {/* <th>Company</th> */}
                  <th>Job Title</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Salary</th>
                  <th>Vacancies</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id}>
                    {/* <td className="company-cell">
                      {job.companyId ? (
                        <div className="company-info">
                          {job.companyId.image && (
                            <img
                              src={`${IMAGE_BASE}/${job.companyId.image}`}
                              alt={job.companyId.businessName}
                              className="company-logo-sm"
                              onError={(e) => (e.currentTarget.src = "/fallback.png")}
                            />
                          )}
                          <span>{job.companyId.businessName}</span>
                        </div>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td> */}

                    <td className="job-title-cell">
                      <strong>{job.jobName}</strong>
                    </td>

                    <td>
                      <span className={`job-type-badge ${job.jobType}`}>
                        {job.jobType.toUpperCase()}
                      </span>
                    </td>

                    <td>{job.location || "—"}</td>
                    <td>{job.salaryRange || "Not disclosed"}</td>
                    <td>{job.numberOfVacancys}</td>
                    <td>{formatDate(job.lastDateOfJob)}</td>

                    <td>
                      <span className={`status-badge ${job.status}`}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </td>

                    <td className="actions-cell">
                      <button
                        className="btn-edit-sm"
                        onClick={() => openEditModal(job)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete-sm"
                        onClick={() => handleDelete(job._id)}
                        disabled={deletingId === job._id}
                      >
                        {deletingId === job._id ? "..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit Modal */}
          {isEditModalOpen && editingJob && (
            <div className="modal-overlay" onClick={closeEditModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Edit Job</h2>
                <div className="modal-form">
                  <div className="form-group">
                    <label>Job Title</label>
                    <input
                      type="text"
                      value={formData.jobName}
                      onChange={(e) =>
                        setFormData({ ...formData, jobName: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Salary Range</label>
                    <input
                      type="text"
                      value={formData.salaryRange}
                      onChange={(e) =>
                        setFormData({ ...formData, salaryRange: e.target.value })
                      }
                      placeholder="e.g. 120k - 150k"
                    />
                  </div>

                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Number of Vacancies</label>
                    <input
                      type="text"
                      value={formData.numberOfVacancys}
                      onChange={(e) =>
                        setFormData({ ...formData, numberOfVacancys: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="btn-cancel" onClick={closeEditModal}>
                    Cancel
                  </button>
                  <button className="btn-save" onClick={handleUpdate}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobsList;