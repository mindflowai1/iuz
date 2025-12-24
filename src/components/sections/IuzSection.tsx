'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export function IuzSection() {
    const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([]);

    useEffect(() => {
        const generatedStars = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5,
            duration: Math.random() * 3 + 2
        }));
        setStars(generatedStars);
    }, []);

    return (
        <section className="relative min-h-screen px-4 sm:px-6 flex items-center justify-center overflow-hidden bg-[#020408] pt-32 md:pt-0">

            {/* --- Deep Space Aurora Background --- */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

                {/* 1. Amber Solar Wind (Top Left) */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        rotate: [0, 20, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-amber-500/10 rounded-full blur-[100px] mix-blend-screen"
                />

                {/* 2. Rose Nebula (Bottom Right) */}
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -50, 0],
                        y: [0, -50, 0]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-[10%] -right-[10%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-rose-500/10 rounded-full blur-[100px] mix-blend-screen"
                />

                {/* 3. Indigo Deep (Center/Floating) */}
                <motion.div
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -90, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-indigo-500/10 via-transparent to-transparent rounded-full blur-[80px]"
                />

                {/* 4. Star Dust Field */}
                {stars.map((star) => (
                    <motion.div
                        key={star.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.6, 0],
                            scale: [0, 1, 0],
                            y: [0, -20]
                        }}
                        transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            delay: star.delay,
                            ease: "easeInOut"
                        }}
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                        }}
                        className="absolute w-1 h-1 bg-white rounded-full blur-[0.5px]"
                    />
                ))}

                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />
            </div>

            <div className="container relative z-10 max-w-4xl mx-auto text-center">

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-amber-400 font-bold tracking-widest text-sm uppercase shadow-[0_0_20px_-5px_rgba(251,191,36,0.2)]">
                        <Sparkles className="w-4 h-4" />
                        CRM Jurídico com IA
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-[1.1]"
                >
                    Transforme seu Escritório com o <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700">
                        CRM que Trabalha por Você
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-slate-400 mb-12 font-light max-w-2xl mx-auto"
                >
                    A plataforma de gestão jurídica que automatiza processos, organiza casos e libera sua equipe para focar no que realmente importa.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <a
                        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999'}?text=${encodeURIComponent('Olá! Quero conhecer o CRM IUZ.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full text-xl font-bold tracking-tight transition-transform hover:scale-105 shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)]"
                    >
                        Conhecer o IUZ Gratuitamente
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <p className="mt-6 text-sm text-slate-500 font-medium">
                        *Demonstração personalizada sem compromisso.
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
