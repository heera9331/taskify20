"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { axios } from "@/lib/axios";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null); // State for file
  const [preview, setPreview] = useState<string | null>(null); // State for preview URL
  const [message, setMessage] = useState<string>(""); // State for message

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null; // Handle no file selected
    setFile(selectedFile);

    // Generate preview for image files
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); // Set preview URL
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null); // Clear preview if not an image
    }
  };

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    try {
      // Read file content as a base64 string
      const reader = new FileReader();
      reader.onloadend = async () => {
        const fileContent = reader.result;

        // Send the file content and metadata in the request body
        const payload = {
          fileName: file.name,
          fileType: file.type,
          fileContent,
          metadata: {
            additionalField: "test",
          },
        };

        const response = await axios.post("/api/upload", payload);
        const data = response.data;

        if (response) {
          setMessage(`File uploaded successfully: ${data.fileName}`);
          setPreview(null); // Clear preview after upload
          setFile(null); // Reset file state
        } else {
          setMessage("Failed to upload file.");
        }
      };

      reader.readAsDataURL(file); // Read file as base64
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("An error occurred while uploading the file.");
    }
  };

  return (
    <div className="upload-container min-h-screen m-4 rounded-xl bg-white p-4">
      <form
        className="flex flex-col gap-2 max-w-[400px] border border-dashed p-6"
        onSubmit={handleUpload}
      >
        <input type="file" onChange={handleFileChange} name="file" />
        {preview && (
          <div className="mt-4">
            <p className="mb-2 text-gray-600">Preview:</p>
            <Image
              src={preview}
              alt="Selected file preview"
              className="max-w-full max-h-[200px] rounded-md border"
              height={1000}
              width={1000}
            />
          </div>
        )}
        <Button
          type="submit"
          className="mt-4 bg-gray-800 text-white px-3 py-1 rounded-md"
        >
          Upload
        </Button>
        {message && <p className="mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default FileUpload;
