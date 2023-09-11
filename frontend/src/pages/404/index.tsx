import React, { type ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes/route-path'

export const NotFoundPage: React.FC = (): ReactElement => {
  return (
    <div
      dir='ltr'
      className='flex-col h-screen w-screen flex items-center justify-center'
    >
      <h3 className='text-xl'>404 | Not Found</h3>
      <br />
      <Link to={ROUTES.INDEX}>Back To Home</Link>
    </div>
  )
}
