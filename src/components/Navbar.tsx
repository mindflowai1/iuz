"use client";

import Link from "next/link";
import { Scale, Menu, X, Sparkles, ChevronRight, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    const navLinks = [
        { href: "#", label: "Início" },
        { href: "#recursos", label: "Recursos" },
        { href: "#como-funciona", label: "Como Funciona" },
        { href: "#diferenciais", label: "Diferenciais" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Active section logic
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
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled && !isOpen
                        ? "bg-[#020408]/80 backdrop-blur-2xl border-b border-white/5 py-3 shadow-2xl shadow-black/20"
                        : "bg-transparent py-5"
                    }`}
            >
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between">

                        {/* Logo */}
                        <Link
                            href="#"
                            onClick={(e) => handleNavClick(e, '#')}
                            className={`flex items-center gap-2.5 group transition-opacity duration-300 ${isOpen ? 'opacity-0 lg:opacity-100' : 'opacity-100'}`}
                        >
                            <motion.div
                                whileHover={{ rotate: 180, scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                                className="p-2 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-xl group-hover:from-amber-500/20 group-hover:to-amber-600/20 transition-all duration-300 border border-amber-500/20"
                            >
                                <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
                            </motion.div>
                            <div className="flex flex-col">
                                <span className="text-lg sm:text-xl font-bold text-white tracking-tight leading-none">
                                    IUZ
                                </span>
                                <span className="text-[10px] sm:text-xs text-amber-500 font-semibold tracking-wider uppercase">
                                    CRM Jurídico
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center gap-2">
                            {navLinks.filter(l => l.href !== "#").map((link) => {
                                const isActive = activeSection === link.href;
                                return (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className="relative px-4 py-2 group"
                                    >
                                        <span className={`text-sm font-medium transition-colors duration-300 ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                                            }`}>
                                            {link.label}
                                        </span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeSection"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                        {!isActive && (
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500/50 to-amber-600/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* CTA Button Desktop */}
                        <div className="hidden lg:flex items-center gap-4">
                            <Link
                                href="/login"
                                className="group relative px-6 py-2.5 rounded-full font-semibold text-sm overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 transition-transform group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative text-black flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    Começar Grátis
                                </span>
                            </Link>
                        </div>

                        {/* Mobile Toggle (Visible only when menu is closed) */}
                        <motion.button
                            initial={false}
                            animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.8 : 1 }}
                            onClick={() => setIsOpen(true)}
                            className={`lg:hidden z-[60] p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all ${isOpen ? 'pointer-events-none' : 'pointer-events-auto'}`}
                            aria-label="Open Menu"
                        >
                            <Menu size={24} className="text-slate-300" />
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Fullscreen Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ clipPath: "circle(0% at 100% 0%)" }}
                        animate={{ clipPath: "circle(150% at 100% 0%)" }}
                        exit={{ clipPath: "circle(0% at 100% 0%)" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // smooth ease
                        className="fixed inset-0 z-[100] lg:hidden bg-[#020408]"
                    >
                        {/* Dynamic Background */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
                            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-700" />
                            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
                        </div>

                        {/* Internal Header for Mobile Menu */}
                        <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-20">
                            {/* Logo inside Mobile Menu */}
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-xl border border-amber-500/20">
                                    <Scale className="w-5 h-5 text-amber-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-bold text-white tracking-tight leading-none">IUZ</span>
                                    <span className="text-[10px] text-amber-500 font-semibold tracking-wider uppercase">Menu Principal</span>
                                </div>
                            </div>

                            {/* Explicit Close Button with 'Voltar' styling */}
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2 group bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide group-hover:text-white">Voltar</span>
                                <div className="bg-white/10 rounded-full p-1 group-hover:bg-amber-500 transition-colors">
                                    <X size={14} className="text-white" />
                                </div>
                            </motion.button>
                        </div>

                        {/* Content Container */}
                        <div className="h-full flex flex-col justify-center px-6 relative z-10">

                            <nav className="flex flex-col gap-6">
                                {navLinks.map((link, index) => {
                                    const isActive = activeSection === link.href;
                                    return (
                                        <motion.div
                                            key={link.label}
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ delay: 0.1 + (index * 0.1), duration: 0.4, ease: "easeOut" }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={(e) => handleNavClick(e, link.href)}
                                                className="group flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5"
                                            >
                                                <span className={`text-3xl font-bold tracking-tight transition-colors ${isActive
                                                        ? "text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-600"
                                                        : "text-slate-400 group-hover:text-white"
                                                    }`}>
                                                    {link.label}
                                                </span>
                                                <ChevronRight className={`w-6 h-6 transition-transform group-hover:translate-x-1 ${isActive ? "text-amber-500" : "text-slate-600 group-hover:text-white"
                                                    }`} />
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </nav>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                className="mt-12"
                            >
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg font-bold text-black bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 transition-all shadow-xl shadow-amber-500/20 active:scale-95"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    Acessar Plataforma
                                </Link>
                                <p className="mt-6 text-center text-sm text-slate-500 font-medium">
                                    IUZ CRM © 2024
                                </p>
                            </motion.div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
