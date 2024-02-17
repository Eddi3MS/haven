export function deleteFromCloudinaryWithDeleteToken(token: string) {
  let deleteForm = new FormData()
  deleteForm.append("token", token)
  fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/delete_by_token`,
    {
      method: "POST",
      body: deleteForm,
    }
  )
}
