'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Character {
  id: string;
  name: string;
  emoji: string;
  avatar: string;
  story: string;
  color: string;
}

interface CharacterCardProps {
  character: Character;
  isActive: boolean;
  onNext: () => void;
}

export default function CharacterCard({ character, isActive, onNext }: CharacterCardProps) {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center space-y-6"
    >
      {/* Character Avatar */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div className={`w-32 h-32 rounded-full ${character.color} p-1 glow-effect`}>
          <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Image
              src={character.avatar}
              alt={character.name}
              width={80}
              height={80}
              className="w-20 h-20"
            />
          </div>
        </div>
        
        {/* Floating emoji */}
        <motion.div
          className="absolute -top-4 -right-4 text-4xl"
          animate={{ 
            y: [0, -5, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {character.emoji}
        </motion.div>
      </motion.div>

      {/* Character Name */}
      <motion.h2
        className="text-3xl font-bold text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {character.name}
      </motion.h2>

      {/* Story Bubble */}
      <motion.div
        className={`relative max-w-2xl mx-auto p-6 rounded-3xl ${character.color} shadow-2xl`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {/* Chat bubble tail */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
          <div className={`w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-${character.color.replace('bg-', '')}`} />
        </div>
        
        <p className="text-white text-lg leading-relaxed text-center font-medium">
          {character.story}
        </p>
      </motion.div>

      {/* Next Button */}
      <motion.button
        onClick={onNext}
        className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 glow-effect"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Next Perspective ➡️
      </motion.button>
    </motion.div>
  );
}
