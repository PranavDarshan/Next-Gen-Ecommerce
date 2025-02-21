import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { Camera, X } from 'lucide-react';

interface ProductCaptureProps {
  onCapture: (image: string) => void;
  buttonText?: string;
}

export function ProductCapture({ onCapture, buttonText = 'Take Photo' }: ProductCaptureProps) {
  const [isCapturing, setIsCapturing] = useState(false);
  const webcamRef = React.useRef<Webcam>(null);

  const handleCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
      setIsCapturing(false);
    }
  };

  return (
    <div className="relative">
      {isCapturing ? (
        <div className="relative">
          <button
            onClick={() => setIsCapturing(false)}
            className="absolute top-2 right-2 p-1 bg-gray-800 rounded-full z-10"
          >
            <X className="h-5 w-5 text-white" />
          </button>
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            className="w-full rounded-lg"
            videoConstraints={{
              facingMode: 'environment'
            }}
          />
          <button
            onClick={handleCapture}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
          >
            Capture Photo
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsCapturing(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 text-white"
        >
          <Camera className="h-5 w-5" />
          <span>{buttonText}</span>
        </button>
      )}
    </div>
  );
}