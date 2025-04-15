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
    <div className="bg-gray-800/50 rounded-xl shadow-lg p-6 backdrop-blur-sm border border-gray-700 mb-8 transition-all hover:border-blue-400/50">
      <div 
        {...getRootProps()} 
        className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center cursor-pointer transition-all hover:border-blue-400 hover:bg-gray-800/30"
      >
        <input {...getInputProps()} />
        {image ? (
          <div className="flex flex-col items-center">
            <div className="relative group">
              <img 
                src={image} 
                alt="Uploaded preview" 
                className="max-h-64 mb-4 rounded-lg shadow-md group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute inset-0 bg-blue-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-gray-900/80 text-white px-3 py-1 rounded-full text-sm">
                  Change Image
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">Drop another image here, or click to select</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p className="text-gray-300 font-medium">Drag & drop an image here</p>
              <p className="text-gray-500 text-sm mt-1">or click to browse files</p>
            </div>
            <p className="text-gray-500 text-xs">Supports: JPEG, JPG, PNG</p>
          </div>
        )}
      </div>
    </div>
  );
}