'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export function WhatsAppPopup() {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999';
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre o CRM IUZ.');

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4 pointer-events-none">
            {/* Main Button */}
            <motion.a
                href={`https://wa.me/${whatsappNumber}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] rounded-full text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all hover:scale-110 active:scale-95"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
