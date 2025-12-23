'use client';

import { Scale, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
    return (
        <footer className="relative bg-slate-950 text-white py-16 px-6 border-t border-slate-900">
            {/* Subtle Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

            <div className="container mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Logo and Description */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                                <Scale className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold text-white">CRM Jurídico</span>
                        </div>
                        <p className="text-slate-400 text-sm font-light leading-relaxed">
                            Transformando a advocacia com tecnologia avançada. Atendimento 24/7 e resultados comprovados.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Links Rápidos</h4>
                        <ul className="space-y-2">
                            {[
                                'Áreas de Atuação',
                                'Como Funciona',
                                'Sobre Nós',
                                'FAQ',
                            ].map((link) => (
                                <li key={link}>
                                    <a
                                        href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="text-slate-400 hover:text-amber-500 transition-colors text-sm"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contato</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-slate-400 text-sm">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
                                <span>Av. Paulista, 1000 - São Paulo, SP</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400 text-sm">
                                <Phone className="w-4 h-4 flex-shrink-0 text-amber-500" />
                                <span>(11) 99999-9999</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400 text-sm">
                                <Mail className="w-4 h-4 flex-shrink-0 text-amber-500" />
                                <span>contato@escritorio.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © 2025 CRM Jurídico MVP. Todos os direitos reservados.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors">
                            Política de Privacidade
                        </a>
                        <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors">
                            Termos de Uso
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
