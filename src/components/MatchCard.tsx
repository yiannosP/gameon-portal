import { Calendar, Video } from 'lucide-react'

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  status: 'scheduled' | 'live' | 'finished';
  videoUrl?: string | null;
}

export default function MatchCard({ homeTeam, awayTeam, homeScore, awayScore, date, status, videoUrl }: MatchCardProps) {
  const isLive = status === 'live';

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900 p-4 transition-all hover:border-blue-500/50">
      {isLive && (
        <span className="absolute right-2 top-2 animate-pulse rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
          LIVE
        </span>
      )}
      
      <div className="flex items-center justify-between gap-4">
        {/* Home Team */}
        <div className="flex-1 text-right">
          <span className="font-bold text-slate-100">{homeTeam}</span>
        </div>

        {/* Score Board */}
        <div className="flex flex-col items-center min-w-[80px]">
          <div className="flex items-center gap-2 text-2xl font-bold text-white">
            <span>{status === 'scheduled' ? '-' : homeScore}</span>
            <span className="text-slate-600">:</span>
            <span>{status === 'scheduled' ? '-' : awayScore}</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
             {status === 'finished' ? 'FT' : new Date(date).toLocaleDateString()}
          </div>
        </div>

        {/* Away Team */}
        <div className="flex-1 text-left">
          <span className="font-bold text-slate-100">{awayTeam}</span>
        </div>
      </div>

      {/* Footer Actions */}
      {videoUrl && (
        <div className="mt-4 flex justify-center border-t border-slate-800 pt-2">
          <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-medium text-blue-400 hover:text-blue-300">
            <Video className="h-3 w-3" /> Watch Highlights
          </a>
        </div>
      )}
    </div>
  )
}