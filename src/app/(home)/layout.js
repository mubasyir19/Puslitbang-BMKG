import { Poppins } from 'next/font/google'
import '../globals.css'

import { Navbar, Header, Footer } from '@/components'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'Puslitbang | BMKG',
  description: 'Pusat Penelitian dan Pengembangan BMKG',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        <Header />
        <div className="flex">
          <main className="relative mx-auto max-w-6xl">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
