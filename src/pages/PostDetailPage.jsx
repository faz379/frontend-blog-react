import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogCards from '../components/BlogCards';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6'
import RecommendedPosts from '../components/RecomendedPosts';

const PostDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    console.log("Current slug:", slug); // log slug

    async function fetchPost() {
      try {
        const response = await fetch(`https://api-bloghub.my.id/api/posts/${slug}`);
        const data = await response.json();
        console.log("Post fetched:", data); // log data post
        setPost(data.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    }

    async function fetchRecommendations() {
      try {
        const response = await fetch(`https://api-bloghub.my.id/api/posts`);
        const data = await response.json();
        console.log("All posts fetched:", data); // log semua posts
        const recs = data.data.filter(p => p.slug !== slug).slice(0, 5);
        console.log("Recommendations:", recs); // log rekomendasi
        setRecommendations(recs);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    }

    fetchPost();
    fetchRecommendations();
  }, [slug]);

  if (!post) return <div className="pt-16 text-center">Loading...</div>;

  return (
    <div className="pt-16 max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mt-8">
      {/* konten utama 2/3 */}
      <div className="md:col-span-2">
        <h1 className="text-4xl font-bold mb-4 scroll-mt-16">{post.title}</h1>
        <p className="text-gray-600 mb-2">
          By {post.author} | Published: {new Date(post.created_at).toLocaleDateString()}
        </p>
        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-80 object-cover rounded mb-4"
          />
        )}
        <div className="prose max-w-none">{post.content}</div>
      </div>

      {/* sidebar 1/3 */}
      <div className="md:col-span-1">
        <h3 className="text-xl mb-4">Recommended</h3>
        <RecommendedPosts posts={recommendations} />
      </div>
    </div>
  );
};

export default PostDetailPage;
