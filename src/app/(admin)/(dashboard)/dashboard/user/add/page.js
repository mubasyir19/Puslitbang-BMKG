import Link from 'next/link'
import React from 'react'

export default function AddUserPage() {
  return (
    <section className="px-5 pt-6">
      <div>
        <h1 className="text-2xl font-semibold">Add User</h1>
      </div>
      {/* <form className="flex flex-col">
        <div className="form-group">
          <label for="">Nama</label>
          <input type="" name="email" />
        </div>
        <div className="form-group">
          <label for="">Email</label>
          <input type="" name="email" />
        </div>
      </form> */}
      <form className="mt-10 p-4 flex flex-col gap-4 bg-slate-200 rounded-xl">
        <div className="form-group">
          <label className="text-base text-black">Name</label>
          <input
            className="w-full p-4 rounded-xl"
            type="text"
            name=""
            placeholder="John Doe"
          />
        </div>
        <div className="form-group">
          <label className="text-base text-black">Email</label>
          <input
            className="w-full p-4 rounded-xl"
            type="email"
            name="email"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="form-group">
          <label className="text-base text-black">Password</label>
          <input
            className="w-full p-4 rounded-xl"
            type="password"
            name="password"
            placeholder="**********"
          />
        </div>
        <div className="form-group">
          <label className="text-base text-black">Confirm Password</label>
          <input
            className="w-full p-4 rounded-xl"
            type="password"
            name="password"
            placeholder="**********"
          />
        </div>
        <div className="form-group mt-4">
          <button
            type="submit"
            className="w-full px-10 py-2 text-white bg-blue-500 rounded-xl"
            // onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  )
}
