'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterCard from './CharacterCard';

interface Character {
  id: string;
  name: string;
  emoji: string;
  avatar: string;
  story: string;
  color: string;
}

const characters: Character[] = [
  {
    id: 'farmer',
    name: '👩‍🌾 Farmer Sarah',
    emoji: '🌾',
    avatar: '/images/farmer.svg',
    story: "When space weather hits, my crops can be affected! Solar storms can disrupt GPS systems that help me plant seeds in perfect rows. Sometimes the aurora is so beautiful I can see it from my fields, but I know it means the sun is very active and I should check my weather apps for any alerts.",
    color: 'bg-yellow-500'
  },
  {
    id: 'pilot',
    name: '👨‍✈️ Captain Mike',
    emoji: '✈️',
    avatar: '/images/pilot.svg',
    story: "Space weather is crucial for aviation! Solar storms can disrupt radio communications and GPS navigation. When there's high solar activity, we might need to fly at lower altitudes or take different routes. The aurora is beautiful from up here, but it's also a sign that we need to be extra careful with our navigation systems.",
    color: 'bg-blue-500'
  },
  {
    id: 'astronaut',
    name: '👩‍🚀 Commander Alex',
    emoji: '🚀',
    avatar: '/images/astronaut.svg',
    story: "From space, I can see the sun's activity directly! Solar flares and coronal mass ejections can be dangerous for astronauts. We have special shielding and monitoring systems to protect us. The aurora looks amazing from the International Space Station - it's like watching Earth's magnetic field dance with the solar wind!",
    color: 'bg-purple-500'
  },
  {
    id: 'operator',
    name: '⚡ Grid Operator Lisa',
    emoji: '⚡',
    avatar: '/images/operator.svg',
    story: "Space weather can cause power outages! When solar storms hit Earth's magnetic field, they can create electrical currents in power lines. We monitor space weather forecasts 24/7 and can take protective measures like reducing power flow or switching to backup systems. It's like preparing for a cosmic storm!",
    color: 'bg-orange-500'
  },
  {
    id: 'public',
    name: '🙂 Community Member',
    emoji: '🌟',
    avatar: '/images/public.svg',
    story: "Space weather affects everyone! It can impact our phones, internet, and even cause beautiful auroras. I love watching the northern lights, but I also know they mean the sun is very active. I check space weather apps to know when to expect auroras and when to be prepared for potential disruptions to technology.",
    color: 'bg-green-500'
  }
];

export default function CallUI() {
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentCharacterIndex((prev) => (prev + 1) % characters.length);
      setIsTransitioning(false);
    }, 300);
  };

  const currentCharacter = characters[currentCharacterIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24">
      {/* Call Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          🌟 Space Weather Stories 🌟
        </h1>
        <p className="text-xl text-white/80">
          Hear from different perspectives about how space weather affects our world
        </p>
      </motion.div>

      {/* Character Display */}
      <div className="flex-1 flex items-center justify-center w-full max-w-6xl">
        <AnimatePresence mode="wait">
          <CharacterCard
            key={currentCharacter.id}
            character={currentCharacter}
            isActive={!isTransitioning}
            onNext={handleNext}
          />
        </AnimatePresence>
      </div>

      {/* Progress Indicators */}
      <div className="flex space-x-3 mt-8">
        {characters.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentCharacterIndex ? 'bg-white' : 'bg-white/30'
            }`}
            animate={{
              scale: index === currentCharacterIndex ? 1.2 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>

      {/* Character Counter */}
      <motion.div
        className="mt-4 text-white/60 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {currentCharacterIndex + 1} of {characters.length} perspectives
      </motion.div>
    </div>
  );
}
