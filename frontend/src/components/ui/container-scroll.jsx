import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ContainerScroll = ({ titleComponent, children }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
    const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <div
            className="h-[80rem] flex items-center justify-center relative p-4 md:p-20"
            ref={containerRef}
        >
            <div
                className="py-20 md:py-40 w-full relative"
                style={{
                    perspective: "1000px",
                }}
            >
                <Header translate={translate} titleComponent={titleComponent} />
                <Card rotate={rotate} translate={translate} scale={scale}>
                    {children}
                </Card>
            </div>
        </div>
    );
};

export const Header = ({ translate, titleComponent }) => {
    return (
        <motion.div
            style={{
                translateY: translate,
            }}
            className="max-w-5xl mx-auto text-center mb-20"
        >
            {titleComponent}
        </motion.div>
    );
};

export const Card = ({ rotate, scale, children }) => {
    return (
        <motion.div
            style={{
                rotateX: rotate,
                scale,
                boxShadow:
                    "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
            }}
            className="max-w-6xl -mt-12 mx-auto h-[35rem] md:h-[45rem] w-full border-4 border-gray-300 p-3 md:p-6 bg-white rounded-[30px] shadow-2xl"
        >
            <div className="h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white">
                {children}
            </div>
        </motion.div>
    );
};
