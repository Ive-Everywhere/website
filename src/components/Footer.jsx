import React from 'react';
import { Zap } from 'lucide-react';

const Footer = () => (
    <footer className="bg-[#050505] text-white py-24 px-6 font-mono relative overflow-hidden">
        {/* Decorative Grid Lines */}
        <div className="absolute top-0 left-12 h-full w-[1px] bg-neutral-900 dashed-line"></div>
        <div className="absolute top-0 right-12 h-full w-[1px] bg-neutral-900 dashed-line"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-12">Initialize Ive?</h2>

            {/* The Contact "IP Box" */}
            <div className="inline-block relative">
                {/* Top Decor */}
                <div className="flex justify-between text-xs text-neutral-500 mb-2 font-mono">
                    <span>*</span>
                    <span>| DOWNLOAD |</span>
                </div>

                <div className="border-2 border-white p-8 md:p-12 relative bg-neutral-900/50 backdrop-blur-sm">
                    {/* Crosshairs */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white"></div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white"></div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white"></div>

                    <div className="flex flex-col gap-6">
                        <a href="#" className="flex items-center gap-4 text-xl hover:text-green-400 transition-colors group">
                            <Zap size={20} />
                            <span className="group-hover:underline decoration-dashed decoration-2 underline-offset-4">Get Early Access</span>
                        </a>
                        <div className="h-[1px] bg-neutral-700 w-full"></div>
                        <div className="flex justify-center gap-8">
                            <a href="#" className="hover:text-white text-neutral-400 transition-colors">iOS</a>
                            <a href="#" className="hover:text-blue-400 text-neutral-400 transition-colors">watchOS</a>
                        </div>
                    </div>
                </div>

                {/* Bottom Decor */}
                <div className="flex justify-between text-xs text-neutral-500 mt-2 font-mono">
                    <span>+----------------+</span>
                </div>
            </div>

            <div className="mt-24 text-neutral-600 text-xs">
                © 2025 IVE INC. ALL SYSTEMS AUTONOMOUS.
            </div>
        </div>
    </footer>
);

export default Footer;
