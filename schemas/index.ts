import * as z from "zod"
import { UserRole } from "@prisma/client"

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(
      z.string().min(6, {
        message: "Minimum 6 characters required",
      })
    ),
    newPassword: z.optional(
      z.string().min(6, {
        message: "Minimum 6 characters required",
      })
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false
      }

      return true
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false
      }

      return true
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  )

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
})

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
})

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string().min(6)),
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
})

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]

export const PostHavenSchema = z.object({
  images: z
    .array(
      z
        .instanceof(File, { message: "Faça upload de uma foto." })
        .refine(
          (file) => file.size <= 5 * 1024 * 1024,
          "A foto deve ter no máximo 5MB"
        )
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          "Formato não suportado"
        )
    )
    .refine((arr) => arr.length >= 1, "Faça upload de 1 foto.")
    .refine((arr) => arr.length <= 5, "Upload máximo de 5."),

  title: z
    .string({ required_error: "Campo Obrigatório" })
    .min(8, "Titulo deve conter 8 caracteres ou mais."),
  description: z
    .string({ required_error: "Campo Obrigatório" })
    .min(30, "Descrição deve conter 30 caracteres ou mais."),
  category: z.literal("SELL").or(z.literal("RENT")),
  bedroomCount: z.string().min(1),
  bathroomCount: z.string().min(1),
  address: z.string().min(1),
  area: z.string().min(1),
  builtArea: z.string().min(1),
  price: z.string().min(1),
})

export const FilterPostSchema = z.object({
  category: z.string().optional(),
  bathroomCount: z.string().optional(),
  bedroomCount: z.string().optional(),
})
