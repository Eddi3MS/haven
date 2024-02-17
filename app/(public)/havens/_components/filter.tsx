"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FilterPostSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostCategory } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { SearchParamsType } from "../page"

export const Filters = ({
  searchParams,
}: {
  searchParams: SearchParamsType
}) => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<SearchParamsType>({
    resolver: zodResolver(FilterPostSchema),
    defaultValues: {
      category: searchParams.category ?? "",
      bathroomCount: searchParams.bathroomCount ?? "",
      bedroomCount: searchParams.bedroomCount ?? "",
    },
  })

  const onSubmit = (values: SearchParamsType) => {
    if (!form.formState.isDirty) return

    startTransition(() => {
      const params = new URLSearchParams()
      Object.entries(values).forEach(([key, value]) => {
        if (!!value) {
          params.set(key, value)
        }
      })

      router.push("/havens" + "?" + params.toString())
    })
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="min-w-full">
                    <SelectItem value={PostCategory.SELL}>Venda</SelectItem>
                    <SelectItem value={PostCategory.RENT}>Aluguel</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bedroomCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quartos</FormLabel>
              <FormControl>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="min-w-full">
                    <SelectItem value={"1"}>1+</SelectItem>
                    <SelectItem value={"2"}>2+</SelectItem>
                    <SelectItem value={"3"}>3+</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bathroomCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banheiros</FormLabel>
              <FormControl>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="min-w-full">
                    <SelectItem value={"1"}>1+</SelectItem>
                    <SelectItem value={"2"}>2+</SelectItem>
                    <SelectItem value={"3"}>3+</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} className="self-end mb-2">
          Filtrar
        </Button>
      </form>
    </Form>
  )
}
