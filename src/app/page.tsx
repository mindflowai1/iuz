'use client';

import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AreasAtuacaoSection } from '@/components/sections/AreasAtuacaoSection';
import { DiferenciaisSection } from '@/components/sections/DiferenciaisSection';
import { IuzSection } from '@/components/sections/IuzSection';
import { ComoFuncionaSection } from '@/components/sections/ComoFuncionaSection';
import { Footer } from '@/components/Footer';
import { WhatsAppPopup } from '@/components/WhatsAppPopup';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020408]">
      <Navbar />
      <IuzSection />
      <AreasAtuacaoSection />
      <DiferenciaisSection />
      <ComoFuncionaSection />
      <HeroSection />
      <Footer />
      <WhatsAppPopup />
    </main>
  );
}
