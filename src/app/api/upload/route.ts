
import cloudinary from "@/components/ui/cloudinary";
import { NextResponse } from "next/server";

// when you upload image file and print this file in console
// this is object that you will get, contain name, size, type and other properties
// Blob is a file-like object of immutable, raw data; it can be read as text or binary data
type FormDataFile = Blob & {
  name?: string; // Optional: Some browsers may add this
};

export async function POST(request: Request) {
  try {
    // get the form data from the request
    // This will be used to handle file uploads
    const formData = await request.formData();
    // Extract the file and pathName from the form data
    const file = formData.get("file") as FormDataFile | null;
    // get the pathName from the form data
    // This is the folder name where the image will be uploaded in Cloudinary
    const pathName = formData.get("pathName") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    // Convert the file to a format Cloudinary can handle (Buffer or Base64)
    const fileBuffer = await file.arrayBuffer();
    // Convert ArrayBuffer to Buffer (base64 encoding)
    const base64File = Buffer.from(fileBuffer).toString("base64");
    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(
      `data:${file.type};base64,${base64File}`,
      {
        // Specify the folder where the image will be stored
        folder: pathName,
        // specify the transformation options
        // Here we are resizing the image to 200x200 pixels and cropping it to fill the space
        transformation: [
          { width: 200, height: 200, crop: "fill", gravity: "face" },
        ],
      }
    );
    // Return the secure URL of the uploaded image and save it to the database as url object
    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
