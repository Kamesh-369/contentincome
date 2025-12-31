import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">YouTube Revenue Calculator Tool</h1>
      <Link
        href="/youtube-revenue-calculator"
        className="px-6 py-3 bg-foreground text-background rounded-lg hover:opacity-90 transition"
      >
        Go to Calculator
      </Link>
    </main>
  );
}
