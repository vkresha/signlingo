import { useState } from 'react';
import { Camera, BookCheck } from 'lucide-react';
import { CameraDetectionMode } from './CameraDetectionMode';
import { QuizMode } from './QuizMode';

interface PracticeModeProps {
  onQuizComplete: (score: number) => void;
}

export function PracticeMode({ onQuizComplete }: PracticeModeProps) {
  const [practiceType, setPracticeType] = useState<'selection' | 'camera' | null>(null);

  if (practiceType === 'camera') {
    return <CameraDetectionMode onQuizComplete={onQuizComplete} />;
  }

  if (practiceType === 'quiz') {
    return <QuizMode onQuizComplete={onQuizComplete} />;
  }

  // Practice mode selection
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h2 className="text-gray-900 mb-2">Pilih Mod Latihan</h2>
          <p className="text-gray-600">Pilih cara anda ingin berlatih kemahiran bahasa isyarat anda</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => setPracticeType('camera')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left"
          >
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">Pengesanan Kamera</h3>
                <p className="text-gray-600">
                  Gunakan kamera untuk membuat isyarat secara langsung. Dapatkan maklum balas segera tentang ketepatan isyarat anda.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">Masa Sebenar</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Interaktif</span>
                <span className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full">Disyorkan</span>
              </div>
            </div>
          </button>

          <button
            onClick={() => setPracticeType('quiz')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left"
          >
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">Kuiz Pengenalan</h3>
                <p className="text-gray-600">
                  Kenal pasti isyarat dari imej. Sesuai untuk belajar mengenal pasti pelbagai isyarat dengan cepat.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">Cepat</span>
                <span className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full">Tidak perlu kamera</span>
              </div>
            </div>
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-xl p-6 text-center">
          <p className="text-gray-700">
            <span className="font-semibold text-indigo-600">💡 Tip:</span> Mula dengan Kuiz Pengenalan untuk belajar isyarat, kemudian gunakan Pengesanan Kamera untuk berlatih membuat isyarat anda!
          </p>
        </div>
      </div>
    </div>
  );
}