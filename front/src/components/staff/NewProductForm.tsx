import React, { useState, useRef } from 'react';
import { ProductCapture } from './ProductCapture';

export function NewProductForm() {
  const [files, setFiles] = useState({
    file1: '',
    file2: '',
  });
  
  const [uploaded, setUploaded] = useState(false); // State to track if files have been uploaded
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [message, setMessage] = useState(''); // State for success or error messages
  
  // Create refs for file inputs
  const fileInput1Ref = useRef<HTMLInputElement>(null);
  const fileInput2Ref = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!files.file1 || !files.file2) {
      alert('Please upload both images (file1 and file2) before submitting.');
      return;
    }

    setLoading(true); // Start loading indicator
    setMessage(''); // Clear previous message

    const formData = new FormData();
    formData.append('file1', dataURLtoFile(files.file1, 'file1.jpg'));
    formData.append('file2', dataURLtoFile(files.file2, 'file2.jpg'));
  
    try {
      const response = await fetch('http://localhost:8080/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Files uploaded successfully:', data);
        setUploaded(true); // Set uploaded state to true when upload is successful
        setMessage('Item has been added.');
      } else {
        console.error('Error uploading files:', response.statusText);
        setMessage('Error uploading files, please try again.');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setMessage('Error uploading files, please try again.');
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  const handleFileChange = (fileNumber: 1 | 2) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFiles(prev => ({
          ...prev,
          [`file${fileNumber}`]: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const dataURLtoFile = (dataUrl: string, filename: string) => {
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    
    if (!mimeMatch) {
      throw new Error('Invalid data URL format');
    }
  
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, { type: mime });
  };

  const resetForm = () => {
    setFiles({
      file1: '',
      file2: '',
    });
    setUploaded(false); // Reset uploaded state to false
    setMessage(''); // Clear any messages
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2 text-white">File 1 (Product Image)</h3>
          {files.file1 ? (
            <div className="space-y-2">
              <img src={files.file1} alt="File 1" className="w-full rounded-lg" />
              <button
                type="button"
                onClick={() => setFiles(prev => ({ ...prev, file1: '' }))} 
                className="text-red-500 text-sm hover:text-red-400"
              >
                Remove Image
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <ProductCapture onCapture={(img) => setFiles(prev => ({ ...prev, file1: img }))} />
              <div className="text-center">
                <p className="text-white mb-2">- or -</p>
                <input
                  type="file"
                  ref={fileInput1Ref}
                  onChange={handleFileChange(1)}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInput1Ref.current?.click()}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Upload from Computer
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2 text-white">File 2 (Nutrition Image)</h3>
          {files.file2 ? (
            <div className="space-y-2">
              <img src={files.file2} alt="File 2" className="w-full rounded-lg" />
              <button
                type="button"
                onClick={() => setFiles(prev => ({ ...prev, file2: '' }))} 
                className="text-red-500 text-sm hover:text-red-400"
              >
                Remove Image
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <ProductCapture onCapture={(img) => setFiles(prev => ({ ...prev, file2: img }))} />
              <div className="text-center">
                <p className="text-white mb-2">- or -</p>
                <input
                  type="file"
                  ref={fileInput2Ref}
                  onChange={handleFileChange(2)}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInput2Ref.current?.click()}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Upload from Computer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {loading && (
        <div className="w-full mt-4 flex justify-center items-center">
          <div className="border-t-4 border-blue-500 border-solid w-8 h-8 rounded-full animate-spin"></div>
          <p className="text-white text-center ml-4">Uploading...</p>
        </div>
      )}

      <button
        type="submit"
        className="button-primary w-full text-white"
        disabled={loading || uploaded} // Disable button while loading or uploaded
      >
        {uploaded ? 'Item Already Added' : 'Add Product'}
      </button>

      {message && (
        <p className="mt-4 text-center text-green-500">{message}</p>
      )}

      {uploaded && (
        <button
          type="button"
          onClick={resetForm}
          className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
        >
          Reset Form
        </button>
      )}
    </form>
  );
}
