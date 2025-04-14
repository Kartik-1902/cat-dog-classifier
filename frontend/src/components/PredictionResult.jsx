export default function PredictionResult({ modelName, prediction }) {
    return (
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-700 mb-3">{modelName} Model</h3>
        
        {prediction.loading ? (
          <div className="flex items-center justify-center h-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : prediction.error ? (
          <p className="text-red-500">{prediction.error}</p>
        ) : prediction.result ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Prediction:</span>
              <span className={`font-semibold ${prediction.result.class === 'Cat' ? 'text-blue-600' : 'text-amber-600'}`}>
                {prediction.result.class}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Confidence:</span>
              <span className="font-semibold text-gray-800">
                {(prediction.result.probability * 100).toFixed(0)}%
              </span>
            </div>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${prediction.result.class === 'Cat' ? 'bg-blue-600' : 'bg-amber-500'}`} 
                style={{ width: `${prediction.result.probability * 100}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No prediction yet</p>
        )}
      </div>
    );
  }