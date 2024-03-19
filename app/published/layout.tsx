import React from "react"

const Layout = async ({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) => {
  return (
    <section>
      {children}
      {modal}
    </section>
  )
}

export default Layout
