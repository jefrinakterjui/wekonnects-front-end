/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import "../../components/layout/layout.css";
import { createJob, getAllCompanyProfiles, getAllAprrovedBusinessList } from "../../api/api";
import toast from "react-hot-toast";

interface Company {
  _id: string;
  companyName?: string;
  businessName?: string;
}

const PostJob: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    companyId: "",
    jobName: "",
    salaryRange: "",
    numberOfVacancys: "",
    jobType: "",
    location: "",
    lastDateOfJob: "",
    jobMode: "",
    genderType: "",
    description: "",
    benefits: "",
  });

  const [qualifications, setQualifications] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [qualInput, setQualInput] = useState("");
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const resProfile = await getAllCompanyProfiles();
        const resBusiness = await getAllAprrovedBusinessList();
        
        const profiles = resProfile.data?.data || [];
        const businesses = resBusiness.data?.data || [];
        
        setCompanies([...profiles, ...businesses]);
      } catch (error) {
        console.error("Failed to load companies", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addQualification = () => {
    if (qualInput.trim()) {
      setQualifications([...qualifications, qualInput]);
      setQualInput("");
    }
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  const handleSubmit = async () => {
    if (!formData.companyId || !formData.jobName || !formData.location) {
      toast.error("Please fill required fields");
      return;
    }

    setLoading(true);
    const payload = {
      ...formData,
      qualification: qualifications,
      requiredSkills: skills,
    };

    try {
      await createJob(payload);
      toast.success("Job Posted Successfully!");
      setFormData({
        companyId: "",
        jobName: "",
        salaryRange: "",
        numberOfVacancys: "",
        jobType: "",
        location: "",
        lastDateOfJob: "",
        jobMode: "",
        genderType: "",
        description: "",
        benefits: "",
      });
      setQualifications([]);
      setSkills([]);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-content">
      <h1 className="page-title">Post Job</h1>

      <div className="postjob-card">
        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <label>Select Company *</label>
              <select name="companyId" value={formData.companyId} onChange={handleChange}>
                <option value="">Choose Company</option>
                {companies.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.companyName || c.businessName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Job Name *</label>
              <input type="text" name="jobName" placeholder="Enter Job Name" value={formData.jobName} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Salary Range</label>
              <input type="text" name="salaryRange" placeholder="e.g. 20k - 50k" value={formData.salaryRange} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Number of Vacancies *</label>
              <input type="text" name="numberOfVacancys" placeholder="Enter number" value={formData.numberOfVacancys} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Job Type *</label>
              <select name="jobType" value={formData.jobType} onChange={handleChange}>
                <option value="">Select Type</option>
                <option value="onsite">Onsite</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="form-group">
              <label>Location *</label>
              <input type="text" name="location" placeholder="Enter location" value={formData.location} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Last Date of Job *</label>
              <input type="date" name="lastDateOfJob" value={formData.lastDateOfJob} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Job Mode *</label>
              <input type="text" name="jobMode" placeholder="e.g. Full Time" value={formData.jobMode} onChange={handleChange} />
            </div>
          </div>
          
           <div className="form-row">
            <div className="form-group">
              <label>Gender Type</label>
               <select name="genderType" value={formData.genderType} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      <div className="postjob-section">
        <label>Job Description *</label>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter job description here..."></textarea>
      </div>

      <div className="postjob-section">
        <div className="label-with-icon">
          <label>Job Qualification</label>
          <button className="add-btn" onClick={addQualification}><Plus size={18} /></button>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
           <input type="text" value={qualInput} onChange={(e) => setQualInput(e.target.value)} placeholder="Add qualification..." />
        </div>
        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
            {qualifications.map((q, i) => <li key={i}>{q}</li>)}
        </ul>
      </div>

      <div className="postjob-section">
        <div className="label-with-icon">
          <label>Required Skills</label>
          <button className="add-btn" onClick={addSkill}><Plus size={18} /></button>
        </div>
         <div style={{ display: 'flex', gap: '10px' }}>
            <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="Add skill..." />
         </div>
         <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
            {skills.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>

      <div className="postjob-section">
        <label>Benefits</label>
        <input type="text" name="benefits" value={formData.benefits} onChange={handleChange} placeholder="Enter benefits..." />
      </div>

      <div className="form-actions">
        <button className="save-edit-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Posting..." : "Post Job"}
        </button>
      </div>
    </div>
  );
};

export default PostJob;