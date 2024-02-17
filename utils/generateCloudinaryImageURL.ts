export function generateCloudinaryImageURL(imageID: string) {
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto/q_auto/ar_16:9,c_fill,w_500,g_auto/${imageID}`
}
