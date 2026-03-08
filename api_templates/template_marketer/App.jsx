import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { Zap, TrendingUp, Users, Target, Send, ArrowUpRight, CheckCircle2, Briefcase, GraduationCap } from 'lucide-react';
import portfolioData from './data.json';

// Neon Cursor Glow effect
const GlowCursor = () => {
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
            className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
            animate={{
                x: mousePosition.x - 200,
                y: mousePosition.y - 200,
            }}
            transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
            style={{
                background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
                opacity: 0.15,
                mixBlendMode: 'screen'
            }}
        />
    );
};

export default function App() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);

    const [formState, setFormState] = useState('idle');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormState('submitted');
        setTimeout(() => setFormState('idle'), 3000);
    };

    return (
        <div ref={containerRef} className="bg-[var(--bg-color)] text-[var(--text-color)] min-h-screen selection:bg-[var(--accent)] selection:text-[var(--bg-color)] font-sans overflow-x-hidden relative">
            <GlowCursor />

            {/* Background Grid Pattern */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(var(--text-color) 1px, transparent 1px), linear-gradient(90deg, var(--text-color) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

            {/* HEADER */}
            <header className="fixed top-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
                <div className="font-black text-2xl uppercase tracking-tighter flex items-center gap-2">
                    <Zap className="text-[var(--accent)] fill-[var(--accent)]" /> {portfolioData.name.split(' ')[0]}
                </div>
                <a href="#contact" className="font-bold uppercase tracking-widest text-xs py-3 px-6 bg-[var(--text-color)] text-[var(--bg-color)] hover:bg-[var(--accent)] transition-colors rounded-sm shadow-[4px_4px_0_var(--accent)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
                    Start Campaign
                </a>
            </header>

            <main className="relative z-10 px-6 md:px-12 pt-32 max-w-7xl mx-auto">

                {/* HERO SECTION: Brutalist & High Energy */}
                <section className="min-h-[80vh] flex flex-col justify-center relative">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        className="inline-block bg-[var(--accent)] text-[var(--bg-color)] font-black uppercase tracking-widest px-4 py-2 text-sm md:text-xl w-max mb-8 rotate-3 shadow-[8px_8px_0_var(--text-color)]"
                    >
                        {portfolioData.title}
                    </motion.div>

                    <h1 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] mb-12 mix-blend-difference relative z-10">
                        <motion.span initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="block overflow-hidden">
                            <span className="block hover:-translate-y-4 hover:text-[var(--accent)] transition-transform cursor-pointer">Growth Is The</span>
                        </motion.span>
                        <motion.span initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="block overflow-hidden">
                            <span className="block hover:translate-x-8 hover:text-[var(--accent)] transition-transform cursor-pointer text-transparent" style={{ WebkitTextStroke: '2px var(--text-color)' }}>Only Metric.</span>
                        </motion.span>
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end relative z-10">
                        <motion.p
                            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                            className="md:col-span-2 text-2xl md:text-4xl font-medium leading-tight bg-[var(--text-color)] text-[var(--bg-color)] p-8 shadow-[12px_12px_0_var(--accent)]"
                        >
                            {portfolioData.about}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, type: "spring" }}
                            className="hidden md:flex flex-col items-center justify-center p-8 border-4 border-[var(--text-color)] bg-[var(--bg-color)] aspect-square rounded-full animate-spin-slow"
                        >
                            <Target className="w-16 h-16 text-[var(--accent)] mb-2" />
                            <span className="font-black uppercase tracking-widest text-xs text-center">Laser<br />Focused</span>
                        </motion.div>
                    </div>
                </section>

                {/* BENTO BOX GRID: EXPERIENCE, SKILLS, EDUCATION */}
                <section className="py-32 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-auto">

                        {/* Box 1: Core Skills */}
                        <motion.div
                            whileHover={{ y: -10, boxShadow: "8px 8px 0 var(--accent)" }}
                            className="md:col-span-2 md:row-span-1 bg-[var(--text-color)]/5 border-2 border-[var(--text-color)] p-8 transition-all relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)] rounded-full blur-[60px] opacity-20 group-hover:opacity-50 transition-opacity"></div>
                            <h3 className="font-black uppercase tracking-widest text-xl mb-6 flex items-center gap-2">
                                <TrendingUp className="text-[var(--accent)]" /> Value Multipliers
                            </h3>
                            <div className="flex flex-wrap gap-3 relative z-10">
                                {portfolioData.skills && portfolioData.skills.map(skill => (
                                    <span key={skill} className="px-4 py-2 border border-[var(--text-color)] font-bold text-sm uppercase shadow-[2px_2px_0_var(--accent)] bg-[var(--bg-color)] hover:bg-[var(--accent)] hover:text-[var(--bg-color)] transition-colors cursor-crosshair">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Box 2: Education */}
                        <motion.div
                            whileHover={{ y: -10, boxShadow: "8px 8px 0 var(--accent)" }}
                            className="md:col-span-2 md:row-span-1 bg-[var(--text-color)] border-2 border-[var(--text-color)] text-[var(--bg-color)] p-8 transition-all flex flex-col justify-between"
                        >
                            <h3 className="font-black uppercase tracking-widest text-xl mb-6 flex items-center gap-2 text-[var(--accent)]">
                                <GraduationCap className="text-[var(--bg-color)]" /> Foundation
                            </h3>
                            {portfolioData.education && portfolioData.education.map((edu, idx) => (
                                <div key={idx}>
                                    <div className="text-4xl font-black uppercase mb-2 tracking-tighter">{edu.degree}</div>
                                    <div className="text-xl font-medium opacity-80 flex justify-between">
                                        <span>{edu.school}</span>
                                        <span className="font-black text-[var(--accent)]">'{edu.year.slice(-2)}</span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Box 3: Experience Timeline */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="md:col-span-4 bg-[var(--bg-color)] border-2 border-[var(--text-color)] p-8 md:p-16 shadow-[16px_16px_0_var(--accent)] transition-all"
                        >
                            <h3 className="font-black uppercase tracking-[0.2em] text-3xl mb-16 flex items-center gap-4 border-b-4 border-[var(--text-color)] pb-6">
                                <Briefcase className="w-10 h-10 text-[var(--accent)]" /> Track Record
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                {portfolioData.experience && portfolioData.experience.map((exp, idx) => (
                                    <div key={idx} className="relative group">
                                        <div className="absolute -left-6 top-2 w-4 h-4 bg-[var(--text-color)] rounded-full group-hover:bg-[var(--accent)] transition-colors"></div>
                                        <div className="absolute -left-[18px] top-6 w-1 h-full bg-[var(--text-color)]  group-hover:bg-[var(--accent)] transition-colors"></div>

                                        <div className="bg-[var(--accent)] text-[var(--bg-color)] font-black text-xs uppercase px-3 py-1 inline-block mb-4 shadow-[2px_2px_0_var(--text-color)]">
                                            {exp.duration}
                                        </div>
                                        <h4 className="text-4xl font-black uppercase tracking-tighter mb-2 group-hover:text-[var(--accent)] transition-colors">{exp.role}</h4>
                                        <h5 className="text-xl font-bold uppercase tracking-widest opacity-60 mb-4">{exp.company}</h5>
                                        <p className="text-lg font-medium">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </section>

                {/* PROJECTS SECTION (Kinetic Cards) */}
                <section className="py-32 relative z-10 w-full">
                    <motion.div
                        initial={{ x: -100 }} whileInView={{ x: 0 }} transition={{ type: "spring", stiffness: 50 }}
                        className="bg-[var(--text-color)] text-[var(--bg-color)] inline-block w-[120%] -ml-[10%] py-4 mb-24 rotate-[-1deg]"
                    >
                        <div className="max-w-7xl mx-auto px-6 font-black uppercase tracking-[0.3em] flex items-center gap-8 overflow-hidden text-2xl md:text-5xl whitespace-nowrap">
                            <span className="text-[var(--accent)]"><Zap fill="currentColor" /></span> CAMPAIGNS
                            <span className="text-[var(--accent)]"><Zap fill="currentColor" /></span> CAMPAIGNS
                            <span className="text-[var(--accent)]"><Zap fill="currentColor" /></span> CAMPAIGNS
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
                        {portfolioData.projects && portfolioData.projects.map((project, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -15, scale: 1.02 }}
                                className="group aspect-[4/3] bg-[var(--text-color)]/5 border-4 border-[var(--text-color)] p-8 md:p-12 flex flex-col justify-between hover:bg-black hover:text-white transition-all overflow-hidden relative"
                            >
                                <div className="absolute -right-4 -top-4 w-32 h-32 bg-[var(--accent)] rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative z-10 flex justify-between items-start">
                                    <div className="bg-[var(--text-color)] text-[var(--bg-color)] group-hover:bg-[var(--accent)] group-hover:text-black font-black uppercase tracking-widest text-xs px-4 py-2 shadow-[4px_4px_0_var(--accent)] group-hover:shadow-[4px_4px_0_white] transition-all">
                                        {project.role}
                                    </div>
                                    <ArrowUpRight className="w-12 h-12 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 group-hover:translate-x-2 transition-all duration-300" />
                                </div>

                                <div className="relative z-10 mt-12">
                                    <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">{project.title}</h3>
                                    <p className="text-xl md:text-2xl font-medium border-l-4 border-[var(--accent)] pl-6">{project.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

            </main>

            {/* FOOTER & BRUTALIST CONTACT FORM */}
            <footer id="contact" className="mt-20 border-t-8 border-[var(--text-color)] bg-[var(--accent)] text-black relative z-20 overflow-hidden">

                {/* Massive Marquee */}
                <div className="border-b-8 border-[var(--text-color)] bg-[var(--text-color)] text-[var(--accent)] py-4 flex whitespace-nowrap overflow-hidden">
                    <motion.div animate={{ x: [0, -1000] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="font-black text-4xl uppercase tracking-[0.2em] flex gap-8">
                        <span>CONVERT AUDIENCES</span> <span className="text-[var(--bg-color)]">x</span>
                        <span>DRIVE REVENUE</span> <span className="text-[var(--bg-color)]">x</span>
                        <span>CONVERT AUDIENCES</span> <span className="text-[var(--bg-color)]">x</span>
                        <span>DRIVE REVENUE</span> <span className="text-[var(--bg-color)]">x</span>
                        <span>CONVERT AUDIENCES</span> <span className="text-[var(--bg-color)]">x</span>
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">

                    <div>
                        <h2 className="text-8xl md:text-[12rem] font-black tracking-tighter uppercase leading-[0.8] mb-12">Action<br />Req.</h2>
                        <a href={`mailto:${portfolioData.contactEmail}`} className="inline-block text-2xl md:text-4xl font-black border-b-8 border-[var(--text-color)] hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] transition-all px-2">
                            {portfolioData.contactEmail}
                        </a>
                    </div>

                    {/* Interactive Brutalist Form */}
                    <div className="bg-[var(--bg-color)] border-4 border-[var(--text-color)] p-8 md:p-12 shadow-[16px_16px_0_var(--text-color)] relative">
                        <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4 text-[var(--text-color)]">
                            <Target className="w-8 h-8 text-[var(--accent)]" /> Pitch Me.
                        </h3>

                        <form onSubmit={handleFormSubmit} className="space-y-6">

                            <div className="group">
                                <label className="font-black uppercase tracking-widest text-sm mb-2 block text-[var(--text-color)]">Identity</label>
                                <input type="text" required className="w-full bg-[var(--text-color)]/5 border-4 border-[var(--text-color)] p-4 text-xl font-bold outline-none focus:bg-[var(--accent)] focus:border-[var(--text-color)] transition-colors text-[var(--text-color)]" />
                            </div>

                            <div className="group">
                                <label className="font-black uppercase tracking-widest text-sm mb-2 block text-[var(--text-color)]">Destination Email</label>
                                <input type="email" required className="w-full bg-[var(--text-color)]/5 border-4 border-[var(--text-color)] p-4 text-xl font-bold outline-none focus:bg-[var(--accent)] focus:border-[var(--text-color)] transition-colors text-[var(--text-color)]" />
                            </div>

                            <div className="group">
                                <label className="font-black uppercase tracking-widest text-sm mb-2 block text-[var(--text-color)]">The Brief</label>
                                <textarea required rows="4" className="w-full bg-[var(--text-color)]/5 border-4 border-[var(--text-color)] p-4 text-xl font-bold outline-none focus:bg-[var(--accent)] focus:border-[var(--text-color)] transition-colors resize-none text-[var(--text-color)]" placeholder="Numbers, goals, timelines..."></textarea>
                            </div>

                            <AnimatePresence mode="wait">
                                {formState === 'submitted' ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                        className="w-full py-6 bg-[var(--text-color)] text-[var(--bg-color)] font-black text-2xl uppercase tracking-widest flex items-center justify-center gap-4 border-4 border-[var(--text-color)]"
                                    >
                                        <CheckCircle2 className="w-8 h-8 text-[var(--accent)]" /> Sent to CRM.
                                    </motion.div>
                                ) : (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full py-6 bg-[var(--text-color)] text-[var(--bg-color)] hover:bg-[var(--accent)] hover:text-[var(--text-color)] font-black text-2xl uppercase tracking-widest border-4 border-[var(--text-color)] shadow-[8px_8px_0_var(--text-color)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all flex items-center justify-center gap-4"
                                    >
                                        Launch <Send className="w-8 h-8" />
                                    </motion.button>
                                )}
                            </AnimatePresence>

                        </form>
                    </div>

                </div>
            </footer>

            <style dangerouslySetInnerHTML={{
                __html: `
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
      `}} />
        </div>
    );
}
