'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function AuroraBackground({ children }: { children: React.ReactNode }) {
    const starsRef = useRef<HTMLCanvasElement | null>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Track window size for SSR safety
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        // Set window size on mount and resize
        const updateSize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    // 🌟 Twinkling starfield animation
    useEffect(() => {
        const canvas = starsRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let stars: { x: number; y: number; size: number; opacity: number; speed: number }[] = [];

        const initStars = () => {
            stars = Array.from({ length: 150 }, () => ({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 2,
                opacity: Math.random(),
                speed: 0.2 + Math.random() * 0.5,
            }));
        };

        const drawStars = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const s of stars) {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
                ctx.fill();
            }
        };

        const animate = () => {
            for (const s of stars) {
                s.y += s.speed;
                if (s.y > window.innerHeight) s.y = 0;
                s.opacity += (Math.random() - 0.5) * 0.05;
                s.opacity = Math.max(0.2, Math.min(1, s.opacity));
            }
            drawStars();
            requestAnimationFrame(animate);
        };

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        });
    }, []);

    // 🌠 Mouse-based aurora parallax (safe for SSR)
    const auroraX = useTransform(
        mouseX,
        [0, windowSize.width || 1],
        [-50, 50]
    );
    const auroraY = useTransform(
        mouseY,
        [0, windowSize.height || 1],
        [-30, 30]
    );

    return (
        <div
            className="relative min-h-screen overflow-hidden flex items-center justify-center text-white"
            onMouseMove={(e) => {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }}
        >
            {/* BACKGROUND gradient animating slowly */}
            <motion.div
                className="absolute inset-0 -z-30 bg-gradient-to-b from-[#000428] via-[#004e92] to-[#0f2027]"
                animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                style={{ backgroundSize: '400% 400%' }}
            />

            {/* AURORA LIGHT WAVE */}
            <motion.div
                className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-400/30 via-purple-500/20 to-transparent blur-3xl"
                style={{ x: auroraX, y: auroraY }}
                animate={{
                    opacity: [0.4, 0.7, 0.4],
                    rotate: [0, 5, -5, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* MOVING LIGHT BEAM */}
            <motion.div
                className="absolute inset-0 -z-10 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                animate={{
                    rotate: [0, 15, -15, 0],
                    opacity: [0.05, 0.15, 0.05],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* TWINKLING STARS */}
            <canvas ref={starsRef} className="absolute inset-0 -z-10" />

            {/* FLOATING SOLAR PARTICLES */}
            {[
                { top: '15%', left: '10%', color: 'from-yellow-400 to-orange-600', size: 'w-32 h-32' },
                { top: '60%', right: '15%', color: 'from-pink-500 to-purple-600', size: 'w-20 h-20' },
                { bottom: '15%', left: '35%', color: 'from-blue-400 to-cyan-500', size: 'w-24 h-24' },
            ].map((orb, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full bg-gradient-to-r ${orb.color} blur-3xl opacity-40 ${orb.size}`}
                    style={{ top: orb.top, left: orb.left, right: orb.right, bottom: orb.bottom }}
                    animate={{
                        y: [0, 60, -60, 0],
                        x: [0, 40, -40, 0],
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 12 + i * 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 1.5,
                    }}
                />
            ))}

            {/* CONTENT */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}
