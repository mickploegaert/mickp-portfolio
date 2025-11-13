'use client';

import { useState, useEffect } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('243338@student.scalda.nl');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Create email content
      const emailContent = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
      
      // Create mailto link with subject and body
      const subject = `New Contact Request from ${formData.name}`;
      const mailtoLink = `mailto:243338@student.scalda.nl?subject=${encodeURIComponent(subject)}&body=${emailContent}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success message
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset after a delay
      setTimeout(() => setSubmitStatus('idle'), 3000);
      
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 pt-2 pb-1 transition-all duration-200">
        {/* Logo */}
        <div 
          className="text-xl sm:text-2xl lg:text-[32px] text-black hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          style={{ 
            fontFamily: 'Inter, sans-serif', 
            letterSpacing: '-0.06em', 
            fontWeight: 700
          }}
          onClick={() => window.location.href = '/'}
        >
          MICKP
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="w-8 h-8 flex flex-col justify-center items-center gap-1.5 group">
            <span className="w-6 h-0.5 bg-black transition-all duration-300"></span>
            <span className="w-6 h-0.5 bg-black transition-all duration-300"></span>
            <span className="w-6 h-0.5 bg-black transition-all duration-300"></span>
          </button>
        </div>

        {/* Desktop Navigation links */}
        <div className="hidden md:flex gap-4 lg:gap-8">
          <a
            href="/#projects"
            className="relative text-lg lg:text-[32px] text-black hover:opacity-70 transition-all duration-200"
            style={{
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-0.06em',
              fontWeight: 700,
            }}
          >
            Projects
          </a>
          <a
            href="/#about"
            className="relative text-lg lg:text-[32px] text-black hover:opacity-70 transition-all duration-200"
            style={{
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-0.06em',
              fontWeight: 700,
            }}
          >
            About
          </a>
          <a
            href="/contact"
            className="relative text-lg lg:text-[32px] text-black hover:opacity-70 transition-all duration-200"
            style={{
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-0.06em',
              fontWeight: 700,
            }}
          >
            Contact
          </a>
        </div>
      </nav>

      <div className="min-h-screen bg-gray-100 py-8 sm:py-16 lg:py-40 px-4 sm:px-6 lg:px-20 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start pt-8 lg:pt-16">
          {/* Left Section */}
          <div className="lg:pr-4 lg:pr-10">
            <h1 
              className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[120px] font-black leading-[0.95] tracking-[-0.04em] text-black mb-8 sm:mb-12 lg:mb-16"
              style={{ 
                fontFamily: 'Inter, sans-serif'
              }}
            >
              SHOOT A REQUEST
            </h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <a 
                href="mailto:243338@student.scalda.nl" 
                className="text-sm sm:text-lg text-black no-underline py-2 hover:opacity-70 transition-opacity break-all"
              >
                243338@student.scalda.nl
              </a>
              <button 
                onClick={copyEmail}
                className="relative w-5 h-5 text-black hover:opacity-70 transition-opacity duration-200 flex-shrink-0"
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
                <span className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 text-xs text-black/70 transition-opacity duration-300 whitespace-nowrap z-10 ${
                  copied ? 'opacity-100' : 'opacity-0'
                }`}>
                  Copied
                </span>
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:pl-4 lg:pl-10">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full p-3 sm:p-5 text-sm sm:text-base border-none bg-[#ececec] rounded-none font-sans transition-colors focus:outline-none focus:bg-[#e0e0e0] placeholder:text-gray-500 text-black"
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
                  className="w-full p-3 sm:p-5 text-sm sm:text-base border-none bg-[#ececec] rounded-none font-sans transition-colors focus:outline-none focus:bg-[#e0e0e0] placeholder:text-gray-500 text-black"
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
                  className="w-full p-3 sm:p-5 text-sm sm:text-base border-none bg-[#ececec] rounded-none font-sans transition-colors focus:outline-none focus:bg-[#e0e0e0] placeholder:text-gray-500 resize-y min-h-[120px] sm:min-h-[180px] text-black"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 sm:py-6 text-sm sm:text-lg font-semibold text-white bg-black hover:bg-gray-800 transition-all duration-300 ease-out transform hover:translate-y-[-2px] hover:shadow-lg border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.04em',
                  fontWeight: 600
                }}
              >
                {isSubmitting ? 'Opening Email Client...' : 'Send Email'}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-3 sm:p-4 bg-green-100 border border-green-400 text-green-700 rounded text-sm sm:text-base">
                  ✅ Email client opened! Please send the email to complete your request.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-3 sm:p-4 bg-red-100 border border-red-400 text-red-700 rounded text-sm sm:text-base">
                  ❌ Failed to open email client. Please try again or email us directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}