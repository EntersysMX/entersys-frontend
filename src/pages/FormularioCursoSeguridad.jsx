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

// Banco completo de 30 preguntas del examen (Actualizado 2026-01-05)
const EXAM_QUESTIONS = [
  // ========== SECCIÓN 1: SEGURIDAD (Preguntas 1-10) ==========
  {
    id: 1,
    section: 1,
    question: "¿Cuál de las siguientes opciones describe mejor el concepto de 'Riesgo' en el contexto de la seguridad industrial?",
    options: [
      "Una fuente o situación con potencial de causar daño.",
      "Un suceso relacionado con el trabajo donde ocurre o podría ocurrir un daño.",
      "Cualquier condición que ha sido evaluada y declarada libre de peligros.",
      "La combinación de la probabilidad de que ocurra un suceso y la consecuencia del mismo."
    ],
    correctAnswer: "La combinación de la probabilidad de que ocurra un suceso y la consecuencia del mismo."
  },
  {
    id: 2,
    section: 1,
    question: "Según la clasificación de eventos de Coca-Cola FEMSA, un incidente que resulta en fatalidades o lesiones serias (SIF) se clasifica internamente como:",
    options: ["Nivel 1", "Nivel 3", "Nivel 0", "Nivel 2"],
    correctAnswer: "Nivel 3"
  },
  {
    id: 3,
    section: 1,
    question: "¿Cuál es el propósito principal del procedimiento LOTO (Bloqueo y Etiquetado) mencionado en las 'Reglas para salvar vidas'?",
    options: [
      "Confirmar que no hay energía presente o está aislada antes de intervenir un equipo.",
      "Protegerse contra caídas cuando se trabaja en altura.",
      "Verificar que el personal tenga las habilidades adecuadas para la tarea.",
      "Asegurar que los contratistas tengan el permiso de trabajo adecuado."
    ],
    correctAnswer: "Confirmar que no hay energía presente o está aislada antes de intervenir un equipo."
  },
  {
    id: 4,
    section: 1,
    question: "¿Qué elemento del Equipo de Protección Personal (EPP) de categoría ESPECIAL es fundamental para un trabajo de soldadura?",
    options: [
      "Guantes de carnaza",
      "Botas industriales con casquillo",
      "Chaleco de alta visibilidad",
      "Careta para soldar"
    ],
    correctAnswer: "Careta para soldar"
  },
  {
    id: 5,
    section: 1,
    question: "De acuerdo con la normativa para el levantamiento manual de cargas, ¿cuál es la masa máxima que un trabajador masculino de 35 años puede levantar?",
    options: ["25 kg", "15 kg", "7 kg", "20 kg"],
    correctAnswer: "25 kg"
  },
  {
    id: 6,
    section: 1,
    question: "Según las categorías de riesgo para las actividades de contratistas, ¿cómo se clasifica una tarea que implica trabajos de construcción o demolición?",
    options: ["Riesgo Ad Hoc", "Riesgo Alto", "Riesgo Bajo", "Riesgo Medio"],
    correctAnswer: "Riesgo Alto"
  },
  {
    id: 7,
    section: 1,
    question: "Durante una situación de emergencia en las instalaciones, ¿qué acción se debe tomar si se escucha un sonido de alarma continuo?",
    options: [
      "Buscar al supervisor para confirmar si la emergencia es real.",
      "Permanecer alerta y esperar instrucciones adicionales.",
      "Detener el trabajo y apagar únicamente los equipos de cómputo.",
      "Dirigirse al punto de reunión más cercano de manera ordenada."
    ],
    correctAnswer: "Dirigirse al punto de reunión más cercano de manera ordenada."
  },
  {
    id: 8,
    section: 1,
    question: "Para realizar trabajos en calor, como corte y soldadura, ¿cuál es el número mínimo de personas requeridas y cuáles son sus roles?",
    options: [
      "Dos personas: el ejecutor que realiza el trabajo y el monitor que vigila.",
      "Tres personas: ejecutor, monitor y un supervisor de KOF.",
      "Una sola persona, siempre que esté debidamente capacitada.",
      "No se especifica un número, solo se requiere un extintor cerca."
    ],
    correctAnswer: "Dos personas: el ejecutor que realiza el trabajo y el monitor que vigila."
  },
  {
    id: 9,
    section: 1,
    question: "De acuerdo con las normas de seguridad para el 'joggeo' de maquinaria, ¿qué práctica está estrictamente prohibida?",
    options: [
      "Que una persona accione el control mientras otra persona interviene el equipo.",
      "Realizar el joggeo a una velocidad reducida al 50% o inferior.",
      "Notificar al personal del área antes de iniciar el joggeo.",
      "Realizar el joggeo con las guardas de seguridad físicas correctamente colocadas."
    ],
    correctAnswer: "Que una persona accione el control mientras otra persona interviene el equipo."
  },
  {
    id: 10,
    section: 1,
    question: "Al utilizar una escalera de extensión para acceder a un nivel superior, esta debe sobrepasar el punto de apoyo. ¿Cuál es la distancia mínima requerida?",
    options: [
      "Debe estar exactamente al mismo nivel que el punto de acceso.",
      "La escalera no debe sobrepasar el punto de acceso para evitar tropiezos.",
      "Debe sobrepasar 50 cm.",
      "Debe sobrepasar 91 cm."
    ],
    correctAnswer: "Debe sobrepasar 91 cm."
  },
  // ========== SECCIÓN 2: INOCUIDAD (Preguntas 11-20) ==========
  {
    id: 11,
    section: 2,
    question: "¿Qué se entiende por Inocuidad Alimentaria?",
    options: [
      "Que el producto tenga buen sabor",
      "Que el producto cumpla con requisitos comerciales",
      "Que el producto y/o alimento no haga daño a la salud",
      "Que el producto tenga buena presentación"
    ],
    correctAnswer: "Que el producto y/o alimento no haga daño a la salud"
  },
  {
    id: 12,
    section: 2,
    question: "¿Qué sistema de certificación implementa Coca-Cola FEMSA para garantizar la inocuidad de sus productos?",
    options: ["ISO 9001", "HACCP", "FSSC 22000", "Industria Limpia"],
    correctAnswer: "FSSC 22000"
  },
  {
    id: 13,
    section: 2,
    question: "¿Qué normas conforman el esquema FSSC 22000?",
    options: [
      "ISO 14001, ISO 45001 y NOM-051",
      "ISO 22000, ISO/TS 22002-1 y requisitos adicionales de FSSC 22000",
      "HACCP y BPM",
      "ISO 9001 y ISO 14001"
    ],
    correctAnswer: "ISO 22000, ISO/TS 22002-1 y requisitos adicionales de FSSC 22000"
  },
  {
    id: 14,
    section: 2,
    question: "¿Qué es un peligro de inocuidad alimentaria según ISO 22000?",
    options: [
      "Cualquier situación incómoda para el consumidor",
      "Un agente biológico, químico o físico con potencial de causar daño a la salud",
      "Un error en el proceso productivo",
      "Un incumplimiento legal"
    ],
    correctAnswer: "Un agente biológico, químico o físico con potencial de causar daño a la salud"
  },
  {
    id: 15,
    section: 2,
    question: "¿Cuál de los siguientes es un ejemplo de peligro físico?",
    options: ["Detergentes", "Bacterias", "Vidrio", "Insecticidas"],
    correctAnswer: "Vidrio"
  },
  {
    id: 16,
    section: 2,
    question: "¿Qué son los Pre-requisitos (PPR) en Inocuidad Alimentaria?",
    options: [
      "Actividades opcionales para mejorar la calidad",
      "Condiciones y actividades básicas para mantener un ambiente higiénico",
      "Auditorías externas",
      "Indicadores de desempeño"
    ],
    correctAnswer: "Condiciones y actividades básicas para mantener un ambiente higiénico"
  },
  {
    id: 17,
    section: 2,
    question: "¿Cuál de las siguientes acciones corresponde a los Buenos Hábitos de Manufactura?",
    options: [
      "Usar joyería en áreas de proceso",
      "Consumir alimentos en cualquier área",
      "Usar correctamente cofia y cubrebocas",
      "Masticar chicle en planta"
    ],
    correctAnswer: "Usar correctamente cofia y cubrebocas"
  },
  {
    id: 18,
    section: 2,
    question: "¿Cuál es el objetivo del Manejo Integral de Plagas?",
    options: [
      "Eliminar todas las plagas con químicos",
      "Minimizar impactos a los procesos y garantizar productos seguros",
      "Mantener limpias solo las áreas externas",
      "Usar únicamente trampas mecánicas"
    ],
    correctAnswer: "Minimizar impactos a los procesos y garantizar productos seguros"
  },
  {
    id: 19,
    section: 2,
    question: "¿Qué acción ayuda a prevenir la contaminación cruzada?",
    options: [
      "Usar los mismos utensilios en todas las áreas",
      "Respetar rutas de tránsito del personal",
      "Mezclar ingredientes sin identificación",
      "Ignorar monitoreos ambientales"
    ],
    correctAnswer: "Respetar rutas de tránsito del personal"
  },
  {
    id: 20,
    section: 2,
    question: "¿Qué se debe hacer si se detecta personal no autorizado en áreas críticas?",
    options: [
      "No hacer nada",
      "Confrontarlo directamente",
      "Reportarlo inmediatamente al encargado del área de trabajo",
      "Retirarse del área"
    ],
    correctAnswer: "Reportarlo inmediatamente al encargado del área de trabajo"
  },
  // ========== SECCIÓN 3: AMBIENTAL (Preguntas 21-30) ==========
  {
    id: 21,
    section: 3,
    question: "¿Cuál es la definición correcta de medio ambiente según la presentación?",
    options: [
      "El entorno natural sin intervención humana",
      "Únicamente el aire, agua y suelo",
      "El entorno en el cual una planta opera, incluyendo aire, agua, suelo, recursos naturales, flora, fauna, seres humanos y sus interrelaciones",
      "Solo el área externa de la unidad operativa"
    ],
    correctAnswer: "El entorno en el cual una planta opera, incluyendo aire, agua, suelo, recursos naturales, flora, fauna, seres humanos y sus interrelaciones"
  },
  {
    id: 22,
    section: 3,
    question: "¿Qué es la certificación ISO 14001?",
    options: [
      "Un programa exclusivo para residuos peligrosos",
      "Una norma que regula únicamente el consumo de agua",
      "Una norma internacional que apoya la protección ambiental y la prevención de la contaminación",
      "Un plan de reciclaje obligatorio"
    ],
    correctAnswer: "Una norma internacional que apoya la protección ambiental y la prevención de la contaminación"
  },
  {
    id: 23,
    section: 3,
    question: "¿Cuáles son los principales aspectos ambientales identificados en la unidad operativa?",
    options: [
      "Ruido, iluminación y temperatura",
      "Agua, energía, residuos y aire",
      "Clima, fauna y suelo",
      "Transporte y tráfico"
    ],
    correctAnswer: "Agua, energía, residuos y aire"
  },
  {
    id: 24,
    section: 3,
    question: "¿Qué es la Matriz de Aspectos e Impactos Ambientales (MAIA)?",
    options: [
      "Un listado de residuos peligrosos",
      "Una herramienta para evaluar proveedores",
      "Un instrumento para identificar y evaluar aspectos e impactos ambientales",
      "Un plan de emergencias ambientales"
    ],
    correctAnswer: "Un instrumento para identificar y evaluar aspectos e impactos ambientales"
  },
  {
    id: 25,
    section: 3,
    question: "¿Cuál de los siguientes es un residuo orgánico según la clasificación KOF?",
    options: [
      "Latas de aluminio",
      "Botellas de vidrio",
      "Restos de comida sin envoltura",
      "Envases PET"
    ],
    correctAnswer: "Restos de comida sin envoltura"
  },
  {
    id: 26,
    section: 3,
    question: "¿Qué significa la sigla CRETIB en residuos peligrosos?",
    options: [
      "Corrosivo, Reactivo, Explosivo, Tóxico, Inflamable y Biológico-Infeccioso",
      "Contaminante, Reciclable, Ecológico, Tóxico, Inflamable y Biológico",
      "Corrosivo, Residual, Explosivo, Tóxico, Inflamable y Básico",
      "Químico, Reactivo, Explosivo, Tóxico, Inflamable y Biológico"
    ],
    correctAnswer: "Corrosivo, Reactivo, Explosivo, Tóxico, Inflamable y Biológico-Infeccioso"
  },
  {
    id: 27,
    section: 3,
    question: "¿Cuál de los siguientes residuos se considera peligroso?",
    options: [
      "Papel y cartón",
      "Restos de jardinería",
      "Aceite contaminado con amoniaco",
      "Botellas de vidrio"
    ],
    correctAnswer: "Aceite contaminado con amoniaco"
  },
  {
    id: 28,
    section: 3,
    question: "¿Qué práctica ayuda al uso eficiente de la energía?",
    options: [
      "Dejar encendidos los equipos en espera",
      "Apagar motores y transportadores cuando no estén en uso",
      "Usar más ventiladores",
      "Mantener enchufes conectados"
    ],
    correctAnswer: "Apagar motores y transportadores cuando no estén en uso"
  },
  {
    id: 29,
    section: 3,
    question: "¿Cuál es una buena práctica para prevenir la contaminación de aguas residuales?",
    options: [
      "Depositar sólidos pequeños en el drenaje",
      "Derramar aceites en coladeras",
      "Utilizar charolas de contención durante mantenimientos",
      "Lavar envases químicos en lavabos"
    ],
    correctAnswer: "Utilizar charolas de contención durante mantenimientos"
  },
  {
    id: 30,
    section: 3,
    question: "¿Qué debe hacerse en caso de un derrame de material peligroso?",
    options: [
      "Limpiarlo sin notificar",
      "Ignorarlo si es pequeño",
      "Notificar al encargado del área para activar el protocolo con personal capacitado",
      "Esperar a que se evapore"
    ],
    correctAnswer: "Notificar al encargado del área para activar el protocolo con personal capacitado"
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
  const [isBlocked, setIsBlocked] = useState(false); // Nuevo estado para bloqueo

  // Preparar preguntas con orden aleatorio por sección y opciones aleatorias
  const questionsWithShuffledOptions = useMemo(() => {
    // Agrupar preguntas por sección
    const section1 = EXAM_QUESTIONS.filter(q => q.section === 1);
    const section2 = EXAM_QUESTIONS.filter(q => q.section === 2);
    const section3 = EXAM_QUESTIONS.filter(q => q.section === 3);

    // Aleatorizar el orden de preguntas dentro de cada sección
    const shuffledSection1 = shuffleArray(section1);
    const shuffledSection2 = shuffleArray(section2);
    const shuffledSection3 = shuffleArray(section3);

    // Combinar todas las secciones y aleatorizar opciones de respuesta
    return [...shuffledSection1, ...shuffledSection2, ...shuffledSection3].map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
  }, []);

  // Obtener preguntas de una sección específica (ya están en orden aleatorio)
  const getQuestionsForSection = (sectionId) => {
    return questionsWithShuffledOptions.filter(q => q.section === sectionId);
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
      // No puede hacer el examen - mostrar pantalla de bloqueo
      setStatusError(status.message);
      setIsBlocked(true);
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
              10 preguntas de esta sección
            </p>
            <p className={`text-sm mt-2 ${colors.text}`}>
              <strong>Importante:</strong> Debes obtener mínimo 80% (8 de 10 correctas) en esta sección.
            </p>
          </div>

          <div className="space-y-8">
            {currentSectionQuestions.map((q, index) => (
              <div key={q.id} className="border-b border-gray-200 pb-6 last:border-0">
                <p className="font-medium text-gray-900 mb-4">
                  <span className={`${colors.text} font-bold`}>{index + 1}.</span> {q.question}
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

  // Renderizar pantalla de bloqueo
  const renderBlockedScreen = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          {/* Icono de bloqueo */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-6">
            <svg className="w-16 h-16 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Acceso Bloqueado
          </h1>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <p className="text-red-800 text-lg font-medium mb-2">
              {statusError || 'Has agotado tus 3 intentos.'}
            </p>
            <p className="text-red-700">
              Contacta al administrador para más información.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Información de contacto:</h3>
            <p className="text-gray-600 mb-2">
              <strong>Correo:</strong> seguridad@entersys.mx
            </p>
            <p className="text-gray-600">
              <strong>RFC registrado:</strong> {formData.rfc_colaborador?.toUpperCase()}
            </p>
          </div>

          <button
            onClick={() => navigate('/curso-seguridad')}
            className="w-full py-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );

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
              {isBlocked && 'Acceso Restringido'}
              {!isBlocked && currentStep === 1 && 'Registro de Datos'}
              {!isBlocked && currentStep === 2 && `Examen de Certificación - Sección ${currentSection}`}
              {!isBlocked && currentStep === 3 && 'Resultado del Examen'}
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
          {isBlocked && renderBlockedScreen()}
          {!isBlocked && currentStep === 1 && renderPersonalDataStep()}
          {!isBlocked && currentStep === 2 && renderExamStep()}
          {!isBlocked && currentStep === 3 && renderResultStep()}
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
