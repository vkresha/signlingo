import { useState } from 'react';
import { ArrowLeft, Check, Volume2, Eye } from 'lucide-react';

interface Sign {
  id: string;
  word: string;
  description: string;
  videoUrl: string;
  instructions: string[];
  tips: string;
}


interface SignCardProps {
  sign: Sign;
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export function SignCard({ sign, onBack, onComplete, isCompleted }: SignCardProps) {
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Pelajaran
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="mb-2">{sign.word}</h2>
                <p className="opacity-90">{sign.description}</p>
              </div>
              {isCompleted && (
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full">
                  <Check className="w-5 h-5" />
                  Lengkap
                </div>
              )}
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Visual Demonstration */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-600" />
                <h3 className="text-gray-900">Demonstrasi Visual</h3>
              </div>
              <div className="aspect-video bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl overflow-hidden">
                <video
                src={sign.videoUrl}
                className="w-full h-full object-contain"
                autoPlay
                playsInline
                controls
              />
              </div>
            </div>

            {/* Toggle Instructions */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowInstructions(true)}
                className={`flex-1 py-3 px-6 rounded-lg transition-all ${
                  showInstructions
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Arahan Langkah demi Langkah
              </button>
              <button
                onClick={() => setShowInstructions(false)}
                className={`flex-1 py-3 px-6 rounded-lg transition-all ${
                  !showInstructions
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Petua & Nota
              </button>
            </div>

            {/* Instructions or Tips */}
            <div className="bg-gray-50 rounded-xl p-6">
              {showInstructions ? (
                <div className="space-y-4">
                  <h3 className="text-gray-900">Cara Membuat Isyarat</h3>
                  <ol className="space-y-3">
                    {sign.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 pt-0.5">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-gray-900">Pro Tips</h3>
                  </div>
                  <p className="text-gray-700">{sign.tips}</p>
                </div>
              )}
            </div>

            {/* Action Button */}
            {!isCompleted && (
              <button
                onClick={onComplete}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Tandakan sebagai Telah Dipelajari
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
