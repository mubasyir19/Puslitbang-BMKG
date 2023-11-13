export default function SidebarDashboard() {
  return (
    <>
      {/* sidebar */}
      <aside className="bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Menu</h2>
        <ul>
          <li>Dashboard</li>
          <li>Orders</li>
          <li>Products</li>
          {/* Tambahkan menu lain sesuai kebutuhan */}
        </ul>
      </aside>
    </>
  )
}
