'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Brain, UserCheck, Calendar, Eye } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: <MessageSquare className="w-8 h-8" />,
        title: 'Contato Imediato',
        description: 'Envie sua dúvida pelo WhatsApp. Sem filas, sem espera. Nosso sistema inicia seu atendimento instantaneamente.',
    },
    {
        number: '02',
        icon: <Brain className="w-8 h-8" />,
        title: 'Triagem Inteligente',
        description: 'Nossa IA organiza seu caso e identifica a urgência, garantindo que nenhum detalhe importante seja perdido.',
    },
    {
        number: '03',
        icon: <UserCheck className="w-8 h-8" />,
        title: 'Análise do Especialista',
        description: 'Um advogado sênior da área recebe o relatório pronto e entra em contato já com a estratégia traçada.',
    },
    {
        number: '04',
        icon: <Calendar className="w-8 h-8" />,
        title: 'Solução sob Medida',
        description: 'Definimos o plano de ação em uma reunião focada em resolver o seu problema da forma mais rápida.',
    },
    {
        number: '05',
        icon: <Eye className="w-8 h-8" />,
        title: 'Transparência Total',
        description: 'Você recebe acesso ao nosso Portal do Cliente para ver cada movimentação do seu processo em tempo real.',
    },
];

import { GridPattern } from '@/components/magicui/grid-pattern';

export function ComoFuncionaSection() {
    return (
        <section id="como-funciona" className="py-24 px-6 bg-[#0B1121] relative overflow-hidden">
            {/* Premium Background Treatment */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1d283a] via-[#0B1121] to-[#020617]" />

            {/* Subtle Texture */}
            <GridPattern
                width={40}
                height={40}
                x={-1}
                y={-1}
                className="opacity-[0.03] text-slate-400 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
            />

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
                    >
                        Como Funciona?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto font-light"
                    >
                        Processo simples e transparente do início ao fim
                    </motion.p>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/20 via-blue-500/20 to-amber-500/20 hidden md:block" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className={`relative flex items-center mb-16 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                } flex-col`}
                        >
                            {/* Content card */}
                            <div
                                className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                                    }`}
                            >
                                <div className="backdrop-blur-xl bg-slate-900/50 rounded-2xl p-8 border border-slate-800 hover:border-amber-500/30 transition-all group hover:scale-105 hover:shadow-xl hover:shadow-amber-900/5">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-5xl font-bold text-transparent bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text">
                                            {step.number}
                                        </span>
                                        <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20">
                                            {step.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-50 mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-400 font-light">{step.description}</p>
                                </div>
                            </div>

                            {/* Center dot */}
                            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-slate-900 border-4 border-amber-500 z-10 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
