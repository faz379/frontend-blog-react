import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'


function Banner() {
  return (
    <div className='-mx-4 w-screen bg-black py-32'>
      <div className='text-white text-center'>
        <h1 className='text-5xl lg:text-7xl leading-snug font-bold mb-5'>
            Selamat Datang di Berita<span className='text-black bg-orange-500 px-2 py-2 rounded-2xl'>HUB</span>
        </h1>
        <p className='text-gray-100 lg:w-3/5 mx-auto mb-5 font-primary'>
            Berita terkini dan menghibur menjadi satu
        </p>
        <div>
            <Link to ="/" className='font-medium hover:text-orange-500 inline-flex items-center py-1'>Learn more <FaArrowRight className='mt-1 ml-2'/></Link>
        </div>
      </div>
    </div>
  )
}

export default Banner
