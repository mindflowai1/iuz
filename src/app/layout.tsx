import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'CRM Jurídico MVP | Advocacia com Inteligência Artificial 24/7',
  description:
    'Escritório de advocacia com atendimento 24/7 via IA. Análise automatizada de documentos, reuniões transcritas e acompanhamento em tempo real. Direito Família, Trabalhista, Previdenciário e mais.',
  keywords: [
    'advocacia',
    'advogado',
    'inteligência artificial',
    'IA jurídica',
    'direito de família',
    'direito trabalhista',
    'direito previdenciário',
    'atendimento 24/7',
  ],
  authors: [{ name: 'CRM Jurídico MVP' }],
  openGraph: {
    title: 'CRM Jurídico MVP | Advocacia com IA 24/7',
    description:
      'Advocacia moderna com tecnologia de ponta. Resposta imediata via IA.',
    type: 'website',
    locale: 'pt_BR',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
