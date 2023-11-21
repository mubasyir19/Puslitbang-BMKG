import Link from 'next/link'

export default function HomeDashboard() {
  return (
    <section className="px-5 pt-10">
      <div className="grid grid-cols-4 gap-6">
        <div className="card w-full bg-red-500 rounded-xl relative">
          <div className="flex gap-x-16 px-6 pt-6 mb-16">
            <div className="">
              <p className="text-xl font-semibold text-white/50">Users</p>
              <h3 className="text-5xl font-bold text-white text-center">7</h3>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-20 h-auto text-black/25"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </div>
          <div className="absolute bottom-0 w-full mt-6 py-2 bg-black/25 rounded-b-xl">
            <Link
              href="#"
              className="text-white text-sm flex gap-x-2 justify-center"
            >
              Selengkapnya
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 my-auto text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="card w-full bg-yellow-500 rounded-xl relative">
          <div className="flex gap-x-16 px-6 pt-6 mb-16">
            <div className="">
              <p className="text-xl font-semibold text-white/50">Kategori</p>
              <h3 className="text-5xl font-bold text-white text-center">3</h3>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-20 h-auto text-black/25"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
              />
            </svg>
          </div>
          <div className="absolute bottom-0 w-full mt-6 py-2 bg-black/25 rounded-b-xl">
            <Link
              href="#"
              className="text-white text-sm flex gap-x-2 justify-center"
            >
              Selengkapnya
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 my-auto text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="card w-full bg-green-500 rounded-xl relative">
          <div className="flex gap-x-16 px-6 pt-6 mb-16">
            <div className="">
              <p className="text-xl font-semibold text-white/50">Artikel</p>
              <h3 className="text-5xl font-bold text-white text-center">7</h3>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-20 h-auto text-black/25"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
              />
            </svg>
          </div>
          <div className="absolute bottom-0 w-full mt-6 py-2 bg-black/25 rounded-b-xl">
            <Link
              href="#"
              className="text-white text-sm flex gap-x-2 justify-center"
            >
              Selengkapnya
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 my-auto text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
