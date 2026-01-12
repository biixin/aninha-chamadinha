import { useState, useEffect, useRef } from 'react';
import { Video, Loader2, Mic, MicOff, Volume2, VolumeX, Phone } from 'lucide-react';

function App() {
  const [isConnecting, setIsConnecting] = useState(true);
  const [callEnded, setCallEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnecting(false);
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isConnecting && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Autoplay failed:', error);
      });
    }
  }, [isConnecting]);

  const handleVideoEnd = () => {
    setCallEnded(true);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
  };

  const endCall = () => {
    setCallEnded(true);
  };

  if (callEnded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a3d2c] via-[#0d4a36] to-[#075e40] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-red-500/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Phone className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-4xl font-semibold text-white mb-4 tracking-tight">Chamada Encerrada</h1>
          <p className="text-green-100/80 text-lg">A videochamada foi finalizada</p>
        </div>
      </div>
    );
  }

  if (isConnecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#075e54] via-[#128c7e] to-[#25d366] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative mb-10">
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto animate-pulse shadow-2xl">
              <Video className="w-16 h-16 text-white drop-shadow-lg" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-40 h-40 text-white/20 animate-spin" />
            </div>
          </div>
          <h1 className="text-4xl font-semibold text-white mb-4 tracking-tight">Conectando à Chamada Ao Vivo</h1>
          <p className="text-green-50 text-lg font-light">Aguarde um momento...</p>
          <div className="mt-8 flex justify-center gap-2">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0a3d2c] to-[#075e40] flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src="https://console-typebot-minio.kjufc9.easypanel.host/api/v1/buckets/hot-mj/objects/download?preview=true&prefix=mis-chamada.mp4&version_id=null"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        webkit-playsinline="true"
        x-webkit-airplay="deny"
        onEnded={handleVideoEnd}
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        preload="auto"
      />

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 pb-safe bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="max-w-md mx-auto flex items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={toggleMute}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg active:scale-95 ${
              isMuted
                ? 'bg-red-500 active:bg-red-600'
                : 'bg-white/20 backdrop-blur-md active:bg-white/30'
            }`}
            aria-label={isMuted ? 'Ativar áudio' : 'Silenciar'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            ) : (
              <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            )}
          </button>

          <button
            onClick={endCall}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-500 active:bg-red-600 flex items-center justify-center transition-all duration-300 shadow-xl active:scale-95"
            aria-label="Encerrar chamada"
          >
            <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-white transform rotate-135" />
          </button>

          <button
            onClick={toggleMic}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg active:scale-95 ${
              !isMicOn
                ? 'bg-red-500 active:bg-red-600'
                : 'bg-white/20 backdrop-blur-md active:bg-white/30'
            }`}
            aria-label={isMicOn ? 'Desativar microfone' : 'Ativar microfone'}
          >
            {isMicOn ? (
              <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            ) : (
              <MicOff className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
