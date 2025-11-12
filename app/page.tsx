import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] relative font-sans">
      {/* Hero Section */}
      <section className="min-h-screen h-screen overflow-hidden relative">
        <div className="h-full flex flex-col px-10 py-8">
          <Navbar />
          <Hero />
        </div>
      </section>

      {/* Projects Section */}
      <Projects />
    </div>
  );
}
