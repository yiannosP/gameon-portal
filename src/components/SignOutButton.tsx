'use client'

import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default function SignOutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    // 1. Destroy the session
    await supabase.auth.signOut()
    
    // 2. Force navigation to the Login page immediately
    router.replace('/login') 
    
    // 3. Clear any cached data
    router.refresh()
  }

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all"
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </button>
  )
}