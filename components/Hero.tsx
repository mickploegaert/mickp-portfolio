"use client";
import { useState } from "react";
import Image from "next/image";
import DiscordProfile from "./DiscordProfile";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex-1 lg:grid lg:grid-cols-[auto_460px] lg:grid-rows-[auto_1fr_auto] lg:gap-x-12 flex flex-col space-y-8 lg:space-y-0">
      {/* Left column: Name + Email */}
      <div className="lg:col-start-1 lg:row-start-1 lg:row-end-4 flex flex-col justify-start lg:pt-32 lg:pl-8 pt-16 px-4 sm:px-6">
        <h1
          className="text-[clamp(3rem,8vw,7rem)] sm:text-[clamp(4rem,8vw,8.5rem)] lg:text-[clamp(6rem,8vw,12rem)] xl:text-[clamp(7rem,8vw,13rem)] 2xl:text-[clamp(8rem,8vw,14rem)] leading-[1em] text-black"
          style={{ 
            letterSpacing: '-0.09em', 
            fontFamily: 'Inter, sans-serif', 
            fontWeight: 700,
            animation: 'slideUpFade 0.8s ease-out 0.1s both'
          }}
        >
          MICK<br/>PLOEGAERT
        </h1>
        <div className="mt-12 lg:mt-40 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4" style={{ animation: 'slideUpFade 0.8s ease-out 0.3s both' }}>
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || '243338@student.scalda.nl'}`}
            className="text-[clamp(1.2rem,3vw,1.5rem)] sm:text-[clamp(1.4rem,3vw,1.7rem)] md:text-[clamp(1.6rem,3vw,2rem)] lg:text-[clamp(1.8rem,3vw,2.2rem)] text-black hover:opacity-60 transition-opacity duration-200 font-bold break-all"
            style={{ letterSpacing: '-0.06em', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            {process.env.NEXT_PUBLIC_CONTACT_EMAIL || '243338@student.scalda.nl'}
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(process.env.NEXT_PUBLIC_CONTACT_EMAIL || '243338@student.scalda.nl');
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1200);
            }}
            className="relative w-6 h-6 text-black hover:opacity-70 transition-opacity duration-200 ml-2"
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
            <span className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 text-sm text-black/70 transition-opacity duration-300 whitespace-nowrap ${
              copied ? 'opacity-100' : 'opacity-0'
            }`}>
              Copied
            </span>
          </button>
        </div>
      </div>

      {/* Right column middle: Discord profile */}
      <div className="lg:col-start-2 lg:row-start-2 lg:flex lg:justify-end lg:items-start lg:mt-32 lg:pr-8 flex justify-center px-4 sm:px-6" style={{ animation: 'slideUpFade 0.8s ease-out 0.5s both' }}>
        <DiscordProfile />
      </div>

      {/* Right column bottom: description text */}
      <div className="lg:col-start-2 lg:row-start-3 hidden lg:block" style={{ animation: 'slideUpFade 0.8s ease-out 0.7s both' }}>
      </div>

      <style jsx>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
