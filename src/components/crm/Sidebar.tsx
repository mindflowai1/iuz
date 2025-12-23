"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
    LayoutDashboard,
    KanbanSquare,
    Users,
    Settings,
    LogOut,
    Search,
    FileText,
    PieChart,
    X,
    Scale,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    userEmail: string;
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ activeTab, setActiveTab, userEmail, isOpen, onClose }: SidebarProps) {
    const router = useRouter();
    // Default to false (Desktop view) to prevent sidebar from disappearing on heavy loads/SSR
    // This might cause a quick flash on mobile, but ensures functionality on desktop.
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        // Check immediately
        checkMobile();

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        // Redirect to Landing Page after 3 seconds
        setTimeout(() => {
            router.push('/');
        }, 3000);
    };

    // Auto-close mobile menu when route changes (optional, but good UX)
    // Here we just use the tab selection to close.

    const menuItems = [
        {
            category: "Principal",
            items: [
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'kanban', label: 'Negócios', icon: KanbanSquare },
            ]
        },
        {
            category: "Gestão",
            items: [
                { id: 'contacts', label: 'Clientes', icon: Users },
                { id: 'lawyers', label: 'Advogados', icon: Scale }, // Changed icon to Scale
                { id: 'documents', label: 'Documentos', icon: FileText },
                { id: 'reports', label: 'Relatórios', icon: PieChart },
            ]
        },
        {
            category: "Sistema",
            items: [
                { id: 'settings', label: 'Configurações', icon: Settings },
            ]
        }
    ];

    const sidebarVariants: Variants = {
        mobileClosed: {
            x: "-100%",
            transition: { type: "spring", stiffness: 400, damping: 40 }
        },
        mobileOpen: {
            x: "0%",
            transition: { type: "spring", stiffness: 400, damping: 40 }
        },
        desktop: {
            x: "0%",
            transition: { type: "tween", duration: 0 }
        }
    };

    // Determine current variant based on state
    // If not mobile, always desktop.
    // If mobile, check isOpen.
    const currentVariant = !isMobile ? "desktop" : (isOpen ? "mobileOpen" : "mobileClosed");

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobile && isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                variants={sidebarVariants}
                initial={false} // Prevent initial animation, let 'animate' take over immediately
                animate={currentVariant}
                className={`
                    fixed lg:static top-0 left-0 h-screen w-72 
                    bg-slate-950 border-r border-slate-800 
                    z-50 shadow-2xl flex flex-col shrink-0
                `}
            >
                {/* Header / Logo */}
                <div className="p-6 flex items-center justify-between border-b border-slate-800">
                    <div
                        onClick={() => router.push('/')}
                        className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <div className="p-2 bg-amber-500 rounded-lg shrink-0 shadow-lg shadow-amber-500/20">
                            <div className="w-5 h-5 border-2 border-slate-900 rounded-sm" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">
                            IUZ <span className="text-amber-500">CRM</span>
                        </span>
                    </div>

                    {/* Mobile Close Button */}
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Search */}
                <div className="px-6 py-6">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-amber-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                        />
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-2 px-4 space-y-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    {menuItems.map((group, idx) => (
                        <div key={idx}>
                            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
                                {group.category}
                            </h3>
                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    // Handle both old and new id for settings/config
                                    // The Sidebar previously linked to 'settings', Header links to 'settings'.
                                    const isActive = activeTab === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                setActiveTab(item.id);
                                                if (isMobile) onClose();
                                            }}
                                            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative
                                            ${isActive
                                                    ? 'bg-gradient-to-r from-amber-500/10 to-transparent text-amber-500 border-l-2 border-amber-500'
                                                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                                                }`}
                                        >
                                            <item.icon size={20} className={`shrink-0 ${isActive ? 'text-amber-500' : 'group-hover:text-amber-500/80 transition-colors'}`} />
                                            <span className="font-medium truncate">{item.label}</span>

                                            {isActive && (
                                                <motion.div layoutId="activeDot" className="w-1.5 h-1.5 rounded-full bg-amber-500 ml-auto" />
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* User Footer */}
                <div className="p-4 border-t border-slate-800 bg-slate-950/50">
                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-900 transition-colors cursor-pointer group">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 p-[1px] shrink-0">
                            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-amber-500 font-bold text-sm">
                                {userEmail?.substring(0, 2).toUpperCase()}
                            </div>
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-white truncate group-hover:text-amber-500 transition-colors">
                                {userEmail?.split('@')[0]}
                            </p>
                            <p className="text-xs text-slate-500 truncate">Advogado Sênior</p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="p-2 text-slate-500 hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </motion.aside>
        </>
    );
}
