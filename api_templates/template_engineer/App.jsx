import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Terminal, Cpu, Network, Mail } from 'lucide-react';
import portfolioData from './data.json';

// Minimalist Matrix Rain using Canvas
const MatrixRain = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~'.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        for (let x = 0; x < columns; x++) drops[x] = 1;

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'var(--accent)';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        };

        // Slower rain for cleaner aesthetic
        const interval = setInterval(draw, 50);
        return () => clearInterval(interval);
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-10 pointer-events-none" />;
};

export default function App() {
    const [booting, setBooting] = useState(true);
    const scrollRef = useRef(null);
    const dragConstraintsRef = useRef(null);
    const { scrollYProgress } = useScroll();

    // Loading Sequence
    useEffect(() => {
        const timer = setTimeout(() => setBooting(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    if (booting) {
        return (
            <div className="bg-[#050505] min-h-screen flex items-center justify-center text-[var(--accent)] font-mono text-sm md:text-xl">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-4"
                >
                    <Terminal className="w-6 h-6 animate-pulse" />
                    <span>INITALIZING SYSTEM // {portfolioData.name.toUpperCase()} ...</span>
                </motion.div>
            </div>
        );
    }

    return (
        <div ref={scrollRef} className="bg-[var(--bg-color)] text-[var(--text-color)] font-mono min-h-screen selection:bg-[var(--accent)] selection:text-black overflow-x-hidden relative">
            <MatrixRain />

            {/* FIXED HEADER */}
            <header className="fixed top-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference border-b border-white/10 bg-black/50 backdrop-blur-md">
                <div className="font-bold tracking-widest uppercase">sys.user({`"${portfolioData.name}"`})</div>
                <div className="flex gap-4 items-center">
                    <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse"></div>
                    <span className="text-xs text-white/50 hidden md:block">STATUS: ONLINE</span>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="relative h-screen flex flex-col justify-center px-6 md:px-24 z-10 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl"
                >
                    <h2 className="text-[var(--accent)] text-lg mb-4 flex items-center gap-2">
                        <Cpu className="w-5 h-5" /> ~./roles/{portfolioData.title.toLowerCase().replace(/ /g, '_')}
                    </h2>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
                        Building<br />
                        <span className="text-transparent border-text">Systems That</span><br />
                        Scale.
                    </h1>
                    <p className="text-lg md:text-2xl text-white/60 max-w-2xl border-l-2 border-[var(--accent)] pl-6 py-2">
                        {portfolioData.about}
                    </p>
                </motion.div>
            </section>

            {/* DRAGGABLE NODE GRAPH FOR SKILLS */}
            <section className="py-24 px-6 md:px-24 relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-black/50">
                <h3 className="text-sm text-[var(--accent)] mb-12 flex items-center gap-2">
                    <Network className="w-4 h-4" /> --fetch-clusters
                </h3>
                <p className="text-xs text-white/40 mb-8">* Interact with the physics nodes below.</p>

                <div ref={dragConstraintsRef} className="relative w-full h-[600px] border border-white/10 bg-black/20 overflow-hidden flex flex-wrap items-center justify-center gap-4 p-8">
                    {portfolioData.skills.map((skill, i) => (
                        <motion.div
                            key={skill}
                            drag
                            dragConstraints={dragConstraintsRef}
                            dragElastic={0.2}
                            whileDrag={{ scale: 1.1, cursor: "grabbing" }}
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", delay: Math.random() * 0.5 }}
                            className="bg-black border border-[var(--accent)] text-white px-6 py-4 rounded-md cursor-grab flex items-center justify-center text-sm md:text-xl font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(0,0,0,0)] hover:shadow-[0_0_20px_var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-colors"
                            style={{
                                position: 'relative',
                                zIndex: 20
                            }}
                        >
                            {skill}
                        </motion.div>
                    ))}
                    {/* Abstract connecting lines styling in background */}
                    <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--accent) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                </div>
            </section>

            {/* PROJECTS SECTION (TERMINAL STYLE) */}
            <section className="py-24 px-6 md:px-24 relative z-10 border-t border-white/5">
                <h3 className="text-sm text-[var(--accent)] mb-12 flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> ls -la ./projects
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {portfolioData.projects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group border border-white/10 bg-black/40 hover:bg-black/80 hover:border-[var(--accent)] transition-all p-8 flex flex-col h-full rounded-sm"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-xs text-[var(--accent)] tracking-widest uppercase">ID: 0x{idx}</span>
                                <span className="bg-white/10 text-white/50 text-xs px-2 py-1 rounded-sm">{project.role}</span>
                            </div>
                            <h4 className="text-2xl font-bold uppercase mb-4 text-white group-hover:text-[var(--accent)] transition-colors">{project.title}</h4>
                            <p className="text-sm text-white/60 leading-relaxed flex-grow">{project.description}</p>

                            <div className="mt-8 pt-4 border-t border-white/10 text-xs text-white/30 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Deployed
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-24 px-6 md:px-24 relative z-10 border-t border-white/5 bg-black flex flex-col items-center justify-center text-center">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-white">Execute Sync</h2>
                <p className="text-white/50 mb-12 max-w-md">Open for secure lines of communication regarding architecture, engineering, and systems.</p>

                <a href={`mailto:${portfolioData.contactEmail}`} className="px-8 py-4 bg-[var(--accent)] text-black font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-3">
                    <Mail className="w-5 h-5" /> Initiate Handshake
                </a>

                <div className="flex gap-8 mt-16 text-white/40">
                    {portfolioData.socialLinks?.github && (
                        <a href="#" className="hover:text-[var(--accent)] transition-colors flex gap-2 items-center"><Github className="w-4 h-4" /> GitHub</a>
                    )}
                    {portfolioData.socialLinks?.linkedin && (
                        <a href="#" className="hover:text-[var(--accent)] transition-colors flex gap-2 items-center"><Linkedin className="w-4 h-4" /> LinkedIn</a>
                    )}
                </div>
                <div className="mt-12 text-xs text-white/20">EOF</div>
            </footer>
        </div>
    );
}
