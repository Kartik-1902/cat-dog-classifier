export default function PredictionResult({ modelName, prediction }) {
  const modelColors = {
    CNN: 'from-purple-500 to-blue-500',
    ANN: 'from-green-500 to-teal-500',
    Resnet: 'from-orange-500 to-amber-500'
  };

  return (
    <div className="border rounded-xl p-5 border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all">
      <div className={`inline-block mb-3 bg-gradient-to-r ${modelColors[modelName]} text-transparent bg-clip-text`}>
        <h3 className="text-lg font-bold">{modelName} Model</h3>
      </div>
      
      {prediction.loading ? (
        <div className="flex items-center justify-center h-24">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></div>
        </div>
      ) : prediction.error ? (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 text-red-400 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {prediction.error}
        </div>
      ) : prediction.result ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Prediction:</span>
            <span className={`font-bold ${prediction.result.class === 'Cat' ? 'text-blue-400' : 'text-amber-400'}`}>
              {prediction.result.class}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Confidence:</span>
            <span className="font-semibold text-gray-200">
              {(prediction.result.probability * 100).toFixed(1)}%
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${prediction.result.class === 'Cat' ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-gradient-to-r from-amber-400 to-amber-600'}`} 
              style={{ width: `${prediction.result.probability * 100}%` }}
            ></div>
          </div>
          <div className="text-center mt-3">
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${prediction.result.probability > 0.7 ? 'bg-green-900/30 text-green-400' : prediction.result.probability > 0.4 ? 'bg-yellow-900/30 text-yellow-400' : 'bg-red-900/30 text-red-400'}`}>
              {prediction.result.probability > 0.7 ? 'High confidence' : prediction.result.probability > 0.4 ? 'Moderate confidence' : 'Low confidence'}
            </span>
          </div>
        </div>
      ) : (
        <div className="bg-gray-700/30 rounded-lg p-3 text-center text-gray-500 text-sm">
          No prediction available
        </div>
      )}
    </div>
  );
}