import { useState, useEffect } from 'react';
import { Check, X, RotateCcw, Trophy } from 'lucide-react';
import { signData } from '../data/signData';

interface QuizModeProps {
  onQuizComplete: (score: number) => void;
}

type QuizSign = {
  id: string;
  word: string;
  imageUrl: string;
  category: string;
};

export function QuizMode({ onQuizComplete }: QuizModeProps) {
  const [quizSigns, setQuizSigns] = useState<QuizSign[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    startNewQuiz();
  }, []);

  const startNewQuiz = () => {
    // Get all signs from all categories
    const allSigns: QuizSign[] = [];
    Object.entries(signData).forEach(([category, signs]) => {
      signs.forEach(sign => {
        allSigns.push({ ...sign, category });
      });
    });

    // Shuffle and pick 10 random signs
    const shuffled = allSigns.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 10);
    setQuizSigns(selected);
    setCurrentIndex(0);
    setScore(0);
    setQuizComplete(false);
    generateOptions(selected[0], allSigns);
  };

  const generateOptions = (correctSign: QuizSign, allSigns: QuizSign[]) => {
    // Get 3 random wrong answers
    const wrongOptions = allSigns
      .filter(s => s.id !== correctSign.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(s => s.word);

    // Combine and shuffle
    const allOptions = [...wrongOptions, correctSign.word].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return; // Already answered

    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === quizSigns[currentIndex].word) {
      setScore(prev => prev + 1);
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentIndex + 1 < quizSigns.length) {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        
        // Get all signs for generating options
        const allSigns: QuizSign[] = [];
        Object.entries(signData).forEach(([category, signs]) => {
          signs.forEach(sign => {
            allSigns.push({ ...sign, category });
          });
        });
        generateOptions(quizSigns[currentIndex + 1], allSigns);
      } else {
        // Quiz complete
        setQuizComplete(true);
        onQuizComplete(score + (answer === quizSigns[currentIndex].word ? 1 : 0));
      }
    }, 1500);
  };

  if (quizSigns.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = (score / quizSigns.length) * 100;
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <div>
            <h2 className="text-gray-900 mb-2">Kuiz Selesai!</h2>
            <p className="text-gray-600">Tahniah! Anda telah menamatkan sesi latihan</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
            <div className="text-4xl mb-2">{percentage.toFixed(0)}%</div>
            <p className="text-gray-600">
              You got <span className="text-indigo-600">{score}</span> out of{' '}
              <span className="text-indigo-600">{quizSigns.length}</span> correct
            </p>
          </div>

          <div className="space-y-3">
            {percentage >= 80 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800">🎉 Kerja Cemerlang! Anda sedang menguasai bahasa isyarat!</p>
              </div>
            )}
            {percentage >= 50 && percentage < 80 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">👍 Usaha Bagus! Terus berlatih untuk meningkatkan kemahiran anda!</p>
              </div>
            )}
            {percentage < 50 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-800">💪 Terus Belajar! Latihan berulang membuat sempurna!</p>
              </div>
            )}
          </div>

          <button
            onClick={startNewQuiz}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Cuba Kuiz Lain
          </button>
        </div>
      </div>
    );
  }

  const currentSign = quizSigns[currentIndex];

  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Soalan {currentIndex + 1} daripada {quizSigns.length}
            </span>
            <span className="text-sm text-indigo-600">
              Skor: {score}/{quizSigns.length}
            </span>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / quizSigns.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white text-center">
            <h3>Apakah isyarat ini?</h3>
          </div>

          <div className="p-8 space-y-6">
            {/* Image */}
            <div className="aspect-video bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl overflow-hidden">
              <video
                src={currentSign.videoUrl}
                className="w-full h-full object-contain"
                autoPlay
                playsInline
                loop
                muted
              />
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              {options.map((option) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentSign.word;
                const showCorrect = showResult && isCorrect;
                const showWrong = showResult && isSelected && !isCorrect;

                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={!!selectedAnswer}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      showCorrect
                        ? 'bg-green-50 border-green-500 text-green-900'
                        : showWrong
                        ? 'bg-red-50 border-red-500 text-red-900'
                        : 'border-gray-200 hover:border-indigo-400 hover:bg-indigo-50'
                    } disabled:cursor-not-allowed`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showCorrect && <Check className="w-5 h-5 text-green-600" />}
                      {showWrong && <X className="w-5 h-5 text-red-600" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {showResult && (
              <div
                className={`text-center p-4 rounded-lg ${
                  selectedAnswer === currentSign.word
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {selectedAnswer === currentSign.word ? (
                  <p>✓ Betul! Tahniah!</p>
                ) : (
                  <p>✗ Jawapan yang betul ialah: {currentSign.word}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
