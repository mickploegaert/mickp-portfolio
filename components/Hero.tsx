"use client";
import { useState } from "react";
import Image from "next/image";
import DiscordProfile from "./DiscordProfile";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex-1 grid grid-cols-[auto_460px] grid-rows-[auto_1fr_auto] gap-x-12">
      {/* Left column: Name + Email */}
      <div className="col-start-1 row-start-1 row-end-4 flex flex-col justify-start pt-40">
        <h1
          className="text-[70px] md:text-[120px] lg:text-[150px] xl:text-[174px] leading-[1em] text-black"
          style={{ 
            letterSpacing: '-0.09em', 
            fontFamily: 'Inter, sans-serif', 
            fontWeight: 700,
            animation: 'slideUpFade 0.8s ease-out 0.1s both'
          }}
        >
          MICK<br/>PLOEGAERT
        </h1>
        <div className="mt-32 flex items-center gap-3" style={{ animation: 'slideUpFade 0.8s ease-out 0.3s both' }}>
          <a
            href="mailto:243338@student.scalda.nl"
            className="text-[26px] text-black hover:opacity-60 transition-opacity duration-200 font-bold"
            style={{ letterSpacing: '-0.06em', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            243338@student.scalda.nl
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText('243338@student.scalda.nl');
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1200);
            }}
            className="relative w-5 h-5 text-black hover:opacity-70 transition-opacity duration-200 ml-2"
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
        </div>
      </div>

      {/* Right column middle: Discord profile */}
      <div className="col-start-2 row-start-2 flex justify-end items-start mt-20 pr-8" style={{ animation: 'slideUpFade 0.8s ease-out 0.5s both' }}>
        <DiscordProfile />
      </div>

      {/* Right column bottom: description text */}
      <div className="col-start-2 row-start-3 flex justify-start items-end pb-6" style={{ animation: 'slideUpFade 0.8s ease-out 0.7s both' }}>
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
          <p
            className="text-[40px] leading-[1.1em] text-black"
            style={{ letterSpacing: '-0.06em', fontFamily: 'Inter, sans-serif', fontWeight: 700, maxWidth: '820px' }}
          >
            Hi, I'm a student software development. I'm 18 years old and I'm very interested in programming!
          </p>
        </div>
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
