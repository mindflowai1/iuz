"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Scale, Lock, Mail, ArrowRight, Loader2, User, MapPin, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [cpf, setCpf] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const passwordRules = [
        { id: 1, text: "Mínimo 8 caracteres", valid: password.length >= 8 },
        { id: 2, text: "Letra maiúscula", valid: /[A-Z]/.test(password) },
        { id: 3, text: "Letra minúscula", valid: /[a-z]/.test(password) },
        { id: 4, text: "Número", valid: /\d/.test(password) },
        { id: 5, text: "Caractere especial", valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    ];

    const isPasswordValid = passwordRules.every(r => r.valid);

    const handleZipLookup = async (zip: string) => {
        const cleanZip = zip.replace(/\D/g, '');
        if (cleanZip.length === 8) {
            try {
                setLoading(true);
                const response = await fetch(`https://viacep.com.br/ws/${cleanZip}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    setAddress(data.logradouro);
                    setCity(data.localidade);
                    setState(data.uf);
                }
            } catch (err) {
                console.error("Erro CEP", err);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isSignUp) {
                if (!isPasswordValid) throw new Error("A senha não atende aos requisitos de segurança.");

                const { data: authData, error: authError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                        }
                    }
                });

                if (authError) throw authError;

                if (authData.user) {
                    // Save extra profile info
                    const { error: profileError } = await supabase.from('profiles').upsert({
                        id: authData.user.id,
                        full_name: fullName,
                        cpf,
                        address,
                        city,
                        state,
                        zip_code: zipCode,
                        updated_at: new Date()
                    });

                    if (profileError) throw profileError;
                }

                alert('Cadastro realizado! Verifique seu email para confirmar.');
                setIsSignUp(false); // Switch back to login
            } else {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                router.push('/app');
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden overflow-y-auto">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 fixed" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent fixed" />

            <div className={`w-full ${isSignUp ? 'max-w-2xl' : 'max-w-md'} bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10 transition-all duration-500 my-10`}>

                <div className="text-center mb-8">
                    <div className="inline-flex p-3 rounded-xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20 mb-4">
                        <Scale className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">CRM Jurídico</h1>
                    <p className="text-slate-400 text-sm">{isSignUp ? 'Crie sua conta profissional' : 'Acesse sua conta para gerenciar processos'}</p>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">

                    {/* LOGIN / SIGNUP FIELDS */}

                    {isSignUp && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Nome Completo</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50"
                                        placeholder="Dr. João Silva"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">CPF</label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        type="text"
                                        value={cpf}
                                        onChange={(e) => setCpf(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50"
                                        placeholder="000.000.000-00"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">CEP</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        type="text"
                                        value={zipCode}
                                        onChange={(e) => {
                                            setZipCode(e.target.value);
                                            if (e.target.value.length >= 8) handleZipLookup(e.target.value);
                                        }}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50"
                                        placeholder="00000-000"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Endereço</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50"
                                    placeholder="Rua, Número, Bairro"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Cidade</label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Estado</label>
                                <input
                                    type="text"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                                placeholder="advogado@exemplo.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Senha</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {isSignUp && (
                        <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800 space-y-2">
                            <p className="text-xs text-slate-400 mb-2 font-medium">Requisitos da senha:</p>
                            {passwordRules.map(rule => (
                                <div key={rule.id} className={`flex items-center gap-2 text-xs ${rule.valid ? 'text-emerald-500' : 'text-slate-500'}`}>
                                    {rule.valid ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-700 ml-1" />}
                                    {rule.text}
                                </div>
                            ))}
                        </div>
                    )}

                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 group"
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                            <>
                                {isSignUp ? 'Finalizar Cadastro Premium' : 'Entrar na Plataforma'}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
                        className="text-slate-400 hover:text-amber-500 text-sm transition-colors"
                        type="button"
                    >
                        {isSignUp ? 'Já tem uma conta? Faça login' : 'Não tem conta? Cadastre-se agora'}
                    </button>
                </div>
            </div>
        </div>
    );
}
