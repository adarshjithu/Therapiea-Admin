'use client';
import React, { useState, ChangeEvent } from 'react';



function Media({images,setImages,video,setVideo,errors,setFormData,formData}:Record<string,any>) {
  

  // Handle multiple image selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
      const formDataImages = formData?.images;
      setFormData({...formData,images:[...formDataImages,...Array.from(e.target.files)]})
    }
  };

  // Remove single image
  const removeImage = (index: number) => {
    const newImages = images.filter((_: File, i: number) => i !== index)
    setImages(newImages)
    setFormData({...formData,images:newImages})
  };

  // Handle video selection
  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold text-gray-800">Media Upload</h1>

      {/* Image Upload Section */}
      <div className="flex flex-col gap-4">
        <label className="block text-sm font-medium text-gray-700">Images</label>

        {/* Drag & Drop / Select */}
        <label className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-[#F3F4F6] text-center hover:border-blue-500">
          <span className="text-gray-500">Drag & Drop or Click to select images</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {/* Preview Selected Images - Gallery Style */}
        {images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {images.map((img: File, index: number) => (
              <div
                key={index}
                className="relative w-full overflow-hidden rounded-lg bg-gray-100"
                style={{ aspectRatio: '16/9' }} // Keeps the image wide and not too tall
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt={`preview-${index}`}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 rounded-full bg-red-600 p-1 text-white text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
          


        )}
      </div>
      {errors?.images && (
              <span className="mt-2 block text-sm font-medium text-red-500">{errors.images}</span>
            )}
      {/* Video Upload Section */}
      <div className="flex flex-col gap-2">
        <label className="block text-sm font-medium text-gray-700">Video</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          className="w-full rounded-md border border-gray-300 bg-[#F3F4F6] px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {video && (
          <video
            controls
            className="mt-2 w-full rounded-md"
            src={URL.createObjectURL(video)}
          />
        )}
      </div>
    </div>
  );
}

export default Media;
