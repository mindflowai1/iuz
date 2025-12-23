import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronsUpDown, User, Search } from 'lucide-react';

interface SearchSelectProps {
    label: string;
    placeholder: string;
    value: string; // The ID of the selected item
    displayValue?: string; // The text to display initially (if value is set)
    onSelect: (item: any) => void;
    fetchOptions: (query: string) => Promise<any[]>;
    onCreateNew?: (name: string) => void;
    icon?: React.ElementType;
}

export function SearchSelect({ label, placeholder, value, displayValue, onSelect, fetchOptions, onCreateNew, icon: Icon }: SearchSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedText, setSelectedText] = useState(displayValue || '');
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Initial load
    useEffect(() => {
        if (isOpen) {
            handleSearch('');
        }
    }, [isOpen]);

    // Update display text when prop changes
    useEffect(() => {
        if (displayValue) setSelectedText(displayValue);
    }, [displayValue]);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleSearch = async (query: string) => {
        setLoading(true);
        try {
            const results = await fetchOptions(query);
            setOptions(results);
        } catch (error) {
            console.error('Error fetching options:', error);
            setOptions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (item: any) => {
        onSelect(item);
        setSelectedText(item.name || item.title);
        setIsOpen(false);
        setSearchTerm('');
    };

    return (
        <div className="space-y-1 relative" ref={wrapperRef}>
            <label className="text-xs font-medium text-slate-400">{label}</label>
            <div
                className="relative cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {Icon && <Icon className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5" />}
                <div className={`
                    w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-8 pr-8 text-sm text-white 
                    focus:ring-1 focus:ring-amber-500 outline-none flex items-center min-h-[38px]
                    ${isOpen ? 'ring-1 ring-amber-500 border-amber-500' : ''}
                `}>
                    {selectedText || <span className="text-slate-500">{placeholder}</span>}
                </div>
                <ChevronsUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5" />
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    <div className="p-2 border-b border-slate-800">
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500 w-3 h-3" />
                            <input
                                autoFocus
                                type="text"
                                className="w-full bg-slate-800 rounded px-2 py-1 pl-7 text-xs text-white focus:outline-none placeholder:text-slate-600"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    handleSearch(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="max-h-48 overflow-y-auto custom-scrollbar p-1">
                        {loading ? (
                            <div className="p-2 text-center text-xs text-slate-500">Carregando...</div>
                        ) : options.length > 0 ? (
                            options.map((option) => (
                                <div
                                    key={option.id}
                                    onClick={() => handleSelect(option)}
                                    className={`
                                        flex items-center justify-between px-2 py-1.5 rounded cursor-pointer text-sm
                                        ${value === option.id ? 'bg-amber-500/10 text-amber-500' : 'text-slate-300 hover:bg-slate-800'}
                                    `}
                                >
                                    <span>{option.name || option.title}</span>
                                    {value === option.id && <Check size={12} />}
                                </div>
                            ))
                        ) : (
                            <div className="p-2 text-center">
                                <p className="text-xs text-slate-500 mb-2">Nenhum resultado.</p>
                                {onCreateNew && searchTerm && (
                                    <button
                                        onClick={() => {
                                            onCreateNew(searchTerm);
                                            setIsOpen(false);
                                        }}
                                        className="text-xs text-amber-500 hover:text-amber-400 font-medium"
                                    >
                                        + Cadastrar "{searchTerm}"
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
