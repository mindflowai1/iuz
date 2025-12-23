'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedGradientProps {
    children?: ReactNode;
    className?: string;
    colors?: string[];
}

export function AnimatedGradient({
    children,
    className = '',
    colors = ['#020617', '#1e3a8a', '#0f172a', '#172554'],
}: AnimatedGradientProps) {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: [
                        `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
                        `linear-gradient(225deg, ${colors[1]} 0%, ${colors[2]} 50%, ${colors[3]} 100%)`,
                        `linear-gradient(315deg, ${colors[2]} 0%, ${colors[3]} 50%, ${colors[0]} 100%)`,
                        `linear-gradient(45deg, ${colors[3]} 0%, ${colors[0]} 50%, ${colors[1]} 100%)`,
                        `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
                    ],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
            {children}
        </div>
    );
}
