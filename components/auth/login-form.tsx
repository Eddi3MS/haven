"use client"

import { login } from "@/actions/auth/login"
import { AuthCard } from "@/components/auth/AuthCard"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useTextFeedback from "@/hooks/use-text-feedback"
import { LoginSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

export const LoginForm = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : ""

  const [showTwoFactor, setShowTwoFactor] = useState(false)

  const { feedback, feedbackType, setFeedback, clearFeedback } =
    useTextFeedback("")

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  })

  useEffect(() => {
    if (urlError) {
      setFeedback({ error: urlError })
    }
  }, [urlError, setFeedback])

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    clearFeedback()

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (!data) return

          if ("error" in data || "success" in data) {
            setFeedback(data)
            form.reset()
          }

          if ("twoFactor" in data) {
            setShowTwoFactor(true)
          }
        })
        .catch(() => setFeedback({ error: "Algo deu errado." }))
    })
  }

  return (
    <AuthCard
      headerLabel="Bem-vindo de volta"
      backButtonLabel="Não tem uma conta?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="123456"
                        error={!!form.formState.errors.code}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="joão.silva@example.com"
                          type="email"
                          error={!!form.formState.errors.email}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="******"
                            type="password"
                            error={!!form.formState.errors.password}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>{" "}
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset">Esqueceu sua senha?</Link>
                      </Button>
                    </>
                  )}
                />
              </>
            )}
          </div>

          {feedbackType === "error" && <FormError message={feedback} />}
          {feedbackType === "success" && <FormSuccess message={feedback} />}

          <Button disabled={isPending} type="submit" className="w-full">
            {showTwoFactor ? "Confirmar" : "Entrar"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  )
}
