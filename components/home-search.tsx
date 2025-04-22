"use client"
import React, { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { FaMapMarkerAlt } from "react-icons/fa"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import Link from "next/link"

export default function HomeSearch() {
  const [search, setSearch] = useState({
    category: "",
    bathroomCount: "",
    bedroomCount: "",
  })

  return (
    <>
      <div className="max-w-2xl w-full mx-auto bg-white rounded-lg shadow-lg p-4 mb-10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Select
              onValueChange={(value) =>
                setSearch((curr) => ({ ...curr, bedroomCount: value }))
              }
              value={search.bedroomCount}
            >
              <SelectTrigger>
                <SelectValue placeholder="Quartos" />
              </SelectTrigger>

              <SelectContent className="min-w-full">
                <SelectItem value=" ">Qualquer</SelectItem>
                <SelectItem value={"1"}>1+</SelectItem>
                <SelectItem value={"2"}>2+</SelectItem>
                <SelectItem value={"3"}>3+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Select
              onValueChange={(value) =>
                setSearch((curr) => ({ ...curr, bathroomCount: value }))
              }
              value={search.bathroomCount}
            >
              <SelectTrigger>
                <SelectValue placeholder="Banheiros" />
              </SelectTrigger>

              <SelectContent className="min-w-full">
                <SelectItem value=" ">Qualquer</SelectItem>
                <SelectItem value={"1"}>1+</SelectItem>
                <SelectItem value={"2"}>2+</SelectItem>
                <SelectItem value={"3"}>3+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <div className="flex-1">
              <Select
                onValueChange={(value) =>
                  setSearch((curr) => ({ ...curr, category: value }))
                }
                value={search.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>

                <SelectContent className="min-w-full">
                  <SelectItem value=" ">Qualquer</SelectItem>
                  <SelectItem value={"SELL"}>Comprar</SelectItem>
                  <SelectItem value={"RENT"}>Alugar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex-1 relative">
            <FaMapMarkerAlt
              className="absolute top-2 left-2 text-gray-400"
              size={20}
            />
            <Input
              type="text"
              placeholder="Localização"
              value="Samonte"
              disabled
              className="w-full focus:outline-none pl-8"
            />
          </div>
        </div>
      </div>

      <Button
        size="xl"
        className="bg-gradient-to-r from-blue-800 to-blue-500 text-white hover:from-blue-900 hover:to-blue-600
"
        asChild
      >
        <Link
          href={`/havens?${
            search.category.trim() ? `category=${search.category}&` : ""
          }${
            search.bathroomCount.trim()
              ? `bathroomCount=${search.bathroomCount}&`
              : ""
          }${
            search.bedroomCount.trim()
              ? `bedroomCount=${search.bedroomCount}`
              : ""
          }`}
        >
          Buscar Imóveis
        </Link>
      </Button>
    </>
  )
}
