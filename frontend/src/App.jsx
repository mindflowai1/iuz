import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Login from './pages/Login';
import KanbanBoard from './components/KanbanBoard';
import Dashboard from './components/Dashboard';
import { LayoutDashboard, KanbanSquare, Settings, LogOut, User } from 'lucide-react';

function App() {
    const [session, setSession] = useState(null);
    const [activeTab, setActiveTab] = useState('kanban');

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (!session) {
        return <Login onLogin={setSession} />;
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <div className="flex h-screen bg-slate-900 text-slate-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-950 border-r border-slate-800 p-4 flex flex-col">
                <h1 className="text-xl font-bold text-amber-500 mb-8 flex items-center gap-2">
                    <span className="p-1 bg-amber-500/10 rounded">⚖️</span> CRM Jurídico
                </h1>

                <nav className="space-y-2 flex-1">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded transition-colors ${activeTab === 'dashboard' ? 'bg-amber-500/10 text-amber-500' : 'hover:bg-slate-900 text-slate-400'}`}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('kanban')}
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded transition-colors ${activeTab === 'kanban' ? 'bg-amber-500/10 text-amber-500' : 'hover:bg-slate-900 text-slate-400'}`}
                    >
                        <KanbanSquare size={20} />
                        Negócios
                    </button>
                    <button className="w-full flex items-center gap-2 px-4 py-2 rounded transition-colors hover:bg-slate-900 text-slate-400">
                        <Settings size={20} />
                        Configurações
                    </button>
                </nav>

                <div className="pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-2 px-4 py-2 mb-2 text-xs text-slate-500">
                        <User size={14} />
                        <span className="truncate">{session.user.email}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 rounded transition-colors hover:bg-red-500/10 text-slate-400 hover:text-red-500"
                    >
                        <LogOut size={20} />
                        Sair
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-8">
                {activeTab === 'kanban' ? <KanbanBoard /> : <Dashboard />}
            </main>
        </div>
    );
}

export default App;
