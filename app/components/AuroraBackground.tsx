    'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface AuroraBackgroundProps {
    children: React.ReactNode;
    className?: string;
}

// 🌟 Twinkling Stars Component (Canvas-based for performance)
const StarsCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let stars: { x: number; y: number; z: number; size: number; opacity: number; speed: number }[] = [];

        const initStars = () => {
            stars = Array.from({ length: 800 }, () => ({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                z: Math.random() * 5,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random(),
                speed: 0.05 + Math.random() * 0.2,
            }));
        };

        const drawStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const s of stars) {
                const speedMultiplier = s.z / 5;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size * speedMultiplier, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
                ctx.fill();
            }
        };

        const animate = () => {
            for (const s of stars) {
                s.y += s.speed * (s.z / 5);
                if (s.y > window.innerHeight) s.y = 0;
                s.opacity += (Math.random() - 0.5) * 0.03;
                s.opacity = Math.max(0.2, Math.min(1, s.opacity));
            }
            drawStars();
            requestAnimationFrame(animate);
        };

        const resizeHandler = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        resizeHandler();
        animate();
        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, [windowSize.width, windowSize.height]); // Removed mouseX, mouseY dependencies

    return <canvas ref={canvasRef} className="absolute inset-0 -z-10" />;
};


export default function AuroraBackground({ children, className }: AuroraBackgroundProps) {
    // Removed mouseX, mouseY as they are no longer used for aurora interaction
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    console.log("Window size updated:", windowSize);
    useEffect(() => {
        const updateSize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const auroraColors = [
        "rgba(0, 255, 127, 0.7)", // Green (Emerald)
        "rgba(0, 200, 255, 0.6)", // Cyan
        "rgba(100, 0, 255, 0.5)", // Purple
        "rgba(255, 100, 200, 0.4)", // Pink
    ];

    return (
        <div
            className={twMerge('relative min-h-screen overflow-hidden flex items-center justify-center text-white', className)}
            // Removed onMouseMove as it's no longer interactive
        >
            {/* Deep Space Background */}
            <motion.div
                className="absolute inset-0 -z-30 bg-gradient-to-b from-[#00000a] via-[#05001a] to-[#000005]"
                animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                style={{ backgroundSize: '400% 400%' }}
            />

            {/* Stars */}
            <StarsCanvas /> {/* No mouseX, mouseY passed here */}

            {/* Aurora Layers (Waving Curtains - Full Window, Dancing Colors) */}
            <motion.div
                className="absolute w-[200vw] h-[200vh] -z-20 blur-[150px]" // Larger coverage, stronger blur
                initial={{ rotate: 0 }}
                animate={{
                    backgroundColor: [auroraColors[0], auroraColors[1], auroraColors[2], auroraColors[0]], // Color change
                    x: ['-100%', '100%'], // Broad horizontal sway
                    y: ['-50%', '50%'], // Subtle vertical drift
                    rotate: [0, 10, -10, 0], // Gentle rotation
                    scale: [1, 1.1, 1],
                    opacity: [0.6, 0.9, 0.6], // Pulsating opacity
                }}
                transition={{
                    backgroundColor: { duration: 40, repeat: Infinity, ease: 'linear' },
                    x: { duration: 30, repeat: Infinity, ease: 'easeInOut' },
                    y: { duration: 45, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 25, repeat: Infinity, ease: 'easeInOut' },
                    scale: { duration: 35, repeat: Infinity, ease: 'easeInOut' },
                    opacity: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
                }}
                style={{
                    background: `linear-gradient(to bottom, transparent, ${auroraColors[0]}, transparent)`, // Initial gradient
                }}
            />
            <motion.div
                className="absolute w-[220vw] h-[220vh] -z-20 blur-[150px]"
                initial={{ rotate: 30 }}
                animate={{
                    backgroundColor: [auroraColors[1], auroraColors[2], auroraColors[3], auroraColors[1]],
                    x: ['100%', '-100%'],
                    y: ['50%', '-50%'],
                    rotate: [30, -10, 10, 30],
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    backgroundColor: { duration: 45, repeat: Infinity, ease: 'linear', delay: 5 },
                    x: { duration: 35, repeat: Infinity, ease: 'easeInOut', delay: 3 },
                    y: { duration: 40, repeat: Infinity, ease: 'easeInOut', delay: 2 },
                    rotate: { duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 4 },
                    scale: { duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 1 },
                    opacity: { duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 6 },
                }}
                style={{
                    background: `linear-gradient(to top, transparent, ${auroraColors[1]}, transparent)`,
                }}
            />
            <motion.div
                className="absolute w-[180vw] h-[180vh] -z-20 blur-[150px]"
                initial={{ rotate: -15 }}
                animate={{
                    backgroundColor: [auroraColors[2], auroraColors[3], auroraColors[0], auroraColors[2]],
                    x: ['-50%', '50%'],
                    y: ['-25%', '25%'],
                    rotate: [-15, 15, -15],
                    scale: [1, 1.15, 1],
                    opacity: [0.7, 0.95, 0.7],
                }}
                transition={{
                    backgroundColor: { duration: 50, repeat: Infinity, ease: 'linear', delay: 10 },
                    x: { duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 6 },
                    y: { duration: 38, repeat: Infinity, ease: 'easeInOut', delay: 4 },
                    rotate: { duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 8 },
                    scale: { duration: 40, repeat: Infinity, ease: 'easeInOut', delay: 2 },
                    opacity: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 },
                }}
                style={{
                    background: `linear-gradient(to bottom, transparent, ${auroraColors[2]}, transparent)`,
                }}
            />

            {/* CONTENT */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full w-full text-center">
                {children}
            </div>
        </div>
    );
}