"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { endpoints } from '@/lib/api_config';
import { supabase } from '@/lib/supabase';

// Types (simplified for Context, expandable)
export interface Deal {
    id: string | number;
    title: string;
    stage: string;
    value: number;
    contact_name?: string;
    contact_id?: number;
    owner_name?: string;
    owner_id?: number;
    [key: string]: any;
}

export interface Contact {
    id: string | number;
    name: string;
    email: string;
    phone: string;
    [key: string]: any;
}

export interface Lawyer {
    id: string | number;
    name: string;
    email: string;
    phone?: string;
    oab?: string;
    state?: string;
    specialty?: string;
    [key: string]: any;
}

export interface CRMContextType {
    deals: Deal[];
    contacts: Contact[];
    lawyers: Lawyer[];
    loading: boolean;
    error: string | null;
    refreshData: () => Promise<void>;
    addDeal: (deal: any) => Promise<boolean>;
    updateDeal: (deal: any) => Promise<boolean>;
    deleteDeal: (id: string | number) => Promise<boolean>;
    addContact: (contact: any) => Promise<boolean>;
    updateContact: (contact: any) => Promise<boolean>;
    deleteContact: (id: string | number) => Promise<boolean>;
    addLawyer: (lawyer: any) => Promise<boolean>;
    updateLawyer: (lawyer: any) => Promise<boolean>;
    deleteLawyer: (id: string | number) => Promise<boolean>;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export function CRMProvider({ children }: { children: ReactNode }) {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [lawyers, setLawyers] = useState<Lawyer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        console.log("CRMContext: Starting fetch...");
        try {
            const [dealsRes, contactsRes, lawyersRes] = await Promise.all([
                fetch(`${endpoints.deals}/`).catch(e => {
                    console.error("Fetch Deals Error:", e);
                    return { ok: false, status: 500, json: async () => [] };
                }),
                fetch(`${endpoints.contacts}/`).catch(e => {
                    console.error("Fetch Contacts Error:", e);
                    return { ok: false, status: 500, json: async () => [] };
                }),
                // Optimistically attempt to fetch lawyers if endpoint exists
                fetch(`${endpoints.lawyers}/`).catch(e => {
                    console.error("Fetch Lawyers Error:", e);
                    return { ok: false, status: 500, json: async () => [] };
                })
            ]);

            console.log("CRMContext: Responses received", {
                dealsStatus: dealsRes.status,
                contactsStatus: contactsRes.status
            });

            // Safe JSON parsing with explicit casting/checking if needed, 
            // but the mock object above now has .json() to satisfy basic usage or we check .ok
            const newDeals = dealsRes.ok ? await dealsRes.json() : [];
            const newContacts = contactsRes.ok ? await contactsRes.json() : [];
            const newLawyers = lawyersRes.ok ? await lawyersRes.json() : [];

            console.log("CRMContext: Data parsed", {
                dealsCount: newDeals.length,
                contactsCount: newContacts.length,
                lawyersCount: newLawyers.length
            });

            setDeals(newDeals);
            setContacts(newContacts);
            setLawyers(newLawyers);
        } catch (err: any) {
            console.error("CRM Data Fetch Critical Error:", err);
            setError("Falha ao carregar dados. Verifique a conexão.");
        } finally {
            console.log("CRMContext: Finished loading");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        // Realtime Subscription (Optional / Future Proofing)
        // const channel = supabase.channel('crm_updates').subscribe();
        // return () => { supabase.removeChannel(channel) }
    }, []);

    // --- Deals Actions ---
    const addDeal = async (deal: any) => {
        try {
            const res = await fetch(`${endpoints.deals}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(deal)
            });
            if (res.ok) {
                await fetchData(); // Simple refresh for consistency
                return true;
            }
            return false;
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    const updateDeal = async (deal: any) => {
        // Optimistic Update
        const oldDeals = [...deals];
        setDeals(prev => prev.map(d => d.id === deal.id ? { ...d, ...deal } : d));

        try {
            const res = await fetch(`${endpoints.deals}/${deal.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(deal)
            });
            if (!res.ok) {
                setDeals(oldDeals); // Revert
                return false;
            }
            return true;
        } catch (e) {
            setDeals(oldDeals);
            return false;
        }
    };

    const deleteDeal = async (id: string | number) => {
        const oldDeals = [...deals];
        setDeals(prev => prev.filter(d => d.id !== id));

        try {
            const res = await fetch(`${endpoints.deals}/${id}`, { method: 'DELETE' });
            if (!res.ok) {
                setDeals(oldDeals);
                return false;
            }
            return true;
        } catch (e) {
            setDeals(oldDeals);
            return false;
        }
    };

    // --- Contacts Actions ---
    const addContact = async (contact: any) => {
        try {
            const res = await fetch(`${endpoints.contacts}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contact)
            });
            if (res.ok) {
                await fetchData();
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    };

    const updateContact = async (contact: any) => {
        const oldContacts = [...contacts];
        setContacts(prev => prev.map(c => c.id === contact.id ? contact : c));
        try {
            const res = await fetch(`${endpoints.contacts}/${contact.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contact)
            });
            if (!res.ok) {
                setContacts(oldContacts);
                return false;
            }
            return true;
        } catch (e) {
            setContacts(oldContacts);
            return false;
        }
    };

    const deleteContact = async (id: string | number) => {
        const oldContacts = [...contacts];
        setContacts(prev => prev.filter(c => c.id !== id));
        try {
            const res = await fetch(`${endpoints.contacts}/${id}`, { method: 'DELETE' });
            if (!res.ok) {
                setContacts(oldContacts);
                return false;
            }
            return true;
        } catch (e) {
            setContacts(oldContacts);
            return false;
        }
    };

    // --- Lawyers Actions ---
    const addLawyer = async (lawyer: any) => {
        try {
            const res = await fetch(`${endpoints.lawyers}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(lawyer)
            });
            if (res.ok) {
                await fetchData();
                return true;
            }
            return false;
        } catch (e) {
            console.error("Add Lawyer Error:", e);
            return false;
        }
    };

    const updateLawyer = async (lawyer: any) => {
        const oldLawyers = [...lawyers];
        setLawyers(prev => prev.map(l => l.id === lawyer.id ? lawyer : l));
        try {
            const res = await fetch(`${endpoints.lawyers}/${lawyer.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(lawyer)
            });
            if (!res.ok) {
                setLawyers(oldLawyers);
                return false;
            }
            return true;
        } catch (e) {
            setLawyers(oldLawyers);
            return false;
        }
    };

    const deleteLawyer = async (id: string | number) => {
        const oldLawyers = [...lawyers];
        setLawyers(prev => prev.filter(l => l.id !== id));
        try {
            const res = await fetch(`${endpoints.lawyers}/${id}`, { method: 'DELETE' });
            if (!res.ok) {
                setLawyers(oldLawyers);
                return false;
            }
            return true;
        } catch (e) {
            setLawyers(oldLawyers);
            return false;
        }
    };


    return (
        <CRMContext.Provider value={{
            deals,
            contacts,
            lawyers,
            loading,
            error,
            refreshData: fetchData,
            addDeal,
            updateDeal,
            deleteDeal,
            addContact,
            updateContact,
            deleteContact,
            addLawyer,
            updateLawyer,
            deleteLawyer
        }}>
            {children}
        </CRMContext.Provider>
    );
}

export function useCRM() {
    const context = useContext(CRMContext);
    if (context === undefined) {
        throw new Error('useCRM must be used within a CRMProvider');
    }
    return context;
}
