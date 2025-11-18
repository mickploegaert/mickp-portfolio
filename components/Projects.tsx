"use client";

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12" style={{ animation: 'slideUpFade 0.8s ease-out both' }}>
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-black"
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
          <div className="relative overflow-hidden cursor-pointer group bg-gray-100"
               style={{ 
                 animation: 'slideUpFade 0.8s ease-out 0.2s both',
                 aspectRatio: '1/1'
               }}
               onClick={() => window.open('https://stirring-maamoul-29f058.netlify.app', '_blank')}>
            <img
              src="/healtadvisor.jpeg"
              alt="Health Advisor App"
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-90"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                Health Advisor App
              </h3>
            </div>
          </div>

          <div className="relative overflow-hidden cursor-pointer group bg-gray-100"
               style={{ 
                 animation: 'slideUpFade 0.8s ease-out 0.3s both',
                 aspectRatio: '1/1'
               }}
               onClick={() => window.open('https://resplendent-queijadas-1822c3.netlify.app/', '_blank')}>
            <img
              src="https://picsum.photos/600/600?random=2"
              alt="Dropship Dashboard"
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-90"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                Dropship Dashboard
              </h3>
            </div>
          </div>

          {/* Row 2: 2 Small Images */}
          <div className="relative overflow-hidden cursor-pointer group bg-gray-100"
               style={{ 
                 animation: 'slideUpFade 0.8s ease-out 0.4s both',
                 aspectRatio: '1/1'
               }}
               onClick={() => window.open('https://github.com', '_blank')}>
            <img
              src="https://picsum.photos/600/600?random=3"
              alt="Task Manager"
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-90"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                Task Manager
              </h3>
            </div>
          </div>

          <div className="relative overflow-hidden cursor-pointer group bg-gray-100"
               style={{ 
                 animation: 'slideUpFade 0.8s ease-out 0.5s both',
                 aspectRatio: '1/1'
               }}
               onClick={() => window.open('https://github.com', '_blank')}>
            <img
              src="https://picsum.photos/600/600?random=4"
              alt="Social Media Clone"
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-90"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                Social Media Clone
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