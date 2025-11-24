import React from 'react';
import Reveal from './Reveal';

const Testimonials = () => {
    // The specific ASCII pattern from the image
    const AsciiPattern = () => (
        <div className="whitespace-pre font-mono text-[10px] leading-[1.2] text-neutral-700 opacity-50 select-none">
            {`* +---D---+ * +---D---+ *
* | \\ | / | * | \\ | / | *
* F H I J B * F H I J B *
* |  \\|/  | * |  \\|/  | *
* +-G1+-G2+ * +-G1+-G2+ *
* | /|\\ | * | /|\\ | *
* E K L M C * E K L M C *
* | / | \\ | * | / | \\ | *
* +---D---+ * +---D---+ *`}
        </div>
    );

    return (
        <section className="relative py-24 px-6 bg-[#1a1a1a] overflow-hidden flex items-center justify-center min-h-[600px] border-b border-black">
            {/* 1. Infinite ASCII Background */}
            <div className="absolute inset-0 flex flex-wrap content-start justify-center gap-8 p-8 overflow-hidden pointer-events-none opacity-50 animate-[pulseSlow_10s_ease-in-out_infinite]">
                {Array.from({ length: 24 }).map((_, i) => (
                    <AsciiPattern key={i} />
                ))}
            </div>

            {/* 2. The Centered Split Box */}
            <div className="relative z-10 w-full max-w-xl shadow-[20px_20px_0px_0px_rgba(0,0,0,0.2)]">
                <Reveal>
                    {/* Top Half: Black */}
                    <div className="bg-[#111] text-white p-12 md:p-16 text-center relative overflow-hidden flex flex-col items-center">

                        <blockquote className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                            "Hey Ive, it's movie night tonight."
                        </blockquote>

                        {/* Separator */}
                        <div className="w-16 h-[1px] bg-neutral-700 mb-6"></div>

                        {/* Subtext */}
                        <div className="text-neutral-500 text-sm tracking-widest uppercase mb-8">
                            // USER_INPUT
                        </div>

                        {/* Top Decor: Dot Grid */}
                        <div className="grid grid-cols-4 gap-1">
                            {Array.from({ length: 16 }).map((_, i) => (
                                <div key={i} className={`w-1 h-1 rounded-sm ${i % 2 === 0 ? 'bg-neutral-600' : 'bg-transparent border border-neutral-600'}`}></div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Half: White */}
                    <div className="bg-[#e5e5e5] text-black p-12 md:p-16 text-center relative border-t border-neutral-300 flex flex-col items-center">
                        <blockquote className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                            "Ordering popcorn. <br />Recommending 'Dune' based on preferences."
                        </blockquote>

                        {/* Separator */}
                        <div className="w-16 h-[1px] bg-neutral-400 mb-6"></div>

                        {/* Subtext */}
                        <div className="text-neutral-500 text-sm tracking-widest uppercase mb-8">
                            // IVE_ACTION_RESULT
                        </div>

                        {/* Bottom Decor: Dot Grid */}
                        <div className="grid grid-cols-4 gap-1">
                            {Array.from({ length: 16 }).map((_, i) => (
                                <div key={i} className={`w-1 h-1 rounded-sm ${i % 2 !== 0 ? 'bg-black' : 'bg-transparent border border-black'}`}></div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
export default Testimonials;
