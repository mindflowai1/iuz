import React, { useState, useMemo } from 'react';
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DealCard from './DealCard';
import { Plus } from 'lucide-react';

const MOCK_DEALS = [
    { id: '1', title: 'Divórcio Silva x Silva', stage: 'Novo', value: 35000, contact_name: 'João Silva', area_do_direito: 'Família', priority: 'High', next_step: 'Aguardando Documentos' },
    { id: '2', title: 'Ação Trabalhista XPTO', stage: 'Qualificação', value: 120000, contact_name: 'Maria Santos', area_do_direito: 'Trabalhista', priority: 'Medium' },
    { id: '3', title: 'Inventário Franco', stage: 'Reunião Agendada', value: 850000, contact_name: 'Pedro Franco', area_do_direito: 'Cível', next_step: 'Reunião Presencial 24/05' },
];

const COLUMNS = [
    { id: 'Novo', title: 'Novos Leads', color: 'bg-blue-500' },
    { id: 'Qualificação', title: 'Em Qualificação', color: 'bg-indigo-500' },
    { id: 'Reunião Agendada', title: 'Reunião Agendada', color: 'bg-amber-500' },
    { id: 'Proposta', title: 'Proposta Enviada', color: 'bg-purple-500' },
    { id: 'Fechado - Ganho', title: 'Fechado', color: 'bg-emerald-500' },
];

export default function KanbanBoard() {
    const [deals, setDeals] = useState(MOCK_DEALS);
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const columns = useMemo(() => {
        return COLUMNS.map(col => ({
            ...col,
            deals: deals.filter(deal => deal.stage === col.id)
        }));
    }, [deals]);

    function handleDragStart(event) {
        setActiveId(event.active.id);
    }

    function handleDragEnd(event) {
        const { active, over } = event;

        if (!over) return;

        const activeDealId = active.id;
        const overId = over.id;

        // Check if dropped on a column or another card
        const overColumnId = COLUMNS.find(col => col.id === overId)?.id;
        // Or find the column of the card we dropped on
        const overCardColumnId = deals.find(d => d.id === overId)?.stage;

        const newStage = overColumnId || overCardColumnId;

        if (newStage) {
            setDeals((items) => {
                return items.map(item => {
                    if (item.id === activeDealId) {
                        // Simulate Logic: Check if moving to "Reunião Agendada"
                        if (newStage === 'Reunião Agendada' && item.stage !== 'Reunião Agendada') {
                            console.log("TRIGGER: New meeting scheduled logic");
                            // In real app: call API to trigger backend automation
                        }
                        return { ...item, stage: newStage };
                    }
                    return item;
                });
            });
        }

        setActiveId(null);
    }

    const activeDeal = activeId ? deals.find(d => d.id === activeId) : null;

    return (
        <div className="h-full overflow-x-auto">
            <div className="flex gap-6 h-full min-w-[1200px]">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    {columns.map((column) => (
                        <div key={column.id} className="flex-1 min-w-[300px] flex flex-col bg-slate-900/50 rounded-xl border border-slate-800">
                            <div className="p-4 border-b border-slate-800 flex justify-between items-center sticky top-0 bg-slate-900/95 backdrop-blur z-10 rounded-t-xl">
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${column.color}`} />
                                    <h3 className="font-semibold text-slate-200">{column.title}</h3>
                                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-xs text-slate-400">
                                        {column.deals.length}
                                    </span>
                                </div>
                                <button className="text-slate-400 hover:text-white hover:bg-slate-800 p-1 rounded">
                                    <Plus size={16} />
                                </button>
                            </div>

                            <div className="p-3 flex-1 overflow-y-auto space-y-3">
                                <SortableContext items={column.deals.map(d => d.id)} strategy={verticalListSortingStrategy}>
                                    {column.deals.map((deal) => (
                                        <DealCard key={deal.id} deal={deal} />
                                    ))}
                                </SortableContext>
                                {/* Drop zone placeholder if empty */}
                                {column.deals.length === 0 && (
                                    <div id={column.id} className="h-full min-h-[100px] border-2 border-dashed border-slate-800/50 rounded-lg flex items-center justify-center text-slate-600 text-sm">
                                        Arraste aqui
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    <DragOverlay>
                        {activeDeal ? (
                            <DealCard deal={activeDeal} isOverlay />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    );
}
