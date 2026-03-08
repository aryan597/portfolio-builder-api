import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, Github, Linkedin, Briefcase, GraduationCap, Send, ShieldCheck, Globe } from 'lucide-react';
import portfolioData from './data.json';

// Simulated 3D Glass Sphere
const GlassSphere = () => {
    return (
        <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] rounded-full z-0 pointer-events-none"
            animate={{
                rotate: 360,
                scale: [1, 1.05, 1],
            }}
            transition={{
                rotate: { duration: 50, repeat: Infinity, ease: "linear" },
                scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 60%)',
                boxShadow: 'inset 0 0 100px rgba(255,255,255,0.05), border 1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
            }}
        >
            <div className="absolute inset-0 rounded-full border border-white/5 saturate-200" />
        </motion.div>
    );
};

export default function App() {
    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    const [formState, setFormState] = useState('idle');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormState('submitted');
        setTimeout(() => setFormState('idle'), 4000);
    };

    return (
        <div className="bg-[var(--bg-color)] text-[var(--text-color)] min-h-screen selection:bg-[var(--text-color)] selection:text-[var(--bg-color)] font-sans overflow-x-hidden relative">

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 bg-gradient-to-br from-transparent to-black/20 pointer-events-none"></div>

            {/* HEADER */}
            <header className="fixed top-0 w-full p-8 flex justify-between items-center z-50">
                <div className="font-bold tracking-tight text-xl mix-blend-difference">{portfolioData.name}</div>
                <a href="#contact" className="text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full border border-[var(--text-color)]/20 hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] transition-all backdrop-blur-md">
                    Initiate Contact
                </a>
            </header>

            <main className="relative z-10 px-8 md:px-24">

                {/* HERO SECTION */}
                <section className="min-h-screen flex flex-col justify-center relative">
                    <GlassSphere />

                    <motion.div style={{ y: yHero, opacity: opacityHero }} className="relative z-10 max-w-5xl mt-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <span className="w-12 h-px bg-[var(--text-color)] opacity-30"></span>
                            <span className="text-sm font-medium uppercase tracking-widest opacity-60 text-[var(--accent)]">{portfolioData.title}</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
                            className="text-5xl md:text-8xl font-medium tracking-tight leading-[1.1] mb-12 mix-blend-difference"
                        >
                            Visionary execution meets <br className="hidden md:block" />
                            <span className="text-[var(--text-color)]/40 italic">uncompromising</span> scale.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
                            className="text-xl md:text-3xl font-light opacity-80 max-w-3xl leading-relaxed mix-blend-difference"
                        >
                            {portfolioData.about}
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-12 left-0 flex flex-col gap-4 text-xs font-bold uppercase tracking-widest opacity-50"
                        animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ repeat: Infinity, duration: 3 }}
                    >
                        Scroll Down <ArrowRight className="w-4 h-4 rotate-90" />
                    </motion.div>
                </section>

                {/* CAREER TIMELINE & EDUCATION */}
                <section className="py-32 grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">

                    {/* Experience */}
                    <div className="space-y-16">
                        <h2 className="text-2xl font-medium flex items-center gap-4 border-b border-[var(--text-color)]/10 pb-6 mb-12">
                            <Briefcase className="w-6 h-6 opacity-50" /> Executive Tenure
                        </h2>

                        <div className="border-l border-[var(--text-color)]/20 ml-3 pl-10 space-y-16">
                            {portfolioData.experience && portfolioData.experience.map((exp, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
                                    className="relative group"
                                >
                                    <div className="absolute -left-[45px] top-1 w-[10px] h-[10px] rounded-full bg-[var(--text-color)] group-hover:scale-150 group-hover:bg-[var(--accent)] transition-all"></div>
                                    <div className="text-sm font-bold uppercase tracking-widest opacity-40 mb-3">{exp.duration}</div>
                                    <h3 className="text-3xl font-medium mb-1">{exp.role}</h3>
                                    <h4 className="text-xl opacity-60 mb-6">{exp.company}</h4>
                                    <p className="text-lg opacity-80 leading-relaxed font-light">{exp.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Education & Core Competencies */}
                    <div className="space-y-16">
                        <div>
                            <h2 className="text-2xl font-medium flex items-center gap-4 border-b border-[var(--text-color)]/10 pb-6 mb-12">
                                <ShieldCheck className="w-6 h-6 opacity-50" /> Core Competencies
                            </h2>
                            <div className="flex flex-wrap gap-4">
                                {portfolioData.skills && portfolioData.skills.map((skill, idx) => (
                                    <motion.div
                                        key={skill}
                                        initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                                        className="px-6 py-4 rounded-2xl bg-[var(--text-color)]/5 border border-[var(--text-color)]/10 text-sm md:text-base font-medium backdrop-blur-sm hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] transition-colors cursor-default"
                                    >
                                        {skill}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-16">
                            <h2 className="text-2xl font-medium flex items-center gap-4 border-b border-[var(--text-color)]/10 pb-6 mb-12">
                                <GraduationCap className="w-6 h-6 opacity-50" /> Academic Foundation
                            </h2>
                            <div className="space-y-8">
                                {portfolioData.education && portfolioData.education.map((edu, idx) => (
                                    <div key={idx} className="flex flex-col gap-2 p-8 rounded-3xl bg-gradient-to-br from-[var(--text-color)]/5 to-transparent border border-[var(--text-color)]/10 backdrop-blur-sm">
                                        <div className="text-sm font-bold uppercase tracking-widest opacity-40">{edu.year}</div>
                                        <h3 className="text-2xl font-medium">{edu.degree}</h3>
                                        <div className="text-lg opacity-70">{edu.school}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </section>

                {/* STRATEGIC INITIATIVES / PROJECTS */}
                <section className="py-32 relative z-10 w-full">
                    <h2 className="text-2xl font-medium flex items-center gap-4 border-b border-[var(--text-color)]/10 pb-6 mb-16">
                        <Globe className="w-6 h-6 opacity-50" /> Strategic Initiatives
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                        {portfolioData.projects && portfolioData.projects.map((project, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                                className="group aspect-video bg-[var(--text-color)]/5 rounded-[2rem] border border-[var(--text-color)]/10 p-12 flex flex-col justify-between hover:bg-[var(--text-color)]/10 transition-colors backdrop-blur-md overflow-hidden relative"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                                <div className="relative z-10">
                                    <div className="text-xs font-bold uppercase tracking-widest opacity-50 mb-6">{project.role}</div>
                                    <h3 className="text-4xl md:text-5xl font-medium mb-4">{project.title}</h3>
                                </div>
                                <p className="text-xl opacity-80 font-light relative z-10">{project.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>

            {/* MASSIVE INTERACTIVE FOOTER */}
            <footer id="contact" className="mt-32 border-t border-[var(--text-color)]/10 bg-[var(--text-color)] text-[var(--bg-color)] rounded-t-[4rem] relative z-20 overflow-hidden">

                {/* Abstract shapes in the footer */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--accent)]/20 rounded-full blur-[100px] mix-blend-overlay pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

                <div className="max-w-7xl mx-auto px-8 py-32 grid grid-cols-1 lg:grid-cols-12 gap-24 relative z-10">

                    {/* Left Col: Contact Info */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                        <div>
                            <h2 className="text-7xl md:text-9xl font-medium tracking-tighter leading-none mb-8">Let's <br />Talk.</h2>
                            <p className="text-2xl opacity-80 font-light mb-12">Executive advisory, board seats, and strategic partnerships.</p>
                            <a href={`mailto:${portfolioData.contactEmail}`} className="inline-flex items-center gap-4 text-3xl font-medium border-b-2 border-transparent hover:border-[var(--bg-color)] transition-border pb-2">
                                <Mail className="w-8 h-8" /> {portfolioData.contactEmail}
                            </a>
                        </div>

                        <div className="flex gap-8 mt-24 opacity-60">
                            {portfolioData.socialLinks?.linkedin && <a href="#" className="flex gap-2 items-center hover:opacity-100 transition-opacity"><Linkedin className="w-6 h-6" /> LinkedIn</a>}
                            {portfolioData.socialLinks?.twitter && <a href="#" className="flex gap-2 items-center hover:opacity-100 transition-opacity"><Github className="w-6 h-6" /> Twitter</a>}
                        </div>
                    </div>

                    {/* Right Col: Animated Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-[var(--bg-color)] text-[var(--text-color)] rounded-[3rem] p-12 md:p-16 shadow-2xl">
                            <h3 className="text-3xl font-medium mb-12">Submit Confidential Inquiry</h3>

                            <form onSubmit={handleFormSubmit} className="space-y-8">
                                <div className="relative group">
                                    <input type="text" required className="w-full bg-transparent border-b border-[var(--text-color)]/20 py-4 text-xl outline-none peer transition-colors focus:border-transparent" placeholder=" " />
                                    <label className="absolute left-0 top-4 text-xl opacity-50 peer-focus:-top-6 peer-focus:text-sm peer-focus:opacity-100 peer-valid:-top-6 peer-valid:text-sm peer-valid:opacity-100 transition-all pointer-events-none text-[var(--accent)] font-medium">Full Name</label>
                                    <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-[var(--accent)] peer-focus:w-full transition-all duration-300"></div>
                                </div>

                                <div className="relative group pt-4">
                                    <input type="email" required className="w-full bg-transparent border-b border-[var(--text-color)]/20 py-4 text-xl outline-none peer transition-colors focus:border-transparent" placeholder=" " />
                                    <label className="absolute left-0 top-8 text-xl opacity-50 peer-focus:-top-2 peer-focus:text-sm peer-focus:opacity-100 peer-valid:-top-2 peer-valid:text-sm peer-valid:opacity-100 transition-all pointer-events-none text-[var(--accent)] font-medium">Email Address</label>
                                    <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-[var(--accent)] peer-focus:w-full transition-all duration-300"></div>
                                </div>

                                <div className="relative group pt-4">
                                    <textarea required rows="3" className="w-full bg-[var(--text-color)]/5 border border-[var(--text-color)]/10 rounded-2xl p-6 text-xl outline-none peer transition-colors focus:border-[var(--accent)] resize-none" placeholder="Nature of inquiry..."></textarea>
                                </div>

                                <AnimatePresence mode="wait">
                                    {formState === 'submitted' ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                            className="w-full py-6 rounded-full bg-green-500/10 text-green-700 border border-green-500/30 flex items-center justify-center font-bold text-xl"
                                        >
                                            Inquiry Submitted.
                                        </motion.div>
                                    ) : (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            className="w-full py-6 rounded-full bg-[var(--text-color)] text-[var(--bg-color)] font-medium text-xl flex items-center justify-center gap-4 hover:shadow-2xl transition-all group"
                                        >
                                            Send Message <Send className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </form>
                        </div>
                    </div>

                </div>
            </footer>
        </div>
    );
}
