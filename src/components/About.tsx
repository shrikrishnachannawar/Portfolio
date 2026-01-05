import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-32 px-4 md:px-20 text-white">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-syne font-bold mb-12 text-gray-800"
          >
            ABOUT
          </motion.h2>
        </div>
        
        <div className="space-y-12">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-space leading-relaxed"
          >
            I am a Computer Science Graduate from <span className="text-accent">IIIT Vadodara</span>. 
            Currently building scalable products as a Product Engineer at <span className="text-accent">Shoppin</span>.
          </motion.p>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-syne font-bold text-xl mb-4 text-gray-500">Experience</h3>
              <p className="font-space text-lg">Product Engineer @ Shoppin</p>
              <p className="font-space text-gray-500">Present</p>
            </div>
            <div>
              <h3 className="font-syne font-bold text-xl mb-4 text-gray-500">Achievements</h3>
              <p className="font-space text-lg">Winner - IIITV Ideathon</p>
              <p className="font-space text-lg">Runner-up - CSS Battle</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
