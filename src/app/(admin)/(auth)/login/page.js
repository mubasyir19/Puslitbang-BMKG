'use client'

import Image from 'next/image'
import { useAuthContext } from '@/contexts/AuthContext'
import { useState } from 'react'
import axios from 'axios'

export default function Login() {
  const { setIsLogin } = useAuthContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const res = await axios.post('https://falbas.net/api/users/login', {
        email: email,
        password: password,
      })
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        setIsLogin(true)
      }
    } catch (err) {
      console.log(err.response.data)
    } finally {
      setIsLoading(false)
    }
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
        <form
          className="mt-10 flex flex-col gap-4"
          onSubmit={(e) => {
            handleSubmit(e)
          }}
        >
          <div className="form-group">
            <label className="text-base text-white">Email</label>
            <input
              className="w-full p-4 border-2 border-black rounded-xl"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <div className="form-group">
            <label className="text-base text-white">Password</label>
            <input
              className="w-full p-4 border-2 border-black rounded-xl"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
          <div className="form-group mt-4">
            <button
              type="submit"
              className="w-full px-10 py-2 text-white bg-blue-500 rounded-xl"
              disabled={isLoading}
              // onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
