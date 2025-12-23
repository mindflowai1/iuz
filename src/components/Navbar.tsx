"use client";

import Link from "next/link";
import { Scale, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    const navLinks = [
        { href: "#", label: "Início" },
        { href: "#como-funciona", label: "Como Funciona" },
        { href: "#areas", label: "Áreas de Atuação" },
        { href: "#diferenciais", label: "Diferenciais" },
        { href: "#contato", label: "Contato" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = navLinks.map(link => link.href.substring(1)).filter(id => id);
            let current = "";

            if (window.scrollY < 100) {
                current = "#";
            } else {
                for (const id of sections) {
                    const element = document.getElementById(id);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        if (rect.top <= 200 && rect.bottom >= 100) {
                            current = `#${id}`;
                            break;
                        }
                    }
                }
            }
            if (!current && window.scrollY < 100) current = "#";
            setActiveSection(current);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        if (href === "#") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        const element = document.querySelector(href);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isOpen ? "bg-transparent" : (scrolled
                ? "bg-slate-950/90 backdrop-blur-md border-b border-white/10 py-4"
                : "bg-transparent py-5")
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="#" onClick={(e) => handleNavClick(e, '#')} className="flex items-center gap-2 group z-50">
                    <div className="p-2 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                        <Scale className="w-6 h-6 text-amber-500" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">
                        IUZ <span className="text-amber-500">Advocacia</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                    {navLinks.filter(l => l.href !== "#").map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={`transition-colors relative ${activeSection === link.href ? "text-white font-bold" : "hover:text-white"}`}
                        >
                            {link.label}
                            {activeSection === link.href && (
                                <motion.div layoutId="activeSection" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500" />
                            )}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/login"
                        className="px-5 py-2.5 rounded-full text-sm font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10"
                    >
                        Entrar
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`md:hidden z-[10000] p-2 text-slate-300 hover:text-white transition-colors relative ${isOpen ? 'hidden' : ''}`}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu - CSS Puro, sem framer-motion */}
                <div
                    className={`fixed inset-0 z-[9999] md:hidden transition-opacity duration-200 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        }`}
                    style={{ backgroundColor: '#020617' }}
                >
                    {/* Gradientes decorativos */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-amber-500/10 rounded-lg">
                                <Scale className="w-5 h-5 text-amber-500" />
                            </div>
                            <span className="text-lg font-bold text-white tracking-tight">
                                IUZ <span className="text-amber-500">Advocacia</span>
                            </span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-full transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Content - Grid para centralização perfeita */}
                    <div className="h-[calc(100vh-88px)] grid place-items-center px-8">
                        <div className="w-full max-w-md">
                            <nav className="flex flex-col gap-6 mb-12">
                                {navLinks.map((link) => {
                                    const isActive = activeSection === link.href;
                                    return (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            onClick={(e) => handleNavClick(e, link.href)}
                                            className={`text-3xl font-bold tracking-tight transition-all flex items-center gap-3 ${isActive
                                                ? "text-amber-500 pl-4 border-l-4 border-amber-500"
                                                : "text-slate-400 hover:text-white"
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </nav>

                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg font-bold text-slate-950 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 transition-all shadow-xl shadow-amber-500/20"
                            >
                                Entrar na Plataforma
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
