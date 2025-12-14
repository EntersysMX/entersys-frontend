/**
 * FormularioCursoSeguridad.jsx
 * Formulario de examen de seguridad con 30 preguntas en 3 secciones.
 *
 * Secciones:
 * - Sección 1 (Seguridad): Preguntas 1-10
 * - Sección 2 (Inocuidad): Preguntas 11-20
 * - Sección 3 (Ambiental): Preguntas 21-30
 *
 * Criterios de aprobación:
 * - Cada sección debe tener mínimo 80% (8/10 correctas)
 * - Máximo 3 intentos por RFC
 */

import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { config } from '../config/environment';

const API_BASE_URL = config.urls.api;

// Definición de las 3 secciones del examen
const EXAM_SECTIONS = [
  { id: 1, name: 'Seguridad', startQuestion: 1, endQuestion: 10, color: 'red' },
  { id: 2, name: 'Inocuidad', startQuestion: 11, endQuestion: 20, color: 'blue' },
  { id: 3, name: 'Ambiental', startQuestion: 21, endQuestion: 30, color: 'green' }
];

// Banco completo de 30 preguntas del examen
const EXAM_QUESTIONS = [
  // ========== SECCIÓN 1: SEGURIDAD (Preguntas 1-10) ==========
  {
    id: 1,
    section: 1,
    question: "Las siglas PPP corresponden a:",
    options: [
      "Protocolo de Prevención de Peligro",
      "Pensamiento de Prevención de Peligro",
      "Pensamiento de Protección Personal"
    ],
    correctAnswer: "Protocolo de Prevención de Peligro"
  },
  {
    id: 2,
    section: 1,
    question: "Poder reconocer peligros y riesgos en el lugar de trabajo nos ayuda a:",
    options: [
      "seguridad",
      "prevención",
      "protocolo"
    ],
    correctAnswer: "prevención"
  },
  {
    id: 3,
    section: 1,
    question: "Son tres elementos del equipo de protección personal (EPP):",
    options: [
      "casco de seguridad, botas con casquillo y chaleco reflejante",
      "casco de seguridad, arnés de seguridad y tapones auditivos",
      "casco de seguridad, traje de bombero y guantes para químicos"
    ],
    correctAnswer: "casco de seguridad, botas con casquillo y chaleco reflejante"
  },
  {
    id: 4,
    section: 1,
    question: "Tres acciones que debemos realizar en caso de emergencia:",
    options: [
      "Conservar la calma, guardar silencio y usar el teléfono celular",
      "Seguir todas las instrucciones del coordinador, conservar la calma y apagar equipos o máquinas.",
      "No hacer bromas, mantener grupos de 50 personas por fila y conservar la calma"
    ],
    correctAnswer: "Seguir todas las instrucciones del coordinador, conservar la calma y apagar equipos o máquinas."
  },
  {
    id: 5,
    section: 1,
    question: "Es un incidente que tuvo graves consecuencias para la persona:",
    options: ["SIF", "SIG", "CIS"],
    correctAnswer: "SIF"
  },
  {
    id: 6,
    section: 1,
    question: "Estado patológico o condición que se deriva del trabajo:",
    options: [
      "Enfermedad profesional",
      "Enfermedad laboral",
      "Enfermedad de trabajo"
    ],
    correctAnswer: "Enfermedad de trabajo"
  },
  {
    id: 7,
    section: 1,
    question: "Establecer zonas de seguridad y rutas de evacuación ¿es parte de las Reglas que Salvan Vidas?",
    options: ["Sí", "No"],
    correctAnswer: "Sí"
  },
  {
    id: 8,
    section: 1,
    question: "Es la principal prioridad de la compañía:",
    options: ["El desarrollo", "La seguridad", "La venta del producto"],
    correctAnswer: "La seguridad"
  },
  {
    id: 9,
    section: 1,
    question: "Un ejemplo de incidente es:",
    options: ["No usar casco", "Caída"],
    correctAnswer: "Caída"
  },
  {
    id: 10,
    section: 1,
    question: "La gravedad y frecuencia son factores para evaluar:",
    options: ["Incidente", "Peligro", "Riesgo"],
    correctAnswer: "Riesgo"
  },
  // ========== SECCIÓN 2: INOCUIDAD (Preguntas 11-20) ==========
  {
    id: 11,
    section: 2,
    question: "¿Qué se requiere para el ingreso de sustancias químicas a la planta?",
    options: [
      "Solo presentar la factura de compra.",
      "Hoja de Datos de Seguridad (HDS) y formato de autorización firmado.",
      "Que el envase sea de vidrio."
    ],
    correctAnswer: "Hoja de Datos de Seguridad (HDS) y formato de autorización firmado."
  },
  {
    id: 12,
    section: 2,
    question: "¿Cuál es la sanción establecida para un contratista que reincide en violar las normas de seguridad?",
    options: [
      "Una segunda amonestación verbal.",
      "Se le negará el acceso a la empresa definitivamente.",
      "Multa económica del 10% del contrato."
    ],
    correctAnswer: "Se le negará el acceso a la empresa definitivamente."
  },
  {
    id: 13,
    section: 2,
    question: "En trabajos de excavación, ¿a qué profundidad se requiere el uso de escalera para entrada y salida?",
    options: [
      "Más de 1.20 metros.",
      "Más de 50 centímetros.",
      "Solo si es mayor a 2 metros."
    ],
    correctAnswer: "Más de 1.20 metros."
  },
  {
    id: 14,
    section: 2,
    question: "¿Cómo se clasifican los trapos impregnados con grasas, tintas o aceites?",
    options: [
      "Residuos de manejo especial.",
      "Residuo Peligroso.",
      "Basura general."
    ],
    correctAnswer: "Residuo Peligroso."
  },
  {
    id: 15,
    section: 2,
    question: "En el uso de escaleras portátiles, ¿cuál es la regla de colocación para asegurar la estabilidad?",
    options: [
      "La distancia de la pared a las patas debe ser 1/4 de la longitud de la escalera.",
      "La escalera debe estar totalmente vertical (90 grados).",
      "La distancia debe ser igual a la longitud de la escalera."
    ],
    correctAnswer: "La distancia de la pared a las patas debe ser 1/4 de la longitud de la escalera."
  },
  {
    id: 16,
    section: 2,
    question: "¿Qué acción está PROHIBIDA realizar en las instalaciones según los lineamientos generales?",
    options: [
      "Usar pasillos peatonales.",
      "Fumar.",
      "Reportar incidentes."
    ],
    correctAnswer: "Fumar."
  },
  {
    id: 17,
    section: 2,
    question: "¿Cuál es el ancho mínimo que debe tener el tablón de apoyo en un andamio?",
    options: ["30 cm.", "50 cm.", "1 metro."],
    correctAnswer: "50 cm."
  },
  {
    id: 18,
    section: 2,
    question: "¿Qué significa el estado ZES en el contexto de bloqueo de energías?",
    options: [
      "Zona de Emergencia Segura.",
      "Zero Energy State (Estado Cero Energía).",
      "Zona Estándar de Seguridad."
    ],
    correctAnswer: "Zero Energy State (Estado Cero Energía)."
  },
  {
    id: 19,
    section: 2,
    question: "¿Cuál es la distancia de seguridad que se debe mantener con líneas eléctricas de alto voltaje?",
    options: [
      "Por lo menos 3 metros.",
      "1 metro es suficiente.",
      "50 centímetros."
    ],
    correctAnswer: "Por lo menos 3 metros."
  },
  {
    id: 20,
    section: 2,
    question: "¿Qué deben hacer los contratistas con sus residuos generados?",
    options: [
      "Dejarlos en el lugar de trabajo para que limpieza los recoja.",
      "Retirarlos y disponerlos ellos mismos (especialmente si son peligrosos) o llevarlos al almacén correspondiente.",
      "Quemarlos en un área abierta."
    ],
    correctAnswer: "Retirarlos y disponerlos ellos mismos (especialmente si son peligrosos) o llevarlos al almacén correspondiente."
  },
  // ========== SECCIÓN 3: AMBIENTAL (Preguntas 21-30) ==========
  {
    id: 21,
    section: 3,
    question: "¿Cuántos puntos de reunión de emergencia existen dentro de las instalaciones de Planta Ixtacomitán?",
    options: [
      "3 puntos de reunión.",
      "4 puntos de reunión.",
      "5 puntos de reunión."
    ],
    correctAnswer: "4 puntos de reunión."
  },
  {
    id: 22,
    section: 3,
    question: "¿Qué significan las siglas SIF en la clasificación de eventos de seguridad (Nivel 3)?",
    options: [
      "Sistemas Integrales de Fabricación.",
      "Serious Injuries or Fatalities (Incidentes Serios o Fatalidades).",
      "Seguridad Interna de la Fábrica."
    ],
    correctAnswer: "Serious Injuries or Fatalities (Incidentes Serios o Fatalidades)."
  },
  {
    id: 23,
    section: 3,
    question: "Según los lineamientos de Buenas Prácticas de Manufactura, ¿qué está prohibido portar de la cintura para arriba en áreas productivas?",
    options: [
      "Equipo de protección personal básico.",
      "Botones, bolsillos, joyería, plumas u objetos desprendibles.",
      "Camisa de manga larga de algodón."
    ],
    correctAnswer: "Botones, bolsillos, joyería, plumas u objetos desprendibles."
  },
  {
    id: 24,
    section: 3,
    question: "¿Cuáles son las tres salidas de emergencia mencionadas específicamente para esta planta?",
    options: [
      "Entrada principal, Comedor y Baños.",
      "Salida por cuarto de máquinas, Salida por Materias Primas y Salida por andenes de carga.",
      "Almacén de refacciones, Taller mecánico y Laboratorio."
    ],
    correctAnswer: "Salida por cuarto de máquinas, Salida por Materias Primas y Salida por andenes de carga."
  },
  {
    id: 25,
    section: 3,
    question: "¿Qué características definen a un Residuo Peligroso (código CRETIB)?",
    options: [
      "Corrosivo, Reactivo, Explosivo, Tóxico, Inflamable, Biológico-infeccioso.",
      "Contaminante, Ruidoso, Estorboso, Tardo, Inerte, Basura.",
      "Reciclable, Reutilizable, Reducible, Recuperable, Renovable."
    ],
    correctAnswer: "Corrosivo, Reactivo, Explosivo, Tóxico, Inflamable, Biológico-infeccioso."
  },
  {
    id: 26,
    section: 3,
    question: "¿Cuál es la calificación mínima aprobatoria requerida para el examen de inducción de contratistas en línea?",
    options: ["80%", "90%", "100%"],
    correctAnswer: "80%"
  },
  {
    id: 27,
    section: 3,
    question: "¿Qué sistema de certificación de inocuidad alimentaria implementa la planta para garantizar productos seguros?",
    options: ["ISO 9001", "FSSC 22000", "Industria Limpia Nivel 1"],
    correctAnswer: "FSSC 22000"
  },
  {
    id: 28,
    section: 3,
    question: "En temas de inocuidad, ¿Cuáles son ejemplos de peligros FÍSICOS para el producto?",
    options: [
      "Bacterias, virus y parásitos.",
      "Residuos de detergentes, aceites y lubricantes.",
      "Vidrio, madera, metal, plástico rígido, piedras y huesos."
    ],
    correctAnswer: "Vidrio, madera, metal, plástico rígido, piedras y huesos."
  },
  {
    id: 29,
    section: 3,
    question: "¿Qué elementos conforman el Equipo de Protección Personal (EPP) considerado BÁSICO en el documento?",
    options: [
      "Arnés, línea de vida y equipo de respiración autónoma.",
      "Botas con casquillo, tapones auditivos, guantes anti corte, chaleco reflejante, casco y gafas.",
      "Traje de bombero, careta de soldar y mandil de PVC."
    ],
    correctAnswer: "Botas con casquillo, tapones auditivos, guantes anti corte, chaleco reflejante, casco y gafas."
  },
  {
    id: 30,
    section: 3,
    question: "¿Cuál es el lineamiento para el manejo de residuos peligrosos generados por contratistas?",
    options: [
      "Pueden depositarse en los contenedores generales de la planta.",
      "Deben ser retirados y dispuestos por el propio contratista.",
      "Se deben dejar en el área de trabajo para que el personal de limpieza los recoja."
    ],
    correctAnswer: "Deben ser retirados y dispuestos por el propio contratista."
  }
];

// Fisher-Yates Shuffle para aleatorizar opciones
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function FormularioCursoSeguridad() {
  const navigate = useNavigate();

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre_completo: '',
    rfc_colaborador: '',
    rfc_empresa: '',
    nss: '',
    tipo_servicio: '',
    proveedor: '',
    email: ''
  });

  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(1); // 1: datos, 2: examen, 3: resultado
  const [currentSection, setCurrentSection] = useState(1); // Sección actual del examen (1, 2 o 3)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [examStatus, setExamStatus] = useState(null);
  const [statusError, setStatusError] = useState(null);

  // Preparar preguntas con opciones aleatorias
  const questionsWithShuffledOptions = useMemo(() => {
    return EXAM_QUESTIONS.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
  }, []);

  // Obtener preguntas de una sección específica
  const getQuestionsForSection = (sectionId) => {
    const section = EXAM_SECTIONS.find(s => s.id === sectionId);
    if (!section) return [];
    return questionsWithShuffledOptions.filter(
      q => q.id >= section.startQuestion && q.id <= section.endQuestion
    );
  };

  // Contar respuestas por sección
  const getAnsweredCountForSection = (sectionId) => {
    const sectionQuestions = getQuestionsForSection(sectionId);
    return sectionQuestions.filter(q => answers[q.id]).length;
  };

  // Validar datos personales
  const validatePersonalData = () => {
    const newErrors = {};

    if (!formData.nombre_completo.trim()) {
      newErrors.nombre_completo = 'El nombre es obligatorio';
    }

    if (!formData.rfc_colaborador.trim()) {
      newErrors.rfc_colaborador = 'El RFC es obligatorio';
    } else if (formData.rfc_colaborador.length < 10) {
      newErrors.rfc_colaborador = 'El RFC debe tener al menos 10 caracteres';
    }

    if (!formData.proveedor.trim()) {
      newErrors.proveedor = 'El proveedor es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambio en inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    // Limpiar error de estatus al cambiar RFC
    if (name === 'rfc_colaborador') {
      setStatusError(null);
      setExamStatus(null);
    }
  };

  // Manejar selección de respuesta
  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  // Verificar estatus del examen por RFC
  const checkExamStatus = async () => {
    if (!formData.rfc_colaborador || formData.rfc_colaborador.length < 10) {
      setErrors(prev => ({ ...prev, rfc_colaborador: 'El RFC debe tener al menos 10 caracteres' }));
      return null;
    }

    setIsCheckingStatus(true);
    setStatusError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/v1/onboarding/check-exam-status/${formData.rfc_colaborador.toUpperCase()}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Error al verificar estatus');
      }

      setExamStatus(data);
      return data;
    } catch (error) {
      console.error('Error verificando estatus:', error);
      setStatusError(error.message);
      return null;
    } finally {
      setIsCheckingStatus(false);
    }
  };

  // Continuar al examen (verifica estatus primero)
  const handleContinueToExam = async () => {
    if (!validatePersonalData()) return;

    const status = await checkExamStatus();

    if (!status) {
      // Error al verificar, permitir continuar de todos modos (primera vez)
      setCurrentStep(2);
      setCurrentSection(1);
      window.scrollTo(0, 0);
      return;
    }

    if (!status.can_take_exam) {
      // No puede hacer el examen
      setStatusError(status.message);
      return;
    }

    // Puede hacer el examen
    setCurrentStep(2);
    setCurrentSection(1);
    window.scrollTo(0, 0);
  };

  // Navegar entre secciones del examen
  const goToSection = (sectionId) => {
    setCurrentSection(sectionId);
    window.scrollTo(0, 0);
  };

  // Enviar examen
  const handleSubmit = async () => {
    // Verificar que todas las preguntas estén contestadas
    const totalAnswered = Object.keys(answers).length;
    if (totalAnswered < 30) {
      alert(`Por favor responde todas las preguntas antes de enviar. Faltan ${30 - totalAnswered} preguntas.`);
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar respuestas con is_correct
      const formattedAnswers = EXAM_QUESTIONS.map(q => ({
        question_id: q.id,
        answer: answers[q.id],
        is_correct: answers[q.id] === q.correctAnswer
      }));

      const payload = {
        ...formData,
        answers: formattedAnswers
      };

      const response = await fetch(`${API_BASE_URL}/v1/onboarding/submit-exam`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      setResult(data);
      setCurrentStep(3);
      window.scrollTo(0, 0);

    } catch (error) {
      console.error('Error enviando examen:', error);
      alert('Error al enviar el examen. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Volver a intentar el examen
  const handleRetry = () => {
    setAnswers({});
    setResult(null);
    setCurrentStep(2);
    setCurrentSection(1);
    window.scrollTo(0, 0);
  };

  // Volver a ver el video
  const handleWatchVideo = () => {
    navigate('/curso-seguridad');
  };

  // Renderizar paso 1: Datos personales
  const renderPersonalDataStep = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Datos del Colaborador</h2>
        <p className="text-gray-600 mb-8">
          Complete la siguiente información antes de iniciar el examen de certificación.
        </p>

        {/* Mensaje especial cuando ya tiene certificación vigente */}
        {examStatus && examStatus.is_approved && !examStatus.is_expired && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-green-800 font-semibold">¡Ya tienes una certificación vigente!</p>
                <p className="text-green-700 text-sm mt-1">
                  Tu certificación de seguridad sigue activa y no necesitas volver a realizar el examen.
                </p>
                {examStatus.expiration_date && (
                  <p className="text-green-700 text-sm mt-1">
                    <strong>Vigente hasta:</strong> {examStatus.expiration_date}
                  </p>
                )}
                {examStatus.certificate_resent && (
                  <p className="text-green-600 text-sm mt-2 font-medium">
                    ✉️ Hemos reenviado tu certificado con código QR a tu correo electrónico registrado.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mensaje cuando la certificación expiró pero puede renovar */}
        {examStatus && examStatus.is_approved && examStatus.is_expired && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-amber-800 font-semibold">Tu certificación ha expirado</p>
                <p className="text-amber-700 text-sm mt-1">
                  Tu certificación anterior venció. Puedes realizar el examen nuevamente para renovarla.
                </p>
                {examStatus.expiration_date && (
                  <p className="text-amber-600 text-sm mt-1">
                    <strong>Venció el:</strong> {examStatus.expiration_date}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mensaje de error de estatus (cuando no puede hacer examen) */}
        {statusError && !examStatus?.is_approved && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium">{statusError}</p>
            {examStatus && !examStatus.can_take_exam && examStatus.attempts_used >= 3 && (
              <p className="text-red-600 text-sm mt-2">
                Has agotado tus 3 intentos. Contacta al administrador para más información.
              </p>
            )}
          </div>
        )}

        {/* Mostrar estatus si ya hay intentos (pero no aprobado) */}
        {examStatus && examStatus.attempts_used > 0 && examStatus.can_take_exam && !examStatus.is_approved && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800 font-medium">
              Ya tienes {examStatus.attempts_used} intento(s) registrado(s).
            </p>
            <p className="text-amber-700 text-sm mt-1">
              Te quedan {examStatus.attempts_remaining} intento(s) disponible(s).
            </p>
          </div>
        )}

        <div className="space-y-6">
          {/* Nombre Completo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nombre_completo"
              value={formData.nombre_completo}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#D91E18] focus:border-transparent ${
                errors.nombre_completo ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Juan Pérez García"
            />
            {errors.nombre_completo && (
              <p className="mt-1 text-sm text-red-500">{errors.nombre_completo}</p>
            )}
          </div>

          {/* RFC Colaborador */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              RFC del Colaborador <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="rfc_colaborador"
              value={formData.rfc_colaborador}
              onChange={handleInputChange}
              maxLength={13}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#D91E18] focus:border-transparent uppercase ${
                errors.rfc_colaborador ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="PEGJ850101XXX"
            />
            {errors.rfc_colaborador && (
              <p className="mt-1 text-sm text-red-500">{errors.rfc_colaborador}</p>
            )}
          </div>

          {/* RFC Empresa (opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              RFC de la Empresa
            </label>
            <input
              type="text"
              name="rfc_empresa"
              value={formData.rfc_empresa}
              onChange={handleInputChange}
              maxLength={13}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D91E18] focus:border-transparent uppercase"
              placeholder="EMP850101XXX"
            />
          </div>

          {/* NSS (opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NSS del Colaborador
            </label>
            <input
              type="text"
              name="nss"
              value={formData.nss}
              onChange={handleInputChange}
              maxLength={11}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D91E18] focus:border-transparent"
              placeholder="12345678901"
            />
          </div>

          {/* Tipo de Servicio (opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Servicio
            </label>
            <input
              type="text"
              name="tipo_servicio"
              value={formData.tipo_servicio}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D91E18] focus:border-transparent"
              placeholder="Ej: Mantenimiento, Limpieza, Seguridad, etc."
            />
          </div>

          {/* Proveedor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Proveedor / Empresa <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="proveedor"
              value={formData.proveedor}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#D91E18] focus:border-transparent ${
                errors.proveedor ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Nombre de la empresa proveedora"
            />
            {errors.proveedor && (
              <p className="mt-1 text-sm text-red-500">{errors.proveedor}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#D91E18] focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="correo@ejemplo.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleContinueToExam}
            disabled={isCheckingStatus}
            className={`w-full py-4 font-semibold rounded-lg transition-colors ${
              isCheckingStatus
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#D91E18] text-white hover:bg-[#b81915]'
            }`}
          >
            {isCheckingStatus ? 'Verificando estatus...' : 'Continuar al Examen'}
          </button>
        </div>
      </div>
    </div>
  );

  // Renderizar paso 2: Examen con secciones
  const renderExamStep = () => {
    const currentSectionQuestions = getQuestionsForSection(currentSection);
    const currentSectionInfo = EXAM_SECTIONS.find(s => s.id === currentSection);
    const totalAnswered = Object.keys(answers).length;

    const sectionColors = {
      1: { bg: 'bg-red-500', light: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
      2: { bg: 'bg-blue-500', light: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
      3: { bg: 'bg-green-500', light: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' }
    };

    const colors = sectionColors[currentSection];

    return (
      <div className="max-w-4xl mx-auto">
        {/* Navegación de secciones */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            {EXAM_SECTIONS.map((section) => {
              const answeredCount = getAnsweredCountForSection(section.id);
              const isComplete = answeredCount === 10;
              const isCurrent = currentSection === section.id;
              const sColors = sectionColors[section.id];

              return (
                <button
                  key={section.id}
                  onClick={() => goToSection(section.id)}
                  className={`flex-1 min-w-[120px] p-3 rounded-lg transition-all ${
                    isCurrent
                      ? `${sColors.bg} text-white`
                      : `${sColors.light} ${sColors.text} hover:opacity-80`
                  }`}
                >
                  <div className="text-sm font-medium">Sección {section.id}</div>
                  <div className="text-xs opacity-80">{section.name}</div>
                  <div className="text-xs mt-1">
                    {answeredCount}/10 {isComplete && '✓'}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            Total: {totalAnswered} / 30 preguntas respondidas
          </div>
        </div>

        {/* Contenido de la sección actual */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className={`${colors.light} ${colors.border} border rounded-lg p-4 mb-6`}>
            <h2 className={`text-xl font-bold ${colors.text}`}>
              Sección {currentSection}: {currentSectionInfo?.name}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Preguntas {currentSectionInfo?.startQuestion} - {currentSectionInfo?.endQuestion}
            </p>
            <p className={`text-sm mt-2 ${colors.text}`}>
              <strong>Importante:</strong> Debes obtener mínimo 80% (8 de 10 correctas) en esta sección.
            </p>
          </div>

          <div className="space-y-8">
            {currentSectionQuestions.map((q, index) => (
              <div key={q.id} className="border-b border-gray-200 pb-6 last:border-0">
                <p className="font-medium text-gray-900 mb-4">
                  <span className={`${colors.text} font-bold`}>{q.id}.</span> {q.question}
                </p>
                <div className="space-y-3">
                  {q.options.map((option, optIndex) => (
                    <label
                      key={optIndex}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                        answers[q.id] === option
                          ? `${colors.border} ${colors.light}`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question_${q.id}`}
                        value={option}
                        checked={answers[q.id] === option}
                        onChange={() => handleAnswerSelect(q.id, option)}
                        className="w-4 h-4 text-[#D91E18] focus:ring-[#D91E18]"
                      />
                      <span className="ml-3 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Navegación entre secciones */}
          <div className="mt-8 flex flex-wrap gap-4">
            {currentSection > 1 && (
              <button
                onClick={() => goToSection(currentSection - 1)}
                className="flex-1 py-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← Sección Anterior
              </button>
            )}

            {currentSection < 3 ? (
              <button
                onClick={() => goToSection(currentSection + 1)}
                className={`flex-1 py-4 font-semibold rounded-lg transition-colors ${colors.bg} text-white hover:opacity-90`}
              >
                Siguiente Sección →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || totalAnswered < 30}
                className={`flex-1 py-4 font-semibold rounded-lg transition-colors ${
                  isSubmitting || totalAnswered < 30
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#D91E18] text-white hover:bg-[#b81915]'
                }`}
              >
                {isSubmitting ? 'Enviando...' : `Enviar Examen (${totalAnswered}/30)`}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Renderizar paso 3: Resultado
  const renderResultStep = () => {
    if (!result) return null;

    const approved = result.approved;
    const sections = result.sections || [];

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Icono y título principal */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
              approved ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {approved ? (
                <svg className="w-16 h-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-16 h-16 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>

            <h1 className={`text-4xl font-bold mb-2 ${approved ? 'text-green-600' : 'text-red-600'}`}>
              {approved ? '¡Felicidades!' : 'No Aprobado'}
            </h1>
            <p className="text-gray-600">{result.message}</p>
          </div>

          {/* Score general */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-center">
            <p className="text-5xl font-bold text-gray-900 mb-2">
              {result.overall_score?.toFixed(1)}%
            </p>
            <p className="text-gray-600">Promedio General</p>
          </div>

          {/* Resultados por sección */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resultados por Sección</h3>
            <div className="space-y-4">
              {sections.map((section) => {
                const sectionColors = {
                  1: { bg: 'bg-red-500', light: 'bg-red-50', text: 'text-red-700' },
                  2: { bg: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-700' },
                  3: { bg: 'bg-green-500', light: 'bg-green-50', text: 'text-green-700' }
                };
                const colors = sectionColors[section.section_number];

                return (
                  <div
                    key={section.section_number}
                    className={`p-4 rounded-lg border ${
                      section.approved ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${colors.bg} text-white mr-2`}>
                          Sección {section.section_number}
                        </span>
                        <span className="font-medium text-gray-900">{section.section_name}</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-2xl font-bold ${section.approved ? 'text-green-600' : 'text-red-600'}`}>
                          {section.score}%
                        </span>
                        <p className="text-xs text-gray-500">
                          {section.correct_count}/{section.total_questions} correctas
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className={`text-sm font-medium ${section.approved ? 'text-green-600' : 'text-red-600'}`}>
                        {section.approved ? '✓ Aprobada' : '✗ Reprobada (mínimo 80%)'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Información de intentos */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-amber-800 text-sm">
              <strong>Intentos:</strong> {result.attempts_used} de 3 utilizados
              {result.can_retry && (
                <span className="ml-2">
                  (Te quedan {result.attempts_remaining} intento(s))
                </span>
              )}
            </p>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col gap-4">
            {result.can_retry && (
              <>
                <button
                  onClick={handleRetry}
                  className="w-full py-4 bg-[#D91E18] text-white font-semibold rounded-lg hover:bg-[#b81915] transition-colors"
                >
                  Intentar de Nuevo
                </button>
                <button
                  onClick={handleWatchVideo}
                  className="w-full py-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Ver Video de Capacitación Nuevamente
                </button>
              </>
            )}

            {!result.can_retry && !approved && (
              <div className="text-center text-red-600 p-4 bg-red-50 rounded-lg">
                <p className="font-medium">Has agotado tus 3 intentos.</p>
                <p className="text-sm mt-1">Contacta al administrador para más información.</p>
              </div>
            )}

            {approved && (
              <div className="text-center text-green-600 p-4 bg-green-50 rounded-lg">
                <p className="font-medium">Recibirás tu certificación por correo electrónico.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Examen de Certificación de Seguridad | FEMSA</title>
        <meta name="description" content="Complete el examen de certificación de seguridad industrial para obtener su acreditación." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <header className="bg-white shadow-sm py-6">
          <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
            <img src="/images/coca-cola-femsa-logo.png" alt="Coca-Cola FEMSA" className="h-20 md:h-24" />
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step
                      ? 'bg-[#D91E18] text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-[#D91E18] text-white py-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-2">
              {currentStep === 1 && 'Registro de Datos'}
              {currentStep === 2 && `Examen de Certificación - Sección ${currentSection}`}
              {currentStep === 3 && 'Resultado del Examen'}
            </h1>
            <p className="text-red-100">
              Certificación de Seguridad Industrial - Coca-Cola FEMSA
            </p>
            {currentStep === 2 && (
              <p className="text-red-200 text-sm mt-2">
                30 preguntas en 3 secciones | Mínimo 80% en cada sección para aprobar
              </p>
            )}
          </div>
        </section>

        {/* Content */}
        <div className="flex-1 py-12 px-4">
          {currentStep === 1 && renderPersonalDataStep()}
          {currentStep === 2 && renderExamStep()}
          {currentStep === 3 && renderResultStep()}
        </div>

        {/* Footer */}
        <footer className="bg-gray-100 py-6">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-sm text-gray-600 mb-3">© {new Date().getFullYear()} Entersys. Todos los derechos reservados.</p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link to="/politica-de-privacidad" className="text-gray-500 hover:text-[#FFC600] transition-colors">Política de privacidad</Link>
              <Link to="/terminos-de-servicio" className="text-gray-500 hover:text-[#FFC600] transition-colors">Términos de servicio</Link>
              <Link to="/configuracion-de-cookies" className="text-gray-500 hover:text-[#FFC600] transition-colors">Configuración de cookies</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
