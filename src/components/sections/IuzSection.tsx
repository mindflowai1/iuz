'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function IuzSection() {
    return (
        <section className="relative py-32 px-6 flex items-center justify-center overflow-hidden bg-[#020408]">

            {/* Massive Aurora Background */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-indigo-500/20 rounded-full blur-[120px]"
                />
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
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-amber-400 font-bold tracking-widest text-sm uppercase">
                        <Sparkles className="w-4 h-4" />
                        A Revolução Começa Agora
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-[1.1]"
                >
                    Pronto para Elevar seu <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700">
                        Escritório ao Próximo Nível?
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-slate-400 mb-12 font-light max-w-2xl mx-auto"
                >
                    Junte-se a advogados que já automatizaram a burocracia e focam no que importa: vencer casos.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <a
                        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999'}?text=${encodeURIComponent('Olá! Quero transformar meu escritório.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full text-xl font-bold tracking-tight transition-transform hover:scale-105 shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)]"
                    >
                        Agendar Demonstração Gratuita
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <p className="mt-6 text-sm text-slate-500 font-medium">
                        *Vagas limitadas para consultoria inicial.
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
