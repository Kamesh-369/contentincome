import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-white border-t border-gray-100 mt-auto">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">

                    {/* Column 1: Product */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Product</h3>
                        <nav>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/youtube-revenue-calculator" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200">
                                        YouTube Revenue Calculator
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/youtube-income-calculator" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200">
                                        YouTube Income Calculator
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/instagram-reels-calculator" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200">
                                        Instagram Reels Calculator
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Column 2: About */}
                    <div className="space-y-4 md:text-right">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary">About</h3>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-xs ml-auto">
                            Simple calculators to help creators understand their earnings. Estimates are based on public data and industry averages.
                        </p>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
                    <p>
                        © 2026 YouTube Calculators. All rights reserved.
                    </p>
                    <p className="text-center md:text-right">
                        All earnings shown are estimates. Actual revenue may vary based on content, audience, and advertiser demand.
                    </p>
                </div>

            </div>
        </footer>
    );
}
