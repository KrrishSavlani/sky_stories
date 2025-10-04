'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Character {
  id: string;
  name: string;
  emoji: string;
  avatar: string;
  description: string;
  color: string;
}

interface CharacterSelectionProps {
  onSelectCharacter: (character: Character) => void;
}

const characters: Character[] = [
  {
    id: 'farmer',
    name: '👩‍🌾 Farmer Sarah',
    emoji: '🌾',
    avatar: '/images/farmer.svg',
    description: 'Learn how space weather affects agriculture and GPS farming',
    color: 'bg-gradient-to-br from-amber-600 to-orange-700'
  },
  {
    id: 'pilot',
    name: '👨‍✈️ Captain Mike',
    emoji: '✈️',
    avatar: '/images/pilot.svg',
    description: 'Discover aviation challenges during solar storms',
    color: 'bg-gradient-to-br from-blue-600 to-indigo-700'
  },
  {
    id: 'astronaut',
    name: '👩‍🚀 Commander Alex',
    emoji: '🚀',
    avatar: '/images/astronaut.svg',
    description: 'Experience space weather from an astronaut\'s perspective',
    color: 'bg-gradient-to-br from-purple-600 to-violet-700'
  },
  {
    id: 'operator',
    name: '⚡ Grid Operator Lisa',
    emoji: '⚡',
    avatar: '/images/operator.svg',
    description: 'Understand power grid protection during space weather',
    color: 'bg-gradient-to-br from-red-600 to-pink-700'
  },
  {
    id: 'public',
    name: '🙂 Community Member',
    emoji: '🌟',
    avatar: '/images/public.svg',
    description: 'See how space weather impacts daily life',
    color: 'bg-gradient-to-br from-emerald-600 to-teal-700'
  }
];

export default function CharacterSelection({ onSelectCharacter }: CharacterSelectionProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          🌟 Choose Your Perspective 🌟
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Select a character to hear their unique story about space weather and how it affects their world
        </p>
      </motion.div>

      {/* Character Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {characters.map((character, index) => (
          <motion.div
            key={character.id}
            className={`${character.color} rounded-2xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg border border-white/20`}
            onClick={() => onSelectCharacter(character)}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            {/* Character Avatar */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-4 relative">
                <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Image
                    src={character.avatar}
                    alt={character.name}
                    width={80}
                    height={80}
                    className="w-20 h-20"
                  />
                </div>
                <div className="absolute -top-2 -right-2 text-3xl drop-shadow-lg">
                  {character.emoji}
                </div>
              </div>
              
              {/* Character Name */}
              <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">
                {character.name}
              </h3>
              
              {/* Description */}
              <p className="text-white/95 text-sm leading-relaxed mb-4 drop-shadow-sm">
                {character.description}
              </p>
              
              {/* Select Button */}
              <motion.div
                className="px-6 py-3 bg-white/25 backdrop-blur-sm rounded-full text-white font-semibold text-sm shadow-lg border border-white/30"
                whileHover={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  scale: 1.05
                }}
                transition={{ duration: 0.2 }}
              >
                Select & Chat →
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Back Button */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.button
          className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.history.back()}
        >
          ← Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
}
