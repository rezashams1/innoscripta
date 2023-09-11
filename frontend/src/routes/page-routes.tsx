import React from 'react'
import { ROUTES } from './route-path'
import { HomePage, LoginPage, ProfilePage, RegisterPage } from '../pages'

export const PAGE_ROUTES = [
  {
    id: 1,
    isPrivate: false,
    prevent: true,
    deactivate: false,
    path: ROUTES.INDEX,
    element: <HomePage />
  },
  {
    id: 2,
    isPrivate: true,
    prevent: true,
    deactivate: false,
    path: ROUTES.REGISTER,
    element: <RegisterPage />
  },
  {
    id: 3,
    isPrivate: true,
    prevent: true,
    deactivate: false,
    path: ROUTES.LOGIN,
    element: <LoginPage />
  },
  {
    id: 4,
    isPrivate: true,
    prevent: false,
    deactivate: false,
    path: ROUTES.PROFILE,
    element: <ProfilePage />
  },
]
