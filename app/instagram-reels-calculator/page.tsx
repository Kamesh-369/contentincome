"use client";

import Link from "next/link";

export default function InstagramReelsCalculator() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden relative selection:bg-pink-100 selection:text-pink-900">

            {/* Background Decorations (Blurred Blobs) */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-yellow-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

            <div className="relative z-10 flex flex-col items-center px-4 text-center">

                {/* 1. Infinity Animation Container */}
                <div className="mb-12 relative w-48 h-24">
                    {/* The Infinity SVG */}
                    <svg
                        viewBox="0 0 200 100"
                        className="w-full h-full drop-shadow-2xl"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Define the Instagram Gradient */}
                        <defs>
                            <linearGradient id="insta-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#833AB4" />   {/* Purple */}
                                <stop offset="50%" stopColor="#FD1D1D" />   {/* Red/Pink */}
                                <stop offset="100%" stopColor="#F77737" />  {/* Orange */}
                            </linearGradient>
                        </defs>

                        {/* Background Path (Gray track) */}
                        <path
                            d="M50,50 C50,22.3857625 27.6142375,0 0,0 C-27.6142375,0 -50,22.3857625 -50,50 C-50,77.6142375 -27.6142375,100 0,100 C27.6142375,100 50,77.6142375 50,50 Z M150,50 C150,22.3857625 127.614237,0 100,0 C72.3857625,0 50,22.3857625 50,50 C50,77.6142375 72.3857625,100 100,100 C127.614237,100 150,77.6142375 150,50 Z"
                            transform="translate(50,0)" // Adjusting path logic for simple infinity loop
                            className="hidden" // Hiding the logic path, using a simpler drawn path below
                        />

                        {/* Actual Infinity Path */}
                        {/* M20,50 starts left. Curve to center. Curve to right loop. Curve back. */}
                        <path
                            d="M100,50 C100,22 140,22 140,50 C140,78 100,78 100,50 C100,22 60,22 60,50 C60,78 100,78 100,50"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="12"
                            strokeLinecap="round"
                            className="opacity-30"
                        />

                        {/* Animated Overlay Path */}
                        <path
                            d="M100,50 C100,22 140,22 140,50 C140,78 100,78 100,50 C100,22 60,22 60,50 C60,78 100,78 100,50"
                            fill="none"
                            stroke="url(#insta-gradient)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeDasharray="300"
                            strokeDashoffset="300"
                            className="animate-[draw-infinity_3s_linear_infinite]"
                        />
                    </svg>
                </div>

                {/* 2. Badge */}
                <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 border border-purple-100 rounded-full bg-purple-50">
                    COMING SOON
                </span>

                {/* 3. Main Title */}
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                    Instagram Reels <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]">
                        Calculator
                    </span>
                </h1>

                {/* 4. Subtitle */}
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                    We are building the ultimate tool to estimate your Reels earnings.
                    <br className="hidden md:block" />
                    Get ready to unlock the potential of your content.
                </p>

                {/* 5. CTA / Back Button */}
                <Link
                    href="/"
                    className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-gray-900 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 overflow-hidden"
                >
                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                    <span className="relative flex items-center gap-2">
                        Notify Me
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </span>
                </Link>

            </div>

            {/* Custom Keyframe Styles required for this specific animation if not in global css */}
            <style jsx global>{`
                @keyframes draw-infinity {
                    0% {
                        stroke-dashoffset: 300;
                    }
                    50% {
                        stroke-dashoffset: 0;
                    }
                    100% {
                        stroke-dashoffset: -300;
                    }
                }
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </main>
    );
}
