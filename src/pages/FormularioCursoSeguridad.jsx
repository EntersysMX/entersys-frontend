/**
 * FormularioCursoSeguridad.jsx
 * Formulario público de examen de seguridad con preguntas aleatorias.
 * Implementa Fisher-Yates shuffle para aleatorizar preguntas y opciones.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { config } from '../config/environment';

const API_BASE_URL = config.urls.api;

// Banco de 30 preguntas del examen - Se seleccionan 10 al azar cada vez
// IMPORTANTE: Los valores deben coincidir EXACTAMENTE con los PICKLIST de Smartsheet
const EXAM_QUESTIONS_BANK = [
  {
    id: 1,
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
    question: "Es un incidente que tuvo graves consecuencias para la persona:",
    options: [
      "SIF",
      "SIG",
      "CIS"
    ],
    correctAnswer: "SIF"
  },
  {
    id: 6,
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
    question: "Establecer zonas de seguridad y rutas de evacuación ¿es parte de las Reglas que Salvan Vidas?",
    options: [
      "Sí",
      "No"
    ],
    correctAnswer: "Sí"
  },
  {
    id: 8,
    question: "Es la principal prioridad de la compañía:",
    options: [
      "El desarrollo",
      "La seguridad",
      "La venta del producto"
    ],
    correctAnswer: "La seguridad"
  },
  {
    id: 9,
    question: "Un ejemplo de incidente es:",
    options: [
      "No usar casco",
      "Caída"
    ],
    correctAnswer: "Caída"
  },
  {
    id: 10,
    question: "La gravedad y frecuencia son factores para evaluar:",
    options: [
      "Incidente",
      "Peligro",
      "Riesgo"
    ],
    correctAnswer: "Riesgo"
  },
  {
    id: 11,
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
    question: "¿Cuál es el ancho mínimo que debe tener el tablón de apoyo en un andamio?",
    options: [
      "30 cm.",
      "50 cm.",
      "1 metro."
    ],
    correctAnswer: "50 cm."
  },
  {
    id: 18,
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
    question: "¿Qué deben hacer los contratistas con sus residuos generados?",
    options: [
      "Dejarlos en el lugar de trabajo para que limpieza los recoja.",
      "Retirarlos y disponerlos ellos mismos (especialmente si son peligrosos) o llevarlos al almacén correspondiente.",
      "Quemarlos en un área abierta."
    ],
    correctAnswer: "Retirarlos y disponerlos ellos mismos (especialmente si son peligrosos) o llevarlos al almacén correspondiente."
  },
  {
    id: 21,
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
    question: "¿Cuál es la calificación mínima aprobatoria requerida para el examen de inducción de contratistas en línea?",
    options: [
      "80%",
      "90%",
      "100%"
    ],
    correctAnswer: "90%"
  },
  {
    id: 27,
    question: "¿Qué sistema de certificación de inocuidad alimentaria implementa la planta para garantizar productos seguros?",
    options: [
      "ISO 9001",
      "FSSC 22000",
      "Industria Limpia Nivel 1"
    ],
    correctAnswer: "FSSC 22000"
  },
  {
    id: 28,
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
    question: "¿Cuál es el lineamiento para el manejo de residuos peligrosos generados por contratistas?",
    options: [
      "Pueden depositarse en los contenedores generales de la planta.",
      "Deben ser retirados y dispuestos por el propio contratista.",
      "Se deben dejar en el área de trabajo para que el personal de limpieza los recoja."
    ],
    correctAnswer: "Deben ser retirados y dispuestos por el propio contratista."
  }
];

// Fisher-Yates Shuffle
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Seleccionar N preguntas aleatorias del banco
const selectRandomQuestions = (questionsBank, count) => {
  const shuffled = shuffleArray(questionsBank);
  return shuffled.slice(0, count);
};

export default function FormularioCursoSeguridad() {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  // Seleccionar 10 preguntas aleatorias y aleatorizar sus opciones
  const shuffledQuestions = useMemo(() => {
    // Seleccionar 10 preguntas aleatorias del banco de 30
    const selectedQuestions = selectRandomQuestions(EXAM_QUESTIONS_BANK, 10);
    // Aleatorizar el orden de las opciones de cada pregunta
    return selectedQuestions.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
  }, []);

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
  };

  // Manejar selección de respuesta
  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  // Continuar al examen
  const handleContinueToExam = () => {
    if (validatePersonalData()) {
      setCurrentStep(2);
      window.scrollTo(0, 0);
    }
  };

  // Enviar examen
  const handleSubmit = async () => {
    // Verificar que todas las preguntas estén contestadas
    if (Object.keys(answers).length < 10) {
      alert('Por favor responde todas las preguntas antes de enviar.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar respuestas con is_correct
      const formattedAnswers = shuffledQuestions.map(q => ({
        question_id: q.id,
        answer: answers[q.id],
        is_correct: answers[q.id] === q.correctAnswer
      }));

      // Calcular score
      const correctCount = formattedAnswers.filter(a => a.is_correct).length;
      const score = (correctCount / 10) * 100;

      const payload = {
        ...formData,
        answers: formattedAnswers,
        score_frontend: score
      };

      const response = await fetch(`${API_BASE_URL}/v1/onboarding/submit-exam`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      setResult({
        ...data,
        localScore: score,
        correctCount
      });
      setCurrentStep(3);
      window.scrollTo(0, 0);

    } catch (error) {
      console.error('Error enviando examen:', error);
      alert('Error al enviar el examen. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Renderizar paso 1: Datos personales
  const renderPersonalDataStep = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Datos del Colaborador</h2>
        <p className="text-gray-600 mb-8">
          Complete la siguiente información antes de iniciar el examen de certificación.
        </p>

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
            className="w-full py-4 bg-[#D91E18] text-white font-semibold rounded-lg hover:bg-[#b81915] transition-colors"
          >
            Continuar al Examen
          </button>
        </div>
      </div>
    </div>
  );

  // Renderizar paso 2: Examen
  const renderExamStep = () => (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Examen de Seguridad</h2>
          <span className="text-sm text-gray-500">
            {Object.keys(answers).length} / 10 respondidas
          </span>
        </div>

        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800 text-sm">
            <strong>Importante:</strong> Debe obtener un mínimo de 85% (9 de 10 correctas) para aprobar.
            Las preguntas y opciones aparecen en orden aleatorio.
          </p>
        </div>

        <div className="space-y-8">
          {shuffledQuestions.map((q, index) => (
            <div key={q.id} className="border-b border-gray-200 pb-6 last:border-0">
              <p className="font-medium text-gray-900 mb-4">
                <span className="text-[#D91E18] font-bold">{index + 1}.</span> {q.question}
              </p>
              <div className="space-y-3">
                {q.options.map((option, optIndex) => (
                  <label
                    key={optIndex}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      answers[q.id] === option
                        ? 'border-[#D91E18] bg-red-50'
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

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => setCurrentStep(1)}
            className="flex-1 py-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Volver a Datos
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || Object.keys(answers).length < 10}
            className={`flex-1 py-4 font-semibold rounded-lg transition-colors ${
              isSubmitting || Object.keys(answers).length < 10
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#D91E18] text-white hover:bg-[#b81915]'
            }`}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Examen'}
          </button>
        </div>
      </div>
    </div>
  );

  // Renderizar paso 3: Resultado
  const renderResultStep = () => {
    const approved = result?.approved || result?.localScore >= 85;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Icono */}
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

          <div className="h-1 w-24 bg-[#FFC600] mx-auto rounded mb-6"></div>

          <h1 className={`text-4xl font-bold mb-4 ${approved ? 'text-green-600' : 'text-red-600'}`}>
            {approved ? '¡Felicidades!' : 'No Aprobado'}
          </h1>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-5xl font-bold text-gray-900 mb-2">
              {result?.score || result?.localScore}%
            </p>
            <p className="text-gray-600">
              {result?.correctCount || Math.round((result?.score || result?.localScore) / 10)} de 10 respuestas correctas
            </p>
          </div>

          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
            {approved
              ? 'Has completado exitosamente el examen de seguridad. Recibirás un correo con tu código QR de certificación.'
              : 'No alcanzaste el puntaje mínimo requerido (80%). Por favor revisa el material de capacitación y vuelve a intentarlo.'
            }
          </p>

          <div className={`inline-flex items-center px-6 py-3 rounded-full font-semibold mb-8 ${
            approved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {approved ? (
              <>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Examen Aprobado
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Requiere Repetir
              </>
            )}
          </div>

          {!approved && (
            <button
              onClick={() => {
                setAnswers({});
                setResult(null);
                setCurrentStep(2);
              }}
              className="px-8 py-3 bg-[#D91E18] text-white font-semibold rounded-lg hover:bg-[#b81915] transition-colors"
            >
              Intentar de Nuevo
            </button>
          )}
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
              {currentStep === 2 && 'Examen de Certificación'}
              {currentStep === 3 && 'Resultado del Examen'}
            </h1>
            <p className="text-red-100">
              Certificación de Seguridad Industrial - Coca-Cola FEMSA
            </p>
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
