'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { Users, Trophy, Activity } from 'lucide-react'
import SignOutButton from '@/components/SignOutButton'

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const initDashboard = async () => {
      // 1. Check the local browser session first (Faster & Reliable)
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        // If really no session, kick them out
        router.push('/login')
        return
      }

      // 2. If session exists, get profile
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()
      
      setProfile(data)
      setLoading(false)
    }

    initDashboard()
  }, [router])

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100">
        <Navbar />
        <div className="flex h-[calc(100vh-64px)] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <div className="text-blue-500 font-bold animate-pulse">
              Loading Dashboard...
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
       {/* Mobile-Friendly Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome, {profile?.company_name || 'Company Admin'}
            </h1>
            <p className="text-slate-400">Manage your teams and view stats.</p>
          </div>
          
          {/* Sign Out Button - Visible on Mobile now */}
          <div className="self-start md:self-auto">
            <SignOutButton />
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          
          {/* Card 1: My Teams */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-blue-600/20 text-blue-500">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">My Teams</h3>
                <p className="text-xs text-slate-400">2 Active Squads</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-slate-950 rounded border border-slate-800">
                <span>⚽ PwC All-Stars</span>
                <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded">Active</span>
              </div>
              <button className="w-full mt-2 py-2 text-sm font-bold text-blue-400 hover:text-blue-300 border border-dashed border-slate-700 rounded hover:bg-slate-800">
                + Register New Team
              </button>
            </div>
          </div>

          {/* Card 2: Upcoming Matches */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-purple-600/20 text-purple-500">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Next Match</h3>
                <p className="text-xs text-slate-400">vs Deloitte Strikers</p>
              </div>
            </div>
            <div className="text-center py-6 bg-slate-950 rounded border border-slate-800">
              <div className="text-2xl font-bold mb-1">Feb 14, 20:00</div>
              <div className="text-sm text-slate-400">Nicosia Mini Football</div>
            </div>
          </div>

          {/* Card 3: Stats Overview */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-orange-600/20 text-orange-500">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Performance</h3>
                <p className="text-xs text-slate-400">Season 2024</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-950 rounded border border-slate-800 text-center">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-xs text-slate-500">Wins</div>
              </div>
              <div className="p-3 bg-slate-950 rounded border border-slate-800 text-center">
                <div className="text-2xl font-bold text-white">1</div>
                <div className="text-xs text-slate-500">Loss</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}