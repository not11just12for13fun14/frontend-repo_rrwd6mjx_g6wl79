import { useState } from 'react'
import StudentForm from './components/StudentForm'
import RecordsTable from './components/RecordsTable'

function App() {
  const [refresh, setRefresh] = useState(0)
  const triggerRefresh = () => setRefresh(r => r + 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative max-w-4xl mx-auto py-12 px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Student Records</h1>
          <p className="text-blue-200">Add entries and save them to a Google Sheet inside your Drive folder named "Don't_Delete_This".</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl mb-8">
          <StudentForm onSaved={triggerRefresh} />
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-4">Saved Records</h2>
          <RecordsTable refreshSignal={refresh} />
        </div>
      </div>
    </div>
  )
}

export default App
