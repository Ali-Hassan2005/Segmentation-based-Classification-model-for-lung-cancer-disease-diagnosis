import React from "react";
import { Link } from "react-router-dom";
import doc from "./doctor-with-his-arms-crossed-white-background.png";

function Hero() {
  return (
    <section className="relative bg-gray-900 text-white py-20 md:py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-transparent opacity-80"></div>
      <div className="">
        <div className="relative flex flex-col md:flex-row justify-between gap-10 items-center z-10 container mx-auto">
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-8xl font-bold">
              AI-Powered CT Checker
            </h1>
            <p className="mt-4 text-sm sm:text-base lg:text-lg">
              Revolutionizing the healthcare industry with cutting-edge AI
              technology. Upload your CT for fast and accurate health
              analysis.
            </p>
            <div className="mt-8 space-x-0 sm:space-x-4 flex flex-col sm:flex-row gap-4 sm:gap-0">
              <Link to="/upload">
                <button className="px-6 sm:px-8 py-3 sm:py-5 bg-blue-600 text-white text-sm sm:text-lg font-bold rounded-lg hover:bg-blue-500">
                  Upload CT
                </button>
              </Link>
              <a
                href="#how-it-works"
                className="px-6 sm:px-8 py-3 sm:py-5 bg-gray-100 text-blue-600 rounded-lg text-sm sm:text-lg hover:bg-gray-200"
              >
                Learn More
              </a>
            </div>
          </div>
          <img
            src={doc}
            className="w-64 sm:w-80 md:w-[400px] lg:w-[600px] object-contain"
            alt="Doctor"
          />
        </div>
      </div>

      <div
        id="how-it-works"
        className="relative z-10 mt-20 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-lg shadow-lg text-gray-900">
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              Step 1: Upload CT
            </h3>
            <p className="text-sm sm:text-base text-gray-700">
              Drag and drop or select the CT images you want to analyze. Our
              system accepts multiple formats.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg  text-gray-900">
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              Step 2: AI Analysis
            </h3>
            <p className="text-sm sm:text-base text-gray-700">
              Our AI-powered system will process the CT and provide instant
              feedback on potential abnormalities.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-gray-900">
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              Step 3: Get Results
            </h3>
            <p className="text-sm sm:text-base text-gray-700">
              Receive your results in seconds, with detailed analysis and
              recommendations from our AI.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Trusted by Healthcare Professionals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-700 p-8 rounded-lg">
            <h3 className="text-4xl sm:text-5xl font-bold">10,000+</h3>
            <p className="mt-2">CT Analyzed</p>
          </div>
          <div className="bg-blue-700 p-8 rounded-lg">
            <h3 className="text-4xl sm:text-5xl font-bold">95%</h3>
            <p className="mt-2">Accuracy Rate</p>
          </div>
          <div className="bg-blue-700 p-8 rounded-lg">
            <h3 className="text-4xl sm:text-5xl font-bold">500+</h3>
            <p className="mt-2">Healthcare Facilities</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
