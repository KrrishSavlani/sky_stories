'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AuroraBackground from './components/AuroraBackground';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <AuroraBackground>
      {/*<Navbar currentPage="home" />*/}
      
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        {/* Hero Section */}
        <motion.div
          className="text-center max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            🌟 SkyStories 🌟
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            className="text-2xl md:text-3xl text-white/90 mb-8 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Adventures of the Sun and Space Weather
          </motion.p>
          
          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Join us on an exciting journey through space weather! Meet farmers, pilots, astronauts, 
            power grid operators, and community members as they share their unique perspectives 
            on how the sun's activity affects our daily lives.
          </motion.p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/story">
              <motion.button
                className="px-12 py-6 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white text-2xl font-bold rounded-full shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 glow-effect"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start the Story 🌞
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Features Preview */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-white mb-2">Multiple Perspectives</h3>
            <p className="text-white/70">Hear from different characters about space weather</p>
          </motion.div>
          
          <motion.div
            className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-white mb-2">Interactive Stories</h3>
            <p className="text-white/70">Engaging call-based UI with smooth animations</p>
          </motion.div>
          
          <motion.div
            className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-4xl mb-4">🌌</div>
            <h3 className="text-xl font-semibold text-white mb-2">Cosmic Theme</h3>
            <p className="text-white/70">Beautiful aurora backgrounds and space aesthetics</p>
          </motion.div>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}
