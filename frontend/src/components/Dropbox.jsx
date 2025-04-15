import { useDropzone } from 'react-dropzone';

export default function Dropbox({ onImageUpload, image }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div 
        {...getRootProps()} 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
      >
        <input {...getInputProps()} />
        {image ? (
          <div className="flex flex-col items-center">
            <img 
              src={image} 
              alt="Uploaded preview" 
              className="max-h-64 mb-4 rounded-md"
            />
            <p className="text-gray-600">Drop another image here, or click to select</p>
          </div>
        ) : (
          <div>
            <p className="text-gray-600">Drag & drop an image here, or click to select</p>
            <p className="text-sm text-gray-500 mt-2">Supports: JPEG, JPG, PNG</p>
          </div>
        )}
      </div>
    </div>
  );
}