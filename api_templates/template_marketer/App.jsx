import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { TrendingUp, Zap, ArrowRight, Instagram, Twitter, MessageCircle } from 'lucide-react';
import portfolioData from './data.json';

// Kinetic Marquee Component
const Marquee = ({ text, direction = 1, speed = 20 }) => {
    return (
        <div className="flex overflow-hidden whitespace-nowrap bg-[var(--accent)] text-black py-4 origin-center -rotate-2 scale-110 shadow-2xl">
            <motion.div
                animate={{ x: direction === 1 ? [0, -1000] : [-1000, 0] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: speed }}
                className="flex space-x-8 items-center"
            >
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="text-4xl md:text-6xl font-black uppercase tracking-tighter flex items-center gap-4">
                        {text} <Zap className="w-8 h-8" />
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

// 3D Tilt Card Component
const TiltCard = ({ children, className }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
            className={`relative rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-xl hover:border-[var(--accent)] transition-colors ${className}`}
        >
            <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} className="h-full flex flex-col justify-between">
                {children}
            </div>
        </motion.div>
    );
};

export default function App() {
    const { scrollYProgress } = useScroll();
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -300]);

    return (
        <div className="bg-[#050505] text-[#f4f4f5] min-h-screen selection:bg-[var(--accent)] selection:text-black overflow-x-hidden font-sans pt-12">

            {/* HEADER */}
            <header className="fixed top-6 left-6 right-6 z-50 flex justify-between items-center bg-black/50 backdrop-blur-2xl px-8 py-4 rounded-full border border-white/10 mix-blend-difference">
                <span className="font-black text-xl tracking-tighter uppercase">{portfolioData.name}</span>
                <a href={`mailto:${portfolioData.contactEmail}`} className="bg-[var(--accent)] text-black px-6 py-2 rounded-full font-bold uppercase text-sm flex items-center gap-2 hover:scale-105 transition-transform origin-center">
                    Hire Me <ArrowRight className="w-4 h-4" />
                </a>
            </header>

            {/* HERO & ABOUT BENTO */}
            <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 z-10 relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">

                    {/* Main Headline Card */}
                    <TiltCard className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-white/10 to-transparent">
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-[var(--accent)] text-black font-bold uppercase px-4 py-1 rounded-full text-xs tracking-widest">{portfolioData.title}</span>
                            <TrendingUp className="text-[var(--accent)] w-8 h-8" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mt-8">
                            {portfolioData.name.split(' ')[0]} <br /> <span className="text-transparent border-text">{portfolioData.name.split(' ')[1] || 'CREATIVE'}</span>
                        </h1>
                    </TiltCard>

                    {/* About Card */}
                    <TiltCard className="md:col-span-1 md:row-span-2 bg-[var(--accent)]/10 border-[var(--accent)]/30">
                        <h3 className="text-[var(--accent)] font-bold uppercase tracking-widest mb-6">The Mission</h3>
                        <p className="text-xl md:text-2xl font-medium leading-tight">
                            {portfolioData.about}
                        </p>
                    </TiltCard>

                    {/* Skills Marquee Card */}
                    <TiltCard className="md:col-span-3 md:row-span-1 overflow-hidden p-0 justify-center flex flex-col group">
                        <div className="flex overflow-hidden whitespace-nowrap opacity-50 group-hover:opacity-100 transition-opacity">
                            <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }} className="flex gap-8">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex gap-8 items-center">
                                        {portfolioData.skills.map(skill => (
                                            <span key={skill} className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-transparent border-text hover:text-[var(--accent)] transition-colors cursor-crosshair">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </TiltCard>

                </div>
            </main>

            {/* MID-PAGE MARQUEE EXTREME */}
            <div className="py-20 relative z-20">
                <Marquee text="Growth Is The Only Metric" direction={1} speed={15} />
                <div className="mt-8">
                    <Marquee text="Drive Revenue - Capture Audiences" direction={-1} speed={25} />
                </div>
            </div>

            {/* PROJECTS BENTO GRID */}
            <section className="max-w-7xl mx-auto px-6 py-32 relative z-10">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16">Results Delivered.</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {portfolioData.projects.map((project, idx) => (
                        <TiltCard key={idx} className={idx === 0 ? "md:col-span-2 md:aspect-[3/1]" : "aspect-square md:aspect-auto md:h-[400px]"}>
                            <div className="flex justify-between items-start">
                                <span className="bg-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">{project.role}</span>
                                <span className="font-mono text-[var(--accent)]">0{idx + 1}</span>
                            </div>

                            <div className="mt-auto">
                                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">{project.title}</h3>
                                <p className="text-lg md:text-xl text-white/70 max-w-xl">{project.description}</p>
                            </div>
                        </TiltCard>
                    ))}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="relative bg-[var(--accent)] text-black pt-32 pb-12 px-6 rounded-t-[4rem] overflow-hidden">
                <div className="absolute inset-0 w-full h-full pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(black 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-16">
                    <div>
                        <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter leading-none mb-4">Let's Talk.</h2>
                        <a href={`mailto:${portfolioData.contactEmail}`} className="text-2xl md:text-4xl font-bold border-b-4 border-black pb-2 hover:px-8 hover:bg-black hover:text-[var(--accent)] transition-all">
                            {portfolioData.contactEmail}
                        </a>
                    </div>

                    <div className="flex gap-4">
                        {portfolioData.socialLinks?.twitter && (
                            <a href="#" className="w-16 h-16 bg-black text-[var(--accent)] rounded-full flex items-center justify-center hover:scale-110 hover:-rotate-12 transition-transform shadow-2xl">
                                <Twitter className="w-8 h-8" />
                            </a>
                        )}
                        {portfolioData.socialLinks?.linkedin && (
                            <a href="#" className="w-16 h-16 bg-black text-[var(--accent)] rounded-full flex items-center justify-center hover:scale-110 hover:rotate-12 transition-transform shadow-2xl">
                                <MessageCircle className="w-8 h-8" />
                            </a>
                        )}
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-32 text-center text-black/50 font-bold uppercase tracking-widest text-sm">
                    © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
