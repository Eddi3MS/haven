import authConfig from "@/auth.config"
import NextAuth from "next-auth"

import {
  DEFAULT_LOGIN_REDIRECT,
  adminRoutes,
  apiAuthPrefix,
  authRoutes,
  havensPrefix,
  publicRoutes,
} from "@/routes"
import { currentUser } from "./lib/auth"

const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
  const { nextUrl } = req
  const { pathname, search } = nextUrl
  const user = await currentUser()

  const isLoggedIn = !!user

  const isAdmin = isLoggedIn && user?.role === "ADMIN"
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix)
  const isPublicRoute =
    publicRoutes.includes(pathname) || pathname.startsWith(havensPrefix)
  const isAuthRoute = authRoutes.includes(pathname)
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return null
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  if (isAdminRoute && !isAdmin) {
    return Response.redirect(new URL("/", nextUrl))
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = pathname
    if (search) {
      callbackUrl += search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    )
  }

  return null
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
