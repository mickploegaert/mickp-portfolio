import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] relative font-sans">
      {/* Hero Section */}
      <section className="min-h-screen h-screen overflow-hidden relative">
        <div className="h-full flex flex-col px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 lg:py-8">
          <Navbar />
          <Hero />
        </div>
      </section>

      {/* Projects Section */}
      <Projects />

      {/* About Section */}
      <About />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
