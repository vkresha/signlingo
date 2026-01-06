import { useState, useEffect, useRef } from 'react';
import { Camera, CameraOff, Check, X, RotateCcw, Loader, Hand, Settings } from 'lucide-react';
import { signData } from '../data/signData';
import { Home, BookOpen, Brain, Trophy, ArrowRight } from 'lucide-react';




interface CameraDetectionModeProps {
  onQuizComplete: () => void;
}

type QuizSign = {
  id: string;
  word: string;
  videoUrl: string;
  category: string;
  description: string;
};

const ALLOWED_GLOSSES = [
  "marah",
  "hi",
  "suka",
  "lemak",
  "hujan",
  "anak lelaki",
  "makan",
  "tidur",
  "abang",
  "perempuan",
  "nasi",
  "anak perempuan",
  "ambil"
];

export function CameraDetectionMode({ onQuizComplete }: CameraDetectionModeProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const [quizSigns, setQuizSigns] = useState<QuizSign[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionResult, setDetectionResult] = useState<'correct' | 'incorrect' | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [confidenceLevel, setConfidenceLevel] = useState(0);

  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);


  // ML Model state
  const [permissionState, setPermissionState] = useState<'prompt' | 'granted' | 'denied' | 'unknown'>('unknown');

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const recordedChunks = useRef<BlobPart[]>([]);

  const [countdown, setCountdown] = useState<number | null>(null);
  const [recordDuration] = useState(5); // seconds (change if needed)

  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [lockUI, setLockUI] = useState(false);





  useEffect(() => {
  startNewQuiz();
  checkCameraPermission();
  startCamera();

  // 🔴 IMPORTANT: cleanup when leaving page
  return () => {
    stopCamera();
  };
}, []);



useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      stopCamera();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, []);



  const checkCameraPermission = async () => {
    try {
      if (navigator.permissions && navigator.permissions.query) {
        const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
        setPermissionState(result.state as 'prompt' | 'granted' | 'denied');
        
        // Listen for permission changes
        result.addEventListener('change', () => {
          setPermissionState(result.state as 'prompt' | 'granted' | 'denied');
        });
      }
    } catch (error) {
      // Permissions API might not be supported
      setPermissionState('unknown');
    }
  };

    const startNewQuiz = () => {
  const allSigns: QuizSign[] = [];

  Object.entries(signData).forEach(([category, signs]) => {
    signs.forEach(sign => {
      const word = sign.word.trim().toLowerCase();

      const allowed = ALLOWED_GLOSSES
        .map(g => g.trim().toLowerCase())
        .includes(word);

      if (!allowed) return;

      allSigns.push({ ...sign, category });
    });
  });

  const shuffled = allSigns.sort(() => Math.random() - 0.5);

  setQuizSigns(shuffled.slice(0, 8)); // or remove slice if list < 8
  setCurrentIndex(0);
  setScore(0);
  setQuizComplete(false);
  setDetectionResult(null);
  setShowFeedback(false);

  console.log("Selected quiz signs:", shuffled.map(s => s.word));
};


  //   const shuffled = allSigns.sort(() => Math.random() - 0.5);
  //   const selected = shuffled.slice(0, 8);
  //   setQuizSigns(selected);
  //   setCurrentIndex(0);
  //   setScore(0);
  //   setQuizComplete(false);
  //   setDetectionResult(null);
  //   setShowFeedback(false);
  // };

  const startCamera = async () => {
    // First, check if mediaDevices is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera access is not supported in this browser. Please use a modern browser like Chrome, Firefox, or Safari.');
      setCameraEnabled(false);
      return;
    }

    // Check if we're on HTTPS (required for camera access)
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      setCameraError('Camera access requires a secure connection (HTTPS). Please access this page via HTTPS.');
      setCameraEnabled(false);
      return;
    }

    try {
      // Try to get camera access with fallback
      let mediaStream: MediaStream;
      
      try {
        // First attempt with specific constraints
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false,
        });
      } catch (constraintError) {
        // If specific constraints fail, try with basic constraints
        console.log('Trying with basic constraints...');
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.muted = true;
        videoRef.current.setAttribute('playsinline', 'true');

        requestAnimationFrame(() => {
          videoRef.current
            ?.play()
            .catch(err => console.error('Video play failed:', err));
        });
      }

      
      setStream(mediaStream);
      setCameraEnabled(true);
      setCameraError(null);
      
    } catch (error) {
      // Handle different types of camera errors with helpful messages
      if (error instanceof Error) {
        const errorName = error.name;
        
        // Only log unexpected errors to console (not permission denials)
        if (errorName !== 'NotAllowedError' && errorName !== 'PermissionDeniedError') {
          console.error('Camera access error:', error);
        }
        
        if (errorName === 'NotAllowedError' || errorName === 'PermissionDeniedError') {
          // This is expected behavior - user needs to grant permission
          setCameraError('Camera permission needed. Click "Allow" when your browser asks, then try again.');
        } else if (errorName === 'NotFoundError' || errorName === 'DevicesNotFoundError') {
          setCameraError('No camera detected. Please ensure a camera is connected to your device.');
        } else if (errorName === 'NotReadableError' || errorName === 'TrackStartError') {
          setCameraError('Camera is currently in use by another application. Please close other apps using the camera and try again.');
        } else if (errorName === 'OverconstrainedError' || errorName === 'ConstraintNotSatisfiedError') {
          setCameraError('Your camera does not meet the required specifications. Please try a different device.');
        } else if (errorName === 'TypeError') {
          setCameraError('Camera access is not available. Please ensure you are using a secure connection (HTTPS) and a supported browser.');
        } else if (errorName === 'AbortError') {
          setCameraError('Camera access was cancelled. Please try again.');
        } else {
          setCameraError(`Unable to access camera: ${error.message}. Please check your browser settings and permissions.`);
        }
      } else {
        setCameraError('Unable to access camera. Please ensure camera permissions are granted in your browser settings.');
      }
      
      setCameraEnabled(false);
    }
  };


  const stopCamera = () => {
  if (videoRef.current?.srcObject) {
    const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
    tracks.forEach(track => track.stop());
    videoRef.current.srcObject = null;
  }

  setStream(null);
  setCameraEnabled(false);
};

// const CONFIDENCE_THRESHOLD = 70;

const evaluatePrediction = (preds: any[]) => {

  const allowedWords = [
  quizSigns[currentIndex].word.toLowerCase(),
  quizSigns[currentIndex].id.toLowerCase(),
  quizSigns[currentIndex].category.toLowerCase(),
  quizSigns[currentIndex].description.toLowerCase(),
  quizSigns[currentIndex].word.toLowerCase().replace(/\s+/g, ''),
];

  if (!preds || preds.length === 0) {
    return { correct: false, reason: "no_predictions" };
  }

  // 1️⃣ Sort by confidence descending
  const top3 = [...preds]
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 5);

  const target = quizSigns[currentIndex].word.toLowerCase().trim();

  // 2️⃣ Check top-3 with confidence threshold
  for (const p of top3) {
    const gloss = p.gloss.toLowerCase().trim();

    if (allowedWords.includes(gloss)
) {
      return {
        correct: true,
        matchedGloss: gloss,
        confidence: p.confidence,
      };
    }
  }

  return { correct: false, reason: "low_confidence_or_no_match" };
};

const advanceToNextSign = () => {

  setDetectionResult(null);
  setShowFeedback(false);
  setPredictions([]);
  setLockUI(false);

  if (currentIndex + 1 < quizSigns.length) {
    setCurrentIndex(prev => prev + 1);
  } else {
    setQuizComplete(true);
    onQuizComplete();
    stopCamera();
  }
};



const startRecording = () => {
  if (!stream || isRecording) return;

  recordedChunks.current = [];

  const recorder = new MediaRecorder(stream, {
    mimeType: "video/webm",
  });

  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) {
      recordedChunks.current.push(e.data);
    }
  };

  recorder.onstop = async () => {
  setIsRecording(false);
  setLoading(true);
  setLockUI(true);

  const blob = new Blob(recordedChunks.current, { type: "video/webm" });
  const formData = new FormData();
  formData.append("file", blob);

  try {
    const res = await fetch("http://localhost:8000/predict", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    const preds = data.predictions || [];
    setPredictions(preds);

    // 🔍 EVALUATE USING NEW RULES
    const result = evaluatePrediction(preds);

    setDetectionResult(result.correct ? "correct" : "incorrect");
    setShowFeedback(true);

    // ⏱ WAIT, THEN DECIDE NEXT STEP
    setTimeout(() => {
      setShowFeedback(false);
      setDetectionResult(null);
      setPredictions([]);
      setLockUI(false);

     if (result.correct) {
      setScore(prev => prev + 1); 
      advanceToNextSign();
    }


    }, 3000);

  } catch (err) {
    console.error("Prediction failed:", err);
  } finally {
    setLoading(false);
  }
};


  recorder.start();
  setIsRecording(true);
  setPredictions([]);

  // auto-stop after 3 seconds
  setTimeout(() => {
    recorder.stop();
  }, 3000);
};



  if (quizSigns.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Memuatkan sesi latihan…</p>
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
            <h2 className="text-gray-900 mb-2">Latihan Selesai!</h2>
            <p className="text-gray-600">Tahniah! Anda telah menamatkan latihan bahasa isyarat anda.</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
            <div className="text-4xl mb-2">{percentage.toFixed(0)}%</div>
            <p className="text-gray-600">
              You correctly signed <span className="text-indigo-600">{score}</span> out of{' '}
              <span className="text-indigo-600">{quizSigns.length}</span>
            </p>
          </div>

          <div className="space-y-3">
            {percentage >= 80 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800">🎉 Hebat! Kemahiran isyarat anda memang cemerlang!</p>
              </div>
            )}
            {percentage >= 50 && percentage < 80 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">👍 Kerja Bagus! Teruskan berlatih untuk menyempurnakan isyarat anda!</p>
              </div>
            )}
            {percentage < 50 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-800">💪 Teruskan! Kemahiran isyarat anda akan semakin baik dengan latihan!</p>
              </div>
            )}
          </div>

          <button
            onClick={startNewQuiz}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Practice Again
          </button>
        </div>
      </div>
    );
  }

  const currentSign = quizSigns[currentIndex];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
      
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Isyarat {currentIndex + 1} daripada {quizSigns.length}
            </span>
            <div className="flex items-center gap-0">
              <span className="text-sm text-indigo-600">
                Skor: {score}/{quizSigns.length}
              </span>


            </div>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / quizSigns.length) * 100}%` }}
            />
          </div>
        </div>
    
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Camera Feed */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <h3>Kamera Anda</h3>
              
                 <button
                    onClick={cameraEnabled ? stopCamera : startCamera}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                      ${cameraEnabled
                        ? 'bg-red-500/20 hover:bg-red-500/30'
                        : 'bg-white/20 hover:bg-white/30'
                      }`}
                  >
                    {cameraEnabled ? (
                      <>
                        <Camera className="w-4 h-4" />
                        <span className="text-sm">Hentikan</span>
                      </>
                    ) : (
                      <>
                        <CameraOff className="w-4 h-4" />
                        <span className="text-sm">Hidupkan</span>
                      </>
                    )}
                  </button>

              
              </div>
            </div>

            <div className="relative aspect-video bg-gray-900">
              {cameraError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <CameraOff className="w-16 h-16 mb-4 text-gray-400" />
                  <p className="text-gray-300">{cameraError}</p>

                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                <div className="w-full h-full relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover transform scale-x-[-1]"
                  />

                  {/*Feedback Overlay*/}
            {showFeedback && detectionResult && (
              <div className={`absolute inset-0 flex items-center justify-center ${
                detectionResult === 'correct' ? 'bg-green-500/80' : 'bg-red-500/80'
              }`}>
                <div className="text-center text-white">
                  {detectionResult === 'correct' ? (
                    <>
                      <Check className="w-20 h-20 mx-auto mb-4" />
                      <h3>Betul!</h3>
                      <p>Isyarat anda hebat!</p>
                    </>
                  ) : (
                    <>
                      <X className="w-20 h-20 mx-auto mb-4" />
                      <h3>Cuba Lagi</h3>
                      <p>Semak imej rujukan dan cuba sekali lagi</p>
                    </>
                  )}
                </div>
              </div>
            )}
                  

                  {!cameraEnabled && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                      <Camera className="w-16 h-16 mb-2" />
                      <p>Kamera belum aktif</p>
                    </div>
                  )}

                  {countdown !== null && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="text-white text-6xl animate-pulse">
                        {countdown}
                      </div>
                    </div>
                  )}
                </div>
                </div>
              )}
            </div>

           {cameraEnabled && (
            <div className="p-4">
            <button
              onClick={startRecording}
              disabled={isRecording || lockUI}
              className={`w-full py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2
                ${
                  isRecording || lockUI
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                }`}
            >
              <Hand className="w-5 h-5" />
              {isRecording
                  ? "Sedang Merakam…"
                  : detectionResult === "incorrect"
                    ? "Cuba Lagi (3s)"
                    : "Rakam Isyarat (3s)"
                }
            </button>


            {/* Recording indicator */}
          {isRecording && (
            <p className="mt-3 text-center text-red-600 font-semibold animate-pulse">
              ⏺ Sedang Merakam…
            </p>
          )}

          {/* Processing indicator */}
          {loading && (
            <p className="mt-3 text-center text-indigo-600 font-semibold">
              ⏳ Sedang Memproses…
            </p>
          )}

          {/* Predictions */}
          {!loading && predictions.length > 0 && (
            <div className="mt-4 bg-white rounded-xl shadow p-4">

              <p className="text-indigo-900">
                  <strong>Keputusan Pengesanan:</strong>
              </p>

              <div className="space-y-2">
                {predictions.map((p, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-indigo-50 rounded-lg px-3 py-2"
                  >
                    <span className="text-indigo-900 font-medium">
                      {p.gloss}
                    </span>
                    <span className="text-indigo-700 font-mono text-sm">
                      {(p.confidence).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          </div>

          

          )}

          </div>

          {/* Sign Reference */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
              <div className="flex items-center justify-between">
              <h3>Buat Isyarat Ini</h3>
              <button
                    onClick={advanceToNextSign}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                  >
                    
                    Soalan Seterusnya

                    <ArrowRight className="w-4 h-4" />
                  </button>
              </div>
            </div>


            <div className="p-6 space-y-4">
              <div className="text-center">
  
                <h2 className="text-gray-900">{currentSign.word}</h2>
                <p className="text-gray-600">{currentSign.description}</p>
              </div>

              <div className="aspect-video bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl overflow-hidden">
                <video
                  src={currentSign.videoUrl}
                  className="w-full h-full object-contain"
                  muted
                  playsInline
                  autoPlay
                  controls
                />
              </div>

              <div className="bg-indigo-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">💡</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-indigo-900">
                      <strong>Cara Menggunakan:</strong>
                    </p>
                    <ol className="text-sm text-indigo-800 mt-2 space-y-1 list-decimal list-inside">
                      <li>Pelajari video rujukan</li>
                      <li>Pastikan wajah serta tangan anda jelas dalam bingkai</li>
                      <li>Klik butang <strong>“Rakam Isyarat (3s)”</strong> apabila bersedia</li>
                      <li>Lakukan isyarat anda sepanjang rakaman 3 saat</li>
                      <li>Jika salah, anda boleh cuba semula sehingga betul</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}