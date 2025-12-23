"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, User, Mail, Phone, Save, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
type ClientFormData = {
    name: string;
    email: string;
    phone: string;
};

interface AddClientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    onSave?: (client: any) => void;
    clientToEdit?: { id: number; name: string; email: string; phone: string } | null;
    initialName?: string;
}

export default function AddClientModal({ isOpen, onClose, onSuccess, onSave, clientToEdit, initialName }: AddClientModalProps) {
    const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<ClientFormData>();

    useEffect(() => {
        if (clientToEdit) {
            setValue('name', clientToEdit.name);
            setValue('email', clientToEdit.email);
            setValue('phone', clientToEdit.phone);
        } else if (initialName) {
            setValue('name', initialName);
            setValue('email', '');
            setValue('phone', '');
        } else {
            reset();
        }
    }, [clientToEdit, initialName, setValue, reset, isOpen]);

    const onSubmit = async (data: ClientFormData) => {
        try {
            if (onSave) {
                // Determine if we are editing or creating to pass correct structure
                // But the parent handles logic based on 'editingClient' state usually.
                // Actually AddClientModal receives clientToEdit, but parent has the logic in handleSaveClient.
                // We just pass the form data.
                await onSave(data);
            }
            if (onSuccess) onSuccess();
            // Note: Parent is responsible for closing the modal on success usually, 
            // but here we might want to close it if no error thrown?
            // Existing logic in ContactsView closes it on success. 
            // So we don't strictly need to close here if parent does it, 
            // but if onSave is void, we might close immediately.
            // Let's assume onSave handles the close or returns promise.
            // For safety with current ContactsView implementation (which closes modal), 
            // we should NOT close it here if onSave is async and fails.
            // But handleSaveClient in ContactsView doesn't throw, it alerts.
            // So we might need to rely on props to close?
            // ContactsView: if (success) setIsAddModalOpen(false). 
            // So we don't need onClose() here if onSave handles it.
            // However, to keep it consistent with previous UX (reset form), we can reset.
            reset();
        } catch (error: any) {
            console.error(error);
            alert(error.message || 'Erro ao salvar cliente');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-[60]"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 flex items-center justify-center p-4 z-[70] pointer-events-none"
                    >
                        <div className="w-full max-w-lg bg-slate-900/95 border border-white/10 rounded-2xl shadow-2xl shadow-amber-500/5 overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]">

                            {/* Header */}
                            <div className="relative p-6 border-b border-white/5 bg-gradient-to-r from-slate-900 to-slate-800/50">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-600 opacity-20"></div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                                            {clientToEdit ? 'Editar Cliente' : 'Novo Cliente'}
                                        </h2>
                                        <p className="text-sm text-slate-500 mt-0.5">
                                            {clientToEdit ? 'Atualize as informações do cliente abaixo.' : 'Preencha os dados para cadastrar um novo cliente.'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 -mr-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Body */}
                            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5 overflow-y-auto custom-scrollbar">

                                {/* Name Input */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Nome Completo</label>
                                    <div className="relative group">
                                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={18} />
                                        <input
                                            {...register('name', { required: 'Nome é obrigatório' })}
                                            placeholder="Ex: João da Silva"
                                            className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all font-medium"
                                        />
                                    </div>
                                    {errors.name && <span className="text-red-500 text-xs ml-1 flex items-center gap-1">Isso é obrigatório</span>}
                                </div>

                                {/* Email Input */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Email Profissional</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={18} />
                                        <input
                                            {...register('email', { required: 'Email é obrigatório' })}
                                            type="email"
                                            placeholder="cliente@email.com"
                                            className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all"
                                        />
                                    </div>
                                    {errors.email && <span className="text-red-500 text-xs ml-1 flex items-center gap-1">Isso é obrigatório</span>}
                                </div>

                                {/* Phone Input */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Telefone / WhatsApp</label>
                                    <div className="relative group">
                                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={18} />
                                        <input
                                            {...register('phone', { required: 'Telefone é obrigatório' })}
                                            placeholder="(11) 99999-9999"
                                            className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all"
                                        />
                                    </div>
                                    {errors.phone && <span className="text-red-500 text-xs ml-1 flex items-center gap-1">Isso é obrigatório</span>}
                                </div>

                                {/* Footer Actions */}
                                <div className="pt-6 mt-2 flex gap-3 border-t border-white/5">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="h-12 px-6 rounded-xl font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all border border-transparent"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="h-12 flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={20} className="animate-spin" />
                                                <span>Salvando...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Save size={20} />
                                                <span>{clientToEdit ? 'Salvar Alterações' : 'Cadastrar Cliente'}</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
