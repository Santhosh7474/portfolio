'use client';
import { useState, useCallback } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import CustomCursor from '@/components/CustomCursor';
import ReadingProgress from '@/components/ReadingProgress';
import SectionIndicator from '@/components/SectionIndicator';
import KonamiEasterEgg from '@/components/KonamiEasterEgg';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      <LoadingScreen onComplete={handleLoadComplete} />

      {loaded && (
        <>
          {/* Global chrome */}
          <CustomCursor />
          <ReadingProgress />
          <SectionIndicator />
          <KonamiEasterEgg />

          {/* Page */}
          <Navbar />
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
