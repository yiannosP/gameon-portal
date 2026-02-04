'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Trophy, UserCircle, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-white text-xl">
          <Trophy className="h-6 w-6 text-blue-500" />
          <span className="tracking-tight">GAME<span className="text-blue-500">ON</span></span>
        </Link>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/football" className="hover:text-blue-400 transition-colors">Football</Link>
          <Link href="/padel" className="hover:text-blue-400 transition-colors">Padel</Link>
          <Link href="/street-soccer" className="hover:text-blue-400 transition-colors">Street Soccer</Link>
          <Link href="/running" className="hover:text-blue-400 transition-colors">Running</Link>
        </div>

        {/* Desktop Login Button (Hidden on Mobile) */}
        <div className="hidden md:flex">
            <Link 
            href="/login"
            className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500 transition-all"
            >
            <UserCircle className="h-4 w-4" />
            Corporate Login
            </Link>
        </div>

        {/* Mobile Menu Button (Visible ONLY on Mobile) */}
        <button 
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 animate-in slide-in-from-top-5">
          <div className="flex flex-col space-y-4 text-lg font-medium text-slate-300">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-white">Home</Link>
            <Link href="/football" onClick={() => setIsOpen(false)} className="hover:text-blue-400">Football</Link>
            <Link href="/padel" onClick={() => setIsOpen(false)} className="hover:text-blue-400">Padel</Link>
            <Link href="/street-soccer" onClick={() => setIsOpen(false)} className="hover:text-blue-400">Street Soccer</Link>
            <Link href="/running" onClick={() => setIsOpen(false)} className="hover:text-blue-400">Running</Link>
            <hr className="border-slate-800" />
            <Link 
              href="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-blue-500 font-bold"
            >
              <UserCircle className="h-5 w-5" />
              Corporate Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}