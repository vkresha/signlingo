import { Trophy, TrendingUp, Award, Star } from 'lucide-react';
import { signData } from '../data/signData';

interface ProgressDashboardProps {
  completedSigns: number;
  quizScores: number[];
}

export function ProgressDashboard({ completedSigns, quizScores }: ProgressDashboardProps) {
  const totalSigns = Object.values(signData).reduce((acc, signs) => acc + signs.length, 0);
  const completionPercentage = (completedSigns / totalSigns) * 100;
  
  const averageScore = quizScores.length > 0
    ? quizScores.reduce((a, b) => a + b, 0) / quizScores.length
    : 0;

  const achievements = [
    {
      id: 1,
      name: 'Langkah Pertama',
      description: 'Selesaikan isyarat pertama anda',
      unlocked: completedSigns >= 1,
      icon: Star,
    },
    {
      id: 2,
      name: 'Pelajar Pantas',
      description: 'Selesaikan 10 isyarat',
      unlocked: completedSigns >= 10,
      icon: Award,
    },
    {
      id: 3,
      name: 'Latihan Membuat Sempurna',
      description: 'Selesaikan 5 kuiz',
      unlocked: quizScores.length >= 5,
      icon: TrendingUp,
    },
    {
      id: 4,
      name: 'Pakar Bahasa Isyarat',
      description: 'Selesaikan semua isyarat',
      unlocked: completedSigns === totalSigns,
      icon: Trophy,
    },
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-gray-900 mb-2">Kemajuan Anda</h2>
          <p className="text-gray-600">Pantau perjalanan pembelajaran bahasa isyarat anda</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Isyarat Dipelajari</h3>
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl text-indigo-600">
                {completedSigns}/{totalSigns}
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">{completionPercentage.toFixed(0)}% Lengkap</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Prestasi Kuiz</h3>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl text-purple-600">
                {averageScore.toFixed(0)}%
              </div>
              <p className="text-sm text-gray-600">
                {quizScores.length} {quizScores.length === 1 ? 'kuiz' : 'kuiz'} disiapkan
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Pencapaian</h3>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl text-green-600">
                {unlockedAchievements}/{achievements.length}
              </div>
              <p className="text-sm text-gray-600">Lencana diperoleh</p>
            </div>
          </div>
        </div>

        {/* Recent Quiz Scores */}
        {quizScores.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-900 mb-4">Skor Kuiz Terkini</h3>
            <div className="space-y-3">
              {quizScores.slice(-5).reverse().map((score, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="text-sm text-gray-600 w-20">
                    Kuiz {quizScores.length - index}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-blue-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <div className="text-sm w-12 text-right">
                    {score.toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-900 mb-6">Pencapaian</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-400'
                          : 'bg-gray-300'
                      }`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-900">{achievement.name}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <div className="text-2xl">🏆</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Motivational Message */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-md p-8 text-white text-center">
          <h3 className="mb-2">Teruskan!</h3>
          {completionPercentage < 25 && (
            <p>Anda baru bermula. Setiap isyarat yang anda pelajari adalah satu langkah ke hadapan!</p>
          )}
          {completionPercentage >= 25 && completionPercentage < 50 && (
            <p>Anda sedang membuat kemajuan yang hebat! Teruskan kerja cemerlang ini!</p>
          )}
          {completionPercentage >= 50 && completionPercentage < 75 && (
            <p>Wow! Anda sudah lebih separuh jalan. Anda memang hebat!</p>
          )}
          {completionPercentage >= 75 && completionPercentage < 100 && (
            <p>Hampir menguasai semua isyarat. Anda pasti boleh!</p>
          )}
          {completionPercentage === 100 && (
            <p>🎉 Tahniah! Anda telah menamatkan semua isyarat. Anda kini seorang pakar bahasa isyarat!</p>
          )}
        </div>
      </div>
    </div>
  );
}
