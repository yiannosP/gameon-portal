import Link from 'next/link'
import { Trophy, UserCircle } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-white text-xl">
          <Trophy className="h-6 w-6 text-blue-500" />
          <span className="tracking-tight">GAME<span className="text-blue-500">ON</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/football" className="hover:text-blue-400 transition-colors">Football</Link>
          <Link href="/padel" className="hover:text-blue-400 transition-colors">Padel</Link>
          <Link href="/street-soccer" className="hover:text-blue-400 transition-colors">Street Soccer</Link>
          <Link href="/running" className="hover:text-blue-400 transition-colors">Running</Link>
        </div>

        {/* Login Button */}
        <Link 
          href="/login"
          className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500 transition-all"
        >
          <UserCircle className="h-4 w-4" />
          Corporate Login
        </Link>
      </div>
    </nav>
  )
}