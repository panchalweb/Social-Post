import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Socialpost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/post/getPost');
      console.log('Single post structure:', response.data.Data[0]);
      setPosts(response.data.Data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Social Feed
        </h1>
        
        {posts.length === 0 ? (
          <div className="text-center text-gray-500">No posts found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post._id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={`http://localhost:3000/public/images/${post.image}` || 'https://via.placeholder.com/400x300'}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300';
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-indigo-600">
                    {post.catID ? post.catID.categoryName : 'Uncategorized'}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.content}
                  </p>

                  {/* Author and Location Info */}
                  <div className="flex items-center justify-between border-t pt-4">
                    <div>
                      <p className="text-indigo-600 font-medium">
                        {post.authorName}
                      </p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <svg 
                          className="h-4 w-4 mr-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {post.address}
                      </div>
                    </div>

                    {/* Read More Button */}
                    <button 
                      onClick={() => window.location.href = `/post/${post._id}`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors duration-200"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Socialpost;
