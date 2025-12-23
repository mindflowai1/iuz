'use client';

import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AreasAtuacaoSection } from '@/components/sections/AreasAtuacaoSection';
import { DiferenciaisSection } from '@/components/sections/DiferenciaisSection';
import { IuzSection } from '@/components/sections/IuzSection';
import { ComoFuncionaSection } from '@/components/sections/ComoFuncionaSection';
import { ContatoSection } from '@/components/sections/ContatoSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AreasAtuacaoSection />
      <DiferenciaisSection />
      <IuzSection />
      <ComoFuncionaSection />
      <ContatoSection />
      <Footer />
    </main>
  );
}
