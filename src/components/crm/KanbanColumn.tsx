import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DealCard from './DealCard';

interface KanbanColumnProps {
    id: string;
    title: string;
    color: string;
    deals: any[];
    highlightedDealId?: string | null;
    onEditDeal: (deal: any) => void;
}

export default function KanbanColumn({ id, title, color, deals, highlightedDealId, onEditDeal }: KanbanColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: id,
        data: {
            type: 'Column',
            columnId: id
        }
    });

    return (
        <div
            ref={setNodeRef}
            className={`
                flex-1 min-w-[310px] md:min-w-[360px] flex flex-col rounded-2xl border backdrop-blur-sm shadow-xl transition-colors duration-200
                ${isOver ? 'bg-slate-800/60 border-amber-500/50 ring-2 ring-amber-500/20' : 'bg-slate-900/40 border-slate-800/60'}
            `}
        >
            {/* Column Header */}
            <div className="p-4 flex items-center justify-between border-b border-slate-800/50 bg-slate-900/30 rounded-t-2xl">
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${color} shadow-[0_0_10px_rgba(var(--tw-shadow-color),0.6)] ring-2 ring-white/5`} />
                    <h3 className="font-bold text-slate-200 tracking-wide text-xs uppercase truncate max-w-[150px]" title={title}>{title}</h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-400 border border-slate-700">
                    {deals.length}
                </span>
            </div>

            {/* Column Content (Drop Zone) */}
            <div className="p-3 flex-1 overflow-y-auto space-y-3 custom-scrollbar bg-slate-900/10 min-h-[150px]">
                <SortableContext items={deals.map(d => String(d.id))} strategy={verticalListSortingStrategy}>
                    {deals.map((deal) => (
                        <DealCard
                            key={deal.id}
                            deal={deal}
                            isHighlighted={String(highlightedDealId) === String(deal.id)}
                            onClick={() => onEditDeal(deal)}
                        />
                    ))}
                </SortableContext>

                {/* Visual Empty State */}
                {deals.length === 0 && (
                    <div className="h-full min-h-[120px] border-2 border-dashed border-slate-800/50 rounded-xl flex flex-col items-center justify-center text-slate-600 gap-2 opacity-50 bg-slate-900/20">
                        <span className="text-[10px] font-medium uppercase tracking-widest opacity-70">Arraste aqui</span>
                    </div>
                )}
            </div>
        </div>
    );
}
