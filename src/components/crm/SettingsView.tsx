"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Save, User, Mail, Phone, MapPin, Lock, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { API_BASE_URL } from '@/lib/api_config';

interface UserProfileData {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export default function SettingsView() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserProfileData>();

    // Password reset state
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            // Get current user email from session
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user?.email) return;

            try {
                const response = await fetch(`${API_BASE_URL}/users/me?email=${session.user.email}`);
                if (response.ok) {
                    const data = await response.json();
                    setValue('name', data.name || '');
                    setValue('email', data.email || session.user.email);
                    setValue('phone', data.phone || '');
                    setValue('address', data.address || '');
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [setValue]);

    const onSubmit = async (data: UserProfileData) => {
        setIsSaving(true);
        setSuccessMessage(null);
        setErrorMessage(null);

        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user?.email) return;

        try {
            const response = await fetch(`${API_BASE_URL}/users/me?email=${session.user.email}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSuccessMessage('Perfil atualizado com sucesso!');
                setTimeout(() => setSuccessMessage(null), 3000);
            } else {
                setErrorMessage('Erro ao atualizar perfil.');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Erro de conexão ao salvar.');
        } finally {
            setIsSaving(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        if (newPassword !== confirmPassword) {
            setErrorMessage('As senhas não conferem.');
            return;
        }

        if (newPassword.length < 6) {
            setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        setIsChangingPassword(true);
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) throw error;
            setSuccessMessage('Senha alterada com sucesso!');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            setErrorMessage(error.message || 'Erro ao alterar senha.');
        } finally {
            setIsChangingPassword(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-10">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white">Configurações da Conta</h2>
                <p className="text-slate-400">Gerencie suas informações pessoais e segurança.</p>
            </div>

            {/* Notifications */}
            {successMessage && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-4 rounded-xl flex items-center gap-3 animate-fade-in-down">
                    <CheckCircle size={20} />
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 animate-fade-in-down">
                    <div className="w-5 h-5 rounded-full border-2 border-red-400 flex items-center justify-center font-bold">!</div>
                    {errorMessage}
                </div>
            )}


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Form */}
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-slate-800 rounded-lg text-amber-500">
                                <User size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-white">Dados Pessoais</h3>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Nome Completo</label>
                                    <div className="relative group">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={18} />
                                        <input
                                            {...register('name')}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white p focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                                            placeholder="Seu nome"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">E-mail</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                        <input
                                            {...register('email')}
                                            disabled
                                            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-slate-400 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Telefone / WhatsApp</label>
                                    <div className="relative group">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={18} />
                                        <input
                                            {...register('phone')}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                                            placeholder="(00) 00000-0000"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Endereço</label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={18} />
                                        <input
                                            {...register('address')}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                                            placeholder="Endereço completo"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-amber-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Salvando...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            Salvar Alterações
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>

                {/* Security Section */}
                <div className="lg:col-span-1 space-y-6">
                    <section className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-slate-800 rounded-lg text-amber-500">
                                <Lock size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-white">Segurança</h3>
                        </div>

                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Nova Senha</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-slate-600"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Confirmar Senha</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-slate-600"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isChangingPassword || !newPassword}
                                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                            >
                                {isChangingPassword ? 'Alterando...' : 'Alterar Senha'}
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
}
