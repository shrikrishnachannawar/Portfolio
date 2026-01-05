import { motion } from 'framer-motion';

const skills = [
  "Python", "Apex", "Node.js","React.js", "AWS", "SQL","Langchain", "MongoDB", "Git", "Django" , "TensorFlow", "PyTorch", "Salesforce", 
];

const Skills = () => {
  return (
    <section id="skills" className="py-32 px-4 md:px-20 text-white">
      <motion.h2 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-6xl md:text-8xl font-syne font-bold mb-20 text-gray-800"
      >
        SKILLS
      </motion.h2>

      <div className="flex flex-wrap gap-4 max-w-4xl">
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="text-2xl md:text-4xl font-space font-light border border-white/20 rounded-full px-8 py-4 hover:bg-white hover:text-black transition-colors cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
