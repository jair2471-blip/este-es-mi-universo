import React, { useState } from 'react';

const ReelGenerator = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [status, setStatus] = useState('Listo para crear');

  const handleGenerate = () => {
    setStatus('Procesando en el vacío...');
    // Aquí irá la lógica de conexión con la API después
    setTimeout(() => setStatus('¡Reel Creado! (Simulación)'), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-zinc-900 border-2 border-red-700 rounded-lg shadow-[0_0_20px_rgba(185,28,28,0.4)] text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600 tracking-tighter uppercase">
        Generador de Contenido Vital
      </h2>
      
      <div className="space-y-4">
        <input 
          type="text" 
          placeholder="Pega el link de tu idea aquí..." 
          className="w-full p-4 bg-black border border-zinc-700 rounded text-white focus:outline-none focus:border-red-500 transition-colors"
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        
        <button 
          onClick={handleGenerate}
          className="w-full py-4 bg-red-700 hover:bg-red-600 text-white font-black uppercase italic tracking-widest transition-all transform hover:scale-[1.01] active:scale-95"
        >
          {status}
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="aspect-[9/16] bg-black border border-zinc-800 flex items-center justify-center rounded">
          <span className="text-zinc-500 italic">Vista previa del Reel</span>
        </div>
        <div className="p-4 bg-black border border-zinc-800 rounded">
          <h3 className="text-red-500 font-bold mb-2 underline">Configuración de IA</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Ajustando parámetros neuronales para el Universo de la Mente...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReelGenerator;