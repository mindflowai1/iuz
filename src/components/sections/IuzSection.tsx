'use client';

import { motion } from 'framer-motion';
import { Instagram, Globe, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const founders = [
    {
        name: 'Ana Luiza Mendes',
        role: 'Co-Founder & Especialista em Estratégia',
        description: 'Advogada visionária que transformou sua carreira focando em gestão e posicionamento estratégico para escritórios.',
        imageKey: 'ana-luiza' // Placeholder key
    },
    {
        name: 'Ana Teresa Pieroni',
        role: 'Co-Founder & Visual Law',
        description: 'Especialista em traduzir o "juridiquês" em comunicação visual clara e persuasiva que converte clientes.',
        imageKey: 'ana-teresa' // Placeholder key
    }
];

import { GridPattern } from '@/components/magicui/grid-pattern';

export function IuzSection() {
    return (
        <section className="py-24 px-6 bg-[#0B1121] relative overflow-hidden border-t border-slate-900/50">
            {/* Premium Background Treatment */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e293b] via-[#0B1121] to-[#020617]" />

            {/* Subtle Texture */}
            <GridPattern
                width={40}
                height={40}
                x={-1}
                y={-1}
                className="opacity-[0.03] text-slate-400 [mask-image:linear-gradient(to_bottom_right,white,transparent)]"
            />

            <div className="container mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20">
                                    <span className="font-bold tracking-widest text-sm">IUZ CONSULTORIA</span>
                                </div>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                                Transformando a Advocacia em <span className="text-amber-500">Negócios de Sucesso</span>
                            </h2>

                            <p className="text-xl text-slate-400 mb-8 font-light leading-relaxed">
                                A IUZ nasceu da união de duas advogadas que decidiram seguir um caminho diferente.
                                Nossa missão é ajudar você a se posicionar, atrair os clientes certos e vender com segurança e previsibilidade.
                            </p>

                            <div className="flex flex-wrap gap-4 mb-10">
                                <a
                                    href="https://www.instagram.com/iuz.co/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-medium transition-all hover:scale-105 shadow-lg shadow-pink-900/20"
                                >
                                    <Instagram className="w-5 h-5" />
                                    Siga no Instagram
                                </a>
                                <a
                                    href="https://iuzconsultoria.com.br/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700 hover:border-amber-500 text-slate-300 hover:text-white transition-all hover:bg-slate-900"
                                >
                                    <Globe className="w-5 h-5" />
                                    Visite Nosso Site
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Founders Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {founders.map((founder, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="group relative"
                            >
                                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 relative">
                                    {/* Placeholder for Image - User to replace */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800/50 group-hover:bg-slate-800/30 transition-all">
                                        <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center mb-4">
                                            <span className="text-3xl text-slate-500 font-serif">
                                                {founder.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <p className="text-slate-400 text-sm px-8 text-center">
                                            Adicione a foto de {founder.name} aqui
                                        </p>
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                                        <h3 className="text-xl font-bold text-white mb-1">{founder.name}</h3>
                                        <p className="text-amber-500 text-sm font-medium mb-2">{founder.role}</p>
                                        <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            {founder.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
