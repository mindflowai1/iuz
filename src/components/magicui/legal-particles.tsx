'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Scale, Gavel, Scroll, Building2, FileText, Shield } from 'lucide-react';

interface LegalParticlesProps {
    count?: number;
    className?: string;
}

interface Particle {
    id: number;
    left: number;
    top: number;
    xOffset: number;
    duration: number;
    delay: number;
    iconIndex: number;
    size: number;
}

const icons = [Scale, Gavel, Scroll, Building2, FileText, Shield];

export function LegalParticles({
    count = 15,
    className = '',
}: LegalParticlesProps) {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const generatedParticles: Particle[] = [];
        for (let i = 0; i < count; i++) {
            generatedParticles.push({
                id: i,
                left: Math.random() * 100,
                top: Math.random() * 100,
                xOffset: Math.random() * 60 - 30, // Reduced spread
                duration: 15 + Math.random() * 20, // Slower movement
                delay: Math.random() * 5,
                iconIndex: Math.floor(Math.random() * icons.length),
                size: 24 + Math.random() * 24, // Varying sizes
            });
        }
        setParticles(generatedParticles);
    }, [count]);

    if (particles.length === 0) {
        return null;
    }

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {particles.map((particle) => {
                const Icon = icons[particle.iconIndex];
                return (
                    <motion.div
                        key={particle.id}
                        className="absolute text-white/5 opacity-5"
                        animate={{
                            y: [0, -150, 0],
                            x: [0, particle.xOffset, 0],
                            rotate: [0, 45, -45, 0],
                            opacity: [0, 0.08, 0],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "easeInOut"
                        }}
                        style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                        }}
                    >
                        <Icon width={particle.size} height={particle.size} />
                    </motion.div>
                );
            })}
        </div>
    );
}
