import React from "react";
import heroImage from "../../assets/HeroImage.jpeg"; // your uploaded image

const HeroSection = () => {
  return (
    <section className="bg-white min-h-screen flex items-center py-20 px-6 md:px-16 lg:px-32 relative">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 w-full h-full">
        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center text-center lg:text-left">
          <span className="text-sm font-medium text-purple-500 mb-2 inline-block">
            AI-Powered Publishing
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Create Stunning <span className="text-purple-600">Ebooks in Minutes</span>
          </h1>
          <p className="text-gray-600 mb-6">
            From idea to published ebook, our AI-powered platform helps you write, design, 
            and export professional-quality books effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
              Start Creating for Free
            </button>
            <button className="text-purple-600 px-6 py-3 rounded-lg hover:underline transition">
              Watch Demo
            </button>
          </div>
          <div className="flex flex-row sm:flex-row justify-center lg:justify-start gap-8 mt-8 text-gray-700">
            <div>
              <span className="font-bold">50K+</span> Books Created
            </div>
            <div>
              <span className="font-bold">4.9/5</span> User Rating
            </div>
            <div>
              <span className="font-bold">10min</span> Avg. Creation
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 relative w-full flex justify-center mb-10 lg:mb-0">
          <img 
            src={heroImage} 
            alt="Hero Preview" 
            className="w-full max-w-md rounded-xl shadow-xl" 
          />
          {/* Optional floating labels */}
         
          <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-2 rounded-lg shadow text-sm font-medium">
            Processing AI Generation
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
