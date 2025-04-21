"use client"

import { NoPhoneWarning } from "@/components/post/no-phone-warning"
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
import { PostSchema, PostType } from "@/schemas"
import { categoriesTranslated } from "@/utils/categoryTranslation"
import { formatToCurrency, removeNotNumbers } from "@/utils/format-inputs"
import { objKeys } from "@/utils/objectTypedMethods"
import { shortName } from "@/utils/shortName"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostCategory } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { BiLoader } from "react-icons/bi"

const initValues: PostType = {
  address: "",
  number: "",
  district: "",
  area: "",
  bathroomCount: "",
  bedroomCount: "",
  builtArea: "",
  category: "SELL",
  description: "",
  images: [],
  price: "",
  title: "",
  variation: "files",
}

const PostForm = ({
  defaultValues = initValues,
  loading,
  onSubmit,
  isEditing = false,
}: {
  defaultValues?: PostType
  onSubmit: (values: PostType) => Promise<void>
  loading: boolean
  isEditing?: boolean
}) => {
  const router = useRouter()
  const form = useForm<PostType>({
    resolver: zodResolver(PostSchema),
    defaultValues,
  })

  const imagesWatch = form.watch("images")
  const categoryWatch = form.watch("category")

  const handleBack = () => {
    router.back()
  }

  return (
    <section className="container">
      <NoPhoneWarning />
      <Card className="mt-8 fade-in">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-center">
            {isEditing ? "Editar seu anúncio" : "Anuncie seu imóvel"}
          </h2>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
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

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Endereço</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Av. Magalhães Pinto"
                              disabled={loading}
                              error={!!form.formState.errors.address}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="1201"
                              disabled={loading}
                              error={!!form.formState.errors.number}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Bairro</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Centro"
                              disabled={loading}
                              error={!!form.formState.errors.district}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
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
                              onValueChange={(value) => {
                                field.onChange(value)
                                form.setValue("price", "")
                              }}
                              defaultValue={field.value}
                              key={field.value}
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

                <FormField
                  control={form.control}
                  name="images"
                  render={({ field: { onChange } }) => (
                    <FormItem>
                      <FormLabel asChild>
                        <label htmlFor="file-input" className="space-y-2">
                          <span>Imagens</span>
                          {Array.isArray(imagesWatch) &&
                          imagesWatch.length >= 3 ? (
                            <div className="flex gap-2 flex-wrap">
                              {imagesWatch.map((image, i) => (
                                <Badge key={i} variant="outline">
                                  {shortName(image.name)}
                                </Badge>
                              ))}
                              <div onClick={(e) => e.stopPropagation()}>
                                <Button
                                  type="button"
                                  variant="secondary"
                                  onClick={() => {
                                    form.setValue("images", [])
                                    if (form.watch("variation") === "ids") {
                                      form.setValue("variation", "files")
                                    }
                                  }}
                                  disabled={loading}
                                >
                                  Limpar
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div
                              className={cn(
                                "flex items-center justify-center p-2 gap-4 rounded-md border border-input bg-transparent min-h-[60px]",
                                form.formState.errors.images &&
                                  "border-destructive"
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
                          )}
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
                              if (
                                filesToArr.length > 5 ||
                                filesToArr.length < 3
                              ) {
                                form.setError("images", {
                                  message: "Número máximo de 5 imagens.",
                                })
                                form.trigger("images")
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
              </div>

              <div className="flex gap-4 justify-end">
                {isEditing ? (
                  <Button
                    className="w-full md:w-auto min-w-[110px] uppercase"
                    variant="secondary"
                    disabled={loading}
                    onClick={handleBack}
                    type="button"
                  >
                    Cancelar
                  </Button>
                ) : null}

                <Button
                  className="w-full md:w-auto min-w-[110px]"
                  variant="cta"
                  disabled={loading}
                >
                  {loading ? (
                    <BiLoader className="animate-spin" />
                  ) : isEditing ? (
                    "Atualizar"
                  ) : (
                    "Anunciar"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  )
}

export default PostForm
