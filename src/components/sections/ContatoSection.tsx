'use client';

import { HubSpotContactForm } from '@/components/HubSpotContactForm';
import { GridPattern } from '@/components/magicui/grid-pattern';
import { motion } from 'framer-motion';

export function ContatoSection() {
    return (
        <section id="contato" className="py-24 px-6 bg-[#0B1121] relative overflow-hidden">
            {/* Premium Background Treatment - Reversed Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#1d283a] via-[#0B1121] to-[#020617]" />

            {/* Subtle Texture */}
            <GridPattern
                width={40}
                height={40}
                x={-1}
                y={-1}
                className="opacity-[0.03] text-slate-400 [mask-image:radial-gradient(ellipse_at_bottom,white,transparent)]"
            />

            <div className="container mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Fale Conosco
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
                        Preencha o formulário e receba uma análise gratuita do seu caso
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="max-w-xl mx-auto"
                >
                    <HubSpotContactForm />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <p className="text-slate-500 mb-4 text-sm font-medium uppercase tracking-wider">Ou entre em contato diretamente</p>
                    <div className="flex flex-col md:flex-row gap-8 justify-center items-center text-white">
                        <a
                            href="tel:+5511999999999"
                            className="flex items-center gap-2 text-slate-300 hover:text-amber-500 transition-colors group"
                        >
                            <span className="p-2 rounded-full bg-slate-900/50 group-hover:bg-amber-500/10 transition-colors border border-slate-800">📞</span>
                            (11) 99999-9999
                        </a>
                        <span className="hidden md:inline text-slate-700">|</span>
                        <a
                            href="mailto:contato@escritorio.com"
                            className="flex items-center gap-2 text-slate-300 hover:text-amber-500 transition-colors group"
                        >
                            <span className="p-2 rounded-full bg-slate-900/50 group-hover:bg-amber-500/10 transition-colors border border-slate-800">✉️</span>
                            contato@escritorio.com
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
