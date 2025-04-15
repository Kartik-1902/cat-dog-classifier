import { useState } from 'react';
import axios from 'axios';
import './global.css';
import Dropbox from './components/Dropbox';
import PredictionResult from './components/PredictionResult';

export default function App() {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState({
    CNN: { loading: false, result: null, error: null },
    ANN: { loading: false, result: null, error: null },
    Resnet: { loading: false, result: null, error: null }
  });

  const handleImageUpload = async (imageData) => {
    setImage(imageData);
    setPredictions({
      CNN: { loading: true, result: null, error: null },
      ANN: { loading: true, result: null, error: null },
      Resnet: { loading: true, result: null, error: null }
    });
  
    try {
      const blob = await fetch(imageData).then(res => res.blob());
      const formData = new FormData();
      formData.append('file', blob, 'upload.jpg');
  
      const response = await axios.post('/api/predict_image', formData);
      const data = response.data;
  
      setPredictions({
        CNN: {
          loading: false,
          result: {
            class: data.CNN.prediction.class,
            probability: data.CNN.prediction.confidence
          },
          error: null
        },
        ANN: {
          loading: false,
          result: {
            class: data.ANN.prediction.class,
            probability: data.ANN.prediction.confidence
          },
          error: null
        },
        Resnet: {
          loading: false,
          result: {
            class: data.ResNet.prediction.class,
            probability: data.ResNet.prediction.confidence
          },
          error: null
        }
      });
    } catch (error) {
      console.error('API Error:', error);
      setPredictions({
        CNN: { loading: false, result: null, error: 'API request failed' },
        ANN: { loading: false, result: null, error: 'API request failed' },
        Resnet: { loading: false, result: null, error: 'API request failed' }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <header className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
              Cat/Dog Classifier
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-100 mb-2">Image Classification</h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Upload an image to classify whether it contains a cat or a dog using different machine learning models
          </p>
        </div>

        <Dropbox onImageUpload={handleImageUpload} image={image} />

        {image && (
          <div className="bg-gray-800/50 rounded-xl shadow-lg p-6 backdrop-blur-sm border border-gray-700">
            <h2 className="text-xl font-semibold text-gray-100 mb-6">Classification Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(predictions).map(([modelName, prediction]) => (
                <PredictionResult 
                  key={modelName}
                  modelName={modelName}
                  prediction={prediction}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}