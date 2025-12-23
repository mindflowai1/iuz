'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div
            className={cn(
                'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
                className
            )}
        >
            {children}
        </div>
    );
}

interface BentoCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    className?: string;
    delay?: number;
}

export function BentoCard({
    title,
    description,
    icon,
    className,
    delay = 0,
}: BentoCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={cn(
                'group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-lg transition-all hover:border-amber-500/30 hover:shadow-2xl',
                className
            )}
        >
            <div className="relative z-10">
                <div className="mb-4 inline-flex rounded-xl bg-amber-500/10 p-3 text-amber-500 shadow-md ring-1 ring-amber-500/20">
                    {icon}
                </div>
                <h3 className="mb-3 text-2xl font-bold text-slate-50">{title}</h3>
                <p className="text-slate-400 font-light">{description}</p>
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-amber-500/5 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-blue-900/10 blur-3xl" />
            </div>
        </motion.div>
    );
}
