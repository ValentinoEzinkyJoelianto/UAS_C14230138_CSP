import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-gray-800 p-4">
      <main className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-blue-600">
            Employee Portal
          </h1>
          <p className="text-lg text-gray-500 max-w-md mx-auto">
            Sistem manajemen data dan informasi karyawan terpusat.
            Silakan masuk untuk mengakses dashboard Anda.
          </p>
        </div>

        <div className="flex gap-4 justify-center mt-8">
          <Link 
            href="/login" 
            className="px-6 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Login Karyawan
          </Link>
          
          <Link 
            href="/register" 
            className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
          >
            Registrasi Baru
          </Link>
        </div>
      </main>

      <footer className="mt-20 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Perusahaan Anda. All rights reserved.
      </footer>
    </div>
  )
}