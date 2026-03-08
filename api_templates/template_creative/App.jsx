import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react';
import portfolioData from './data.json';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[var(--accent)] pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        >
            <div className="w-1 h-1 bg-[var(--accent)] rounded-full" />
        </motion.div>
    );
};

export default function App() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    // Create a spring-smoothed version of the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Transform vertical scroll into horizontal translation
    // We use a large negative percentage to scroll the container right-to-left
    const xTransform = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

    return (
        <div className="bg-[var(--bg-color)] text-[var(--text-color)] min-h-screen selection:bg-[var(--accent)] selection:text-[var(--bg-color)] overflow-x-hidden">
            <CustomCursor />

            {/* 
        This is the "track" that causes the browser to scroll vertically.
        It needs to be very tall to allow a long scroll duration.
      */}
            <div ref={containerRef} className="h-[400vh]">
                {/* The sticky container stays in viewport while the track scrolls */}
                <div className="sticky top-0 h-screen overflow-hidden flex items-center">

                    {/* The horizontal moving strip */}
                    <motion.div
                        style={{ x: xTransform }}
                        className="flex h-full w-[400vw] items-center"
                    >
                        {/* SECTION 1: HERO */}
                        <section className="w-[100vw] h-full flex flex-col justify-center px-12 md:px-32 flex-shrink-0 relative">
                            <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[var(--accent)]/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
                            <motion.h2
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="text-xl md:text-3xl font-light uppercase tracking-[0.3em] text-[var(--accent)] mb-6"
                            >
                                {portfolioData.name}
                            </motion.h2>
                            <motion.h1
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.4 }}
                                className="text-7xl md:text-[12rem] font-black leading-none tracking-tighter mix-blend-difference"
                            >
                                {portfolioData.title.split(' ').map((word, i) => (
                                    <span key={i} className="block hover:italic transition-all duration-300">{word}</span>
                                ))}
                            </motion.h1>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                                className="absolute bottom-12 right-32 flex items-center gap-4 text-sm uppercase tracking-widest"
                            >
                                <span>Scroll to Explore</span>
                                <ArrowRight className="w-4 h-4" />
                            </motion.div>
                        </section>

                        {/* SECTION 2: ABOUT & SKILLS */}
                        <section className="w-[100vw] h-full flex flex-col justify-center px-12 md:px-32 border-l border-white/10 flex-shrink-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                                <div>
                                    <h3 className="text-sm font-mono text-[var(--accent)] mb-8 uppercase tracking-widest">[ About ]</h3>
                                    <p className="text-3xl md:text-5xl font-light leading-tight">
                                        {portfolioData.about}
                                    </p>
                                </div>
                                <div className="flex flex-col justify-end">
                                    <h3 className="text-sm font-mono text-[var(--accent)] mb-8 uppercase tracking-widest">[ Arsenal ]</h3>
                                    <div className="flex flex-wrap gap-4">
                                        {portfolioData.skills.map(skill => (
                                            <span key={skill} className="text-xl md:text-3xl font-medium border border-white/20 px-6 py-3 rounded-full hover:bg-[var(--accent)] hover:text-[var(--bg-color)] hover:border-transparent transition-colors duration-300">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 3: PROJECTS */}
                        <section className="w-[100vw] h-full flex flex-col justify-center px-12 md:px-32 border-l border-white/10 flex-shrink-0">
                            <h3 className="text-sm font-mono text-[var(--accent)] mb-16 uppercase tracking-widest">[ Selected Works ]</h3>
                            <div className="flex gap-12 w-full overflow-visible pb-12">
                                {portfolioData.projects.map((project, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ scale: 0.95, rotate: -2 }}
                                        className="min-w-[400px] md:min-w-[600px] aspect-[4/5] bg-white/5 border border-white/10 p-12 flex flex-col justify-between group cursor-pointer relative overflow-hidden backdrop-blur-md"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] to-transparent opacity-60 z-10"></div>
                                        <div className="relative z-20">
                                            <span className="text-[var(--accent)] font-mono text-sm uppercase mb-4 block">0{idx + 1} // {project.role}</span>
                                            <h4 className="text-5xl md:text-7xl font-black uppercase tracking-tighter group-hover:text-[var(--accent)] transition-colors">{project.title}</h4>
                                        </div>
                                        <p className="text-xl text-white/70 relative z-20 max-w-sm">{project.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* SECTION 4: CONTACT */}
                        <section className="w-[100vw] h-full flex flex-col items-center justify-center px-12 md:px-32 border-l border-white/10 flex-shrink-0 relative overflow-hidden">
                            {/* Massive Background Text Marquee */}
                            <div className="absolute inset-0 pointer-events-none flex flex-col justify-center opacity-5 overflow-hidden">
                                <motion.div
                                    animate={{ x: [0, -2000] }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="whitespace-nowrap text-[20vw] font-black uppercase leading-none"
                                >
                                    LET'S WORK TOGETHER LET'S WORK TOGETHER
                                </motion.div>
                                <motion.div
                                    animate={{ x: [-2000, 0] }}
                                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                    className="whitespace-nowrap text-[20vw] font-black uppercase leading-none"
                                >
                                    REACH OUT REACH OUT REACH OUT REACH OUT
                                </motion.div>
                            </div>

                            <div className="relative z-10 text-center">
                                <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">Ready to disrupt?</h2>
                                <a
                                    href={`mailto:${portfolioData.contactEmail}`}
                                    className="inline-flex items-center gap-4 text-3xl md:text-5xl border-b-4 border-[var(--accent)] pb-2 hover:text-[var(--accent)] transition-colors"
                                >
                                    {portfolioData.contactEmail}
                                    <ArrowRight className="w-12 h-12" />
                                </a>

                                <div className="flex items-center justify-center gap-8 mt-20">
                                    {portfolioData.socialLinks?.twitter && (
                                        <a href="#" className="flex items-center gap-2 hover:text-[var(--accent)] uppercase tracking-widest font-mono text-sm"><Github className="w-5 h-5" /> GitHub</a>
                                    )}
                                    {portfolioData.socialLinks?.linkedin && (
                                        <a href="#" className="flex items-center gap-2 hover:text-[var(--accent)] uppercase tracking-widest font-mono text-sm"><Linkedin className="w-5 h-5" /> LinkedIn</a>
                                    )}
                                </div>
                            </div>
                        </section>

                    </motion.div>
                </div>
            </div>
        </div>
    );
}
