import { Components } from '@/components'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Components.SidebarDashboard />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Components.NavbarDashboard />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>
        <Components.FooterDashboard />
      </div>
    </div>
  )
}
