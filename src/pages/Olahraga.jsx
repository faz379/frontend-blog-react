import React, { useEffect, useState } from 'react';
import BlogCards from '../components/BlogCards'; // komponen untuk menampilkan list post

function Olahraga() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOlahragaPosts() {
      try {
        const response = await fetch(`http://localhost:5000/api/posts?category=olahraga`);
        const data = await response.json();
        setPosts(data.data || []);
      } catch (error) {
        console.error('Error fetching olahraga posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchOlahragaPosts();
  }, []);

  return (
    <div>
      <div className='-mx-4 w-screen bg-black py-32 text-white'>
        <h1 className='text-5xl lg:text-7xl leading-snug font-bold mb-5 text-center'>
          Olahraga<span className='text-black bg-orange-500 px-2 py-2 rounded-2xl'>HUB</span> Terkini
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center text-gray-500">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada post olahraga.</p>
        ) : (
          <BlogCards blogs={posts} /> // tampilkan posts
        )}
      </div>
    </div>
  );
}

export default Olahraga;
