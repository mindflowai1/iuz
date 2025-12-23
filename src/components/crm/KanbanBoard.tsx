"use client";

import React, { useState, useMemo, useEffect } from 'react';
import {
    DndContext,
    DragOverlay,
    pointerWithin,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    defaultDropAnimationSideEffects,
    DropAnimation
} from '@dnd-kit/core';
import { verticalListSortingStrategy } from '@dnd-kit/sortable';
import DealCard from './DealCard';
import KanbanColumn from './KanbanColumn';
import { Plus, WifiOff } from 'lucide-react';
import AddDealModal from './AddDealModal';
import EditDealModal from './EditDealModal';
import { useCRM } from '@/contexts/CRMContext';

const COLUMNS = [
    { id: 'triagem', title: 'Triagem / Qualificação', color: 'bg-blue-500' },
    { id: 'analise', title: 'Análise Técnica / Docs', color: 'bg-indigo-500' },
    { id: 'proposta', title: 'Proposta / Negociação', color: 'bg-amber-500' },
    { id: 'fechado', title: 'Fechado / Contrato', color: 'bg-emerald-500' },
    { id: 'execucao', title: 'Ajuizamento / Execução', color: 'bg-rose-500' },
];

interface KanbanBoardProps {
    highlightedDealId?: string | null;
    onClearHighlight?: () => void;
}

export default function KanbanBoard({ highlightedDealId, onClearHighlight }: KanbanBoardProps) {
    const { deals, loading, error, addDeal, updateDeal, deleteDeal } = useCRM();

    // Local state for optimistic updates during drag
    const [localDeals, setLocalDeals] = useState<any[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);

    // Modals
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingDeal, setEditingDeal] = useState<any>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Scroll Drag Logic
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;

        // Prevent drag-scroll if clicking on a card or button
        if ((e.target as HTMLElement).closest('[data-draggable-card]')) return;
        if ((e.target as HTMLElement).closest('button')) return;

        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Scroll speed
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    // Normalize Stages Helper
    const normalizeStage = (stage: string) => {
        if (!stage) return 'triagem';
        const lower = stage.toLowerCase();
        if (lower.includes('triagem')) return 'triagem';
        if (lower.includes('análise') || lower.includes('analise')) return 'analise';
        if (lower.includes('proposta')) return 'proposta';
        if (lower.includes('fechado')) return 'fechado';
        if (lower.includes('ajuizamento') || lower.includes('execução') || lower.includes('execucao')) return 'execucao';
        return 'triagem'; // Fallback
    };

    // Sync local state with context deals when not dragging (and normalize stages)
    useEffect(() => {
        if (!activeId) {
            const normalizedDeals = deals.map(d => ({
                ...d,
                stage: normalizeStage(d.stage)
            }));
            setLocalDeals(normalizedDeals);
        }
    }, [deals, activeId]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Reduced distance for faster response
            },
        })
    );

    const columns = useMemo(() => {
        return COLUMNS.map(col => ({
            ...col,
            deals: localDeals.filter(deal => deal.stage === col.id)
        }));
    }, [localDeals]);

    // Internal navigation highlight logic
    useEffect(() => {
        if (highlightedDealId && localDeals.length > 0) {
            setTimeout(() => {
                const element = document.getElementById(`deal-card-${highlightedDealId}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                }
            }, 500);
        }
    }, [highlightedDealId, localDeals]);

    function handleDragStart(event: DragStartEvent) {
        setActiveId(String(event.active.id));
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = String(active.id);
        const overId = String(over.id);

        const activeDeal = localDeals.find(d => String(d.id) === activeId);
        if (!activeDeal) return;

        // Find which column we are over (either directly over a column container or over a card in that column)
        const overColumnId = COLUMNS.find(col => col.id === overId)?.id;
        // If over a card, find that card's column
        const overCard = localDeals.find(d => String(d.id) === overId);
        const overCardColumnId = overCard?.stage;

        const newStage = overColumnId || overCardColumnId;

        if (newStage && activeDeal.stage !== newStage) {
            setLocalDeals((items) => {
                return items.map(item => {
                    if (String(item.id) === activeId) {
                        return { ...item, stage: newStage };
                    }
                    return item;
                });
            });
        }
    }

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const activeDealId = String(active.id);
        const overId = String(over.id);

        // Determine final stage
        const overColumnId = COLUMNS.find(col => col.id === overId)?.id;
        const overCard = localDeals.find(d => String(d.id) === overId);
        const newStage = overColumnId || overCard?.stage;

        if (newStage) {
            const originalDeal = deals.find(d => String(d.id) === activeDealId);

            // Only update backend if stage changed
            if (originalDeal && originalDeal.stage !== newStage) {
                // Update local visual state first (should happen via DragOver but ensure consistency)
                setLocalDeals(prev => prev.map(d => String(d.id) === activeDealId ? { ...d, stage: newStage } : d));

                // Call API
                await updateDeal({ ...originalDeal, stage: newStage });
            }
        } else {
            // Revert if dropped nowhere valid
            setLocalDeals(deals);
        }
    }

    const dropAnimation: DropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    };

    const handleSaveNewDeal = async (newDeal: any) => {
        const success = await addDeal(newDeal);
        if (success) setIsAddModalOpen(false);
        else alert('Erro ao adicionar negócio.');
    };

    const handleSaveEditedDeal = async (updatedDeal: any) => {
        const success = await updateDeal(updatedDeal);
        if (success) {
            setIsEditModalOpen(false);
            setEditingDeal(null);
        } else alert('Erro ao atualizar negócio.');
    };

    const handleDeleteDeal = async (dealId: string) => {
        if (confirm('Tem certeza que deseja excluir este negócio?')) {
            const success = await deleteDeal(dealId);
            if (success) {
                setIsEditModalOpen(false);
                setEditingDeal(null);
            } else alert('Erro ao excluir negócio.');
        }
    };

    const handleEditDeal = (deal: any) => {
        setEditingDeal(deal);
        setIsEditModalOpen(true);
    };

    const activeDeal = activeId ? localDeals.find(d => String(d.id) === activeId) : null;

    if (loading) return <div className="flex h-full items-center justify-center"><div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" /></div>;

    if (error) {
        return (
            <div className="flex h-full flex-col items-center justify-center text-red-400 gap-2">
                <WifiOff size={48} />
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className="text-sm underline">Tentar novamente</button>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            {/* Header Actions */}
            <div className="mb-2 flex justify-between items-center px-0">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Pipeline de Vendas</h2>
                    <p className="text-slate-400 text-sm mt-1">Gerencie seus processos com liberdade</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
                >
                    <Plus size={20} className="stroke-[3]" />
                    Novo Negócio
                </button>
            </div>

            {/* Board Container */}
            <div
                ref={scrollContainerRef}
                className={`flex-1 overflow-x-auto pb-4 custom-scrollbar transition-all ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                <div className="flex gap-4 h-full w-full px-0">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={pointerWithin}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDragEnd={handleDragEnd}
                    >
                        {columns.map((column) => (
                            <KanbanColumn
                                key={column.id}
                                id={column.id}
                                title={column.title}
                                color={column.color}
                                deals={column.deals}
                                highlightedDealId={highlightedDealId}
                                onEditDeal={handleEditDeal}
                            />
                        ))}

                        <DragOverlay dropAnimation={dropAnimation}>
                            {activeDeal ? (
                                <DealCard deal={activeDeal} isOverlay />
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                </div>
            </div>

            {/* Modals */}
            <AddDealModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleSaveNewDeal}
            />

            <EditDealModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                deal={editingDeal}
                onSave={handleSaveEditedDeal}
                onDelete={handleDeleteDeal}
            />
        </div >
    );
}
