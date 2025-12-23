import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, DollarSign, User } from 'lucide-react';

export default function DealCard({ deal, isOverlay }) {
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

    const cardClassName = `
    bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-700 cursor-grab hover:border-amber-500/50 group
    ${isDragging ? 'opacity-30 ring-2 ring-amber-500' : ''}
    ${isOverlay ? 'ring-2 ring-amber-500 shadow-xl cursor-grabbing' : ''}
  `;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cardClassName}
        >
            <div className="flex justify-between items-start mb-2">
                <span className={`text-xs px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-400`}>
                    {deal.area_do_direito || 'Geral'}
                </span>
                {deal.priority === 'High' && (
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                )}
            </div>

            <h4 className="font-semibold text-white mb-3 group-hover:text-amber-500 transition-colors">
                {deal.title}
            </h4>

            <div className="space-y-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                    <User size={14} />
                    <span>{deal.contact_name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <DollarSign size={14} />
                    <span>{deal.value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
                {deal.next_step && (
                    <div className="flex items-center gap-2 text-xs mt-3 pt-3 border-t border-slate-700/50">
                        <Calendar size={12} className="text-amber-500" />
                        <span className="text-slate-300">{deal.next_step}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
