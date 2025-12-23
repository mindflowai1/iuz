'use client';

import { BentoGrid, BentoCard } from '@/components/magicui/bento-grid';
import {
    Users,
    Briefcase,
    Building2,
    Heart,
    ShieldCheck,
    Scale,
} from 'lucide-react';

const areas = [
    {
        title: 'Direito de Família',
        description: 'Soluções discretas e ágeis para divórcios, guarda, pensão e partilha de bens. Protegemos seu patrimônio e legado.',
        icon: <Heart className="w-8 h-8" />,
    },
    {
        title: 'Direito Trabalhista',
        description: 'Defesa incisiva em casos de rescisões, assédio e direitos não pagos. Recuperamos o que é seu por direito.',
        icon: <Briefcase className="w-8 h-8" />,
    },
    {
        title: 'Direito Previdenciário',
        description: 'Planejamento e revisões de aposentadoria com cálculos precisos para garantir o melhor benefício possível.',
        icon: <ShieldCheck className="w-8 h-8" />,
    },
    {
        title: 'Direito Cível',
        description: 'Resolução de conflitos contratuais, indenizações e defesa do consumidor com estratégia processual superior.',
        icon: <Scale className="w-8 h-8" />,
    },
    {
        title: 'Direito Criminal',
        description: 'Atuação 24h em flagrantes, habeas corpus e defesa técnica especializada. Sigilo absoluto e combate combativo.',
        icon: <Users className="w-8 h-8" />,
    },
    {
        title: 'Direito Empresarial',
        description: 'Blindagem jurídica para sua empresa, contratos seguros e compliance para focar no crescimento do negócio.',
        icon: <Building2 className="w-8 h-8" />,
    },
];

import { GridPattern } from '@/components/magicui/grid-pattern';

export function AreasAtuacaoSection() {
    return (
        <section id="areas" className="py-24 px-6 bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

            <GridPattern
                width={50}
                height={50}
                x={-1}
                y={-1}
                className="opacity-[0.03] [mask-image:linear-gradient(to_bottom,white,transparent)]"
            />

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4 tracking-tight">
                        Áreas de Atuação
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
                        Cobertura completa em todas as áreas do direito com especialistas dedicados
                    </p>
                </div>

                <BentoGrid>
                    {areas.map((area, index) => (
                        <BentoCard
                            key={index}
                            title={area.title}
                            description={area.description}
                            icon={<div className="text-amber-500">{area.icon}</div>}
                            delay={index * 0.1}
                            className="bg-slate-900/50 border-slate-800 hover:border-amber-500/30"
                        />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}
