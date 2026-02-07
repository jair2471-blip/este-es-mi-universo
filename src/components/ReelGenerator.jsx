import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Play, Pause, Type, Volume2, VolumeX, Download, Zap } from 'lucide-react';

const ReelGenerator = () => {
  const [config, setConfig] = useState({
    style: 'motivational',
    text: 'TU MENTE ES TU PODER',
    subtitle: 'Despierta tu potencial infinito',
    colorScheme: 'cosmic',
    animation: 'quantum',
    fontSize: 'auto',
    textSize: 100,
    subtitleSize: 50,
    lineHeight: 1.2,
    musicTrack: 'epic',
    videoDuration: 5
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [particles, setParticles] = useState([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);

  const styles = {
    motivational: { name: 'Poder Mental', emoji: '🧠', color: '#00ffff' },
    educational: { name: 'Sabiduría', emoji: '⚡', color: '#ffff00' },
    funny: { name: 'Energía Positiva', emoji: '🌟', color: '#ff00ff' },
    business: { name: 'Éxito', emoji: '💎', color: '#00ff88' },
    lifestyle: { name: 'Consciencia', emoji: '🔮', color: '#ff0088' }
  };

  const colorSchemes = {
    cosmic: { bg: 'radial-gradient(circle at 20% 50%, #1a0033 0%, #000000 50%, #001a33 100%)', accent: '#00ffff', secondary: '#ff00ff' },
    quantum: { bg: 'radial-gradient(circle at 80% 20%, #1a001a 0%, #000000 50%, #001a1a 100%)', accent: '#00ff88', secondary: '#ffff00' },
    dimension: { bg: 'radial-gradient(circle at 50% 50%, #0a0a2e 0%, #000000 50%, #2e0a0a 100%)', accent: '#ff0088', secondary: '#0088ff' },
    nebula: { bg: 'radial-gradient(circle at 30% 70%, #2e0a2e 0%, #000000 50%, #0a2e2e 100%)', accent: '#ff00ff', secondary: '#00ffff' },
    infinity: { bg: 'radial-gradient(circle at 60% 40%, #1a1a00 0%, #000000 50%, #001a1a 100%)', accent: '#ffaa00', secondary: '#00aaff' },
    void: { bg: 'radial-gradient(circle at 40% 60%, #0d0d0d 0%, #000000 70%, #1a1a1a 100%)', accent: '#ffffff', secondary: '#888888' }
  };

  const musicTracks = {
    epic: { name: 'Épico', freq: 440, pattern: 'epic' },
    chill: { name: 'Tranquilo', freq: 528, pattern: 'chill' },
    intense: { name: 'Intenso', freq: 660, pattern: 'intense' }
  };

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.5 + 0.3
    }));
    setParticles(newParticles);
  }, []);

  const playMusic = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    const track = musicTracks[config.musicTrack];
    if (oscillatorRef.current) oscillatorRef.current.stop();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = track.freq;
    gainNode.gain.value = 0.1;
    if (track.pattern === 'epic') {
      osc.frequency.setValueAtTime(track.freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(track.freq * 1.5, ctx.currentTime + 0.5);
    }
    osc.start();
    oscillatorRef.current = osc;
    setIsMusicPlaying(true);
  };

  const stopMusic = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
    setIsMusicPlaying(false);
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentFrame(prev => (prev + 1) % 120);
      }, 33);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    // Se eliminó la variable 'scheme' que no se usaba aquí
    if (isPlaying) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        const x = (particle.x + currentFrame * particle.speed) % 100;
        ctx.beginPath();
        ctx.arc((x / 100) * canvas.width, (particle.y / 100) * canvas.height, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });
    }
  }, [currentFrame, isPlaying, particles]);

  const getAnimationStyle = () => {
    if (!isPlaying) return {};
    const progress = (currentFrame % 60) / 60;
    const scheme = colorSchemes[config.colorScheme];
    switch (config.animation) {
      case 'quantum': {
        const quantum = Math.sin(progress * Math.PI * 4);
        return {
          transform: `scale(${1 + quantum * 0.1}) translateY(${quantum * 10}px)`,
          textShadow: `0 0 ${20 + quantum * 10}px ${scheme.accent}`
        };
      }
      default: return {};
    }
  };

  const getFontSize = () => {
    if (config.fontSize === 'auto') return { main: '2.5rem', sub: '1.2rem' };
    return { main: '2rem', sub: '1rem' };
  };

  const [isRecording, setIsRecording] = useState(false);
  const [recordProgress, setRecordProgress] = useState(0);

  const handleDownload = async () => {
    setIsRecording(true);
    setRecordProgress(0);
    setTimeout(() => {
      setIsRecording(false);
      setRecordProgress(100);
      alert("Video generado (Simulación)");
    }, 2000);
  };

  const fontSize = getFontSize();
  const currentScheme = colorSchemes[config.colorScheme];

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 overflow-hidden relative">
      <div className="absolute inset-0 opacity-30" style={{ background: currentScheme.bg }} />
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-8 flex items-center justify-center gap-3">
          <Sparkles style={{ color: currentScheme.accent }} /> UNIVERSO MENTAL
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900/50 p-6 rounded-3xl border-2" style={{ borderColor: currentScheme.accent }}>
            <div className="relative mx-auto bg-black rounded-2xl overflow-hidden" style={{ aspectRatio: '9/16', maxWidth: '300px' }}>
               <canvas ref={canvasRef} width={300} height={533} className="absolute inset-0 w-full h-full" />
               <div className="absolute inset-0 flex flex-col items-center justify-center p-4" style={getAnimationStyle()}>
                  <h2 className="font-bold" style={{ fontSize: fontSize.main, color: 'white' }}>{config.text}</h2>
                  <p style={{ fontSize: fontSize.sub, color: 'white' }}>{config.subtitle}</p>
               </div>
            </div>
            
            <div className="mt-6 flex flex-wrap justify-center gap-4">
               <button onClick={() => setIsPlaying(!isPlaying)} className="bg-white text-black px-6 py-2 rounded-full font-bold flex items-center justify-center transition-transform active:scale-90">
                 {isPlaying ? <Pause /> : <Play />}
               </button>
               <button onClick={() => isMusicPlaying ? stopMusic() : playMusic()} className="bg-gray-700 text-white px-6 py-2 rounded-full font-bold flex items-center justify-center transition-transform active:scale-90">
                 {isMusicPlaying ? <VolumeX /> : <Volume2 />}
               </button>
               <button onClick={handleDownload} className="bg-green-600 text-white px-6 py-2 rounded-full font-bold flex gap-2 items-center justify-center transition-transform active:scale-95">
                 <Download size={20} /> {isRecording ? `${recordProgress}%` : 'SAVE'}
               </button>
            </div>
          </div>

          <div className="space-y-6 text-left">
            <div className="bg-gray-900/50 p-6 rounded-3xl border border-white/10">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Zap size={18} /> Estilo</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(styles).map(s => (
                  <button 
                    key={s} 
                    onClick={() => setConfig({...config, style: s})} 
                    className={`p-3 rounded-xl border transition-all ${config.style === s ? 'bg-white/20 border-white' : 'bg-black/40 border-white/5 hover:bg-black/60'}`}
                  >
                    {styles[s].emoji} {styles[s].name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-3xl border border-white/10">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Type size={18} /> Mensaje</h3>
              <textarea 
                className="w-full bg-black text-white p-4 rounded-xl mb-4 border border-white/10 focus:border-white/30 outline-none" 
                value={config.text} 
                onChange={(e) => setConfig({...config, text: e.target.value.toUpperCase()})}
                rows={2}
              />
              <input 
                className="w-full bg-black text-white p-4 rounded-xl border border-white/10 focus:border-white/30 outline-none" 
                value={config.subtitle} 
                onChange={(e) => setConfig({...config, subtitle: e.target.value})}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelGenerator;
