"use client"

import React from "react"
import { Button } from "../ui/button"
import { deletePost } from "@/actions/posts/delete-post"

export const DeletePostById = () => {
  const handleDeleteById = async () => {
    const id = prompt("insira o id")
    if (!id) return
    const res = await deletePost(id)
  }
  return <Button onClick={handleDeleteById}>Delete</Button>
}
