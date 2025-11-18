"use client";

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12" style={{ animation: 'slideUpFade 0.8s ease-out both' }}>
          <h2 
            className="text-[clamp(2rem,6vw,4rem)] sm:text-[clamp(2.5rem,6vw,5rem)] md:text-[clamp(3rem,6vw,6rem)] lg:text-[clamp(3.5rem,6vw,7rem)] xl:text-[clamp(4rem,6vw,8rem)] font-black text-black"
            style={{ 
              fontFamily: 'Inter, sans-serif', 
              letterSpacing: '-0.08em' 
            }}
          >
            Projects
          </h2>
        </div>

        {/* Asymmetrical Grid - 2 Large Top, 2 Small Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Row 1: 2 Large Images */}
          <button 
            className="relative overflow-hidden cursor-pointer group bg-gray-100"
            style={{ 
              animation: 'slideUpFade 0.8s ease-out 0.2s both',
              aspectRatio: '1/1'
            }}
            onClick={() => window.open('https://stirring-maamoul-29f058.netlify.app', '_blank')}
            aria-label="Open Health Advisor App project"
          >
            <img
              src="/healtadvisor.jpeg"
              alt="Health Advisor App"
              width={600}
              height={600}
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-90"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="text-[clamp(1rem,4vw,1.5rem)] sm:text-[clamp(1.2rem,4vw,1.8rem)] md:text-[clamp(1.4rem,4vw,2.1rem)] lg:text-[clamp(1.6rem,4vw,2.4rem)] font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                Health Advisor App
              </h3>
            </div>
          </button>

          <button 
            className="relative overflow-hidden cursor-pointer group bg-gray-100"
            style={{ 
              animation: 'slideUpFade 0.8s ease-out 0.3s both',
              aspectRatio: '1/1'
            }}
            onClick={() => window.open('https://resplendent-queijadas-1822c3.netlify.app/', '_blank')}
            aria-label="Open Dropship Dashboard project"
          >
            <img
              src="https://picsum.photos/600/600?random=2"
              alt="Dropship Dashboard"
              width={600}
              height={600}
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-90"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="text-[clamp(1rem,4vw,1.5rem)] sm:text-[clamp(1.2rem,4vw,1.8rem)] md:text-[clamp(1.4rem,4vw,2.1rem)] lg:text-[clamp(1.6rem,4vw,2.4rem)] font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                Dropship Dashboard
              </h3>
            </div>
          </button>

          {/* Row 2: 2 Small Images */}
          <button 
            className="relative overflow-hidden cursor-pointer group bg-gray-100"
            style={{ 
              animation: 'slideUpFade 0.8s ease-out 0.4s both',
              aspectRatio: '1/1'
            }}
            onClick={() => window.open('https://github.com', '_blank')}
            aria-label="Open Task Manager project"
          >
            <img
              src="https://picsum.photos/600/600?random=3"
              alt="Task Manager"
              width={600}
              height={600}
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-90"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="text-[clamp(1rem,4vw,1.5rem)] sm:text-[clamp(1.2rem,4vw,1.8rem)] md:text-[clamp(1.4rem,4vw,2.1rem)] lg:text-[clamp(1.6rem,4vw,2.4rem)] font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                Task Manager
              </h3>
            </div>
          </button>

          <button 
            className="relative overflow-hidden cursor-pointer group bg-gray-100"
            style={{ 
              animation: 'slideUpFade 0.8s ease-out 0.5s both',
              aspectRatio: '1/1'
            }}
            onClick={() => window.open('https://github.com', '_blank')}
            aria-label="Open Social Media Clone project"
          >
            <img
              src="https://picsum.photos/600/600?random=4"
              alt="Social Media Clone"
              width={600}
              height={600}
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-90"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="text-[clamp(1rem,4vw,1.5rem)] sm:text-[clamp(1.2rem,4vw,1.8rem)] md:text-[clamp(1.4rem,4vw,2.1rem)] lg:text-[clamp(1.6rem,4vw,2.4rem)] font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                Social Media Clone
              </h3>
            </div>
          </button>
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