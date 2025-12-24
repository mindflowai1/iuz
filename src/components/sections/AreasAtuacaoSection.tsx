'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
    Bot,
    Calendar,
    BarChart3,
    Zap,
    CheckCircle2
} from 'lucide-react';

const features = [
    {
        id: 'ia',
        title: 'IA Jurídica',
        label: 'Inteligência Artificial',
        description: 'Análise preditiva de casos, redação automática de peças e assistente jurídico que trabalha 24/7 para o seu time.',
        icon: Bot,
        benefits: ['Geração de documentos', 'Análise de jurisprudência', 'Respostas instantâneas'],
        gradient: 'from-amber-500 to-orange-600'
    },
    {
        id: 'gestao',
        title: 'Gestão Total',
        label: 'Processos & Clientes',
        description: 'Centralize todos os casos, clientes e documentos em uma única plataforma segura e acessível de qualquer lugar.',
        icon: Calendar,
        benefits: ['Alertas de prazos', 'Organização automática', 'Histórico completo'],
        gradient: 'from-blue-500 to-indigo-600'
    },
    {
        id: 'analytics',
        title: 'Inteligência de Dados',
        label: 'Analytics & Insights',
        description: 'Dashboards intuitivos com métricas em tempo real para decisões estratégicas baseadas em dados concretos.',
        icon: BarChart3,
        benefits: ['KPIs personalizados', 'Relatórios automáticos', 'Previsão de resultados'],
        gradient: 'from-emerald-500 to-teal-600'
    },
    {
        id: 'automation',
        title: 'Automação Completa',
        label: 'Workflows Inteligentes',
        description: 'Elimine tarefas repetitivas com automações que economizam horas de trabalho manual todos os dias.',
        icon: Zap,
        benefits: ['Tarefas automáticas', 'Integração de sistemas', 'Economia de tempo'],
        gradient: 'from-violet-500 to-purple-600'
    }
];

export function AreasAtuacaoSection() {
    const [activeFeature, setActiveFeature] = useState(0);
    const current = features[activeFeature];
    const Icon = current.icon;

    return (
        <section id="recursos" className="py-32 px-6 bg-[#020408] relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/5 via-[#020408] to-[#020408]" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />

            <div className="container mx-auto relative z-10 max-w-7xl">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5"
                    >
                        <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                        <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">Recursos Principais</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
                    >
                        Potencialize seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700">Escritório</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-400 max-w-3xl mx-auto font-light"
                    >
                        Tecnologia de ponta que transforma a forma como escritórios de advocacia trabalham
                    </motion.p>
                </div>

                {/* Feature Tabs + Showcase */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Tabs */}
                    <div className="space-y-4">
                        {features.map((feature, index) => {
                            const isActive = activeFeature === index;
                            return (
                                <motion.button
                                    key={feature.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setActiveFeature(index)}
                                    className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${isActive
                                            ? 'bg-white/5 border-amber-500/40 shadow-lg shadow-amber-500/10'
                                            : 'bg-slate-900/20 border-white/5 hover:border-white/10 hover:bg-slate-900/30'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive
                                                ? `bg-gradient-to-br ${feature.gradient} shadow-lg`
                                                : 'bg-white/5 border border-white/10'
                                            }`}>
                                            <feature.icon className={`w-6 h-6 transition-colors ${isActive ? 'text-white' : 'text-slate-400'
                                                }`} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`text-lg font-bold mb-1 transition-colors ${isActive ? 'text-white' : 'text-slate-300'
                                                }`}>
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm text-slate-500">{feature.label}</p>
                                        </div>
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="w-1 h-12 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full"
                                            />
                                        )}
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Right: Feature Showcase */}
                    <motion.div
                        key={activeFeature}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="relative"
                    >
                        <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900/60 to-slate-900/30 border border-white/10 backdrop-blur-xl overflow-hidden">

                            {/* Animated Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${current.gradient} opacity-5`} />
                            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />

                            <div className="relative z-10">
                                {/* Icon */}
                                <div className={`inline-flex w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${current.gradient} items-center justify-center mb-6 shadow-2xl shadow-amber-500/20`}>
                                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                                </div>

                                {/* Title */}
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                                    {current.title}
                                </h3>

                                {/* Description */}
                                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                                    {current.description}
                                </p>

                                {/* Benefits */}
                                <div className="space-y-3">
                                    {current.benefits.map((benefit, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-center gap-3"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                                            <span className="text-slate-300">{benefit}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br ${current.gradient} rounded-full blur-3xl opacity-20`} />
                            <div className={`absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br ${current.gradient} rounded-full blur-3xl opacity-10`} />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
