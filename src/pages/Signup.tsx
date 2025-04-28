
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SignupForm from "@/components/auth/SignupForm";

const Signup = () => {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex justify-center mb-6">
            <Link to="/">
              <span className="text-2xl font-bold gradient-text">Saarthi</span>
            </Link>
          </div>
          <SignupForm />
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
