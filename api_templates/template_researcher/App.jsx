import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { BookOpen, FileText, ArrowUpRight, Microscope, Send, Briefcase, GraduationCap, CopyCheck } from 'lucide-react';
import portfolioData from './data.json';

// Interactive Footnote Component
const Footnote = ({ number, text }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <span
            className="relative inline-flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full border border-[var(--accent)] text-[var(--accent)] text-[10px] md:text-xs font-sans cursor-help mx-1 align-super hover:bg-[var(--accent)] hover:text-[var(--bg-color)] transition-colors group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {number}
            <AnimatePresence>
                {isHovered && (
                    <motion.span
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 md:p-6 bg-[var(--text-color)] text-[var(--bg-color)] text-sm font-serif italic text-center shadow-2xl z-50 pointer-events-none rounded-none"
                    >
                        {text}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-[var(--text-color)]"></div>
                    </motion.span>
                )}
            </AnimatePresence>
        </span>
    );
};

export default function App() {
    const { scrollYProgress } = useScroll();
    const titleY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
    const imageY = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const [formState, setFormState] = useState('idle');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormState('submitted');
        setTimeout(() => setFormState('idle'), 5000);
    };

    return (
        <div className="bg-[var(--bg-color)] text-[var(--text-color)] min-h-screen selection:bg-[var(--accent)] selection:text-white font-serif antialiased overflow-x-hidden relative">

            {/* Editorial Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply z-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat"></div>

            {/* MINIMAL EDITORIAL HEADER */}
            <header className="py-6 px-6 md:px-16 border-b border-[var(--text-color)]/10 flex justify-between items-center bg-[var(--bg-color)]/90 backdrop-blur-md sticky top-0 z-40">
                <div className="font-bold tracking-[0.2em] uppercase font-sans text-xs flex items-center gap-4">
                    <BookOpen className="w-4 h-4 text-[var(--accent)]" /> {portfolioData.name} <span className="opacity-40 hidden md:inline">— {portfolioData.title}</span>
                </div>
                <div className="font-serif italic text-sm text-[var(--accent)] tracking-widest hidden md:block">VOL. I — {new Date().getFullYear()}</div>
            </header>

            {/* ABSTRACT / HERO */}
            <main className="max-w-7xl mx-auto px-6 md:px-16 pt-24 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Text Content */}
                    <motion.div style={{ y: titleY }} className="lg:col-span-8 z-10">
                        <div className="text-xs font-sans uppercase tracking-[0.3em] text-[var(--text-color)]/50 mb-8 flex items-center gap-4">
                            <span className="w-12 h-px bg-[var(--text-color)]/30"></span> The Abstract
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-[6rem] leading-[1.05] tracking-tight text-[var(--text-color)] mb-16 relative">
                            <span className="absolute -left-12 top-4 w-8 h-2 bg-[var(--accent)] hidden lg:block"></span>
                            {portfolioData.title}
                        </h1>

                        <div className="prose prose-lg md:prose-2xl text-[var(--text-color)]/80 max-w-none font-light leading-relaxed">
                            <p className="first-letter:text-8xl first-letter:font-normal first-letter:text-[var(--accent)] first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8]">
                                {portfolioData.about}
                            </p>
                            <p className="mt-8 text-xl">
                                The intersection of methodology and discovery requires rigorous analysis<Footnote number="1" text="Data interpretation requires both qualitative depth and quantitative precision in equal measure to avoid epistemic bias." />. My work explores these boundaries, pushing the epistemology of our field forward into new paradigms.
                            </p>
                        </div>
                    </motion.div>

                    {/* Stylized Figure / Illustration image area */}
                    <motion.div style={{ y: imageY }} className="lg:col-span-4 hidden lg:flex flex-col gap-8 opacity-90 mt-32">
                        <div className="aspect-[3/4] border border-[var(--text-color)]/20 p-4 relative overflow-hidden group bg-[var(--text-color)]/5 hover:bg-[var(--accent)] hover:text-[var(--bg-color)] transition-colors duration-700">

                            {/* Da Vinci style sketch background lines */}
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.05)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.05)_50%,rgba(0,0,0,0.05)_75%,transparent_75%,transparent)] bg-[length:4px_4px] opacity-20"></div>

                            <div className="w-full h-full border border-current flex flex-col items-center justify-center relative">
                                <Microscope className="w-32 h-32 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" strokeWidth={0.5} />
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] font-sans uppercase tracking-widest opacity-50 group-hover:opacity-100 border-t border-current pt-2">
                                    <span>Fig 1. methodology</span>
                                    <span>// Scale: 1:1</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* CHRONOLOGY & ACADEMICS (Deep Content) */}
            <section className="border-t border-[var(--text-color)]/10 py-32 bg-[var(--text-color)]/[0.02]">
                <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-24">

                    {/* Work Experience */}
                    <div>
                        <div className="text-xs font-sans uppercase tracking-[0.3em] text-[var(--accent)] mb-16 flex items-center gap-4">
                            <Briefcase className="w-4 h-4" /> Professional Tenure
                        </div>

                        <div className="space-y-16">
                            {portfolioData.experience && portfolioData.experience.map((exp, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="group"
                                >
                                    <div className="text-xs font-sans uppercase tracking-[0.2em] opacity-40 mb-3">{exp.duration}</div>
                                    <h3 className="text-3xl font-normal leading-tight mb-2 group-hover:text-[var(--accent)] transition-colors line-clamp-2 pr-4">{exp.role}</h3>
                                    <h4 className="text-lg italic opacity-80 mb-6 font-serif inline-block border-b border-transparent group-hover:border-[var(--text-color)]/20 transition-border">{exp.company}</h4>
                                    <p className="text-[var(--text-color)]/70 text-lg leading-relaxed">{exp.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div>
                        <div className="text-xs font-sans uppercase tracking-[0.3em] text-[var(--accent)] mb-16 flex items-center gap-4">
                            <GraduationCap className="w-4 h-4" /> Academic Record
                        </div>

                        <div className="space-y-12">
                            {portfolioData.education && portfolioData.education.map((edu, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ x: 10 }}
                                    className="border-l border-[var(--text-color)]/20 pl-8 relative transition-transform cursor-default"
                                >
                                    <div className="absolute -left-[3px] top-2 w-1.5 h-1.5 bg-[var(--accent)] rounded-full hidden md:block"></div>
                                    <h3 className="text-2xl font-normal mb-2 leading-tight">{edu.degree}</h3>
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-lg">
                                        <span className="italic opacity-80">{edu.school}</span>
                                        <span className="font-sans text-xs uppercase tracking-widest text-[var(--accent)]">Class of '{edu.year.slice(-2)}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Skills Index */}
                        <div className="mt-24 pt-16 border-t border-[var(--text-color)]/10">
                            <div className="text-xs font-sans uppercase tracking-[0.3em] text-[var(--accent)] mb-8 flex items-center gap-4">
                                Research Methodologies
                            </div>
                            <div className="flex flex-wrap gap-x-8 gap-y-4 font-serif text-xl italic opacity-80">
                                {portfolioData.skills && portfolioData.skills.map((skill, i) => (
                                    <span key={skill} className="hover:text-[var(--accent)] transition-colors cursor-crosshair">
                                        {skill}{i !== portfolioData.skills.length - 1 && ","}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* SELECTED PUBLICATIONS / PROJECTS */}
            <section className="py-32 max-w-7xl mx-auto px-6 md:px-16">
                <div className="text-xs font-sans uppercase tracking-[0.3em] text-[var(--text-color)]/50 mb-16 flex items-center gap-4">
                    <span className="w-12 h-px bg-[var(--text-color)]/30"></span> Selected Works & Publications
                </div>

                <div className="border-t-[2px] border-[var(--text-color)]">
                    {portfolioData.projects.map((project, idx) => (
                        <motion.article
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="group border-b border-[var(--text-color)]/20 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 hover:bg-[var(--text-color)]/[0.03] transition-colors -mx-6 px-6 md:-mx-16 md:px-16 cursor-pointer relative"
                        >
                            <div className="lg:col-span-2 font-sans text-[10px] md:text-xs opacity-50 uppercase tracking-[0.2em] pt-2">
                                Vol. 0{idx + 1} <br className="hidden lg:block" /><span className="lg:hidden"> // </span>{project.role}
                            </div>

                            <div className="lg:col-span-8 pr-8">
                                <h3 className="text-3xl md:text-5xl font-normal mb-6 leading-tight group-hover:text-[var(--accent)] transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-xl md:text-2xl opacity-70 leading-relaxed font-light font-serif italic max-w-3xl">
                                    "{project.description}"
                                </p>
                            </div>

                            <div className="lg:col-span-2 flex justify-start lg:justify-end items-start pt-2">
                                <div className="w-12 h-12 rounded-full border border-[var(--text-color)]/20 flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-transparent group-hover:text-[var(--bg-color)] transition-all duration-300">
                                    <ArrowUpRight className="w-5 h-5" strokeWidth={1.5} />
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* EDITORIAL FOOTER & CONTACT FORM */}
            <footer className="border-t border-[var(--text-color)] bg-[var(--text-color)] text-[var(--bg-color)] py-24 md:py-32 px-6 md:px-16 mt-12 relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Left Col */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                        <div>
                            <h2 className="text-6xl md:text-8xl font-serif italic mb-8 -ml-2 text-[var(--accent)]">Correspondence.</h2>
                            <p className="font-sans font-light text-lg md:text-xl opacity-80 mb-16 max-w-md leading-relaxed border-l border-[var(--bg-color)]/20 pl-6">
                                For academic inquiries, peer-review requests, speaking engagements, or requests for full manuscripts, please dispatch a missive using the adjoining form.
                            </p>
                            <div className="flex flex-col gap-6">
                                <a href={`mailto:${portfolioData.contactEmail}`} className="inline-flex items-center gap-4 text-xl md:text-2xl font-serif border-b border-[var(--bg-color)]/30 pb-2 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all w-max">
                                    <FileText className="w-5 h-5 opacity-50" /> {portfolioData.contactEmail}
                                </a>
                                <div className="flex gap-8 mt-4 font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-50">
                                    {portfolioData.socialLinks?.twitter && <a href="#" className="hover:text-[var(--accent)] hover:opacity-100 transition-colors border-b border-transparent hover:border-[var(--accent)]">Twitter (X)</a>}
                                    {portfolioData.socialLinks?.linkedin && <a href="#" className="hover:text-[var(--accent)] hover:opacity-100 transition-colors border-b border-transparent hover:border-[var(--accent)]">LinkedIn</a>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Classic Form */}
                    <div className="lg:col-span-7 bg-[var(--bg-color)] text-[var(--text-color)] p-8 md:p-16 shadow-2xl relative">
                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[var(--accent)]"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[var(--text-color)]/20"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[var(--text-color)]/20"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[var(--accent)]"></div>

                        <div className="text-center mb-12">
                            <div className="font-sans text-[10px] uppercase tracking-[0.2em] border-b border-[var(--text-color)]/20 pb-4 mb-8">Formulario de Contacto — 001</div>
                            <h3 className="text-3xl font-serif italic">Draft Missive</h3>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-8 font-serif">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="relative group">
                                    <input type="text" required placeholder="Full Name" className="w-full bg-transparent border-b border-[var(--text-color)]/30 py-3 text-lg md:text-xl outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--text-color)]/30 placeholder:italic" />
                                </div>
                                <div className="relative group">
                                    <input type="email" required placeholder="Email Address" className="w-full bg-transparent border-b border-[var(--text-color)]/30 py-3 text-lg md:text-xl outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--text-color)]/30 placeholder:italic" />
                                </div>
                            </div>

                            <div className="relative group pt-4">
                                <textarea required rows="4" placeholder="Message content..." className="w-full bg-transparent border-b border-[var(--text-color)]/30 py-3 text-lg md:text-xl outline-none focus:border-[var(--accent)] transition-colors resize-none placeholder:text-[var(--text-color)]/30 placeholder:italic"></textarea>
                            </div>

                            <div className="pt-8 flex justify-center">
                                <AnimatePresence mode="wait">
                                    {formState === 'submitted' ? (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                            className="flex items-center gap-3 text-green-700 font-sans text-sm uppercase tracking-widest font-bold py-4 px-8 bg-green-500/10 border border-green-500/20"
                                        >
                                            <CopyCheck className="w-5 h-5" /> Transmission Successful
                                        </motion.div>
                                    ) : (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            className="flex items-center gap-4 py-4 px-12 bg-transparent text-[var(--accent)] border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg-color)] transition-all font-sans text-xs uppercase tracking-[0.2em] group"
                                        >
                                            Send Dispatch <Send className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </form>
                    </div>

                </div>
            </footer>

        </div>
    );
}
