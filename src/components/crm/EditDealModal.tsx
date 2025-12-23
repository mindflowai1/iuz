"use client";

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { endpoints } from '@/lib/api_config';
import {
    FileText,
    MessageSquare,
    Info,
    Upload,
    Trash2,
    Calendar,
    DollarSign,
    User,
    CheckCircle2,
    AlertCircle,
    X,
    Save,
    Briefcase,
    Scale,
    Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchSelect } from '@/components/ui/SearchSelect';

interface EditDealModalProps {
    isOpen: boolean;
    onClose: () => void;
    deal: any;
    onSave: (updatedDeal: any) => void;
    onDelete: (dealId: string) => void;
}

const TABS = [
    { id: 'details', label: 'Detalhes', icon: Info },
    { id: 'documents', label: 'Anexos', icon: FileText },
    { id: 'activities', label: 'Histórico', icon: MessageSquare },
];

export default function EditDealModal({ isOpen, onClose, deal, onSave, onDelete }: EditDealModalProps) {
    const [activeTab, setActiveTab] = useState('details');
    const [formData, setFormData] = useState<any>(deal || {});

    useEffect(() => {
        if (deal) {
            setFormData({
                ...deal,
                next_activity_date: deal.next_activity_date ? deal.next_activity_date.split('T')[0] : ''
            });
        }
    }, [deal]);

    const handleSave = () => {
        const cleanData = {
            ...formData,
            value: parseFloat(formData.value) || 0,
            contact_id: formData.contact_id ? parseInt(formData.contact_id) : null,
            owner_id: formData.owner_id ? parseInt(formData.owner_id) : null,
            // Ensure names are preserved for optimistic updates
            contact_name: formData.contact_name,
            owner_name: formData.owner_name
        };
        onSave(cleanData);
        onClose();
    };

    // API Fetchers
    const fetchContacts = async (query: string) => {
        try {
            const response = await fetch(`${endpoints.contacts}/search?q=${query}`);
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            return [];
        }
    };

    const fetchLawyers = async (query: string) => {
        try {
            const response = await fetch(`${endpoints.lawyers}/search?q=${query}`);
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            return [];
        }
    };

    const handleSelectContact = (item: any) => {
        setFormData((prev: any) => ({ ...prev, contact_name: item.name, contact_id: item.id }));
    };

    const handleSelectLawyer = (item: any) => {
        setFormData((prev: any) => ({ ...prev, owner_name: item.name, owner_id: item.id }));
    };

    if (!deal) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Detalhes do Negócio" maxWidth="max-w-6xl">
            <div className="flex flex-col lg:flex-row h-auto lg:h-[80vh] gap-6 overflow-visible lg:overflow-hidden">

                {/* LEFT COLUMN: Main Inputs (Title, Tabs, Big Fields) */}
                <div className="flex-1 flex flex-col min-w-0 gap-4 overflow-visible lg:overflow-y-auto custom-scrollbar pr-0 lg:pr-2">

                    {/* Header Section */}
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Título do Negócio</label>
                            <input
                                value={formData.title || ''}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-transparent text-2xl font-bold text-white placeholder-slate-600 border-none focus:ring-0 p-0"
                                placeholder="Ex: Divórcio Consensual - Silva"
                            />
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[200px] space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Valor da Causa</label>
                                <div className="relative group">
                                    <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                                    <input
                                        type="number"
                                        value={formData.value || ''}
                                        onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-9 pr-4 text-emerald-400 font-bold focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 min-w-[200px] space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estágio</label>
                                <select
                                    value={formData.stage || 'Triagem'}
                                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-200 font-medium focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none appearance-none cursor-pointer hover:bg-slate-900 transition-colors"
                                >
                                    <option value="triagem">Triagem / Qualificação</option>
                                    <option value="analise">Análise Técnica / Docs</option>
                                    <option value="proposta">Proposta / Negociação</option>
                                    <option value="fechado">Fechado / Contrato</option>
                                    <option value="execucao">Ajuizamento / Execução</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex items-center gap-2 border-b border-slate-800">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all
                                    ${activeTab === tab.id
                                        ? 'border-amber-500 text-amber-500'
                                        : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/20'}
                                `}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 bg-slate-900/30 rounded-2xl border border-slate-800/50 p-6">
                        {activeTab === 'details' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                        <FileText size={16} className="text-indigo-400" />
                                        Descrição / Anotações
                                    </label>
                                    <textarea
                                        value={formData.description || ''}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full h-48 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-300 leading-relaxed focus:border-indigo-500/50 outline-none resize-none custom-scrollbar"
                                        placeholder="Descreva os detalhes do caso, estratégia processual ou observações importantes..."
                                    />
                                </div>
                            </motion.div>
                        )}
                        {/* Other tabs placeholders */}
                        {activeTab !== 'details' && (
                            <div className="flex flex-col items-center justify-center h-48 text-slate-600">
                                <Info size={48} className="mb-4 opacity-20" />
                                <p>Conteúdo da aba em desenvolvimento</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN: Sidebar (Properties) */}
                <div className="w-full lg:w-[320px] bg-slate-900/80 border-t lg:border-t-0 lg:border-l border-slate-800 p-6 flex flex-col gap-6 h-auto lg:h-full overflow-visible lg:overflow-y-auto custom-scrollbar rounded-xl lg:rounded-none">

                    {/* Urgency Widget */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                            <AlertCircle size={12} /> Prioridade
                        </label>
                        <div className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                            {['Low', 'Medium', 'High', 'Urgent'].map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setFormData({ ...formData, urgency_level: level })}
                                    className={`h-2 rounded-md transition-all ${formData.urgency_level === level
                                        ? (level === 'Urgent' ? 'bg-rose-600 shadow-[0_0_10px_rgba(244,63,94,0.5)]' :
                                            level === 'High' ? 'bg-orange-600' :
                                                level === 'Medium' ? 'bg-blue-500' : 'bg-emerald-500')
                                        : 'bg-slate-800 hover:bg-slate-700'
                                        }`}
                                    title={level}
                                />
                            ))}
                        </div>
                        <p className="text-right text-xs font-bold text-slate-400">
                            {formData.urgency_level === 'Urgent' ? 'URGENTE' :
                                formData.urgency_level === 'High' ? 'Alta' :
                                    formData.urgency_level === 'Medium' ? 'Média' : 'Baixa'}
                        </p>
                    </div>

                    <div className="h-px bg-slate-800" />

                    {/* People Section */}
                    <div className="space-y-4">
                        <div className="space-y-2 relative z-20">
                            <SearchSelect
                                label="Cliente"
                                placeholder="Selecionar Cliente..."
                                value={formData.contact_id}
                                displayValue={formData.contact_name}
                                onSelect={handleSelectContact}
                                fetchOptions={fetchContacts}
                            />
                        </div>

                        <div className="space-y-2 relative z-10">
                            <SearchSelect
                                label="Advogado Responsável"
                                placeholder="Selecionar Advogado..."
                                value={formData.owner_id}
                                displayValue={formData.owner_name}
                                onSelect={handleSelectLawyer}
                                fetchOptions={fetchLawyers}
                            />
                        </div>
                    </div>

                    <div className="h-px bg-slate-800" />

                    {/* Legal Specs */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Processo</label>
                            <div className="relative">
                                <Scale size={14} className="absolute left-3 top-3 text-indigo-400" />
                                <input
                                    value={formData.process_number || ''}
                                    onChange={(e) => setFormData({ ...formData, process_number: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-9 pr-3 text-sm text-slate-300 font-mono focus:border-indigo-500/50 outline-none"
                                    placeholder="0000000-00.2024..."
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vara / Tribunal</label>
                            <input
                                value={formData.court || ''}
                                onChange={(e) => setFormData({ ...formData, court: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-3 text-sm text-slate-300 focus:border-indigo-500/50 outline-none"
                                placeholder="Ex: 1ª Vara Cível - SP"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Próxima Atividade</label>
                            <div className="relative">
                                <Calendar size={14} className="absolute left-3 top-3 text-amber-500" />
                                <input
                                    type="date"
                                    value={formData.next_activity_date || ''}
                                    onChange={(e) => setFormData({ ...formData, next_activity_date: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-9 pr-3 text-sm text-slate-300 focus:border-amber-500/50 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 space-y-3">
                        <button
                            onClick={handleSave}
                            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <Save size={18} /> Salvar Alterações
                        </button>
                        <button
                            onClick={() => onDelete(deal.id)}
                            className="w-full bg-transparent hover:bg-rose-500/10 text-rose-500 hover:text-rose-400 font-medium py-3 rounded-xl border border-rose-500/30 hover:border-rose-500/50 transition-all flex items-center justify-center gap-2"
                        >
                            <Trash2 size={18} /> Excluir Negócio
                        </button>
                    </div>

                </div>
            </div>
        </Modal>
    );
}
