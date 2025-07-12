import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminProtectedRoute = ({ user, isLoading, children }) => {
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If not logged in, redirect to admin login
  if (!user) {

    return <Navigate to="/admin/login" />;
  }

  if (!user.isAdmin) {
    toast.error("Unauthorized access");
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminProtectedRoute;