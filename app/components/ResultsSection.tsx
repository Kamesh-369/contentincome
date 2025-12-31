"use client";

import { useMemo } from "react";

export type ChannelData = {
    channelName: string;
    channelAvatarUrl: string | null;
    subscribers: number | string | null;
    totalViews: number | string | null;
    videoCount: number | string | null;
    country: string | null;
    creationDate: string | null;
    estimatedMonthlyEarnings: number | string;
    estimatedSponsorshipPrice: number | string;
    cpm: number | string;
    socialLinks: {
        youtube?: string;
        facebook?: string;
        twitter?: string;
        linkedin?: string;
    };
};

// Helper for currency formatting (INR)
const formatInr = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

// Helper for number formatting
const formatNumber = (num: number | string) => {
    if (typeof num === "string") return num;
    return new Intl.NumberFormat("en-US", {
        notation: "compact",
        compactDisplay: "short",
    }).format(num);
};

// Helper to parse subscribers safely
const parseSubscribers = (subs: number | string | null): number => {
    if (!subs) return 0;
    if (typeof subs === 'number') return subs;
    const nums = subs.replace(/[^0-9]/g, '');
    return parseInt(nums, 10) || 0;
};

interface ResultsSectionProps {
    data: ChannelData | null;
    viewsPerDay: number;
    cpmUsd: number; // Kept for interface compatibility, but ignored
}

export default function ResultsSection({ data, viewsPerDay }: ResultsSectionProps) {
    // CONSTANTS
    const USD_TO_INR = 83;

    // Derived Revenue Calculations
    const { estimatedMonthlyEarningsInr, finalSponsorshipPrice, autoCpmInr } = useMemo(() => {
        if (!data) return { estimatedMonthlyEarningsInr: 0, finalSponsorshipPrice: 0, autoCpmInr: 0 };

        // --- STEP 1: BASE CPM BY COUNTRY (USD) ---
        const country = data.country ? data.country.toUpperCase() : "US"; // Default to US logic if unknown

        let baseCpm = 2.0; // Default Global

        // Tier 1: High Value (English speaking / High GDP)
        if (["US", "CA", "GB", "AU"].includes(country)) baseCpm = 10.0;
        // Tier 2: Western Europe / Developed
        else if (["DE", "FR", "ES", "IT", "NL", "SE", "NO", "DK", "FI", "JP", "KR"].includes(country)) baseCpm = 7.0;
        // Tier 3: Developing / High Volume
        else if (["IN", "BR", "PH", "ID", "VN", "TR", "MX", "RU"].includes(country)) baseCpm = 1.5;

        // --- STEP 2: SUBSCRIBER MULTIPLIER ---
        const subs = parseSubscribers(data.subscribers);
        let multiplier = 1.0;
        if (subs >= 1000000) multiplier = 1.2;
        else if (subs >= 500000) multiplier = 1.1;

        // --- STEP 3: CLAMP CPM (USD) ---
        let finalCpmUsd = baseCpm * multiplier;
        // Safety clamp
        if (finalCpmUsd < 0.3) finalCpmUsd = 0.3;
        if (finalCpmUsd > 15) finalCpmUsd = 15;

        // --- STEP 4: USD -> INR CONVERSION ---
        const finalCpmInr = Math.round(finalCpmUsd * USD_TO_INR);

        // --- STEP 5: REVENUE CALCULATION ---

        // Monthly Earnings
        // monthlyViews = viewsPerDay * 30
        const monthlyViews = viewsPerDay * 30;
        // monthlyEarningsUsd = (monthlyViews / 1000) * finalCpmUsd
        const monthlyEarningsUsd = (monthlyViews / 1000) * finalCpmUsd;
        const earningsInr = Math.round(monthlyEarningsUsd * USD_TO_INR);

        // Sponsorship Price (Independent of CPM)
        // Rate based on views bucket
        const avgViewsPerVideo = viewsPerDay * 7;
        let rate = 0.5;
        if (avgViewsPerVideo < 10000) rate = 0.5;
        else if (avgViewsPerVideo < 50000) rate = 1;
        else if (avgViewsPerVideo < 100000) rate = 2;
        else if (avgViewsPerVideo < 500000) rate = 3;
        else rate = 5;

        const sponsorshipPrice = avgViewsPerVideo * rate;
        const finalSponsorship = Math.round(Math.max(sponsorshipPrice, 5000));

        if (viewsPerDay === 0) {
            return { estimatedMonthlyEarningsInr: 0, finalSponsorshipPrice: 0, autoCpmInr: finalCpmInr };
        }

        return {
            estimatedMonthlyEarningsInr: earningsInr,
            finalSponsorshipPrice: finalSponsorship,
            autoCpmInr: finalCpmInr
        };
    }, [viewsPerDay, data, USD_TO_INR]);

    if (!data) return null;

    return (
        <div className="w-full max-w-4xl mx-auto mt-16 bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:border-gray-200 transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">

            {/* 1. Channel Header */}
            <div className="p-10 border-b border-border/50 flex flex-col items-center bg-gradient-to-b from-white to-gray-50/50">
                {/* Avatar Placeholder */}
                <div className={`w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-bold mb-4 shrink-0 overflow-hidden`}>
                    {data.channelAvatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={data.channelAvatarUrl} alt={data.channelName} className="w-full h-full object-cover" />
                    ) : (
                        <span className="uppercase">{data.channelName.charAt(0)}</span>
                    )}
                </div>

                <h2 className="text-3xl font-bold text-foreground text-center mb-4">
                    {data.channelName}
                </h2>

                {/* Social Links Row */}
                <div className="flex gap-4">
                    {data.socialLinks.youtube && (
                        <span className="text-muted text-sm font-medium hover:text-primary cursor-default">YouTube</span>
                    )}
                    {data.socialLinks.facebook && (
                        <span className="text-muted text-sm font-medium hover:text-primary cursor-default">Facebook</span>
                    )}
                    {data.socialLinks.twitter && (
                        <span className="text-muted text-sm font-medium hover:text-primary cursor-default">Twitter</span>
                    )}
                    {data.socialLinks.linkedin && (
                        <span className="text-muted text-sm font-medium hover:text-primary cursor-default">LinkedIn</span>
                    )}
                </div>
            </div>

            {/* 2. Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">

                {/* Row 1, Col 1 */}
                <div className="p-6 text-center">
                    <p className="text-sm text-muted font-medium mb-1 uppercase tracking-wide">Total Subscribers</p>
                    <p className="text-2xl font-bold text-foreground">
                        {data.subscribers ? formatNumber(data.subscribers) : "--"}
                    </p>
                </div>

                {/* Row 1, Col 2: Estimated Monthly Earnings */}
                <div className="p-6 text-center bg-primary/5">
                    <p className="text-sm text-muted font-medium mb-1 uppercase tracking-wide">Est. Monthly Earnings</p>
                    <p className="text-2xl font-bold text-primary">
                        {formatInr(estimatedMonthlyEarningsInr)}
                    </p>
                    <p className="text-xs text-muted mt-1">
                        CPM: {formatInr(autoCpmInr)} <span className="text-[10px] text-gray-400">({data.country || "Global"})</span>
                    </p>
                </div>

                {/* Row 1, Col 3: Estimated Sponsorship Price */}
                <div className="p-6 text-center">
                    <p className="text-sm text-muted font-medium mb-1 uppercase tracking-wide">Est. Sponsorship Price</p>
                    <p className="text-2xl font-bold text-foreground">
                        {formatInr(finalSponsorshipPrice)}
                    </p>
                    <p className="text-xs text-muted mt-1">
                        Per Video
                    </p>
                </div>

                {/* Row 2, Col 1 */}
                <div className="p-6 text-center border-t border-border">
                    <p className="text-sm text-muted font-medium mb-1 uppercase tracking-wide">Total Views</p>
                    <p className="text-xl font-bold text-foreground">
                        {data.totalViews ? formatNumber(data.totalViews) : "--"}
                    </p>
                </div>

                {/* Row 2, Col 2: Total Videos */}
                <div className="p-6 text-center border-t border-border">
                    <p className="text-sm text-muted font-medium mb-1 uppercase tracking-wide">Total Videos</p>
                    <p className="text-xl font-bold text-foreground">
                        {data.videoCount ? data.videoCount.toLocaleString() : "--"}
                    </p>
                </div>

                {/* Row 2, Col 3 */}
                <div className="p-6 text-center border-t border-border">
                    <p className="text-sm text-muted font-medium mb-1 uppercase tracking-wide">Country</p>
                    <p className="text-xl font-bold text-foreground">{data.country || "--"}</p>
                </div>

            </div>

            {/* 3. Action Buttons Row */}
            <div className="p-8 bg-gray-50/50 border-t border-border/50 flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-8 py-3 bg-primary text-white font-bold rounded-full shadow-md hover:shadow-lg hover:bg-red-600 transform active:scale-95 transition-all duration-200">
                    Boost Subscribers
                </button>
                <button className="px-8 py-3 bg-primary text-white font-bold rounded-full shadow-md hover:shadow-lg hover:bg-red-600 transform active:scale-95 transition-all duration-200">
                    Boost Likes
                </button>
                <button className="px-8 py-3 bg-primary text-white font-bold rounded-full shadow-md hover:shadow-lg hover:bg-red-600 transform active:scale-95 transition-all duration-200">
                    Boost Views
                </button>
            </div>

        </div>
    );
}
