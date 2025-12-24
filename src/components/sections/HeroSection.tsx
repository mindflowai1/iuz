'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
    ArrowRight,
    Sparkles,
    Zap,
    Scale,
    ShieldCheck,
    Cpu,
    TrendingUp,
    FileText,
    Calendar,
    Search,
    AlertCircle
} from 'lucide-react';

export function HeroSection() {
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            id: 0,
            icon: Sparkles,
            color: 'amber',
            title: 'Análise Preditiva',
            subtitle: 'IA Jurídica v4.0',
            metricLabel: 'Probabilidade de Êxito',
            metricValue: '98.5%',
            metricTrend: '+12%',
            footerText: '3 jurisprudências encontradas',
            visualType: 'graph'
        },
        {
            id: 1,
            icon: Calendar,
            color: 'rose',
            title: 'Monitoramento',
            subtitle: 'Diários Oficiais',
            metricLabel: 'Prazos Identificados',
            metricValue: '12',
            metricTrend: 'Hoje',
            footerText: 'Sincronizado com Tribunal',
            visualType: 'calendar'
        },
        {
            id: 2,
            icon: FileText,
            color: 'emerald',
            title: 'Redação Inteligente',
            subtitle: 'Assistente Jurídico',
            metricLabel: 'Tempo Economizado',
            metricValue: '4h',
            metricTrend: '-85%',
            footerText: 'Minuta gerada com sucesso',
            visualType: 'text'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const CurrentFeature = features[activeFeature];
    const FeatureIcon = CurrentFeature.icon;

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020408] selection:bg-amber-500/30 selection:text-amber-200">
            {/* --- Premium Ambient Lighting (Aurora Mesh) --- */}
            {/* --- Premium Ambient Lighting (Aurora Mesh) --- */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-indigo-500/20 rounded-full blur-[150px]"
                />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />
            </div>

            <div className="container mx-auto px-6 z-10 py-20 relative">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* --- Left Column: Typography --- */}
                    <div className="space-y-10 relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg shadow-black/20"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            <span className="text-sm font-medium text-slate-200 tracking-wide">
                                O CRM Jurídico do Futuro
                            </span>
                        </motion.div>

                        <div className="space-y-6">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="text-6xl sm:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.05] tracking-tight"
                            >
                                Advocacia <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 drop-shadow-sm">
                                    Exponencial.
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-xl text-slate-400 max-w-lg leading-relaxed font-light"
                            >
                                Multiplique a capacidade do seu escritório. Nossa IA não apenas organiza — ela <span className="text-slate-200 font-medium">pensa, redige e monitora</span> por você 24/7.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <a
                                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999'}?text=${encodeURIComponent('Olá! Quero conhecer o CRM.')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-105"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Começar Grátis
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </a>
                        </motion.div>

                        {/* Interactive Feature List (Controls carousel manually too) */}
                        <div className="flex gap-6 pt-6">
                            {features.map((f, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveFeature(i)}
                                    className={`text-sm font-medium transition-colors ${activeFeature === i ? 'text-white' : 'text-slate-600 hover:text-slate-400'}`}
                                >
                                    0{i + 1}. {f.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- Right Column: Dynamic Intelligence Stack --- */}
                    <div className="relative h-[600px] flex items-center justify-center perspective-[2000px]">

                        {/* Backlights */}
                        <div className={`absolute inset-0 bg-gradient-to-tr from-${CurrentFeature.color}-500/20 to-indigo-500/20 rounded-full blur-[100px] transform transition-colors duration-1000`} />

                        {/* Base Layers */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                            className="absolute z-0 w-[500px] h-[500px] border border-white/[0.03] rounded-full"
                        />

                        <div className="relative z-10 w-80 lg:w-96 perspective-[1000px]">

                            {/* Static Back Cards for Depth */}
                            <div className="absolute inset-0 h-64 bg-slate-800/40 backdrop-blur-sm border border-white/5 rounded-3xl transform -rotate-6 scale-90 z-10" />
                            <div className="absolute inset-0 h-64 bg-slate-800/60 backdrop-blur-md border border-white/10 rounded-3xl transform rotate-3 scale-95 z-20" />

                            {/* DYNAMIC FRONT CARD */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeFeature}
                                    initial={{ y: 20, opacity: 0, rotateX: -10 }}
                                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                    exit={{ y: -20, opacity: 0, rotateX: 10 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative bg-[#13161c]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-30 min-h-[17rem]"
                                >
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br from-${CurrentFeature.color}-400 to-${CurrentFeature.color}-600 flex items-center justify-center shadow-lg shadow-${CurrentFeature.color}-500/20`}>
                                                <FeatureIcon className="w-5 h-5 text-black" />
                                            </div>
                                            <div>
                                                <div className="text-white font-semibold text-sm">{CurrentFeature.title}</div>
                                                <div className="text-xs text-slate-400">{CurrentFeature.subtitle}</div>
                                            </div>
                                        </div>
                                        <div className={`bg-${CurrentFeature.color}-500/10 border border-${CurrentFeature.color}-500/20 text-${CurrentFeature.color}-400 px-2 py-1 rounded-lg text-xs font-medium`}>
                                            Ativo
                                        </div>
                                    </div>

                                    {/* Content based on type */}
                                    <div className="space-y-1 mb-6">
                                        <div className="text-slate-400 text-xs uppercase tracking-wider font-medium">{CurrentFeature.metricLabel}</div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-bold text-white">{CurrentFeature.metricValue}</span>
                                            <span className={`text-${CurrentFeature.color}-400 text-sm font-medium flex items-center gap-1`}>
                                                {activeFeature !== 1 && <TrendingUp className="w-3 h-3" />} {CurrentFeature.metricTrend}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Dynamic Visual Area */}
                                    <div className="h-24 w-full mb-6 relative overflow-hidden rounded-lg bg-slate-900/50 border border-white/5 p-2">
                                        {CurrentFeature.visualType === 'graph' && (
                                            <div className="flex items-end justify-between gap-1 h-full">
                                                {[30, 45, 35, 55, 45, 70, 60, 85, 95].map((h, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ height: 0 }}
                                                        animate={{ height: `${h}%` }}
                                                        transition={{ duration: 0.5, delay: i * 0.05 }}
                                                        className={`w-full rounded-t-sm ${i >= 7 ? 'bg-amber-500' : 'bg-slate-700/30'}`}
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        {CurrentFeature.visualType === 'calendar' && (
                                            <div className="grid grid-cols-5 gap-1 h-full">
                                                {Array.from({ length: 10 }).map((_, i) => (
                                                    <div key={i} className={`rounded-sm ${i === 4 ? 'bg-rose-500/80' : 'bg-slate-700/20'}`} />
                                                ))}
                                            </div>
                                        )}

                                        {CurrentFeature.visualType === 'text' && (
                                            <div className="space-y-2 p-1">
                                                <motion.div initial={{ width: 0 }} animate={{ width: '80%' }} transition={{ duration: 1 }} className="h-2 bg-slate-600/50 rounded-full" />
                                                <motion.div initial={{ width: 0 }} animate={{ width: '95%' }} transition={{ duration: 1, delay: 0.2 }} className="h-2 bg-slate-600/50 rounded-full" />
                                                <motion.div initial={{ width: 0 }} animate={{ width: '60%' }} transition={{ duration: 1, delay: 0.4 }} className="h-2 bg-emerald-500/50 rounded-full" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center gap-2 pt-4 border-t border-white/5 text-xs text-slate-400">
                                        <CheckCircle2 className={`w-3.5 h-3.5 text-${CurrentFeature.color}-400`} />
                                        {CurrentFeature.footerText}
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-3xl pointer-events-none" />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>
    );
}

// Helper component
import { CheckCircle2 } from 'lucide-react';
