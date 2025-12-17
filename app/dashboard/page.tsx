import { createClient } from '@/utils/supabase/server'
import { logout } from '@/app/auth/actions'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  const { data: announcements, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Employee Portal</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Halo, <strong>{user.email}</strong>
            </span>
            <form action={logout}>
              <button 
                type="submit" 
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Pengumuman Terbaru</h2>

        {error && <p className="text-red-500">Gagal memuat data pengumuman: {error.message}</p>}

        <div className="grid gap-4">
          {announcements?.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow border border-gray-100 hover:shadow-md transition">
              <h3 className="text-lg font-bold text-blue-600 mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.content}</p>
              <div 
                className="mt-4 text-xs text-gray-400"
                suppressHydrationWarning
              >
                Diposting pada: {new Date(item.created_at).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
              </div>
            </div>
          ))}
          
          {announcements?.length === 0 && (
            <p className="text-gray-500">Belum ada pengumuman saat ini.</p>
          )}
        </div>
      </main>
    </div>
  )
}