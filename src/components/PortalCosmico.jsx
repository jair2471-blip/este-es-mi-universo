import React, { useState, useEffect, useRef } from 'react';
import { Zap, Sparkles, Orbit, Rocket, Star, Atom, Moon, Sun, Globe, Radio, Brain, Send, X, Download } from 'lucide-react';

// --- DATA: SABIDURÍA BASE ---
const SABIDURIA_COSMICA = {
  marciano: [{
    titulo: "La Paradoja del Tiempo Marciano",
    sabiduria: "En Marte un día dura 24.6 horas. Los marcianos aprendieron que el tiempo es elástico. No te apures por el reloj humano - tu ritmo interno es tu verdadera medida.",
    transmision: "Hoy sintoniza tu frecuencia interna. Dale 15 minutos a ese proyecto que abandonaste.",
    color: "from-red-500 via-orange-600 to-rose-700",
    dimension: "4D-Marciana"
  }],
  venusiano: [{
    titulo: "La Presión de Venus",
    sabiduria: "Venus tiene 92 veces la presión de la Tierra. Los venusianos transforman presión en diamantes. Tu estrés es la fábrica de tu brillo.",
    transmision: "Identifica tu mayor presión actual y pregúntate: ¿Qué diamante estoy creando?",
    color: "from-yellow-400 via-amber-500 to-orange-600",
    dimension: "7D-Venusiana"
  }],
  plutoniano: [{
    titulo: "El Planeta que Perdió su Estatus",
    sabiduria: "Plutón fue degradado, pero sigue orbitando con dignidad. Las etiquetas de otros no definen tu trayectoria. Tu órbita es solo tuya.",
    transmision: "¿Qué etiqueta limitante te pusieron? Hoy orbita más allá de ella.",
    color: "from-indigo-500 via-purple-600 to-violet-700",
    dimension: "10D-Plutoniana"
  }],
  neptuniano: [{
    titulo: "Los Vientos de 2,100 km/h",
    sabiduria: "Neptuno tiene los vientos más rápidos. A veces necesitas soltar y transformar TODO de golpe. A veces la evolución es una revolución.",
    transmision: "Identifica algo que necesite un cambio radical. Hazlo hoy mismo.",
    color: "from-blue-400 via-cyan-500 to-teal-600",
    dimension: "13D-Neptuniana"
  }],
  interdimensional: [{
    titulo: "Entrelazamiento Cuántico",
    sabiduria: "Dos partículas se comunican sin importar la distancia. Estás entrelazado con tu mejor futuro. Cada elección presente lo hace más real.",
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

// --- COMPONENTE: CARGANDO (EL AGUJERO NEGRO) ---
const CargandoSingularidad = () => (
  <div className="flex flex-col items-center justify-center p-20 space-y-8 animate-pulse">
    <div className="relative w-32 h-32 md:w-40 md:h-40">
      <div className="absolute inset-0 rounded-full bg-black shadow-[0_0_60px_30px_rgba(147,51,234,0.4)]" />
      <div className="absolute inset-[-10px] rounded-full border-t-4 border-cyan-400 animate-spin" style={{ animationDuration: '0.8s' }} />
      <div className="absolute inset-[-20px] rounded-full border-r-4 border-pink-500 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <Brain className="w-12 h-12 text-white" />
      </div>
    </div>
    <div className="text-center">
      <h3 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        SINTONIZANDO EL VACÍO...
      </h3>
    </div>
  </div>
);

// --- COMPONENTE PRINCIPAL ---
export default function PortalCosmico() {
  const [portalActivo, setPortalActivo] = useState(null);
  const [archivosCosmicos, setArchivosCosmicos] = useState([]);
  const [energiaCosmica, setEnergiaCosmica] = useState(0);
  const [mostrarJardin, setMostrarJardin] = useState(false);
  const [mostrarOraculo, setMostrarOraculo] = useState(false);
  const [consultaUsuario, setConsultaUsuario] = useState('');
  const [generandoIA, setGenerandoIA] = useState(false);
  const [particulas, setParticulas] = useState([]);

  // Inicializar Datos
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('archivos_cosmicos') || '[]');
      const energia = parseInt(localStorage.getItem('energia_cosmica') || '0');
      setArchivosCosmicos(saved);
      setEnergiaCosmica(energia);
    } catch (e) { console.error("Error al cargar datos estelares"); }

    const nuevasParticulas = Array.from({ length: 30 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 2 + 1
    }));
    setParticulas(nuevasParticulas);
  }, []);

  const absorberEnergia = () => {
    const nueva = energiaCosmica + 1;
    setEnergiaCosmica(nueva);
    localStorage.setItem('energia_cosmica', nueva.toString());
  };

  const abrirPortal = (dim) => {
    const opciones = SABIDURIA_COSMICA[dim];
    const seleccion = opciones[Math.floor(Math.random() * opciones.length)];
    setPortalActivo({ ...seleccion, dimension: dim });
    absorberEnergia();
  };

  const consultarOraculo = async () => {
    if (!consultaUsuario.trim()) return;
    setGenerandoIA(true);
    setMostrarOraculo(false);
    setPortalActivo({ cargando: true });

    try {
      // SIMULACIÓN DE IA (Para que pruebes sin API Key primero)
      await new Promise(res => setTimeout(res, 2500));
      const mockResponse = {
        titulo: "El Eco de tu Intención",
        sabiduria: `Has preguntado por "${consultaUsuario}". El universo responde que la claridad no se busca, se permite. Como una nebulosa, tus ideas necesitan espacio para colapsar y formar estrellas.`,
        transmision: "Hoy, toma una decisión basada en la intuición y no en el análisis.",
        dimension: "11D-Oráculo-IA",
        color: "from-fuchsia-600 via-purple-700 to-indigo-900"
      };
      setPortalActivo(mockResponse);
      absorberEnergia();
    } catch (e) {
      setPortalActivo(null);
      alert("Interferencia cuántica. Intenta de nuevo.");
    } finally {
      setGenerandoIA(false);
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
    <div className="min-h-screen bg-[#02020a] text-white relative overflow-hidden font-sans">
      {/* Estrellas Estáticas */}
      <div className="absolute inset-0 pointer-events-none">
        {particulas.map(p => (
          <div key={p.id} className="absolute bg-white rounded-full opacity-30 shadow-sm"
               style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px` }} />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-10">
        {/* HEADER */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
             <Atom className="w-12 h-12 text-cyan-400 animate-spin" style={{animationDuration: '4s'}} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent uppercase">
            Portal Cósmico
          </h1>
          <div className="flex justify-center items-center gap-4 mt-4">
            <div className="bg-black/40 border border-white/10 px-4 py-1 rounded-full text-xs font-mono">
              ⚡ {energiaCosmica} GW ENERGÍA
            </div>
            <button onClick={() => setMostrarJardin(!mostrarJardin)} className="text-xs font-bold text-cyan-400 uppercase tracking-widest hover:underline">
              {mostrarJardin ? '[ Cerrar Archivos ]' : '[ Ver Archivos ]'}
            </button>
          </div>
        </header>

        {/* LOGICA DE VISTAS */}
        {mostrarJardin ? (
          <div className="grid md:grid-cols-2 gap-6 animate-fadeIn">
            {archivosCosmicos.length > 0 ? archivosCosmicos.map((a, i) => (
              <div key={i} className={`p-6 rounded-3xl bg-gradient-to-br ${a.color} border border-white/20 shadow-xl`}>
                <h3 className="text-2xl font-black">{a.titulo}</h3>
                <p className="text-sm opacity-90 mt-3 leading-relaxed">{a.sabiduria}</p>
              </div>
            )) : <p className="col-span-2 text-center text-gray-500">No hay transmisiones archivadas aún.</p>}
          </div>
        ) : portalActivo ? (
          portalActivo.cargando ? (
            <CargandoSingularidad />
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className={`p-1 rounded-[2rem] bg-gradient-to-br ${portalActivo.color} shadow-2xl`}>
                <div className="bg-gray-900 rounded-[1.8rem] p-8 md:p-12">
                  <div className="flex justify-between items-center mb-8">
                    <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                      ◉ {portalActivo.dimension}
                    </span>
                    <button onClick={() => setPortalActivo(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 leading-none">{portalActivo.titulo}</h2>
                  <p className="text-lg md:text-2xl text-gray-300 italic mb-10 leading-relaxed font-light">
                    "{portalActivo.sabiduria}"
                  </p>
                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8">
                    <h4 className="text-[10px] font-black text-yellow-400 uppercase mb-2 tracking-widest">Transmisión Activa</h4>
                    <p className="text-lg font-bold">{portalActivo.transmision}</p>
                  </div>
                  <button onClick={archivarTransmision} 
                          className="w-full bg-white text-black py-4 rounded-2xl font-black hover:bg-cyan-400 transition-all flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 fill-current" /> ARCHIVAR EN MI BASE
                  </button>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="space-y-10">
            {/* DIMENSIONES */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.keys(SABIDURIA_COSMICA).map(dim => {
                const Icon = ICONOS_COSMICOS[dim];
                return (
                  <button key={dim} onClick={() => abrirPortal(dim)}
                          className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 flex flex-col items-center gap-4">
                    <Icon className="w-8 h-8 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-tighter opacity-50 group-hover:opacity-100">{dim}</span>
                  </button>
                );
              })}
            </div>
            
            {/* BOTÓN ORÁCULO IA */}
            <button onClick={() => setMostrarOraculo(true)}
                    className="w-full p-10 rounded-[2.5rem] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:scale-[1.02] transition-transform shadow-2xl shadow-purple-500/20 flex flex-col items-center gap-4">
              <Brain className="w-12 h-12" />
              <div className="text-center">
                <span className="text-3xl font-black uppercase tracking-tighter block">Consultar Oráculo Personal</span>
                <span className="text-xs opacity-70 font-mono">IA INTERDIMENSIONAL CONECTADA</span>
              </div>
            </button>
          </div>
        )}

        {/* MODAL ORÁCULO */}
        {mostrarOraculo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
            <div className="bg-gray-900 border-2 border-cyan-500/50 p-8 md:p-12 rounded-[2.5rem] max-w-xl w-full relative shadow-[0_0_50px_rgba(6,182,212,0.2)]">
              <button onClick={() => setMostrarOraculo(false)} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-3xl font-black mb-8 flex items-center gap-4 leading-none">
                <Sparkles className="text-cyan-400 w-8 h-8" /> EL ORÁCULO <br/>TE ESCUCHA
              </h2>
              <textarea 
                value={consultaUsuario}
                onChange={(e) => setConsultaUsuario(e.target.value)}
                placeholder="Escribe tu consulta al universo... (Ej: ¿Cómo encontrar mi propósito?)"
                className="w-full h-40 bg-black/50 border border-white/10 rounded-3xl p-6 text-white focus:border-cyan-400 outline-none mb-6 resize-none text-lg"
              />
              <button onClick={consultarOraculo} 
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-5 rounded-3xl font-black uppercase text-white hover:shadow-cyan-500/50 shadow-lg transition-all tracking-widest">
                ENVIAR PETICIÓN
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
