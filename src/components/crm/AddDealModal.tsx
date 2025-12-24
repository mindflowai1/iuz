"use client";

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { DollarSign, User, Briefcase, Calendar } from 'lucide-react';
import { SearchSelect } from '@/components/ui/SearchSelect';

interface AddDealModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (deal: any) => void;
}

import { supabase } from '@/lib/supabase';
import AddClientModal from './AddClientModal';

export default function AddDealModal({ isOpen, onClose, onSave }: AddDealModalProps) {
    const [formData, setFormData] = useState<any>({
        title: '',
        contact_name: '',
        contact_id: '',
        value: '',
        area_do_direito: 'Cível',
        stage: 'triagem',
        process_number: '',
        court: '',
        urgency_level: 'Medium',
        next_activity_date: '',
        owner_name: '',
        owner_id: ''
    });

    const [isCreateContactOpen, setIsCreateContactOpen] = useState(false);
    const [newContactName, setNewContactName] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const cleanData = {
                ...formData,
                value: parseFloat(formData.value) || 0,
                contact_id: formData.contact_id ? parseInt(formData.contact_id) : null,
                owner_id: formData.owner_id ? parseInt(formData.owner_id) : null,
            };

            // Remove non-db fields if any, but explicitly keep compatible ones
            // Actually, we should probably rely on onSave to handle the saving if it's passed from parent
            // But looking at previous code, it was doing a POST here.

            // Let's use direct Supabase insert here since we are migrating from API call
            // But wait, onSave in KanbanBoard calls addDeal from context.
            // Let's see if onSave is enough. 
            // In KanbanBoard: handleSaveNewDeal calls addDeal(newDeal). 
            // So we should just construct the object and call onSave.

            // However, the original code did a fetch POST. 
            // If I change to just onSave(cleanData), the KanbanBoard's addDeal will handle the Supabase insert.
            // Let's verifying KanbanBoard's handleSaveNewDeal.
            // const handleSaveNewDeal = async (newDeal: any) => { const success = await addDeal(newDeal); ... }
            // context addDeal does the insert.

            // So we just need to pass the data to onSave.
            onSave(cleanData);

            setFormData({
                title: '', contact_name: '', contact_id: '', value: '', area_do_direito: 'Cível', stage: 'Triagem',
                process_number: '', court: '', urgency_level: 'Medium', next_activity_date: '', owner_name: '', owner_id: ''
            });
            onClose();

        } catch (error) {
            console.error("Error creating deal:", error);
        }
    };

    // API Fetchers
    const fetchContacts = async (query: string) => {
        try {
            let queryBuilder = supabase.from('contacts').select('id, name, email');

            if (query) {
                queryBuilder = queryBuilder.ilike('name', `%${query}%`);
            }

            const { data, error } = await queryBuilder.limit(20);

            if (error) {
                console.error('Error fetching contacts:', error);
                return [];
            }
            return data || [];
        } catch (error) {
            return [];
        }
    };

    const fetchLawyers = async (query: string) => {
        try {
            let queryBuilder = supabase.from('lawyers').select('id, name, email, oab');

            if (query) {
                queryBuilder = queryBuilder.ilike('name', `%${query}%`);
            }

            const { data, error } = await queryBuilder.limit(20);

            if (error) {
                console.error('Error fetching lawyers:', error);
                return [];
            }
            return data || [];
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

    const handleLocalCreateContact = (name: string) => {
        setNewContactName(name);
        setIsCreateContactOpen(true);
    };

    const handleSaveNewContact = (contact: any) => {
        // Auto-select the new contact
        setFormData((prev: any) => ({
            ...prev,
            contact_name: contact.name,
            contact_id: contact.id
        }));
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} title="Novo Negócio" maxWidth="max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Row 1: Title & Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-400">Título do Caso</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Ex: Divórcio Silva"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-sm text-white focus:ring-1 focus:ring-amber-500 outline-none"
                            />
                        </div>
                        <div className="space-y-1 z-20">
                            <SearchSelect
                                label="Cliente (Contato)"
                                placeholder="Buscar Cliente..."
                                value={formData.contact_id}
                                displayValue={formData.contact_name}
                                onSelect={handleSelectContact}
                                fetchOptions={fetchContacts}
                                icon={User}
                                onCreateNew={handleLocalCreateContact}
                            />
                        </div>
                    </div>

                    {/* Row 2: Value, Urgency, Owner */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-400">Valor (R$)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5" />
                                <input
                                    type="number"
                                    name="value"
                                    value={formData.value}
                                    onChange={handleChange}
                                    placeholder="0,00"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-8 pr-3 text-sm text-white focus:ring-1 focus:ring-amber-500 outline-none"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-400">Urgência</label>
                            <select
                                name="urgency_level"
                                value={formData.urgency_level}
                                onChange={handleChange}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-sm text-white focus:ring-1 focus:ring-amber-500 outline-none"
                            >
                                <option value="Low">Baixa</option>
                                <option value="Medium">Média</option>
                                <option value="High">Alta</option>
                                <option value="Urgent">URGENTE</option>
                            </select>
                        </div>
                        <div className="space-y-1 z-10">
                            <SearchSelect
                                label="Advogado Resp."
                                placeholder="Buscar Advogado..."
                                value={formData.owner_id}
                                displayValue={formData.owner_name}
                                onSelect={handleSelectLawyer}
                                fetchOptions={fetchLawyers}
                                icon={Briefcase}
                            />
                        </div>
                    </div>

                    {/* Row 3: Process Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/50 p-3 rounded-lg border border-slate-800/50">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-400">Número do Processo</label>
                            <input
                                type="text"
                                name="process_number"
                                value={formData.process_number}
                                onChange={handleChange}
                                placeholder="0000000-00.0000.0.00.0000"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-sm text-white font-mono focus:ring-1 focus:ring-amber-500 outline-none placeholder:text-slate-600"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-400">Vara / Tribunal</label>
                            <input
                                type="text"
                                name="court"
                                value={formData.court}
                                onChange={handleChange}
                                placeholder="Ex: 1ª Vara Cível - SP"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-sm text-white focus:ring-1 focus:ring-amber-500 outline-none placeholder:text-slate-600"
                            />
                        </div>
                    </div>

                    {/* Row 4: Area & Stage & Next Activity */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-400">Área do Direito</label>
                            <select
                                name="area_do_direito"
                                value={formData.area_do_direito}
                                onChange={handleChange}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-sm text-white focus:ring-1 focus:ring-amber-500 outline-none"
                            >
                                <option value="Cível">Cível</option>
                                <option value="Família">Família</option>
                                <option value="Trabalhista">Trabalhista</option>
                                <option value="Criminal">Criminal</option>
                                <option value="Previdenciário">Previdenciário</option>
                                <option value="Imobiliário">Imobiliário</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-400">Estágio Inicial</label>
                            <select
                                name="stage"
                                value={formData.stage}
                                onChange={handleChange}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-sm text-white focus:ring-1 focus:ring-amber-500 outline-none"
                            >
                                <option value="triagem">Triagem</option>
                                <option value="analise">Análise</option>
                                <option value="proposta">Proposta</option>
                                <option value="fechado">Fechado</option>
                                <option value="execucao">Execução</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-400">Próxima Atividade</label>
                            <div className="relative">
                                <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5" />
                                <input
                                    type="date"
                                    name="next_activity_date"
                                    value={formData.next_activity_date}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-8 pr-3 text-sm text-white focus:ring-1 focus:ring-amber-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-6 rounded-lg text-sm transition-all shadow-lg shadow-amber-500/20"
                        >
                            Criar Negócio
                        </button>
                    </div>
                </form>
            </Modal>

            <AddClientModal
                isOpen={isCreateContactOpen}
                onClose={() => setIsCreateContactOpen(false)}
                initialName={newContactName}
                onSave={handleSaveNewContact}
            />
        </>
    );
}
