'use client'

import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useState } from 'react'
import { Building2, Mail, User, Lock, ArrowRight, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate registration delay
    setTimeout(() => {
      setLoading(false)
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-slate-900 p-8 shadow-xl border border-slate-800">
          
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/20 text-blue-500">
              <Building2 className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Company Registration
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Join the Corporate Sports League today.
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleRegister}>
            {/* Company Name */}
            <div>
              <label htmlFor="company" className="sr-only">Company Name</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Building2 className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="company"
                  type="text"
                  required
                  className="block w-full rounded-lg border border-slate-700 bg-slate-950 py-3 pl-10 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Company Name (e.g. Acme Corp)"
                />
              </div>
            </div>

            {/* Rep Name */}
            <div>
              <label htmlFor="name" className="sr-only">Representative Name</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  className="block w-full rounded-lg border border-slate-700 bg-slate-950 py-3 pl-10 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Representative Name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="sr-only">Work Email</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  className="block w-full rounded-lg border border-slate-700 bg-slate-950 py-3 pl-10 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="work@company.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  className="block w-full rounded-lg border border-slate-700 bg-slate-950 py-3 pl-10 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-500 transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="text-center text-sm">
            <Link href="/login" className="font-medium text-slate-400 hover:text-white flex items-center justify-center gap-1">
              Already have an account? <span className="text-blue-500">Sign in</span> <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}