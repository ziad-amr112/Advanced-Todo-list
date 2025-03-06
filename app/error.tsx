'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center max-w-lg p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 animate-fade-in">
          <h2 className="text-4xl font-bold text-red-500 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-400 mb-2">{error.message}</p>
          {error.digest && <p className="text-sm text-gray-500 mb-4">Error Code: {error.digest}</p>}
          <button 
            onClick={() => reset()} 
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-transform transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}
