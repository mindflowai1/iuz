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
        console.log("CRMContext: Starting fetch from Supabase...");
        try {
            // Fetch diretamente do Supabase (sem backend Python)
            const [dealsRes, contactsRes, lawyersRes] = await Promise.all([
                supabase
                    .from('deals')
                    .select('*, contact:contacts(id, name, email), owner:lawyers(id, name, email)')
                    .order('created_at', { ascending: false }),
                supabase
                    .from('contacts')
                    .select('*')
                    .order('created_at', { ascending: false }),
                supabase
                    .from('lawyers')
                    .select('*')
                    .order('created_at', { ascending: false })
            ]);

            console.log("CRMContext: Supabase responses", {
                dealsError: dealsRes.error,
                contactsError: contactsRes.error,
                lawyersError: lawyersRes.error
            });

            // Process deals to add contact_name and owner_name
            const dealsData = (dealsRes.data || []).map((deal: any) => ({
                ...deal,
                contact_name: deal.contact?.name || '---',
                owner_name: deal.owner?.name || '---',
            }));

            console.log("CRMContext: Data loaded", {
                dealsCount: dealsData.length,
                contactsCount: contactsRes.data?.length || 0,
                lawyersCount: lawyersRes.data?.length || 0
            });

            setDeals(dealsData);
            setContacts(contactsRes.data || []);
            setLawyers(lawyersRes.data || []);
        } catch (err: any) {
            console.error("CRM Data Fetch Critical Error:", err);
            setError("Falha ao carregar dados. Verifique a conexão com o Supabase.");
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
            const { error } = await supabase.from('deals').insert([deal]);
            if (!error) {
                await fetchData();
                return true;
            }
            console.error('Add deal error:', error);
            return false;
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    const updateDeal = async (deal: any) => {
        const oldDeals = [...deals];
        setDeals(prev => prev.map(d => d.id === deal.id ? { ...d, ...deal } : d));

        try {
            // Remove nested objects before update
            const { contact, owner, contact_name, owner_name, id, ...cleanDeal } = deal;
            const { error } = await supabase
                .from('deals')
                .update(cleanDeal)
                .eq('id', deal.id);

            if (error) {
                console.error('Update deal error:', error);
                setDeals(oldDeals);
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
            const { error } = await supabase
                .from('deals')
                .delete()
                .eq('id', id);

            if (error) {
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
            const { error } = await supabase.from('contacts').insert([contact]);
            if (!error) {
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
            const { id, ...data } = contact;
            const { error } = await supabase
                .from('contacts')
                .update(data)
                .eq('id', id);

            if (error) {
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
            const { error } = await supabase
                .from('contacts')
                .delete()
                .eq('id', id);

            if (error) {
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
            const { error } = await supabase.from('lawyers').insert([lawyer]);
            if (!error) {
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
            const { id, ...data } = lawyer;
            const { error } = await supabase
                .from('lawyers')
                .update(data)
                .eq('id', id);

            if (error) {
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
            const { error } = await supabase
                .from('lawyers')
                .delete()
                .eq('id', id);

            if (error) {
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
