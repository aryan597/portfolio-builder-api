import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { ArrowDownRight, Briefcase } from 'lucide-react';
import portfolioData from './data.json';

// Minimalist animated 3D sphere background using R3F
const BackgroundSphere = () => {
    const sphereRef = useRef();

    useFrame((state) => {
        if (sphereRef.current) {
            sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Sphere ref={sphereRef} args={[1.5, 64, 64]} scale={2}>
            <MeshDistortMaterial
                color="#ffffff"
                attach="material"
                distort={0.4}
                speed={1.5}
                roughness={0.2}
                metalness={0.8}
                clearcoat={1}
                clearcoatRoughness={0.1}
            />
        </Sphere>
    );
};

export default function App() {
    const { scrollYProgress } = useScroll();

    // Parallax effects
    const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const yContent = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <div className="bg-[var(--bg-color)] text-[var(--text-color)] min-h-screen selection:bg-[var(--accent)] selection:text-[var(--bg-color)] overflow-x-hidden relative font-sans">

            {/* 3D WebGL Background Layer */}
            <div className="fixed inset-0 z-0 h-screen w-full opacity-30 pointer-events-none filter blur-xl md:blur-3xl">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1.5} color="var(--accent)" />
                    <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
                    <BackgroundSphere />
                </Canvas>
            </div>

            {/* HEADER */}
            <header className="fixed top-0 w-full p-8 md:p-12 z-50 mix-blend-difference flex justify-between items-start">
                <div className="text-xl font-bold tracking-tighter mix-blend-difference">{portfolioData.name}.</div>
                <a href={`mailto:${portfolioData.contactEmail}`} className="text-sm font-medium hover:italic transition-all">Connect</a>
            </header>

            {/* HERO SECTION */}
            <motion.section
                style={{ y: yHero, opacity: opacityHero }}
                className="relative h-screen flex flex-col justify-center px-8 md:px-32 z-10"
            >
                <p className="text-[var(--accent)] uppercase tracking-[0.2em] text-sm md:text-md mb-8 ml-2 font-medium">[{portfolioData.title}]</p>
                <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif leading-[0.85] tracking-tight max-w-5xl">
                    Crafting<br /><span className="italic text-white/50">Legacies.</span>
                </h1>
            </motion.section>

            {/* CONTENT LAYER (Glassmorphism overlap) */}
            <motion.div
                style={{ y: yContent }}
                className="relative z-20 bg-white/5 backdrop-blur-3xl border-t border-white/10 rounded-t-[3rem] px-8 md:px-32 py-32 mt-[-10vh]"
            >
                {/* ABOUT */}
                <div className="max-w-4xl mb-40">
                    <h2 className="text-xs uppercase tracking-widest text-[var(--accent)] mb-8 flex items-center gap-4">
                        <span className="w-8 h-px bg-[var(--accent)]"></span> Overview
                    </h2>
                    <p className="text-3xl md:text-5xl font-serif leading-tight text-white/90">
                        {portfolioData.about}
                    </p>
                </div>

                {/* METRICS / SKILLS GRID */}
                <div className="mb-40">
                    <h2 className="text-xs uppercase tracking-widest text-[var(--accent)] mb-12 flex items-center gap-4">
                        <span className="w-8 h-px bg-[var(--accent)]"></span> Competencies
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 border-t border-white/10 pt-12">
                        {portfolioData.skills.map((skill, i) => (
                            <div key={i} className="flex flex-col group">
                                <span className="text-[var(--accent)] text-sm mb-2 opacity-50 font-mono">0{i + 1}</span>
                                <span className="text-2xl md:text-4xl font-light tracking-tight group-hover:italic transition-all">{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PROJECTS / TRACK RECORD */}
                <div className="mb-32">
                    <h2 className="text-xs uppercase tracking-widest text-[var(--accent)] mb-12 flex items-center gap-4">
                        <span className="w-8 h-px bg-[var(--accent)]"></span> Track Record
                    </h2>

                    <div className="flex flex-col space-y-0">
                        {portfolioData.projects.map((project, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="group border-b border-white/10 last:border-0 py-12 md:py-16 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-white/[0.02] transition-colors -mx-8 md:-mx-32 px-8 md:px-32 cursor-pointer"
                            >
                                <div className="flex-1">
                                    <h3 className="text-4xl md:text-6xl font-serif mb-4 group-hover:text-[var(--accent)] transition-colors">{project.title}</h3>
                                    <p className="text-white/50 text-xl font-light max-w-xl">{project.description}</p>
                                </div>
                                <div className="flex items-center gap-8 md:gap-16">
                                    <span className="text-sm uppercase tracking-widest border border-white/20 rounded-full px-6 py-2">{project.role}</span>
                                    <ArrowDownRight className="w-8 h-8 text-white/20 group-hover:text-[var(--accent)] group-hover:-rotate-45 transition-all duration-500" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* FOOTER CTA */}
                <div className="pt-32 pb-16 flex flex-col items-center text-center">
                    <h2 className="text-6xl md:text-9xl font-serif italic text-white/20 hover:text-white transition-colors cursor-pointer mb-8">Discuss.</h2>
                    <a href={`mailto:${portfolioData.contactEmail}`} className="text-xl md:text-3xl border-b border-white pb-2 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all">
                        {portfolioData.contactEmail}
                    </a>

                    <div className="mt-32 w-full flex justify-between text-xs text-white/30 uppercase tracking-widest">
                        <span>© {new Date().getFullYear()} {portfolioData.name}</span>
                        <div className="flex gap-8">
                            {portfolioData.socialLinks?.twitter && <a href="#" className="hover:text-white">Twitter</a>}
                            {portfolioData.socialLinks?.linkedin && <a href="#" className="hover:text-white">LinkedIn</a>}
                        </div>
                    </div>
                </div>

            </motion.div>

        </div>
    );
}
