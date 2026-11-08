
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import Dashboard from "./pages/Dashboard";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";

import { AuthProvider } from "./context/AuthContext";

// Common layout
function AppLayout({ children }) {
  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>

      <Footer />
    </>
  );
}

// Temporary page component
function ComingSoon({ title, description }) {
  return (
    <AppLayout>
      <section
        className="container section"
        style={{ minHeight: "60vh" }}
      >
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
    </AppLayout>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <AppLayout>
              <Home />
            </AppLayout>
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* EDIT BLOG */}
        <Route
          path="/blogs/:id/edit"
          element={
            <AppLayout>
              <EditBlog />
            </AppLayout>
          }
        />

        {/* BLOG DETAILS */}
        <Route
          path="/blogs/:id"
          element={
            <AppLayout>
              <BlogDetails />
            </AppLayout>
          }
        />

        {/* ALL BLOGS */}
        <Route
          path="/blogs"
          element={
            <AppLayout>
              <Blogs />
            </AppLayout>
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />

        {/* CREATE BLOG */}
        <Route
          path="/create-blog"
          element={
            <AppLayout>
              <CreateBlog />
            </AppLayout>
          }
        />

        {/* PAGE NOT FOUND */}
        <Route
          path="*"
          element={
            <ComingSoon
              title="Page Not Found"
              description="The page you are looking for does not exist."
            />
          }
        />

      </Routes>
    </AuthProvider>
  );
}

export default App;
