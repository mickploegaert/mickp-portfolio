"use client";

export default function About() {
  return (
    <section id="about" className="min-h-screen bg-white py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative z-10">
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
            About
          </h2>
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
          {/* Top Right Image (wider) */}
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 order-1 lg:order-1" style={{ animation: 'slideUpFade 0.8s ease-out 0.2s both' }}>
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
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:pr-4 order-2 lg:order-2 mt-6 lg:mt-0" style={{ animation: 'slideUpFade 0.8s ease-out 0.3s both' }}>
            <p
              className="text-[clamp(1rem,2.5vw,1.4rem)] sm:text-[clamp(1.1rem,2.5vw,1.6rem)] md:text-[clamp(1.2rem,2.5vw,1.8rem)] lg:text-[clamp(1.4rem,3vw,2.4rem)] leading-[1.2] sm:leading-[1.15] lg:leading-[1em] text-black"
              style={{ letterSpacing: '-0.06em', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              I'm an 18-year-old Software Development student at Scalda in Terneuzen. I'm passionate about learning, creating, and improving my coding skills every day.
            </p>
          </div>

          {/* Bottom Left Image (square) */}
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:-mt-20 order-4 lg:order-3 mt-6 lg:mt-0" style={{ animation: 'slideUpFade 0.8s ease-out 0.5s both' }}>
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
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:pl-4 order-3 lg:order-4 mt-6 lg:mt-0" style={{ animation: 'slideUpFade 0.8s ease-out 0.4s both' }}>
            <p
              className="text-[clamp(1rem,2.5vw,1.4rem)] sm:text-[clamp(1.1rem,2.5vw,1.6rem)] md:text-[clamp(1.2rem,2.5vw,1.8rem)] lg:text-[clamp(1.4rem,3vw,2.4rem)] leading-[1.2] sm:leading-[1.15] lg:leading-[1em] text-black"
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