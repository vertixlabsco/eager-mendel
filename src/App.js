import React, { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  Search,
  Menu,
  X,
  ShoppingCart,
  Microscope,
  FlaskConical,
  FileText,
  Info,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  Lock,
  Eye,
  Thermometer,
  Truck,
  Activity,
  Calculator,
  Syringe,
  Scale,
} from "lucide-react";

// --- DATASET MAESTRO: CATÁLOGO CIENTÍFICO COMPLETO (62 Ítems) ---
// Fuente: Chloe's Wholesale List. Nomenclatura técnica estricta.

const PRODUCTS = [
  // --- Regulación Metabólica Mitocondrial (13 Ítems) ---
  {
    id: "RT",
    code: "RT",
    name: "Retatrutide",
    category: "Regulación Metabólica Mitocondrial",
    description:
      "Agonista triple del receptor hormonal (GLP-1/GIP/GCGR) para investigación de homeostasis energética.",
  },
  {
    id: "TR",
    code: "TR",
    name: "Tirzepatide",
    category: "Regulación Metabólica Mitocondrial",
    description:
      "Polipéptido insulinotrópico dependiente de glucosa (GIP) y agonista del receptor GLP-1.",
  },
  {
    id: "SM",
    code: "SM",
    name: "Semaglutide",
    category: "Regulación Metabólica Mitocondrial",
    description:
      "Análogo del péptido-1 similar al glucagón humano para estudios de resistencia a la insulina.",
  },
  {
    id: "CGL",
    code: "CGL",
    name: "Cagrilintide",
    category: "Regulación Metabólica Mitocondrial",
    description:
      "Análogo de amilina de acción prolongada para investigación de saciedad y vaciado gástrico.",
  },
  {
    id: "CS",
    code: "CS",
    name: "Cagri + Sema",
    category: "Regulación Metabólica Mitocondrial",
    description:
      "Co-formulación de investigación dual (Amilina/GLP-1) para sinergia metabólica.",
  },
  {
    id: "SUR",
    code: "SUR",
    name: "Survodutide",
    category: "Regulación Metabólica Mitocondrial",
    description:
      "Agonista dual del receptor de glucagón/GLP-1 implicado en la lipólisis hepática.",
  },
  {
    id: "MDT",
    code: "MDT",
    name: "Mazdutide",
    category: "Regulación Metabólica Mitocondrial",
    description:
      "Análogo de oxintomodulina (OXM) para la modulación del metabolismo de lípidos.",
  },
  {
    id: "AD",
    code: "AD",
    name: "AOD-9604",
    category: "Regulación Metabólica Mitocondrial",
    description:
      "Fragmento C-terminal (Tyr-hGH177-191) con capacidad de oxidación lipídica sin efectos glucémicos.",
  },
  {
    id: "AP",
    code: "AP",
    name: "Adipotide",
    category: "Regulación Metabólica Mitocondrial",
    description:
      "Peptidomimético experimental pro-apoptótico dirigido a la vasculatura del tejido adiposo blanco.",
  },
  {
    id: "AM",
    code: "AM",
    name: "5-Amino-1MQ",
    category: "Regulación Metabólica Mitocondrial",
    description:
      "Inhibidor de la enzima NNMT para optimización del flujo metabólico en adipocitos.",
  },
  {
    id: "LC",
    code: "LC",
    name: "Lipo-C (MIC)",
    category: "Regulación Metabólica Mitocondrial",
    description:
      "Compuesto de Metionina, Inositol y Colina para soporte de transporte lipídico hepático.",
  },
  {
    id: "L-CAR",
    code: "LC-CAR",
    name: "L-Carnitine",
    category: "Regulación Metabólica Mitocondrial",
    description:
      "Transportador de ácidos grasos de cadena larga a la matriz mitocondrial para beta-oxidación.",
  },
  {
    id: "AR",
    code: "AR",
    name: "AICAR",
    category: "Regulación Metabólica Mitocondrial",
    description:
      "Agonista selectivo de la proteína quinasa activada por AMP (AMPK) para estudios metabólicos.",
  },

  // --- Bioregulación Celular y Señalización (6 Ítems) ---
  {
    id: "ET",
    code: "ET",
    name: "Epitalon",
    category: "Bioregulación Celular",
    description:
      "Tetrapéptido sintético inductor de telomerasa y regulador de la producción pineal de melatonina.",
  },
  {
    id: "MS",
    code: "MS",
    name: "MOTS-c",
    category: "Bioregulación Celular",
    description:
      "Péptido derivado de marco abierto mitocondrial (ORF) regulador de la resistencia metabólica sistémica.",
  },
  {
    id: "NJ",
    code: "NJ",
    name: "NAD+",
    category: "Cofactores Metabólicos",
    description:
      "Dinucleótido de nicotinamida y adenina oxidado. Coenzima crítica para la función de sirtuinas.",
  },
  {
    id: "GLU",
    code: "GLU",
    name: "Glutathione (Red)",
    category: "Bioregulación Celular",
    description:
      "Tripéptido (GSH) esencial para el equilibrio redox celular y neutralización de ROS.",
  },
  {
    id: "F4",
    code: "F4",
    name: "FOXO4-DRI",
    category: "Bioregulación Celular",
    description:
      "Péptido interferente D-Retro-Inverso dirigido a células senescentes (Senolítico experimental).",
  },
  {
    id: "SS",
    code: "SS",
    name: "SS-31",
    category: "Bioregulación Celular",
    description:
      "Péptido Szeto-Schiller dirigido a la membrana mitocondrial interna para optimización de la cadena de electrones.",
  },

  // --- Reparación Tisular y Angiogénesis (11 Ítems) ---
  {
    id: "BC",
    code: "BC",
    name: "BPC-157",
    category: "Reparación Tisular",
    description:
      "Pentadecapéptido gástrico estable implicado en la regulación del factor de crecimiento endotelial vascular (VEGF).",
  },
  {
    id: "BB",
    code: "BB",
    name: "Blend BPC+TB",
    category: "Reparación Tisular",
    description:
      "Matriz combinada de señalización angiogénica y movilidad de actina celular.",
  },
  {
    id: "TB",
    code: "TB",
    name: "TB-500",
    category: "Reparación Tisular",
    description:
      "Fracción sintética de Timosina Beta-4 (LKKTETQ) reguladora de la polimerización de actina.",
  },
  {
    id: "CU",
    code: "CU",
    name: "GHK-Cu",
    category: "Reparación Tisular",
    description:
      "Complejo tripéptido de glicil-L-histidil-L-lisina-cobre modulador de la remodelación de la matriz extracelular.",
  },
  {
    id: "BBG",
    code: "BBG",
    name: "Glow Blend",
    category: "Reparación Tisular",
    description:
      "Complejo tri-péptido (TB+BPC+GHK) para investigación de regeneración dérmica y celular.",
  },
  {
    id: "KLOW",
    code: "KLOW",
    name: "Klow Blend",
    category: "Reparación Tisular",
    description:
      "Matriz multi-péptido avanzada (TB+BPC+GHK+KPV) para investigación de rejuvenecimiento celular.",
  },
  {
    id: "KP",
    code: "KP",
    name: "KPV",
    category: "Reparación Tisular",
    description:
      "Tripéptido C-terminal de a-MSH con propiedades de modulación de citocinas inflamatorias.",
  },
  {
    id: "AA",
    code: "AA",
    name: "ARA-290",
    category: "Reparación Tisular",
    description:
      "Agonista del receptor de reparación innata (IRR) derivado de la eritropoyetina.",
  },
  {
    id: "LL",
    code: "LL",
    name: "LL-37",
    category: "Inmunomodulación",
    description:
      "Catelicidina humana antimicrobiana implicada en la quimiotaxis y reepitelización.",
  },
  {
    id: "TA",
    code: "TA",
    name: "Thymosin Alpha-1",
    category: "Inmunomodulación",
    description:
      "Modulador de la respuesta inmune adaptativa y maduración de células T.",
  },
  {
    id: "TY",
    code: "TY",
    name: "Thymalin",
    category: "Inmunomodulación",
    description:
      "Polipéptido tímico biorregulador para estandarización inmunológica.",
  },

  // --- Ejes Endocrinos y Factores de Crecimiento (18 Ítems) ---
  {
    id: "CND",
    code: "CND",
    name: "CJC-1295 No DAC",
    category: "Ejes Endocrinos",
    description:
      "Tetrasustituido GRF (1-29) modificado para vida media corta (Pulsátil).",
  },
  {
    id: "CWD",
    code: "CWD",
    name: "CJC-1295 DAC",
    category: "Ejes Endocrinos",
    description:
      "Complejo de afinidad farmacológica (Drug Affinity Complex) para liberación sostenida de GHRH.",
  },
  {
    id: "CP",
    code: "CP",
    name: "CJC + Ipamorelin",
    category: "Ejes Endocrinos",
    description:
      "Combinación sinérgica de GHRH y GHRP selectivo para investigación de pulsos GH.",
  },
  {
    id: "IP",
    code: "IP",
    name: "Ipamorelin",
    category: "Ejes Endocrinos",
    description:
      "Pentapéptido secretagogo selectivo de GH sin impacto significativo en cortisol o prolactina.",
  },
  {
    id: "IG",
    code: "IG",
    name: "IGF-1 LR3",
    category: "Factores de Crecimiento",
    description:
      "Factor de crecimiento insulínico tipo 1 análogo Long R3 resistente a proteínas de unión.",
  },
  {
    id: "TSM",
    code: "TSM",
    name: "Tesamorelin",
    category: "Ejes Endocrinos",
    description:
      "Análogo estabilizado del factor liberador de hormona de crecimiento humana (GHRH).",
  },
  {
    id: "HMG",
    code: "HMG",
    name: "HMG",
    category: "Ejes Endocrinos",
    description:
      "Gonadotropina menopáusica humana purificada para investigación de gametogénesis.",
  },
  {
    id: "HC",
    code: "HC",
    name: "HCG",
    category: "Ejes Endocrinos",
    description:
      "Gonadotropina coriónica humana para señalización de células de Leydig.",
  },
  {
    id: "FM",
    code: "FM",
    name: "MGF",
    category: "Factores de Crecimiento",
    description:
      "Factor de crecimiento mecánico derivado del empalme de IGF-1.",
  },
  {
    id: "FMP",
    code: "FMP",
    name: "PEG-MGF",
    category: "Factores de Crecimiento",
    description: "MGF Pegilado para mayor estabilidad en medios de cultivo.",
  },
  {
    id: "HX",
    code: "HX",
    name: "Hexarelin",
    category: "Ejes Endocrinos",
    description:
      "Hexapéptido secretagogo potente de GH para investigación de receptores de grelina.",
  },
  {
    id: "KS",
    code: "KS",
    name: "Kisspeptin-10",
    category: "Ejes Endocrinos",
    description: "Ligando del receptor acoplado a proteína G para el eje HPG.",
  },
  {
    id: "G2",
    code: "G2",
    name: "GHRP-2",
    category: "Ejes Endocrinos",
    description: "Péptido liberador de hormona de crecimiento 2 (Pralmorelin).",
  },
  {
    id: "G6",
    code: "G6",
    name: "GHRP-6",
    category: "Ejes Endocrinos",
    description:
      "Hexapéptido liberador de hormona de crecimiento de primera generación.",
  },
  {
    id: "SML",
    code: "SML",
    name: "Sermorelin",
    category: "Ejes Endocrinos",
    description:
      "Análogo sintético del factor liberador de hormona de crecimiento (GHRH 1-29).",
  },
  {
    id: "GND",
    code: "GND",
    name: "Gonadorelin",
    category: "Ejes Endocrinos",
    description: "Hormona liberadora de gonadotropina (GnRH) sintética.",
  },
  {
    id: "OT",
    code: "OT",
    name: "Oxytocin",
    category: "Ejes Endocrinos",
    description:
      "Neuropéptido y hormona nonapéptida implicada en señalización social y muscular.",
  },
  {
    id: "H",
    code: "H",
    name: "HGH",
    category: "Factores de Crecimiento",
    description:
      "Somatropina de origen recombinante para cultivos celulares e investigación.",
  },

  // --- Neuromodulación Peptídica (6 Ítems) ---
  {
    id: "SX",
    code: "SX",
    name: "Semax",
    category: "Neuromodulación",
    description:
      "Fragmento de ACTH(4-10) heptapéptido con actividad neurotrófica y nootrópica.",
  },
  {
    id: "SK",
    code: "SK",
    name: "Selank",
    category: "Neuromodulación",
    description:
      "Análogo sintético de la tuftsina con propiedades ansiolíticas y de modulación GABAérgica.",
  },
  {
    id: "DS",
    code: "DS",
    name: "DSIP",
    category: "Neuromodulación",
    description:
      "Péptido inductor del sueño delta implicado en la regulación de ritmos circadianos y estrés.",
  },
  {
    id: "CBL",
    code: "CBL",
    name: "Cerebrolysin",
    category: "Neuromodulación",
    description:
      "Mezcla de neuropéptidos purificados con actividad neurotrófica similar al NGF/BDNF.",
  },
  {
    id: "MTN",
    code: "MTN",
    name: "Melatonin",
    category: "Neuromodulación",
    description:
      "N-acetil-5-metoxitriptamina hidrosoluble para investigación de ritmos biológicos.",
  },
  {
    id: "VP",
    code: "VP",
    name: "VIP",
    category: "Neuromodulación",
    description:
      "Péptido intestinal vasoactivo regulador de la comunicación neuroinmune.",
  },
  {
    id: "DR",
    code: "DR",
    name: "Dermorphin",
    category: "Neuromodulación",
    description:
      "Opioide natural heptapéptido de alta afinidad por receptores Mu.",
  },

  // --- Modulación Receptores Melanocortina (3 Ítems) ---
  {
    id: "PT",
    code: "PT",
    name: "PT-141",
    category: "Receptores Melanocortina",
    description:
      "Agonista no selectivo de receptores de melanocortina (MC3/MC4) Bremelanotide.",
  },
  {
    id: "MT1",
    code: "MT1",
    name: "Melanotan I",
    category: "Receptores Melanocortina",
    description:
      "Análogo lineal de alpha-MSH para investigación de fotoprotección y melanogénesis.",
  },
  {
    id: "MT2",
    code: "MT2",
    name: "Melanotan II",
    category: "Receptores Melanocortina",
    description:
      "Análogo cíclico de alpha-MSH con alta afinidad por receptores MC1, MC3, MC4 y MC5.",
  },

  // --- Solventes y Reactivos (5 Ítems) ---
  {
    id: "BAC",
    code: "BAC",
    name: "H2O Bacteriostática",
    category: "Solventes y Reactivos",
    description:
      "Agua grado USP estéril con 0.9% de alcohol bencílico como conservante.",
  },
  {
    id: "LB",
    code: "LB",
    name: "Lemon Bottle",
    category: "Solventes y Reactivos",
    description:
      "Solución compuesta para investigación de mecanismos lipolíticos.",
  },
  {
    id: "AC",
    code: "AC",
    name: "Ácido Acético",
    category: "Solventes y Reactivos",
    description:
      "Solución diluida para la reconstitución de péptidos básicos con baja solubilidad.",
  },
  {
    id: "NP",
    code: "NP",
    name: "Snap-8",
    category: "Solventes y Reactivos",
    description: "Octapéptido de elongación análogo a la toxina botulínica.",
  },
  {
    id: "SS31",
    code: "SS",
    name: "SS-31",
    category: "Solventes y Reactivos",
    description: "Péptido antioxidante dirigido a mitocondrias (Elamipretide).",
  },
];

const CATEGORIES = [
  "Regulación Metabólica Mitocondrial",
  "Bioregulación Celular",
  "Reparación Tisular",
  "Inmunomodulación",
  "Ejes Endocrinos",
  "Factores de Crecimiento",
  "Neuromodulación",
  "Receptores Melanocortina",
  "Solventes y Reactivos",
  "Cofactores Metabólicos",
];

// --- APP COMPONENT ---

export default function App() {
  const [legalAccepted, setLegalAccepted] = useState(false);
  const [view, setView] = useState("landing");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // --- LÓGICA DE PERSISTENCIA LEGAL ---
  useEffect(() => {
    // Verificamos si ya aceptó en esta sesión o hace poco (sessionStorage para seguridad estricta en labs)
    const consent = sessionStorage.getItem("vertix_consent_v3");
    if (consent) setLegalAccepted(true);
  }, []);

  const handleAcceptLegal = () => {
    sessionStorage.setItem("vertix_consent_v3", "true");
    setLegalAccepted(true);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleWhatsAppCheckout = () => {
    const phoneNumber = "573009038226";

    // Agrupar items
    const summary = cart.reduce((acc, item) => {
      acc[item.code] = (acc[item.code] || 0) + 1;
      return acc;
    }, {});

    let itemsText = "";
    Object.keys(summary).forEach((key) => {
      itemsText += `- ${summary[key]}x ${key}\n`;
    });

    const safeTemplate = `Hola.
He leído y acepto los términos y condiciones del sitio.
Confirmo que estoy acreditado(a) y capacitado(a) para el uso de estas sustancias.
Las sustancias de interés son las siguientes:
${itemsText}`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(safeTemplate)}`,
      "_blank"
    );
  };

  // --- MODAL LEGAL (7 PUNTOS - ESTRICTO) ---
  const LegalModal = () => {
    if (legalAccepted) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-500">
        <div className="bg-white w-full max-w-2xl rounded-sm shadow-2xl border-t-4 border-[#C5A059] max-h-[90vh] overflow-y-auto">
          <div className="p-8 md:p-10">
            <div className="flex flex-col items-center mb-8 border-b border-gray-100 pb-6">
              <ShieldCheck className="w-16 h-16 text-[#C5A059] mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 text-center uppercase tracking-widest">
                Protocolo de Acceso Controlado
              </h2>
              <p className="text-gray-400 text-[10px] mt-2 font-mono text-center uppercase tracking-[0.2em]">
                Vertix Labs Research Division
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                {
                  t: "NATURALEZA DEL PRODUCTO",
                  d: "Los compuestos listados son Reactivos de Investigación Química. NO son medicamentos, suplementos ni cosméticos.",
                },
                {
                  t: "RESTRICCIÓN DE USO",
                  d: "Estrictamente prohibido su uso en humanos o animales. Solo para análisis de laboratorio In-Vitro.",
                },
                {
                  t: "CUALIFICACIÓN",
                  d: "El acceso está limitado a profesionales con conocimientos en manejo de sustancias bioactivas.",
                },
                {
                  t: "NORMATIVA INVIMA/FDA",
                  d: "Productos no sujetos a registro sanitario para consumo. Venta bajo estatuto de reactivo químico.",
                },
                {
                  t: "EXENCIÓN DE RESPONSABILIDAD",
                  d: "Vertix Labs no se hace responsable por daños derivados de la mala manipulación o uso indebido.",
                },
                {
                  t: "GESTIÓN DE RESIDUOS",
                  d: "El comprador se compromete a desechar los viales según normativas de riesgo biológico/químico local.",
                },
                {
                  t: "MAYORÍA DE EDAD",
                  d: "Declaro ser mayor de 18 años y tener capacidad legal para adquirir estos insumos.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-3 bg-gray-50 border-l-2 border-gray-200 hover:border-[#C5A059] transition-colors"
                >
                  <span className="text-[#C5A059] font-bold font-mono text-xs">
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-wider mb-1">
                      {item.t}
                    </h4>
                    <p className="text-[11px] text-gray-500 leading-snug">
                      {item.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleAcceptLegal}
                className="w-full py-4 bg-[#C5A059] hover:bg-[#b08d45] text-white font-bold uppercase text-xs tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Certifico conformidad y Accedo
              </button>
              <button
                onClick={() => (window.location.href = "https://google.com")}
                className="w-full py-3 text-gray-400 hover:text-gray-600 uppercase text-xs tracking-widest transition-colors"
              >
                No acepto (Salir del sitio)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- NAVEGACIÓN ---
  const Navigation = () => (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100 h-20">
      <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
        <div
          className="flex flex-col cursor-pointer group"
          onClick={() => setView("landing")}
        >
          <div className="flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-[#C5A059] group-hover:rotate-12 transition-transform" />
            <span className="text-2xl font-bold tracking-[0.2em] text-gray-900">
              VERTIX
            </span>
          </div>
          <span className="text-[9px] tracking-[0.4em] text-gray-400 pl-8 uppercase group-hover:text-[#C5A059] transition-colors">
            Research
          </span>
        </div>

        <div className="hidden lg:flex space-x-8 items-center">
          {[
            { id: "catalog", label: "Catálogo" },
            { id: "bio", label: "Bioseguridad" },
            { id: "maintenance", label: "Mantenimiento" }, // Antes calc
            { id: "legal", label: "Legal" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`uppercase text-[10px] tracking-[0.2em] font-bold transition-colors ${
                view === item.id
                  ? "text-[#C5A059]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-600 hover:text-[#C5A059] transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-[#C5A059] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-mono">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300 shadow-xl">
          {[
            { id: "catalog", label: "Catálogo" },
            { id: "bio", label: "Bioseguridad" },
            { id: "maintenance", label: "Mantenimiento & Calculadora" },
            { id: "legal", label: "Marco Legal" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id);
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-xs font-bold uppercase tracking-widest text-gray-600 border-b border-gray-50 pb-3"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              setIsCartOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="text-left text-xs font-bold uppercase tracking-widest text-[#C5A059] pt-2"
          >
            Ver Solicitud ({cart.length})
          </button>
        </div>
      )}
    </nav>
  );

  // --- COMPONENTES DE VISTA ---

  const Hero = () => (
    <div className="relative w-full h-[85vh] bg-gray-50 overflow-hidden flex items-center justify-center">
      {/* Abstract Scientific Background */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-400 via-white to-white"></div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(#C5A059 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.1,
        }}
      ></div>

      <div className="relative z-10 text-center max-w-4xl px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="w-24 h-1 bg-[#C5A059] mx-auto mb-8 shadow-lg shadow-[#C5A059]/20"></div>
        <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 leading-tight tracking-tight">
          Pureza Molecular <br />
          <span className="font-bold">Grado Investigación</span>
        </h1>
        <p className="text-sm md:text-lg text-gray-500 mb-12 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
          Suministro especializado de reactivos peptídicos para instituciones
          científicas. Garantía de trazabilidad y cadena de frío certificada.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setView("catalog")}
            className="bg-[#C5A059] text-white px-10 py-4 uppercase text-[11px] font-bold tracking-[0.2em] hover:bg-[#b08d45] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            Catálogo Científico
            <Microscope className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView("maintenance")}
            className="bg-white text-gray-900 border border-gray-200 px-10 py-4 uppercase text-[11px] font-bold tracking-[0.2em] hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            Herramientas Técnicas
            <Calculator className="w-4 h-4" />
          </button>
        </div>
        <p className="mt-16 text-[10px] uppercase tracking-[0.3em] text-red-400 font-bold flex items-center justify-center gap-2">
          <Lock className="w-3 h-3" /> Acceso Restringido a Profesionales
        </p>
      </div>
    </div>
  );

  const ProductCard = ({ product }) => (
    <div className="group bg-white border border-gray-100 hover:border-[#C5A059] transition-all duration-300 h-[400px] flex flex-col p-8 relative shadow-sm hover:shadow-2xl w-full snap-center shrink-0">
      <div className="absolute top-0 right-0 bg-gray-50 px-4 py-2 border-bl border-l border-b border-gray-100">
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
          <Activity className="w-3 h-3" /> Research Only
        </span>
      </div>

      <div className="mt-6 mb-4">
        <h3 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">
          {product.code}
        </h3>
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#C5A059]">
          {product.name}
        </p>
      </div>

      <div className="h-[1px] w-12 bg-gray-200 mb-6 group-hover:w-24 group-hover:bg-[#C5A059] transition-all duration-500"></div>

      <p className="text-gray-500 text-[11px] leading-relaxed mb-6 line-clamp-4 font-mono">
        {product.description}
      </p>

      <div className="mt-auto flex gap-3 pt-6 border-t border-gray-50">
        <button
          onClick={() => setSelectedProduct(product)}
          className="flex-1 py-3 border border-gray-200 text-gray-600 text-[10px] uppercase font-bold tracking-widest hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <Eye className="w-3 h-3" /> Ficha Técnica
        </button>
        <button
          onClick={() => addToCart(product)}
          className="w-12 h-12 bg-gray-900 text-white flex items-center justify-center hover:bg-[#C5A059] transition-colors shadow-lg"
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const CatalogView = () => {
    // Filtrado de productos basado en búsqueda
    const filteredProducts = PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activeCategories = CATEGORIES.filter((cat) =>
      filteredProducts.some((p) => p.category === cat)
    );

    const CategoryRow = ({ title, products }) => {
      const scrollRef = useRef(null);
      const scroll = (direction) => {
        if (scrollRef.current) {
          const amount = direction === "left" ? -350 : 350;
          scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
        }
      };

      if (products.length === 0) return null;

      return (
        <div className="mb-24 border-b border-gray-50 pb-12 last:border-0 relative">
          <div className="flex justify-between items-end mb-10 px-4 md:px-0">
            <div>
              <h3 className="text-xl font-bold text-gray-900 uppercase tracking-[0.15em] border-l-4 border-[#C5A059] pl-6">
                {title}
              </h3>
              <p className="text-[10px] text-gray-400 mt-2 pl-7 font-mono uppercase tracking-widest">
                {products.length} Referencias Activas
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:border-[#C5A059] text-gray-400 hover:text-[#C5A059] rounded-full transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:border-[#C5A059] text-gray-400 hover:text-[#C5A059] rounded-full transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 px-4 md:px-0 scrollbar-hide gap-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="shrink-0 snap-center w-full md:w-[350px]"
              >
                <ProductCard product={product} />
              </div>
            ))}
            <div className="shrink-0 w-8"></div>
          </div>
        </div>
      );
    };

    return (
      <div className="py-24 bg-white min-h-screen">
        {/* Banner Científico */}
        <div className="w-full h-64 bg-gray-100 mb-20 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale mix-blend-multiply"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-light text-gray-900 tracking-tight">
              Catálogo de Investigación
            </h2>
            <div className="w-16 h-1 bg-[#C5A059] mx-auto mt-4"></div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-0 md:px-8">
          {/* Buscador Restaurado */}
          <div className="mb-20 px-4 md:px-0 max-w-2xl mx-auto text-center">
            <div className="relative group">
              <input
                type="text"
                placeholder="Buscar por Nomenclatura o Nombre Técnico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-6 pl-14 bg-gray-50 border-2 border-gray-100 rounded-full text-gray-900 focus:border-[#C5A059] focus:bg-white outline-none transition-all font-mono text-sm shadow-sm group-hover:shadow-md"
              />
              <Search className="absolute left-6 top-6 w-5 h-5 text-gray-400 group-hover:text-[#C5A059] transition-colors" />
            </div>
            <p className="text-gray-400 text-[10px] mt-4 uppercase tracking-widest">
              Mostrando {filteredProducts.length} de {PRODUCTS.length}{" "}
              compuestos
            </p>
          </div>

          {activeCategories.length > 0 ? (
            activeCategories.map((category) => (
              <CategoryRow
                key={category}
                title={category}
                products={filteredProducts.filter(
                  (p) => p.category === category
                )}
              />
            ))
          ) : (
            <div className="text-center py-20">
              <FlaskConical className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500">
                No se encontraron compuestos que coincidan con su búsqueda.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const CalculatorMaintenanceView = () => {
    // Calculadora integrada
    const [mg, setMg] = useState("");
    const [ml, setMl] = useState("");
    const [dose, setDose] = useState("");
    const [res, setRes] = useState(null);

    const calculate = () => {
      const mgV = parseFloat(mg); // Cantidad en el vial (mg)
      const mlV = parseFloat(ml); // Agua añadida (ml)
      const doseV = parseFloat(dose); // Dosis deseada (mcg)

      if (mgV && mlV && doseV) {
        const concentrationMcgMl = (mgV * 1000) / mlV;
        const volumeMl = doseV / concentrationMcgMl;
        const units = volumeMl * 100;
        const totalDoses = (mgV * 1000) / doseV;
        setRes({
          conc: concentrationMcgMl,
          units,
          total: totalDoses,
          volumeMl,
        });
      }
    };

    return (
      <div className="py-20 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-light text-gray-900 mb-12 border-l-4 border-[#C5A059] pl-6 uppercase tracking-widest">
            Mantenimiento & Precisión
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* COLUMNA 1: CALCULADORA */}
            <div className="bg-white p-8 md:p-12 shadow-xl border-t-4 border-gray-900">
              <div className="flex items-center gap-4 mb-8">
                <Calculator className="w-8 h-8 text-[#C5A059]" />
                <h2 className="text-xl font-bold uppercase tracking-widest">
                  Calculadora de Reconstitución
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 mb-8">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Cantidad de Péptido (mg)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={mg}
                      onChange={(e) => setMg(e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-gray-200 text-gray-900 font-mono focus:border-[#C5A059] outline-none"
                      placeholder="Ej: 5"
                    />
                    <Scale className="absolute right-4 top-4 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Solvente Añadido (ml)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={ml}
                      onChange={(e) => setMl(e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-gray-200 text-gray-900 font-mono focus:border-[#C5A059] outline-none"
                      placeholder="Ej: 2"
                    />
                    <FlaskConical className="absolute right-4 top-4 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Dosis de Investigación (mcg)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={dose}
                      onChange={(e) => setDose(e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-gray-200 text-gray-900 font-mono focus:border-[#C5A059] outline-none"
                      placeholder="Ej: 250"
                    />
                    <Microscope className="absolute right-4 top-4 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <button
                onClick={calculate}
                className="w-full py-4 bg-gray-900 text-white font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#C5A059] transition-all mb-8"
              >
                Calcular Precisión
              </button>

              {res && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-white shadow-sm border border-gray-100">
                      <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">
                        Unidades Jeringa
                      </p>
                      <p className="text-3xl font-bold text-[#C5A059]">
                        {res.units.toFixed(1)}{" "}
                        <span className="text-xs text-gray-300">UI</span>
                      </p>
                    </div>
                    <div className="p-4 bg-white shadow-sm border border-gray-100">
                      <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">
                        Volumen
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {res.volumeMl.toFixed(2)}{" "}
                        <span className="text-xs text-gray-300">mL</span>
                      </p>
                    </div>
                  </div>

                  {/* Visualizador de Jeringa */}
                  <div className="bg-gray-50 p-6 border border-gray-200 rounded-sm">
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-4 text-center">
                      Visualización de Carga (Jeringa 1mL / 100UI)
                    </p>
                    <div className="flex items-center gap-4">
                      {/* Imagen de Jeringa Referencial */}
                      <div className="w-16 flex-shrink-0">
                        <img
                          src="https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=2070&auto=format&fit=crop"
                          alt="Syringe Reference"
                          className="w-full h-auto opacity-50 grayscale hover:grayscale-0 transition-all rounded"
                        />
                      </div>
                      {/* Barra Visual */}
                      <div className="flex-1 h-12 bg-gray-200 relative rounded-sm overflow-hidden border border-gray-300">
                        {/* Marcas de escala */}
                        <div className="absolute inset-0 flex justify-between px-2 items-end pb-1 z-10">
                          {[0, 20, 40, 60, 80, 100].map((tick) => (
                            <div
                              key={tick}
                              className="h-2 w-[1px] bg-gray-400 flex flex-col items-center justify-end overflow-visible"
                            >
                              <span className="text-[8px] text-gray-500 absolute -top-4">
                                {tick}
                              </span>
                            </div>
                          ))}
                        </div>
                        {/* Liquido */}
                        <div
                          className="h-full bg-[#C5A059] transition-all duration-1000 ease-out opacity-80"
                          style={{ width: `${Math.min(res.units, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs font-bold font-mono text-gray-900 w-12 text-right">
                        {res.units.toFixed(1)} UI
                      </div>
                    </div>
                    <p className="text-[9px] text-gray-400 mt-2 text-center italic">
                      *Representación visual aproximada. Verifique siempre con
                      la escala física de su instrumento.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* COLUMNA 2: PROTOCOLO TÉCNICO */}
            <div className="space-y-8">
              <div className="bg-white p-8 border-l-4 border-blue-500 shadow-sm">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">
                  <Thermometer className="w-5 h-5 text-blue-500" /> Protocolo de
                  Reconstitución
                </h3>
                <ul className="space-y-4 text-xs text-gray-600 leading-relaxed font-mono">
                  <li className="flex gap-3">
                    <span className="text-blue-500 font-bold">01.</span>
                    Igualar temperatura: Permita que el vial alcance temperatura
                    ambiente antes de reconstituir para evitar choque térmico.
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 font-bold">02.</span>
                    Inyección Angular: Dirija el flujo del solvente (agua
                    bacteriostática o ácido acético) hacia la pared de vidrio,
                    nunca directamente sobre el liofilizado.
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 font-bold">03.</span>
                    Disolución Pasiva: Realice movimientos circulares lentos
                    ("Swirling").{" "}
                    <strong className="text-gray-900">
                      JAMÁS AGITAR VIGOROSAMENTE
                    </strong>
                    . La estructura peptídica es frágil ante la fuerza de
                    cizallamiento.
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 border-l-4 border-[#C5A059] shadow-sm">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">
                  <ShieldCheck className="w-5 h-5 text-[#C5A059]" />{" "}
                  Almacenamiento Post-Reconstitución
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  Una vez hidratado, el péptido inicia su proceso de degradación
                  natural.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 border border-gray-100 text-center">
                    <span className="block text-xl font-bold text-gray-900 mb-1">
                      2-8°C
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                      Refrigeración Obligatoria
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-100 text-center">
                    <span className="block text-xl font-bold text-gray-900 mb-1">
                      30 Días
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                      Vida Útil Máxima
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const BiosecurityView = () => (
    <div className="py-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-light text-gray-900 mb-12 border-l-4 border-gray-900 pl-6 uppercase tracking-widest">
          Estándares de Bioseguridad
        </h1>

        <p className="text-lg font-light text-gray-500 mb-12 leading-relaxed">
          Vertix Labs implementa protocolos de nivel BSL-1 para la manipulación
          y despacho de reactivos químicos. Nuestra cadena de custodia garantiza
          la integridad molecular desde la síntesis hasta la entrega.
        </p>

        <div className="grid gap-8">
          {[
            {
              title: "Cadena de Frío Activa",
              icon: <Thermometer />,
              text: "Todos los despachos incluyen geles refrigerantes de cambio de fase y aislamiento térmico multicapa para mantener temperaturas entre 2°C y 8°C durante el tránsito nacional.",
            },
            {
              title: "Redundancia de Sellado",
              icon: <Lock />,
              text: "Los viales cuentan con sellos 'Flip-off' de aluminio anodizado y tapones de butilo inerte, asegurados con bandas termoencogibles de evidencia de manipulación.",
            },
            {
              title: "Gestión de Riesgos (MSDS)",
              icon: <FileText />,
              text: "Proveemos Fichas de Datos de Seguridad (MSDS) digitales para cada referencia, detallando toxicidad, estabilidad y procedimientos de emergencia.",
            },
            {
              title: "Logística Especializada",
              icon: <Truck />,
              text: "Envios catalogados como 'Mercancía Química Delicada'. No se realizan entregas en apartados postales ni direcciones sin recepción certificada.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex gap-6 p-8 border border-gray-100 hover:border-[#C5A059] transition-all bg-gray-50/50 group"
            >
              <div className="w-12 h-12 bg-white flex items-center justify-center shadow-sm text-gray-400 group-hover:text-[#C5A059] transition-colors">
                {React.cloneElement(item.icon, { className: "w-6 h-6" })}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-mono">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const LegalView = () => (
    <div className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-8 bg-white py-16 shadow-xl border-t-4 border-gray-900">
        <div className="flex items-center gap-4 mb-12">
          <ShieldCheck className="w-10 h-10 text-gray-900" />
          <h1 className="text-3xl font-light text-gray-900 uppercase tracking-widest">
            Marco Legal Regulatorio
          </h1>
        </div>

        <div className="space-y-12 text-justify">
          <div className="p-6 bg-yellow-50 border border-yellow-100 text-[#856404] text-xs font-mono leading-relaxed">
            <strong>ADVERTENCIA VINCULANTE:</strong> Al acceder a este catálogo
            y solicitar cotización, usted constituye un acuerdo legal vinculante
            bajo las leyes de la República de Colombia, declarando que los
            productos serán utilizados exclusivamente para investigación
            científica.
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">
              Términos y Condiciones Generales
            </h2>
            {[
              {
                t: "DEFINICIÓN DEL BIEN",
                d: "Los productos ofrecidos son COMPUESTOS QUÍMICOS DE REFERENCIA. No son medicamentos, alimentos, cosméticos ni dispositivos médicos. No poseen registro sanitario INVIMA para consumo humano.",
              },
              {
                t: "DESTINACIÓN ESPECÍFICA",
                d: "El comprador garantiza que el uso final será: Ensayo de laboratorio, Calibración de equipos, Investigación académica o Análisis forense.",
              },
              {
                t: "CUALIFICACIÓN DEL USUARIO",
                d: "La venta está restringida a personas naturales o jurídicas con la competencia técnica para manipular sustancias químicas potencialmente peligrosas. Vertix Labs se reserva el derecho de solicitar credenciales.",
              },
              {
                t: "RESPONSABILIDAD CIVIL",
                d: "Conforme al Art. 2356 del Código Civil, el usuario asume la total responsabilidad por la custodia y uso de la sustancia. Vertix Labs se exonera de daños causados por negligencia, impericia o dolo del comprador.",
              },
              {
                t: "PROPIEDAD INTELECTUAL",
                d: "La nomenclatura técnica y fichas de datos son propiedad intelectual de Vertix Labs Research Division.",
              },
            ].map((clause, idx) => (
              <div key={idx} className="mb-6 last:mb-0">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="text-[#C5A059]">§{idx + 1}.</span> {clause.t}
                </h3>
                <p className="text-xs text-gray-600 leading-loose font-light">
                  {clause.d}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-8 border border-gray-200 rounded-sm">
            <h2 className="text-lg font-bold text-red-900 uppercase tracking-widest mb-6 border-b border-red-100 pb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Descargo de Responsabilidad
            </h2>
            <div className="space-y-4">
              {[
                {
                  t: "USO EXCLUSIVO INVESTIGACIÓN",
                  d: "El usuario reconoce explícitamente que los productos adquiridos están destinados ÚNICAMENTE para fines de investigación in vitro y de laboratorio. Queda terminantemente prohibido su uso en procedimientos diagnósticos o terapéuticos en humanos o animales.",
                },
                {
                  t: "NO APTO PARA CONSUMO HUMANO",
                  d: "Ninguno de los productos ofrecidos ha sido aprobado por el INVIMA para el consumo humano. La ingestión, inyección o aplicación tópica de estos productos en seres vivos constituye una violación directa de los términos de servicio.",
                },
                {
                  t: "DECLARACIONES DEL COMPRADOR",
                  d: "Al realizar una compra, el comprador declara bajo gravedad de juramento que es mayor de edad, posee la capacidad legal para contratar y cuenta con los conocimientos técnicos necesarios para la manipulación segura de reactivos químicos.",
                },
                {
                  t: "NATURALEZA 'TAL CUAL'",
                  d: "Los materiales se suministran 'tal cual', sin garantías de comercialización o idoneidad para un propósito particular implícito. La pureza química se garantiza mediante análisis HPLC, pero no se garantiza ningún resultado biológico específico.",
                },
                {
                  t: "INDEMNIZACIÓN Y EXENCIÓN",
                  d: "El comprador acuerda indemnizar, defender y mantener indemne a Vertix Labs, sus directores y empleados de cualquier reclamo, responsabilidad, pérdida, lesión o daño a la propiedad que surja del manejo, posesión o uso de los productos.",
                },
                {
                  t: "DERECHO DE ADMISIÓN Y ACCIONES LEGALES",
                  d: "Vertix Labs se reserva el derecho de rechazar la venta a cualquier individuo o entidad si sospecha un uso indebido. Cualquier violación de estos términos resultará en la inclusión en listas negras de la industria y reporte a las autoridades competentes si aplica.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-red-900/50 font-bold font-mono text-xs">
                    {i + 1}.
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                      {item.t}
                    </h4>
                    <p className="text-[10px] text-gray-600 leading-relaxed text-justify">
                      {item.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CartDrawer = () => (
    <div
      className={`fixed inset-0 z-[200] transform transition-transform duration-500 ease-out ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      ></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#C5A059]" />
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">
              Solicitud de Cotización
            </h2>
          </div>
          <button onClick={() => setIsCartOpen(false)}>
            <X className="w-6 h-6 text-gray-400 hover:text-gray-900" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-300 space-y-4">
              <Microscope className="w-16 h-16 opacity-20" />
              <p className="text-xs uppercase tracking-widest">
                Sin referencias seleccionadas
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-start border-b border-gray-50 pb-4 animate-in fade-in slide-in-from-right-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black text-gray-900">
                        {item.code}
                      </span>
                      <span className="text-[9px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 uppercase">
                        {item.category.split(" ")[0]}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-mono line-clamp-1">
                      {item.name}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(idx)}
                    className="text-red-300 hover:text-red-500 text-[10px] uppercase font-bold transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-8 bg-gray-50 border-t border-gray-200">
          <div className="bg-[#C5A059]/10 p-4 mb-6 border border-[#C5A059]/20">
            <p className="text-[9px] text-[#856404] uppercase font-bold text-center leading-relaxed">
              Al proceder, usted confirma que representa a una institución o
              posee credenciales profesionales verificables.
            </p>
          </div>
          <button
            onClick={handleWhatsAppCheckout}
            disabled={cart.length === 0}
            className={`w-full py-5 uppercase text-[10px] font-bold tracking-[0.2em] transition-all shadow-lg flex items-center justify-center gap-2 ${
              cart.length === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-[#C5A059]"
            }`}
          >
            Generar Orden Vía WhatsApp
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const ProductDetailModal = () => {
    if (!selectedProduct) return null;
    return (
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl rounded-sm relative">
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 z-10 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="w-full md:w-1/3 bg-gray-50 p-12 flex flex-col items-center justify-center border-r border-gray-100 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <FlaskConical className="w-32 h-32 text-gray-300 mb-6" />
            <h2 className="text-5xl font-black text-gray-200 tracking-tighter">
              {selectedProduct.code}
            </h2>
          </div>

          <div className="w-full md:w-2/3 p-12">
            <span className="inline-block px-3 py-1 bg-[#C5A059]/10 text-[#C5A059] text-[9px] font-bold uppercase tracking-widest mb-4 border border-[#C5A059]/20">
              {selectedProduct.category}
            </span>
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              {selectedProduct.name}
            </h1>
            <div className="w-12 h-1 bg-[#C5A059] mb-8"></div>

            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">
              Descripción Técnica
            </h3>
            <p className="text-sm text-gray-600 font-mono leading-relaxed mb-10">
              {selectedProduct.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-4 border border-gray-100 bg-gray-50">
                <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">
                  Pureza (HPLC)
                </p>
                <p className="text-sm font-bold text-gray-900">≥ 99.0%</p>
              </div>
              <div className="p-4 border border-gray-100 bg-gray-50">
                <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">
                  Formato
                </p>
                <p className="text-sm font-bold text-gray-900">
                  Liofilizado Estéril
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="flex-1 bg-gray-900 text-white py-4 uppercase text-[10px] font-bold tracking-[0.2em] hover:bg-[#C5A059] transition-colors"
              >
                Añadir a Cotización
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#C5A059] selection:text-white">
      <LegalModal />
      <Navigation />
      <CartDrawer />
      <ProductDetailModal />

      <main>
        {view === "landing" && <Hero />}
        {view === "catalog" && <CatalogView />}
        {view === "maintenance" && <CalculatorMaintenanceView />}
        {view === "bio" && <BiosecurityView />}
        {view === "legal" && <LegalView />}
      </main>

      <footer className="bg-gray-900 text-white py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <FlaskConical className="w-6 h-6 text-[#C5A059]" />
              <span className="text-2xl font-bold tracking-[0.2em]">
                VERTIX
              </span>
            </div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest max-w-xs">
              Scientific Grade Research Compounds
            </p>
          </div>

          <div className="text-[9px] text-gray-600 uppercase tracking-widest space-y-2 font-mono">
            <p>Bogotá D.C. - Colombia</p>
            <p>Research Use Only (RUO)</p>
            <p>&copy; 2026 Vertix Labs Division</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
