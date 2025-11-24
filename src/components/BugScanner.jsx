import React from 'react';

const BugScanner = () => (
    <section className="bg-[#111] py-24 px-6 font-mono border-b border-neutral-900 flex flex-col justify-center items-center min-h-[600px]">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">

            {/* Left: Legend / Control */}
            <div className="flex flex-col gap-2">
                <div className="text-neutral-500 font-bold text-sm tracking-widest uppercase mb-4">
                    // DYNAMIC<br />
                    // ISLAND<br />
                    // PREVIEW
                </div>

                {/* The ASCII Box */}
                <div className="w-32 h-32 border-2 border-dashed border-neutral-600 relative flex items-center justify-center">
                    {/* Corner marks */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#111] border-l-2 border-t-2 border-neutral-600"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#111] border-r-2 border-t-2 border-neutral-600"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#111] border-l-2 border-b-2 border-neutral-600"></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#111] border-r-2 border-b-2 border-neutral-600"></div>

                    {/* Center Dot */}
                    <div className="w-3 h-3 bg-pink-300 animate-pulse"></div>
                </div>
            </div>

            {/* Right: The Alert */}
            <div className="relative group">
                {/* Outer Dashed Border */}
                <div className="absolute -inset-4 border-2 border-dashed border-neutral-600 pointer-events-none"></div>

                {/* The Pink Box */}
                <div className="bg-pink-300 text-black w-72 h-48 md:w-96 md:h-64 flex flex-col items-center justify-center font-bold text-center tracking-tighter shadow-[0_0_50px_rgba(249,168,212,0.2)] p-4">
                    <div className="text-sm mb-2 opacity-50">STATUS</div>
                    <div className="text-2xl">RECORDING IN PROGRESS</div>
                </div>
            </div>

        </div>
    </section>
);

export default BugScanner;
