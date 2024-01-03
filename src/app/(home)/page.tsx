import './styles/slick.css';

import Footer from './_components/Footer';
import Header from './_components/Header';
import Hero from './_components/Hero';
import Testimoni from './_components/Testimoni';

export default function HomePage() {
  return (
    <main className='h-screen overflow-y-scroll'>
      <Header />
      <Hero />
      <Testimoni />
      <Footer />
    </main>
  );
}
