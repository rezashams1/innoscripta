import { useAppDispatch, useAppSelector } from '../redux/hooks'
import React, { useEffect } from 'react'
import cookie from 'js-cookie'
import { FullLoader } from '../components/custom'
import { AuthService } from '../services'
import { set } from '../redux/slices/user'

export function AuthProvider ({ children }: { children: JSX.Element }): JSX.Element {
  const [loading, setLoading] = React.useState(true)
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    if (loading) {
      if (cookie.get('auth') != null && cookie.get('auth') !== '') {
        AuthService.check()
          .then(async (result) => {
            dispatch(set({ ...result.data.user }))
          })
          .catch(() => {
            cookie.remove('auth')
            setLoading(false)
          })
      } else {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    if (user.id !== 0) {
      setLoading(false)
    }
  }, [user])

  return loading ? <FullLoader loaderStatus={true} /> : children
}
