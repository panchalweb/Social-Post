import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Singlepost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get post ID from URL

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/post/getBlog/${id}`);
        console.log('Single post data:', response.data);
        setPost(response.data.Data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load post details. Please try again later.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error || 'Post not found'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="relative h-96 w-full">
          <img
            src={`http://localhost:3000/public/images/${post.image}`}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x400';
            }}
          />
          <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full text-sm font-medium text-indigo-600">
            {post.catID ? post.catID.categoryName : 'Uncategorized'}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {post.title}
              </h1>
              <div className="flex items-center text-gray-500">
                <span className="font-medium text-indigo-600 mr-2">
                  {post.authorName}
                </span>
                <span className="text-gray-400">•</span>
                <div className="flex items-center ml-2">
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
            </div>
            <div className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          {/* Additional Details */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Additional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {post.catID ? post.catID.categoryName : 'Uncategorized'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Posted By</h3>
                <p className="mt-1 text-sm text-gray-900">{post.author_Name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p className="mt-1 text-sm text-gray-900">{post.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singlepost;
