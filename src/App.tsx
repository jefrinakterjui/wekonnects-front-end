import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Events from "./components/Events";
import HomeSections from "./components/HomeSections";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Leadership from "./pages/LeadershipPage";
import Home from "./pages/HomePage";
import Contact from "./pages/ContactPage";
import HomeCategories from "./pages/HomeBusinessCategories";
import BusinessDetails from "./pages/BusinessDetails";

/* === Admin Layout + Pages === */
import DashboardLayout from "./components/layout/DashboardLayout";
import UserDashboardLayout from "./components/layout/UserDashboardLayout";
import DashboardPage from "./pages/AdminDashboard";
import EducationInfo from "./pages/AdminDashboard/EducationInfo";
import ApplyJobsList from "./pages/AdminDashboard/ApplyJobList";
import CreateProfile from "./pages/AdminDashboard/CreateProfile";
import PostJob from "./pages/AdminDashboard/PostJob";
import UsersList from "./pages/AdminDashboard/UsersList";
import CategoriesList from "./pages/AdminDashboard/CategoriesList";
import AddCategory from "./pages/AdminDashboard/AddCategory";
import BusinessList from "./pages/AdminDashboard/BusinessList";
import AddBusiness from "./pages/AdminDashboard/AddBusiness";
import CreateEvent from "./pages/AdminDashboard/CreateEvent";
import CreateGroup from "./pages/AdminDashboard/CreateGroup";
import GroupInformation from "./pages/AdminDashboard/GroupInformation";
import CreateState from "./pages/AdminDashboard/CreateState";
import StatesList from "./pages/AdminDashboard/StatesList";
import CreateCity from "./pages/AdminDashboard/CreateCity";
import CitiesList from "./pages/AdminDashboard/CityList";
import ProtectedRoute from "./components/ProtectedRoutes";
import FreeListing from "./pages/FreeListings";
import UserDashboardPage from "./pages/UserDashboard";
import UserAddBusiness from "./pages/UserDashboard/UserAddBusiness";
import { Toaster } from 'react-hot-toast';
import JobResults from "./pages/JobResults";
import JobDetails from "./pages/JobDetails";
import LinksManagement from "./pages/UserDashboard/LinksManagement";
import CreateNewDeal from "./pages/UserDashboard/CreateNewDeal";
import RatingsAndReviews from "./pages/UserDashboard/RatingsAndReviews";
import DealRating from "./pages/UserDashboard/DealRating";
import DealsManagement from "./pages/UserDashboard/DealsManagement";
import EventsList from "./pages/AdminDashboard/EventsList";
import JobsList from "./pages/AdminDashboard/JobsList";

function Layout() {
  const location = useLocation();

  // hide header/footer on all admin routes (anything starting with /admin)
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isUserRoute = location.pathname.startsWith("/user");

  return (
    <>
      {!isAdminRoute &&  !isUserRoute && <Header />}
      <Toaster
        position="top-right"        // You can change: top-center, bottom-right, etc.
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,           // Auto close after 4 seconds
          style: {
            background: '#363636',
            color: '#fff',
            fontSize: '16px',
            padding: '16px',
            borderRadius: '8px',
          },

          // Default styles for types
          success: {
            duration: 5000,
            icon: '✓',
            style: {
              background: '#10B981',   // Green
              color: 'white',
            },
          },
          error: {
            duration: 6000,
            icon: '✖',
            style: {
              background: '#EF4444',   // Red
              color: 'white',
            },
          },
          loading: {
            duration: 10000,
          },
        }}
      />

      <main
        className="container"
        style={{
          padding: isAdminRoute ? "0" : "32px 12px",
          minHeight: "80vh",
        }}
      >
        <Routes>
          {/* ====== PUBLIC PAGES ====== */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Services />
                <Events />
                <HomeSections />
              </>
            }
          />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/home" element={<Home />} />
          <Route path="/businesscategories" element={<HomeCategories />} />
          <Route path="/business-details" element={<BusinessDetails />} />
          <Route path="/free-listing" element={<FreeListing />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/jobs/results" element={<JobResults />} />
          <Route path="/jobs/:id" element={<JobDetails />} />


          {/* ====== ADMIN PAGES (nested inside DashboardLayout) ====== */}
          {/* <Route path="/admin" element={<DashboardLayout />}> */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >

            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="jobs/education" element={<EducationInfo />} />
            <Route path="jobs/apply-list" element={<ApplyJobsList />} />
            <Route path="jobs/profile" element={<CreateProfile />} />
            <Route path="jobs/post" element={<PostJob />} />
            <Route path="jobs/list" element={<JobsList/>} />
            <Route path="users" element={<UsersList />} />
            <Route path="categories" element={<CategoriesList />} />
            <Route path="categories/add" element={<AddCategory />} />
            <Route path="groups/create-group" element={<CreateGroup />} />
            <Route path="groups/info" element={<GroupInformation />} />
            <Route path="business/add" element={<AddBusiness/>} />
            <Route path="business/list" element={<BusinessList />} />
            <Route path="business/expire-listings" element={<BusinessList />} />
            <Route path="events/create-event" element={<CreateEvent />} />
            <Route path="events/list" element={<EventsList />} />
            <Route path="locations/create-states" element={<CreateState />} />
            <Route path="locations/states-list" element={<StatesList />} />
            <Route path="locations/create-cities" element={<CreateCity />} />
            <Route path="locations/cities-list" element={<CitiesList />} />
          </Route>


          {/* USER DASHBOARD */}
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<UserDashboardPage />} />
            <Route path="my-business/add" element={<UserAddBusiness/>} />
           <Route path="links/all" element={<LinksManagement/>} />
            <Route path="deals/all" element={<DealsManagement/>} />

           <Route path="deal/new" element={<CreateNewDeal/>} />
           <Route path="deal/rating" element={<DealRating/>} />

           <Route path="rating-review" element={<RatingsAndReviews/>} />
          </Route>
        </Routes>
      </main>

      {!isAdminRoute &&!isUserRoute && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
