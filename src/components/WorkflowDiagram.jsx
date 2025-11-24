import React from 'react';
import Reveal from './Reveal';

const WorkflowDiagram = () => (
    <section className="bg-[#8bb8e8] py-24 px-6 text-black border-y border-black relative overflow-hidden min-h-[600px] flex flex-col justify-center">
        <div className="absolute inset-0 opacity-10"
            style={{
                backgroundImage: 'radial-gradient(black 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                animation: 'dotFloat 15s ease-in-out infinite'
            }}>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
            <Reveal>
                <div className="mb-12 text-center">
                    <span className="bg-black text-[#8bb8e8] px-3 py-1 font-mono font-bold uppercase tracking-widest text-sm inline-block mb-4">
                        Autonomous Actions
                    </span>
                    <h2 className="text-4xl md:text-5xl font-mono font-bold">The Proactive Loop.</h2>
                </div>
            </Reveal>

            {/* The ASCII Flowchart Recreated */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center justify-items-center font-mono text-sm font-bold mt-16">

                {/* Step 1 */}
                <Reveal delay={0.2}>
                    <div className="relative group">
                        <div className="border-2 border-black border-dashed p-6 bg-[#8bb8e8] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10 w-64 text-center">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8bb8e8] px-2 text-xs">01</div>
                            <div className="mb-2 text-2xl mb-4">HEAR</div>
                            <div className="text-xs font-normal opacity-80 border-t border-black pt-2">
                                AUDIO -&gt; TRANSCRIPT
                            </div>
                        </div>
                        {/* Arrow */}
                        <div className="hidden lg:block absolute -right-12 top-1/2 -translate-y-1/2 w-8 border-t-2 border-black border-dashed"></div>
                        <div className="hidden lg:block absolute -right-12 top-1/2 -translate-y-1/2 text-lg translate-x-6">&gt;</div>
                    </div>
                </Reveal>

                {/* Step 2 */}
                <Reveal delay={0.4}>
                    <div className="relative group">
                        <div className="flex flex-col gap-4 items-center">
                            <div className="h-12 w-[2px] bg-black border-l-2 border-dashed border-black"></div>
                            <div className="border-2 border-black p-6 bg-white w-64 text-center z-20">
                                <div className="mb-2 text-2xl">CONTEXT</div>
                                <div className="text-xs font-normal opacity-80 border-t border-black pt-2">
                                    INTENT -&gt; PLAN
                                </div>
                            </div>
                            <div className="h-12 w-[2px] bg-black border-l-2 border-dashed border-black"></div>
                        </div>
                        {/* Arrow */}
                        <div className="hidden lg:block absolute -right-12 top-1/2 -translate-y-1/2 w-8 border-t-2 border-black border-dashed"></div>
                        <div className="hidden lg:block absolute -right-12 top-1/2 -translate-y-1/2 text-lg translate-x-6">&gt;</div>
                    </div>
                </Reveal>

                {/* Step 3 */}
                <Reveal delay={0.6}>
                    <div className="flex flex-col gap-4">
                        <div className="border-2 border-black border-dashed p-4 bg-[#8bb8e8] text-center w-64 opacity-50">
                            CONFIRM
                        </div>
                        <div className="border-2 border-black p-6 bg-black text-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] w-64 text-center scale-110">
                            <div className="mb-2 text-2xl">EXECUTE</div>
                            <div className="text-xs text-neutral-400 border-t border-neutral-700 pt-2">
                                API -&gt; DONE
                            </div>
                        </div>
                        <div className="border-2 border-black border-dashed p-4 bg-[#8bb8e8] text-center w-64 opacity-50">
                            NOTIFY
                        </div>
                    </div>
                </Reveal>

            </div>
        </div>
    </section>
);
export default WorkflowDiagram;
