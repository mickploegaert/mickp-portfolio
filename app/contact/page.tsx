'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

declare global {
  interface Window {
    onRecaptchaSuccess?: () => void;
  }
}



export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsRecaptchaLoaded(true);
    };

    script.onerror = () => {
      console.error('Failed to load reCAPTCHA script');
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Function to be called when reCAPTCHA is completed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.onRecaptchaSuccess = () => {
        setIsVerified(true);
      };
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_CONTACT_EMAIL || '243338@student.scalda.nl');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isVerified) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/mpwkwnap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          'g-recaptcha-response': (window.grecaptcha as any)?.getResponse() || '',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setIsVerified(false);
        (window.grecaptcha as any)?.reset?.();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans">
      <section className="min-h-screen h-screen overflow-hidden relative">
        <div className="h-full flex flex-col px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 lg:py-8">
          <Navbar />
          
          <div className="flex-1 flex items-center">
            <div className="max-w-7xl mx-auto w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
                <div className="lg:pr-4 lg:pr-10">
                  <h1 
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl 2xl:text-[120px] font-black leading-[0.95] tracking-[-0.04em] text-black mb-6 sm:mb-12 lg:mb-16"
                    style={{ 
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    SHOOT A REQUEST
                  </h1>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                    <a 
                      href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || '243338@student.scalda.nl'}`} 
                      className="text-sm sm:text-base md:text-lg text-black no-underline py-2 hover:opacity-70 transition-opacity break-all"
                    >
                      {process.env.NEXT_PUBLIC_CONTACT_EMAIL || '243338@student.scalda.nl'}
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
                        minLength={2}
                        className="w-full p-3 sm:p-4 md:p-5 text-sm sm:text-base md:text-lg border-none bg-[#ececec] rounded-none font-sans transition-colors focus:outline-none focus:bg-[#e0e0e0] placeholder:text-gray-500 text-black"
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
                        className="w-full p-3 sm:p-4 md:p-5 text-sm sm:text-base md:text-lg border-none bg-[#ececec] rounded-none font-sans transition-colors focus:outline-none focus:bg-[#e0e0e0] placeholder:text-gray-500 text-black"
                      />
                    </div>

                    <div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Masterpiece Starts Here"
                        required
                        minLength={10}
                        rows={6}
                        className="w-full p-3 sm:p-4 md:p-5 text-sm sm:text-base md:text-lg border-none bg-[#ececec] rounded-none font-sans transition-colors focus:outline-none focus:bg-[#e0e0e0] placeholder:text-gray-500 resize-y min-h-[120px] sm:min-h-[150px] md:min-h-[180px] text-black"
                      />
                    </div>

                    {!isRecaptchaLoaded ? (
                      <div className="flex justify-center">
                        <div className="text-sm text-gray-500">Loading verification...</div>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <div 
                          className="g-recaptcha" 
                          data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                          data-callback="onRecaptchaSuccess"
                          data-theme="light"
                        ></div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting || !isVerified}
                      className="w-full py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg font-semibold text-white bg-black hover:bg-gray-800 transition-all duration-300 ease-out transform hover:translate-y-[-2px] hover:shadow-lg border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        letterSpacing: '-0.04em',
                        fontWeight: 600
                      }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>

                    {submitStatus === 'success' && (
                      <div className="p-3 sm:p-4 bg-green-100 border border-green-400 text-green-700 rounded text-sm sm:text-base">
                        ✅ Message received successfully! I'll get back to you soon.
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="p-3 sm:p-4 bg-red-100 border border-red-400 text-red-700 rounded text-sm sm:text-base">
                        ❌ Failed to send message. Please try again or email me directly.
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}