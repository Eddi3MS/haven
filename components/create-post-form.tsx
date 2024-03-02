"use client"

import { createPost } from "@/actions/posts/create-post"
import { generateSignedUrl } from "@/actions/posts/generate-signed-url"
import useTextFeedback from "@/hooks/use-text-feedback"
import { cn } from "@/lib/utils"
import { PostHavenSchema } from "@/schemas"
import { categoriesTranslated } from "@/utils/categoryTranslation"
import { deleteFromCloudinaryWithDeleteToken } from "@/utils/deleteFromCloudinaryWithDeleteToken"
import { formatToCurrency, removeNotNumbers } from "@/utils/format-inputs"
import { shortName } from "@/utils/shortName"
import { uploadToCloudinary } from "@/utils/uploadToCloudinary"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostCategory } from "@prisma/client"
import { useCallback, useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Textarea } from "./ui/textarea"
import { objKeys } from "@/utils/objectTypedMethods"

const CreatePostForm = () => {
  const [isPending, startTransition] = useTransition()
  const { feedback, feedbackType, setFeedback, clearFeedback } =
    useTextFeedback("", 5000)

  const form = useForm<z.infer<typeof PostHavenSchema>>({
    resolver: zodResolver(PostHavenSchema),
    defaultValues: {
      images: undefined,
      category: "SELL",
    },
  })

  const imagesWatch = form.watch("images")
  const categoryWatch = form.watch("category")

  const onSubmit = (values: z.infer<typeof PostHavenSchema>) => {
    const timestamp = Math.round(new Date().getTime() / 1000)

    startTransition(() => {
      generateSignedUrl(timestamp)
        .then(async (signatureResponse) => {
          if ("signature" in signatureResponse) {
            const { signature } = signatureResponse

            const uploadResponse = await uploadToCloudinary({
              signature,
              timestamp,
              images: values.images,
            })

            if (!uploadResponse) {
              return setFeedback({
                error:
                  "Erro ao fazer upload das imagens, tente novamente mais tarde.",
              })
            }

            const { images, ...data } = values

            const createResponse = await createPost({
              ...data,
              images: uploadResponse.map((image) => image.public_id),
            })

            if ("error" in createResponse) {
              Promise.all(
                uploadResponse.map((data) =>
                  deleteFromCloudinaryWithDeleteToken(data.delete_token)
                )
              )

              return setFeedback(createResponse)
            }

            setFeedback(createResponse)
            form.reset()
          }
        })
        .catch((err) => console.error(err))
    })
  }

  if (feedbackType === "success") {
    return <FormSuccess message={feedback} />
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold text-center">
          Anuncie seu imóvel
        </h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 pb-6"
          >
            <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titulo</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Casa de veraneio no.."
                          disabled={isPending}
                          error={!!form.formState.errors.title}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Av. Magalhães Pinto 1201, centro"
                          disabled={isPending}
                          error={!!form.formState.errors.address}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="md:w-1/2">
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
                            <SelectContent>
                              {objKeys(PostCategory).map((cat) => (
                                <SelectItem value={cat} key={cat}>
                                  {categoriesTranslated?.[cat]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem className="md:w-1/2">
                        <FormLabel>
                          {categoryWatch === "SELL"
                            ? "Valor do imóvel"
                            : "Valor do aluguel"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...rest}
                            onChange={({ target }) => {
                              target.value = removeNotNumbers(target.value)
                              onChange(target.value)
                            }}
                            value={formatToCurrency(value)}
                            placeholder={
                              categoryWatch === "SELL"
                                ? "R$250.000.00"
                                : "R$2.000.00"
                            }
                            disabled={isPending}
                            error={!!form.formState.errors.price}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="bedroomCount"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormLabel>Quartos</FormLabel>
                        <FormControl>
                          <Input
                            {...rest}
                            onChange={({ target }) => {
                              target.value = removeNotNumbers(target.value)
                              onChange(target.value)
                            }}
                            value={value}
                            placeholder="2"
                            disabled={isPending}
                            error={!!form.formState.errors.bedroomCount}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bathroomCount"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormLabel>Banheiros</FormLabel>
                        <FormControl>
                          <Input
                            {...rest}
                            onChange={({ target }) => {
                              target.value = removeNotNumbers(target.value)
                              onChange(target.value)
                            }}
                            value={value}
                            placeholder="2"
                            disabled={isPending}
                            error={!!form.formState.errors.bathroomCount}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormLabel title="Área total" className="truncate">
                          A. Total
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...rest}
                            onChange={({ target }) => {
                              target.value = removeNotNumbers(target.value)
                              onChange(target.value)
                            }}
                            value={value}
                            placeholder="120m²"
                            disabled={isPending}
                            error={!!form.formState.errors.area}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="builtArea"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormLabel title="área construída" className="truncate">
                          A. Const.
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...rest}
                            onChange={({ target }) => {
                              target.value = removeNotNumbers(target.value)

                              onChange(target.value)
                            }}
                            value={value}
                            placeholder="100m²"
                            disabled={isPending}
                            error={!!form.formState.errors.builtArea}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="casa proximo a.. com suite X Y Z.."
                        disabled={isPending}
                        className="resize-none"
                        error={!!form.formState.errors.description}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {Array.isArray(imagesWatch) && imagesWatch.length > 0 ? (
                <div className="space-y-2">
                  <p>imagens selecionadas:</p>
                  <div className="flex gap-2 flex-wrap">
                    {imagesWatch.map((image, i) => (
                      <Badge key={i} variant="outline">
                        {shortName(image.name)}
                      </Badge>
                    ))}
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => form.setValue("images", [])}
                    >
                      Limpar
                    </Button>
                  </div>
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field: { onChange } }) => (
                    <FormItem>
                      <FormLabel asChild>
                        <label htmlFor="file-input" className="space-y-2">
                          <span>Imagens</span>
                          <div
                            className={cn(
                              "flex items-center justify-center p-2 gap-4 rounded-md border bg-transparent",
                              form.formState.errors.images
                                ? "border-destructive"
                                : "border-input"
                            )}
                          >
                            <svg
                              className="w-8 h-8 text-muted-foreground"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="text-center text-sm text-muted-foreground font-semibold">
                              Clique para selecionar <br />{" "}
                              <span className="text-xs">
                                ou araste e solte suas imagens aqui.
                              </span>
                            </p>
                          </div>
                        </label>
                      </FormLabel>
                      <FormControl>
                        <input
                          type="file"
                          multiple
                          id="file-input"
                          onChange={({ target }) => {
                            if (target.files) {
                              const filesToArr = Array.from(target.files)
                              if (filesToArr.length > 5) {
                                return form.setError("images", {
                                  message: "Número máximo de 5 imagens.",
                                })
                              }
                              onChange(filesToArr)
                            }
                          }}
                          disabled={isPending}
                          className="hidden"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {feedbackType === "error" && <FormError message={feedback} />}
            <Button className="w-full md:w-auto md:ml-auto" variant="cta">
              Anunciar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default CreatePostForm
