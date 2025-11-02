import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';

const RecommendedPosts = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p className="text-gray-500">Loading recommendations...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-4 shadow rounded hover:bg-gray-50 cursor-pointer"
        >
          <h4 className="text-md font-medium">{post.title}</h4>
          <Link
            to={`/posts/${post.slug}`} // sesuaikan dengan router frontend
            className="text-gray-500 hover:text-orange-500 inline-flex items-center py-1"
          >
            Read now <FaArrowRight className="mt-1 ml-2" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecommendedPosts;
