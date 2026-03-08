import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Briefcase, Code, User, ChevronDown } from 'lucide-react';
import portfolioData from './data.json';
import './index.css';

const Decorative3D = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-screen -z-10 opacity-60">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <Sphere args={[1, 100, 200]} scale={2.5}>
          <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
          />
        </Sphere>
      </Canvas>
    </div>
  );
};

function App() {
  const { design_preferences: prefs, hero, about, skills, projects, experience } = portfolioData;

  useEffect(() => {
    // Apply theme
    if (prefs.theme === 'Dark Mode') {
      document.body.classList.add('dark', 'dark-mode');
    } else if (prefs.theme === 'Light Mode') {
      document.body.classList.remove('dark', 'dark-mode');
    } else {
      // Auto
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark', 'dark-mode');
      }
    }
  }, [prefs.theme]);

  // Determine the CSS class based on user choice
  const getStyleClass = () => {
    const styleMap = {
      'Glassmorphism': 'style-glassmorphism',
      'Neo-Brutalism': 'style-neo-brutalism',
      'Minimal': 'style-minimal',
      'Classic': 'style-classic'
    };
    return styleMap[prefs.style] || 'style-glassmorphism';
  };

  const styleClass = getStyleClass();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="min-h-screen relative font-sans">
      {/* Scroll Progress Bar */}
      {prefs.interactions !== "None" && (
        <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent transform origin-left z-50" style={{ scaleX }} />
      )}

      {/* 3D Elements */}
      {prefs['3d_elements'] && <Decorative3D />}

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-32">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col justify-center items-start">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`${styleClass} p-12 w-full max-w-3xl`}
          >
            <h1 className="text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              {hero?.heading || "Hello, I am a Developer!"}
            </h1>
            <p className="text-2xl opacity-90 mb-8">{hero?.subheading}</p>
            <a href="#about" className="inline-flex items-center space-x-2 bg-accent text-white px-6 py-3 rounded-full hover:opacity-80 transition">
              <span>View My Work</span>
              <ChevronDown size={20} />
            </a>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="space-y-8">
          <div className="flex items-center space-x-4 mb-8">
            <User size={32} className="text-accent" />
            <h2 className="text-4xl font-bold">About Me</h2>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`${styleClass} p-8 text-lg leading-relaxed`}
          >
            <p>{about}</p>
          </motion.div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-accent">Technical Skills</h3>
            <div className="flex flex-wrap gap-4">
              {skills?.map((skill, index) => (
                <span key={index} className={`${styleClass} px-4 py-2 text-sm font-medium`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="space-y-8">
          <div className="flex items-center space-x-4 mb-8">
            <Briefcase size={32} className="text-accent" />
            <h2 className="text-4xl font-bold">Experience</h2>
          </div>
          <div className="space-y-6">
            {experience?.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${styleClass} p-8`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{exp.role}</h3>
                    <p className="text-lg opacity-80">{exp.company}</p>
                  </div>
                  <span className="text-sm px-3 py-1 bg-accent/20 rounded-full text-accent font-medium">
                    {exp.duration}
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-2 opacity-90">
                  {exp.highlights?.map((hl, i) => (
                    <li key={i}>{hl}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-8">
          <div className="flex items-center space-x-4 mb-8">
            <Code size={32} className="text-accent" />
            <h2 className="text-4xl font-bold">Featured Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects?.map((proj, index) => (
              <motion.div
                key={index}
                whileHover={prefs.interactions === "Hover Physics" ? { scale: 1.05, rotateY: 5 } : { y: -5 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`${styleClass} p-8 flex flex-col h-full`}
              >
                <h3 className="text-2xl font-bold mb-4">{proj.name}</h3>
                <p className="opacity-90 flex-grow mb-6">{proj.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {proj.tech_stack?.map((tech, i) => (
                    <span key={i} className="text-xs font-semibold px-2 py-1 bg-accent/20 text-accent rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 opacity-60 mt-20">
        <p>© {new Date().getFullYear()} - Generated by AI Portfolio Builder</p>
      </footer>
    </div>
  );
}

export default App;
