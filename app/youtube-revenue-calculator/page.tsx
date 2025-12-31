

import HeroSection from "../components/HeroSection";


export const metadata = {
    title: "YouTube Money Calculator – How Much Do YouTubers Make in 2026?",
    description: "Estimate YouTube earnings using views, CPM, niche, and audience location. Updated YouTube revenue calculator for 2026.",
};

export default function YoutubeRevenueCalculator() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-background pb-20">
            {/* The Revenue Calculator handles Channel Search + Auto-Estimation inside Hero/Results */}
            <HeroSection />
        </main>
    );
}
