import React, { useState, useEffect } from 'react'; // Quitamos useRef
import { Orbit, Rocket, Star, Atom, Moon, Sun, Brain, X } from 'lucide-react';
// Quitamos Zap, Globe, Radio, Send, Download que no se usaban

const SABIDURIA_COSMICA = {
  marciano: [{
    titulo: "La Paradoja del Tiempo Marciano",
    sabiduria: "En Marte un día dura 24.6 horas. Los marcianos aprendieron que el tiempo es elástico. No te apures por el reloj humano.",
    transmision: "Hoy sintoniza tu frecuencia interna. Dale 15 minutos a ese proyecto que abandonaste.",
    color: "from-red-500 via-orange-600 to-rose-700",
    dimension: "4D-Marciana"
  }],
  venusiano: [{
    titulo: "La Presión de Venus",
    sabiduria: "Venus tiene 92 veces la presión de la Tierra. Los venusianos transforman presión en diamantes.",
    transmision: "Identifica tu mayor presión actual y pregúntate: ¿Qué diamante estoy creando?",
    color: "from-yellow-400 via-amber-500 to-orange-600",
    dimension: "7D-Venusiana"
  }],
  plutoniano: [{
    titulo: "El Planeta que Perdió su Estatus",
    sabiduria: "Plutón fue degradado, pero sigue orbitando con dignidad. Tu órbita es solo tuya.",
    transmision: "¿Qué etiqueta limitante te pusieron? Hoy orbita más allá de ella.",
    color: "from-indigo-500 via-purple-600 to-violet-700",
    dimension: "10D-Plutoniana"
  }],
  neptuniano: [{
    titulo: "Los Vientos de 2,100 km/h",
    sabiduria: "Neptuno tiene los vientos más rápidos. A veces la evolución es una revolución.",
    transmision: "Identifica algo que necesite un cambio radical. Hazlo hoy mismo.",
    color: "from-blue-400 via-cyan-500 to-teal-600",
    dimension: "13D-Neptuniana"
  }],
  interdimensional: [{
    titulo: "Entrelazamiento Cuántico",
    sabiduria: "Dos partículas se comunican sin importar la distancia. Estás entrelazado con tu mejor futuro.",
    transmision: "Actúa HOY como la versión de ti que ya logró lo que buscas.",
    color: "from-pink-500 via-purple-600 to-indigo-700",
    dimension: "∞D-Cuántica"
  }]
};

const ICONOS_COSMICOS = {
  marciano: Rocket,
  venusiano: Sun,
  plutoniano: Moon,
  neptuniano: Orbit,
  interdimensional: Atom
};

const CargandoSingularidad = () => (
  <div className="flex flex-col items-center justify-center p-20 space-y-8 animate-pulse">
    <div className="relative w-32 h-32">
      <div className="absolute inset-0 rounded-full bg-black shadow-[0_0_60px_30px_rgba(147,51,234,0.4)]" />
      <div className="absolute inset-[-10px] rounded-full border-t-4 border-cyan-400 animate-spin" style={{ animationDuration: '0.8s' }} />
      <div className="absolute inset-[-20px] rounded-full border-r-4 border-pink-500 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <Brain className="w-12 h-12 text-white" />
      </div>
    </div>
    <h3 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
      SINTONIZANDO...
    </h3>
  </div>
);

export default function PortalCosmico() {
  const [portalActivo, setPortalActivo] = useState(null);
  const [archivosCosmicos, setArchivosCosmicos] = useState([]);
  const [energiaCosmica, setEnergiaCosmica] = useState(0);
  const [mostrarJardin, setMostrarJardin] = useState(false);
  const [mostrarOraculo, setMostrarOraculo] = useState(false);
  const [consultaUsuario, setConsultaUsuario] = useState('');
  const [particulas, setParticulas] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('archivos_cosmicos') || '[]');
      const energia = parseInt(localStorage.getItem('energia_cosmica') || '0', 10);
      setArchivosCosmicos(saved);
      setEnergiaCosmica(energia);
    } catch { console.error("Error cargando datos"); } // Quitamos el error 'e' no usado

    setParticulas(Array.from({ length: 30 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 2 + 1
    })));
  }, []);

  const abrirPortal = (dim) => {
    const opciones = SABIDURIA_COSMICA[dim];
    const seleccion = opciones[Math.floor(Math.random() * opciones.length)];
    setPortalActivo({ ...seleccion, dimension: dim });
    const nueva = energiaCosmica + 1;
    setEnergiaCosmica(nueva);
    localStorage.setItem('energia_cosmica', nueva.toString());
  };

  const consultarOraculo = async () => {
    if (!consultaUsuario.trim()) return;
    setMostrarOraculo(false);
    setPortalActivo({ cargando: true });

    try {
      await new Promise(res => setTimeout(res, 2000));
      setPortalActivo({
        titulo: "El Eco Estelar",
        sabiduria: `Tu duda sobre "${consultaUsuario}" es solo energía buscando forma.`,
        transmision: "Confía en tu primer impulso de mañana.",
        dimension: "11D-IA",
        color: "from-purple-600 to-blue-900"
      });
    } catch { // Quitamos 'e' no usado
      setPortalActivo(null);
    }
  };

  const archivarTransmision = () => {
    if (portalActivo && !archivosCosmicos.find(a => a.titulo === portalActivo.titulo)) {
      const nuevos = [...archivosCosmicos, portalActivo];
      setArchivosCosmicos(nuevos);
      localStorage.setItem('archivos_cosmicos', JSON.stringify(nuevos));
    }
  };

  return (
    <div className="min-h-screen bg-[#02020a] text-white relative overflow-hidden p-6">
      <div className="absolute inset-0 pointer-events-none">
        {particulas.map(p => (
          <div key={p.id} className="absolute bg-white rounded-full opacity-30"
               style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px` }} />
        ))}
      </div>

      <header className="text-center mb-10 relative z-10">
        <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">PORTAL CÓSMICO</h1>
        <div className="mt-4 flex justify-center gap-4">
          <span className="text-xs font-mono">ENERGÍA: {energiaCosmica}</span>
          <button onClick={() => setMostrarJardin(!mostrarJardin)} className="text-xs text-cyan-400 underline">
            {mostrarJardin ? 'CERRAR ARCHIVOS' : 'VER ARCHIVOS'}
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto">
        {mostrarJardin ? (
          <div className="grid md:grid-cols-2 gap-4">
            {archivosCosmicos.map((a, i) => (
              <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br ${a.color} border border-white/20`}>
                <h3 className="font-bold">{a.titulo}</h3>
                <p className="text-sm opacity-80">{a.sabiduria}</p>
              </div>
            ))}
          </div>
        ) : portalActivo ? (
          portalActivo.cargando ? <CargandoSingularidad /> : (
            <div className={`p-8 rounded-3xl bg-gradient-to-br ${portalActivo.color} border border-white/20`}>
              <div className="flex justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest">◉ {portalActivo.dimension}</span>
                <button onClick={() => setPortalActivo(null)}><X /></button>
              </div>
              <h2 className="text-3xl font-black mb-4">{portalActivo.titulo}</h2>
              <p className="text-xl italic mb-6">"{portalActivo.sabiduria}"</p>
              <button onClick={archivarTransmision} className="w-full bg-white text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                <Star className="w-4 h-4" /> GUARDAR
              </button>
            </div>
          )
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.keys(SABIDURIA_COSMICA).map(dim => {
                const Icon = ICONOS_COSMICOS[dim];
                return (
                  <button key={dim} onClick={() => abrirPortal(dim)} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500 transition-all flex flex-col items-center gap-2">
                    <Icon className="w-8 h-8" />
                    <span className="text-[10px] font-bold uppercase">{dim}</span>
                  </button>
                );
              })}
            </div>
            <button onClick={() => setMostrarOraculo(true)} className="w-full p-8 rounded-3xl bg-gradient-to-r from-indigo-600 to-pink-600 font-black text-xl uppercase tracking-tighter shadow-lg shadow-purple-500/20">
              Consultar Oráculo Personal
            </button>
          </div>
        )}
      </main>

      {mostrarOraculo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90">
          <div className="bg-gray-900 border border-cyan-500 p-8 rounded-3xl max-w-lg w-full relative">
            <button onClick={() => setMostrarOraculo(false)} className="absolute top-4 right-4"><X /></button>
            <h2 className="text-2xl font-black mb-4">EL ORÁCULO</h2>
            <textarea 
              value={consultaUsuario}
              onChange={(e) => setConsultaUsuario(e.target.value)}
              className="w-full h-32 bg-black border border-white/20 rounded-xl p-4 mb-4 outline-none focus:border-cyan-400"
              placeholder="¿Qué buscas saber?"
            />
            <button onClick={consultarOraculo} className="w-full bg-cyan-500 py-3 rounded-xl font-bold text-black">ENVIAR</button>
          </div>
        </div>
      )}
    </div>
  );
}
