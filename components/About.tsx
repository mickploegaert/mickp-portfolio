"use client";

export default function About() {
  return (
    <section id="about" className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12" style={{ animation: 'slideUpFade 0.8s ease-out both' }}>
          <h2 
            className="text-6xl md:text-8xl font-black text-black"
            style={{ 
              fontFamily: 'Inter, sans-serif', 
              letterSpacing: '-0.08em' 
            }}
          >
            About
          </h2>
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
          {/* Top Right Image (wider) */}
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1" style={{ animation: 'slideUpFade 0.8s ease-out 0.2s both' }}>
            <div className="relative overflow-hidden shadow-lg">
              <div className="aspect-video w-full h-auto">
                <img
                  src="/aboutpicture.jpg"
                  alt="Profile 1"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Top Left Text */}
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:pr-4" style={{ animation: 'slideUpFade 0.8s ease-out 0.3s both' }}>
            <p
              className="text-[36px] leading-[1em] text-black"
              style={{ letterSpacing: '-0.06em', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              I'm an 18-year-old Software Development student at Scalda in Terneuzen. I'm passionate about learning, creating, and improving my coding skills every day.
            </p>
          </div>

          {/* Bottom Left Image (square) */}
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2 -mt-20" style={{ animation: 'slideUpFade 0.8s ease-out 0.5s both' }}>
            <div className="relative overflow-hidden shadow-lg">
              <div className="aspect-square w-full h-auto">
                <img
                  src="/about2picture.jpg"
                  alt="Profile 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:pl-4" style={{ animation: 'slideUpFade 0.8s ease-out 0.4s both' }}>
            <p
              className="text-[36px] leading-[1em] text-black"
              style={{ letterSpacing: '-0.06em', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              In my free time, I enjoy playing football, gaming, and running. Staying active helps me stay focused, motivated, and balanced in life.
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