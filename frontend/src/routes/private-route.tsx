import React, { type ReactNode } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'
import { ROUTES } from './route-path'

interface Properties {
  deactivate: boolean
  element: ReactNode
  path: string
  prevent: boolean
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const PrivateRoute = ({ path, element: Component, deactivate = false, prevent = false }: Properties) => {
  const { id } = useAppSelector((state) => state.user)

  if (deactivate) {
    return <Route path={path} element={<Navigate to={ROUTES.NOT_FOUND} />} />
  }

  return (
    <Route
      path={path}
      // @ts-expect-error: Unreachable code error
      element={(properties) =>
        id !== 0
          ? (
              prevent
                ? <Navigate to={ROUTES.PROFILE} />
                // @ts-expect-error: Unreachable code error
                : <Component {...properties} />
            )
          : <Navigate to={ROUTES.REGISTER} />
      }
    />
  )
}
