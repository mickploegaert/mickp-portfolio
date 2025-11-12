"use client";

import { useState } from 'react';

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      image: 'https://picsum.photos/600/600?random=1',
      isLarge: true
    },
    {
      id: '2',
      title: 'Weather Dashboard',
      image: 'https://picsum.photos/600/600?random=2',
      isLarge: true
    },
    {
      id: '3',
      title: 'Task Manager',
      image: 'https://picsum.photos/600/600?random=3',
      isLarge: false
    },
    {
      id: '4',
      title: 'Social Media Clone',
      image: 'https://picsum.photos/600/600?random=4',
      isLarge: false
    }
  ];

  return (
    <section id="projects" className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16" style={{ animation: 'slideUpFade 0.8s ease-out both' }}>
          <h2 
            className="text-6xl md:text-8xl font-black text-black mb-4"
            style={{ 
              fontFamily: 'Inter, sans-serif', 
              letterSpacing: '-0.08em' 
            }}
          >
            Projects
          </h2>
        </div>

        {/* Asymmetrical Grid - 2 Large Top, 2 Small Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Row 1: 2 Large Images */}
          <div className="relative overflow-hidden cursor-pointer group bg-gray-100"
               style={{ 
                 animation: 'slideUpFade 0.8s ease-out 0.2s both',
                 aspectRatio: '1/1'
               }}
               onMouseEnter={() => setHoveredProject('1')}
               onMouseLeave={() => setHoveredProject(null)}
               onClick={() => window.open('https://github.com', '_blank')}>
            <img
              src={projects[0].image}
              alt={projects[0].title}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-90"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className={`text-3xl lg:text-4xl font-bold text-white transition-all duration-700 transform ${
                hoveredProject === '1' ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`} style={{ fontFamily: 'Inter, sans-serif' }}>
                {projects[0].title}
              </h3>
            </div>
          </div>

          <div className="relative overflow-hidden cursor-pointer group bg-gray-100"
               style={{ 
                 animation: 'slideUpFade 0.8s ease-out 0.3s both',
                 aspectRatio: '1/1'
               }}
               onMouseEnter={() => setHoveredProject('2')}
               onMouseLeave={() => setHoveredProject(null)}
               onClick={() => window.open('https://github.com', '_blank')}>
            <img
              src={projects[1].image}
              alt={projects[1].title}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-90"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className={`text-3xl lg:text-4xl font-bold text-white transition-all duration-700 transform ${
                hoveredProject === '2' ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`} style={{ fontFamily: 'Inter, sans-serif' }}>
                {projects[1].title}
              </h3>
            </div>
          </div>

          {/* Row 2: 2 Small Images */}
          <div className="relative overflow-hidden cursor-pointer group bg-gray-100"
               style={{ 
                 animation: 'slideUpFade 0.8s ease-out 0.4s both',
                 aspectRatio: '1/1'
               }}
               onMouseEnter={() => setHoveredProject('3')}
               onMouseLeave={() => setHoveredProject(null)}
               onClick={() => window.open('https://github.com', '_blank')}>
            <img
              src={projects[2].image}
              alt={projects[2].title}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-90"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className={`text-3xl lg:text-4xl font-bold text-white transition-all duration-700 transform ${
                hoveredProject === '3' ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`} style={{ fontFamily: 'Inter, sans-serif' }}>
                {projects[2].title}
              </h3>
            </div>
          </div>

          <div className="relative overflow-hidden cursor-pointer group bg-gray-100"
               style={{ 
                 animation: 'slideUpFade 0.8s ease-out 0.5s both',
                 aspectRatio: '1/1'
               }}
               onMouseEnter={() => setHoveredProject('4')}
               onMouseLeave={() => setHoveredProject(null)}
               onClick={() => window.open('https://github.com', '_blank')}>
            <img
              src={projects[3].image}
              alt={projects[3].title}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-90"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className={`text-3xl lg:text-4xl font-bold text-white transition-all duration-700 transform ${
                hoveredProject === '4' ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`} style={{ fontFamily: 'Inter, sans-serif' }}>
                {projects[3].title}
              </h3>
            </div>
          </div>
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
    </section>
  );
}