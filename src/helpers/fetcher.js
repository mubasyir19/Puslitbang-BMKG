import axios from 'axios'
import Cookies from 'js-cookie'

const fetcherInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BE_URL,
  })

  const token = Cookies.get('token')
  if (token) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }

  return instance
}

export const fetcher = fetcherInstance()
