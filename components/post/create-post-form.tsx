"use client"

import { createPost } from "@/actions/posts/create-post"
import { generateSignedUrl } from "@/actions/posts/generate-signed-url"
import { NoPhoneWarning } from "@/components/no-phone-warning"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
import { cn } from "@/lib/utils"
import { PostHavenSchema } from "@/schemas"
import { categoriesTranslated } from "@/utils/categoryTranslation"
import { deleteFromCloudinaryWithDeleteToken } from "@/utils/deleteFromCloudinaryWithDeleteToken"
import { formatToCurrency, removeNotNumbers } from "@/utils/format-inputs"
import { objKeys } from "@/utils/objectTypedMethods"
import { shortName } from "@/utils/shortName"
import { uploadToCloudinary } from "@/utils/uploadToCloudinary"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostCategory } from "@prisma/client"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { BiLoader } from "react-icons/bi"
import { toast } from "sonner"
import { z } from "zod"

const CreatePostForm = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof PostHavenSchema>>({
    resolver: zodResolver(PostHavenSchema),
    defaultValues: {
      images: undefined,
      category: "SELL",
      title: "",
      address: "",
      area: "",
      bathroomCount: "",
      bedroomCount: "",
      builtArea: "",
      description: "",
      price: "",
    },
  })

  const imagesWatch = form.watch("images")
  const categoryWatch = form.watch("category")

  const onSubmit = async (values: z.infer<typeof PostHavenSchema>) => {
    setLoading(true)
    const timestamp = Math.round(new Date().getTime() / 1000)

    const signatureResponse = await generateSignedUrl(timestamp)

    if ("error" in signatureResponse) {
      return toast.error("Erro ao conectar com o servidor.")
    }

    const { signature } = signatureResponse

    const uploadResponse = await uploadToCloudinary({
      signature,
      timestamp,
      images: values.images,
    })

    if (!uploadResponse) {
      return toast.error(
        "Erro ao fazer upload das imagens, tente novamente mais tarde."
      )
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

      return toast.error(createResponse.error)
    }

    toast.success(createResponse.success)
    setLoading(false)
    form.reset()
  }

  return (
    <>
      <NoPhoneWarning />
      <Card className="mt-8">
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
                            disabled={loading}
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
                            disabled={loading}
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
                              disabled={loading}
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
                              disabled={loading}
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
                              disabled={loading}
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
                              disabled={loading}
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
                              disabled={loading}
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
                          <FormLabel
                            title="área construída"
                            className="truncate"
                          >
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
                              disabled={loading}
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
                          disabled={loading}
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
                        disabled={loading}
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
                            disabled={loading}
                            className="hidden"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <Button
                className="w-full md:w-auto md:ml-auto min-w-[110px]"
                variant="cta"
                disabled={loading}
              >
                {loading ? <BiLoader className="animate-spin" /> : "Anunciar"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}

export default CreatePostForm
