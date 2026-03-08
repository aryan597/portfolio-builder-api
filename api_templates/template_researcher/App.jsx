import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, FileText, ArrowUpRight, Microscope } from 'lucide-react';
import portfolioData from './data.json';

// Interactive Footnote Component
const Footnote = ({ number, text }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <span
            className="relative inline-flex items-center justify-center w-6 h-6 rounded-full border border-[var(--accent)] text-[var(--accent)] text-xs font-sans cursor-help mx-1 align-super hover:bg-[var(--accent)] hover:text-[var(--bg-color)] transition-colors"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {number}
            {isHovered && (
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-4 bg-black text-[#F9F7F1] text-sm font-sans rounded shadow-2xl z-50 pointer-events-none"
                >
                    {text}
                </motion.span>
            )}
        </span>
    );
};

export default function App() {
    const { scrollYProgress } = useScroll();
    const titleY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
    const imageY = useTransform(scrollYProgress, [0, 1], [0, -150]);

    return (
        <div className="bg-[var(--bg-color)] text-[var(--text-color)] min-h-screen selection:bg-[var(--accent)] selection:text-white font-serif antialiased overflow-x-hidden">

            {/* MINIMAL EDITORIAL HEADER */}
            <header className="py-8 px-8 md:px-16 border-b border-[var(--text-color)]/10 flex justify-between items-center bg-[var(--bg-color)]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="font-bold tracking-widest uppercase font-sans text-xs flex items-center gap-4">
                    <BookOpen className="w-4 h-4 text-[var(--accent)]" /> THE PORTFOLIO OF {portfolioData.name}
                </div>
                <div className="font-serif italic text-sm opacity-60">Vol. 1 — {new Date().getFullYear()}</div>
            </header>

            {/* ABSTRACT / HERO */}
            <main className="max-w-6xl mx-auto px-8 md:px-16 pt-24 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

                    <motion.div style={{ y: titleY }} className="md:col-span-8 z-10">
                        <h1 className="text-6xl md:text-8xl leading-[1.1] tracking-tight text-[var(--accent)] mb-12">
                            {portfolioData.title}
                        </h1>

                        <div className="prose prose-lg md:prose-2xl text-[var(--text-color)] max-w-none font-light leading-relaxed">
                            <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-[var(--accent)] first-letter:mr-3 first-letter:float-left">
                                {portfolioData.about}
                            </p>
                            <p className="mt-8 opacity-80">
                                The intersection of methodology and discovery requires rigorous analysis<Footnote number="1" text="Data interpretation requires both qualitative depth and quantitative precision." />. My work explores these boundaries, pushing the epistemology of our field forward into new paradigms.
                            </p>
                        </div>
                    </motion.div>

                    {/* Stylized Abstract Parallax Image Area */}
                    <motion.div style={{ y: imageY }} className="md:col-span-4 hidden md:flex flex-col gap-8 opacity-90 mt-24">
                        <div className="aspect-[3/4] border flex flex-col items-center justify-center border-[var(--text-color)]/20 p-4 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[var(--text-color)]/5 bg-[radial-gradient(circle_at_center,var(--text-color)_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
                            <Microscope className="w-32 h-32 text-[var(--accent)] opacity-20 group-hover:scale-110 transition-transform duration-1000" strokeWidth={0.5} />
                            <div className="absolute bottom-4 right-4 text-xs font-sans uppercase tracking-widest opacity-50">Fig 1. methodology</div>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* EXPERTISE / SKILLS (Columns) */}
            <section className="border-t border-[var(--text-color)]/10 py-32 bg-[var(--text-color)]/5">
                <div className="max-w-6xl mx-auto px-8 md:px-16">
                    <h2 className="text-sm font-sans uppercase tracking-widest text-[var(--accent)] mb-16 flex items-center gap-4">
                        <span className="w-12 h-px bg-[var(--accent)]"></span> Areas of Investigation
                    </h2>

                    <div className="columns-1 md:columns-3 gap-16">
                        {portfolioData.skills.map(skill => (
                            <div key={skill} className="mb-4 break-inside-avoid border-b border-[var(--text-color)]/10 pb-4">
                                <h3 className="text-2xl italic hover:text-[var(--accent)] transition-colors cursor-crosshair">{skill}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SELECTED PUBLICATIONS / PROJECTS */}
            <section className="py-32 max-w-6xl mx-auto px-8 md:px-16">
                <h2 className="text-sm font-sans uppercase tracking-widest text-[var(--accent)] mb-16 flex items-center gap-4">
                    <span className="w-12 h-px bg-[var(--accent)]"></span> Featured Literature & Works
                </h2>

                <div className="space-y-0">
                    {portfolioData.projects.map((project, idx) => (
                        <motion.article
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="group border-b border-[var(--text-color)]/20 py-16 grid grid-cols-1 md:grid-cols-12 gap-8 hover:bg-[var(--text-color)]/5 transition-colors -mx-8 px-8 md:-mx-16 md:px-16 cursor-pointer"
                        >
                            <div className="md:col-span-2 font-mono text-xs opacity-50 uppercase tracking-widest pt-2">
                                0{idx + 1} // {project.role}
                            </div>

                            <div className="md:col-span-7 pr-8">
                                <h3 className="text-4xl md:text-5xl font-medium mb-6 leading-tight group-hover:text-[var(--accent)] transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-lg md:text-xl opacity-80 leading-relaxed font-light">
                                    {project.description}
                                </p>
                            </div>

                            <div className="md:col-span-3 flex justify-end items-start pt-2">
                                <div className="w-12 h-12 rounded-full border border-[var(--text-color)]/20 flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-transparent group-hover:text-white transition-all duration-300">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* EDITORIAL FOOTER */}
            <footer className="border-t border-black bg-black text-[#F9F7F1] py-32 px-8 md:px-16">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-serif italic mb-8 text-[var(--accent)]">Correspondence.</h2>
                        <p className="font-sans font-light text-lg opacity-80 mb-12 max-w-md">
                            For academic inquiries, peer-review requests, or speaking engagements, please dispatch a missive.
                        </p>
                        <a href={`mailto:${portfolioData.contactEmail}`} className="inline-flex items-center gap-4 text-2xl font-serif border-b border-[#F9F7F1]/30 pb-2 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">
                            <FileText className="w-6 h-6" /> {portfolioData.contactEmail}
                        </a>
                    </div>

                    <div className="flex flex-col justify-end items-start md:items-end font-sans text-sm uppercase tracking-widest space-y-4">
                        <span className="opacity-50">External Citations</span>
                        {portfolioData.socialLinks?.twitter && <a href="#" className="hover:text-[var(--accent)] transition-colors">Twitter (X)</a>}
                        {portfolioData.socialLinks?.linkedin && <a href="#" className="hover:text-[var(--accent)] transition-colors">LinkedIn</a>}
                    </div>
                </div>
            </footer>

        </div>
    );
}
