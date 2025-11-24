import React from 'react';

const BioSection = () => (
    <section className="relative py-24 min-h-[600px] flex flex-col justify-center overflow-hidden border-b border-neutral-900">
        {/* Blue Polka Dot Background Pattern */}
        <div className="absolute inset-0 bg-[#080808]"
            style={{
                backgroundImage: 'radial-gradient(#3b82f6 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px'
            }}>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
            <div className="bg-[#0a0a0a] border-2 border-white p-12 md:p-16 shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)] relative">
                {/* Corner Markers */}
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white -translate-x-2 -translate-y-2"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-white translate-x-2 -translate-y-2"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-white -translate-x-2 translate-y-2"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white translate-x-2 translate-y-2"></div>

                <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-500 text-black px-3 py-1 font-mono font-bold text-sm mb-6 rotate-2">
                // PRIVACY_FIRST.md
                    </div>
                    <blockquote className="font-mono text-2xl md:text-4xl leading-relaxed text-white">
                        "Your conversations are yours. Stored solely on-device or iCloud. We provide the intelligence, you keep the data."
                    </blockquote>
                    <div className="mt-8 text-blue-400 font-mono text-sm tracking-[0.2em] uppercase">
                        --- CONTEXT AWARE RECORDING ---
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default BioSection;
