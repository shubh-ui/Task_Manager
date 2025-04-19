import React, { useState } from "react";
import { Input } from "./ui/input";
import { Trash } from "lucide-react";

const ImagePreview = () => {
  // State to store the image URL for preview
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handler for file input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file
    if (file) {
      // Generate a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {/* <Label htmlFor="picture">Picture</Label> */}
     {!imagePreview && <Input
        id="picture"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />}

      {/* Display the preview if there's an image */}
      {imagePreview && (
        <div className="mt-2 flex items-center justify-center">
          <div className="relative">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-[84px] h-[84px] object-cover rounded-full"
          />
          <span className="h-[28px] w-[28px] flex items-center justify-center bg-gray-300 rounded-full absolute right-0 bottom-2 ml-14 cursor-pointer"><Trash onClick={() => setImagePreview(null)} size={16} /></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
