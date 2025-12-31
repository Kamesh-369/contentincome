"use client";

export interface IncomeCalculatorProps {
    views: number;
    cpm: number;
    onViewsChange: (val: number) => void;
    onCpmChange: (val: number) => void;
}

export default function IncomeCalculator({ views, cpm, onViewsChange, onCpmChange }: IncomeCalculatorProps) {
    // Constants
    const USD_TO_INR = 83;

    // Config
    const MIN_VIEWS = 0;
    const MAX_VIEWS = 150000;
    const STEP_VIEWS = 1000;

    const MIN_CPM = 10;
    const MAX_CPM = 1000;
    const STEP_CPM = 10;

    // Formatting helpers
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat("en-IN").format(Math.round(num));
    };

    const formatInr = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // --- REVENUE CALCULATIONS ---
    // (These are for the internal card inside IncomeCalculator, distinct from ResultsSection)

    // 1. Estimated Monthly Earnings
    const monthlyViews = views * 30;
    const yearlyViews = views * 365;

    // CPM is now in INR, so direct calculation
    const estimatedMonthlyEarningsInr = (monthlyViews / 1000) * cpm;

    // 2. Estimated Sponsorship Price
    const avgViewsPerVideo = views * 7;

    const calculateSponsorship = (avgViews: number) => {
        let rate = 0.5;
        if (avgViews < 10000) rate = 0.5;
        else if (avgViews < 50000) rate = 1;
        else if (avgViews < 100000) rate = 2;
        else if (avgViews < 500000) rate = 3;
        else rate = 5;

        const price = avgViews * rate;
        // Minimum cap 5000
        return Math.max(price, 5000);
    };

    const finalSponsorshipPrice = calculateSponsorship(avgViewsPerVideo);

    // Helper for slider gradient
    const getBackgroundStyle = (value: number, min: number, max: number) => {
        const percentage = ((value - min) / (max - min)) * 100;
        return {
            background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
        };
    };

    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center">

            {/* Header */}
            <h2 className="text-3xl font-bold text-foreground mb-2 text-center">
                YouTube Income Calculator
            </h2>
            <p className="text-muted text-center mb-10">
                Adjust the sliders to estimate your earnings
            </p>

            {/* Input Card */}
            <div className="w-full bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary/10 transition-all duration-300 p-8 mb-8">

                {/* 1. Views Slider */}
                <div className="mb-12">
                    <div className="flex justify-between items-end mb-6">
                        <label htmlFor="views-slider" className="text-muted font-medium uppercase tracking-wide text-sm">
                            Views per day
                        </label>
                        <span className="text-3xl font-bold text-foreground tracking-tight">
                            {formatNumber(views)}
                        </span>
                    </div>

                    <div className="relative w-full">
                        <input
                            id="views-slider"
                            type="range"
                            min={MIN_VIEWS}
                            max={MAX_VIEWS}
                            step={STEP_VIEWS}
                            value={views}
                            onChange={(e) => onViewsChange(Number(e.target.value))}
                            style={getBackgroundStyle(views, MIN_VIEWS, MAX_VIEWS)}
                            className="w-full h-3 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:hover:scale-110"
                        />
                        <div className="flex justify-between px-1 mt-3">
                            {[0, 25000, 50000, 75000, 100000, 125000, 150000].map((val) => (
                                <div key={val} className="flex flex-col items-center">
                                    <div className="w-0.5 h-2 bg-gray-300 mb-1"></div>
                                    <span className="text-[10px] md:text-xs text-muted font-medium">
                                        {val === 0 ? "0" : val >= 1000 ? `${val / 1000}k` : val}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. CPM Slider */}
                <div>
                    <div className="flex justify-between items-end mb-6">
                        <label htmlFor="cpm-slider" className="text-muted font-medium uppercase tracking-wide text-sm">
                            CPM (₹)
                        </label>
                        <span className="text-3xl font-bold text-foreground tracking-tight">
                            <span className="text-muted mr-1">₹</span>{cpm}
                        </span>
                    </div>

                    <div className="relative w-full">
                        <input
                            id="cpm-slider"
                            type="range"
                            min={MIN_CPM}
                            max={MAX_CPM}
                            step={STEP_CPM}
                            value={cpm}
                            onChange={(e) => onCpmChange(Number(e.target.value))}
                            style={getBackgroundStyle(cpm, MIN_CPM, MAX_CPM)}
                            className="w-full h-3 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:hover:scale-110"
                        />
                        <div className="flex justify-between px-1 mt-3">
                            {[10, 250, 500, 750, 1000].map((val) => (
                                <div key={val} className="flex flex-col items-center">
                                    <div className="w-0.5 h-2 bg-gray-300 mb-1"></div>
                                    <span className="text-[10px] md:text-xs text-muted font-medium">
                                        {val}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="text-xs text-muted mt-6 text-center md:text-left">
                        Typical CPM ranges from ₹50 to ₹500 depending on audience location and niche.
                    </p>
                </div>

            </div>

            {/* 3. Results Card */}
            <div className="w-full bg-white rounded-3xl shadow-xl border border-border/50 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">

                    {/* Left Column: Views (Derived Metrics) */}
                    <div className="p-8 space-y-8">
                        <div className="text-center">
                            <p className="text-sm text-muted font-medium uppercase tracking-wide mb-1">Views per Month</p>
                            <p className="text-2xl font-bold text-foreground">{formatNumber(monthlyViews)}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-muted font-medium uppercase tracking-wide mb-1">Views per Year</p>
                            <p className="text-2xl font-bold text-foreground">{formatNumber(yearlyViews)}</p>
                        </div>
                    </div>

                    {/* Right Column: Earnings (INR) */}
                    <div className="p-8 bg-gray-50/50 space-y-8">
                        <div className="text-center">
                            <p className="text-sm text-muted font-medium uppercase tracking-wide mb-1">Est. Monthly Earnings</p>
                            {/* Dynamically bound: estimatedMonthlyEarningsInr */}
                            <p className="text-4xl font-extrabold text-primary">
                                {formatInr(estimatedMonthlyEarningsInr)}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-muted font-medium uppercase tracking-wide mb-1">Est. Sponsorship Price</p>
                            {/* Dynamically bound: finalSponsorshipPrice */}
                            <p className="text-2xl font-bold text-foreground">
                                {formatInr(finalSponsorshipPrice)}
                            </p>
                            <p className="text-[10px] text-muted mt-1">(Per Video)</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-muted text-center mt-6 max-w-2xl px-4">
                Estimates are approximate. Revenue depends on niche, audience location, and engagement.
            </p>

        </section>
    );
}
