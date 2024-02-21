"use client"

import { reset } from "@/actions/auth/reset"
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
import { ResetSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

export const ResetForm = () => {
  const { feedback, feedbackType, setFeedback, clearFeedback } =
    useTextFeedback("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    clearFeedback()

    startTransition(() => {
      reset(values).then((data) => {
        setFeedback(data)
      })
    })
  }

  return (
    <AuthCard
      headerLabel="Esqueceu sua senha?"
      backButtonLabel="Voltar para login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
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
          </div>

          {feedbackType === "error" && <FormError message={feedback} />}
          {feedbackType === "success" && <FormSuccess message={feedback} />}

          <Button disabled={isPending} type="submit" className="w-full">
            Enviar e-mail de recuperação
          </Button>
        </form>
      </Form>
    </AuthCard>
  )
}
