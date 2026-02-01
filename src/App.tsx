/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import Routes from './routes'
import { UserAuthContextProvider } from './store/UserAuthContext'
import { Toaster } from './components/ui/sonner'

type Props = {
  children:React.ReactNode;
}

const App = (_props: Props) => {
  return (
    <UserAuthContextProvider>
      <Toaster richColors position="top-right" closeButton />
      <RouterProvider router={Routes} />
    </UserAuthContextProvider>
  )
}

export default App

