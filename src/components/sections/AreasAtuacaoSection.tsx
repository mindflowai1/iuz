'use client';

import { motion } from 'framer-motion';
import {
    Users,
    Briefcase,
    Building2,
    Heart,
    ShieldCheck,
    Scale,
    Gavel,
    Landmark,
    FileSignature
} from 'lucide-react';

const areas = [
    {
        title: 'Direito de Família',
        description: 'Soluções discretas para divórcios, guarda e partilhas. Protegemos seu legado.',
        icon: Heart,
        color: 'rose'
    },
    {
        title: 'Direito Trabalhista',
        description: 'Defesa incisiva em rescisões e direitos. Recuperamos o que é seu.',
        icon: Briefcase,
        color: 'amber'
    },
    {
        title: 'Direito Previdenciário',
        description: 'Planejamento de aposentadoria com cálculos precisos para o melhor benefício.',
        icon: ShieldCheck,
        color: 'emerald'
    },
    {
        title: 'Direito Cível',
        description: 'Resolução de conflitos contratuais e indenizações com estratégia superior.',
        icon: Scale,
        color: 'blue'
    },
    {
        title: 'Direito Criminal',
        description: 'Atuação 24h em flagrantes e defesa técnica. Sigilo absoluto.',
        icon: Gavel,
        color: 'slate'
    },
    {
        title: 'Direito Empresarial',
        description: 'Blindagem jurídica e compliance para focar no crescimento do negócio.',
        icon: Building2,
        color: 'indigo'
    },
];

export function AreasAtuacaoSection() {
    return (
        <section id="areas" className="py-24 px-6 bg-[#020408] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-[#020408] to-[#020408]" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />

            <div className="container mx-auto relative z-10 max-w-7xl">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm"
                    >
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                        <span className="text-xs font-medium text-slate-300 uppercase tracking-wide">Expertise Jurídica</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
                    >
                        Atuação <span className="text-amber-500">Especializada</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Unimos conhecimento técnico profundo com tecnologia para entregar resultados em todas as esferas.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {areas.map((area, index) => {
                        const Icon = area.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group relative p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-amber-500/30 transition-all duration-300 backdrop-blur-sm"
                            >
                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:border-amber-500 transition-all duration-300 shadow-lg group-hover:shadow-amber-500/30">
                                        <Icon className="w-7 h-7 text-slate-300 group-hover:text-black transition-colors duration-300" />
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors">
                                        {area.title}
                                    </h3>
                                    <p className="text-slate-400 font-light leading-relaxed">
                                        {area.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
