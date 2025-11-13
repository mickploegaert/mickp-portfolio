import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f5f5f5] relative font-sans">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}