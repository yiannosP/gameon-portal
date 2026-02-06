'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Trophy, UserCircle } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  // 1. Check Login Status
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setLoggedIn(!!session)
    }
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // 2. Define your menu links here
  const navItems = [
    { name: 'Tournaments', href: '#' },
    { name: 'Leagues', href: '#' },
    { name: 'About', href: '#' },
  ]

  return (
    <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors">
          <Trophy className="h-6 w-6" />
          <span className="text-xl font-bold tracking-tight text-white">GameOn</span>
        </Link>

        {/* DESKTOP MENU (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}

          {/* Dynamic Dashboard Button */}
          {loggedIn ? (
            <Link 
              href="/dashboard" 
              className="flex items-center gap-2 rounded-full bg-blue-600/10 px-4 py-2 text-sm font-semibold text-blue-500 hover:bg-blue-600/20 transition-all"
            >
              <UserCircle className="h-4 w-4" />
              Dashboard
            </Link>
          ) : (
            <Link 
              href="/login" 
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-all"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON (Visible on Mobile) */}
        <button 
          className="md:hidden text-slate-400 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block text-base font-medium text-slate-400 hover:text-white"
              onClick={() => setIsOpen(false)} // Close menu when clicked
            >
              {item.name}
            </Link>
          ))}
          
          {/* Mobile Auth Button */}
          <div className="pt-4 border-t border-slate-800">
            {loggedIn ? (
              <Link 
                href="/dashboard"
                className="flex items-center gap-2 w-full justify-center rounded-lg bg-blue-600/10 py-3 text-blue-500 font-bold"
                onClick={() => setIsOpen(false)}
              >
                <UserCircle className="h-5 w-5" />
                Go to Dashboard
              </Link>
            ) : (
              <Link 
                href="/login"
                className="block w-full rounded-lg bg-blue-600 py-3 text-center font-bold text-white hover:bg-blue-500"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}