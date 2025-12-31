import { NextResponse } from "next/server";

// PLACEHOLDER: Ensure you add this key to your .env.local file
// Example: NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSy...
const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
        return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    if (!API_KEY) {
        console.error("❌ YouTube API Key is missing");
        return NextResponse.json({ error: "Server configuration error: Missing API Key" }, { status: 500 });
    }

    console.log("🔹 API Route Request:", url);

    try {
        // 1. Extract Channel ID or Handle
        let identifier = "";
        let param = "id"; // 'id', 'forUsername', 'forHandle'

        if (url.includes("/channel/")) {
            identifier = url.split("/channel/")[1].split("/")[0].split("?")[0];
            param = "id";
        } else if (url.includes("/user/")) {
            identifier = url.split("/user/")[1].split("/")[0].split("?")[0];
            param = "forUsername";
        } else if (url.includes("@")) {
            // Extract handle including the @ symbol?
            // e.g. https://youtube.com/@MrBeast -> @MrBeast
            // Splitting by last occurrence of /
            const parts = url.split("/");
            const handlePart = parts.find(p => p.startsWith("@"));

            if (handlePart) {
                identifier = handlePart.split("?")[0]; // remove query params
                param = "forHandle";
            } else {
                // fallback if @ is detected but structure is weird
                return NextResponse.json({ error: "Could not parse handle from URL." }, { status: 400 });
            }
        } else if (url.startsWith("UC")) {
            // Direct Channel ID input
            identifier = url;
            param = "id";
        } else {
            // Fallback: assume ID
            identifier = url;
            param = "id";
        }

        console.log(`   👉 Parsed: ${identifier} (param: ${param})`);

        // 2. Call YouTube Data API
        const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&${param}=${identifier}&key=${API_KEY}`;

        console.log(`   👉 Fetching: ${apiUrl.replace(API_KEY, "HIDDEN_KEY")}`);

        const res = await fetch(apiUrl);
        const data = await res.json();

        if (!res.ok) {
            console.error("❌ YouTube API Error Response:", data);
            return NextResponse.json({ error: `YouTube API Error: ${data.error?.message || res.statusText}` }, { status: res.status });
        }

        if (!data.items || data.items.length === 0) {
            console.warn("⚠️ Channel not found.");
            return NextResponse.json({ error: "Channel not found. Please check the URL/Handle." }, { status: 404 });
        }

        const channel = data.items[0];
        const snippet = channel.snippet;
        const stats = channel.statistics;

        // 3. Normalize Data
        const formattedData = {
            channelName: snippet.title,
            channelAvatarUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || null,
            subscribers: stats.subscriberCount ? parseInt(stats.subscriberCount) : null,
            totalViews: stats.viewCount ? parseInt(stats.viewCount) : null,
            videoCount: stats.videoCount ? parseInt(stats.videoCount) : null,
            country: snippet.country || null,
            creationDate: snippet.publishedAt ? new Date(snippet.publishedAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) : null,

            estimatedMonthlyEarnings: "--",
            estimatedSponsorshipPrice: "--",
            cpm: "--",
            socialLinks: {}
        };

        return NextResponse.json(formattedData);

    } catch (error) {
        console.error("❌ YouTube API Exception:", error);
        // @ts-ignore
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
