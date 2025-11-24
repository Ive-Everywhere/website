import React from 'react';
import SectionLabel from './SectionLabel';
import Reveal from './Reveal';

const TechStack = () => (
    <section className="bg-[#050505] py-24 px-6 text-white font-mono min-h-[600px] flex flex-col justify-center">
        <div className="max-w-5xl mx-auto">
            <Reveal>
                <SectionLabel text="Knowledge_Graph" />

                <div className="bg-[#0a0a0a] border border-neutral-800 p-8 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        {/* Text Description */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Semantic Memory</h3>
                            <p className="text-neutral-400 mb-8">
                                Uncovering connections between people, topics, and meetings. Ive builds a rich "life recommendation" system based on your history.
                            </p>

                            <div className="space-y-4 text-xs">
                                <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                                    <span>PEOPLE</span>
                                    <span className="text-blue-400">0x00 - 0x4F</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                                    <span>TOPICS</span>
                                    <span className="text-purple-400">0x50 - 0x9F</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                                    <span>ACTION ITEMS</span>
                                    <span className="text-pink-400">0xA0 - 0xFF</span>
                                </div>
                            </div>
                        </div>

                        {/* The Blue Memory Blocks */}
                        <div className="font-mono text-sm">
                            <div className="text-neutral-500 mb-2 text-xs">* DATA STRUCTURES:</div>

                            <div className="grid grid-cols-2 gap-2">
                                {['Meetings', 'Todos', 'Preferences', 'Drawings'].map((tech, i) => (
                                    <div key={i} className="bg-blue-300 text-black p-4 text-center border border-blue-400 hover:bg-blue-200 transition-colors cursor-default">
                                        <div className="text-[10px] opacity-60 mb-1">NODE[{i}]</div>
                                        <div className="font-bold">{tech}</div>
                                        <div className="text-[10px] tracking-widest mt-1">16B</div>
                                    </div>
                                ))}
                            </div>

                            <div className="my-2 border-t border-dashed border-neutral-700"></div>

                            <div className="grid grid-cols-2 gap-2">
                                {['Maps', 'Calendar', 'Web', 'Apps'].map((tech, i) => (
                                    <div key={i} className="bg-neutral-800 text-neutral-400 p-4 text-center border border-neutral-700 hover:text-white transition-colors">
                                        <div className="text-[10px] opacity-40 mb-1">TOOL[{i + 4}]</div>
                                        <div className="font-bold">{tech}</div>
                                        <div className="text-[10px] tracking-widest mt-1">API</div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
    </section>
);
export default TechStack;
