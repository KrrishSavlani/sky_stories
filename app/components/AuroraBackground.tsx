'use client';

import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface AuroraBackgroundProps {
    children: React.ReactNode;
    className?: string;
}

// 💥 Slower, more deliberate Solar Flare Component
const SolarFlare = () => {
    return (
        <motion.div
            className="absolute z-50 rounded-full bg-gradient-to-r from-yellow-300 via-orange-500 to-red-700 shadow-[0_0_100px_40px_rgba(255,165,0,1)]"
            style={{
                top: '5%',
                left: '5%',
                width: '30px',
                height: '30px',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0, 1, 0.8, 0], // Slower fade-out
                scale: [0, 1.5, 2.5, 3], // Slower, more significant expansion
            }}
            transition={{
                duration: 1.5, // Slower duration
                ease: 'easeOut',
            }}
        />
    );
};

// 🌟 Pulsating Solar Core at Top Left with Rotation
const SolarCMEBubble = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="absolute z-50 rounded-full bg-gradient-to-br from-red-500 via-orange-600 to-yellow-400 shadow-[0_0_40px_20px_rgba(255,100,0,0.8)] cursor-pointer"
            style={{
                width: 80,
                height: 80,
                top: '3%',
                left: '3%',
            }}
            animate={{
                // Removed scale animation, keeping only rotation and opacity pulse
                opacity: [0.7, 1, 0.7],
                rotate: 360,
            }}
            transition={{
                opacity: { duration: 6, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' },
                rotate: { duration: 20, ease: 'linear', repeat: Infinity }, // Slower rotation
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        className="absolute inset-0 rounded-full blur-3xl"
                        style={{
                            background: 'radial-gradient(circle, rgba(255,200,100,0.9) 0%, rgba(255,100,0,0) 70%)',
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 2 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// 🌍 Earth with Protective Shield Component and Rotation
const EarthWithShield = () => {
    return (
        <motion.div
            className="absolute z-40"
            style={{
                bottom: '5%',
                right: '5%',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #2a8bff, #004d99)',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
            }}
            animate={{
                scale: [1, 1.02, 1],
                rotate: 360, // Continuous rotation
            }}
            transition={{
                scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 30, ease: 'linear', repeat: Infinity }, // Slower rotation
            }}
        >
            {/* Protective Shield Layer */}
            <motion.div
                className="absolute inset-[-10px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(135,206,250,0.5) 0%, rgba(135,206,250,0) 70%)',
                    backdropFilter: 'blur(5px)', // Glass-like blur
                    border: '1px solid rgba(255,255,255,0.1)', // Visible border
                }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.6, 0.9, 0.6],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            {/* Some landmass detail (simple blob) */}
            <div className="absolute w-1/3 h-1/4 rounded-full bg-green-700 opacity-70" style={{ top: '20%', left: '15%', transform: 'rotate(20deg)' }} />
            <div className="absolute w-1/4 h-1/5 rounded-full bg-green-700 opacity-70" style={{ bottom: '10%', right: '20%', transform: 'rotate(-30deg)' }} />
        </motion.div>
    );
};

// 💨 Fast-moving particles
const FastParticle = ({ startX, startY, endX, endY, color, size }: { startX: number, startY: number, endX: number, endY: number, color: string, size: string }) => {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <motion.div
            className={`absolute rounded-full bg-gradient-to-r ${color} blur-xl opacity-50 ${size}`}
            style={{
                top: `${startY * 100}%`,
                left: `${startX * 100}%`
            }}
            animate={{
                x: [0, (endX - startX) * windowSize.width],
                y: [0, (endY - startY) * windowSize.height],
                scale: [1, 1.3, 0.9, 1],
                opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 5,
            }}
        />
    );
};

export default function SolarWeatherAurora({ children, className }: AuroraBackgroundProps) {
    const starsRef = useRef<HTMLCanvasElement | null>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [showFlare, setShowFlare] = useState(false);
    const [fastParticles, setFastParticles] = useState([]);

    useEffect(() => {
        const updateSize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    // 🌟 Enhanced Starfield (canvas)
    useEffect(() => {
        const canvas = starsRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let stars: { x: number; y: number; z: number; size: number; opacity: number; speed: number }[] = [];

        const initStars = () => {
            stars = Array.from({ length: 600 }, () => ({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                z: Math.random() * 5,
                size: Math.random() * 1.5,
                opacity: Math.random(),
                speed: 0.1 + Math.random() * 0.4,
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
            const parallaxX = mouseX.get() * 0.003;
            const parallaxY = mouseY.get() * 0.003;

            for (const s of stars) {
                s.y += s.speed * (s.z / 5);
                s.x -= parallaxX * s.z * 2;
                s.y -= parallaxY * s.z * 2;
                if (s.y > window.innerHeight) s.y = 0;
                if (s.x < 0) s.x = window.innerWidth;
                if (s.x > window.innerWidth) s.x = 0;
                s.opacity += (Math.random() - 0.5) * 0.05;
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
    }, [mouseX, mouseY]);

    // 💥 Trigger a solar flare more frequently
    useEffect(() => {
        const flareInterval = setInterval(() => {
            setShowFlare(true);
            const timeout = setTimeout(() => setShowFlare(false), 600);
            return () => clearTimeout(timeout);
        }, 3000); // Trigger a solar flare every 3 seconds

        return () => clearInterval(flareInterval);
    }, []);

    // ☀️ Mouse-based Solar Plasma Parallax
    const plasmaX = useTransform(mouseX, [0, windowSize.width || 1], [-250, 250]);
    const plasmaY = useTransform(mouseY, [0, windowSize.height || 1], [-150, 150]);

    return (
        <div
            className={twMerge('relative min-h-screen overflow-hidden flex items-center justify-center text-white', className)}
            onMouseMove={(e) => {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }}
        >
            {/* BACKGROUND DEEPER SPACE GRADIENT */}
            <motion.div
                className="absolute inset-0 -z-30 bg-gradient-to-b from-[#00001a] via-[#1a0f3d] to-[#0a0020]"
                animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                style={{ backgroundSize: '400% 400%' }}
            />

            {/* SOLAR PLASMA WAVES */}
            <motion.div
                className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-400/30 via-red-600/20 to-transparent blur-3xl opacity-80"
                style={{ x: plasmaX, y: plasmaY }}
                animate={{
                    opacity: [0.6, 0.9, 0.6],
                    scale: [1, 1.1, 1],
                    rotate: [0, 15, -15, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: [0.25, 1, 0.5, 1],
                }}
            />
            <motion.div
                className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-yellow-300/20 via-purple-800/15 to-transparent blur-3xl opacity-70"
                style={{ x: useTransform(mouseX, [0, windowSize.width || 1], [150, -150]), y: useTransform(mouseY, [0, windowSize.height || 1], [90, -90]) }}
                animate={{
                    opacity: [0.7, 1, 0.7],
                    scale: [1, 1.05, 1],
                    rotate: [0, -10, 10, 0],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: [0.25, 1, 0.5, 1],
                    delay: 3,
                }}
            />
            <motion.div
                className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-orange-400/5 to-transparent blur-3xl opacity-50"
                style={{ x: useTransform(mouseX, [0, windowSize.width || 1], [-70, 70]), y: useTransform(mouseY, [0, windowSize.height || 1], [-40, 40]) }}
                animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.1, 1],
                    rotate: [0, 8, -8, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: [0.25, 1, 0.5, 1],
                    delay: 6,
                }}
            />

            {/* STARS & SOLAR FLARES */}
            <canvas ref={starsRef} className="absolute inset-0 -z-10" />
            <AnimatePresence>
                {showFlare && <SolarFlare />}
            </AnimatePresence>
            <SolarCMEBubble />

            {/* EARTH WITH PROTECTIVE SHIELD */}
            <EarthWithShield />

            {/* FAST-MOVING PARTICLES (Coming from top-left, aimed at Earth) */}
            {[
                { startX: 0.05, startY: 0.05, endX: 0.8, endY: 0.8, color: 'from-yellow-200 to-orange-400', size: 'w-16 h-16' },
                { startX: 0.08, startY: 0.08, endX: 0.75, endY: 0.85, color: 'from-pink-300 to-purple-500', size: 'w-12 h-12' },
                { startX: 0.06, startY: 0.06, endX: 0.6, endY: 0.7, color: 'from-blue-200 to-cyan-400', size: 'w-14 h-14' },
                { startX: 0.04, startY: 0.07, endX: 0.7, endY: 0.75, color: 'from-red-300 to-orange-500', size: 'w-18 h-18' },
                { startX: 0.07, startY: 0.04, endX: 0.65, endY: 0.8, color: 'from-green-200 to-teal-400', size: 'w-10 h-10' },
            ].map((orb, i) => (
                <FastParticle key={i} {...orb} />
            ))}

            {/* CONTENT */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full w-full text-center">
                {children}
            </div>
        </div>
    );
}