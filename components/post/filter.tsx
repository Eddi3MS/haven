"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { SearchPostSchema, SearchParamsType } from "@/schemas"
import { objEntries } from "@/utils/objectTypedMethods"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostCategory } from "@prisma/client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const Filters = ({
  searchParams,
}: {
  searchParams: SearchParamsType
}) => {
  const router = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const [open, setOpen] = useState(false)

  const form = useForm<SearchParamsType>({
    resolver: zodResolver(SearchPostSchema),
    defaultValues: {
      category: searchParams.category ?? "",
      bathroomCount: searchParams.bathroomCount ?? "",
      bedroomCount: searchParams.bedroomCount ?? "",
    },
  })

  const onSubmit = (values: SearchParamsType) => {
    let query = {
      ...searchParams,
    }

    for (const [key, value] of objEntries(values)) {
      if (!!value?.trim()) {
        query[key] = value
      } else if (params?.get(key)) {
        delete query[key]
      }
    }

    /* reset page */
    if (params?.get("page")) {
      delete query["page"]
    }

    const queryParams = new URLSearchParams(query)

    router.push(pathname + "?" + queryParams.toString())
    setOpen(false)
  }

  const handleClear = () => {
    form.setValue("category", "")
    form.setValue("bathroomCount", "")
    form.setValue("bedroomCount", "")
    router.push("/havens")
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger aria-label="abrir menu" asChild>
        <Button variant="outline">Filtros</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[320px]" align="end">
        <Form {...form}>
          <form
            className="space-y-4 p-4"
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
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      key={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="min-w-full">
                        <SelectItem value=" ">Qualquer</SelectItem>
                        <SelectItem value={PostCategory.SELL}>Venda</SelectItem>
                        <SelectItem value={PostCategory.RENT}>
                          Aluguel
                        </SelectItem>
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
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      key={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="min-w-full">
                        <SelectItem value=" ">Qualquer</SelectItem>
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
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      key={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="min-w-full">
                        <SelectItem value=" ">Qualquer</SelectItem>
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
            <div className="flex justify-between">
              <Button variant="secondary" onClick={handleClear} type="button">
                Limpar
              </Button>

              <Button className="self-end mb-2" type="submit">
                Filtrar
              </Button>
            </div>
          </form>
        </Form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
