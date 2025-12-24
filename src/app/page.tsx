'use client';

import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AreasAtuacaoSection } from '@/components/sections/AreasAtuacaoSection';
import { DiferenciaisSection } from '@/components/sections/DiferenciaisSection';
import { IuzSection } from '@/components/sections/IuzSection';
import { ComoFuncionaSection } from '@/components/sections/ComoFuncionaSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020408]">
      <Navbar />
      <HeroSection />
      <AreasAtuacaoSection />
      <DiferenciaisSection />
      <ComoFuncionaSection />
      <IuzSection />
      <Footer />
    </main>
  );
}
