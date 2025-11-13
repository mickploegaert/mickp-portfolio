'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to a server
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('243338@student.scalda.nl');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-5 md:py-40 md:px-20 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-20 items-start pt-16">
          {/* Left Section */}
          <div className="lg:pr-10">
            <h1 className="text-6xl md:text-8xl lg:text-[120px] font-black leading-[0.95] tracking-[-0.04em] text-black mb-16">
              SHOOT A REQUEST
            </h1>
            <a 
              href="mailto:243338@student.scalda.nl" 
              className="inline-flex items-center gap-2.5 text-lg text-black no-underline py-2 hover:opacity-70 transition-opacity"
            >
              243338@student.scalda.nl
              <button 
                onClick={copyEmail}
                className="relative w-5 h-5 text-black hover:opacity-70 transition-opacity duration-200"
                aria-label="Copy email"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="7" y="7" width="11" height="11" rx="1" />
                  <path d="M 2 13 L 2 3 C 2 2.4 2.4 2 3 2 L 13 2" />
                </svg>
                <span className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 text-xs text-black/70 transition-opacity duration-300 whitespace-nowrap ${
                  copied ? 'opacity-100' : 'opacity-0'
                }`}>
                  Copied
                </span>
              </button>
            </a>
          </div>

          {/* Right Section */}
          <div className="lg:pl-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full p-5 text-base border-none bg-[#ececec] rounded-none font-sans transition-colors focus:outline-none focus:bg-[#e0e0e0] placeholder:text-gray-500"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full p-5 text-base border-none bg-[#ececec] rounded-none font-sans transition-colors focus:outline-none focus:bg-[#e0e0e0] placeholder:text-gray-500"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Masterpiece Starts Here"
                  required
                  rows={6}
                  className="w-full p-5 text-base border-none bg-[#ececec] rounded-none font-sans transition-colors focus:outline-none focus:bg-[#e0e0e0] placeholder:text-gray-500 resize-y min-h-[180px]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-6 text-lg font-semibold text-white bg-black hover:bg-gray-800 transition-all duration-300 ease-out transform hover:translate-y-[-2px] hover:shadow-lg border-none cursor-pointer"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.04em',
                  fontWeight: 600
                }}
              >
                Send It!
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}