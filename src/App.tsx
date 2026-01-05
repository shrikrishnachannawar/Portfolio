import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { Html } from '@react-three/drei';
import Lenis from 'lenis';
import BackgroundScene from './components/3d/BackgroundScene';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-bg-dark text-white">
      <CustomCursor />
      <Navbar />
      {/* 3D Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={<Html center><div className="text-white font-syne text-xl">Loading Universe...</div></Html>}>
            <BackgroundScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Contact />
      </div>
    </div>
  );
}

export default App;
