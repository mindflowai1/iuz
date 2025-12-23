'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface FloatingParticlesProps {
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
}

export function FloatingParticles({
    count = 20,
    className = '',
}: FloatingParticlesProps) {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        // Generate particles only on client side to avoid hydration mismatch
        const generatedParticles: Particle[] = [];
        for (let i = 0; i < count; i++) {
            generatedParticles.push({
                id: i,
                left: Math.random() * 100,
                top: Math.random() * 100,
                xOffset: Math.random() * 100 - 50,
                duration: 10 + Math.random() * 10,
                delay: Math.random() * 5,
            });
        }
        setParticles(generatedParticles);
    }, [count]);

    if (particles.length === 0) {
        return null; // Don't render anything on server
    }

    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute h-2 w-2 rounded-full bg-white/20"
                    animate={{
                        y: [0, -100, 0],
                        x: [0, particle.xOffset, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                    }}
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                    }}
                />
            ))}
        </div>
    );
}
