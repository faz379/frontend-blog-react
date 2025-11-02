import React from 'react'
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const BlogCards = ({blogs}) => {
    const filteredBlogs  = blogs;

  return (
    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
      {
            filteredBlogs.map((post) => <Link key={post.id} to={`/posts/${post.slug}`} className='p-5 shadow-lg rounded cursor-pointer'>
                <div>
                    <img src={post.image_url} alt="" className='w-full'/>
                </div>
                <h3 className='mt-4 mb-2 font-bold hover:text-blue-600 cursor-pointer'>{post.title}</h3>
                <p className='mb-2 text-gray-600'><FaUser className='inline-flex items-center mr-2'/>{post.author}</p>
                <p className='text-sm'>Published: {post.created_at}</p>
            </Link> )
      }
    </div>
  )
}

export default BlogCards
