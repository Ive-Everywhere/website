import React from 'react';
import Reveal from './Reveal';

const ProjectCaseStudy = () => (
    <section className="flex flex-col md:flex-row border-y border-neutral-800 font-mono min-h-[600px]">
        {/* Left: Problem (Trigger) */}
        <div className="flex-1 bg-[#111] text-white p-12 md:p-24 flex flex-col justify-center relative overflow-hidden group border-b md:border-b-0 md:border-r border-neutral-800">
            <Reveal>
                <div className="text-green-500 text-xs tracking-widest animate-pulse mb-8">
                    &gt; AUDIO_INPUT_DETECTED
                </div>

                <h3 className="text-3xl font-bold mb-6">"I need to fly home today..."</h3>
                <p className="text-neutral-400 leading-relaxed mb-8">
                    User conversation detected. Context: "Home" implies NYC. "Today" implies urgent booking. "Less busy" implies flight selection filter.
                </p>

                <div className="font-mono text-xs bg-green-900/10 border border-green-900 p-4 text-green-400">
                    Log: Trigger "Flight Booking"<br />
                    Params: {`{ dest: 'JFK', time: 'Non-Peak' }`}
                </div>

                {/* Decorative Grid */}
                <div className="absolute top-4 right-4 grid grid-cols-4 gap-1 opacity-20 text-[8px]">
                    {[...Array(16)].map((_, i) => <span key={i}>*</span>)}
                </div>
            </Reveal>
        </div>

        {/* Right: Solution (Action) */}
        <div className="flex-1 bg-[#e5e5e5] text-black p-12 md:p-24 flex flex-col justify-center relative">
            <Reveal delay={0.2}>
                <div className="text-blue-600 text-xs tracking-widest mb-8">
                    ✓ EXECUTING_WORKFLOW
                </div>

                <h3 className="text-3xl font-bold mb-6">Proactive Results</h3>
                <p className="text-neutral-700 leading-relaxed mb-8">
                    Ive automatically creates 3 flight options, checks your calendar for conflicts, and presents them via Live Activity for one-tap approval.
                </p>

                <div className="font-mono text-xs bg-blue-200 border border-blue-400 p-4 text-blue-800">
                    Action: Displayed 3 Options<br />
                    Status: Waiting for User Approval
                </div>

                {/* Decorative Grid */}
                <div className="absolute bottom-4 right-4 grid grid-cols-4 gap-1 opacity-20 text-[8px] text-black">
                    {[...Array(16)].map((_, i) => <span key={i}>+</span>)}
                </div>
            </Reveal>
        </div>
    </section>
);
export default ProjectCaseStudy;
