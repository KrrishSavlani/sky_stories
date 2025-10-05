'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AuroraBackground from '../components/AuroraBackground';

export default function EndPage() {
  return (
    <AuroraBackground>
      {/*<Navbar currentPage="end" />*/}
      
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Final Message */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="text-8xl mb-6">🌞</div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Space Weather connects us all
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 font-medium">
              Together, we are prepared!
            </p>
          </motion.div>
          
          {/* Summary */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              Through the eyes of farmers, pilots, astronauts, power grid operators, and community members, 
              we&apos;ve seen how space weather touches every aspect of our lives. From GPS navigation to power grids, 
              from beautiful auroras to potential disruptions, the sun&apos;s activity shapes our world in countless ways.
            </p>
          </motion.div>
          
          {/* Key Takeaways */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="text-xl font-semibold text-white mb-2">Global Impact</h3>
              <p className="text-white/70">Space weather affects everyone, everywhere on Earth</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500/20 to-green-500/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
              <div className="text-3xl mb-3">🔬</div>
              <h3 className="text-xl font-semibold text-white mb-2">Scientific Understanding</h3>
              <p className="text-white/70">We&apos;re learning more about space weather every day</p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Preparation</h3>
              <p className="text-white/70">Monitoring and preparation help us stay safe</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-xl font-semibold text-white mb-2">Collaboration</h3>
              <p className="text-white/70">Working together makes us all more resilient</p>
            </div>
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 glow-effect"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🏠 Back to Home
              </motion.button>
            </Link>
            
            <Link href="/story">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 glow-effect"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔄 Play Again
              </motion.button>
            </Link>
          </motion.div>
          
          {/* Footer Message */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p className="text-white/60 text-sm">
              Thank you for exploring space weather with us! 🌟
            </p>
          </motion.div>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}
