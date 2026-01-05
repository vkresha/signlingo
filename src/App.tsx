import { useState } from 'react';
import { Home, BookOpen, Brain, Trophy, ArrowLeft } from 'lucide-react';
import { LessonLibrary } from './components/LessonLibrary';
import { PracticeMode } from './components/PracticeMode';
import { ProgressDashboard } from './components/ProgressDashboard';


type View = 'home' | 'learn' | 'practice' | 'progress';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [completedSigns, setCompletedSigns] = useState<Set<string>>(new Set());
  const [quizScores, setQuizScores] = useState<number[]>([]);

  const handleSignComplete = (signId: string) => {
    setCompletedSigns(prev => new Set([...prev, signId]));
  };

  const handleQuizComplete = (score: number) => {
    setQuizScores(prev => [...prev, score]);
  };

  const renderView = () => {
    switch (currentView) {
      case 'learn':
        return (
          <LessonLibrary 
            completedSigns={completedSigns}
            onSignComplete={handleSignComplete}
          />
        );
      case 'practice':
        return (
          <PracticeMode 
            onQuizComplete={handleQuizComplete}
          />
        );
      case 'progress':
        return (
          <ProgressDashboard 
            completedSigns={completedSigns.size}
            quizScores={quizScores}
          />
        );
      default:
        return <HomePage onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentView !== 'home' && (
        <button
          onClick={() => setCurrentView('home')}
          className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <ArrowLeft className="w-5 h-5" />
          Laman Utama
        </button>
      )}
      {renderView()}
    </div>
  );
}

function HomePage({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-full mb-4">
            <Home className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-indigo-900">SignLingo</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kuasai bahasa isyarat melalui pelajaran interaktif, demonstrasi visual, dan sesi latihan yang menarik. Belajar mengikut rentak anda sendiri serta jejak kemajuan pembelajaran anda.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={() => onNavigate('learn')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-gray-900">Belajar Melalui Contoh</h3>
              <p className="text-gray-600 text-sm">
               Terokai pelajaran yang dikategorikan dengan demonstrasi visual serta penerangan yang jelas dan mudah difahami.
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('practice')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-gray-900">Latihan Interaktif</h3>
              <p className="text-gray-600 text-sm">
                Uji dan kukuhkan pengetahuan anda melalui kuiz interaktif serta cabaran pembelajaran yang menyeronokkan.
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('progress')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Trophy className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-gray-900">Jejak Kemajuan</h3>
              <p className="text-gray-600 text-sm">
                Pantau pencapaian anda dan ikuti perkembangan pembelajaran anda secara berterusan melalui pelbagai modul dan latihan.
              </p>
            </div>
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-xl p-6 text-center">
          <p className="text-gray-700">
            <span className="font-semibold text-indigo-600">Tip Pro:</span> Berlatih secara konsisten selama 10–15 minit setiap hari untuk hasil terbaik!
          </p>
        </div>
      </div>
    </div>
  );
}
