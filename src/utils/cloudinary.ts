export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "ncfhc4bh") 

  try {
    const response = await fetch("https://api.cloudinary.com/v1_1/ddvak7spd/image/upload", {
      method: "POST",
      body: formData
    })

    if (!response.ok) {
      throw new Error("Failed to upload image")
    }

    const data = await response.json()
    return data.secure_url 
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error)
    throw error
  }
}
