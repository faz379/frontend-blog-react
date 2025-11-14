import React, { useEffect, useState } from 'react';
import BlogCards from '../components/BlogCards';
import RecommendedPosts from '../components/RecomendedPosts';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [recommendedBlogs, setRecommendedBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch(`https://api-bloghub.my.id/api/posts`);
        const data = await response.json();
        // Filter untuk seminggu terakhir
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const recentPosts = data.data.filter(post => new Date(post.created_at) >= oneWeekAgo);
        setBlogs(recentPosts);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    }

    fetchBlogs();
  }, []);

  // Contoh untuk recommended: ambil 5 terbaru dari recentPosts
  useEffect(() => {
    async function fetchRecommended() {
      try {
        const response = await fetch(`https://api-bloghub.my.id/api/posts`);
        const data = await response.json();
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const recentPosts = data.data
          .filter(post => new Date(post.created_at) >= oneWeekAgo)
          .sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0,5);
        setRecommendedBlogs(recentPosts);
      } catch (error) {
        console.error('Error fetching recommended blogs:', error);
      }
    }

    fetchRecommended();
  }, []);

  return (
    <div className="pt-16 max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
      {/* Main content 2/3 */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">News - Terbaru Seminggu</h2>
        <BlogCards blogs={blogs} />
      </div>

      {/* Sidebar 1/3 */}
      <div className="md:col-span-1">
        <h3 className="text-xl mb-4">Recommended</h3>
        <RecommendedPosts posts={recommendedBlogs} />
      </div>
    </div>
  );
};

export default BlogPage;
