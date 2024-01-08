import { Poppins } from 'next/font/google'
import '../globals.css'
import '@mantine/notifications/styles.css'
import '@mantine/core/styles.css'

import AuthContext from '@/contexts/AuthContext'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

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
        <AuthContext>
          <MantineProvider>
            <main>{children}</main>
            <Notifications />
          </MantineProvider>
        </AuthContext>
      </body>
    </html>
  )
}
