import axios from "axios";

// const API_BASE_URL = "https://wekonnects.vercel.app/api/v1" ;
const API_BASE_URL = "https://api.wekonnects.com/api/v1";
// const API_BASE_URL = "http://localhost:5000/api/v1" ;

// ---------- AXIOS BASE INSTANCE ----------
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  // headers: {

  //   "Content-Type": "application/json",
  // },
});

// ---------- TOKEN HELPER ----------
export const getToken = () => localStorage.getItem("token");

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

// ---------- CENTRAL API METHODS ----------
export const apiGet = (url: string) => api.get(url);
export const apiPost = (url: string, data: any) => api.post(url, data);
export const apiPatch = (url: string, data: any) => api.patch(url, data);
export const apiDelete = (url: string) => api.delete(url);

// ---------- AUTH APIS ----------
export const loginUser = (data: { email: string; password: string }) =>
  apiPost("/auth/login", data);

export const registerUser = (data: any) => apiPost("/auth/register", data);

export const getDashboardStats = () => apiGet("dashboard/admin-stats");

export const fetchMyProfile = () => apiGet("/users/me");

export const logoutUser = () => apiPost("/auth/logout", {});

// ---------- CATEGORY APIS ----------
export const getAllCategories = () => apiGet("/categories");

export const createCategory = (data: FormData) => {
  return api.post("/categories/create", data);
};
export const updateCategory = (id: string, data: any) =>
  apiPatch(`/categories/${id}`, data);

// ---------- USERS (ADMIN) ----------
export const getAllUsers = () => apiGet("/users/all-users");
// UPDATE user status
export const updateUserStatus = (id: string, data: any) =>
  apiPatch(`/users/update-user/${id}`, data);
// ---------- STATE APIS ----------
export const createState = (data: any) => apiPost("/states/create", data);
export const getStates = () => apiGet("/states");
// export const getStates = () => apiGet("/states");
export const updateState = (id: string, data: any) =>
  apiPatch(`/states/${id}`, data);

// ---------- CITY APIS ----------
export const createCity = (data: any) => apiPost("/cities", data);
export const getAllCities = () => apiGet("/cities");
export const getCities = (stateId: string) =>
  apiGet(`/cities?stateId=${stateId}`);

// ---------- BUSINESS APIS ----------
export const createBusiness = (data: any) => apiPost("/business", data);
// ---------- BUSINESS APIS ADMIN----------
export const getPendingBusinessList = () => apiGet("/business/pending");
export const getAllAprrovedBusinessList = () => apiGet("/business");

export const approveOrRejectBusiness = (
  id: string,
  data: { status: "approved" | "rejected" }
) => apiPatch(`/business/${id}/status`, data);
// ---------- EVENTS ----------
export const createEvent = (data: any) => apiPost("/events", data);

// ---------- GROUPS ----------
export const createGroup = (data: any) => apiPost("/groups/create", data);
export const getGroups = () => apiGet("/groups");
export const UpdateGroup = (id: string, data: any) =>
  apiPatch(`/groups/${id}`, data);
export const deleteGroup = (id: string) => apiDelete(`/groups/${id}`);

// ---------- JOBS ----------

export const createJob = (data: any) => apiPost("/jobs/create", data); //admin create job

export default api;
