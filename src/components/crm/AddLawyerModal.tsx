import React, { useState, useEffect } from 'react';
import { X, Save, Scale, FileText, MapPin, Mail, Phone, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AddLawyerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (lawyer: any) => Promise<void>;
    lawyerToEdit?: any;
}

const BRAZIL_STATES = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export default function AddLawyerModal({ isOpen, onClose, onSave, lawyerToEdit }: AddLawyerModalProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [oab, setOab] = useState('');
    const [uf, setUf] = useState('');
    const [specialty, setSpecialty] = useState('');

    useEffect(() => {
        if (lawyerToEdit) {
            setName(lawyerToEdit.name || '');
            setEmail(lawyerToEdit.email || '');
            setPhone(lawyerToEdit.phone || '');
            setOab(lawyerToEdit.oab || '');
            setUf(lawyerToEdit.state || ''); // Handle 'state' or 'uf' mapping
            setSpecialty(lawyerToEdit.specialty || '');
        } else {
            setName('');
            setEmail('');
            setPhone('');
            setOab('');
            setUf('');
            setSpecialty('');
        }
    }, [lawyerToEdit, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave({
            name,
            email,
            phone,
            oab,
            state: uf, // Uniformize as 'state' for backend
            specialty
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-slate-900 border border-slate-700/50 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 border-b border-white/5 flex justify-between items-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
                        <div className="relative z-10 flex items-center gap-3">
                            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                                <Scale className="text-indigo-400" size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white font-serif tracking-wide">
                                    {lawyerToEdit ? 'Editar Advogado' : 'Novo Advogado'}
                                </h2>
                                <p className="text-slate-400 text-xs uppercase tracking-widest mt-1 font-medium">
                                    Cadastro Profissional
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors relative z-10"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                        {/* Section: Identificação */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-2 border-b border-indigo-500/20 pb-1 w-fit">
                                Identificação e Registro
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase ml-1">Nome Completo</label>
                                    <div className="relative group">
                                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={16} />
                                        <input
                                            required
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-slate-950/50 border border-slate-700 text-slate-200 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600 font-medium"
                                            placeholder="Ex: Dr. João Silva"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase ml-1">Nº OAB</label>
                                    <div className="relative group">
                                        <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={16} />
                                        <input
                                            required
                                            type="text"
                                            value={oab}
                                            onChange={(e) => setOab(e.target.value)}
                                            className="w-full bg-slate-950/50 border border-slate-700 text-slate-200 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600 font-mono tracking-wide"
                                            placeholder="Ex: 123.456"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase ml-1">Estado (UF)</label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={16} />
                                        <select
                                            required
                                            value={uf}
                                            onChange={(e) => setUf(e.target.value)}
                                            className="w-full bg-slate-950/50 border border-slate-700 text-slate-200 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled className="text-slate-600">Selecione...</option>
                                            {BRAZIL_STATES.map(state => (
                                                <option key={state} value={state} className="bg-slate-900">{state}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase ml-1">Área de Atuação</label>
                                    <div className="relative group">
                                        <Scale className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={16} />
                                        <select
                                            value={specialty}
                                            onChange={(e) => setSpecialty(e.target.value)}
                                            className="w-full bg-slate-950/50 border border-slate-700 text-slate-200 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="" className="text-slate-600">Selecione a especialidade...</option>
                                            <option value="Trabalhista" className="bg-slate-900">Trabalhista</option>
                                            <option value="Civil" className="bg-slate-900">Cível</option>
                                            <option value="Criminal" className="bg-slate-900">Criminal</option>
                                            <option value="Tributário" className="bg-slate-900">Tributário</option>
                                            <option value="Família" className="bg-slate-900">Família e Sucessões</option>
                                            <option value="Empresarial" className="bg-slate-900">Empresarial</option>
                                            <option value="Imobiliário" className="bg-slate-900">Imobiliário</option>
                                            <option value="Previdenciário" className="bg-slate-900">Previdenciário</option>
                                            <option value="Consumidor" className="bg-slate-900">Consumidor</option>
                                            <option value="Ambiental" className="bg-slate-900">Ambiental</option>
                                            <option value="Digital" className="bg-slate-900">Direito Digital</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section: Contato */}
                        <div className="space-y-4 pt-2">
                            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-2 border-b border-indigo-500/20 pb-1 w-fit">
                                Contato
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase ml-1">Email</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={16} />
                                        <input
                                            required
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-slate-950/50 border border-slate-700 text-slate-200 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
                                            placeholder="email@advocacia.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase ml-1">Telefone / WhatsApp</label>
                                    <div className="relative group">
                                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={16} />
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full bg-slate-950/50 border border-slate-700 text-slate-200 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
                                            placeholder="(11) 99999-9999"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-white/5 mt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors text-sm font-medium"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                            >
                                <Save size={18} />
                                {lawyerToEdit ? 'Salvar Alterações' : 'Cadastrar Advogado'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
