'use client';

import { motion } from 'framer-motion';

interface AuroraBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function AuroraBackground({ children, className = '' }: AuroraBackgroundProps) {
  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 aurora-bg opacity-20" />
      
      {/* Floating cosmic elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-purple-500 rounded-full opacity-30"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 bg-pink-500 rounded-full opacity-25"
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <motion.div
        className="absolute bottom-40 left-1/4 w-12 h-12 bg-blue-500 rounded-full opacity-35"
        animate={{
          y: [0, -25, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <motion.div
        className="absolute top-1/2 right-1/3 w-14 h-14 bg-green-500 rounded-full opacity-30"
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
