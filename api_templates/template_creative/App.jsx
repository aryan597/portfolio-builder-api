import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowRight, Briefcase, GraduationCap, Send } from 'lucide-react';
import portfolioData from './data.json';

const CustomCursor = () => {
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
    const [formState, setFormState] = useState('idle'); // idle, typing, submitted

    // Create a spring-smoothed version of the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 25,
        restDelta: 0.001
    });

    // Transform vertical scroll into horizontal translation
    // Increased to -80% since we added more sections (Experience & Contact takes up more space)
    const xTransform = useTransform(smoothProgress, [0, 1], ["0%", "-80%"]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormState('submitted');
        setTimeout(() => setFormState('idle'), 3000);
    };

    return (
        <div className="bg-[var(--bg-color)] text-[var(--text-color)] min-h-screen selection:bg-[var(--accent)] selection:text-[var(--bg-color)] overflow-x-hidden font-sans">
            <CustomCursor />

            {/* 
        This is the "track" that causes the browser to scroll vertically.
        It needs to be very tall (600vh) to accommodate 6 horizontal viewports.
      */}
            <div ref={containerRef} className="h-[600vh]">
                {/* The sticky container stays in viewport while the track scrolls */}
                <div className="sticky top-0 h-screen overflow-hidden flex items-center">

                    {/* The horizontal moving strip */}
                    <motion.div
                        style={{ x: xTransform }}
                        className="flex h-full w-[600vw] items-center"
                    >
                        {/* SECTION 1: HERO */}
                        <section className="w-[100vw] h-full flex flex-col justify-center px-8 md:px-32 flex-shrink-0 relative">
                            <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[var(--accent)]/15 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none animate-pulse"></div>

                            <div className="relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="inline-block border border-[var(--text-color)]/20 px-6 py-2 rounded-full mb-8 text-xs font-mono uppercase tracking-widest backdrop-blur-md"
                                >
                                    <span className="w-2 h-2 inline-block bg-[var(--accent)] rounded-full mr-3 animate-pulse"></span>
                                    {portfolioData.title}
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.2, delay: 0.2, type: "spring", bounce: 0.4 }}
                                    className="text-7xl md:text-[14rem] font-black leading-none tracking-tighter uppercase mix-blend-difference"
                                >
                                    {portfolioData.name.split(' ').map((word, i) => (
                                        <motion.span
                                            key={i}
                                            whileHover={{ fontStyle: "italic", x: 20 }}
                                            className="block transition-all duration-300 cursor-crosshair"
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                </motion.h1>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 1 }}
                                    className="absolute bottom-12 right-12 md:right-32 flex items-center gap-4 text-xs font-mono uppercase tracking-widest"
                                >
                                    <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                                        <ArrowRight className="w-6 h-6 text-[var(--accent)]" />
                                    </motion.div>
                                    <span>Hold & Scroll</span>
                                </motion.div>
                            </div>
                        </section>

                        {/* SECTION 2: ABOUT & SKILLS */}
                        <section className="w-[100vw] h-full flex flex-col justify-center px-8 md:px-32 border-l border-[var(--text-color)]/10 flex-shrink-0 relative group">
                            <div className="absolute inset-0 bg-[var(--text-color)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10 bg-[radial-gradient(circle_at_center,var(--text-color)_1px,transparent_1px)] [background-size:40px_40px]"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                                <div>
                                    <h3 className="text-xs font-mono text-[var(--accent)] mb-8 uppercase tracking-widest flex items-center gap-4">
                                        <span className="w-8 h-px bg-[var(--accent)]"></span> Intro
                                    </h3>
                                    <p className="text-3xl md:text-5xl font-light leading-tight text-[var(--text-color)]/90">
                                        {portfolioData.about}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xs font-mono text-[var(--accent)] mb-8 uppercase tracking-widest flex items-center gap-4">
                                        <span className="w-8 h-px bg-[var(--accent)]"></span> Arsenal
                                    </h3>
                                    <div className="flex flex-wrap gap-4">
                                        {portfolioData.skills && portfolioData.skills.map(skill => (
                                            <motion.span
                                                key={skill}
                                                whileHover={{ scale: 1.1, backgroundColor: "var(--accent)", color: "var(--bg-color)", borderColor: "transparent" }}
                                                className="text-xl border border-[var(--text-color)]/20 px-6 py-3 rounded-[2rem] transition-colors duration-300 cursor-none"
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 3: EXPERIENCE & EDUCATION */}
                        <section className="w-[100vw] h-full flex flex-col justify-center px-8 md:px-32 border-l border-[var(--text-color)]/10 flex-shrink-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 w-full h-3/4">

                                {/* Experience Timeline */}
                                <div className="flex flex-col h-full">
                                    <h3 className="text-xs font-mono text-[var(--accent)] mb-12 uppercase tracking-widest flex items-center gap-4">
                                        <Briefcase className="w-4 h-4" /> Career
                                    </h3>
                                    <div className="flex-1 overflow-y-auto pr-8 custom-scrollbar">
                                        <div className="border-l border-[var(--text-color)]/20 ml-2 space-y-12 pb-12">
                                            {portfolioData.experience && portfolioData.experience.map((exp, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.2 }}
                                                    className="relative pl-8"
                                                >
                                                    <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]"></div>
                                                    <div className="text-sm font-mono opacity-50 mb-2">{exp.duration}</div>
                                                    <h4 className="text-2xl font-bold uppercase tracking-tight">{exp.role}</h4>
                                                    <div className="text-[var(--accent)] mb-4">{exp.company}</div>
                                                    <p className="text-[var(--text-color)]/70 text-lg leading-relaxed">{exp.description}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Education */}
                                <div className="flex flex-col h-full border-t pt-12 md:border-t-0 md:pt-0 border-[var(--text-color)]/10">
                                    <h3 className="text-xs font-mono text-[var(--accent)] mb-12 uppercase tracking-widest flex items-center gap-4">
                                        <GraduationCap className="w-4 h-4" /> Origins
                                    </h3>
                                    <div className="space-y-8">
                                        {portfolioData.education && portfolioData.education.map((edu, idx) => (
                                            <motion.div
                                                key={idx}
                                                whileHover={{ x: 10 }}
                                                className="bg-[var(--text-color)]/5 border border-[var(--text-color)]/10 p-8 rounded-2xl backdrop-blur-sm"
                                            >
                                                <div className="font-mono text-xs text-[var(--accent)] mb-2">{edu.year}</div>
                                                <h4 className="text-2xl font-bold">{edu.degree}</h4>
                                                <div className="text-lg opacity-60 mt-2">{edu.school}</div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </section>

                        {/* SECTION 4: PROJECTS */}
                        <section className="w-[100vw] h-full flex flex-col justify-center px-8 md:px-32 border-l border-[var(--text-color)]/10 flex-shrink-0">
                            <h3 className="text-xs font-mono text-[var(--accent)] mb-16 uppercase tracking-widest flex items-center gap-4">
                                <span className="w-8 h-px bg-[var(--accent)]"></span> Selected Works
                            </h3>
                            <div className="flex gap-12 w-full overflow-visible pb-12 pr-32">
                                {portfolioData.projects && portfolioData.projects.map((project, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -20, rotate: -2, backgroundColor: "var(--text-color)", color: "var(--bg-color)" }}
                                        className="min-w-[400px] md:min-w-[600px] aspect-[4/5] bg-[var(--text-color)]/5 border border-[var(--text-color)]/10 p-12 flex flex-col justify-between group cursor-crosshair transition-colors duration-500 rounded-[2rem]"
                                    >
                                        <div>
                                            <span className="text-[var(--accent)] group-hover:text-[var(--bg-color)] font-mono text-sm uppercase mb-4 block transition-colors">0{idx + 1} // {project.role}</span>
                                            <h4 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mix-blend-difference">{project.title}</h4>
                                        </div>
                                        <p className="text-xl md:text-2xl opacity-70 group-hover:opacity-100 font-light max-w-sm mix-blend-difference">{project.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* SECTION 5: CONTACT & FOOTER */}
                        <section className="w-[100vw] h-full flex flex-col items-center justify-center px-8 md:px-32 border-l border-[var(--text-color)]/10 flex-shrink-0 relative overflow-hidden">

                            {/* Massive Background Marquee */}
                            <div className="absolute inset-0 pointer-events-none flex flex-col justify-center opacity-[0.03] overflow-hidden -z-10">
                                <motion.div animate={{ x: [0, -2000] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="whitespace-nowrap text-[25vw] font-black uppercase leading-none text-transparent border-text">
                                    LET'S TALK LET'S TALK LET'S TALK
                                </motion.div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 w-full max-w-5xl z-10 bg-[var(--bg-color)]/80 backdrop-blur-xl p-12 md:p-24 rounded-[3rem] border border-[var(--text-color)]/10 shadow-2xl">

                                {/* Footer Text Left */}
                                <div className="flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 uppercase min-w-[300px]">Signal.<br />Received.</h2>
                                        <p className="text-xl font-light opacity-60 mb-12">Drop a line for collaboration, inquiries, or coffee.</p>
                                    </div>

                                    <div className="space-y-6">
                                        <a href={`mailto:${portfolioData.contactEmail}`} className="inline-flex items-center gap-4 text-2xl font-bold hover:text-[var(--accent)] transition-colors">
                                            {portfolioData.contactEmail}
                                            <ArrowRight className="w-6 h-6" />
                                        </a>
                                        <div className="flex gap-6 pt-8 border-t border-[var(--text-color)]/10">
                                            {portfolioData.socialLinks?.twitter && (
                                                <a href="#" className="flex gap-2 items-center text-sm font-mono uppercase hover:text-[var(--accent)] transition-colors"><Twitter className="w-4 h-4" /> Twitter</a>
                                            )}
                                            {portfolioData.socialLinks?.linkedin && (
                                                <a href="#" className="flex gap-2 items-center text-sm font-mono uppercase hover:text-[var(--accent)] transition-colors"><Linkedin className="w-4 h-4" /> LinkedIn</a>
                                            )}
                                            {portfolioData.socialLinks?.github && (
                                                <a href="#" className="flex gap-2 items-center text-sm font-mono uppercase hover:text-[var(--accent)] transition-colors"><Github className="w-4 h-4" /> GitHub</a>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Interactive Form Right */}
                                <div className="relative">
                                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-6" onFocus={() => setFormState('typing')} onBlur={(e) => { if (!e.relatedTarget) setFormState('idle') }}>
                                        <div className="relative group">
                                            <input type="text" placeholder="Your Name" required className="w-full bg-transparent border-b-2 border-[var(--text-color)]/20 px-0 py-4 text-xl outline-none focus:border-[var(--accent)] transition-colors peer" />
                                            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--accent)] transition-all duration-300 peer-focus:w-full"></div>
                                        </div>
                                        <div className="relative group">
                                            <input type="email" placeholder="Your Email Address" required className="w-full bg-transparent border-b-2 border-[var(--text-color)]/20 px-0 py-4 text-xl outline-none focus:border-[var(--accent)] transition-colors peer" />
                                            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--accent)] transition-all duration-300 peer-focus:w-full"></div>
                                        </div>
                                        <div className="relative group mt-4">
                                            <textarea placeholder="Tell me about your project..." rows="3" required className="w-full bg-[var(--text-color)]/5 border border-[var(--text-color)]/10 rounded-xl p-4 text-lg outline-none focus:border-[var(--accent)] transition-colors resize-none"></textarea>
                                        </div>

                                        <AnimatePresence mode="wait">
                                            {formState === 'submitted' ? (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                                                    className="w-full py-6 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center font-bold tracking-widest text-lg border border-green-500/50"
                                                >
                                                    MESSAGE SENT
                                                </motion.div>
                                            ) : (
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                                    type="submit"
                                                    className="w-full py-6 bg-[var(--text-color)] text-[var(--bg-color)] rounded-xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-lg hover:bg-[var(--accent)] transition-colors group"
                                                >
                                                    Dispatch <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </motion.button>
                                            )}
                                        </AnimatePresence>
                                    </form>
                                </div>
                            </div>
                        </section>

                    </motion.div>
                </div>
            </div>

            {/* Hide scrollbars specifically for the internal timeline */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 4px; }
        .border-text { -webkit-text-stroke: 1px var(--text-color); }
      `}} />
        </div>
    );
}
