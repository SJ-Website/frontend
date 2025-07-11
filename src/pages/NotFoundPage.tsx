import Footer from "@/components/Footer";
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="flex-grow flex flex-col items-center justify-center py-16">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl px-8 py-12 max-w-lg w-full text-center border border-gray-200 dark:border-gray-800">
          <h1 className="text-7xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">404</h1>
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">The Page You’re Looking for Doesn’t Exist</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">We're sorry, but <br />something went wrong.</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-lg shadow hover:from-yellow-500 hover:to-yellow-700 transition-colors duration-200"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default NotFoundPage;
