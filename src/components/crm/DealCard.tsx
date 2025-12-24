"use client";

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, DollarSign, User, Briefcase, Scale, UserCheck, AlertCircle } from 'lucide-react';

interface DealCardProps {
    deal: any;
    isOverlay?: boolean;
    isHighlighted?: boolean;
    onClick?: () => void;
}

const PRIORITY_CONFIG: any = {
    Urgent: { label: 'URGENTE', color: 'text-rose-400', border: 'border-l-rose-600', badge: 'bg-rose-500/20 text-rose-400 border-rose-500/50' },
    High: { label: 'ALTA', color: 'text-orange-400', border: 'border-l-orange-500', badge: 'bg-orange-500/20 text-orange-400 border-orange-500/50' },
    Medium: { label: 'MÉDIA', color: 'text-blue-400', border: 'border-l-blue-500', badge: 'bg-blue-500/20 text-blue-400 border-blue-500/50' },
    Low: { label: 'BAIXA', color: 'text-emerald-400', border: 'border-l-emerald-500', badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' },
};

export default function DealCard({ deal, isOverlay, isHighlighted, onClick }: DealCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: deal.id,
        data: {
            type: 'Deal',
            deal,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const urgency = deal.urgency_level || 'Medium';
    const config = PRIORITY_CONFIG[urgency] || PRIORITY_CONFIG['Medium'];

    const cardClassName = `
    bg-slate-800/90 backdrop-blur-xl rounded-xl shadow-md border-l-[4px] cursor-grab hover:shadow-lg hover:-translate-y-0.5 group relative transition-all duration-200 w-full
    ${isDragging ? 'opacity-40 border-l-amber-500 ring-2 ring-amber-500/50 grayscale' : `border-slate-700/60 hover:border-slate-600 ${config.border}`}
    ${isOverlay ? 'ring-2 ring-indigo-500/50 shadow-2xl scale-105 z-50 cursor-grabbing bg-slate-800' : ''}
    ${isHighlighted ? 'ring-[3px] ring-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.5)] z-20 bg-slate-800 border-l-amber-500' : ''}
    `;

    return (
        <div
            ref={setNodeRef}
            style={style}
            id={`deal-card-${deal.id}`}
            data-draggable-card="true"
            className={cardClassName}
            onClick={onClick}
            {...attributes}
            {...listeners}
        >
            {/* Indicador "Selecionado" mais evidente */}
            {isHighlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
                    <div className="flex items-center gap-1.5 bg-amber-500 border border-amber-400 rounded-full px-4 py-1 shadow-lg shadow-amber-500/20">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Selecionado</span>
                    </div>
                </div>
            )}

            <div className="p-3.5 space-y-2.5">

                {/* Header: Priority Badge + Date */}
                <div className="flex justify-between items-center text-[10px] font-medium text-slate-400">
                    <div className="flex items-center gap-2">
                        {/* Priority Badge replaces Area */}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${config.badge}`}>
                            {config.label}
                        </span>

                        {/* Area Text (Subtle) */}
                        {deal.area_do_direito && (
                            <span className="text-slate-500 text-[10px] truncate max-w-[80px]">
                                {deal.area_do_direito}
                            </span>
                        )}
                    </div>

                    {deal.next_activity_date && (
                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-semibold uppercase tracking-wide border ${new Date(deal.next_activity_date) < new Date()
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                            }`}>
                            <Calendar size={10} />
                            <span>{new Date(deal.next_activity_date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '')}</span>
                        </div>
                    )}
                </div>

                {/* Main: Title & Value */}
                <div>
                    <h4 className="font-bold text-slate-100 text-sm leading-tight group-hover:text-amber-400 transition-colors line-clamp-2 mb-1">
                        {deal.title}
                    </h4>
                    <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm">
                        <span className="text-[10px] text-emerald-500/60 font-normal">R$</span>
                        <span>{deal.value?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0,00'}</span>
                    </div>
                </div>

                {/* Process Info (Compact) */}
                {(deal.process_number || deal.court) && (
                    <div className="bg-slate-950/40 px-2.5 py-1.5 rounded border border-slate-800/50 flex flex-wrap gap-x-3 gap-y-1 items-center">
                        {deal.process_number && (
                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-300">
                                <Scale size={10} className="text-indigo-400" />
                                <span className="truncate max-w-[120px]">{deal.process_number}</span>
                            </div>
                        )}
                        {deal.court && (
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                                <Briefcase size={10} className="text-slate-500" />
                                <span className="truncate max-w-[120px]">{deal.court}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer Divider */}
                <div className="h-px bg-slate-700/30 w-full" />

                {/* Footer: People Compact */}
                <div className="flex items-center justify-between gap-2">
                    {/* Client */}
                    <div className="flex items-center gap-2 min-w-0 max-w-[50%]">
                        <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[9px] text-slate-300 shrink-0 border border-slate-600">
                            <User size={10} />
                        </div>
                        <div className="flex flex-col truncate">
                            <span className="text-[9px] text-slate-500 uppercase font-bold leading-none">Cliente</span>
                            <span className="text-[11px] text-slate-300 truncate leading-none mt-0.5" title={deal.contact_name}>
                                {deal.contact_name || '---'}
                            </span>
                        </div>
                    </div>

                    {/* Lawyer */}
                    <div className="flex items-center gap-2 min-w-0 max-w-[50%] justify-end">
                        <div className="flex flex-col items-end truncate">
                            <span className="text-[9px] text-indigo-500/80 uppercase font-bold leading-none">Advogado</span>
                            <span className="text-[11px] text-indigo-300 truncate leading-none mt-0.5" title={deal.owner_name}>
                                {deal.owner_name || '---'}
                            </span>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-indigo-900/40 flex items-center justify-center text-[9px] text-indigo-300 shrink-0 border border-indigo-500/30">
                            <UserCheck size={10} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
