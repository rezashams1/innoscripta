import React, { Suspense, type ReactElement } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes as Switch, useLocation } from 'react-router-dom'
import { NotFoundPage } from '../pages'
import { useAppSelector } from '../redux/hooks'
import { PAGE_ROUTES } from './page-routes'
import { ROUTES } from './route-path'

const Routes: React.FC = (): ReactElement => {
  return (
    <Suspense fallback={<></>}>
      <Router>
        <MyRouter />
      </Router>
    </Suspense>
  )
}

const MyRouter = (): any => {
  const user = useAppSelector((state) => state.user)
  const location = useLocation()

  return (
    <Switch location={location}>
    {PAGE_ROUTES.map(({ id, isPrivate, prevent, deactivate, path, element }) =>
      isPrivate || deactivate
        ? (
            deactivate
              ? <Route key={id} path={path} element={<NotFoundPage />} />
              : (
                  prevent
                    ? (
                        user.id !== 0
                          ? <Route key={id} path={path} element={<Navigate to={ROUTES.INDEX} />} />
                          : <Route key={id} path={path} element={element} />
                      )
                    : (
                        user.id === 0
                          ? <Route key={id} path={path} element={<Navigate to={ROUTES.REGISTER} />} />
                          : <Route key={id} path={path} element={element} />
                      )
                )
          )
        : <Route key={id} path={path} element={element} />
    )}
    <Route path='*' element={<NotFoundPage />} />
  </Switch>
  )
}

export default Routes
