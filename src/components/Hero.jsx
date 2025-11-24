import React from 'react';
import { Mic } from 'lucide-react';
import AsciiBorder from './AsciiBorder';
import GridBackground from './GridBackground';

const Hero = () => {
    return (
        <section className="relative min-h-screen bg-[#050505] text-white flex flex-col pt-32 pb-12 px-6 overflow-hidden border-b border-neutral-900">
            <GridBackground />

            <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left: Text Content */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-6 text-green-400 font-mono text-xs tracking-widest">
                        <span className="animate-pulse">●</span> LISTENING_MODE: ACTIVE
                    </div>
                    <h1 className="text-6xl md:text-8xl font-mono font-bold leading-none tracking-tighter mb-8">
                        IVE<br />
                        ASSISTANT_
                    </h1>
                    <div className="bg-neutral-900/50 border-l-2 border-green-500 p-4 mb-8 max-w-xl backdrop-blur-sm">
                        <p className="text-neutral-400 font-mono text-lg">
                            The autonomous, context-aware assistant.
                            Records conversations, extracts todos, and executes workflows without being asked.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 font-mono text-sm">
                        <button className="bg-green-400 text-black px-8 py-4 hover:bg-green-300 transition-colors uppercase font-bold border-b-4 border-green-700 active:border-b-0 active:translate-y-1 flex items-center gap-2">
                            <Mic size={16} /> Start Recording
                        </button>
                        <button className="border border-neutral-700 px-8 py-4 hover:bg-neutral-900 transition-colors uppercase flex items-center gap-2 text-neutral-400">
                            View Demo
                        </button>
                    </div>
                </div>

                {/* Right: The "Scanning" Visual Recreated */}
                <div className="lg:col-span-5 relative">
                    <AsciiBorder title="CONTEXT_BUFFER" className="bg-[#0a0a0a]">
                        <div className="space-y-6 font-mono text-xs">
                            {/* The Grid Visualization */}
                            <div className="bg-black border border-neutral-800 p-4 font-mono text-[10px] md:text-xs leading-relaxed text-neutral-600 overflow-hidden relative">
                                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-green-500/50 shadow-[0_0_10px_rgba(74,222,128,0.5)] animate-scan"></div>
                                {`[ AUD_01   TXT_01   CTX_02   ...   ACT_0A ]
[ AUD_02   TXT_02   CTX_03   ...   ACT_1A ]
[  .        .        .              .     ]
[ VOICE    TEXT     INTENT   ...   EXEC   ] < PARSING
[  .        .        .              .     ]
[ 0xF0     0xF1     0xF2     ...   0xFA   ]`}
                            </div>

                            {/* Status Bars */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-green-400">
                                    <span>UNDERSTANDING</span>
                                    <span>[||||||||||--] 98%</span>
                                </div>
                                <div className="h-2 w-full bg-neutral-900 overflow-hidden">
                                    <div className="h-full bg-green-500/20 w-full relative">
                                        <div className="absolute top-0 left-0 h-full w-[98%] bg-green-500 stripes-bg"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-2 bg-green-900/10 border border-green-900/30 text-green-400 flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-400 animate-pulse"></div>
                                ANALYZING CONVERSATION VECTOR...
                            </div>
                        </div>
                    </AsciiBorder>
                </div>
            </div>
        </section>
    );
};

export default Hero;
