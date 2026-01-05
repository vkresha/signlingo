import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader, File, X } from 'lucide-react';

interface ModelUploaderProps {
  onModelLoaded: (modelInfo: ModelInfo) => void;
}

export interface ModelInfo {
  name: string;
  size: number;
  uploadedAt: Date;
  status: 'loaded' | 'error';
}

export function ModelUploader({ onModelLoaded }: ModelUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadedModel, setUploadedModel] = useState<ModelInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = async (files: File[]) => {
    // Find .pth or .pt file
    const modelFile = files.find(f => 
      f.name.endsWith('.pth') || 
      f.name.endsWith('.pt') ||
      f.name.endsWith('.h5') ||
      f.name.endsWith('.json')
    );

    if (!modelFile) {
      setUploadStatus('error');
      setErrorMessage('Please upload a valid model file (.pth, .pt, .h5, or model.json)');
      return;
    }

    // Start upload simulation
    setUploadStatus('uploading');
    setErrorMessage('');
    setUploadProgress(0);

    try {
      // Simulate progressive upload
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(i);
      }

      // Simulate model validation and conversion
      await new Promise(resolve => setTimeout(resolve, 500));

      const modelInfo: ModelInfo = {
        name: modelFile.name,
        size: modelFile.size,
        uploadedAt: new Date(),
        status: 'loaded'
      };

      setUploadedModel(modelInfo);
      setUploadStatus('success');
      onModelLoaded(modelInfo);

    } catch (error) {
      setUploadStatus('error');
      setErrorMessage('Failed to process model file. Please try again.');
      console.error('Model upload error:', error);
    }
  };

  const handleRemoveModel = () => {
    setUploadedModel(null);
    setUploadStatus('idle');
    setUploadProgress(0);
    setErrorMessage('');
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (uploadedModel && uploadStatus === 'success') {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-gray-900">Model Loaded Successfully</h3>
              <p className="text-sm text-gray-600">Ready for sign detection</p>
            </div>
          </div>
          <button
            onClick={handleRemoveModel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <File className="w-5 h-5 text-green-700" />
            <span className="text-green-900">{uploadedModel.name}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-green-700">
            <span>Size: {formatFileSize(uploadedModel.size)}</span>
            <span>Uploaded: {uploadedModel.uploadedAt.toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            ℹ️ The model is now active and will be used for camera-based sign detection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-4">
        <h3 className="text-gray-900 mb-2">Upload ML Model</h3>
        <p className="text-sm text-gray-600">
          Upload your PyTorch (.pth) or TensorFlow model file for sign language detection
        </p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50'
            : uploadStatus === 'error'
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400'
        }`}
      >
        {uploadStatus === 'uploading' ? (
          <div className="text-center space-y-4">
            <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto" />
            <div>
              <p className="text-gray-900 mb-2">Uploading model...</p>
              <div className="max-w-xs mx-auto bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">{uploadProgress}%</p>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
              uploadStatus === 'error' ? 'bg-red-100' : 'bg-indigo-100'
            }`}>
              {uploadStatus === 'error' ? (
                <AlertCircle className="w-8 h-8 text-red-600" />
              ) : (
                <Upload className="w-8 h-8 text-indigo-600" />
              )}
            </div>

            <div>
              <p className="text-gray-900 mb-1">
                Drag and drop your model file here
              </p>
              <p className="text-sm text-gray-600">
                or click to browse
              </p>
            </div>

            <input
              type="file"
              accept=".pth,.pt,.h5,.json"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500">
              <span className="px-2 py-1 bg-white rounded border border-gray-200">.pth</span>
              <span className="px-2 py-1 bg-white rounded border border-gray-200">.pt</span>
              <span className="px-2 py-1 bg-white rounded border border-gray-200">.h5</span>
              <span className="px-2 py-1 bg-white rounded border border-gray-200">.json</span>
            </div>

            {uploadStatus === 'error' && errorMessage && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800">{errorMessage}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800 mb-2">
          <strong>Note:</strong> For browser compatibility, PyTorch models need to be converted to TensorFlow.js format.
        </p>
        <p className="text-xs text-yellow-700">
          You can convert your model using ONNX or use tools like <code className="bg-yellow-100 px-1 rounded">tensorflowjs_converter</code>
        </p>
      </div>
    </div>
  );
}
