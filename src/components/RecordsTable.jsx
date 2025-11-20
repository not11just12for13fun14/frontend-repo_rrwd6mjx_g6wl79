import { useEffect, useState } from 'react'

export default function RecordsTable({ refreshSignal }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const backend = import.meta.env.VITE_BACKEND_URL || ''

  async function load() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${backend}/api/records`)
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) {
      setError('Failed to fetch. Ensure backend is configured and accessible.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [refreshSignal])

  if (loading) return <div className="text-blue-200">Loading records...</div>
  if (error) return <div className="text-red-400">{error}</div>

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-blue-100">
        <thead>
          <tr className="text-blue-300">
            <th className="py-2 pr-4">Name</th>
            <th className="py-2 pr-4">Class</th>
            <th className="py-2 pr-4">Roll No</th>
            <th className="py-2 pr-4">Subject</th>
            <th className="py-2 pr-4">Saved At</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr><td className="py-3" colSpan={5}>No records yet.</td></tr>
          )}
          {items.map((r, idx) => (
            <tr key={idx} className="border-t border-blue-500/10">
              <td className="py-2 pr-4">{r.name}</td>
              <td className="py-2 pr-4">{r.class}</td>
              <td className="py-2 pr-4">{r.rollno}</td>
              <td className="py-2 pr-4">{r.subject}</td>
              <td className="py-2 pr-4 text-blue-300/70">{r.saved_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
