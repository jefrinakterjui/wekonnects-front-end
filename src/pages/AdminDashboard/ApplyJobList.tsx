/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import "../../components/layout/layout.css";
import { MoreVertical } from "lucide-react";
import toast from "react-hot-toast";
import { getJobApplications } from "../../api/api";

interface JobApplication {
  _id: string;
  jobId: { jobName: string; companyId?: { businessName?: string; companyName?: string } };
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  status: string;
  createdAt: string;
}

const ApplyJobsList: React.FC = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await getJobApplications();
        setApplications(res.data?.data || []);
      } catch (error) {
        toast.error("Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) return <div className="dashboard-content"><p>Loading...</p></div>;

  return (
    <div className="dashboard-content">
      <h1 className="page-title">Apply Jobs List</h1>

      <div className="applyjobs-table">
        <table>
          <thead>
            <tr>
              <th>Job Role</th>
              <th>Company</th>
              <th>Applicant Name</th>
              <th>Apply Date</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
               <tr><td colSpan={6} style={{textAlign: 'center'}}>No applications found</td></tr>
            ) : (
              applications.map((app) => (
                <tr key={app._id}>
                  <td>{app.jobId?.jobName || "N/A"}</td>
                  <td>{app.jobId?.companyId?.businessName || app.jobId?.companyId?.companyName || "N/A"}</td>
                  <td>{app.applicantName}</td>
                  <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td>
                      <span style={{ 
                          padding: '4px 8px', 
                          borderRadius: '4px', 
                          backgroundColor: app.status === 'pending' ? '#fff3cd' : '#d4edda',
                          color: app.status === 'pending' ? '#856404' : '#155724'
                      }}>
                        {app.status}
                      </span>
                  </td>
                  <td className="view-icon">
                    <MoreVertical size={18} />
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

export default ApplyJobsList;