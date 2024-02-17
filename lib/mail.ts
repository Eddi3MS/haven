import ConfirmEmail from "@/emails/confirm-email"
import ResetPassword from "@/emails/reset-password"
import Token from "@/emails/token"
import { Resend } from "resend"
import "server-only"

const resend = new Resend(process.env.RESEND_API_KEY)

const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "haven@edsonmarcelo.com.br",
    to: email,
    subject: "2FA Code",
    react: Token({ token }),
  })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: "haven@edsonmarcelo.com.br",
    to: email,
    subject: "Mude sua senha - Haven",
    react: ResetPassword({ resetLink }),
  })
}

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: "haven@edsonmarcelo.com.br",
    to: email,
    subject: "Confirme seu e-mail - Haven",
    react: ConfirmEmail({ confirmLink }),
  })
}

export const sendEmailChangeEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/change-email?token=${token}`

  await resend.emails.send({
    from: "haven@edsonmarcelo.com.br",
    to: email,
    subject: "Confirme seu e-mail - Haven",
    react: ConfirmEmail({ confirmLink }),
  })
}
