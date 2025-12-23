import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, ChevronRight, Menu, User, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
    activeTab: string;
    onMenuClick: () => void;
    userEmail: string;
    onLogout: () => void;
    onNavigate: (tab: string) => void;
}

export default function Header({ activeTab, onMenuClick, userEmail, onLogout, onNavigate }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Get initials for avatar
    const initial = userEmail ? userEmail[0].toUpperCase() : 'U';

    // Translating tab names for display
    const getTabLabel = (tab: string) => {
        const labels: Record<string, string> = {
            'dashboard': 'Dashboard',
            'kanban': 'Negócios',
            'contacts': 'Clientes',
            'lawyers': 'Advogados',
            'documents': 'Documentos',
            'reports': 'Relatórios',
            'settings': 'Configurações'
        };
        return labels[tab] || tab;
    };

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="h-20 px-6 lg:px-10 flex items-center justify-between border-b border-white/5 bg-slate-950/80 backdrop-blur-md z-40 sticky top-0 transition-all duration-300">
            {/* Left Section: Breadcrumbs */}
            <div className="flex items-center gap-6">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
                >
                    <Menu size={24} />
                </button>

                <div className="flex items-center gap-3 text-sm">
                    <span className="text-slate-500 font-medium tracking-wide">IUZ CRM</span>
                    <ChevronRight size={14} className="text-slate-700" />
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-amber-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-white/5 text-amber-500 font-semibold capitalize tracking-wide shadow-sm shadow-black/50">
                            {activeTab === 'kanban' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />}
                            {getTabLabel(activeTab)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Section: Actions & Profile */}
            <div className="flex items-center gap-6">

                {/* Search Bar (Visual Only) */}
                <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 focus-within:border-slate-700 focus-within:ring-1 focus-within:ring-slate-700 transition-all w-64 group">
                    <Search size={16} className="text-slate-500 group-focus-within:text-slate-300 transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="bg-transparent border-none text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none w-full"
                    />
                </div>

                <div className="h-8 w-px bg-white/5 hidden md:block" />

                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all group">
                        <Bell size={20} />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950 group-hover:scale-110 transition-transform shadow-lg shadow-red-500/20" />
                    </button>

                    <div className="relative" ref={menuRef}>
                        <div
                            className="flex items-center gap-3 pl-2 cursor-pointer"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-medium text-slate-200 leading-none">{userEmail?.split('@')[0]}</p>
                                <p className="text-xs text-slate-500 mt-1">Admin</p>
                            </div>
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border ${isMenuOpen ? 'border-amber-500' : 'border-white/10'} flex items-center justify-center text-amber-500 font-bold shadow-lg shadow-black/50 hover:border-amber-500/30 transition-all`}>
                                {initial}
                            </div>
                        </div>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 overflow-hidden"
                                >
                                    <div className="px-4 py-3 border-b border-slate-800 mb-1">
                                        <p className="text-sm text-white font-medium truncate">{userEmail}</p>
                                        <p className="text-xs text-slate-500">Administrador</p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            onNavigate('settings');
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-amber-500 flex items-center gap-2 transition-colors"
                                    >
                                        <Settings size={16} />
                                        Configurações
                                    </button>

                                    <div className="h-px bg-slate-800 my-1" />

                                    <button
                                        onClick={() => {
                                            onLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                                    >
                                        <LogOut size={16} />
                                        Sair
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    );
}
