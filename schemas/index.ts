import * as z from "zod"

/* AUTH & USER */
export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    phone: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
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

/* Auth & User */

/* Posts */
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]

const imageFileSchema = z
  .array(z.instanceof(File, { message: "Faça upload de 1 imagem." }))
  .min(3, "Faça upload de pelo menos 3 imagens.")
  .refine((arr) => arr.length <= 5, "Upload máximo de 5 imagens.")
  .refine(
    (arr) => arr.some((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
    {
      message: "Formatos suportados: .JPEG, .JPG, .PNG, .WEBP",
    }
  )

const imagePublicIdSchema = z
  .array(z.object({ public_id: z.string().min(1), name: z.string().min(1) }))
  .min(3)

const baseSchema = z.object({
  title: z
    .string({ required_error: "Campo Obrigatório" })
    .min(8, "Titulo deve conter 8 caracteres ou mais."),
  description: z
    .string({ required_error: "Campo Obrigatório" })
    .min(30, "Descrição deve conter 30 caracteres ou mais."),
  category: z.literal("SELL").or(z.literal("RENT")),
  bedroomCount: z
    .string({ required_error: "Campo Obrigatório" })
    .min(1, "Campo Obrigatório"),
  bathroomCount: z
    .string({ required_error: "Campo Obrigatório" })
    .min(1, "Campo Obrigatório"),
  address: z
    .string({ required_error: "Campo Obrigatório" })
    .min(1, "Campo Obrigatório"),
  number: z
    .string({ required_error: "Campo Obrigatório" })
    .min(1, "Campo Obrigatório"),
  district: z
    .string({ required_error: "Campo Obrigatório" })
    .min(1, "Campo Obrigatório"),
  area: z
    .string({ required_error: "Campo Obrigatório" })
    .min(1, "Campo Obrigatório"),
  builtArea: z
    .string({ required_error: "Campo Obrigatório" })
    .min(1, "Campo Obrigatório"),
  price: z
    .string({ required_error: "Campo Obrigatório" })
    .min(1, "Campo Obrigatório"),
})

export const PostSchema = z.discriminatedUnion("variation", [
  z
    .object({
      variation: z.literal("ids"),
      images: imagePublicIdSchema,
    })
    .merge(baseSchema),
  z
    .object({
      variation: z.literal("files"),
      images: imageFileSchema,
    })
    .merge(baseSchema),
])

export type PostType = z.infer<typeof PostSchema>

export const ServerValidationCreatePost = z
  .object({
    images: imagePublicIdSchema,
  })
  .merge(baseSchema)

export type ServerValidationPostCreateType = z.infer<
  typeof ServerValidationCreatePost
>

export const UrlSearchParamsSchema = z.object({
  category: z.string().optional(),
  bathroomCount: z.string().optional(),
  bedroomCount: z.string().optional(),
  page: z.string().optional(),
})

export type UrlSearchParamsType = z.infer<typeof UrlSearchParamsSchema>

export const PaginationSchema = z
  .string()
  .min(1)
  .refine((value) => {
    if (!value) return true
    const parsedValue = parseFloat(value)
    return !isNaN(parsedValue)
  })

export const SearchServerSchema = z.object({
  category: z.literal("SELL").or(z.literal("RENT")).optional(),
  bathroomCount: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true
      const parsedValue = parseFloat(value)
      return !isNaN(parsedValue)
    }),
  bedroomCount: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true
      const parsedValue = parseFloat(value)
      return !isNaN(parsedValue)
    }),
  page: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true
      const parsedValue = parseFloat(value)
      return !isNaN(parsedValue)
    }),
})

export type SearchServerParamsType = z.infer<typeof SearchServerSchema>
