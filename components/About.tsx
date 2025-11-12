"use client";

export default function About() {
  return (
    <section id="about" className="min-h-screen bg-white py-20 px-4">
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
            About
          </h2>
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* First Image */}
          <div className="lg:col-span-4 lg:col-start-4 lg:row-start-1" style={{ animation: 'slideUpFade 0.8s ease-out 0.2s both' }}>
            <div className="relative overflow-hidden shadow-xl">
              <div className="aspect-square w-full max-w-md mx-auto">
                <img
                  src="/aboutpicture.jpg"
                  alt="Profile 1"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Top Text */}
          <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:pr-8" style={{ animation: 'slideUpFade 0.8s ease-out 0.3s both' }}>
            <p
              className="text-[40px] leading-[1.1em] text-black"
              style={{ letterSpacing: '-0.06em', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              Hello, I'm a freelance developer specializing in modern web development with expertise in creating beautiful, functional digital experiences.
            </p>
          </div>

          {/* Second Image */}
          <div className="lg:col-span-4 lg:col-start-8 lg:row-start-2 mt-12" style={{ animation: 'slideUpFade 0.8s ease-out 0.5s both' }}>
            <div className="relative overflow-hidden shadow-xl">
              <div className="aspect-square w-full max-w-md mx-auto">
                <img
                  src="/about2picture.jpg"
                  alt="Profile 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="lg:col-span-6 lg:col-start-2 lg:row-start-2 mt-12" style={{ animation: 'slideUpFade 0.8s ease-out 0.4s both' }}>
            <p
              className="text-[24px] leading-[1.1em] text-black"
              style={{ letterSpacing: '-0.06em', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              Based in Belgium, I work with clients worldwide to bring their ideas to life through clean code and thoughtful design. I'm passionate about crafting seamless user experiences and solving complex problems with elegant solutions.
            </p>
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