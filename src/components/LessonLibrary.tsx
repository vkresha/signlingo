import { useState } from 'react';
import { Check, ChevronRight, BookOpen, Users, Utensils, Heart, HelpCircle, Hash, Type } from 'lucide-react';
import { SignCard } from './SignCard';
import { signData } from '../data/signData';

interface LessonLibraryProps {
  completedSigns: Set<string>;
  onSignComplete: (signId: string) => void;
}

const categoryIcons: Record<string, any> = {
  'Salam & Perbualan Asas': BookOpen,
  'Perbuatan Harian': Heart,
  'Keluarga': Users,
  'Makanan & Minuman': Utensils,
  'Emosi & Keadaan Diri': Heart,
  'Pengangkutan, Objek & Keselamatan': HelpCircle,
  'Tempat & Arah': Hash,
  'Masa & Cuaca': Type,
};

const categoryColors: Record<string, { bg: string; border: string; icon: string; progress: string }> = {
  'Salam & Perbualan Asas': { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', progress: 'bg-blue-600' },
  'Perbuatan Harian': { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600', progress: 'bg-purple-600' },
  'Keluarga': { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600', progress: 'bg-green-600' },
  'Makanan & Minuman': { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-600', progress: 'bg-orange-600' },
  'Emosi & Keadaan Diri': { bg: 'bg-pink-50', border: 'border-pink-200', icon: 'text-pink-600', progress: 'bg-pink-600' },
  'Pengangkutan, Objek & Keselamatan': { bg: 'bg-indigo-50', border: 'border-indigo-200', icon: 'text-indigo-600', progress: 'bg-indigo-600' },
  'Tempat & Arah': { bg: 'bg-teal-50', border: 'border-teal-200', icon: 'text-teal-600', progress: 'bg-teal-600' },
  'Masa & Cuaca': { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-600', progress: 'bg-red-600' },
};

export function LessonLibrary({ completedSigns, onSignComplete }: LessonLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSign, setSelectedSign] = useState<string | null>(null);

  const categories = Object.keys(signData);

  if (selectedSign) {
    const sign = Object.values(signData)
      .flat()
      .find(s => s.id === selectedSign);

    if (sign) {
      return (
        <SignCard
          sign={sign}
          onBack={() => setSelectedSign(null)}
          onComplete={() => onSignComplete(sign.id)}
          isCompleted={completedSigns.has(sign.id)}
        />
      );
    }
  }

  if (selectedCategory) {
    const signs = signData[selectedCategory];
    const categoryProgress = signs.filter(s => completedSigns.has(s.id)).length;

    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            Kembali ke Kategori
          </button>

          <div className="mb-8">
            <h2 className="text-gray-900 mb-2">{selectedCategory}</h2>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(categoryProgress / signs.length) * 100}%` }}
                />
              </div>
              <span className="text-sm text-gray-600">
                {categoryProgress}/{signs.length}
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {signs.map((sign) => (
              <button
                key={sign.id}
                onClick={() => setSelectedSign(sign.id)}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 text-left relative"
              >
                {completedSigns.has(sign.id) && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="aspect-video bg-black rounded-lg mb-4 overflow-hidden">
                  <video
                    src={sign.videoUrl}
                    className="w-full h-full object-contain"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
                <h3 className="text-gray-900 mb-1">{sign.word}</h3>
                <p className="text-sm text-gray-500">{sign.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-2">Belajar Bahasa Isyarat Malaysia</h2>
          <p className="text-gray-600">Pilih kategori untuk mula belajar</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const signs = signData[category];
            const completed = signs.filter(s => completedSigns.has(s.id)).length;
            const progress = (completed / signs.length) * 100;
            const Icon = categoryIcons[category] || BookOpen;
            const colors = categoryColors[category] || categoryColors['Salam & Perbualan Asas'];

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border-2 ${colors.border} relative overflow-hidden`}
              >
                {/* Background decoration */}
                <div className={`absolute top-0 right-0 w-24 h-24 ${colors.bg} rounded-full -mr-12 -mt-12 opacity-50`} />
                
                <div className="relative space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    {completed === signs.length && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-gray-900 mb-1 text-left">{category}</h3>
                    <p className="text-sm text-gray-500 text-left">{signs.length} isyarat untuk dipelajari</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{completed}/{signs.length}</span>
                      <span className={`${colors.icon}`}>{progress.toFixed(0)}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className={`${colors.progress} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Learning Stats */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-900 mb-4">Kemajuan Belajar Anda</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-1">{categories.length}</div>
              <p className="text-sm text-gray-600">Kategori Tersedia</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1 text-indigo-600">{completedSigns.size}</div>
              <p className="text-sm text-gray-600">Isyarat Dipelajari</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1 text-green-600">
                {categories.filter(cat => {
                  const signs = signData[cat];
                  const completed = signs.filter(s => completedSigns.has(s.id)).length;
                  return completed === signs.length && signs.length > 0;
                }).length}
              </div>
              <p className="text-sm text-gray-600">Kategori Lengkap</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}