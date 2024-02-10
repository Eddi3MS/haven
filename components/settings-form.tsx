'use client'

import { settings } from '@/actions/settings'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import useTextFeedback from '@/hooks/use-text-feedback'
import { SettingsSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserRole } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const SettingsForm = ({
  name,
  email,
  role,
  isTwoFactorEnabled = false,
  isOAuth,
}: {
  name?: string | null
  email?: string | null
  role?: 'ADMIN' | 'USER'
  isTwoFactorEnabled?: boolean
  isOAuth?: boolean
}) => {
  const router = useRouter()
  const { update } = useSession()
  const { feedback, feedbackType, setFeedback, clearFeedback } =
    useTextFeedback('', 5000)

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: name || undefined,
      email: email || undefined,
      role: role || undefined,
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
          if ('success' in data) {
            update()
            router.refresh()
          }
        })
        .catch(() => setFeedback({ error: 'Something went wrong!' }))
    })
  }

  return (
    <Card className="w-[min(600px,98%)]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">⚙️ Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
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
              {isOAuth === false && (
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
                    name="password"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...rest}
                            value={value || ''}
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
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            {...rest}
                            value={value || ''}
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
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={UserRole.USER}>User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isOAuth === false && (
                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enable two factor authentication for your account
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
              )}
            </div>

            {feedbackType === 'error' && <FormError message={feedback} />}
            {feedbackType === 'success' && <FormSuccess message={feedback} />}

            <Button
              disabled={isPending || !form.formState.isDirty}
              type="submit"
            >
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SettingsForm
