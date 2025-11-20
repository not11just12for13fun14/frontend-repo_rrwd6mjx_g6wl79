import { useEffect, useState } from 'react'

export default function GoogleConnect() {
  const [status, setStatus] = useState({ authenticated: false, loading: true })
  const backend = import.meta.env.VITE_BACKEND_URL || ''

  async function check() {
    try {
      const res = await fetch(`${backend}/auth/status`)
      const data = await res.json()
      setStatus({ authenticated: !!data.authenticated, loading: false })
    } catch (e) {
      setStatus({ authenticated: false, loading: false })
    }
  }

  useEffect(() => { check() }, [])

  const connect = () => {
    window.open(`${backend}/auth/google/login`, '_blank', 'noopener,noreferrer')
  }

  const logout = async () => {
    try {
      await fetch(`${backend}/auth/logout`, { method: 'POST' })
      check()
    } catch {}
  }

  return (
    <div className="flex items-center justify-between gap-3 bg-slate-800/50 border border-blue-500/20 rounded-xl p-3">
      <div className="text-sm">
        {status.loading ? (
          <span className="text-blue-200">Checking Google connection…</span>
        ) : status.authenticated ? (
          <span className="text-emerald-300">Connected to Google ✅</span>
        ) : (
          <span className="text-yellow-300">Not connected to Google</span>
        )}
      </div>
      <div className="flex gap-2">
        {!status.loading && !status.authenticated && (
          <button onClick={connect} className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium">Connect Google</button>
        )}
        {!status.loading && status.authenticated && (
          <button onClick={logout} className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm">Disconnect</button>
        )}
      </div>
    </div>
  )
}
