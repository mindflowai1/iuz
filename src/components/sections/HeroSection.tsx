'use client';

import { motion } from 'framer-motion';
import {
    MessageSquare,
    Calendar,
    ArrowRight,
} from 'lucide-react';

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-slate-950/80 z-10" /> {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/50 to-slate-950 z-10" />
                <img
                    src="/hero-bg.png"
                    alt="Background escritório de advocacia"
                    className="w-full h-full object-cover opacity-60"
                />
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 z-10 text-center py-20">
                {/* Badge Removed as per request */}

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
                >
                    Advocacia de Alta Performance
                    <br />
                    <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
                        Potencializada por IA
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
                >
                    Unimos a expertise jurídica de elite com tecnologia avançada para entregar resultados mais rápidos, precisos e transparentes para você.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <a
                        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999'
                            }?text=${encodeURIComponent('Olá! Gostaria de falar sobre meus direitos.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-950 px-8 py-4 text-lg font-bold rounded-full shadow-lg hover:shadow-amber-500/20 transform hover:scale-105 transition-all"
                    >
                        <Calendar className="w-6 h-6" />
                        Agendar Consultoria Estratégica
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2"
                >
                    <motion.div className="w-1 h-2 bg-white/50 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
