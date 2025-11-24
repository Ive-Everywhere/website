import React from 'react';

const SectionLabel = ({ text, invert = false }) => (
    <div className={`inline-block px-1 border-b-2 border-current font-mono text-sm tracking-widest uppercase mb-6 ${invert ? 'text-black border-black' : 'text-green-400 border-green-400'}`}>
    // {text}
    </div>
);

export default SectionLabel;
