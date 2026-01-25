import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const Card3D = ({ children, className = '' }) => {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['17.5deg', '-17.5deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-17.5deg', '17.5deg']);

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: 'preserve-3d',
            }}
            className={`relative ${className}`}
        >
            <motion.div
                style={{
                    transform: isHovered ? 'translateZ(50px)' : 'translateZ(0px)',
                    transformStyle: 'preserve-3d',
                }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export const InfiniteCarousel = ({ items, direction = 'left', speed = 'normal' }) => {
    const speedMap = {
        slow: 60,
        normal: 40,
        fast: 20,
    };

    const duration = speedMap[speed];

    return (
        <div className="relative overflow-hidden">
            <motion.div
                className="flex gap-6"
                animate={{
                    x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: duration,
                        ease: 'linear',
                    },
                }}
            >
                {/* Duplicate items for seamless loop */}
                {[...items, ...items].map((item, index) => (
                    <div key={index} className="flex-shrink-0">
                        {item}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};
