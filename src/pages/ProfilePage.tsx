
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

  // Show loading or redirect user if not authenticated
  if (isLoading || !user) {
    return null; // Or a loading spinner
  }

  return <UserProfileForm />;
};

export default ProfilePage;
