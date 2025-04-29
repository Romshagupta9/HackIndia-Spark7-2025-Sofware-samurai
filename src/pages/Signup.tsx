
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SignupForm from "@/components/auth/SignupForm";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem("saarthi_user");
    if (user) {
      setIsLoggedIn(true);
      // Redirect to home if already logged in
      navigate("/");
    }
  }, [navigate]);

  if (isLoggedIn) return null;

  return (
    <Layout>
      <div className="container mx-auto py-24 px-4 min-h-screen flex flex-col items-center justify-center">
        <SignupForm />
      </div>
    </Layout>
  );
};

export default Signup;
