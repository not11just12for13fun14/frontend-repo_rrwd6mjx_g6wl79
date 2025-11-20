import { useState } from 'react'

export default function StudentForm({ onSaved }) {
  const [name, setName] = useState('')
  const [klass, setKlass] = useState('')
  const [rollno, setRollno] = useState('')
  const [subject, setSubject] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || ''

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!name || !klass || !rollno || !subject) {
      setError('Please fill all fields')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${backend}/api/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, class: klass, rollno, subject })
      })
      if (!res.ok) throw new Error(await res.text())
      setName('')
      setKlass('')
      setRollno('')
      setSubject('')
      onSaved && onSaved()
    } catch (err) {
      setError('Failed to save. Ensure backend is configured with Google credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input className="px-4 py-3 rounded-lg bg-slate-900/50 border border-blue-500/30 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="px-4 py-3 rounded-lg bg-slate-900/50 border border-blue-500/30 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Class" value={klass} onChange={e=>setKlass(e.target.value)} />
        <input className="px-4 py-3 rounded-lg bg-slate-900/50 border border-blue-500/30 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Roll No" value={rollno} onChange={e=>setRollno(e.target.value)} />
        <input className="px-4 py-3 rounded-lg bg-slate-900/50 border border-blue-500/30 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Subject" value={subject} onChange={e=>setSubject(e.target.value)} />
      </div>
      {error && <div className="text-red-400 text-sm">{error}</div>}
      <button disabled={loading} className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg transition disabled:opacity-60">
        {loading ? 'Saving...' : 'Save to Google Drive'}
      </button>
    </form>
  )
}
