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
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cat/Dog Classifier</h1>
          <p className="text-lg text-gray-600">Upload an image to classify whether it's a cat or a dog</p>
        </div>

        <Dropbox onImageUpload={handleImageUpload} image={image} />

        {image && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Classification Results</h2>
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
      </div>
    </div>
  );
}