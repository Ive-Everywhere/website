import React from 'react';

const GridBackground = () => (
    <div className="absolute inset-0 pointer-events-none opacity-10"
        style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
    </div>
);

export default GridBackground;
