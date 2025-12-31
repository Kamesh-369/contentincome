export default function BackgroundEffect() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* 
               Global Background Blobs 
               - Fixed position to cover viewport.
               - z-0 to sit above body background but below content (which needs z-10).
               - Increased opacity and color strength to ensure visibility on light gray background.
            */}

            {/* Top Left - Distinct Red */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>

            {/* Top Right - Warm Orange */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

            {/* Bottom - Soft Gray/Pink to balance */}
            <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>
    );
}
