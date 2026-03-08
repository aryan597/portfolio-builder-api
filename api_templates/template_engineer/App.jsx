import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Terminal, Cpu, Network, Mail, Briefcase, GraduationCap, Send, ChevronRight } from 'lucide-react';
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

    return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-[0.07] pointer-events-none" />;
};

export default function App() {
    const [booting, setBooting] = useState(true);
    const [formStatus, setFormStatus] = useState("null"); // null, compiling, executed
    const scrollRef = useRef(null);
    const dragConstraintsRef = useRef(null);
    const { scrollYProgress } = useScroll();

    // Loading Sequence
    useEffect(() => {
        const timer = setTimeout(() => setBooting(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleTerminalSubmit = (e) => {
        e.preventDefault();
        setFormStatus("compiling");
        setTimeout(() => setFormStatus("executed"), 1500);
        setTimeout(() => setFormStatus("null"), 5000);
    };

    if (booting) {
        return (
            <div className="bg-[#050505] min-h-screen flex items-center justify-center text-[var(--accent)] font-mono text-sm md:text-xl selection:bg-white selection:text-black">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <Terminal className="w-12 h-12 animate-pulse mb-4" />
                    <span>[SYSTEM BOOT] Mount /dev/hda1 ... OK</span>
                    <span>[INIT] Loading profile for {portfolioData.name.toUpperCase()} ...</span>
                    <div className="w-64 h-1 bg-white/10 mt-4 overflow-hidden rounded-full">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 1.5, ease: "linear" }}
                            className="h-full bg-[var(--accent)]"
                        />
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div ref={scrollRef} className="bg-[var(--bg-color)] text-[var(--text-color)] font-mono min-h-screen selection:bg-[var(--accent)] selection:text-black overflow-x-hidden relative">
            <MatrixRain />

            {/* FIXED HEADER AND PROGRESS BAR */}
            <motion.div
                className="fixed top-0 left-0 h-1 bg-[var(--accent)] z-[100] origin-left"
                style={{ scaleX: scrollYProgress, width: '100%' }}
            />
            <header className="fixed top-0 w-full p-4 md:p-6 flex justify-between items-center z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
                <div className="font-bold tracking-widest uppercase text-xs">sys.user({`"${portfolioData.name}"`})</div>
                <div className="flex gap-4 items-center">
                    <div className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)] animate-pulse"></div>
                    <span className="text-xs text-[var(--accent)] opacity-80 hidden md:block">TCP_SOCKET_ESTABLISHED</span>
                </div>
            </header>

            {/* HERO SECTION - Enhanced Interactivity */}
            <section className="relative h-screen flex flex-col justify-center px-6 md:px-24 z-10 pt-20 overflow-hidden">
                {/* Animated grid background */}
                <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)_translateY(-100px)_translateZ(-200px)] animate-[grid_20s_linear_infinite]"></div>

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="max-w-4xl relative z-10 p-8 border border-white/10 bg-black/40 backdrop-blur-sm rounded-sm"
                >
                    <h2 className="text-[var(--accent)] text-xs md:text-sm mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                        <Cpu className="w-4 h-4" /> ROOT_ACCESSGRANTED // ROLE: {portfolioData.title.toUpperCase()}
                    </h2>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-8 text-white relative">
                        <motion.span
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, staggerChildren: 0.1 }}
                        >
                            Building<br />
                            <span className="text-[var(--accent)] border-text hover:text-[var(--bg-color)] transition-colors cursor-crosshair">Systems That</span><br />
                            Scale.
                        </motion.span>
                    </h1>
                    <div className="bg-black/60 border-l-2 border-[var(--accent)] p-6 font-mono text-sm md:text-lg text-white/70 shadow-2xl">
                        <span className="text-[var(--accent)] mr-2">$ cat</span> about.txt <br /><br />
                        {portfolioData.about}
                    </div>
                </motion.div>
            </section>

            {/* LOG DATA: EXPERIENCE & EDUCATION */}
            <section className="py-24 px-6 md:px-24 relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-7xl mx-auto">

                    {/* Thread 1: Experience */}
                    <div>
                        <h3 className="text-xl text-[var(--accent)] font-bold mb-12 flex items-center gap-3 tracking-widest">
                            <Terminal className="w-6 h-6" /> EXECUTION_HISTORY.log
                        </h3>
                        <div className="space-y-0 relative before:content-[''] before:absolute before:inset-0 before:left-[11px] before:w-[2px] before:bg-white/10">
                            {portfolioData.experience && portfolioData.experience.map((exp, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative pl-10 py-6 group"
                                >
                                    <div className="absolute left-0 top-8 w-[24px] h-[24px] bg-black border-2 border-[var(--accent)] rounded-sm flex items-center justify-center group-hover:scale-110 transition-transform z-10 shadow-[0_0_10px_rgba(0,0,0,1)]">
                                        <div className="w-2 h-2 bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    <div className="text-xs text-[var(--accent)] opacity-70 mb-2 font-bold tracking-widest bg-[var(--accent)]/10 inline-block px-2 py-1 rounded-sm">[ {exp.duration} ]</div>
                                    <h4 className="text-2xl font-black text-white uppercase mt-2">{exp.role}</h4>
                                    <h5 className="text-lg text-white/50 uppercase tracking-widest mt-1 mb-4 flex items-center gap-2">
                                        <Briefcase className="w-4 h-4" /> @ {exp.company}
                                    </h5>
                                    <p className="text-white/40 text-sm leading-loose border-l border-white/10 pl-4">{exp.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Thread 2: Education */}
                    <div>
                        <h3 className="text-xl text-[var(--accent)] font-bold mb-12 flex items-center gap-3 tracking-widest">
                            <Terminal className="w-6 h-6" /> MEMORY_BANKS.bin
                        </h3>
                        <div className="space-y-6">
                            {portfolioData.education && portfolioData.education.map((edu, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ x: 10, scale: 1.02 }}
                                    className="border border-white/10 bg-black/60 p-6 rounded-sm hover:border-[var(--accent)] transition-all flex flex-col gap-2 relative overflow-hidden"
                                >
                                    <div className="absolute right-0 top-0 w-16 h-16 bg-[var(--accent)]/5 rounded-full blur-xl"></div>
                                    <GraduationCap className="w-6 h-6 text-[var(--accent)] opacity-50 mb-2" />
                                    <h4 className="text-xl font-bold text-white uppercase">{edu.degree}</h4>
                                    <div className="flex justify-between items-center text-xs opacity-50 uppercase tracking-widest">
                                        <span>{edu.school}</span>
                                        <span className="text-[var(--accent)]">{edu.year}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* DRAGGABLE NODE GRAPH FOR SKILLS */}
            <section className="py-24 px-6 md:px-24 relative z-10 border-t border-white/5 bg-gradient-to-b from-black/80 to-transparent">
                <h3 className="text-lg text-[var(--accent)] font-bold mb-4 flex items-center gap-3 tracking-widest">
                    <Network className="w-6 h-6" /> ACTIVE_NODES.config
                </h3>
                <p className="text-xs text-white/40 mb-8 max-w-md p-2 bg-white/5 border border-white/10 rounded-sm">
                    <span className="text-yellow-500">Warning:</span> Physics simulation active. Drag nodes to reposition cluster architecture.
                </p>

                <div ref={dragConstraintsRef} className="relative w-full h-[500px] border border-white/10 bg-black/40 overflow-hidden flex flex-wrap items-center justify-center gap-4 p-8 rounded-lg shadow-inner">
                    {portfolioData.skills && portfolioData.skills.map((skill, i) => (
                        <motion.div
                            key={skill}
                            drag
                            dragConstraints={dragConstraintsRef}
                            dragElastic={0.4}
                            whileDrag={{ scale: 1.2, zIndex: 50, rotate: 5, backgroundColor: "var(--accent)", color: "black", boxShadow: "0 0 30px var(--accent)" }}
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 300, damping: 20, delay: Math.random() * 0.3 }}
                            className="bg-black/80 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-md cursor-grab active:cursor-grabbing text-sm md:text-lg font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
                            style={{ position: 'relative', zIndex: 20 }}
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> {skill}
                        </motion.div>
                    ))}
                    {/* Abstract connecting lines styling in background */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--accent) 1.5px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
                </div>
            </section>

            {/* PROJECTS SECTION (TERMINAL GRID) */}
            <section className="py-24 px-6 md:px-24 relative z-10 border-t border-white/5 bg-black/20">
                <h3 className="text-lg text-[var(--accent)] font-bold mb-12 flex items-center gap-3 tracking-widest">
                    <Terminal className="w-6 h-6" /> OUTPUT_VOLUMES.list
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {portfolioData.projects && portfolioData.projects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group border border-white/10 bg-[#0a0a0a] hover:bg-black hover:border-[var(--accent)] transition-all p-8 flex flex-col h-full rounded-sm relative overflow-hidden shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all transform group-hover:scale-150 origin-top-right">
                                <ChevronRight className="w-12 h-12" />
                            </div>

                            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                                <span className="text-xs text-[var(--accent)] font-mono tracking-widest bg-[var(--accent)]/10 px-2 py-1 rounded-sm">0x{idx + 1}</span>
                                <span className="text-white/40 uppercase tracking-widest text-xs font-bold">{project.role}</span>
                            </div>

                            <h4 className="text-3xl font-black uppercase mb-6 text-white group-hover:text-[var(--accent)] transition-colors inline-block">{project.title}</h4>
                            <p className="text-sm text-white/50 leading-relaxed flex-grow font-mono">{project.description}</p>

                            <div className="mt-8 pt-4 border-t border-white/10 text-xs text-white/30 flex items-center gap-2 font-mono uppercase">
                                <div className="w-2 h-2 bg-green-500 shadow-[0_0_8px_green]"></div> Volume Mounted & Live
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* FOOTER & ANIMATED TERMINAL CONTACT FORM */}
            <footer className="relative z-10 bg-[#050505] border-t-2 border-[var(--accent)]">
                <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Terminal Output UI */}
                    <div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-white hover:text-[var(--accent)] transition-colors cursor-crosshair">INITIATE_SYNC</h2>
                        <p className="text-white/40 font-mono text-sm max-w-md mb-12">Opening secure channel. Waiting for string payload via port 443.</p>

                        <div className="font-mono space-y-4 mb-16">
                            <div className="flex items-center gap-4 text-sm hover:text-white text-white/50 transition-colors">
                                <span className="text-[var(--accent)]">Target_Email:</span>
                                <a href={`mailto:${portfolioData.contactEmail}`} className="border-b border-white/20 pb-1">{portfolioData.contactEmail}</a>
                            </div>
                            <div className="flex gap-8 border-t border-white/5 pt-8 mt-8">
                                {portfolioData.socialLinks?.github && (
                                    <a href="#" className="flex items-center gap-2 text-white/50 hover:text-[var(--accent)] transition-colors"><Github className="w-5 h-5" /> GH_BRANCH</a>
                                )}
                                {portfolioData.socialLinks?.linkedin && (
                                    <a href="#" className="flex items-center gap-2 text-white/50 hover:text-[var(--accent)] transition-colors"><Linkedin className="w-5 h-5" /> IN_NODE</a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Interactive Terminal Form */}
                    <div className="border border-white/20 bg-black rounded-lg shadow-2xl overflow-hidden relative group">
                        {/* Fake Terminal Header */}
                        <div className="bg-white/5 border-b border-white/10 p-3 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                            <span className="text-white/30 text-xs font-mono ml-4">root@main:~# execute_contact.sh</span>
                        </div>

                        <div className="p-8">
                            <form onSubmit={handleTerminalSubmit} className="flex flex-col gap-6 font-mono relative">

                                <div className="group relative">
                                    <label className="text-xs text-[var(--accent)] mb-1 block uppercase tracking-widest">Input_String: Name</label>
                                    <input type="text" required className="w-full bg-transparent border-b border-white/30 pb-2 text-white outline-none focus:border-[var(--accent)] focus:bg-[var(--accent)]/5 transition-colors pl-2 peer" />
                                    <div className="absolute left-0 bottom-0 w-1 h-full bg-[var(--accent)] opacity-0 peer-focus:opacity-100 transition-opacity"></div>
                                </div>

                                <div className="group relative">
                                    <label className="text-xs text-[var(--accent)] mb-1 block uppercase tracking-widest">Input_String: Return_Address</label>
                                    <input type="email" required className="w-full bg-transparent border-b border-white/30 pb-2 text-white outline-none focus:border-[var(--accent)] focus:bg-[var(--accent)]/5 transition-colors pl-2 peer" />
                                    <div className="absolute left-0 bottom-0 w-1 h-full bg-[var(--accent)] opacity-0 peer-focus:opacity-100 transition-opacity"></div>
                                </div>

                                <div className="group relative mt-4">
                                    <label className="text-xs text-[var(--accent)] mb-2 block uppercase tracking-widest">Payload: Message_Buffer</label>
                                    <textarea required rows="4" className="w-full bg-[#0a0a0a] border border-white/20 rounded-md p-4 text-white/80 outline-none focus:border-[var(--accent)] resize-none transition-colors focus:shadow-[0_0_15px_rgba(34,197,94,0.15)]"></textarea>
                                </div>

                                <div className="h-16 mt-4 relative">
                                    <AnimatePresence mode="wait">
                                        {formStatus === "null" && (
                                            <motion.button
                                                key="submit"
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                type="submit"
                                                className="absolute inset-0 w-full bg-white/10 hover:bg-[var(--accent)] text-white hover:text-black font-bold uppercase tracking-widest border border-white/20 hover:border-transparent transition-all flex items-center justify-center gap-3"
                                            >
                                                Run Script <Send className="w-4 h-4" />
                                            </motion.button>
                                        )}
                                        {formStatus === "compiling" && (
                                            <motion.div
                                                key="compiling"
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                className="absolute inset-0 w-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--accent)] tracking-widest text-sm"
                                            >
                                                <span className="animate-pulse flex items-center gap-2"><Terminal className="w-4 h-4" /> COMPILING_PAYLOAD...</span>
                                            </motion.div>
                                        )}
                                        {formStatus === "executed" && (
                                            <motion.div
                                                key="executed"
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                className="absolute inset-0 w-full bg-green-500/20 text-green-400 border border-green-500/50 flex items-center justify-center font-bold tracking-widest uppercase"
                                            >
                                                EXIT CODE 0: DELIVERED
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 py-6 text-center">
                    <span className="text-white/20 text-xs font-mono uppercase tracking-widest">SYSTEM_VERSION 2026.1 // EOF</span>
                </div>
            </footer>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes grid {
          0% { transform: perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px); }
          100% { transform: perspective(500px) rotateX(60deg) translateY(0px) translateZ(-200px); }
        }
      `}} />
        </div>
    );
}
