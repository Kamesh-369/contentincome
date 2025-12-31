"use client";

import { useState } from "react";
import ResultsSection, { ChannelData } from "./ResultsSection";

// Helper to calculate days between dates
const getDaysActive = (creationDateStr: string | null) => {
    if (!creationDateStr) return 1; // avoid division by zero
    const created = new Date(creationDateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
};

export interface HeroSectionProps {
    views?: number;
    cpm?: number;
}

export default function HeroSection({ views = 0, cpm = 0 }: HeroSectionProps) {
    const [url, setUrl] = useState("");
    const [result, setResult] = useState<ChannelData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [derivedViewsPerDay, setDerivedViewsPerDay] = useState(0);

    const handleCalculate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;

        // Reset states
        setResult(null);
        setError(null);
        setIsLoading(true);
        setDerivedViewsPerDay(0);

        try {
            const res = await fetch(`/api/youtube/channel?url=${encodeURIComponent(url)}`);
            const data = await res.json();

            if (res.ok) {
                setResult(data);

                // --- DERIVE VIEWS PER DAY FROM DATA ---
                // Since we are prohibited from using sliders, we must estimate from lifetime stats.
                // Logic: Total Views / Days Active
                if (data.totalViews && data.creationDate) {
                    const daysActive = getDaysActive(data.creationDate);
                    const estimatedDaily = Math.round(data.totalViews / daysActive);

                    // Adjustment: Lifetime average is often WAY lower than current daily views for growing channels.
                    // A simple heuristic (multiplier) or just raw average?
                    // Raw average is safer "minimum".
                    // Let's use raw average but ensure it's at least non-zero.
                    setDerivedViewsPerDay(estimatedDaily > 0 ? estimatedDaily : 0);
                }

            } else {
                console.error("Error fetching channel:", data.error);
                setError(data.error || "We couldn't find that channel.");
            }
        } catch (error) {
            console.error("Network error:", error);
            setError("Something went wrong. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center text-center">
            {/* 1. Main Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                YouTube Money Calculator – How Much Do YouTubers Make in 2026?
            </h1>

            {/* 2. Subheading / Trust Line */}
            <p className="text-sm md:text-base text-muted font-medium mb-6">
                Creator-made. Creator-powered.
            </p>

            {/* 3. Description Text */}
            <p className="text-base md:text-lg text-foreground max-w-2xl mb-10 leading-relaxed">
                Estimate YouTube earnings using views, CPM, niche, and audience location. Updated YouTube revenue calculator for 2026.
            </p>

            {/* 4. Input + Action Area */}
            <form onSubmit={handleCalculate} className="w-full max-w-2xl relative z-10">
                <div className={`relative flex items-center w-full p-2 bg-white rounded-full shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary/20 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-300 ${isLoading ? 'opacity-80' : ''}`}>
                    <div className="pl-6 flex items-center justify-center text-muted">
                        {/* icon place */}
                    </div>
                    <input
                        type="text"
                        placeholder="Enter YouTube channel URL here"
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value);
                            if (error) setError(null); // Clear error on typing
                        }}
                        disabled={isLoading}
                        className="w-full h-12 bg-transparent text-foreground text-lg px-4 focus:outline-none placeholder:text-muted/60 disabled:cursor-not-allowed"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-primary hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isLoading ? "Loading..." : "Calculate"}
                    </button>
                </div>
            </form>

            {/* 5. State Handling Components */}

            {/* Loading Spinner */}
            {isLoading && (
                <div className="mt-16 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
                    <p className="mt-4 text-muted font-medium">Fetching channel data...</p>
                </div>
            )}

            {/* Friendly Error State */}
            {error && !isLoading && (
                <div className="mt-16 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-md mx-auto">
                    <div className="text-6xl mb-4">😞</div>
                    <h3 className="text-xl font-bold text-foreground mb-2">No channel found</h3>
                    <p className="text-muted text-lg leading-relaxed">
                        We couldn't resolve that URL. Please make sure you're using a valid YouTube Channel link (e.g. youtube.com/channel/ID) and try again.
                    </p>
                </div>
            )}

            {/* Success Results */}
            {!isLoading && !error && <ResultsSection data={result} viewsPerDay={derivedViewsPerDay} cpmUsd={cpm} />}
        </section>
    );
}
