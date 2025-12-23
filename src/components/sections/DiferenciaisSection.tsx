'use client';

import { motion } from 'framer-motion';
import {
    Zap,
    FileText,
    Mic,
    BarChart3,
} from 'lucide-react';

const diferenciais = [
    {
        icon: <Zap className="w-8 h-8" />,
        title: 'Agilidade Recorde',
        description:
            'Não espere dias por uma resposta. Nossa tecnologia inicia a análise do seu caso em segundos, adiantando etapas burocráticas.',
    },
    {
        icon: <FileText className="w-8 h-8" />,
        title: 'Precisão Cirúrgica na Análise',
        description:
            'Nossos sistemas cruzam milhares de dados e jurisprudências para encontrar os melhores argumentos para a sua defesa.',
    },
    {
        icon: <Mic className="w-8 h-8" />,
        title: 'Transparência Total',
        description:
            'Esqueça o "juridiquês". Explicamos tudo de forma simples e você acompanha cada movimento do seu processo em tempo real.',
    },
    {
        icon: <BarChart3 className="w-8 h-8" />,
        title: 'Estratégia Baseada em Dados',
        description:
            'Não contamos com a sorte. Usamos estatísticas de casos similares para traçar a melhor rota para a sua vitória.',
    },
];

import { DotPattern } from '@/components/magicui/dot-pattern';

export function DiferenciaisSection() {
    return (
        <section id="diferenciais" className="py-24 px-6 bg-slate-950 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-slate-950" />
            <DotPattern
                className="opacity-20 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
                width={20}
                height={20}
                cr={1.5}
            />

            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
                    >
                        Por que escolher a Advocacia do Futuro?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto font-light"
                    >
                        Menos burocracia, mais resultados. A união perfeita entre experiência humana e velocidade digital.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {diferenciais.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            whileHover={{ scale: 1.02 }}
                            className="group relative backdrop-blur-xl bg-slate-900/50 rounded-3xl p-8 border border-slate-800 hover:border-amber-500/30 transition-all shadow-xl hover:shadow-2xl hover:shadow-amber-900/10"
                        >
                            {/* Icon */}
                            <div className="inline-flex p-4 rounded-2xl bg-amber-500/10 text-amber-500 mb-6 shadow-sm group-hover:scale-110 transition-transform ring-1 ring-amber-500/20">
                                {item.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-slate-50 mb-4">
                                {item.title}
                            </h3>
                            <p className="text-slate-400 leading-relaxed font-light">{item.description}</p>

                            {/* Hover glow effect */}
                            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
