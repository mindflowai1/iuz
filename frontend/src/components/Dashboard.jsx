import React from 'react';
import { TrendingUp, Users, Gavel, Scale } from 'lucide-react';

export default function Dashboard() {
    const stats = [
        { title: 'Valor em Pipeline', value: 'R$ 1.2M', change: '+12%', icon: TrendingUp, color: 'text-emerald-500' },
        { title: 'Novos Clientes (Mês)', value: '14', change: '+4', icon: Users, color: 'text-blue-500' },
        { title: 'Processos Ativos', value: '86', change: '+2', icon: Gavel, color: 'text-amber-500' },
        { title: 'Taxa de Conversão', value: '24%', change: '+1.5%', icon: Scale, color: 'text-purple-500' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Visão Geral</h2>
                <p className="text-slate-400">Métricas e performance do escritório em tempo real.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg bg-slate-950 border border-slate-800 ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-emerald-500 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded">
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.title}</h3>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 min-h-[300px] flex items-center justify-center">
                    <p className="text-slate-500">Gráfico de Receita (Simulação)</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="font-bold text-white mb-4">Atividades Recentes</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex gap-3 text-sm">
                                <div className="w-2 h-2 mt-1.5 rounded-full bg-amber-500 shrink-0" />
                                <div>
                                    <p className="text-slate-300">Novo contrato gerado para <span className="text-white">Cliente {i}</span></p>
                                    <span className="text-slate-500 text-xs">Há {i} horas</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
