import Link from 'next/link';

const PawIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 13.5C10.067 13.5 8.5 15.067 8.5 17C8.5 18.933 10.067 20.5 12 20.5C13.933 20.5 15.5 18.933 15.5 17C15.5 15.067 13.933 13.5 12 13.5Z" fill="#EA6C2E" />
    <ellipse cx="6.5" cy="11" rx="2" ry="2.5" fill="#EA6C2E" />
    <ellipse cx="17.5" cy="11" rx="2" ry="2.5" fill="#EA6C2E" />
    <ellipse cx="9" cy="8" rx="1.75" ry="2.25" fill="#EA6C2E" />
    <ellipse cx="15" cy="8" rx="1.75" ry="2.25" fill="#EA6C2E" />
  </svg>
);

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center max-w-sm">

        {/* 404 with paw icon overlay */}
        <div className="relative inline-block mb-6">
          <span className="text-[96px] font-bold text-gray-200 leading-none tracking-tighter select-none">
            404
          </span>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-100 rounded-full w-16 h-16 flex items-center justify-center shadow-sm">
            <PawIcon />
          </div>
        </div>

        <h1 className="text-xl font-bold text-gray-800 mb-2">Page not found</h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          Looks like this pet wandered off. The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition-colors text-white rounded-xl px-5 py-2.5 text-sm font-semibold"
          >
            Return home
          </Link>
          <Link
            href="/all-pets"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 transition-colors text-gray-700 border border-gray-200 rounded-xl px-5 py-2.5 text-sm font-semibold"
          >
            Browse pets
          </Link>
        </div>

      </div>
    </main>
  );
}