import React from 'react';

const AsciiBorder = ({ children, className = "", title = "", borderStyle = "dashed" }) => (
    <div className={`relative border-2 border-${borderStyle} border-neutral-700 p-6 ${className} font-mono group hover:border-neutral-500 transition-colors`}>
        {/* Corner Decorations (ASCII style +) */}
        <div className="absolute -top-[2px] -left-[2px] text-neutral-500 bg-black z-10">+</div>
        <div className="absolute -top-[2px] -right-[2px] text-neutral-500 bg-black z-10">+</div>
        <div className="absolute -bottom-[2px] -left-[2px] text-neutral-500 bg-black z-10">+</div>
        <div className="absolute -bottom-[2px] -right-[2px] text-neutral-500 bg-black z-10">+</div>

        {title && (
            <div className="absolute -top-3 left-4 bg-black px-2 text-xs font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 animate-pulse rounded-full"></span>
                [{title}]
            </div>
        )}
        {children}
    </div>
);

export default AsciiBorder;
