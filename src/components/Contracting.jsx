import React from 'react';
import Reveal from './Reveal';

const Contracting = () => (
    <section className="bg-[#eaeaea] py-24 px-6 text-black font-mono border-b border-black min-h-[600px] flex flex-col justify-center">
        <div className="max-w-4xl mx-auto">
            <Reveal>
                <div className="mb-12">
                    <span className="bg-pink-300 px-2 py-1 text-sm font-bold border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        Capabilities
                    </span>
                    <h2 className="mt-6 text-3xl max-w-xl leading-tight font-bold">
                        Ive knows what it can do. It interfaces with your apps to get things done.
                    </h2>
                    <div className="mt-4 bg-black text-white inline-flex items-center gap-2 px-2 py-1 text-xs">
                        <span className="text-green-400">===ACCESS===&gt;</span> GRANTED
                    </div>
                </div>

                {/* The ASCII Table */}
                <div className="w-full">
                    <div className="border-2 border-dashed border-black bg-[#eaeaea] p-1">
                        {/* Header - Hidden on Mobile */}
                        <div className="hidden md:grid grid-cols-4 border-b-2 border-dashed border-black py-4 px-4 font-bold text-xs md:text-sm uppercase tracking-wider">
                            <div className="col-span-2">// INTEGRATION</div>
                            <div className="border-l-2 border-dashed border-black pl-4">PERMISSION</div>
                            <div className="border-l-2 border-dashed border-black pl-4">AUTONOMY</div>
                        </div>

                        {/* Rows */}
                        {[
                            { name: 'Web Search', desc: 'Real-time information retrieval', dur: 'Read/Write', avail: 'High', color: 'bg-pink-200' },
                            { name: 'Local Apps', desc: 'Calendar, Reminders, Notes', dur: 'Read/Write', avail: 'Med', color: 'bg-pink-300' },
                            { name: 'System', desc: 'Flights, Maps, Payments', dur: 'Execute', avail: 'Approval', color: 'bg-pink-400' },
                        ].map((row, i) => (
                            <div key={i} className="flex flex-col md:grid md:grid-cols-4 border-b border-dashed border-black/30 last:border-0 text-sm group hover:bg-white transition-colors">

                                {/* Name & Description */}
                                <div className="col-span-2 p-4 font-bold flex flex-col justify-center">
                                    <div className="flex items-center gap-2">
                                        <span className="opacity-30">//</span> {row.name}
                                    </div>
                                    <div className="text-xs font-normal text-neutral-500 pl-6">{row.desc}</div>
                                </div>

                                {/* Permission */}
                                <div className="border-t border-dashed md:border-t-0 md:border-l-2 border-black p-2 md:pl-4 flex items-center justify-between md:justify-start bg-black/5 md:bg-transparent px-4 md:px-0">
                                    <span className="md:hidden text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Permission:</span>
                                    <span>{row.dur}</span>
                                </div>

                                {/* Autonomy */}
                                <div className="border-t border-dashed md:border-t-0 md:border-l-2 border-black p-2 md:pl-4 flex items-center justify-between md:justify-start p-1 px-4 md:px-1">
                                    <span className="md:hidden text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Autonomy:</span>
                                    <div className={`w-24 md:w-full text-center py-1 border border-black text-xs font-bold ${row.color}`}>
                                        {row.avail}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Reveal>
        </div>
    </section>
);
export default Contracting;
