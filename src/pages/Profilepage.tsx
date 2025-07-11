import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from 'react';
import apiService, { setAuthToken } from '../services/api';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function About() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [userProfile, setUserProfile] = useState({
    phone_number: '',
    date_of_birth: '',
    bio: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          setAuthToken(token);
          const response = await apiService.getRole();
          if (response.data.role === 'owner') {
            setIsOwner(true);
          }
        } catch (err) {
          console.error("Failed to fetch role", err);
        }
      }
    };
    checkRole();
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchInitialProfile = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          setAuthToken(token);
          const response = await apiService.getUserProfile();
          const data = response.data;
          console.log('Fetched user profile on mount:', data);
          setUserProfile({
            phone_number: data.user.phone_number || '',
            date_of_birth: data.user.date_of_birth || '',
            bio: data.user.bio || ''
          });
        } catch (error) {
          console.error('Auto-fetch profile failed:', error);
        }
      }
    };
    fetchInitialProfile();
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitProfileData = async () => {
    setIsSubmitting(true);
    try {
      const token = await getAccessTokenSilently();
      setAuthToken(token);
      const profileData: any = {};
      if (userProfile.phone_number.trim()) profileData.phone_number = userProfile.phone_number.trim();
      if (userProfile.date_of_birth) profileData.date_of_birth = userProfile.date_of_birth;
      if (userProfile.bio.trim()) profileData.bio = userProfile.bio.trim();
      console.log('Sending profile data:', profileData);
      const response = await apiService.updateUserProfile(profileData);
      const data = response.data;
      console.log('Profile updated:', data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update failed:', error);
      alert('Profile update failed. Check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-5 max-w-2xl mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 transition-colors">About Page</h1>
      {isAuthenticated && user ? (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4 transition-colors">Welcome!</h2>
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src={user.picture} 
                alt={user.name} 
                className="w-20 h-20 rounded-full border-4 border-blue-200 dark:border-blue-600"
              />
              <div>
                <h3 className="text-xl font-medium text-gray-800 dark:text-white transition-colors">{user.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 transition-colors">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border dark:border-gray-700 transition-colors">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6 transition-colors">Complete Your Profile</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  value={userProfile.phone_number}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={userProfile.date_of_birth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={userProfile.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y transition-colors"
                />
              </div>
            </form>
          </div>

          <div className="flex flex-wrap gap-3">
            {isOwner && (
              <Button
                onClick={() => navigate('/admin')}
                className="bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Go to Admin Page
              </Button>
            )}

            <button 
              onClick={submitProfileData}
              disabled={isSubmitting}
              className={`px-6 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                isSubmitting 
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                  : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
              }`}
            >
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center border dark:border-gray-700 transition-colors">
          <p className="text-gray-600 dark:text-gray-300 text-lg transition-colors">Please log in to see your profile information.</p>
        </div>
      )}
    </div>
  );
}

export default About;
