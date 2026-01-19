import React from 'react'
import { featuresData } from '../../utils/data.js'

const Features = () => {
  return (
    <section id='features' className="bg-white py-20 px-6 md:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Everything You Need to <br />
            <span className="text-purple-600">Create Your Ebook</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Our platform is packed with powerful features to help you write, design, and publish your ebook effortlessly.
          </p>
        </div>

        {/* Features Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-start"
            >
              {/* Icon Container with Dynamic Gradient */}
              <div 
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-8 text-white shadow-md bg-gradient-to-br ${feature.gradient}`}
              >
                {feature.icon && <feature.icon size={22} strokeWidth={2.5} />}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
                {feature.description}
              </p>

              {/* Learn More Link */}
              <button className="mt-auto text-purple-600 font-semibold text-sm flex items-center group">
                Learn more 
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                  ›
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Text */}
        <div className="text-center mt-20">
          <hr className="border-gray-100 mb-8" />
          <p className="text-gray-400 font-medium hover:text-gray-600 transition-colors cursor-default">
            Ready to get started?
          </p>
             <button className="bg-purple-600 align-center mt-3 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
              Start Creating for Free
            </button>
        </div>
      </div>
    </section>
  )
}

export default Features