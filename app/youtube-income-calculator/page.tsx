"use client";

import { useState } from "react";
import IncomeCalculator from "../components/IncomeCalculator";

export default function YoutubeIncomeCalculatorPage() {
    // Local state for independent slider calculator
    const [views, setViews] = useState(25000);
    const [cpm, setCpm] = useState(50);

    return (
        <main className="flex min-h-screen flex-col items-center bg-background pb-20 pt-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight text-center px-4">
                YouTube Income Calculator
            </h1>
            <p className="text-base md:text-lg text-muted max-w-2xl mb-10 leading-relaxed text-center px-4">
                Estimate how much money you can earn from YouTube based on your views and CPM.
            </p>

            <IncomeCalculator
                views={views}
                cpm={cpm}
                onViewsChange={setViews}
                onCpmChange={setCpm}
            />
        </main>
    );
}
