'use client'

import { Provider } from 'react-redux'
import React, { useEffect } from 'react'
import { store } from '.'

export default function ReduxProvider({ children } : {children: React.ReactNode}) {

  return <Provider store={store}>{children}</Provider>
}