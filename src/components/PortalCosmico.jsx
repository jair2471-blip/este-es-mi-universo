import React, { useState, useEffect, useRef } from 'react';
import { Zap, Sparkles, Orbit, Rocket, Star, Atom, Moon, Sun, Globe, Radio, Brain, Send, X, Download } from 'lucide-react';

// --- CONFIGURACIÓN Y DATOS ---
const SABIDURIA_COSMICA = {
  marciano: [
    {
      titulo: "La Paradoja del Tiempo Marciano",
      sabiduria: "En Marte un día dura 24.6 horas. Los marcianos aprendieron que el tiempo es elástico. No te apures por el reloj humano - tu ritmo interno es tu verdadera medida.",
      transmision: "Hoy sintoniza tu frecuencia interna. Dale 15 minutos a ese proyecto que abandonaste.",
      color: "from-red-500 via-orange-600 to-rose-700",
      dimension: "4D-Marciana"
    }
  ],
  venusiano: [
    {
      titulo: "La Presión de Venus",
      sabiduria: "Venus tiene 92 veces la presión de la Tierra. Los venusianos transforman presión en diamantes. Tu estrés es la fábrica de tu brillo.",
      transmision: "Identifica tu mayor presión actual y pregúntate: ¿Qué diamante estoy creando?",
      color: "from-yellow-400 via-amber-500 to-orange-600",
      dimension: "7D-Venusiana"
    }
  ],
  plutoniano: [
    {
      titulo: "El Planeta que Perdió su Estatus",
      sabiduria: "Plutón fue degradado, pero sigue orbitando con dignidad. Las etiquetas de otros no definen tu trayectoria. Tu órbita es solo tuya.",
      transmision: "¿Qué etiqueta limitante te pusieron? Hoy orbita más allá de ella.",
      color: "from-indigo-500 via-purple-600 to-violet-700",
      dimension: "10D-Plutoniana"
    }
  ],
  neptuniano: [
    {
      titulo: "Los Vientos de 2,100 km/h",
      sabiduria: "Neptuno tiene los vientos más rápidos. A veces necesitas soltar y transformar TODO de golpe. A veces la evolución es una revolución.",
      transmision: "Identifica algo que necesite un cambio radical. Hazlo hoy mismo.",
      color: "from-blue-400 via-cyan-500 to-teal-600",
      dimension: "13D-Neptuniana"
    }
  ],
  interdimensional: [
    {
      titulo: "Entrelazamiento Cuántico",
      sabiduria: "Dos partículas se comunican sin importar la distancia. Estás entrelazado con tu mejor futuro. Cada elección presente lo hace más real.",
      transmision: "Actúa HOY como la versión de ti que ya logró lo que buscas.",
      color: "from-pink-500 via-purple-600 to-indigo-700",
      dimension: "∞D-Cuántica"
    }
  ]
};

const ICONOS_COSMICOS = {
  marciano: Rocket,
  venusiano: Sun,
  plutoniano: Moon,
  neptuniano: Orbit,
  interdimensional: Atom
};

// --- COMPONENTE DE CARGA (SINGULARIDAD) ---
const CargandoSingularidad = () => (
  <div className="flex flex-col items-center justify-center p-20 space-y-8 animate-in fade-in duration-700">
    <div className="relative w-40 h-40">
      <div className="absolute inset-0 rounded-full bg-black shadow-[0_0_60px_30px_rgba(147,51,234,0.4)] animate-pulse" />
      <div className="absolute inset-[-10px] rounded-full border-t-4 border-cyan-400 animate-spin" style={{ animationDuration: '1s' }} />
      <div className="absolute inset-[-20px] rounded-full border-r-4 border-pink-500 animate-spin" style={{ animationDuration: '2.5s', animationDirection: 'reverse' }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <Brain className="w-12 h-12 text-white animate-pulse" />
      </div>
    </div>
    <div className="text-center">
      <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-bounce">
        INVOCANDO AL ORÁCULO...
      </h3>
      <p className="text-purple-300 font-mono tracking-widest text-sm uppercase">Cruzando el horizonte de sucesos</p>
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
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [particulas, setParticulas] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('archivos_cosmicos') || '[]');
    const energia = parseInt(localStorage.getItem('energia_cosmica') || '0');
    setArchivosCosmicos(saved);
    setEnergiaCosmica(energia);

    const nuevasParticulas = Array.from({ length: 40 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 2 + 1, speed: Math.random() * 0.5 + 0.1
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
      // NOTA: Aquí iría tu llamada real a Anthropic o OpenAI
      // Para efectos del demo, simulamos la respuesta del Oráculo
      await new Promise(res => setTimeout(res, 3000));
      
      const respuestaSimulada = {
        titulo: "La Sincronía de los Quasares",
        sabiduria: `Tu consulta sobre "${consultaUsuario}" ha resonado en el núcleo de la galaxia. La respuesta es que no eres un punto aislado, sino una frecuencia en expansión.`,
        transmision: "Escribe tres metas y visualízalas como planetas en tu órbita personal.",
        dimension: "11D-Oráculo",
        color: "from-fuchsia-600 via-purple-700 to-blue-900",
        esIA: true
      };
      
      setPortalActivo(respuestaSimulada);
      absorberEnergia();
    } catch (e) {
      setPortalActivo(null);
    } finally {
      setGenerandoIA(false);
    }
  };

  const archivarTransmision = () => {
    if (!archivosCosmicos.find(a => a.titulo === portalActivo.titulo)) {
      const nuevos = [...archivosCosmicos, portalActivo];
      setArchivosCosmicos(nuevos);
      localStorage.setItem('archivos_cosmicos', JSON.stringify(nuevos));
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white relative overflow-hidden font-sans">
      {/* Fondo de Estrellas Animadas */}
      <div className="absolute inset-0 pointer-events-none">
        {particulas.map(p => (
          <div key={p.id} className="absolute bg-white rounded-full opacity-40 shadow-white shadow-sm"
               style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px` }} />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-6">
        {/* HEADER */}
        <header className="text-center py-10">
          <h1 className="text-6xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
            PORTAL CÓSMICO
          </h1>
          <div className="flex justify-center items-center gap-6">
            <div className="bg-black/50 border border-white/20 px-4 py-2 rounded-full flex items-center gap-2">
              <Zap className="text-yellow-400 w-4 h-4" />
              <span className="text-xs font-mono">{energiaCosmica} ENERGÍA</span>
            </div>
            <button onClick={() => setMostrarJardin(!mostrarJardin)} className="text-xs underline hover:text-cyan-400">
              {mostrarJardin ? 'CERRAR ARCHIVOS' : 'BASE DE DATOS'}
            </button>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL */}
        {mostrarJardin ? (
          <div className="grid md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-10">
            {archivosCosmicos.map((a, i) => (
              <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br ${a.color} border border-white/20`}>
                <h3 className="text-xl font-bold">{a.titulo}</h3>
                <p className="text-sm opacity-80 mt-2">{a.sabiduria}</p>
              </div>
            ))}
          </div>
        ) : portalActivo ? (
          portalActivo.cargando ? (
            <CargandoSingularidad />
          ) : (
            <div className="max-w-2xl mx-auto animate-in zoom-in duration-500">
              <div className={`p-1 rounded-3xl bg-gradient-to-br ${portalActivo.color} shadow-[0_0_50px_rgba(0,0,0,0.5)]`}>
                <div className="bg-gray-900/90 backdrop-blur-xl rounded-[1.4rem] p-8">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">◉ {portalActivo.dimension}</span>
                    <button onClick={() => setPortalActivo(null)} className="hover:text-red-500"><X /></button>
                  </div>
                  <h2 className="text-4xl font-black mb-4">{portalActivo.titulo}</h2>
                  <p className="text-xl text-gray-300 italic mb-8 leading-relaxed">"{portalActivo.sabiduria}"</p>
                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">
                    <h4 className="text-xs font-bold text-cyan-400 mb-2 uppercase tracking-tighter">Acción Sugerida</h4>
                    <p className="text-lg">{portalActivo.transmision}</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={archivarTransmision} className="flex-1 bg-white text-black py-3 rounded-xl font-bold hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2">
                      <Star className="w-4 h-4" /> ARCHIVAR
                    </button>
                    <button onClick={() => window.print()} className="p-3 bg-white/10 rounded-xl hover:bg-white/20">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.keys(SABIDURIA_COSMICA).map(dim => {
              const Icon = ICONOS_COSMICOS[dim];
              return (
                <button key={dim} onClick={() => abrirPortal(dim)}
                        className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all flex flex-col items-center gap-4">
                  <Icon className="w-10 h-10 group-hover:scale-125 transition-transform duration-500" />
                  <span className="text-[10px] font-black uppercase tracking-tighter opacity-60 group-hover:opacity-100">{dim}</span>
                </button>
              );
            })}
            {/* BOTÓN ORÁCULO */}
            <button onClick={() => setMostrarOraculo(true)}
                    className="col-span-2 md:col-span-5 mt-10 p-8 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all flex items-center justify-center gap-4 shadow-xl shadow-purple-500/20">
              <Brain className="w-8 h-8 animate-pulse" />
              <span className="text-2xl font-black tracking-tighter uppercase">Consultar Oráculo Personal</span>
            </button>
          </div>
        )}

        {/* MODAL ORÁCULO */}
        {mostrarOraculo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <div className="bg-gray-900 border-2 border-purple-500 p-8 rounded-3xl max-w-lg w-full relative">
              <button onClick={() => setMostrarOraculo(false)} className="absolute top-4 right-4"><X /></button>
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                <Sparkles className="text-cyan-400" /> EL ORÁCULO IA
              </h2>
              <textarea 
                value={consultaUsuario}
                onChange={(e) => setConsultaUsuario(e.target.value)}
                placeholder="¿Qué dilema terrestre te aqueja hoy?"
                className="w-full h-32 bg-black border border-white/20 rounded-2xl p-4 text-white focus:border-cyan-400 outline-none mb-4"
              />
              <button onClick={consultarOraculo} className="w-full bg-cyan-500 py-4 rounded-2xl font-black uppercase text-black hover:bg-white transition-all">
                ENVIAR AL VACÍO
              </button>
            </div>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
