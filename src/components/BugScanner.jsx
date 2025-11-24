import React from 'react';
import Reveal from './Reveal';

const BugScanner = () => (
    <section className="bg-[#111] py-24 px-6 font-mono border-b border-neutral-900 flex flex-col justify-center items-center min-h-[600px]">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            {/* Left Column: Text & Legend */}
            <div className="flex flex-col justify-between h-full">
                <Reveal>
                    <div className="mb-12">
                        <p className="text-white text-xl md:text-2xl leading-relaxed mb-8">
                            Ive's on-device intelligence far exceeds standard voice assistants by processing context locally. It scans your daily conversations to surface actionable items instantly.
                        </p>

                        <button className="bg-pink-300 text-black px-4 py-1 font-bold uppercase text-sm hover:bg-pink-200 transition-colors flex items-center gap-2 w-fit">
                            <span className="tracking-tighter">——</span> INSTALL <span className="tracking-tighter">——&gt;</span> IVE.APP
                        </button>
                    </div>
                </Reveal>

                <Reveal delay={0.2}>
                    <div className="flex items-end gap-8">
                        <div className="flex flex-col gap-1">
                            <div className="text-neutral-500 font-bold text-xs tracking-widest uppercase flex gap-2">
                                <span className="opacity-30">//</span> CIRCULAR
                            </div>
                            <div className="text-neutral-500 font-bold text-xs tracking-widest uppercase flex gap-2">
                                <span className="opacity-30">//</span> THROBBER
                            </div>
                            <div className="text-neutral-500 font-bold text-xs tracking-widest uppercase flex gap-2">
                                <span className="opacity-30">//</span> VIEW
                            </div>
                        </div>

                        {/* Small Square with Dot */}
                        <div className="w-24 h-24 border border-dashed border-neutral-600 relative flex items-center justify-center">
                            <div className="w-1 h-1 bg-pink-300"></div>
                            {/* Corner ticks */}
                            <div className="absolute top-2 left-0 w-1 h-[1px] bg-neutral-600"></div>
                            <div className="absolute top-4 left-0 w-1 h-[1px] bg-neutral-600"></div>
                            <div className="absolute bottom-2 left-0 w-1 h-[1px] bg-neutral-600"></div>
                            <div className="absolute bottom-4 left-0 w-1 h-[1px] bg-neutral-600"></div>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Right Column: The Visual */}
            <Reveal delay={0.4}>
                <div className="relative p-4">
                    {/* Outer Dashed Border */}
                    <div className="absolute inset-0 border-2 border-dashed border-neutral-700 pointer-events-none"></div>

                    {/* Workflow Diagram */}
                    <div className="bg-[#111] w-full p-8 relative">
                        {/* Title */}
                        <div className="text-pink-300 font-bold text-xs mb-8 tracking-widest uppercase">
                            TASK_DETECTION.FLOW
                        </div>

                        {/* Workflow Steps */}
                        <div className="space-y-4">
                            {/* Step 1: Input */}
                            <div className="flex items-center gap-4">
                                <div className="bg-pink-300 text-black px-4 py-2 font-bold text-sm min-w-[140px] text-center">
                                    01_LISTEN
                                </div>
                                <div className="flex-1 border-t-2 border-dashed border-pink-300/50"></div>
                                <div className="text-neutral-500 text-xs">AUDIO</div>
                            </div>

                            {/* Arrow Down */}
                            <div className="flex items-center ml-16">
                                <div className="text-pink-300 text-xl">↓</div>
                            </div>

                            {/* Step 2: Process */}
                            <div className="flex items-center gap-4">
                                <div className="bg-pink-200 text-black px-4 py-2 font-bold text-sm min-w-[140px] text-center">
                                    02_ANALYZE
                                </div>
                                <div className="flex-1 border-t-2 border-dashed border-pink-200/50"></div>
                                <div className="text-neutral-500 text-xs">INTENT</div>
                            </div>

                            {/* Arrow Down */}
                            <div className="flex items-center ml-16">
                                <div className="text-pink-300 text-xl">↓</div>
                            </div>

                            {/* Step 3: Detect */}
                            <div className="flex items-center gap-4">
                                <div className="bg-pink-400 text-black px-4 py-2 font-bold text-sm min-w-[140px] text-center border-2 border-white">
                                    03_EXTRACT
                                </div>
                                <div className="flex-1 border-t-2 border-dashed border-pink-400/50"></div>
                                <div className="text-neutral-500 text-xs">TASK</div>
                            </div>

                            {/* Arrow Down */}
                            <div className="flex items-center ml-16">
                                <div className="text-pink-300 text-xl">↓</div>
                            </div>

                            {/* Step 4: Execute */}
                            <div className="flex items-center gap-4">
                                <div className="bg-pink-300 text-black px-4 py-2 font-bold text-sm min-w-[140px] text-center animate-pulse">
                                    04_EXECUTE
                                </div>
                                <div className="flex-1 border-t-2 border-dashed border-pink-300/50"></div>
                                <div className="text-pink-300 text-xs font-bold">&gt; RUN</div>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="mt-8 bg-pink-900/20 border border-pink-900/50 text-pink-300 px-3 py-2 text-xs font-mono flex items-center gap-2">
                            <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse"></div>
                            PROCESSING: 24ms LATENCY
                        </div>

                        {/* Side Ticks */}
                        <div className="absolute right-[-10px] top-0 bottom-0 flex flex-col justify-between py-2">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="w-[2px] h-2 bg-neutral-700"></div>
                            ))}
                        </div>
                        <div className="absolute left-[-10px] top-0 bottom-0 flex flex-col justify-between py-2">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="w-[2px] h-2 bg-neutral-700"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </Reveal>

        </div>
    </section>
);
export default BugScanner;
