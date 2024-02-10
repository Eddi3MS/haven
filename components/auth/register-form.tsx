'use client'

import { register } from '@/actions/register'
import { AuthCard } from '@/components/auth/AuthCard'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useTextFeedback from '@/hooks/use-text-feedback'
import { RegisterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export const RegisterForm = () => {
  const { feedback, feedbackType, setFeedback, clearFeedback } =
    useTextFeedback('')

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    clearFeedback()

    startTransition(() => {
      register(values).then((data) => {
        setFeedback(data)
      })
    })
  }

  return (
    <AuthCard
      headerLabel="Crie sua conta"
      backButtonLabel="Já tem uma conta?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="João da Silva"
                      error={!!form.formState.errors.name}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
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
                </FormItem>
              )}
            />
          </div>

          {feedbackType === 'error' && <FormError message={feedback} />}
          {feedbackType === 'success' && <FormSuccess message={feedback} />}

          <Button disabled={isPending} type="submit" className="w-full">
            Criar conta
          </Button>
        </form>
      </Form>
    </AuthCard>
  )
}
