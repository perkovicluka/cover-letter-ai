'use client'

import { useContext } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { ThemeContext } from './themeprovider' // adjust the path as needed

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useContext(ThemeContext)

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-20 h-10 flex items-center rounded-full px-1
        transition-all cursor-pointer duration-500
        ${isDark ? 'bg-gradient-to-r from-slate-800 to-slate-900' : 'bg-gradient-to-r from-blue-100 to-blue-300'}
      `}
    >
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden"
        initial={false}
        animate={{
          background: isDark
            ? 'radial-gradient(circle at 70% 30%, #ffffff30, transparent), #0f172a'
            : 'radial-gradient(circle at 30% 0%, #ffffff80, #bae6fd)',
        }}
      />
      <motion.div
        className={`
          z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-md
          ${isDark ? 'bg-purple-400 text-yellow-600' : 'bg-white text-yellow-500'}
        `}
        initial={false}
        animate={{
          x: isDark ? 40 : 0,
          rotate: isDark ? 360 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {isDark ? (
          <Moon size={18} className="text-white" />
        ) : (
          <Sun size={18} className="text-yellow-400" />
        )}
      </motion.div>
    </button>
  )
}
