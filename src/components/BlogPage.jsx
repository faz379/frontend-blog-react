import React, { useEffect, useState } from 'react';
import BlogCards from './BlogCards';
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'


const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [recommendedBlogs, setRecommendedBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of blogs per page

  // Fetch main blogs
  useEffect(() => {
    async function fetchBlogs() {
      let url = `http://103.174.114.55/api/posts?page=${currentPage}&limit=${pageSize}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setBlogs(data.data || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    }
    fetchBlogs();
  }, [currentPage]);

  // Fetch recommended blogs (misal 5 terbaru)
  useEffect(() => {
    async function fetchRecommended() {
      let url = `http://103.174.114.55/api/posts?page=1&limit=5`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setRecommendedBlogs(data.data || []);
      } catch (error) {
        console.error('Error fetching recommended blogs:', error);
      }
    }
    fetchRecommended();
  }, []);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main content 2/3 */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">News</h2>
          <BlogCards blogs={blogs} />
          {/* Pagination buttons */}
          <div className="mt-4 flex gap-2">
            {Array.from({ length: Math.ceil(blogs.length / pageSize) }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar 1/3 */}
        <div className="md:col-span-1">
          <h3 className="text-xl mb-4">Recommended</h3>
          <div className="flex flex-col">
            {recommendedBlogs.map((post) => (
              <div key={post.id} className="p-4 shadow rounded hover:bg-gray-50 cursor-pointer">
                <h4 className="text-md">{post.title}</h4>
                <Link to ="/" className='font-medium text-gray-500 hover:text-orange-500 inline-flex items-center py-1'>Read now <FaArrowRight className='mt-1 ml-2'/></Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
