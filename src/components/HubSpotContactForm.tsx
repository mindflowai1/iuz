'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { submitToHubSpot } from '@/lib/hubspot';
import { Loader2, CheckCircle2, Send } from 'lucide-react';

interface FormData {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    area_do_direito: string;
    message: string;
}

export function HubSpotContactForm() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        try {
            // Replace with your actual HubSpot Portal ID and Form ID
            const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || 'YOUR_PORTAL_ID';
            const formId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID || 'YOUR_FORM_ID';

            const success = await submitToHubSpot(portalId, formId, data as unknown as Record<string, string>);

            if (success) {
                setIsSuccess(true);

                // Optional: Redirect to WhatsApp after 2 seconds
                setTimeout(() => {
                    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999';
                    const message = encodeURIComponent(
                        `Olá! Acabei de enviar uma consulta pelo site sobre ${data.area_do_direito}. Meu nome é ${data.firstname} ${data.lastname}.`
                    );
                    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
                }, 2000);
            }
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto"
        >
            <AnimatePresence mode="wait">
                {!isSuccess ? (
                    <motion.form
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-white mb-2">
                                Fale Conosco Agora
                            </h3>
                            <p className="text-blue-100">
                                Resposta em até 24 horas via WhatsApp
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    {...register('firstname', { required: 'Nome é obrigatório' })}
                                    placeholder="Nome *"
                                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                                />
                                {errors.firstname && (
                                    <p className="text-red-300 text-sm mt-1">
                                        {errors.firstname.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <input
                                    {...register('lastname', { required: 'Sobrenome é obrigatório' })}
                                    placeholder="Sobrenome *"
                                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                                />
                                {errors.lastname && (
                                    <p className="text-red-300 text-sm mt-1">
                                        {errors.lastname.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <input
                                {...register('email', {
                                    required: 'E-mail é obrigatório',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'E-mail inválido',
                                    },
                                })}
                                type="email"
                                placeholder="E-mail *"
                                className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                            />
                            {errors.email && (
                                <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <input
                                {...register('phone', { required: 'WhatsApp é obrigatório' })}
                                placeholder="WhatsApp (com DDD) *"
                                className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                            />
                            {errors.phone && (
                                <p className="text-red-300 text-sm mt-1">{errors.phone.message}</p>
                            )}
                        </div>

                        <div>
                            <select
                                {...register('area_do_direito', {
                                    required: 'Selecione uma área',
                                })}
                                className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                            >
                                <option value="" className="bg-gray-800">
                                    Selecione a Área do Direito *
                                </option>
                                <option value="Familia" className="bg-gray-800">
                                    Direito de Família
                                </option>
                                <option value="Trabalhista" className="bg-gray-800">
                                    Direito Trabalhista
                                </option>
                                <option value="Previdenciário" className="bg-gray-800">
                                    Direito Previdenciário
                                </option>
                                <option value="Cível" className="bg-gray-800">
                                    Direito Cível
                                </option>
                                <option value="Criminal" className="bg-gray-800">
                                    Direito Criminal
                                </option>
                                <option value="Empresarial" className="bg-gray-800">
                                    Direito Empresarial
                                </option>
                            </select>
                            {errors.area_do_direito && (
                                <p className="text-red-300 text-sm mt-1">
                                    {errors.area_do_direito.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <textarea
                                {...register('message', {
                                    required: 'Descreva sua situação',
                                    minLength: {
                                        value: 20,
                                        message: 'Por favor, forneça mais detalhes (mín. 20 caracteres)',
                                    },
                                })}
                                placeholder="Descreva brevemente sua situação... *"
                                rows={4}
                                className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none"
                            />
                            {errors.message && (
                                <p className="text-red-300 text-sm mt-1">
                                    {errors.message.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transform hover:scale-[1.02] transition-all shadow-lg shadow-amber-900/20 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Processando...
                                </>
                            ) : (
                                <>
                                    <span>Solicitar Análise de Caso</span>
                                    <Send className="w-5 h-5" />
                                </>
                            )}
                        </button>

                        <p className="text-center text-blue-200 text-sm">
                            Ao enviar, você concorda com nossa Política de Privacidade (LGPD)
                        </p>
                    </motion.form>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-12"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', duration: 0.6 }}
                        >
                            <CheckCircle2 className="h-24 w-24 text-green-400 mx-auto mb-6" />
                        </motion.div>
                        <h3 className="text-3xl font-bold text-white mb-4">
                            Mensagem Enviada com Sucesso!
                        </h3>
                        <p className="text-blue-100 mb-6 text-lg">
                            Nossa IA está analisando seu caso neste momento. Em breve, um
                            advogado especializado entrará em contato via WhatsApp.
                        </p>
                        <p className="text-white/80">
                            Você será redirecionado para o WhatsApp em instantes...
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
