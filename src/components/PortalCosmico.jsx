import React, { useState, useEffect, useRef } from 'react';
import { Zap, Sparkles, Orbit, Rocket, Star, Atom, Moon, Sun, Globe, Radio, Brain, Send } from 'lucide-react';

const SABIDURIA_COSMICA = {
  marciano: [
    {
      titulo: "La Paradoja del Tiempo Marciano",
      sabiduria: "En Marte un día dura 24.6 horas. Los marcianos aprendieron que el tiempo es elástico. No te apures por el reloj humano - tu ritmo interno es tu verdadera medida. Algunas metas necesitan estaciones marcianas, no días terrestres.",
      transmision: "Hoy sintoniza tu frecuencia interna. ¿Qué proyecto abandonaste por 'falta de tiempo'? Dale 15 minutos en TU tiempo, no en el del reloj.",
      color: "from-red-500 via-orange-600 to-rose-700",
      dimension: "4D-Marciana"
    },
    {
      titulo: "Las Tormentas de Polvo Rojo",
      sabiduria: "Las tormentas marcianas pueden durar meses y cubrir todo el planeta. Pero cuando pasan, revelan nuevos paisajes. Tus crisis no son caos - son terraformación. Estás siendo rediseñado por el universo.",
      transmision: "Acepta la tormenta que estás viviendo. Escribe: '¿Qué nuevo paisaje está creando esto en mí?'",
      color: "from-orange-500 via-red-600 to-amber-700",
      dimension: "5D-Marciana"
    },
    {
      titulo: "Los Dos Soles de Fobos",
      sabiduria: "Desde Fobos, la luna marciana, ves Marte y el Sol simultáneamente. Perspectiva dual = sabiduría. No eres solo tus problemas terrenos ni solo tus sueños celestiales. Eres el observador de ambos.",
      transmision: "Elévate mentalmente. Mira tu vida desde Fobos. ¿Qué ves que antes no veías?",
      color: "from-red-600 via-pink-600 to-purple-700",
      dimension: "6D-Fobos"
    }
  ],
  venusiano: [
    {
      titulo: "La Presión de Venus",
      sabiduria: "Venus tiene 92 veces la presión atmosférica de la Tierra. Los venusianos transforman presión en diamantes. Tu estrés, tus desafíos, tus momentos de quiebre - son la fábrica de tu brillo. La presión no te destruye, te cristaliza.",
      transmision: "Identifica tu mayor presión actual. Ahora pregúntate: ¿Qué diamante estoy creando?",
      color: "from-yellow-400 via-amber-500 to-orange-600",
      dimension: "7D-Venusiana"
    },
    {
      titulo: "El Día que Dura un Año",
      sabiduria: "En Venus, un día es más largo que un año. La paciencia venusiana es legendaria. Algunas transformaciones requieren rotaciones lentas. No todo es sprint. Algunos procesos necesitan la lentitud de Venus para ser perfectos.",
      transmision: "¿Qué proceso estás apurando? Suéltalo. Dale su tiempo venusiano de maduración.",
      color: "from-amber-400 via-yellow-500 to-lime-600",
      dimension: "8D-Venusiana"
    },
    {
      titulo: "Lluvia de Ácido Sulfúrico",
      sabiduria: "En Venus llueve ácido que se evapora antes de tocar el suelo. Las palabras tóxicas de otros son así - peligrosas en el aire pero sin poder de tocarte si no las dejas. Tú decides qué comentarios llegan a tu superficie.",
      transmision: "Hoy practica la evaporación emocional. Deja que la negatividad se disuelva antes de absorberte.",
      color: "from-lime-400 via-green-500 to-emerald-600",
      dimension: "9D-Venusiana"
    }
  ],
  plutoniano: [
    {
      titulo: "El Planeta que Perdió su Estatus",
      sabiduria: "Plutón fue degradado de planeta a 'planeta enano'. Su respuesta: seguir orbitando con dignidad. Las etiquetas de otros no definen tu trayectoria. Tú sigues brillando aunque te quiten títulos, aunque te subestimen. Tu órbita es tuya.",
      transmision: "¿Qué etiqueta limitante te han puesto? Hoy orbita más allá de ella.",
      color: "from-indigo-500 via-purple-600 to-violet-700",
      dimension: "10D-Plutoniana"
    },
    {
      titulo: "El Corazón de Plutón",
      sabiduria: "Plutón tiene una formación en forma de corazón visible desde el espacio. A 6 mil millones de kilómetros del sol, en la oscuridad y frío extremo, Plutón porta un corazón gigante. Tu calidez no depende de tu distancia del 'centro'. Brilla desde los bordes.",
      transmision: "Escribe algo hermoso desde tu 'distancia'. Un mensaje, un gesto, un acto de amor sin esperar nada.",
      color: "from-purple-500 via-pink-600 to-rose-700",
      dimension: "11D-Plutoniana"
    },
    {
      titulo: "248 Años de Paciencia",
      sabiduria: "Plutón tarda 248 años terrestres en completar una órbita. Hay procesos cósmicos que trascienden vidas humanas. Tus acciones hoy plantan bosques que no verás crecer. Planta igual. El legado no necesita tu ego para florecer.",
      transmision: "Haz algo hoy cuyo beneficio solo verán otros. Planta para el futuro.",
      color: "from-violet-500 via-indigo-600 to-blue-700",
      dimension: "12D-Plutoniana"
    }
  ],
  neptuniano: [
    {
      titulo: "Los Vientos de 2,100 km/h",
      sabiduria: "Neptuno tiene los vientos más rápidos del sistema solar. El movimiento extremo crea cambio extremo. A veces necesitas la velocidad neptuniana - soltar, cambiar, transformar TODO de golpe. No siempre es evolución gradual. A veces es revolución.",
      transmision: "Identifica algo que necesita viento neptuniano. Cámbialo HOY, no mañana.",
      color: "from-blue-400 via-cyan-500 to-teal-600",
      dimension: "13D-Neptuniana"
    },
    {
      titulo: "El Gigante de Hielo Interior",
      sabiduria: "Neptuno parece frío por fuera pero tiene un núcleo de 5,000°C. Tu calma exterior esconde fuego interno. Está bien ser terremoto por dentro y paz por fuera. La intensidad contenida es poder, no debilidad.",
      transmision: "Conecta con tu fuego interno. ¿Qué te apasiona en secreto? Dale espacio hoy.",
      color: "from-cyan-400 via-blue-500 to-indigo-600",
      dimension: "14D-Neptuniana"
    },
    {
      titulo: "14 Lunas y 6 Anillos",
      sabiduria: "Neptuno tiene su sistema propio de satélites y anillos. No necesitas la órbita de nadie más. Crea tu propio sistema, tus propias reglas, tu propia gravedad. Atrae lo que resuena con tu frecuencia neptuniana.",
      transmision: "Define UNA regla personal que nadie más sigue pero que para ti es ley.",
      color: "from-teal-400 via-cyan-500 to-sky-600",
      dimension: "15D-Neptuniana"
    }
  ],
  interdimensional: [
    {
      titulo: "Entrelazamiento Cuántico",
      sabiduria: "Dos partículas entrelazadas se comunican instantáneamente sin importar la distancia. Estás entrelazado cuánticamente con tu mejor futuro. Cada elección presente lo hace más real. La distancia temporal es una ilusión - ya eres esa versión.",
      transmision: "Actúa HOY como la versión de ti que ya logró lo que buscas. ¿Qué haría?",
      color: "from-pink-500 via-purple-600 to-indigo-700",
      dimension: "∞D-Cuántica"
    },
    {
      titulo: "El Multiverso de Decisiones",
      sabiduria: "Cada decisión crea una bifurcación dimensional. Hay versiones tuyas viviendo todas las posibilidades. Esto no es carga - es libertad. No existe 'la decisión correcta'. Todas las versiones de ti están explorando. Elige con curiosidad, no con miedo.",
      transmision: "Toma UNA decisión hoy sin overthinking. Confía en la ramificación.",
      color: "from-fuchsia-500 via-violet-600 to-purple-700",
      dimension: "∞D-Multiversal"
    },
    {
      titulo: "La Radiación de Hawking",
      sabiduria: "Hasta los agujeros negros emiten luz (radiación de Hawking). Tus momentos más oscuros están emitiendo sabiduría que aún no ves. Nada es completamente vacío. Hasta el vacío cuántico bulle de potencial. Tu dolor está pariendo galaxias.",
      transmision: "Encuentra una lección en tu momento más oscuro reciente. Escríbela.",
      color: "from-purple-600 via-black to-indigo-900",
      dimension: "∞D-Singularidad"
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

export default function PortalCosmico() {
  const [portalActivo, setPortalActivo] = useState(null);
  const [dimensionSeleccionada, setDimensionSeleccionada] = useState(null);
  const [archivosCosmicos, setArchivosCosmicos] = useState([]);
  const [energiaCosmica, setEnergiaCosmica] = useState(0);
  const [mostrarJardin, setMostrarJardin] = useState(false);
  const [transmitiendo, setTransmitiendo] = useState(false);
  const [particulas, setParticulas] = useState([]);
  const [mostrarOraculo, setMostrarOraculo] = useState(false);
  const [consultaUsuario, setConsultaUsuario] = useState('');
  const [generandoIA, setGenerandoIA] = useState(false);
  const [respuestaIA, setRespuestaIA] = useState(null);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('archivos_cosmicos') || '[]');
    const energia = parseInt(localStorage.getItem('energia_cosmica') || '0');
    setArchivosCosmicos(saved);
    setEnergiaCosmica(energia);
    
    // Generar partículas cósmicas
    const nuevasParticulas = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5
    }));
    setParticulas(nuevasParticulas);
  }, []);

  useEffect(() => {
    if (particulas.length === 0) return;
    
    const interval = setInterval(() => {
      setParticulas(prev => prev.map(p => ({
        ...p,
        y: (p.y + p.speed) % 100
      })));
    }, 50);
    
    return () => clearInterval(interval);
  }, [particulas]);

  const abrirPortal = (dimension) => {
    setTransmitiendo(true);
    setDimensionSeleccionada(dimension);
    setTimeout(() => {
      const sabiduria = obtenerSabiduriaAleatoria(dimension);
      setPortalActivo(sabiduria);
      setTransmitiendo(false);
      absorberEnergia();
    }, 800);
  };

  const obtenerSabiduriaAleatoria = (dimension) => {
    const sabiduries = SABIDURIA_COSMICA[dimension];
    const indice = Math.floor(Math.random() * sabiduries.length);
    return { ...sabiduries[indice], dimension };
  };

  const absorberEnergia = () => {
    const nuevaEnergia = energiaCosmica + 1;
    setEnergiaCosmica(nuevaEnergia);
    localStorage.setItem('energia_cosmica', nuevaEnergia.toString());
  };

  const archivarTransmision = () => {
    if (portalActivo && !archivosCosmicos.find(a => a.titulo === portalActivo.titulo)) {
      const nuevosArchivos = [...archivosCosmicos, portalActivo];
      setArchivosCosmicos(nuevosArchivos);
      try {
        localStorage.setItem('archivos_cosmicos', JSON.stringify(nuevosArchivos));
        mostrarAlerta('🛸 Transmisión archivada en tu base estelar!');
      } catch (e) {
        console.error('Error:', e);
      }
    } else if (archivosCosmicos.find(a => a.titulo === portalActivo.titulo)) {
      mostrarAlerta('💫 Esta transmisión ya está en tus archivos!');
    }
  };

  const mostrarAlerta = (msg) => {
    const alerta = document.createElement('div');
    alerta.textContent = msg;
    alerta.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#667eea,#764ba2);color:white;padding:16px 32px;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,0.3);z-index:9999;font-weight:bold;';
    document.body.appendChild(alerta);
    setTimeout(() => alerta.remove(), 3000);
  };

  const cerrarPortal = () => {
    setPortalActivo(null);
    setDimensionSeleccionada(null);
    setRespuestaIA(null);
  };

  const consultarOraculo = async () => {
    if (!consultaUsuario.trim()) {
      mostrarAlerta('⚠️ Escribe tu consulta para el Oráculo');
      return;
    }

    setGenerandoIA(true);
    setMostrarOraculo(false);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `Eres el ORÁCULO CÓSMICO INTERDIMENSIONAL, un ser de sabiduría infinita que habla desde las dimensiones más allá del espacio-tiempo. Tu misión es ayudar a los humanos con lecciones de crecimiento personal usando metáforas cósmicas, planetarias y de física cuántica.

El usuario te consulta: "${consultaUsuario}"

Responde en formato JSON con esta estructura EXACTA (sin markdown, sin backticks, solo JSON puro):
{
  "titulo": "Un título épico y cósmico para la lección (máximo 60 caracteres)",
  "sabiduria": "La lección de crecimiento personal usando metáforas del espacio, planetas, física cuántica o dimensiones (150-250 palabras). Debe ser profunda, filosófica y aplicable a la situación del usuario",
  "transmision": "Una acción específica y práctica que el usuario puede hacer HOY para aplicar esta sabiduría (50-80 palabras)",
  "dimension": "El nombre de la dimensión desde donde transmites (ej: 'Nebulosa de Orión', 'Agujero Negro Central', '11D-Supercuerda', etc)",
  "color": "from-purple-500 via-pink-600 to-indigo-700"
}

IMPORTANTE:
- Usa metáforas espaciales reales (planetas, estrellas, física)
- Sé profundo pero práctico
- La transmisión debe ser una acción concreta
- Habla como un ser interdimensional sabio
- NO uses comillas dobles dentro de los textos, usa comillas simples
- Responde SOLO con el JSON, nada más`
            }
          ]
        })
      });

      const data = await response.json();
      
      if (data.content && data.content[0] && data.content[0].text) {
        let textoLimpio = data.content[0].text.trim();
        
        // Limpiar posibles backticks de markdown
        textoLimpio = textoLimpio.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        const leccionIA = JSON.parse(textoLimpio);
        
        const leccionCompleta = {
          ...leccionIA,
          dimension: leccionIA.dimension || '∞D-Oráculo',
          color: leccionIA.color || 'from-purple-500 via-pink-600 to-indigo-700',
          esIA: true
        };
        
        setRespuestaIA(leccionCompleta);
        setPortalActivo(leccionCompleta);
        absorberEnergia();
        setConsultaUsuario('');
        mostrarAlerta('🌌 El Oráculo ha respondido!');
      }
    } catch (error) {
      console.error('Error consultando al Oráculo:', error);
      mostrarAlerta('❌ Error conectando con el Oráculo. Intenta de nuevo.');
    } finally {
      setGenerandoIA(false);
    }
  };

  const generarTransmisionVisual = (formato = 'story') => {
    const canvas = canvasRef.current;
    if (!canvas || !portalActivo) return;

    const ctx = canvas.getContext('2d');
    
    // Tamaños según formato
    const formatos = {
      story: { width: 1080, height: 1920, nombre: 'Instagram Story' },
      post: { width: 1080, height: 1080, nombre: 'Instagram Post' },
      facebook: { width: 1200, height: 630, nombre: 'Facebook' },
      twitter: { width: 1200, height: 675, nombre: 'Twitter/X' },
      linkedin: { width: 1200, height: 627, nombre: 'LinkedIn' },
      youtube: { width: 1280, height: 720, nombre: 'YouTube Thumbnail' }
    };
    
    const config = formatos[formato];
    const width = config.width;
    const height = config.height;
    
    canvas.width = width;
    canvas.height = height;

    // Fondo espacial
    ctx.fillStyle = '#0a0a1f';
    ctx.fillRect(0, 0, width, height);

    // Estrellas (ajustadas según tamaño)
    const numEstrellas = Math.floor((width * height) / 10000);
    ctx.fillStyle = 'white';
    for (let i = 0; i < numEstrellas; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Gradiente según dimensión
    const gradientes = {
      'from-red-500 via-orange-600 to-rose-700': ['#ef4444', '#ea580c', '#e11d48'],
      'from-orange-500 via-red-600 to-amber-700': ['#f97316', '#dc2626', '#b45309'],
      'from-red-600 via-pink-600 to-purple-700': ['#dc2626', '#db2777', '#7e22ce'],
      'from-yellow-400 via-amber-500 to-orange-600': ['#facc15', '#f59e0b', '#ea580c'],
      'from-amber-400 via-yellow-500 to-lime-600': ['#fbbf24', '#eab308', '#65a30d'],
      'from-lime-400 via-green-500 to-emerald-600': ['#a3e635', '#22c55e', '#059669'],
      'from-indigo-500 via-purple-600 to-violet-700': ['#6366f1', '#9333ea', '#7c3aed'],
      'from-purple-500 via-pink-600 to-rose-700': ['#a855f7', '#db2777', '#be123c'],
      'from-violet-500 via-indigo-600 to-blue-700': ['#8b5cf6', '#4f46e5', '#1d4ed8'],
      'from-blue-400 via-cyan-500 to-teal-600': ['#60a5fa', '#06b6d4', '#0d9488'],
      'from-cyan-400 via-blue-500 to-indigo-600': ['#22d3ee', '#3b82f6', '#4f46e5'],
      'from-teal-400 via-cyan-500 to-sky-600': ['#2dd4bf', '#06b6d4', '#0284c7'],
      'from-pink-500 via-purple-600 to-indigo-700': ['#ec4899', '#9333ea', '#4338ca'],
      'from-fuchsia-500 via-violet-600 to-purple-700': ['#d946ef', '#7c3aed', '#7e22ce'],
      'from-purple-600 via-black to-indigo-900': ['#9333ea', '#1a1a2e', '#312e81']
    };

    const colores = gradientes[portalActivo.color] || ['#a855f7', '#db2777', '#be123c'];
    
    // Círculos de portal (ajustados según formato)
    const portalY = formato === 'story' ? height * 0.21 : height * 0.35;
    const portalSize = formato === 'story' ? 200 : Math.min(width, height) * 0.15;
    
    for (let i = 5; i > 0; i--) {
      const gradient = ctx.createRadialGradient(width/2, portalY, 0, width/2, portalY, portalSize * i);
      gradient.addColorStop(0, colores[0] + '40');
      gradient.addColorStop(0.5, colores[1] + '20');
      gradient.addColorStop(1, colores[2] + '10');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(width/2, portalY, portalSize * i, 0, Math.PI * 2);
      ctx.fill();
    }

    // Tamaños de fuente ajustados
    const escala = formato === 'story' ? 1 : 0.7;
    const dimensionFont = Math.floor(48 * escala);
    const tituloFont = Math.floor(64 * escala);
    const textoFont = Math.floor(40 * escala);
    const transmisionTitleFont = Math.floor(46 * escala);
    const transmisionFont = Math.floor(36 * escala);
    const footerFont = Math.floor(32 * escala);

    // Dimensión
    ctx.fillStyle = colores[0];
    ctx.font = `bold ${dimensionFont}px monospace`;
    ctx.textAlign = 'center';
    const dimY = formato === 'story' ? portalY - 120 : portalY - 80;
    ctx.fillText(`◉ ${portalActivo.dimension} ◉`, width/2, dimY);

    // Título
    ctx.fillStyle = 'white';
    ctx.font = `bold ${tituloFont}px Arial`;
    const maxWidthTitulo = width - 160;
    const tituloLineas = wrapText(ctx, portalActivo.titulo, maxWidthTitulo, tituloFont);
    let yPos = formato === 'story' ? portalY + 180 : portalY + 100;
    tituloLineas.forEach(linea => {
      ctx.fillText(linea, width/2, yPos);
      yPos += tituloFont + 16;
    });

    // Línea decorativa
    ctx.strokeStyle = colores[1];
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(width/2 - 120, yPos + 20);
    ctx.lineTo(width/2 + 120, yPos + 20);
    ctx.stroke();

    yPos += 80;

    // Sabiduría
    ctx.fillStyle = '#e0e0ff';
    ctx.font = `${textoFont}px Arial`;
    const maxWidthSabiduria = width - 200;
    const sabiduriaLineas = wrapText(ctx, portalActivo.sabiduria, maxWidthSabiduria, textoFont + 12);
    const maxLineasSabiduria = formato === 'story' ? sabiduriaLineas.length : Math.min(sabiduriaLineas.length, 5);
    
    for (let i = 0; i < maxLineasSabiduria; i++) {
      ctx.fillText(sabiduriaLineas[i], width/2, yPos);
      yPos += textoFont + 16;
    }

    yPos += 60;

    // Transmisión
    const transmisionHeight = formato === 'story' ? 200 : 150;
    ctx.fillStyle = colores[0] + '60';
    ctx.fillRect(80, yPos - 50, width - 160, transmisionHeight);
    
    ctx.fillStyle = 'white';
    ctx.font = `bold ${transmisionTitleFont}px Arial`;
    ctx.fillText('⚡ TRANSMISIÓN ACTIVA ⚡', width/2, yPos);
    
    ctx.font = `${transmisionFont}px Arial`;
    const maxWidthTransmision = width - 240;
    const transmisionLineas = wrapText(ctx, portalActivo.transmision, maxWidthTransmision, transmisionFont + 12);
    yPos += 50;
    const maxLineasTransmision = formato === 'story' ? transmisionLineas.length : Math.min(transmisionLineas.length, 3);
    
    for (let i = 0; i < maxLineasTransmision; i++) {
      ctx.fillText(transmisionLineas[i], width/2, yPos);
      yPos += transmisionFont + 16;
    }

    // Footer cósmico
    ctx.font = `italic ${footerFont}px monospace`;
    ctx.fillStyle = colores[1];
    ctx.fillText('🛸 PORTAL CÓSMICO 🌌', width/2, height - 60);
  };

  const wrapText = (ctx, text, maxWidth, lineHeight) => {
    const palabras = text.split(' ');
    const lineas = [];
    let lineaActual = '';

    palabras.forEach(palabra => {
      const testLinea = lineaActual + palabra + ' ';
      const metrics = ctx.measureText(testLinea);
      
      if (metrics.width > maxWidth && lineaActual !== '') {
        lineas.push(lineaActual.trim());
        lineaActual = palabra + ' ';
      } else {
        lineaActual = testLinea;
      }
    });
    
    if (lineaActual.trim() !== '') {
      lineas.push(lineaActual.trim());
    }
    
    return lineas;
  };

  const teletransportarImagen = (formato = 'story') => {
    if (!portalActivo) return;
    
    try {
      generarTransmisionVisual(formato);
      setTimeout(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
          mostrarAlerta('❌ Error en teletransportación');
          return;
        }

        canvas.toBlob((blob) => {
          if (!blob) {
            mostrarAlerta('❌ Fallo en materialización');
            return;
          }
          
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          const nombreFormato = {
            story: 'Story',
            post: 'Post',
            facebook: 'Facebook',
            twitter: 'Twitter',
            linkedin: 'LinkedIn',
            youtube: 'YouTube'
          }[formato];
          link.download = `portal-cosmico-${nombreFormato}-${Date.now()}.png`;
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          
          mostrarAlerta(`🌌 Transmisión ${nombreFormato} materializada!`);
          setMostrarOpciones(false);
        }, 'image/png');
      }, 200);
    } catch (e) {
      console.error('Error:', e);
      mostrarAlerta('❌ Error en el portal dimensional');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Partículas cósmicas */}
      <div className="absolute inset-0 pointer-events-none">
        {particulas.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white opacity-60"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              boxShadow: `0 0 ${p.size * 2}px rgba(255,255,255,0.8)`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Header Cósmico */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Atom className="w-12 h-12 text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              PORTAL CÓSMICO
            </h1>
            <Zap className="w-12 h-12 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-cyan-200 text-lg">Sabiduría desde las dimensiones más allá de la comprensión humana</p>
          
          {/* Medidor de Energía */}
          <div className="mt-6 inline-flex items-center gap-3 bg-black/40 backdrop-blur-md px-8 py-4 rounded-full border-2 border-purple-500 shadow-lg shadow-purple-500/50">
            <Radio className="w-6 h-6 text-green-400 animate-pulse" />
            <span className="font-bold text-white text-lg">{energiaCosmica} UNIDADES DE ENERGÍA CÓSMICA</span>
            <button
              onClick={() => setMostrarJardin(!mostrarJardin)}
              className="ml-4 text-sm bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full text-white transition-all"
            >
              {mostrarJardin ? '🌌 VER PORTALES' : '📡 VER ARCHIVOS'}
            </button>
          </div>

          {/* Botón del Oráculo */}
          <div className="mt-4">
            <button
              onClick={() => setMostrarOraculo(!mostrarOraculo)}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 
                px-8 py-4 rounded-full font-bold text-white text-lg border-2 border-white/40 
                shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              <Brain className="w-7 h-7 animate-pulse" />
              <span>CONSULTAR ORÁCULO IA</span>
              <Sparkles className="w-6 h-6" />
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full opacity-30 blur-lg group-hover:opacity-50 transition-opacity -z-10" />
            </button>
          </div>
        </div>

        {/* Modal del Oráculo */}
        {mostrarOraculo && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-black max-w-2xl w-full rounded-3xl border-4 border-cyan-400 shadow-2xl shadow-cyan-500/50 p-8 relative">
              <button
                onClick={() => setMostrarOraculo(false)}
                className="absolute top-4 right-4 text-white hover:text-red-400 text-3xl font-bold transition-colors"
              >
                ×
              </button>
              
              <div className="text-center mb-6">
                <Brain className="w-16 h-16 mx-auto mb-4 text-cyan-400 animate-pulse" />
                <h2 className="text-3xl font-bold text-white mb-2">ORÁCULO CÓSMICO IA</h2>
                <p className="text-cyan-200">Consulta al ser interdimensional de sabiduría infinita</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-cyan-300 font-semibold mb-2 text-sm">
                    ¿Qué deseas consultar al Oráculo?
                  </label>
                  <textarea
                    value={consultaUsuario}
                    onChange={(e) => setConsultaUsuario(e.target.value)}
                    placeholder="Ejemplo: Estoy en una encrucijada laboral y no sé qué decisión tomar..."
                    className="w-full bg-black/50 border-2 border-purple-500 rounded-xl p-4 text-white placeholder-gray-400 
                      focus:outline-none focus:border-cyan-400 transition-colors min-h-32 resize-none"
                    disabled={generandoIA}
                  />
                </div>

                <button
                  onClick={consultarOraculo}
                  disabled={generandoIA}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3
                    transition-all duration-300 border-2 ${
                    generandoIA
                      ? 'bg-gray-600 border-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 border-white/40 hover:from-purple-700 hover:to-pink-700 hover:scale-105'
                  }`}
                >
                  {generandoIA ? (
                    <>
                      <Atom className="w-6 h-6 animate-spin" />
                      <span>CONECTANDO CON EL ORÁCULO...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      <span>ENVIAR CONSULTA</span>
                    </>
                  )}
                </button>

                <div className="text-center text-xs text-cyan-300/60 mt-4">
                  El Oráculo generará una lección cósmica personalizada para tu situación
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Archivos Cósmicos */}
        {mostrarJardin ? (
          <div className="bg-black/50 backdrop-blur-xl rounded-3xl border-2 border-cyan-500 shadow-2xl shadow-cyan-500/30 p-8">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-yellow-400" />
              BASE DE DATOS ESTELAR
            </h2>
            {archivosCosmicos.length === 0 ? (
              <div className="text-center py-16">
                <Globe className="w-20 h-20 mx-auto mb-4 text-purple-400 opacity-50" />
                <p className="text-cyan-200 text-lg">
                  No hay transmisiones archivadas. ¡Explora las dimensiones y guarda las que resuenen con tu frecuencia!
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {archivosCosmicos.map((archivo, idx) => (
                  <div
                    key={idx}
                    className={`bg-gradient-to-br ${archivo.color} p-6 rounded-2xl border-2 border-white/20 shadow-xl transform hover:scale-105 transition-all`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-mono text-white/80">◉ {archivo.dimension}</div>
                      {archivo.esIA && (
                        <div className="bg-cyan-400 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Brain className="w-3 h-3" />
                          IA
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-2xl mb-3 text-white">{archivo.titulo}</h3>
                    <p className="text-sm text-white/90 mb-4 leading-relaxed">{archivo.sabiduria}</p>
                    <div className="bg-black/30 rounded-xl p-4 text-sm text-white">
                      <strong>⚡ Transmisión:</strong> {archivo.transmision}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Selección de Dimensión */}
            {!portalActivo ? (
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                {Object.keys(SABIDURIA_COSMICA).map((dimension) => {
                  const IconoCosmic = ICONOS_COSMICOS[dimension];
                  const colores = {
                    marciano: 'from-red-500 to-orange-600',
                    venusiano: 'from-yellow-400 to-orange-500',
                    plutoniano: 'from-purple-500 to-pink-600',
                    neptuniano: 'from-blue-400 to-cyan-500',
                    interdimensional: 'from-pink-500 to-purple-600'
                  };
                  
                  return (
                    <button
                      key={dimension}
                      onClick={() => abrirPortal(dimension)}
                      className={`relative group p-6 rounded-2xl bg-gradient-to-br ${colores[dimension]} 
                        transform transition-all duration-300 hover:scale-110 hover:shadow-2xl
                        border-2 border-white/30 ${
                        dimensionSeleccionada === dimension && transmitiendo
                          ? 'scale-95 opacity-50 animate-pulse'
                          : 'shadow-lg'
                      }`}
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <IconoCosmic className="w-16 h-16 mx-auto mb-4 text-white relative z-10" />
                      <h3 className="font-bold text-white text-lg capitalize relative z-10">{dimension}</h3>
                      <p className="text-xs text-white/80 mt-2 relative z-10">
                        {SABIDURIA_COSMICA[dimension].length} transmisiones
                      </p>
                      <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Portal Activado */
              <div className="max-w-4xl mx-auto">
                <div
                  className={`relative bg-gradient-to-br ${portalActivo.color} rounded-3xl border-4 border-white/40 
                    shadow-2xl p-10 md:p-14 text-white transform transition-all duration-700 ${
                    transmitiendo ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
                  }`}
                  style={{
                    boxShadow: '0 0 60px rgba(168, 85, 247, 0.6), inset 0 0 100px rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Indicador dimensional */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md px-6 py-2 rounded-full border-2 border-cyan-400 flex items-center gap-2">
                    <span className="text-cyan-400 font-mono font-bold text-sm">◉ {portalActivo.dimension}</span>
                    {portalActivo.esIA && (
                      <div className="bg-cyan-400 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Brain className="w-3 h-3" />
                        IA
                      </div>
                    )}
                  </div>

                  <div className="text-center mb-8">
                    {React.createElement(ICONOS_COSMICOS[portalActivo.dimension], {
                      className: "w-20 h-20 mx-auto mb-4 drop-shadow-lg animate-pulse"
                    })}
                    <h2 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">{portalActivo.titulo}</h2>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-24 h-1 bg-white/60 rounded-full"></div>
                      <Star className="w-5 h-5" />
                      <div className="w-24 h-1 bg-white/60 rounded-full"></div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
                      <p className="text-xl md:text-2xl leading-relaxed font-light">{portalActivo.sabiduria}</p>
                    </div>

                    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border-2 border-yellow-400/50">
                      <h3 className="font-bold text-2xl mb-4 flex items-center gap-3">
                        <Zap className="w-7 h-7 text-yellow-400 animate-pulse" />
                        TRANSMISIÓN ACTIVA
                      </h3>
                      <p className="text-lg md:text-xl leading-relaxed">{portalActivo.transmision}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-10">
                    <button
                      onClick={archivarTransmision}
                      className="flex-1 min-w-[180px] bg-black/40 hover:bg-black/60 backdrop-blur-sm py-5 px-6 rounded-xl font-bold text-lg
                        transition-all duration-300 flex items-center justify-center gap-3 border-2 border-white/30 hover:border-white/60"
                    >
                      <Sparkles className="w-6 h-6" />
                      ARCHIVAR
                    </button>
                    <button
                      onClick={() => setMostrarOpciones(!mostrarOpciones)}
                      className="flex-1 min-w-[180px] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700
                        py-5 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3
                        border-2 border-white/40 shadow-lg hover:shadow-2xl"
                    >
                      <Rocket className="w-6 h-6" />
                      TELETRANSPORTAR
                    </button>
                    <button
                      onClick={cerrarPortal}
                      className="flex-1 min-w-[180px] bg-white text-purple-900 hover:bg-gray-100 py-5 px-6 rounded-xl font-bold text-lg
                        transition-all duration-300 border-2 border-white shadow-lg"
                    >
                      NUEVO PORTAL
                    </button>
                  </div>

                  {/* Opciones de Formato */}
                  {mostrarOpciones && (
                    <div className="mt-6 bg-black/50 backdrop-blur-md rounded-2xl p-6 border-2 border-cyan-400/50">
                      <h3 className="text-white font-bold text-xl mb-4 text-center">Selecciona el formato para redes sociales</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <button
                          onClick={() => teletransportarImagen('story')}
                          className="bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 
                            py-4 px-4 rounded-xl font-semibold transition-all hover:scale-105 border-2 border-white/30"
                        >
                          <div className="text-white text-sm">📱 Instagram Story</div>
                          <div className="text-white/70 text-xs mt-1">1080×1920</div>
                        </button>
                        <button
                          onClick={() => teletransportarImagen('post')}
                          className="bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 
                            py-4 px-4 rounded-xl font-semibold transition-all hover:scale-105 border-2 border-white/30"
                        >
                          <div className="text-white text-sm">📸 Instagram Post</div>
                          <div className="text-white/70 text-xs mt-1">1080×1080</div>
                        </button>
                        <button
                          onClick={() => teletransportarImagen('facebook')}
                          className="bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 
                            py-4 px-4 rounded-xl font-semibold transition-all hover:scale-105 border-2 border-white/30"
                        >
                          <div className="text-white text-sm">👥 Facebook</div>
                          <div className="text-white/70 text-xs mt-1">1200×630</div>
                        </button>
                        <button
                          onClick={() => teletransportarImagen('twitter')}
                          className="bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 
                            py-4 px-4 rounded-xl font-semibold transition-all hover:scale-105 border-2 border-white/30"
                        >
                          <div className="text-white text-sm">🐦 Twitter/X</div>
                          <div className="text-white/70 text-xs mt-1">1200×675</div>
                        </button>
                        <button
                          onClick={() => teletransportarImagen('linkedin')}
                          className="bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 
                            py-4 px-4 rounded-xl font-semibold transition-all hover:scale-105 border-2 border-white/30"
                        >
                          <div className="text-white text-sm">💼 LinkedIn</div>
                          <div className="text-white/70 text-xs mt-1">1200×627</div>
                        </button>
                        <button
                          onClick={() => teletransportarImagen('youtube')}
                          className="bg-gradient-to-br from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 
                            py-4 px-4 rounded-xl font-semibold transition-all hover:scale-105 border-2 border-white/30"
                        >
                          <div className="text-white text-sm">▶️ YouTube</div>
                          <div className="text-white/70 text-xs mt-1">1280×720</div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Efecto de energía */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-20 blur-xl -z-10 animate-pulse" />
                </div>
              </div>
            )}
          </>
        )}

        {/* Footer Cósmico */}
        <div className="text-center mt-16 text-cyan-200">
          <p className="text-lg font-mono italic animate-pulse">
            "La sabiduría del universo no tiene fronteras dimensionales 🌌✨"
          </p>
        </div>

        {/* Canvas oculto para generar transmisiones visuales */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}