"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        {
            name: "YouTube Revenue Calculator",
            href: "/youtube-revenue-calculator",
        },
        {
            name: "YouTube Income Calculator",
            href: "/youtube-income-calculator",
        },
        {
            name: "Instagram Reels Calculator",
            href: "/instagram-reels-calculator",
        },
    ];

    return (
        <nav
            className={`sticky top-0 z-50 transition-all duration-300 border-b animate-slide-down ${isScrolled
                ? "bg-white/90 backdrop-blur-xl border-gray-200/50 shadow-sm"
                : "bg-white/50 backdrop-blur-sm border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Branding */}
                    <Link
                        href="/"
                        className="font-black text-2xl tracking-tighter text-foreground hover:opacity-80 transition-opacity"
                    >
                        YouTube <span className="text-primary">Calculator</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`
                                      relative text-sm font-semibold tracking-wide transition-colors duration-200
                                      ${isActive ? "text-primary" : "text-gray-500 hover:text-foreground"}
                                    `}
                                    aria-current={isActive ? "page" : undefined}
                                >
                                    {link.name}
                                    {/* Active Dot Indicator */}
                                    {isActive && (
                                        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-in fade-in zoom-in duration-300"></span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button (Placeholder for future implementation if needed) */}
                    <div className="md:hidden">
                        <span className="text-sm font-bold text-primary">Menu</span>
                    </div>

                </div>
            </div>
        </nav>
    );
}
