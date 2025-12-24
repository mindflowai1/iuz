'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function WhatsAppPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        // Show notification bubble after 3 seconds
        const timer = setTimeout(() => {
            setShowNotification(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999';
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre o CRM IUZ.');

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4 pointer-events-none">

            {/* Notification Bubble */}
            <AnimatePresence>
                {showNotification && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                        className="pointer-events-auto bg-white text-slate-900 px-4 py-3 rounded-2xl rounded-tr-sm shadow-xl shadow-black/20 max-w-[250px] relative"
                    >
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowNotification(false); }}
                            className="absolute -top-2 -left-2 bg-slate-200 text-slate-600 rounded-full p-0.5 hover:bg-slate-300 transition-colors"
                        >
                            <X size={12} />
                        </button>
                        <p className="text-sm font-medium leading-relaxed">
                            👋 Olá! Posso te mostrar como o IUZ revoluciona seu escritório?
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Button */}
            <motion.a
                href={`https://wa.me/${whatsappNumber}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] rounded-full text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all hover:scale-110 active:scale-95"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => setShowNotification(true)}
            >
                {/* Ripple Effect */}
                <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:animate-ping" />

                <MessageCircle className="w-7 h-7 fill-current" />

                {/* Status Dot */}
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-[#020408] rounded-full">
                    <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                </span>
            </motion.a>
        </div>
    );
}
