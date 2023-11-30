'use client'

import Swal from 'sweetalert2'

export default function ListTagsDashboard() {
  const handleDelete = (e) => {
    e.preventDefault()
    Swal.fire({
      title: 'Warning!',
      text: 'Are you sure want to delete?',
      icon: 'warning',
      confirmButtonText: 'Yes',
      confirmButtonColor: 'blue',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: 'red',
    })
  }
  return (
    <section className="px-5 pt-6">
      <div>
        <h1 className="text-2xl font-semibold">List Tags</h1>
      </div>
      <div className="mt-8">
        <button className="px-3 py-1 flex text-white bg-blue-400 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
          Tambah
        </button>
      </div>
      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr className="bg-slate-300">
            <th className="text-start table-data border border-slate-600">
              Nama
            </th>
            <th className="table-data border border-slate-600"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="table-data border border-slate-600">Meteorologi</td>
            <td className="table-data border border-slate-600 text-center">
              <button className="button-info mr-1">Edit</button>
              <button className="button-danger ml-1" onClick={handleDelete}>
                Hapus
              </button>
            </td>
          </tr>
          <tr>
            <td className="table-data border border-slate-600">Klimatologi</td>
            <td className="table-data border border-slate-600 text-center">
              <button className="button-info mr-1">Edit</button>
              <button className="button-danger ml-1" onClick={handleDelete}>
                Hapus
              </button>
            </td>
          </tr>
          <tr>
            <td className="table-data border border-slate-600">Geofisika</td>
            <td className="table-data border border-slate-600 text-center">
              <button className="button-info mr-1">Edit</button>
              <button className="button-danger ml-1" onClick={handleDelete}>
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}
