'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Login() {
  const router = useRouter()
  const handleSubmit = () => {
    router.push('/dashboard/home')
  }
  return (
    <section className="flex h-screen w-full justify-center items-center bg-image-background bg-cover">
      <div className="p-10 bg-black/50 border-2 border-white rounded-xl">
        <div className="flex gap-x-4 w-fit mx-auto">
          <Image
            className="h-16 w-auto"
            src="/images/logo-bmkg.png"
            height={100}
            width={100}
            alt="logo"
          />
          <p className="my-auto text-lg text-white">
            Pusat Penelitian dan <br /> Pengembangan BMKG
          </p>
        </div>
        <p className="mt-4 text-center text-white">
          Silahkan Login untuk memulai sesi Anda
        </p>
        <form className="mt-10 flex flex-col gap-4">
          <div className="form-group">
            <label className="text-base text-white">Username</label>
            <input
              className="w-full p-4 border-2 border-black rounded-xl"
              type="text"
              name=""
              placeholder="johndoe45"
            />
          </div>
          <div className="form-group">
            <label className="text-base text-white">Password</label>
            <input
              className="w-full p-4 border-2 border-black rounded-xl"
              type="password"
              name="password"
              placeholder="**********"
            />
          </div>
          <div className="form-group mt-4">
            <button
              type="submit"
              className="w-full px-10 py-2 text-white bg-blue-500 rounded-xl"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
