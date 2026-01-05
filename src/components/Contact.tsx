import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 relative min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-primary">04.</span> CONTACT
          </h2>
          
          <p className="text-xl text-gray-300 mb-12">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="glass-panel p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href="mailto:kedardeshmukh2003@gmail.com" className="text-white hover:text-primary transition-colors">
                      channawarshri@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white">India</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-6">
                <p className="text-lg font-bold mb-4">Connect with me</p>
                <div className="flex gap-4">
                  <SocialButton href="https://github.com/shrikrishnachannawar" icon={<Github />} label="GitHub" />
                  <SocialButton href="https://www.linkedin.com/in/shrikrishna-channawar-55062a22b/" icon={<Linkedin />} label="LinkedIn" />
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-20 text-gray-500 text-sm">
            <p>Designed & Built by Shrikrishna Channawar</p>
          </footer>
        </motion.div>
      </div>
    </section>
  );
};

const SocialButton = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-primary/20 hover:border-primary hover:text-primary transition-all duration-300"
  >
    {icon}
    <span>{label}</span>
  </a>
);

export default Contact;
