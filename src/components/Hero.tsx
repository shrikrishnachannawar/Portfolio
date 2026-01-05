import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="h-screen flex flex-col justify-center px-4 md:px-20 relative overflow-hidden">
      <div className="z-10 mix-blend-difference text-white">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-[12vw] leading-[0.85] font-syne font-bold tracking-tighter">
            KEDAR
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 md:gap-12"
        >
          <h1 className="text-[12vw] leading-[0.85] font-syne font-bold tracking-tighter text-gray-500">
            DESHMUKH
          </h1>
          <div className="hidden md:block w-32 h-1 bg-white mt-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-end max-w-4xl"
        >
          <p className="text-xl md:text-2xl font-space font-light max-w-md">
            Software Developer specializing in Cloud & Distributed Systems.
            Based in India.
          </p>
          
          <div className="mt-8 md:mt-0 flex items-center gap-2 text-accent cursor-pointer">
            <ArrowDownRight size={32} />
            <span className="uppercase tracking-widest text-sm">Scroll to explore</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
