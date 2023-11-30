'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'

export const AuthContext = createContext({})

const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({
    email: '',
    token: '',
  })
  const pathname = usePathname()
  const router = useRouter()

  const loginVerify = async (token, targetpath) => {
    try {
      if (!token) throw Error
      const res = await axios.get('https://falbas.net/api/users/verify', {
        headers: { Authorization: 'Bearer ' + token },
      })
      if (res.status === 200) {
        setUser({ email: res.data.email, token: token })
        setIsLogin(true)
        setIsLoading(false)
        if (targetpath) {
          router.push(targetpath)
        } else {
          router.push('/dashboard/home')
        }
      }
    } catch (err) {
      localStorage.removeItem('token')
      location.replace('/login')
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (pathname !== '/login') {
      loginVerify(token, pathname)
    } else {
      if (token) {
        loginVerify(token)
      } else {
        setIsLoading(false)
      }
    }
  }, [isLogin])

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, user }}>
      {!isLoading ? children : <>Loading...</>}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
export const useAuthContext = () => useContext(AuthContext)
