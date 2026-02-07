import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Download, Play, Pause, RefreshCw, Type, Palette, Zap, Music, Volume2, VolumeX } from 'lucide-react';

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
    cosmic: { 
      bg: 'radial-gradient(circle at 20% 50%, #1a0033 0%, #000000 50%, #001a33 100%)',
      accent: '#00ffff',
      secondary: '#ff00ff'
    },
    quantum: { 
      bg: 'radial-gradient(circle at 80% 20%, #1a001a 0%, #000000 50%, #001a1a 100%)',
      accent: '#00ff88',
      secondary: '#ffff00'
    },
    dimension: { 
      bg: 'radial-gradient(circle at 50% 50%, #0a0a2e 0%, #000000 50%, #2e0a0a 100%)',
      accent: '#ff0088',
      secondary: '#0088ff'
    },
    nebula: { 
      bg: 'radial-gradient(circle at 30% 70%, #2e0a2e 0%, #000000 50%, #0a2e2e 100%)',
      accent: '#ff00ff',
      secondary: '#00ffff'
    },
    infinity: { 
      bg: 'radial-gradient(circle at 60% 40%, #1a1a00 0%, #000000 50%, #001a1a 100%)',
      accent: '#ffaa00',
      secondary: '#00aaff'
    },
    void: { 
      bg: 'radial-gradient(circle at 40% 60%, #0d0d0d 0%, #000000 70%, #1a1a1a 100%)',
      accent: '#ffffff',
      secondary: '#888888'
    }
  };

  const animations = {
    quantum: 'Salto Cuántico',
    pulse: 'Pulso Energético',
    matrix: 'Matrix',
    waves: 'Ondas Mentales',
    explosion: 'Big Bang'
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
    
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
    }
    
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
    const scheme = colorSchemes[config.colorScheme];
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        const x = (particle.x + currentFrame * particle.speed) % 100;
        const y = particle.y;
        
        ctx.beginPath();
        ctx.arc(
          (x / 100) * canvas.width,
          (y / 100) * canvas.height,
          particle.size,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(${
          scheme.accent === '#00ffff' ? '0, 255, 255' :
          scheme.accent === '#00ff88' ? '0, 255, 136' :
          scheme.accent === '#ff0088' ? '255, 0, 136' :
          scheme.accent === '#ff00ff' ? '255, 0, 255' :
          scheme.accent === '#ffaa00' ? '255, 170, 0' :
          '255, 255, 255'
        }, ${particle.opacity})`;
        ctx.fill();
      });
    };
    
    if (isPlaying) {
      drawParticles();
    }
  }, [currentFrame, isPlaying, particles, config.colorScheme]);

  const getAnimationStyle = () => {
    if (!isPlaying) return {};
    
    const progress = (currentFrame % 60) / 60;
    const scheme = colorSchemes[config.colorScheme];
    
    switch (config.animation) {
      case 'quantum': {
        const quantum = Math.sin(progress * Math.PI * 4);
        return {
          transform: `scale(${1 + quantum * 0.1}) translateY(${quantum * 10}px)`,
          opacity: 0.8 + Math.abs(quantum) * 0.2,
          textShadow: `0 0 ${20 + quantum * 10}px ${scheme.accent}, 0 0 ${40 + quantum * 20}px ${scheme.secondary}`
        };
      }
      case 'pulse': {
        const pulse = Math.abs(Math.sin(progress * Math.PI * 3));
        return {
          transform: `scale(${1 + pulse * 0.15})`,
          opacity: 0.7 + pulse * 0.3,
          textShadow: `0 0 ${30 * pulse}px ${scheme.accent}`
        };
      }
      case 'matrix': {
        return {
          transform: `translateX(${Math.sin(progress * Math.PI * 2) * 20}px)`,
          opacity: 0.8 + Math.random() * 0.2,
          textShadow: `0 0 20px ${scheme.accent}, 0 0 40px ${scheme.secondary}`
        };
      }
      case 'waves': {
        const wave = Math.sin(progress * Math.PI * 2);
        return {
          transform: `translateY(${wave * 15}px) rotateZ(${wave * 2}deg)`,
          opacity: 0.8,
          textShadow: `0 0 25px ${scheme.accent}`
        };
      }
      case 'explosion': {
        const expand = progress < 0.5 ? progress * 2 : 2 - progress * 2;
        return {
          transform: `scale(${1 + expand * 0.3})`,
          opacity: 1 - expand * 0.3,
          textShadow: `0 0 ${50 * expand}px ${scheme.accent}, 0 0 ${100 * expand}px ${scheme.secondary}`
        };
      }
      default:
        return {};
    }
  };

  const getFontSize = () => {
    if (config.fontSize === 'auto') {
      const textLength = config.text.length;
      const subtitleLength = config.subtitle.length;
      let mainSize, subSize;
      
      if (textLength <= 15) mainSize = '3.5rem';
      else if (textLength <= 25) mainSize = '2.8rem';
      else if (textLength <= 40) mainSize = '2.2rem';
      else if (textLength <= 60) mainSize = '1.8rem';
      else mainSize = '1.5rem';
      
      if (subtitleLength <= 20) subSize = '1.5rem';
      else if (subtitleLength <= 40) subSize = '1.2rem';
      else if (subtitleLength <= 60) subSize = '1rem';
      else subSize = '0.9rem';
      
      return { main: mainSize, sub: subSize };
    }
    
    if (config.fontSize === 'custom') {
      return { main: `${config.textSize}px`, sub: `${config.subtitleSize}px` };
    }
    
    switch (config.fontSize) {
      case 'small': return { main: '1.8rem', sub: '1rem' };
      case 'medium': return { main: '2.5rem', sub: '1.2rem' };
      case 'large': return { main: '3.2rem', sub: '1.4rem' };
      case 'xlarge': return { main: '4rem', sub: '1.8rem' };
      default: return { main: '2.5rem', sub: '1.2rem' };
    }
  };

  const [isRecording, setIsRecording] = useState(false);
  const [recordProgress, setRecordProgress] = useState(0);

  const handleDownload = async () => {
    setIsRecording(true);
    setRecordProgress(0);

    const videoCanvas = document.createElement('canvas');
    videoCanvas.width = 1080;
    videoCanvas.height = 1920;
    const ctx = videoCanvas.getContext('2d');
    const scheme = colorSchemes[config.colorScheme];
    const duration = config.videoDuration * 1000; 
    const fps = 30;
    const totalFrames = (duration / 1000) * fps;
    
    const stream = videoCanvas.captureStream(fps);
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: 5000000
    });
    
    const chunks = [];
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reel-universo-mental-${Date.now()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsRecording(false);
      setRecordProgress(0);
    };
    
    mediaRecorder.start();
    
    let frame = 0;
    const renderFrame = () => {
      if (frame >= totalFrames) {
        mediaRecorder.stop();
        return;
      }
      
      const progress = frame / totalFrames;
      setRecordProgress(Math.round(progress * 100));
      
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, videoCanvas.width, videoCanvas.height);
      
      const gradient = ctx.createRadialGradient(540, 960, 0, 540, 960, 1200);
      gradient.addColorStop(0, scheme.accent + '40');
      gradient.addColorStop(0.5, '#00000080');
      gradient.addColorStop(1, scheme.secondary + '40');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, videoCanvas.width, videoCanvas.height);
      
      for (let i = 0; i < 50; i++) {
        const particleProgress = (progress + i * 0.02) % 1;
        const x = (Math.sin(particleProgress * Math.PI * 2 + i) * 0.3 + 0.5) * videoCanvas.width;
        const y = particleProgress * videoCanvas.height;
        const size = 3 + Math.sin(progress * Math.PI * 4 + i) * 2;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = scheme.accent + '80';
        ctx.fill();
      }
      
      let transform = { scale: 1, translateY: 0, opacity: 1, blur: 20 };
      const animProgress = (progress * 2) % 1;
      
      switch (config.animation) {
        case 'quantum': {
          const quantum = Math.sin(animProgress * Math.PI * 4);
          transform.scale = 1 + quantum * 0.1;
          transform.translateY = quantum * 30;
          transform.blur = 20 + Math.abs(quantum) * 20;
          break;
        }
        case 'pulse': {
          const pulse = Math.abs(Math.sin(animProgress * Math.PI * 3));
          transform.scale = 1 + pulse * 0.15;
          transform.blur = 30 * pulse + 20;
          break;
        }
        case 'matrix':
          transform.translateY = Math.sin(animProgress * Math.PI * 2) * 50;
          break;
        case 'waves':
          transform.translateY = Math.sin(animProgress * Math.PI * 2) * 40;
          break;
        case 'explosion': {
          const expand = animProgress < 0.5 ? animProgress * 2 : 2 - animProgress * 2;
          transform.scale = 1 + expand * 0.3;
          transform.opacity = 1 - expand * 0.2;
          transform.blur = 50 * expand + 20;
          break;
        }
      }
      
      ctx.save();
      ctx.translate(videoCanvas.width / 2, videoCanvas.height / 2);
      ctx.scale(transform.scale, transform.scale);
      ctx.translate(0, transform.translateY);
      ctx.globalAlpha = transform.opacity;
      
      let mainFontSize, subFontSize;
      if (config.fontSize === 'auto') {
        const textLength = config.text.length;
        const subtitleLength = config.subtitle.length;
        if (textLength <= 15) mainFontSize = 120;
        else if (textLength <= 25) mainFontSize = 100;
        else if (textLength <= 40) mainFontSize = 80;
        else if (textLength <= 60) mainFontSize = 65;
        else mainFontSize = 50;
        
        if (subtitleLength <= 20) subFontSize = 60;
        else if (subtitleLength <= 40) subFontSize = 50;
        else if (subtitleLength <= 60) subFontSize = 40;
        else subFontSize = 35;
      } else if (config.fontSize === 'custom') {
        mainFontSize = config.textSize;
        subFontSize = config.subtitleSize;
      } else {
        const sizes = {
          small: { main: 70, sub: 40 },
          medium: { main: 100, sub: 50 },
          large: { main: 120, sub: 60 },
          xlarge: { main: 150, sub: 70 }
        };
        mainFontSize = sizes[config.fontSize]?.main || 100;
        subFontSize = sizes[config.fontSize]?.sub || 50;
      }

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `bold ${mainFontSize}px Arial`;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = scheme.accent;
      ctx.shadowBlur = transform.blur;
      
      const maxWidth = videoCanvas.width * 0.85;
      const textLines = config.text.split('\n');
      let lines = [];
      
      textLines.forEach(textLine => {
        const words = textLine.split(' ');
        let currentLine = '';
        for (let word of words) {
          const testLine = currentLine + word + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && currentLine !== '') {
            lines.push(currentLine.trim());
            currentLine = word + ' ';
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine.trim() !== '') lines.push(currentLine.trim());
      });
      
      const lineSpacing = mainFontSize * config.lineHeight;
      const totalHeight = lines.length * lineSpacing;
      let startY = -totalHeight / 2;
      
      lines.forEach((line, i) => {
        ctx.fillText(line, 0, startY + i * lineSpacing - 80);
        ctx.shadowColor = scheme.secondary;
        ctx.shadowBlur = transform.blur * 1.5;
        ctx.fillText(line, 0, startY + i * lineSpacing - 80);
      });
      
      ctx.font = `bold ${subFontSize}px Arial`;
      ctx.shadowColor = scheme.accent;
      ctx.shadowBlur = transform.blur * 0.7;
      
      const subWordsLines = config.subtitle.split('\n');
      let subLines = [];
      subWordsLines.forEach(subTextLine => {
        const words = subTextLine.split(' ');
        let currentSubLine = '';
        for (let word of words) {
          const testLine = currentSubLine + word + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && currentSubLine !== '') {
            subLines.push(currentSubLine.trim());
            currentSubLine = word + ' ';
          } else {
            currentSubLine = testLine;
          }
        }
        if (currentSubLine.trim() !== '') subLines.push(currentSubLine.trim());
      });
      
      const subLineSpacing = subFontSize * config.lineHeight;
      const subStartY = 100;
      subLines.forEach((line, i) => {
        ctx.fillText(line, 0, subStartY + i * subLineSpacing);
      });
      
      ctx.restore();
      frame++;
      requestAnimationFrame(renderFrame);
    };
    renderFrame();
  };

  const fontSize = getFontSize();
  const currentScheme = colorSchemes[config.colorScheme];

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 overflow-hidden relative">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{ background: currentScheme.bg }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 flex items-center justify-center gap-3"
              style={{
                textShadow: `0 0 20px ${currentScheme.accent}, 0 0 40px ${currentScheme.secondary}`,
                animation: 'pulse 2s ease-in-out infinite'
              }}>
            <Sparkles className="animate-spin" style={{ color: currentScheme.accent }} />
            UNIVERSO DE LA MENTE
          </h1>
          <p className="text-gray-300 text-xl font-bold tracking-wider"
             style={{ textShadow: `0 0 10px ${currentScheme.accent}` }}>
            Creador de Contenido Dimensional
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border-2 shadow-2xl"
                 style={{ borderColor: currentScheme.accent + '40' }}>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Play className="w-5 h-5" style={{ color: currentScheme.accent }} />
                Portal Dimensional
              </h2>
              
              <div className="mx-auto" style={{ maxWidth: '350px' }}>
                <div className="bg-black rounded-3xl p-3 shadow-2xl border-2"
                     style={{ 
                       borderColor: currentScheme.accent,
                       boxShadow: `0 0 30px ${currentScheme.accent}80, 0 0 60px ${currentScheme.secondary}40`
                     }}>
                  <div 
                    className="relative overflow-hidden rounded-2xl"
                    style={{
                      aspectRatio: '9/16',
                      background: currentScheme.bg
                    }}
                  >
                    <canvas 
                      ref={canvasRef}
                      width={315}
                      height={560}
                      className="absolute inset-0 w-full h-full"
                    />

                    <div 
                      className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                      style={getAnimationStyle()}
                    >
                      <h1 
                        className="font-black mb-4 leading-tight tracking-wider break-words px-4 whitespace-pre-wrap"
                        style={{ 
                          fontSize: fontSize.main,
                          color: '#ffffff',
                          textShadow: `0 0 20px ${currentScheme.accent}, 0 0 40px ${currentScheme.secondary}`,
                          letterSpacing: '2px',
                          lineHeight: config.lineHeight,
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          hyphens: 'auto'
                        }}
                      >
                        {config.text}
                      </h1>
                      <p 
                        className="font-bold opacity-90 tracking-wide break-words px-4 whitespace-pre-wrap"
                        style={{ 
                          fontSize: fontSize.sub,
                          color: '#ffffff',
                          textShadow: `0 0 15px ${currentScheme.accent}`,
                          lineHeight: config.lineHeight,
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word'
                        }}
                      >
                        {config.subtitle}
                      </p>
                    </div>

                    <div className="absolute top-4 left-4 backdrop-blur-md rounded-full px-4 py-2 border-2"
                         style={{ 
                           backgroundColor: currentScheme.accent + '20',
                           borderColor: currentScheme.accent,
                           boxShadow: `0 0 20px ${currentScheme.accent}`
                         }}>
                      <span className="text-white text-sm font-bold">
                        {styles[config.style].emoji} {styles[config.style].name}
                      </span>
                    </div>

                    {isMusicPlaying && (
                      <div className="absolute bottom-4 right-4 backdrop-blur-md rounded-full p-3 border-2 animate-pulse"
                           style={{ 
                             backgroundColor: currentScheme.secondary + '20',
                             borderColor: currentScheme.secondary
                           }}>
                        <Music className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6 justify-center">
                <button
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                    if (!isPlaying) setCurrentFrame(0);
                  }}
                  className="flex items-center gap-2 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform border-2"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentScheme.accent}, ${currentScheme.secondary})`,
                    borderColor: currentScheme.accent,
                    boxShadow: `0 0 20px ${currentScheme.accent}80`
                  }}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isPlaying ? 'PAUSAR' : 'ACTIVAR'}
                </button>
                
                <button
                  onClick={() => {
                    if (isMusicPlaying) {
                      stopMusic();
                    } else {
                      playMusic();
                    }
                  }}
                  className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform border-2"
                  style={{ 
                    borderColor: currentScheme.secondary,
                    boxShadow: `0 0 15px ${currentScheme.secondary}60`
                  }}
                >
                  {isMusicPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  {isMusicPlaying ? 'SILENCIO' : 'MÚSICA'}
                </button>

                <button
                  onClick={() => setCurrentFrame(0)}
                  className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all border-2"
                  style={{ 
                    borderColor: currentScheme.accent + '60'
                  }}
                >
                  <RefreshCw className="w-5 h-5" />
                  RESET
                </button>
                
                <button
                  onClick={handleDownload}
                  disabled={isRecording}
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform border-2 border-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    boxShadow: '0 0 20px #00ff8880'
                  }}
                >
                  <Download className="w-5 h-5" />
                  {isRecording ? `GRABANDO ${recordProgress}%` : 'DESCARGAR VIDEO'}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border-2"
                 style={{ borderColor: currentScheme.accent + '40' }}>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" style={{ color: currentScheme.accent }} />
                Frecuencia Mental
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(styles).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setConfig({ ...config, style: key })}
                    className={`p-4 rounded-xl font-bold transition-all border-2 ${
                      config.style === key
                        ? 'scale-105'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    style={config.style === key ? {
                      background: `linear-gradient(135deg, ${value.color}40, ${value.color}20)`,
                      borderColor: value.color,
                      boxShadow: `0 0 20px ${value.color}80`,
                      color: '#ffffff'
                    } : {
                      backgroundColor: '#1a1a1a',
                      borderColor: '#333333',
                      color: '#888888'
                    }}
                  >
                    <div className="text-3xl mb-1">{value.emoji}</div>
                    <div className="text-sm">{value.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border-2"
                 style={{ borderColor: currentScheme.accent + '40' }}>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Type className="w-5 h-5" style={{ color: currentScheme.secondary }} />
                Mensaje Cuántico
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 tracking-wide">
                    TEXTO PRINCIPAL
                  </label>
                  <textarea
                    value={config.text}
                    onChange={(e) => setConfig({ ...config, text: e.target.value.toUpperCase() })}
                    rows={4}
                    className="w-full bg-black/50 text-white px-4 py-3 rounded-xl outline-none border-2 font-bold tracking-wider resize-none"
                    style={{ 
                      borderColor: currentScheme.accent + '60',
                      boxShadow: `0 0 10px ${currentScheme.accent}40`
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 tracking-wide">
                    SUBTÍTULO
                  </label>
                  <textarea
                    value={config.subtitle}
                    onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
                    rows={3}
                    className="w-full bg-black/50 text-white px-4 py-3 rounded-xl outline-none border-2 resize-none"
                    style={{ 
                      borderColor: currentScheme.secondary + '60',
                      boxShadow: `0 0 10px ${currentScheme.secondary}40`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelGenerator;
