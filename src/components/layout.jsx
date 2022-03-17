import React from 'react'
import { Header } from './header'

function Layout({ categories, children }) {
  return (
    <>
      <Header navs={categories} />
      <main>{children}</main>
    </>
  )
}

export { Layout }
