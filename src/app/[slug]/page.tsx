import Navbar from '@/components/Navbar'
import MatchCard from '@/components/MatchCard'
import { supabase } from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'
import { Trophy, CalendarCheck } from 'lucide-react'

// This ensures the page refreshes data frequently
export const revalidate = 0;

// Update: params is now a Promise in Next.js 15
interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function SportPage({ params }: PageProps) {
  // FIX: We must "await" the params before using them to prevent errors
  const { slug } = await params;

  // 1. Fetch the sport details
  const { data: sport } = await supabase
    .from('sports')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!sport) {
    notFound()
  }

  // 2. Fetch active tournaments for this sport
  const { data: tournaments } = await supabase
    .from('tournaments')
    .select('*, matches(*, home_team:teams!home_team_id(team_name), away_team:teams!away_team_id(team_name))')
    .eq('sport_id', sport.id)
    .eq('status', 'active')
    .order('start_date', { ascending: true })

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      {/* Header */}
      <section className="bg-slate-900 border-b border-slate-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600/20 text-blue-500 ring-1 ring-blue-500/50">
            <Trophy className="h-10 w-10" />
          </div>
          <h1 className="text-4xl font-extrabold capitalize text-white sm:text-5xl">
            {sport.name} <span className="text-blue-500">Hub</span>
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {(!tournaments || tournaments.length === 0) && (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-12 text-center">
            <CalendarCheck className="mx-auto h-12 w-12 text-slate-600 mb-4" />
            <h3 className="text-xl font-bold text-white">No Active Tournaments</h3>
            <p className="text-slate-400 mt-2">The new season for {sport.name} is starting soon!</p>
          </div>
        )}

        {tournaments?.map((tournament: any) => (
          <div key={tournament.id} className="mb-12">
            <h2 className="text-2xl font-bold text-white border-l-4 border-blue-500 pl-4 mb-6">
              {tournament.name}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tournament.matches?.map((match: any) => (
                <MatchCard
                  key={match.id}
                  homeTeam={match.home_team?.team_name || 'TBA'}
                  awayTeam={match.away_team?.team_name || 'TBA'}
                  homeScore={match.home_score}
                  awayScore={match.away_score}
                  date={match.match_date}
                  status={match.status}
                  videoUrl={match.video_url}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}