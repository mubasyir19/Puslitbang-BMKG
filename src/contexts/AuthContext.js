'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { fetcher } from '@/helpers/fetcher'

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
      const res = await fetcher.get('https://falbas.net/api/users/verify')
      if (res.status === 200) {
        setUser({ email: res.data.email, token: token, role: res.data.role })
        setIsLogin(true)
        setIsLoading(false)
        if (targetpath) {
          router.push(targetpath)
        } else {
          router.push('/dashboard/article')
        }
      }
    } catch (err) {
      Cookies.remove('token')
      location.replace('/login')
    }
  }

  useEffect(() => {
    const token = Cookies.get('token')
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
