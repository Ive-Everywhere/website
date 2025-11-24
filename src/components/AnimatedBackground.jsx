import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
                className="absolute -inset-[100%] opacity-30"
                style={{
                    background: "radial-gradient(circle, rgba(74,222,128,0.05) 0%, rgba(0,0,0,0) 50%)",
                }}
                animate={{
                    x: [0, 100, 0],
                    y: [0, -100, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                }}
            />
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>
        </div>
    );
};

export default AnimatedBackground;
