export async function uploadImage(
  file: File,
  category: string = "Others",
  title: string = ""
) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("category", category);
  formData.append("title", title);

  const res = await fetch("/api/cloudinary/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Image upload failed");
  }

  return data;
}