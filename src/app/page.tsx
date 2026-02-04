import Navbar from '@/components/Navbar'
import { supabase } from '@/lib/supabaseClient'
import { Trophy, Users, Calendar, Activity } from 'lucide-react'
import Link from 'next/link'

// 1. We define exactly what a "Company" looks like to fix the 'any' error
interface Company {
  company_name: string;
  corporate_score: number;
  logo_url: string | null;
}

// 2. We tell TypeScript that this function returns a list of Companies
async function getLeaderboard(): Promise<Company[]> {
  const { data } = await supabase
    .from('profiles')
    .select('company_name, corporate_score, logo_url')
    .order('corporate_score', { ascending: false })
    .limit(3)
  
  // Cast the data to our type
  return (data as any[]) || []
}

export default async function Home() {
  const leaderboard = await getLeaderboard()

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6">
            The Home of <span className="text-blue-500">Corporate Sports</span> in Cyprus
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400 mb-10">
            Join the elite network of companies competing in Football, Padel, and Running events. 
            Connect, compete, and build your corporate legacy.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register" className="rounded-full bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-500 transition-all">
              Join the Network
            </Link>
            <Link href="/tournaments" className="rounded-full border border-slate-700 px-8 py-3 font-bold text-slate-300 hover:bg-slate-800 transition-all">
              View Tournaments
            </Link>
          </div>
        </div>
      </section>

      {/* Live Ticker Mockup */}
      <div className="w-full bg-blue-900/20 border-y border-blue-900/50 py-3 overflow-hidden">
        <div className="container mx-auto px-4 flex gap-8 text-sm font-mono text-blue-200 whitespace-nowrap overflow-x-auto no-scrollbar">
          <span>⚽ PwC 3 - 2 Deloitte</span>
          <span>🎾 KPMG 2 - 0 Exness (Padel)</span>
          <span>⚽ Wargaming 1 - 1 Amdocs</span>
          <span>🏃‍♂️ Running: Next event in 3 days</span>
        </div>
      </div>

      {/* Sports Grid */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Sports Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Football', icon: Trophy, color: 'text-green-400' },
            { name: 'Padel', icon: Activity, color: 'text-yellow-400' },
            { name: 'Street Soccer', icon: Users, color: 'text-orange-400' },
            { name: 'Running', icon: Calendar, color: 'text-cyan-400' },
          ].map((sport) => (
            <div key={sport.name} className="group p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all cursor-pointer">
              <sport.icon className={`h-10 w-10 ${sport.color} mb-4`} />
              <h3 className="text-xl font-bold mb-2">{sport.name}</h3>
              <p className="text-slate-400 text-sm">Join the league and compete against top companies.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Leaderboard */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Top Corporate Teams</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {leaderboard.length > 0 ? (
              leaderboard.map((company, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-slate-500">#{index + 1}</span>
                    <div>
                      <h3 className="font-bold text-lg">{company.company_name}</h3>
                      <p className="text-xs text-slate-400">Premium Member</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-2xl font-bold text-blue-400">{company.corporate_score}</span>
                    <span className="text-xs text-slate-500">PTS</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-8 border border-dashed border-slate-700 rounded-xl text-slate-500">
                Season starting soon. Be the first to join the leaderboard!
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}