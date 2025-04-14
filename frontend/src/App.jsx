import { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
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
  const [models, setModels] = useState({
    CNN: null,
    ANN: null,
    Resnet: null
  });
  const imageRef = useRef();

  // Load all TensorFlow models
  useEffect(() => {
    async function loadModels() {
      try {
        await tf.ready();
        
        // Load each model from the public/models directory
        const modelPromises = {
          CNN: tf.loadLayersModel('/models/cnnjs_model/model.json'),
          ANN: tf.loadLayersModel('/models/annjs_model/model.json'),
          Resnet: tf.loadLayersModel('/models/resnetjs_model/model.json')
        };

        const loadedModels = {};
      
        for (const [name, loader] of Object.entries(modelLoaders)) {
          try {
            loadedModels[name] = await loader();
            console.log(`${name} model loaded successfully`);
          } catch (err) {
            console.error(`Error loading ${name} model:`, err);
            loadedModels[name] = null;
          }
        }
  
        setModels(loadedModels);
      } catch (error) {
        console.error('Error initializing TensorFlow:', error);
      }
    }
    loadModels();
  }, []);

  const handleImageUpload = (imageData) => {
    setImage(imageData);
    setPredictions({
      CNN: { loading: true, result: null, error: null },
      ANN: { loading: true, result: null, error: null },
      Resnet: { loading: true, result: null, error: null }
    });
  };

  // Classify image when it changes
  useEffect(() => {
    if (!image || !models.CNN || !models.ANN || !models.Resnet) return;

    const classifyImage = async () => {
      try {
        const imgElement = imageRef.current;
        
        // Preprocess image for all models
        const imageTensor = tf.browser.fromPixels(imgElement)
          .resizeNearestNeighbor([128, 128]) // Adjust size based on your model requirements
          .toFloat()
          .div(tf.scalar(255))
          .expandDims();

        // Make predictions with each model
        const cnnPrediction = models.CNN.predict(imageTensor);
        const annPrediction = models.ANN.predict(imageTensor);
        const resnetPrediction = models.Resnet.predict(imageTensor);

        // Get the prediction results
        const results = await Promise.all([
          cnnPrediction.data(),
          annPrediction.data(),
          resnetPrediction.data()
        ]);

        // Dispose tensors to avoid memory leaks
        tf.dispose([imageTensor, cnnPrediction, annPrediction, resnetPrediction]);

        setPredictions({
          CNN: { 
            loading: false, 
            result: {
              class: results[0][0] > 0.5 ? 'Dog' : 'Cat',
              probability: Math.max(results[0][0], 1 - results[0][0]).toFixed(2)
            }, 
            error: null 
          },
          ANN: { 
            loading: false, 
            result: {
              class: results[1][0] > 0.5 ? 'Dog' : 'Cat',
              probability: Math.max(results[1][0], 1 - results[1][0]).toFixed(2)
            }, 
            error: null 
          },
          Resnet: { 
            loading: false, 
            result: {
              class: results[2][0] > 0.5 ? 'Dog' : 'Cat',
              probability: Math.max(results[2][0], 1 - results[2][0]).toFixed(2)
            }, 
            error: null 
          }
        });
      } catch (error) {
        setPredictions({
          CNN: { loading: false, result: null, error: 'Classification failed' },
          ANN: { loading: false, result: null, error: 'Classification failed' },
          Resnet: { loading: false, result: null, error: 'Classification failed' }
        });
      }
    };

    classifyImage();
  }, [image, models]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cat/Dog Classifier</h1>
          <p className="text-lg text-gray-600">Upload an image to classify whether it's a cat or a dog</p>
        </div>

        <Dropbox onImageUpload={handleImageUpload} image={image} imageRef={imageRef} />

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