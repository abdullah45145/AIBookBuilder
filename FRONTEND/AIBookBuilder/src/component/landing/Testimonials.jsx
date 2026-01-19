import React from 'react';
import { testimonialsData } from '../../utils/data.js';

const Testimonials = () => {
  return (
    <section id='testimonials' className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by Creators <span className="text-purple-600 block">Everywhere</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our users have to say about their experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonialsData.slice(0, 3).map((item, index) => (
            <div key={index} className="relative bg-white p-8 rounded-3xl shadow-xl shadow-purple-100 border border-gray-50">
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-2 bg-purple-600 text-white p-3 rounded-xl shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017V4H21.017V15C21.017 18.866 17.883 22 14.017 22L14.017 21ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H4.017C3.46472 8 3.017 8.44772 3.017 9V12C3.017 12.5523 2.56928 13 2.017 13H0.017V4H10.017V15C10.017 18.866 6.883 22 3.017 22L3.017 21Z" />
                </svg>
              </div>

              {/* Stars */}
              <div className="flex text-purple-600 mb-4 mt-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl">★</span>
                ))}
              </div>

              {/* Feedback Text */}
              <p className="text-gray-700 italic mb-8 leading-relaxed">
                "{item.feedback}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900 leading-tight">{item.name}</h4>
                  <p className="text-sm text-gray-500">Verified Creator</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bottom Bar */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 border-t border-gray-100 pt-12">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">50K+</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">4.9/5</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">100K+</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;