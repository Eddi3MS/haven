"use client"

import { generateSignedUrl } from "@/actions/generate-signed-url"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import ImageCarousel from "@/components/images-carousel"
import { Badge } from "@/components/ui/badge"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import useTextFeedback from "@/hooks/use-text-feedback"
import { PostHavenSchema } from "@/schemas"
import { formatToCurrency, removeNotNumbers } from "@/utils/format-inputs"
import { uploadToCloudinary } from "@/utils/uploadToCloudinary"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostCategory } from "@prisma/client"
import { useCallback, useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const CreatePost = () => {
  const [isPending, startTransition] = useTransition()
  const { feedback, feedbackType, setFeedback, clearFeedback } =
    useTextFeedback("", 5000)

  /* teste */
  const [imageArr, setImageArr] = useState<string[]>([])
  console.log("🚀 ~ CreatePost ~ imageArr:", imageArr)

  const form = useForm<z.infer<typeof PostHavenSchema>>({
    resolver: zodResolver(PostHavenSchema),
    defaultValues: {
      images: undefined,
    },
  })

  const imagesWatch = form.watch("images")

  const handlePreview = useCallback(async () => {
    if (!Array.isArray(imagesWatch) || imagesWatch.length <= 0) return
    let imagesBase64: string[] = []

    for (const image of imagesWatch) {
      imagesBase64.push(URL.createObjectURL(image))
    }

    setImageArr(imagesBase64)
  }, [imagesWatch])

  useEffect(() => {
    handlePreview()
  }, [handlePreview])

  const onSubmit = (values: z.infer<typeof PostHavenSchema>) => {
    const timestamp = Math.round(new Date().getTime() / 1000)

    startTransition(() => {
      generateSignedUrl(timestamp)
        .then(async (response) => {
          if ("signature" in response) {
            const { signature } = response

            const res = await uploadToCloudinary({
              signature,
              timestamp,
              images: values.images,
            })

            if (!res) {
              return setFeedback({
                error:
                  "Erro ao fazer upload das imagens, tente novamente mais tarde.",
              })
            }

            console.log("🚀 ~ .then ~ res:", res)
            // fazer upload do post completo pro db com a id da imagem
          }
        })
        .catch((err) => console.error(err))
    })
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
                            <SelectItem value={PostCategory.SELL}>
                              Venda
                            </SelectItem>
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
                  name="price"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem className="md:w-1/2">
                      <FormLabel>Valor</FormLabel>
                      <FormControl>
                        <Input
                          {...rest}
                          onChange={({ target }) => {
                            target.value = removeNotNumbers(target.value)
                            onChange(target.value)
                          }}
                          value={formatToCurrency(value)}
                          placeholder="R$250.000.00"
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
                <FormItem className="lg:col-span-2">
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
              <div className="grid gap-2">
                <h2>imagens selecionadas:</h2>
                <div className="flex gap-2">
                  {imagesWatch.map((image, i) => (
                    <Badge key={i} variant="outline">
                      {image.name}
                    </Badge>
                  ))}
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => form.setValue("images", [])}
                  >
                    limpar imagens
                  </Button>
                </div>

                {imageArr.length > 0 ? (
                  <ImageCarousel images={imageArr} />
                ) : null}
              </div>
            ) : (
              <FormField
                control={form.control}
                name="images"
                render={({ field: { onChange, value } }) => (
                  <FormItem className="h-full">
                    <FormLabel asChild>
                      <label
                        className="h-full flex flex-col items-center justify-center p-6 rounded-md border border-input bg-transparent"
                        htmlFor="file-input"
                      >
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
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
          {feedbackType === "success" && <FormSuccess message={feedback} />}
          <Button className="mt-5">Anunciar</Button>
        </form>
      </Form>
    </div>
  )
}

export default CreatePost
