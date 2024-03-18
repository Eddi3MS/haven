import React from "react"

const Layout = async ({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) => {
  return (
    <>
      {children}
      {modal}
    </>
  )
}

export default Layout
