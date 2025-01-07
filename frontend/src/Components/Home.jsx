import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCreateAuthModal, setShowCreateAuthModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/post/getPost');
        setPosts(response.data.Data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = () => {
    setShowAuthModal(true);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleCreatePostClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowCreateAuthModal(true);
    } else {
      navigate('/create-post');
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${darkMode ? 'border-indigo-400' : 'border-indigo-600'}`}></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-200`}>
      {/* Sidebar - 30% width */}
      <div className={`w-[30%] ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 shadow-lg flex flex-col`}>
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
            Social Blog
          </h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-600'}`}
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>

        <div className={`text-center mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <p className="mb-4">Welcome to Social Blog! Please login or register to interact with posts.</p>
        </div>

        <div className="space-y-4 flex-grow">
          <button
            onClick={handleCreatePostClick}
            className={`block w-full py-3 px-4 rounded-md text-center font-medium ${
              darkMode 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            Create Post
          </button>
          <Link
            to="/login"
            className={`block w-full py-3 px-4 rounded-md text-center font-medium ${
              darkMode 
                ? 'bg-indigo-500 hover:bg-indigo-600 text-white' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`block w-full py-3 px-4 rounded-md text-center font-medium ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            Register
          </Link>
        </div>

        <div className={`mt-8 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <h3 className="font-medium mb-2">Why Join Us?</h3>
            <ul className="space-y-2">
              <li>✨ Share your stories</li>
              <li>🌟 Connect with others</li>
              <li>💫 Engage with community</li>
              <li>🎯 Create your own posts</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content - 70% width */}
      <div className="w-[70%] p-6 overflow-hidden">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        {/* Posts Slider */}
        <div className="h-[calc(100vh-3rem)]">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="h-full rounded-xl"
          >
            {posts.map((post) => (
              <SwiperSlide key={post._id}>
                <div
                  className={`h-full ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  } rounded-xl shadow-lg overflow-hidden`}
                  onClick={handlePostClick}
                >
                  {/* Image Section */}
                  <div className="relative h-[60%] w-full">
                    <img
                      src={`http://localhost:3000/public/images/${post.image}`}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300';
                      }}
                    />
                    <div 
                      className={`absolute top-4 right-4 ${
                        darkMode ? 'bg-gray-800' : 'bg-white'
                      } px-3 py-1 rounded-full text-sm font-medium ${
                        darkMode ? 'text-indigo-400' : 'text-indigo-600'
                      }`}
                    >
                      {post.catID ? post.catID.categoryName : 'Uncategorized'}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 h-[40%] flex flex-col justify-between">
                    <div>
                      <h2 className={`text-2xl font-bold mb-4 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {post.title}
                      </h2>
                      <p className={`line-clamp-3 mb-4 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {post.content}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-medium ${
                          darkMode ? 'text-indigo-400' : 'text-indigo-600'
                        }`}>
                          {post.author_Name}
                        </p>
                        <div className={`flex items-center text-sm ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                            />
                          </svg>
                          {post.address}
                        </div>
                      </div>
                      <button 
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          darkMode 
                            ? 'bg-indigo-500 hover:bg-indigo-600' 
                            : 'bg-indigo-600 hover:bg-indigo-700'
                        } text-white transition-colors duration-200`}
                        onClick={handlePostClick}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-sm w-full`}>
            <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Login Required
            </h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Please login or register to view post details and interact with content.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/login')}
                className={`flex-1 py-2 px-4 rounded-md ${darkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white`}
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className={`flex-1 py-2 px-4 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-white' : 'text-gray-800'}`}
              >
                Register
              </button>
              <button
                onClick={() => setShowAuthModal(false)}
                className={`py-2 px-4 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-white' : 'text-gray-800'}`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Post Authentication Modal */}
      {showCreateAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-md w-full`}>
            {/* Modal Header */}
            <div className="text-center mb-6">
              <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Create Your First Post
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Join our community to start sharing your stories
              </p>
            </div>

            {/* Authentication Options */}
            <div className="space-y-4">
              {/* Login Option */}
              <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'}`}>
                <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Already have an account?
                </h4>
                <button
                  onClick={() => {
                    setShowCreateAuthModal(false);
                    navigate('/login', { 
                      state: { 
                        message: 'Login to create your post',
                        returnTo: '/create-post'
                      }
                    });
                  }}
                  className={`w-full py-2 px-4 rounded-md text-center font-medium ${
                    darkMode 
                      ? 'bg-indigo-500 hover:bg-indigo-600' 
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } text-white transition-colors duration-200`}
                >
                  Login to Continue
                </button>
              </div>

              {/* Register Option */}
              <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'}`}>
                <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  New to Social Blog?
                </h4>
                <button
                  onClick={() => {
                    setShowCreateAuthModal(false);
                    navigate('/register', {
                      state: { returnTo: '/create-post' }
                    });
                  }}
                  className={`w-full py-2 px-4 rounded-md text-center font-medium ${
                    darkMode
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white transition-colors duration-200`}
                >
                  Create New Account
                </button>
              </div>

              {/* Benefits Section */}
              <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h4 className={`font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  What you can do:
                </h4>
                <ul className={`space-y-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Share your stories with the community
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Add images to your posts
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Connect with other creators
                  </li>
                </ul>
              </div>

              {/* Cancel Button */}
              <button
                onClick={() => setShowCreateAuthModal(false)}
                className={`w-full py-2 text-sm font-medium ${
                  darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
                } transition-colors duration-200`}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login/Signup Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-md w-full`}>
            <div className="text-center">
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Join Social Blog
              </h3>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Create an account or log in to create and share posts
              </p>
            </div>

            <div className="space-y-4">
              {/* Login Button */}
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  navigate('/login', { 
                    state: { message: 'Please login to create a post' }
                  });
                }}
                className={`w-full py-3 px-4 rounded-md text-center font-medium ${
                  darkMode 
                    ? 'bg-indigo-500 hover:bg-indigo-600' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white transition-colors duration-200`}
              >
                Login to Your Account
              </button>

              <div className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <span>or</span>
              </div>

              {/* Register Button */}
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  navigate('/register');
                }}
                className={`w-full py-3 px-4 rounded-md text-center font-medium ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                } transition-colors duration-200`}
              >
                Create New Account
              </button>

              {/* Cancel Button */}
              <button
                onClick={() => setShowLoginModal(false)}
                className={`w-full py-2 text-sm font-medium ${
                  darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
                } transition-colors duration-200`}
              >
                Cancel
              </button>
            </div>

            {/* Features List */}
            <div className={`mt-8 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                With an account you can:
              </p>
              <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Create and share your own posts
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Interact with other users' content
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Build your personal profile
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
