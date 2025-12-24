import React, { useState, useMemo } from 'react';
import { Search, Plus, Trash2, Phone, Mail, FileText, MapPin, Scale, Pencil } from 'lucide-react';
import AddLawyerModal from './AddLawyerModal';
import { useCRM } from '@/contexts/CRMContext';

interface LawyersViewProps {
    onNavigateToDeal?: (dealId: string) => void;
}

// Configuração de cores para os estágios
const STAGE_CONFIG: any = {
    'triagem': { color: 'text-slate-400', border: 'border-slate-700', bg: 'bg-slate-800' },
    'analise': { color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/10' },
    'proposta': { color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10' },
    'fechado': { color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' },
    'execucao': { color: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-500/10' },
};

export default function LawyersView({ onNavigateToDeal }: LawyersViewProps) {
    const { lawyers, deals, loading, deleteLawyer, addLawyer, updateLawyer } = useCRM();

    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingLawyer, setEditingLawyer] = useState<any>(null);

    const filteredLawyers = useMemo(() => {
        if (!lawyers) return [];
        return lawyers.filter(lawyer =>
            lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lawyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (lawyer.oab && lawyer.oab.includes(searchTerm)) ||
            (lawyer.phone && lawyer.phone.includes(searchTerm))
        );
    }, [lawyers, searchTerm]);

    const getLawyerDeals = (lawyerId: string | number) => {
        if (!deals) return [];
        // Ensure type compatibility for comparison
        return deals.filter(deal => String(deal.owner_id) === String(lawyerId));
    };

    const handleSaveLawyer = async (lawyerData: any) => {
        let success;
        if (editingLawyer) {
            success = await updateLawyer({ ...lawyerData, id: editingLawyer.id });
        } else {
            success = await addLawyer(lawyerData);
        }

        if (success) {
            setIsAddModalOpen(false);
            setEditingLawyer(null);
        } else {
            alert('Erro ao salvar advogado.');
        }
    };

    const handleDeleteLawyer = async (id: string | number) => {
        if (confirm('Tem certeza que deseja excluir este profissional?')) {
            await deleteLawyer(id);
        }
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 h-full flex flex-col">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5 flex-shrink-0">
                <div className="relative pl-6">
                    <div className="absolute left-0 top-1 w-1.5 h-12 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                    <h2 className="text-3xl font-bold text-white font-serif tracking-tight">
                        Corpo <span className="text-indigo-400">Jurídico</span>
                    </h2>
                    <p className="text-slate-400 mt-1 font-light tracking-wide text-sm">
                        Gestão de advogados, áreas de atuação e processos
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar por nome, OAB..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-slate-900/50 border border-slate-700 text-slate-200 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 w-full md:w-72 transition-all shadow-inner placeholder:text-slate-600"
                        />
                    </div>
                    <button
                        onClick={() => { setEditingLawyer(null); setIsAddModalOpen(true); }}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 active:scale-95"
                    >
                        <Plus size={20} className="stroke-[2.5]" />
                        <span className="hidden sm:inline">Adicionar Advogado</span>
                    </button>
                </div>
            </div>

            {/* Content Table */}
            <div className="bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl flex-1 flex flex-col">
                <div className="overflow-x-auto custom-scrollbar flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 bg-slate-950/90 backdrop-blur-xl z-10 shadow-sm">
                            <tr className="border-b border-white/5">
                                <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest pl-10 w-[30%]">Profissional</th>
                                <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest w-[15%]">Credenciais</th>
                                <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest w-[20%]">Contato</th>
                                <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest w-[25%]">Negócios Ativos</th>
                                <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-right pr-10 w-[10%]">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredLawyers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-24 text-center">
                                        <div className="flex flex-col items-center gap-4 opacity-50">
                                            <div className="p-4 bg-slate-800 rounded-full">
                                                <Scale size={32} className="text-slate-500" />
                                            </div>
                                            <p className="text-slate-400 font-light text-lg">Nenhum advogado encontrado.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredLawyers.map((lawyer) => {
                                    const lawyerDeals = getLawyerDeals(lawyer.id);
                                    return (
                                        <tr key={lawyer.id} className="hover:bg-indigo-500/[0.02] transition-colors group">
                                            <td className="p-6 pl-10">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-indigo-400 font-serif text-2xl font-bold shadow-lg group-hover:border-indigo-500/30 group-hover:from-indigo-900/20 group-hover:to-slate-900 transition-all">
                                                        {lawyer.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <p className="font-bold text-slate-100 text-lg tracking-tight group-hover:text-indigo-300 transition-colors">
                                                            {lawyer.name}
                                                        </p>
                                                        {lawyer.specialty ? (
                                                            <span className="text-xs bg-indigo-500/10 text-indigo-300 px-2.5 py-1 rounded-md border border-indigo-500/20 uppercase tracking-wider font-semibold w-fit">
                                                                {lawyer.specialty}
                                                            </span>
                                                        ) : (
                                                            <span className="text-xs text-slate-500 font-medium select-none">Sem especialidade</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="space-y-3">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">OAB</span>
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                                            <span className="font-mono text-base text-slate-200 tracking-wide font-medium">{lawyer.oab || '---'}</span>
                                                        </div>
                                                    </div>
                                                    {lawyer.state && (
                                                        <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-lg w-fit border border-white/5">
                                                            <MapPin size={14} className="text-indigo-400" />
                                                            <span className="font-medium">{lawyer.state}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                                                        <div className="p-1.5 bg-slate-800 rounded-md">
                                                            <Mail size={14} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
                                                        </div>
                                                        <span className="truncate max-w-[200px]">{lawyer.email}</span>
                                                    </div>
                                                    {lawyer.phone && (
                                                        <div className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                                                            <div className="p-1.5 bg-slate-800 rounded-md">
                                                                <Phone size={14} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
                                                            </div>
                                                            <span className="font-mono">{lawyer.phone}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex flex-col gap-2 max-h-[120px] overflow-y-auto custom-scrollbar pr-2">
                                                    {lawyerDeals.length > 0 ? (
                                                        lawyerDeals.map(deal => {
                                                            const stageKey = deal.stage ? deal.stage.toLowerCase() : 'triagem';
                                                            const stageConfig = STAGE_CONFIG[stageKey] || STAGE_CONFIG['triagem'];

                                                            return (
                                                                <button
                                                                    key={deal.id}
                                                                    onClick={() => onNavigateToDeal && onNavigateToDeal(String(deal.id))}
                                                                    className="text-left px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 transition-all group/deal w-full flex items-center justify-between shadow-sm"
                                                                    title={`Ir para negócio: ${deal.title}`}
                                                                >
                                                                    <div className="flex items-center gap-2 overflow-hidden">
                                                                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${stageConfig.color.replace('text-', 'bg-')}`} />
                                                                        <span className="text-sm font-medium text-slate-300 group-hover/deal:text-white truncate">
                                                                            {deal.title}
                                                                        </span>
                                                                    </div>
                                                                    <span className={`text-[9px] uppercase tracking-wider ml-2 flex-shrink-0 px-2 py-0.5 rounded border font-bold ${stageConfig.color} ${stageConfig.border} ${stageConfig.bg}`}>
                                                                        {deal.stage}
                                                                    </span>
                                                                </button>
                                                            );
                                                        })
                                                    ) : (
                                                        <div className="flex items-center gap-2 text-slate-500 italic text-sm">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                                                            Sem negócios ativos
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-6 text-right pr-10">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button
                                                        onClick={() => { setEditingLawyer(lawyer); setIsAddModalOpen(true); }}
                                                        className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:bg-indigo-600 hover:text-white transition-all border border-slate-700 hover:border-indigo-500 shadow-sm group-hover:shadow-md"
                                                        title="Editar informações"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteLawyer(lawyer.id)}
                                                        className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:bg-rose-600 hover:text-white transition-all border border-slate-700 hover:border-rose-500 shadow-sm group-hover:shadow-md"
                                                        title="Excluir registro"
                                                    >
                                                        <Trash2 size={18} />
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
            </div>

            <AddLawyerModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleSaveLawyer}
                lawyerToEdit={editingLawyer}
            />
        </div>
    );
}
