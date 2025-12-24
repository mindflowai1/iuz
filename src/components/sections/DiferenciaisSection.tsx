'use client';

import { motion } from 'framer-motion';
import {
    Zap,
    Search,
    Brain,
    Shield,
    FileCheck,
    Lock
} from 'lucide-react';

export function DiferenciaisSection() {
    return (
        <section id="diferenciais" className="py-24 px-6 bg-[#020408] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-[#020408] to-[#020408]" />

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
                    >
                        Tecnologia que <span className="text-amber-500">Garante Resultados</span>
                    </motion.h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
                        Não somos apenas um escritório. Somos uma plataforma jurídica que trabalha por você 24 horas por dia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

                    {/* Card 1: Agilidade (Large) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-2 group relative rounded-3xl bg-slate-900/40 border border-white/5 overflow-hidden p-8 hover:border-amber-500/30 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
                                    <Zap className="w-8 h-8" />
                                </div>
                                <div className="px-3 py-1 bg-amber-500/10 rounded-full text-xs font-medium text-amber-400">
                                    -60% no tempo de espera
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Agilidade Recorde</h3>
                                <p className="text-slate-400 font-light max-w-md">
                                    Nossa IA processa documentos e petições em segundos, eliminando semanas de burocracia manual. O que antes levava dias, agora é instantâneo.
                                </p>
                            </div>

                            {/* Internal Animation: Speed Bars */}
                            <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-10 flex flex-col justify-end gap-2 p-8">
                                {[80, 60, 90, 40, 70].map((w, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${w}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="h-2 bg-amber-500 rounded-full self-end"
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: Análise Preditiva (Tall/Normal) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="md:col-span-1 group relative rounded-3xl bg-slate-900/40 border border-white/5 overflow-hidden p-8 hover:border-blue-500/30 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 w-fit">
                                <Brain className="w-8 h-8" />
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Análise Preditiva</h3>
                                <p className="text-slate-400 font-light">
                                    Cruzamos milhões de dados para prever o desfecho do seu caso com alta precisão.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3: Transparência (Normal) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="md:col-span-1 group relative rounded-3xl bg-slate-900/40 border border-white/5 overflow-hidden p-8 hover:border-emerald-500/30 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 w-fit">
                                <FileCheck className="w-8 h-8" />
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Transparência</h3>
                                <p className="text-slate-400 font-light">
                                    Acompanhe cada passo do seu processo em tempo real pelo seu celular.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 4: Segurança (Large) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="md:col-span-2 group relative rounded-3xl bg-slate-900/40 border border-white/5 overflow-hidden p-8 hover:border-purple-500/30 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
                                    <Lock className="w-8 h-8" />
                                </div>
                                <div className="px-3 py-1 bg-purple-500/10 rounded-full text-xs font-medium text-purple-400">
                                    Criptografia Militar
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Segurança Máxima</h3>
                                <p className="text-slate-400 font-light max-w-md">
                                    Seus dados são protegidos com a mesma tecnologia usada por grandes bancos. Privacidade absoluta garantida.
                                </p>
                            </div>

                            {/* Internal Animation: Shield Pulse */}
                            <div className="absolute right-0 bottom-[-50px] opacity-10">
                                <Shield className="w-64 h-64 text-purple-500" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
