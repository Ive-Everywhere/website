import React from 'react';

const Contracting = () => (
    <section className="bg-[#eaeaea] py-24 px-6 text-black font-mono border-b border-black min-h-[600px] flex flex-col justify-center">
        <div className="max-w-4xl mx-auto">
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
            <div className="w-full overflow-x-auto">
                <div className="min-w-[600px] border-2 border-dashed border-black bg-[#eaeaea] p-1">
                    {/* Header */}
                    <div className="grid grid-cols-4 border-b-2 border-dashed border-black py-4 px-4 font-bold text-xs md:text-sm uppercase tracking-wider">
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
                        <div key={i} className="grid grid-cols-4 border-b border-dashed border-black/30 py-4 px-4 text-sm group hover:bg-white transition-colors">
                            <div className="col-span-2 font-bold flex flex-col justify-center">
                                <div className="flex items-center gap-2">
                                    <span className="opacity-30">//</span> {row.name}
                                </div>
                                <div className="text-xs font-normal text-neutral-500 pl-6">{row.desc}</div>
                            </div>
                            <div className="border-l-2 border-dashed border-black pl-4 flex items-center">
                                {row.dur}
                            </div>
                            <div className="border-l-2 border-dashed border-black pl-4 flex items-center p-1">
                                <div className={`w-full text-center py-1 border border-black text-xs font-bold ${row.color}`}>
                                    {row.avail}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default Contracting;
