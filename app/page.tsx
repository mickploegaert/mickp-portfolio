import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <div className="min-h-screen h-screen overflow-hidden bg-[#f5f5f5] relative font-sans">
      <div className="h-full flex flex-col px-10 py-8">
        <Navbar />
        <Hero />
      </div>
    </div>
  );
}