"use client"

import { settings } from "@/actions/settings"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import useTextFeedback from "@/hooks/use-text-feedback"
import { SettingsSchema } from "@/schemas"
import { formatPhoneNumber, removeNotNumbers } from "@/utils/format-inputs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const SettingsForm = ({
  name,
  email,
  isTwoFactorEnabled = false,
  isOAuth,
  phone,
}: {
  name?: string | null
  phone?: string | null
  email?: string | null
  isTwoFactorEnabled?: boolean
  isOAuth?: boolean
}) => {
  const router = useRouter()
  const { update } = useSession()
  const { feedback, feedbackType, setFeedback, clearFeedback } =
    useTextFeedback("", 5000)

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: name ?? "",
      email: email ?? "",
      phone: phone ?? "",
      isTwoFactorEnabled: isTwoFactorEnabled,
    },
  })

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    if (!form.formState.isDirty) return
    clearFeedback()

    startTransition(() => {
      settings(values)
        .then((data) => {
          setFeedback(data)
          if ("success" in data) {
            update()
            router.refresh()
          }
        })
        .catch(() => setFeedback({ error: "Something went wrong!" }))
    })
  }

  return (
    <Card className="w-full mt-8 container mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-semibold text-center">Configurações</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      {...rest}
                      onChange={({ target }) => {
                        const value = removeNotNumbers(target.value)

                        if (value.length > 11) {
                          return
                        }

                        onChange(value)
                      }}
                      value={formatPhoneNumber(value)}
                      placeholder="(37) 99999-9999"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    O número que será exibido junto aos seus anúncios.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isOAuth && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="john.doe@example.com"
                          type="email"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Two Factor Auth</FormLabel>
                        <FormDescription>
                          Habilitar autenticação de duas etapas?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          {...rest}
                          value={value || ""}
                          onChange={(e) => {
                            let value = e.target.value
                            if (!value) {
                              return onChange(undefined)
                            }

                            onChange(value)
                          }}
                          placeholder="******"
                          type="password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Nova Senha</FormLabel>
                      <FormControl>
                        <Input
                          {...rest}
                          value={value || ""}
                          onChange={(e) => {
                            let value = e.target.value
                            if (!value) {
                              return onChange(undefined)
                            }

                            onChange(value)
                          }}
                          placeholder="******"
                          type="password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {!!feedbackType && (
              <div className="md:col-span-2">
                {feedbackType === "error" ? (
                  <FormError message={feedback} />
                ) : (
                  <FormSuccess message={feedback} />
                )}
              </div>
            )}

            <div className="md:col-span-2 flex justify-end">
              <Button
                disabled={isPending || !form.formState.isDirty}
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
                className="bg-gradient-to-r from-blue-800 to-blue-500 text-white hover:from-blue-900 hover:to-blue-600"
              >
                Atualizar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SettingsForm
