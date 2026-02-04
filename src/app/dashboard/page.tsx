import Navbar from '@/components/Navbar'
import { Users, Settings, Trophy, Activity } from 'lucide-react'

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Corporate Dashboard</h1>
        <p className="text-slate-400 mb-8">Manage your teams, view invoices, and update your company profile.</p>

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
              <div className="flex justify-between items-center p-3 bg-slate-950 rounded border border-slate-800">
                <span>🎾 PwC Padel Pro</span>
                <span className="text-xs bg-yellow-900 text-yellow-300 px-2 py-1 rounded">Pending</span>
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
              <button className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-full text-sm font-bold transition-all">
                View Lineup
              </button>
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
              <div className="p-3 bg-slate-950 rounded border border-slate-800 text-center col-span-2">
                <div className="text-xl font-bold text-green-400">#2nd</div>
                <div className="text-xs text-slate-500">League Position</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}