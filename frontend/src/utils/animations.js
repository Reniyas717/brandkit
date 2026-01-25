export const animations = {
    // Scroll-linked animations
    fadeInUp: {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },

    // Stagger children
    staggerContainer: {
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    },

    // Scale and fade
    scaleIn: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },

    // Slide from side
    slideInLeft: {
        initial: { opacity: 0, x: -100 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },

    slideInRight: {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },

    // Rotation entrance
    rotateIn: {
        initial: { opacity: 0, rotate: -10, scale: 0.9 },
        animate: { opacity: 1, rotate: 0, scale: 1 },
        transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },

    // Magnetic hover effect
    magneticHover: {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        transition: { type: 'spring', stiffness: 400, damping: 17 },
    },

    // Floating animation
    floating: {
        animate: {
            y: [0, -20, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        },
    },

    // Pulse animation
    pulse: {
        animate: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        },
    },

    // Absorption animation (for adding to kit)
    absorption: {
        initial: { scale: 1, opacity: 1 },
        animate: { scale: 0, opacity: 0 },
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },

    // Morph transition
    morph: {
        layout: true,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
};

export const easings = {
    easeInOut: [0.25, 0.1, 0.25, 1],
    easeOut: [0, 0, 0.2, 1],
    easeIn: [0.4, 0, 1, 1],
    sharp: [0.4, 0, 0.6, 1],
    spring: { type: 'spring', stiffness: 300, damping: 30 },
};
