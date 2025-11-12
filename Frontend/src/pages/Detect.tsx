import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Image as ImageIcon, AlertCircle, CheckCircle } from 'lucide-react';

export function Detect() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image (JPG, PNG, or WebP)');
      return;
    }

    if (file.size > maxSize) {
      setError('Image size should be less than 10MB');
      return;
    }

    setError('');
    setImage(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-leaf-500', 'bg-leaf-500/5');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('border-leaf-500', 'bg-leaf-500/5');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-leaf-500', 'bg-leaf-500/5');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!image) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { predictPlantDisease } = await import('../lib/api');
      const result = await predictPlantDisease(image);
      
      // Format the result to match the expected structure
      const detection = {
        predicted_disease: result.predicted_disease, // Store original for chat
      };
      
      navigate('/results', { state: { detection, imagePreview: preview } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 py-12">
      <div className="section-container max-w-2xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Detect Plant Disease</h1>
          <p className="text-xl text-dark-300">
            Upload a clear image of your plant to get AI-powered disease detection and treatment recommendations.
          </p>
        </div>

        <div className="space-y-8">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-dark-700 rounded-xl p-12 text-center cursor-pointer transition-all duration-200 hover:border-leaf-500 hover:bg-leaf-500/5"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              className="hidden"
            />

            {preview ? (
              <div className="space-y-4">
                <CheckCircle className="w-16 h-16 text-leaf-500 mx-auto" />
                <p className="text-lg font-semibold text-leaf-400">Image Ready</p>
                <p className="text-dark-400">{image?.name}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center gap-4">
                  <Upload className="w-12 h-12 text-dark-400" />
                  <ImageIcon className="w-12 h-12 text-dark-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-2">Drag and drop your plant image</p>
                  <p className="text-dark-400">or click to browse from your device</p>
                </div>
                <p className="text-sm text-dark-500">
                  Supported formats: JPG, PNG, WebP (Max 10MB)
                </p>
              </div>
            )}
          </div>

          {preview && (
            <div className="relative rounded-xl overflow-hidden border border-dark-800">
              <img src={preview} alt="Preview" className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent" />
            </div>
          )}

          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleAnalyze}
              disabled={!image || loading}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing...' : 'Analyze Plant'}
            </button>
            {image && (
              <button
                onClick={() => {
                  setImage(null);
                  setPreview('');
                  setError('');
                }}
                className="btn-secondary"
              >
                Clear
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-8 border-t border-dark-800">
            <div className="space-y-3">
              <h3 className="font-semibold text-leaf-400">Tips for Best Results</h3>
              <ul className="space-y-2 text-dark-400 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-leaf-500 mt-1">•</span>
                  <span>Use clear, well-lit images of the affected plant area</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-leaf-500 mt-1">•</span>
                  <span>Focus on leaves or stems showing visible symptoms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-leaf-500 mt-1">•</span>
                  <span>Avoid blurry or overly dark images</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-leaf-500 mt-1">•</span>
                  <span>Make sure the affected area is clearly visible</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-leaf-400">How to Take a Good Photo</h3>
              <ul className="space-y-2 text-dark-400 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-leaf-500 mt-1">•</span>
                  <span>Use natural daylight when possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-leaf-500 mt-1">•</span>
                  <span>Keep the phone steady - use both hands</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-leaf-500 mt-1">•</span>
                  <span>Get close to capture details clearly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-leaf-500 mt-1">•</span>
                  <span>Avoid shadows and glare on the leaf surface</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
