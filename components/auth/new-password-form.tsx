"use client"

import { newPassword } from "@/actions/auth/new-password"
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
import { NewPasswordSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

export const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const { feedback, feedbackType, setFeedback, clearFeedback } =
    useTextFeedback("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    clearFeedback()

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setFeedback(data)
      })
    })
  }

  return (
    <AuthCard
      headerLabel="Insira uma nova senha"
      backButtonLabel="Voltar para login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
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
                </FormItem>
              )}
            />
          </div>

          {feedbackType === "error" && <FormError message={feedback} />}
          {feedbackType === "success" && <FormSuccess message={feedback} />}

          <Button disabled={isPending} type="submit" className="w-full">
            Mudar senha
          </Button>
        </form>
      </Form>
    </AuthCard>
  )
}
