'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MessageSquare, Brain, UserCheck, Calendar, Eye } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: MessageSquare,
        title: 'Contato Imediato',
        description: 'Envie sua dúvida pelo WhatsApp. Sem filas. Atendimento instantâneo 24/7.',
    },
    {
        number: '02',
        icon: Brain,
        title: 'Triagem Inteligente',
        description: 'Nossa IA organiza seu caso e identifica a urgência, garantindo precisão.',
    },
    {
        number: '03',
        icon: UserCheck,
        title: 'Análise do Especialista',
        description: 'Um advogado sênior recebe o relatório pronto com a estratégia já traçada.',
    },
    {
        number: '04',
        icon: Calendar,
        title: 'Solução sob Medida',
        description: 'Plano de ação definido em reunião focada em resolver seu problema.',
    },
    {
        number: '05',
        icon: Eye,
        title: 'Transparência Total',
        description: 'Acompanhe cada movimentação do seu processo em tempo real pelo Portal.',
    },
];

export function ComoFuncionaSection() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section id="como-funciona" ref={targetRef} className="py-24 px-6 bg-[#020408] relative overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-blue-900/10 via-[#020408] to-[#020408]" />

            <div className="container mx-auto max-w-5xl relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm"
                    >
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        <span className="text-xs font-medium text-slate-300 uppercase tracking-wide">Fluxo Otimizado</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
                    >
                        Simplificamos o <span className="text-blue-500">Complexo</span>
                    </motion.h2>
                </div>

                <div className="relative">
                    {/* Central Line - Background */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-white/5 transform md:-translate-x-1/2" />

                    {/* Central Line - Progress (Animated) */}
                    <motion.div
                        style={{ scaleY, originY: 0 }}
                        className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-blue-500 to-purple-500 transform md:-translate-x-1/2 z-0"
                    />

                    <div className="space-y-12 md:space-y-24">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-[11px] md:left-1/2 top-0 md:top-1/2 w-5 h-5 rounded-full bg-[#020408] border-2 border-white/20 z-10 transform md:-translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center group-hover:border-amber-500 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-white/50" />
                                    </div>

                                    {/* Content Side */}
                                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                                        <div className={`flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                                            <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-center mb-4 text-white shadow-lg">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <span className="text-4xl font-bold text-white/5 absolute -z-10 select-none scale-150 origin-center translate-y-2">
                                                {step.number}
                                            </span>
                                            <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                                            <p className="text-slate-400 font-light leading-relaxed max-w-sm">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Empty Side for layout balance */}
                                    <div className="hidden md:block w-1/2" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
