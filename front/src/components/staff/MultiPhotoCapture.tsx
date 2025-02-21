import React, { useState } from 'react';
import { Camera } from '../Camera';
import { X } from 'lucide-react';

interface MultiPhotoCaptureProps {
  required: number;
  onPhotosComplete: (photos: string[]) => void;
  title?: string;
}

export function MultiPhotoCapture({ required, onPhotosComplete, title }: MultiPhotoCaptureProps) {
  const [photos, setPhotos] = useState<string[]>([]);

  const handleCapture = (photo: string) => {
    const newPhotos = [...photos, photo];
    setPhotos(newPhotos);
    if (newPhotos.length === required) {
      onPhotosComplete(newPhotos);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
  };

  return (
    <div className="space-y-4">
      {title && <h3 className="font-medium text-gray-700">{title}</h3>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative">
            <img
              src={photo}
              alt={`Captured ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              onClick={() => removePhoto(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {photos.length < required && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">
            {photos.length} of {required} photos taken
          </p>
          <Camera onCapture={handleCapture} />
        </div>
      )}
    </div>
  );
}