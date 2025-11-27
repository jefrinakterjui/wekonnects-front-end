/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_BASE_URL = "https://api.wekonnects.com/api/v1"; 
// const API_BASE_URL = "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const getToken = () => localStorage.getItem("token");

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export const apiGet = (url: string) => api.get(url);
export const apiPost = (url: string, data: any) => api.post(url, data);
export const apiPatch = (url: string, data: any) => api.patch(url, data);
export const apiDelete = (url: string) => api.delete(url);

// ---------- AUTH ----------
export const loginUser = (data: { email: string; password: string }) =>
  apiPost("/auth/login", data);
export const registerUser = (data: any) => apiPost("/auth/register", data);
export const logoutUser = () => apiPost("/auth/logout", {});
export const fetchMyProfile = () => apiGet("/users/me");

// ---------- DASHBOARD ----------
export const getDashboardStats = () => apiGet("/dashboard/admin-stats");

// ---------- USERS ----------
export const getAllUsers = () => apiGet("/users/all-users");
export const updateUserStatus = (id: string, data: any) =>
  apiPatch(`/users/${id}`, data); // Route fixed based on backend

// ---------- CATEGORIES ----------
export const getAllCategories = () => apiGet("/categories");
export const createCategory = (data: FormData) =>
  api.post("/categories", data); // Route fixed
export const updateCategory = (id: string, data: any) =>
  apiPatch(`/categories/${id}`, data);

// ---------- LOCATIONS ----------
export const createState = (data: any) => apiPost("/states", data); // Route fixed
export const getStates = () => apiGet("/states");
export const createCity = (data: any) => apiPost("/cities", data); // Route fixed
export const getAllCities = () => apiGet("/cities");
export const getCities = (stateId: string) =>
  apiGet(`/cities?stateId=${stateId}`);

// ---------- BUSINESS ----------
export const createBusiness = (data: any) => apiPost("/business", data);
export const getPendingBusinessList = () => apiGet("/business/pending");
export const getAllAprrovedBusinessList = () => apiGet("/business");
export const approveOrRejectBusiness = (
  id: string,
  data: { status: "approved" | "rejected" }
) => apiPatch(`/business/${id}/status`, data);

// ---------- EVENTS ----------
export const createEvent = (data: any) => apiPost("/events", data);
export const getAllEvents = () => apiGet("/events");
export const deleteEvent = (id: string) => apiDelete(`/events/${id}`);

// ---------- GROUPS ----------
export const createGroup = (data: any) => apiPost("/groups", data); // Route fixed
export const getGroups = () => apiGet("/groups");
export const UpdateGroup = (id: string, data: any) =>
  apiPatch(`/groups/${id}`, data);
export const deleteGroup = (id: string) => apiDelete(`/groups/${id}`);

// ---------- COMPANY PROFILE ----------
export const createCompanyProfile = (data: any) => apiPost("/company-profiles", data);
export const getAllCompanyProfiles = () => apiGet("/company-profiles");

// ---------- JOBS ----------
export const createJob = (data: any) => apiPost("/jobs", data); // Route fixed
export const getAllJobs = () => apiGet("/jobs");
export const getJobApplications = () => apiGet("/job-applications"); // Admin Only
export const updateApplicationStatus = (id: string, status: string) =>
  apiPatch(`/job-applications/${id}/status`, { status });
//--jobs  list admin----
export const getAllJobsList = () => apiGet("/jobs");
export const updateJob = (id: string, data: any) => apiPatch(`/jobs/${id}`, data);
export const deleteJob = (id: string) => apiDelete(`/jobs/${id}`);

export default api;