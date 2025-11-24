import React from 'react';

const DetailScanner = () => {
    return (
        <section className="bg-black py-24 flex flex-col justify-center overflow-hidden relative min-h-[600px]">
            {/* Left Green Stripes */}
            <div className="w-2 flex gap-1 h-full absolute left-4 top-0 bottom-0 opacity-50 md:opacity-100">
                <div className="w-[1px] bg-green-500/50 h-full"></div>
                <div className="w-[1px] bg-green-500/50 h-full"></div>
                <div className="w-[1px] bg-green-500/50 h-full"></div>
            </div>

            {/* Right Green Stripes */}
            <div className="w-2 flex gap-1 h-full absolute right-4 top-0 bottom-0 opacity-50 md:opacity-100">
                <div className="w-[1px] bg-green-500/50 h-full"></div>
                <div className="w-[1px] bg-green-500/50 h-full"></div>
                <div className="w-[1px] bg-green-500/50 h-full"></div>
            </div>

            <div className="max-w-5xl w-full mx-auto px-12 grid grid-cols-1 md:grid-cols-12 gap-12 font-mono text-white">

                {/* Left Visual Card */}
                <div className="md:col-span-4">
                    <div className="w-64 h-80 bg-[#1a1a1a] border border-neutral-800 relative flex flex-col">
                        {/* Top: Dot Grid */}
                        <div className="h-1/2 p-4 grid grid-cols-12 gap-1 overflow-hidden">
                            {Array.from({ length: 144 }).map((_, i) => (
                                <div key={i} className="w-1 h-1 bg-green-500 rounded-full opacity-80"></div>
                            ))}
                        </div>

                        {/* Mid: Label */}
                        <div className="bg-green-400 text-black px-2 py-1 text-xs font-bold uppercase border-y border-black">
                            Security Protocol
                        </div>

                        {/* Bottom: Solid Beige/Grey */}
                        <div className="h-1/2 bg-[#d4d4d4]"></div>
                    </div>
                </div>

                {/* Right Text Content */}
                <div className="md:col-span-8 flex flex-col justify-center">
                    {/* Navigation */}
                    <div className="flex gap-4 text-xs font-bold uppercase mb-8 text-neutral-500">
                        <span className="hover:text-white cursor-pointer">Security</span>
                        <span className="hover:text-white cursor-pointer">Offline</span>
                        <span className="bg-white text-black px-1">iCloud</span>
                        <span className="hover:text-white cursor-pointer">Legal</span>
                    </div>

                    {/* Headline */}
                    <p className="text-xl md:text-2xl leading-relaxed mb-8 text-neutral-200">
                        Detail matters. Ive scans conversations solely on your device or in your private iCloud container. Superior search power without compromising your digital privacy.
                    </p>

                    {/* Terminal Lines */}
                    <div className="font-mono text-sm space-y-2 mb-8 text-neutral-400">
                        <div>- STORAGE: LOCAL_ONLY || ICLOUD</div>
                        <div className="flex items-center gap-2 text-white">
                            <span>+ ENCRYPTION: AES-256 GCM</span>
                            <div className="w-3 h-5 bg-white animate-pulse"></div>
                        </div>
                    </div>

                    {/* Button */}
                    <div>
                        <button className="bg-green-400 text-black px-6 py-2 text-sm font-bold uppercase hover:bg-green-300 transition-colors">
                            Read Security Whitepaper
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailScanner;
