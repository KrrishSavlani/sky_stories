'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface NavbarProps {
  currentPage?: 'home' | 'story' | 'end';
}

export default function Navbar({ currentPage = 'home' }: NavbarProps) {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              className="text-3xl"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              🌟
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                SkyStories
              </h1>
              <p className="text-xs text-white/60">
                Space Weather Adventures
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                currentPage === 'home'
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              Home
            </Link>
            <Link
              href="/story"
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                currentPage === 'story'
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              Story
            </Link>
            <Link
              href="/end"
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                currentPage === 'end'
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              End
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
