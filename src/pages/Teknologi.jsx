import React, { useEffect, useState } from 'react';
import BlogCards from '../components/BlogCards'; // komponen untuk menampilkan list post

function Teknologi() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeknologiPosts() {
      try {
        const response = await fetch(`https://api-bloghub.my.id/api/posts?category=teknologi`);
        const data = await response.json();
        setPosts(data.data || []);
      } catch (error) {
        console.error('Error fetching bisnis posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTeknologiPosts();
  }, []);

  return (
    <div>
      <div className='-mx-4 w-screen bg-black py-32 text-white'>
        <h1 className='text-5xl lg:text-7xl leading-snug font-bold mb-5 text-center'>
          Teknologi<span className='text-black bg-orange-500 px-2 py-2 rounded-2xl'>HUB</span> Terkini
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center text-gray-500">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada post Teknologi.</p>
        ) : (
          <BlogCards blogs={posts} /> // tampilkan posts
        )}
      </div>
    </div>
  );
}

export default Teknologi;
