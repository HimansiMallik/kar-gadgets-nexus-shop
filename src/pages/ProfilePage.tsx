
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserProfileForm from "@/components/profile/UserProfileForm";
import { useAuth } from "@/contexts/AuthContext";

const ProfilePage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if user is not logged in and loading is finished
    if (!user && !isLoading) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user exists, show the profile
  if (user) {
    return <UserProfileForm />;
  }

  // This will only briefly show before the redirect happens
  return null;
};

export default ProfilePage;
