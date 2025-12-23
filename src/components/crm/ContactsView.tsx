"use client";

import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Edit2, Trash2, Phone, Mail, User, MessageCircle, Pencil } from 'lucide-react';
import AddClientModal from './AddClientModal';
import { useCRM } from '@/contexts/CRMContext'; // Using the simplified Context

interface ContactsViewProps {
    onNavigateToDeal?: (dealId: string) => void;
}

export default function ContactsView({ onNavigateToDeal }: ContactsViewProps) {
    // Encapsulated Data Fetching
    const { contacts, loading, deleteContact, addContact, updateContact } = useCRM();

    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<any>(null);

    // Filter contacts based on search
    const filteredContacts = useMemo(() => {
        return contacts.filter(client =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (client.phone && client.phone.includes(searchTerm))
        );
    }, [contacts, searchTerm]);

    const handleSaveClient = async (clientData: any) => {
        let success;
        if (editingClient) {
            success = await updateContact({ ...clientData, id: editingClient.id });
        } else {
            success = await addContact(clientData);
        }

        if (success) {
            setIsAddModalOpen(false);
            setEditingClient(null);
        } else {
            alert('Erro ao salvar cliente.');
        }
    };

    const formatPhoneForWhatsapp = (phone: string) => {
        if (!phone) return '';
        // Remove non-numeric chars
        return phone.replace(/\D/g, '');
    };

    const handleDeleteClient = async (clientId: string | number) => {
        if (confirm('Tem certeza que deseja excluir este cliente?')) {
            const success = await deleteContact(clientId);
            if (!success) {
                alert('Erro ao excluir cliente');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Filter deals by contact to show counts
    const { deals } = useCRM();

    const getDealStats = (contactId: number) => {
        const contactDeals = deals.filter(d => d.contact_id === contactId);
        const totalValue = contactDeals.reduce((sum, d) => sum + (d.value || 0), 0);
        return { count: contactDeals.length, totalValue, deals: contactDeals };
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div className="relative">
                    <div className="absolute -left-4 top-1 w-1 h-12 bg-gradient-to-b from-amber-400 to-amber-600 rounded-r-full" />
                    <h2 className="text-3xl font-bold text-white font-serif tracking-tight">
                        Carteira de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Clientes</span>
                    </h2>
                    <p className="text-slate-400 mt-1 font-light tracking-wide">Gestão estratégica de contatos e oportunidades</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-400 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar por nome, email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-slate-900/50 border border-slate-700 text-slate-200 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 w-full md:w-72 transition-all shadow-inner"
                        />
                    </div>
                    <button
                        onClick={() => { setEditingClient(null); setIsAddModalOpen(true); }}
                        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 active:scale-95"
                    >
                        <Plus size={20} className="stroke-[2.5]" />
                        <span className="hidden sm:inline">Novo Cliente</span>
                    </button>
                </div>
            </div>

            <div className="bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest pl-6">Cliente</th>
                                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Canais de Contato</th>
                                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Oportunidades</th>
                                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right pr-6">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredContacts.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center text-slate-500 italic font-light">
                                        Nenhum cliente encontrado com estes critérios.
                                    </td>
                                </tr>
                            ) : (
                                filteredContacts.map((client) => {
                                    const stats = getDealStats(Number(client.id));
                                    // Use created_at if available, else fallback to current date or just 2025 if missing
                                    const dateStr = client.created_at
                                        ? new Date(client.created_at).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
                                        : 'Recente';

                                    return (
                                        <tr key={client.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="p-5 pl-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-amber-500 font-serif text-xl border border-white/10 shadow-lg group-hover:border-amber-500/30 transition-colors">
                                                        {client.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-100 text-lg tracking-tight group-hover:text-amber-400 transition-colors">{client.name}</p>
                                                        <p className="text-xs text-slate-500 font-medium mt-0.5">Cliente desde {dateStr}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center gap-3 text-sm text-slate-300 group/item w-fit transition-colors p-1.5 rounded-lg hover:bg-white/5 -ml-1.5">
                                                        <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-400 group-hover/item:bg-blue-500/20 transition-colors">
                                                            <Mail size={16} />
                                                        </div>
                                                        <span className="font-light tracking-wide">{client.email}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-sm text-slate-300 group/item w-fit transition-colors p-1.5 rounded-lg hover:bg-white/5 -ml-1.5">
                                                        <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400 group-hover/item:bg-emerald-500/20 transition-colors">
                                                            <Phone size={16} />
                                                        </div>
                                                        <span className="font-light tracking-wide">{client.phone}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex flex-col gap-2">
                                                    {stats.count === 0 ? (
                                                        <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/50 text-slate-500 border border-slate-700/50 w-fit">
                                                            0 Negócios
                                                        </span>
                                                    ) : (
                                                        stats.deals.map(deal => (
                                                            <div key={deal.id} className="flex flex-col mb-2">
                                                                <button
                                                                    onClick={() => onNavigateToDeal && onNavigateToDeal(String(deal.id))}
                                                                    className="group/deal flex flex-col items-start p-2.5 rounded-xl bg-slate-800/80 border border-amber-500/20 hover:border-amber-500/50 hover:bg-slate-800 transition-all w-fit shadow-lg shadow-black/20"
                                                                >
                                                                    <span className="text-sm font-bold text-amber-400 group-hover/deal:text-amber-300 transition-colors">
                                                                        {deal.title}
                                                                    </span>
                                                                    {deal.value > 0 && (
                                                                        <span className="text-xs font-semibold text-emerald-400 mt-1 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(deal.value)}
                                                                        </span>
                                                                    )}
                                                                </button>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-5 text-right pr-6">
                                                <div className="flex items-center justify-end gap-2">
                                                    {/* Whatsapp Action */}
                                                    <a
                                                        href={`https://wa.me/55${formatPhoneForWhatsapp(client.phone)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all group/wa relative"
                                                        title="WhatsApp"
                                                    >
                                                        <MessageCircle size={18} />
                                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-slate-200 text-[10px] px-2 py-1 rounded opacity-0 group-hover/wa:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl z-10">
                                                            WhatsApp
                                                        </span>
                                                    </a>

                                                    <button
                                                        onClick={() => { setEditingClient(client); setIsAddModalOpen(true); }}
                                                        className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all group/edit relative"
                                                        title="Editar"
                                                    >
                                                        <Pencil size={18} />
                                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-slate-200 text-[10px] px-2 py-1 rounded opacity-0 group-hover/edit:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl z-10">
                                                            Editar
                                                        </span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClient(client.id)}
                                                        className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-rose-400 hover:border-rose-500/50 hover:bg-rose-500/10 transition-all group/delete relative"
                                                        title="Excluir"
                                                    >
                                                        <Trash2 size={18} />
                                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-slate-200 text-[10px] px-2 py-1 rounded opacity-0 group-hover/delete:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl z-10">
                                                            Excluir
                                                        </span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div >

            <AddClientModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleSaveClient}
                clientToEdit={editingClient}
            />
        </div >
    );
}
