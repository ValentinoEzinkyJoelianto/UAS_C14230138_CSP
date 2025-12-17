'use client'

import { signup } from '@/app/auth/actions'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    
    const result = await signup(formData)

    if (result?.error) {
        setError(result.error)
        setLoading(false)
    } else {
        router.push('/login?message=Registrasi berhasil, silakan login.')
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-50 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Buat Akun Baru</h2>
          <p className="mt-2 text-sm text-gray-600">
            Mulai perjalanan Anda bersama kami hari ini.
          </p>
        </div>

        {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded text-sm text-center">
                {error}
            </div>
        )}

        <form className="mt-8 space-y-6" action={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full rounded-t-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                placeholder="Email Address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded-b-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all disabled:bg-indigo-400"
            >
              {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500">
            Sudah punya akun?{' '}
            <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Login
            </Link>
        </p>
      </div>
    </div>
  )
}