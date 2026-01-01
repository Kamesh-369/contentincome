

import HeroSection from "../components/HeroSection";
import Link from "next/link";


export const metadata = {
    title: "YouTube Money Calculator – How Much Do YouTubers Make in 2026?",
    description: "Estimate YouTube earnings using views, CPM, niche, and audience location. Updated YouTube revenue calculator for 2026.",
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What does this calculator do?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The YouTube Revenue Calculator estimates potential earnings based on key performance metrics. By inputting details such as video views, estimated CPM, content niche, and the location of your audience, the tool calculates approximate revenue figures. It serves as a valuable resource for both aspiring and established YouTubers to gauge financial possibilities."
            }
        },
        {
            "@type": "Question",
            "name": "What is CPM in YouTube earnings?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "CPM stands for \"Cost Per Mille,\" representing the amount advertisers pay per 1,000 monetized views. This figure fluctuates based on advertiser competition and budgets. Generally, a higher number of advertisers bidding for ad space on your videos drives the CPM up, resulting in greater earnings for the creator per thousand views."
            }
        },
        {
            "@type": "Question",
            "name": "Why do earnings vary by country?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Earnings vary significantly depending on viewer location. Countries with strong economies like the US, UK, and Canada typically command higher CPM rates because advertisers pay more to reach those audiences. In contrast, regions with lower purchasing power may see lower CPMs, though high view counts can still generate substantial income."
            }
        },
        {
            "@type": "Question",
            "name": "Are these results guaranteed?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The figures provided are estimates, not guarantees. Actual YouTube earnings depend on complex real-world variables including ad fill rates, watch time, engagement, ad formats, seasonality, and adherence to YouTube’s monetization policies. This calculator provides a realistic baseline for planning, but individual results will vary."
            }
        }
    ]
};

const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "name": "YouTube Revenue Calculator",
    "description": "Estimates YouTube earnings based on views, CPM, niche, and audience location.",
    "url": "https://www.youtuberearnings.in/youtube-revenue-calculator",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function YoutubeRevenueCalculator() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-background pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
            />
            {/* The Revenue Calculator handles Channel Search + Auto-Estimation inside Hero/Results */}
            <HeroSection />

            {/* SEO / Informational Content Section */}
            <section className="w-full max-w-6xl px-4 py-16 md:py-24">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center tracking-tight leading-tight">
                    How Does the YouTube Revenue Calculator Work?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                        <h3 className="text-xl font-bold text-foreground mb-4">
                            What does this calculator do?
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            The YouTube Revenue Calculator estimates potential earnings based on key performance metrics. By inputting details such as video views, estimated CPM, content niche, and the location of your audience, the tool calculates approximate revenue figures. It serves as a valuable resource for both aspiring and established YouTubers to gauge financial possibilities.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        <h3 className="text-xl font-bold text-foreground mb-4">
                            What is CPM in YouTube earnings?
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            CPM stands for "Cost Per Mille," representing the amount advertisers pay per 1,000 monetized views. This figure fluctuates based on advertiser competition and budgets. Generally, a higher number of advertisers bidding for ad space on your videos drives the CPM up, resulting in greater earnings for the creator per thousand views.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <h3 className="text-xl font-bold text-foreground mb-4">
                            Why do earnings vary by country?
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Earnings vary significantly depending on viewer location. Countries with strong economies (like the US, UK, and Canada) typically command higher CPM rates because advertisers pay more to reach those audiences. In contrast, regions with lower purchasing power may see lower CPMs, though high view counts can still generate substantial income.
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
                        <h3 className="text-xl font-bold text-foreground mb-4">
                            Are these results guaranteed?
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            The figures provided are estimates, not guarantees. Actual YouTube earnings depend on complex real-world variables including ad fill rates, watch time, engagement, ad formats, seasonality, and adherence to YouTube’s monetization policies. This calculator provides a realistic baseline for planning, but individual results will vary.
                        </p>
                    </div>

                </div>
            </section>
        </main>
    );
}
