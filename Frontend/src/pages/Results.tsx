import { useLocation } from 'react-router-dom';
import { Chatbot } from '../components/Chatbot';

export function Results() {
  const location = useLocation();
  const { detection, imagePreview } = location.state || {};

  if (!detection) return <p className="text-center mt-20 text-red-500">No detection data found.</p>;

  return (
    <div className="min-h-screen bg-dark-950 py-12 section-container">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Detection Results</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {imagePreview && <img src={imagePreview} alt="Detected Plant" className="w-full rounded-xl border border-dark-800" />}
          <div className="p-6 bg-dark-900 rounded-xl border border-dark-800 space-y-2">
            <h2 className="text-xl font-semibold">{detection.predicted_disease}</h2>


          </div>
        </div>

        <div className="h-full">
          {/* <Chatbot sessionId={sessionId} disease={detection.predicted_disease} /> */}
          <Chatbot disease={detection.predicted_disease} />
        </div>
      </div>
    </div>
  );
}
