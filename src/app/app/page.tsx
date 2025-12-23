"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import KanbanBoard from '@/components/crm/KanbanBoard';
import Dashboard from '@/components/crm/Dashboard';
import ContactsView from '@/components/crm/ContactsView';
import LawyersView from '@/components/crm/LawyersView';
import SettingsView from '@/components/crm/SettingsView';
import { Sidebar } from '@/components/crm/Sidebar';
import Header from '@/components/layout/Header';
import { CRMProvider } from '@/contexts/CRMContext'; // Import Provider

function CRMAppContent() { // Renamed original component
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('kanban');
    const [highlightedDealId, setHighlightedDealId] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    const handleNavigateToDeal = (dealId: string) => {
        setHighlightedDealId(dealId);
        setActiveTab('kanban');
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
            if (!session) {
                router.push('/login');
            }
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (!session) {
                router.push('/login');
            }
        });

        return () => subscription.unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-white">
                <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!session) {
        return null;
    }

    return (
        <div className="flex h-screen bg-[#0B1121] text-slate-100 overflow-hidden font-sans selection:bg-amber-500/30">

            {/* Premium Sidebar (Responsive) */}
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                userEmail={session.user.email}
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">

                {/* Top Header */}
                <Header
                    activeTab={activeTab}
                    onMenuClick={() => setMobileMenuOpen(true)}
                    userEmail={session?.user?.email}
                    onLogout={handleLogout}
                    onNavigate={setActiveTab}
                />

                {/* Content Scrollable Area */}
                <div className="flex-1 overflow-auto p-2 lg:p-3 relative">
                    {/* Background Texture */}
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                    />

                    <div className="relative z-10 max-w-screen-2xl mx-auto h-full">
                        {activeTab === 'dashboard' && <Dashboard />}
                        {activeTab === 'kanban' && <KanbanBoard highlightedDealId={highlightedDealId} onClearHighlight={() => setHighlightedDealId(null)} />}
                        {activeTab === 'contacts' && <ContactsView onNavigateToDeal={handleNavigateToDeal} />}
                        {activeTab === 'lawyers' && <LawyersView onNavigateToDeal={handleNavigateToDeal} />}
                        {activeTab === 'settings' && <SettingsView />}
                    </div>
                </div>
            </main>
        </div>
    );
}

// Default Export wrapping the content
export default function CRMApp() {
    return (
        <CRMProvider>
            <CRMAppContent />
        </CRMProvider>
    );
}

// Fallback placeholder logic if needed, kept for reference but unused in main flow
function SettingsPlaceholder() {
    return (
        <svg
            className="w-24 h-24 stroke-slate-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    )
}
