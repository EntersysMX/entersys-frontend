/**
 * FormularioCursoSeguridad.jsx
 * Formulario de examen de seguridad con banco de 75 preguntas (25 por sección,
 * se muestran 10 aleatorias por sección) en 3 secciones.
 *
 * Secciones:
 * - Sección 1 (Seguridad): Pool de 25 preguntas, se muestran 10
 * - Sección 2 (Inocuidad): Pool de 25 preguntas, se muestran 10
 * - Sección 3 (Ambiental): Pool de 25 preguntas, se muestran 10
 *
 * Criterios de aprobación:
 * - Cada sección debe tener mínimo 80% (8/10 correctas)
 * - Máximo 3 intentos por RFC
 */

import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BiLogoFacebookCircle, BiLogoInstagram, BiLogoLinkedinSquare, BiLogoYoutube } from 'react-icons/bi';
import { config } from '../config/environment';

const API_BASE_URL = config.urls.api;

// Definición de las 3 secciones del examen
const EXAM_SECTIONS = [
  { id: 1, name: 'Seguridad', startQuestion: 1, endQuestion: 10, color: 'red' },
  { id: 2, name: 'Inocuidad', startQuestion: 11, endQuestion: 20, color: 'blue' },
  { id: 3, name: 'Ambiental', startQuestion: 21, endQuestion: 30, color: 'green' }
];

// Banco de 75 preguntas del examen (25 por sección, se muestran 10 aleatorias por sección)
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
  },
  // ========== SECCIÓN 1: SEGURIDAD - POOL ADICIONAL (Preguntas 31-45) ==========
  {
    id: 31,
    section: 1,
    question: "¿Cuál es la definición correcta de 'Peligro' según el curso de inducción de Coca-Cola FEMSA?",
    options: [
      "La combinación de la probabilidad y las consecuencias de un suceso específico.",
      "Un suceso relacionado con el trabajo en el que ocurre o podría ocurrir un daño físico.",
      "Fuente o situación potencial de daño en términos de lesiones o efectos negativos para la salud.",
      "La implementación de controles para mitigar la probabilidad de un accidente."
    ],
    correctAnswer: "Fuente o situación potencial de daño en términos de lesiones o efectos negativos para la salud."
  },
  {
    id: 32,
    section: 1,
    question: "En la metodología IPERC, ¿cuáles son los tres criterios principales para evaluar el riesgo?",
    options: [
      "Peligro, Consecuencia y Control.",
      "Gravedad, Exposición y Frecuencia.",
      "Costo, Tiempo y Calidad.",
      "Probabilidad, Impacto y Mitigación."
    ],
    correctAnswer: "Probabilidad, Impacto y Mitigación."
  },
  {
    id: 33,
    section: 1,
    question: "De acuerdo con la clasificación de eventos, ¿qué significa la sigla SIF?",
    options: [
      "Incidentes Serios o Fatalidades (Serious Injuries or Fatalities).",
      "Seguridad Industrial y de Fuego.",
      "Situaciones de Incidentes Frecuentes.",
      "Sistema de Inspección de Fábricas."
    ],
    correctAnswer: "Incidentes Serios o Fatalidades (Serious Injuries or Fatalities)."
  },
  {
    id: 34,
    section: 1,
    question: "Según la NOM-036-1-STPS-2018, ¿cuál es la masa máxima que puede levantar un trabajador masculino entre 18 y 45 años?",
    options: ["15 kg", "50 kg", "20 kg", "25 kg"],
    correctAnswer: "25 kg"
  },
  {
    id: 35,
    section: 1,
    question: "Para trabajos con equipo de oxicorte (oxiacetileno), ¿a qué distancia mínima deben colocarse los cilindros del lugar de corte?",
    options: ["15 metros", "11 metros", "3 metros", "6 metros"],
    correctAnswer: "6 metros"
  },
  {
    id: 36,
    section: 1,
    question: "¿Cuál es la función principal de un dispositivo GFCI según el curso?",
    options: [
      "Aumentar el voltaje para herramientas pesadas.",
      "Regular la temperatura de los tableros eléctricos.",
      "Protección contra choques eléctricos mediante la detección de fallas a tierra.",
      "Permitir la conexión de múltiples adaptadores en un solo enchufe."
    ],
    correctAnswer: "Protección contra choques eléctricos mediante la detección de fallas a tierra."
  },
  {
    id: 37,
    section: 1,
    question: "Bajo la Regla para Salvar Vidas número 8 (Trabajo Seguro en Sistemas Energizados), ¿cuál es el procedimiento obligatorio?",
    options: [
      "Procedimiento LOTO (Bloqueo y Etiquetado) para asegurar cero tensión.",
      "Mantener una distancia de 1 metro de los cables.",
      "Uso de guantes de carnaza y lentes de seguridad.",
      "Solicitar autorización verbal al jefe de área."
    ],
    correctAnswer: "Procedimiento LOTO (Bloqueo y Etiquetado) para asegurar cero tensión."
  },
  {
    id: 38,
    section: 1,
    question: "¿Cómo se define a un 'Contratista Regular' según la frecuencia de su trabajo?",
    options: [
      "Aquel que labora diariamente en el sitio reportando al personal de la instalación.",
      "Realiza trabajos en el sitio una vez o menos en seis meses.",
      "Realiza trabajos en el sitio más de una vez en seis meses.",
      "Contratado para una única tarea o proyecto específico."
    ],
    correctAnswer: "Realiza trabajos en el sitio más de una vez en seis meses."
  },
  {
    id: 39,
    section: 1,
    question: "En caso de emergencia, ¿qué indica un sonido de alarma CONTINUO?",
    options: [
      "Situación de Alerta (estar prevenidos).",
      "Fin de la emergencia y retorno seguro.",
      "Prueba de sistema de altavoces.",
      "Situación de Emergencia y evacuación inmediata del área."
    ],
    correctAnswer: "Situación de Emergencia y evacuación inmediata del área."
  },
  {
    id: 40,
    section: 1,
    question: "Para trabajos en alturas, ¿a partir de qué altura es obligatorio el uso de arnés de seguridad con línea de vida?",
    options: ["1.20 metros", "1.80 metros", "2.50 metros", "1.50 metros"],
    correctAnswer: "1.80 metros"
  },
  {
    id: 41,
    section: 1,
    question: "De acuerdo con el código de vestimenta para proveedores/ejecutores, ¿de qué color debe ser el casco de seguridad?",
    options: ["Verde", "Amarillo", "Rojo", "Blanco"],
    correctAnswer: "Amarillo"
  },
  {
    id: 42,
    section: 1,
    question: "¿Cuál de las siguientes es una prohibición estricta durante el proceso de 'Joggeo' (posicionamiento) de maquinaria?",
    options: [
      "Realizar el joggeo mientras otra persona interviene físicamente el equipo.",
      "Notificar al personal del área antes de iniciar.",
      "Reducir la velocidad del motor al 50%.",
      "Que la misma persona que controla el mando sea quien ejecute la actividad."
    ],
    correctAnswer: "Realizar el joggeo mientras otra persona interviene físicamente el equipo."
  },
  {
    id: 43,
    section: 1,
    question: "En el procedimiento LOTO, ¿cuál es el paso final antes de considerar que el bloqueo es efectivo?",
    options: [
      "Colocar la tarjeta de aviso.",
      "Cerciorar la efectividad del bloqueo mediante una prueba de arranque.",
      "Drenar las energías almacenadas.",
      "Firmar el permiso de trabajo."
    ],
    correctAnswer: "Cerciorar la efectividad del bloqueo mediante una prueba de arranque."
  },
  {
    id: 44,
    section: 1,
    question: "¿Cuál es el tiempo máximo de confirmación de una emergencia antes de proceder con el aviso masivo?",
    options: ["1 minuto", "5 minutos", "10 minutos", "2 minutos"],
    correctAnswer: "2 minutos"
  },
  {
    id: 45,
    section: 1,
    question: "¿Qué requisito debe cumplir un extintor para ser aceptado en un frente de trabajo de un contratista?",
    options: [
      "Haber sido recargado en la última semana.",
      "No tener manómetro para evitar fugas.",
      "Tener el nombre de la compañía contratista rotulado de forma permanente.",
      "Debe ser de tipo CO2 obligatoriamente."
    ],
    correctAnswer: "Tener el nombre de la compañía contratista rotulado de forma permanente."
  },
  // ========== SECCIÓN 2: INOCUIDAD - POOL ADICIONAL (Preguntas 46-60) ==========
  {
    id: 46,
    section: 2,
    question: "¿Qué se entiende por el término 'Inocuidad' según los estándares de Coca-Cola FEMSA?",
    options: [
      "La capacidad de la planta para producir sin generar residuos químicos en el drenaje.",
      "La garantía de que un producto o alimento no causará daño a la salud del consumidor.",
      "El cumplimiento estricto de los niveles de azúcar y gas en cada botella producida.",
      "La certificación que asegura que el envase es 100% reciclable y seguro para el ambiente."
    ],
    correctAnswer: "La garantía de que un producto o alimento no causará daño a la salud del consumidor."
  },
  {
    id: 47,
    section: 2,
    question: "¿Cuál es el sistema de Certificación de Inocuidad Alimentaria utilizado por la compañía?",
    options: ["ISO 14001", "FSSC 22000", "ISO 45001", "NOM-036-STPS"],
    correctAnswer: "FSSC 22000"
  },
  {
    id: 48,
    section: 2,
    question: "En el contexto de peligros de inocuidad, ¿cuál de los siguientes es un ejemplo de un peligro biológico?",
    options: [
      "Bacterias como Salmonella o Escherichia Coli.",
      "Residuos de lubricantes o detergentes en la línea.",
      "Fragmentos de vidrio provenientes de botellas rotas.",
      "Presencia de alérgenos como la soya o el trigo."
    ],
    correctAnswer: "Bacterias como Salmonella o Escherichia Coli."
  },
  {
    id: 49,
    section: 2,
    question: "¿Qué tipo de peligro de inocuidad representan las astillas de madera o los pedazos de metal encontrados en un producto?",
    options: [
      "Peligros Físicos",
      "Peligros Biológicos",
      "Peligros Ergonómicos",
      "Peligros Químicos"
    ],
    correctAnswer: "Peligros Físicos"
  },
  {
    id: 50,
    section: 2,
    question: "¿Cuál es la política correcta sobre el uso de objetos personales en las áreas de producción y almacenes?",
    options: [
      "Está prohibido el uso de joyería, relojes, piercings o botones arriba de la cintura.",
      "Se pueden portar plumas en las orejas para facilitar el registro de datos rápidamente.",
      "Solo se permite el uso de relojes si son necesarios para cronometrar procesos de limpieza.",
      "Se permite el uso de anillos de matrimonio siempre que estén cubiertos con guantes."
    ],
    correctAnswer: "Está prohibido el uso de joyería, relojes, piercings o botones arriba de la cintura."
  },
  {
    id: 51,
    section: 2,
    question: "¿Qué debe hacer un colaborador si presenta síntomas como vómito, diarrea o heridas abiertas antes de iniciar su jornada?",
    options: [
      "Reportar inmediatamente su estado de salud al servicio médico o a su jefe directo.",
      "Cubrir las heridas con cinta industrial y continuar trabajando para no afectar la productividad.",
      "Tomar un medicamento por cuenta propia y evitar comentarlo para no ser enviado a casa.",
      "Ingresar a las áreas de proceso usando un cubrebocas doble para compensar los síntomas."
    ],
    correctAnswer: "Reportar inmediatamente su estado de salud al servicio médico o a su jefe directo."
  },
  {
    id: 52,
    section: 2,
    question: "¿Cuál es el objetivo principal del programa de 'Defensa de los Alimentos' (Food Defense)?",
    options: [
      "Asegurar que el producto tenga un sabor consistente en todas las unidades operativas.",
      "Detectar y eliminar ataques maliciosos intencionados como sabotaje o bioterrorismo.",
      "Capacitar a los brigadistas en el uso de extintores para proteger las bodegas de insumos.",
      "Garantizar que los proveedores entreguen materias primas con certificados de calidad."
    ],
    correctAnswer: "Detectar y eliminar ataques maliciosos intencionados como sabotaje o bioterrorismo."
  },
  {
    id: 53,
    section: 2,
    question: "En la rotación de existencias en almacenes, ¿qué principio asegura que el producto que vence primero sea el primero en salir?",
    options: [
      "FEFO (First Expired, First Out)",
      "JIT (Just In Time)",
      "LIFO (Last In, First Out)",
      "FIFO (First In, First Out)"
    ],
    correctAnswer: "FEFO (First Expired, First Out)"
  },
  {
    id: 54,
    section: 2,
    question: "¿Cuál de los siguientes grupos representa alérgenos comunes que deben controlarse para evitar la contaminación cruzada?",
    options: [
      "Sal, ácido cítrico y saborizantes naturales.",
      "Carne de res, pollo, arroz y zanahorias.",
      "Leche, huevos, pescado, nueces y soya.",
      "Agua, dióxido de carbono y jarabe de alta fructosa."
    ],
    correctAnswer: "Leche, huevos, pescado, nueces y soya."
  },
  {
    id: 55,
    section: 2,
    question: "¿Cómo debe ser el manejo de los utensilios de limpieza para evitar la contaminación cruzada microbiológica?",
    options: [
      "Lavar todos los utensilios con agua caliente una vez al mes para desinfectarlos.",
      "Guardar los utensilios de limpieza dentro de las salas de jarabes para tenerlos a la mano.",
      "Utilizar utensilios que sigan un código de colores definido para cada área específica.",
      "Compartir los mismos trapeadores en todas las áreas para optimizar el recurso de limpieza."
    ],
    correctAnswer: "Utilizar utensilios que sigan un código de colores definido para cada área específica."
  },
  {
    id: 56,
    section: 2,
    question: "En relación al Manejo Integral de Plagas, ¿cuál es una responsabilidad directa del personal operativo?",
    options: [
      "Mover las trampas de roedores para que no estorben durante las maniobras de carga.",
      "Limpiar con agua a presión el interior de las lámparas de luz UV para eliminar insectos.",
      "Aplicar insecticidas químicos personalmente cuando vean un insecto en su área.",
      "Mantener las puertas de acceso cerradas y reportar cualquier avistamiento de plaga."
    ],
    correctAnswer: "Mantener las puertas de acceso cerradas y reportar cualquier avistamiento de plaga."
  },
  {
    id: 57,
    section: 2,
    question: "¿Qué requisito adicional de la versión 6 de FSSC 22000 se enfoca en prevenir la alteración o sustitución intencionada de alimentos por razones económicas?",
    options: [
      "Prevención del Fraude Alimentario",
      "Gestión de los Servicios",
      "Control de Calidad",
      "Cultura de Inocuidad"
    ],
    correctAnswer: "Prevención del Fraude Alimentario"
  },
  {
    id: 58,
    section: 2,
    question: "¿Cuál es una medida obligatoria de higiene personal para quienes ingresan a zonas de proceso con vello facial (barba o bigote)?",
    options: [
      "Aplicarse gel fijador para asegurar que el vello no se desprenda durante la jornada.",
      "Solo es necesario usar cubrebocas normal si el bigote es corto.",
      "Usar una protección limpia (cubrebaba) que cubra totalmente el vello facial.",
      "Recortar el vello facial al menos una vez por semana como única medida."
    ],
    correctAnswer: "Usar una protección limpia (cubrebaba) que cubra totalmente el vello facial."
  },
  {
    id: 59,
    section: 2,
    question: "En el control de químicos, ¿qué se debe verificar respecto a los productos de calderas y aceites de compresores en áreas de proceso?",
    options: [
      "Que sean obligatoriamente de grado alimenticio.",
      "Que tengan el color más llamativo posible para detectar fugas rápidamente.",
      "Que sean almacenados junto a los ingredientes para facilitar su aplicación.",
      "Que no tengan olor para que el personal no se distraiga durante la operación."
    ],
    correctAnswer: "Que sean obligatoriamente de grado alimenticio."
  },
  {
    id: 60,
    section: 2,
    question: "De acuerdo con los Buenos Hábitos de Manufactura, ¿qué acción está prohibida respecto al consumo de alimentos y bebidas?",
    options: [
      "Consumir alimentos, mascar chicle o fumar dentro de las áreas operativas.",
      "Tomar agua exclusivamente en vasos de vidrio transparentes cerca de la línea.",
      "Mascar chicle siempre y cuando se use el cubrebocas correctamente colocado.",
      "Guardar el almuerzo dentro de los lockers de herramientas para ahorrar tiempo."
    ],
    correctAnswer: "Consumir alimentos, mascar chicle o fumar dentro de las áreas operativas."
  },
  // ========== SECCIÓN 3: AMBIENTAL - POOL ADICIONAL (Preguntas 61-75) ==========
  {
    id: 61,
    section: 3,
    question: "¿Cuál es el objetivo principal del programa de certificación 'Residuo Cero' en las plantas de Coca-Cola FEMSA?",
    options: [
      "Prohibir el uso de cualquier material plástico dentro de las instalaciones.",
      "Valorizar los residuos para evitar que terminen en rellenos sanitarios.",
      "Incentivar la incineración de todos los desechos para generar calor.",
      "Reducir los costos de producción mediante la compra de insumos usados."
    ],
    correctAnswer: "Valorizar los residuos para evitar que terminen en rellenos sanitarios."
  },
  {
    id: 62,
    section: 3,
    question: "De acuerdo con los conceptos de la norma ISO 14001, ¿qué representa un 'Aspecto Ambiental'?",
    options: [
      "Una ley obligatoria emitida por el gobierno federal.",
      "Elemento de las actividades o productos que interactúa con el medio ambiente.",
      "El daño económico causado por un desastre natural.",
      "El efecto o cambio resultante en el medio ambiente."
    ],
    correctAnswer: "Elemento de las actividades o productos que interactúa con el medio ambiente."
  },
  {
    id: 63,
    section: 3,
    question: "¿Qué siglas se utilizan para identificar las características que definen a un residuo como peligroso?",
    options: ["CRETI", "MAIA", "ASPECTO", "CRETIB"],
    correctAnswer: "CRETIB"
  },
  {
    id: 64,
    section: 3,
    question: "En el manejo de materiales peligrosos, ¿qué capacidad mínima debe tener un dique de contención secundaria?",
    options: [
      "El 50% del volumen total almacenado en el área.",
      "Exactamente el 100% de la suma de todos los contenedores.",
      "El 110% del volumen del contenedor más grande del área.",
      "Un volumen estándar de 200 litros para cualquier sustancia."
    ],
    correctAnswer: "El 110% del volumen del contenedor más grande del área."
  },
  {
    id: 65,
    section: 3,
    question: "¿En qué categoría se deben clasificar los residuos de 'emplaye' (película plástica) y fleje según los lineamientos de la compañía?",
    options: [
      "Plásticos / Emplaye.",
      "Papel y Cartón.",
      "Residuos de Manejo Especial.",
      "Inorgánicos generales."
    ],
    correctAnswer: "Plásticos / Emplaye."
  },
  {
    id: 66,
    section: 3,
    question: "¿Cuál de los siguientes es un ejemplo de un 'Impacto Ambiental' según la capacitación?",
    options: [
      "Consumo de combustibles fósiles.",
      "Generación de emisiones a la atmósfera.",
      "Contaminación del agua.",
      "Uso de energía renovable."
    ],
    correctAnswer: "Contaminación del agua."
  },
  {
    id: 67,
    section: 3,
    question: "¿Cuál es una práctica prohibida en el manejo de aguas residuales para evitar la contaminación de drenajes?",
    options: [
      "Separar los residuos sólidos de las rejillas de drenaje.",
      "Depositar únicamente agua de limpieza de pisos.",
      "Verter aceites, grasas o químicos en coladeras y lavabos.",
      "Instalar charolas de contención en áreas de mantenimiento."
    ],
    correctAnswer: "Verter aceites, grasas o químicos en coladeras y lavabos."
  },
  {
    id: 68,
    section: 3,
    question: "¿Cómo se determina la prioridad de un aspecto ambiental en la matriz MAIA?",
    options: [
      "Multiplicando la Probabilidad por la Magnitud (Impacto + Entorno).",
      "Basándose únicamente en la opinión del gerente de planta.",
      "Contando el número de quejas recibidas de la comunidad.",
      "Sumando el volumen de residuos generados por mes."
    ],
    correctAnswer: "Multiplicando la Probabilidad por la Magnitud (Impacto + Entorno)."
  },
  {
    id: 69,
    section: 3,
    question: "¿Qué documento es estrictamente necesario para el ingreso y manejo de cualquier sustancia química por parte de un contratista?",
    options: [
      "Una fotografía del envase original del proveedor.",
      "El manual de operación del equipo que utilizará el químico.",
      "La factura de compra que demuestre que el producto es nuevo.",
      "La Hoja de Datos de Seguridad (HDS) con pictogramas correspondientes."
    ],
    correctAnswer: "La Hoja de Datos de Seguridad (HDS) con pictogramas correspondientes."
  },
  {
    id: 70,
    section: 3,
    question: "Dentro de la clasificación de residuos peligrosos generados en mantenimiento, ¿en qué categoría entran las lámparas y balastros usados?",
    options: [
      "Vidrio común.",
      "Chatarra metálica.",
      "Inorgánicos no reciclables.",
      "Residuos Peligrosos."
    ],
    correctAnswer: "Residuos Peligrosos."
  },
  {
    id: 71,
    section: 3,
    question: "¿Cuál es la norma oficial mexicana que establece el procedimiento para identificar y clasificar los residuos peligrosos?",
    options: [
      "NOM-001-SEMARNAT-2021",
      "NOM-085-SEMARNAT-2011",
      "NOM-081-SEMARNAT-1994",
      "NOM-052-SEMARNAT-2005"
    ],
    correctAnswer: "NOM-052-SEMARNAT-2005"
  },
  {
    id: 72,
    section: 3,
    question: "En el uso eficiente de la energía, ¿cuál de las siguientes acciones es responsabilidad del personal operativo y contratista?",
    options: [
      "Eliminar los sensores de movimiento de las luminarias para que siempre haya luz.",
      "Modificar la programación de los PLC para acelerar la producción.",
      "Reportar fugas de aire comprimido y apagar equipos que no estén en uso.",
      "Aumentar la temperatura de los aires acondicionados al máximo en verano."
    ],
    correctAnswer: "Reportar fugas de aire comprimido y apagar equipos que no estén en uso."
  },
  {
    id: 73,
    section: 3,
    question: "¿Qué se debe hacer con los residuos de comida y restos de jardinería?",
    options: [
      "Colocarlos en el área de chatarra para su retiro.",
      "Depositarlos en el contenedor de Residuos Orgánicos.",
      "Mezclarlos con el papel y cartón para su degradación.",
      "Incinerarlos en un área abierta de la planta."
    ],
    correctAnswer: "Depositarlos en el contenedor de Residuos Orgánicos."
  },
  {
    id: 74,
    section: 3,
    question: "¿Cuál es la función del Almacén Temporal de Residuos Peligrosos (ATRP)?",
    options: [
      "Almacenar el exceso de producto terminado para la venta.",
      "Funcionar como comedor alterno para el personal de limpieza.",
      "Resguardar los residuos peligrosos de forma segura hasta su recolección oficial.",
      "Servir como depósito final donde los residuos se quedan permanentemente."
    ],
    correctAnswer: "Resguardar los residuos peligrosos de forma segura hasta su recolección oficial."
  },
  {
    id: 75,
    section: 3,
    question: "¿Cómo contribuye el correcto re-abastecimiento y reutilización de agua a la sostenibilidad del negocio?",
    options: [
      "Es un requisito que solo aplica si la planta se queda sin presupuesto.",
      "Disminuye la explotación de recursos naturales y asegura el abasto futuro.",
      "Aumenta el sabor del producto final mediante el uso de agua reciclada.",
      "Permite que la planta funcione sin necesidad de permisos legales."
    ],
    correctAnswer: "Disminuye la explotación de recursos naturales y asegura el abasto futuro."
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
    email: '',
    email_confirm: ''
  });

  // Estado para foto de credencial (captura con cámara)
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [showPermissionHelp, setShowPermissionHelp] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

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
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
  const [examKey, setExamKey] = useState(0); // Para re-aleatorizar preguntas en reintentos

  // Preparar preguntas: seleccionar 10 aleatorias de cada pool de 25 y aleatorizar opciones
  const questionsWithShuffledOptions = useMemo(() => {
    // Seleccionar 10 preguntas aleatorias de cada pool de 25
    const section1 = shuffleArray(EXAM_QUESTIONS.filter(q => q.section === 1)).slice(0, 10);
    const section2 = shuffleArray(EXAM_QUESTIONS.filter(q => q.section === 2)).slice(0, 10);
    const section3 = shuffleArray(EXAM_QUESTIONS.filter(q => q.section === 3)).slice(0, 10);

    // Renumerar IDs: Seguridad 1-10, Inocuidad 11-20, Ambiental 21-30
    const renumbered = [
      ...section1.map((q, i) => ({ ...q, id: i + 1 })),
      ...section2.map((q, i) => ({ ...q, id: i + 11 })),
      ...section3.map((q, i) => ({ ...q, id: i + 21 }))
    ];

    return renumbered.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
  }, [examKey]);

  // Obtener preguntas de una sección específica (ya están en orden aleatorio)
  const getQuestionsForSection = (sectionId) => {
    return questionsWithShuffledOptions.filter(q => q.section === sectionId);
  };

  // Contar respuestas por sección
  const getAnsweredCountForSection = (sectionId) => {
    const sectionQuestions = getQuestionsForSection(sectionId);
    return sectionQuestions.filter(q => answers[q.id]).length;
  };

  // Regex para validación de RFC mexicano (persona física 13 chars, moral 12 chars)
  const RFC_REGEX = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/i;

  // Validar datos personales
  const validatePersonalData = () => {
    const newErrors = {};

    // Nombre: requerido + solo letras, espacios y acentos
    if (!formData.nombre_completo.trim()) {
      newErrors.nombre_completo = 'El nombre es obligatorio';
    } else if (!/^[\p{L}\s]+$/u.test(formData.nombre_completo.trim())) {
      newErrors.nombre_completo = 'El nombre solo debe contener letras y espacios';
    }

    // RFC Colaborador: requerido + regex mexicano + 12 o 13 chars
    if (!formData.rfc_colaborador.trim()) {
      newErrors.rfc_colaborador = 'El RFC es obligatorio';
    } else {
      const rfcVal = formData.rfc_colaborador.trim().toUpperCase();
      if (rfcVal.length !== 12 && rfcVal.length !== 13) {
        newErrors.rfc_colaborador = 'El RFC debe tener 12 o 13 caracteres';
      } else if (!RFC_REGEX.test(rfcVal)) {
        newErrors.rfc_colaborador = 'Formato de RFC inválido (ej: PEGJ850101XXX)';
      }
    }

    // RFC Empresa: requerido + validar formato
    if (!formData.rfc_empresa.trim()) {
      newErrors.rfc_empresa = 'El RFC de la empresa es obligatorio';
    } else {
      const rfcEmpVal = formData.rfc_empresa.trim().toUpperCase();
      if (rfcEmpVal.length !== 12 && rfcEmpVal.length !== 13) {
        newErrors.rfc_empresa = 'El RFC debe tener 12 o 13 caracteres';
      } else if (!RFC_REGEX.test(rfcEmpVal)) {
        newErrors.rfc_empresa = 'Formato de RFC inválido';
      }
    }

    // NSS: requerido + exactamente 11 dígitos
    if (!formData.nss.trim()) {
      newErrors.nss = 'El NSS es obligatorio';
    } else if (!/^\d{11}$/.test(formData.nss.trim())) {
      newErrors.nss = 'El NSS debe ser exactamente 11 dígitos numéricos';
    }

    // Tipo de servicio: requerido
    if (!formData.tipo_servicio.trim()) {
      newErrors.tipo_servicio = 'El tipo de servicio es obligatorio';
    }

    // Proveedor: requerido
    if (!formData.proveedor.trim()) {
      newErrors.proveedor = 'El proveedor es obligatorio';
    }

    // Email: requerido + validación estricta
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(formData.email.trim())) {
      newErrors.email = 'Ingresa un email válido';
    }

    // Email confirmación: debe coincidir con email
    if (!formData.email_confirm.trim()) {
      newErrors.email_confirm = 'Confirma tu correo electrónico';
    } else if (formData.email.trim().toLowerCase() !== formData.email_confirm.trim().toLowerCase()) {
      newErrors.email_confirm = 'Los correos electrónicos no coinciden';
    }

    // Foto de credencial: requerida
    if (!photoFile) {
      newErrors.photo = 'La foto de credencial es obligatoria';
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

  // Detectar navegador y dispositivo
  const getBrowserName = useCallback(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('edg')) return 'edge';
    if (userAgent.includes('chrome')) return 'chrome';
    if (userAgent.includes('firefox')) return 'firefox';
    if (userAgent.includes('safari')) return 'safari';
    return 'otro';
  }, []);

  const isMobile = useCallback(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);

  const isIOS = useCallback(() => {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  }, []);

  // Iniciar cámara
  const startCamera = useCallback(async () => {
    setCameraError(null);
    setShowPermissionHelp(false);

    try {
      // Verificar el estado actual del permiso para logging
      let permissionStatus = 'unknown';
      try {
        if (navigator.permissions && navigator.permissions.query) {
          const result = await navigator.permissions.query({ name: 'camera' });
          permissionStatus = result.state;
        }
      } catch (e) {
        permissionStatus = 'query-not-supported';
      }

      console.log('=== DIAGNÓSTICO DE CÁMARA ===');
      console.log('Estado del permiso:', permissionStatus);
      console.log('Navegador:', navigator.userAgent);
      console.log('Es móvil:', isMobile());
      console.log('Protocolo:', window.location.protocol);


      // Si el permiso ya está denegado, mostrar mensaje específico
      if (permissionStatus === 'denied') {
        console.log('⚠️ El permiso de cámara está BLOQUEADO. El usuario debe habilitarlo manualmente.');
        setCameraError('El permiso de cámara está bloqueado. Debes habilitarlo manualmente en la configuración del navegador.');
        setShowPermissionHelp(true);
        return;
      }

      // Configuración optimizada para móviles y escritorio
      const constraints = {
        video: {
          facingMode: 'user', // Cámara frontal
          width: { ideal: isMobile() ? 480 : 640 },
          height: { ideal: isMobile() ? 640 : 800 }
        },
        audio: false
      };

      console.log('Solicitando acceso a cámara con constraints:', JSON.stringify(constraints));
      console.log('El navegador debería mostrar el diálogo nativo ahora...');

      // Llamar a getUserMedia - esto mostrará el diálogo nativo del navegador
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('✅ Acceso a cámara concedido!');

      streamRef.current = stream;
      // Primero activamos la cámara para que el elemento video se renderice
      setIsCameraActive(true);

      // Usamos setTimeout para esperar a que el video se renderice
      setTimeout(() => {
        if (videoRef.current && streamRef.current) {
          videoRef.current.srcObject = streamRef.current;
          videoRef.current.play().catch(err => {
            console.log('Autoplay handled by browser:', err.message);
          });
        }
      }, 100);
    } catch (err) {
      console.error('Error al acceder a la cámara:', err.name, err.message);

      // Intentar con constraints más simples primero
      if (err.name === 'OverconstrainedError' || err.name === 'ConstraintNotSatisfiedError') {
        try {
          const simpleStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          streamRef.current = simpleStream;
          setIsCameraActive(true);
          setTimeout(() => {
            if (videoRef.current && streamRef.current) {
              videoRef.current.srcObject = streamRef.current;
              videoRef.current.play().catch(err => console.log('Autoplay:', err.message));
            }
          }, 100);
          return;
        } catch (e) {
          console.error('Error con constraints simples:', e.name, e.message);
        }
      }

      // Manejar errores específicos
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setShowPermissionHelp(true);
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('No se encontró ninguna cámara en tu dispositivo.');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setCameraError('La cámara está ocupada. Cierra otras apps que la usen e intenta de nuevo.');
      } else if (err.name === 'AbortError') {
        setCameraError('Se canceló el acceso a la cámara. Intenta de nuevo.');
      } else if (err.name === 'SecurityError') {
        setCameraError('Error de seguridad. Asegúrate de usar HTTPS.');
      } else if (err.name === 'TypeError') {
        setCameraError('Tu navegador no soporta acceso a la cámara.');
      } else {
        // Mostrar error real para diagnóstico
        setCameraError(`Error: ${err.name || 'Desconocido'} - ${err.message || 'Intenta recargar la página'}`);
      }
    }
  }, [isMobile]);

  // Detener cámara
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  }, []);

  // Capturar foto desde el video
  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Configurar canvas con las dimensiones del video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    // Voltear horizontalmente para efecto espejo
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);

    // Convertir canvas a blob
    canvas.toBlob((blob) => {
      if (blob) {
        // Crear archivo desde blob
        const file = new File([blob], `foto_${Date.now()}.jpg`, { type: 'image/jpeg' });
        setPhotoFile(file);
        setPhotoPreview(canvas.toDataURL('image/jpeg', 0.9));
        setErrors(prev => ({ ...prev, photo: null }));
        stopCamera();
      }
    }, 'image/jpeg', 0.9);
  }, [stopCamera]);

  // Eliminar foto y permitir tomar otra
  const handleRemovePhoto = useCallback(() => {
    setPhotoFile(null);
    setPhotoPreview(null);
  }, []);

  // Limpiar cámara al desmontar componente
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Subir foto a GCS
  const uploadPhoto = async () => {
    if (!photoFile || !formData.rfc_colaborador) return null;

    setIsUploadingPhoto(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', photoFile);
      formDataUpload.append('rfc', formData.rfc_colaborador.toUpperCase());

      const response = await fetch(`${API_BASE_URL}/v1/onboarding/upload-photo`, {
        method: 'POST',
        body: formDataUpload
      });

      if (!response.ok) {
        throw new Error('Error al subir la foto');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Error subiendo foto:', error);
      setErrors(prev => ({ ...prev, photo: 'Error al subir la foto. Intenta de nuevo.' }));
      return null;
    } finally {
      setIsUploadingPhoto(false);
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
      // Subir foto primero si existe
      let photoUrl = null;
      if (photoFile) {
        photoUrl = await uploadPhoto();
        if (!photoUrl) {
          // Si falla la subida de foto, continuar sin ella
          console.warn('No se pudo subir la foto, continuando sin ella');
        }
      }

      // Preparar respuestas con is_correct
      const formattedAnswers = questionsWithShuffledOptions.map(q => ({
        question_id: q.id,
        answer: answers[q.id] || '',
        is_correct: answers[q.id] === q.correctAnswer
      }));

      // Excluir email_confirm del payload enviado al backend
      const { email_confirm, ...formDataWithoutConfirm } = formData;
      const payload = {
        ...formDataWithoutConfirm,
        url_imagen: photoUrl,
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
    setExamKey(prev => prev + 1); // Nueva selección aleatoria de preguntas
    setCurrentStep(2);
    setCurrentSection(1);
    window.scrollTo(0, 0);
  };

  // Volver a ver el video
  const handleWatchVideo = () => {
    navigate('/curso-seguridad');
  };

  // Descargar certificado PDF
  const handleDownloadPDF = async () => {
    if (!formData.rfc_colaborador) return;

    setIsDownloadingPDF(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/v1/onboarding/download-certificate/${formData.rfc_colaborador.toUpperCase()}`
      );

      if (!response.ok) {
        throw new Error('Error al generar el PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificado_${formData.rfc_colaborador.toUpperCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error descargando PDF:', error);
      alert('Error al descargar el certificado PDF. Intenta de nuevo.');
    } finally {
      setIsDownloadingPDF(false);
    }
  };

  // Bloquear copiar/pegar en campo de confirmación de email
  const handleBlockPaste = (e) => {
    e.preventDefault();
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

          {/* RFC Empresa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              RFC de la Empresa <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="rfc_empresa"
              value={formData.rfc_empresa}
              onChange={handleInputChange}
              maxLength={13}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#D91E18] focus:border-transparent uppercase ${
                errors.rfc_empresa ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="EMP850101XXX"
            />
            {errors.rfc_empresa && (
              <p className="mt-1 text-sm text-red-500">{errors.rfc_empresa}</p>
            )}
          </div>

          {/* NSS */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NSS del Colaborador <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nss"
              value={formData.nss}
              onChange={handleInputChange}
              maxLength={11}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#D91E18] focus:border-transparent ${
                errors.nss ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="12345678901"
            />
            {errors.nss && (
              <p className="mt-1 text-sm text-red-500">{errors.nss}</p>
            )}
          </div>

          {/* Tipo de Servicio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Servicio <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="tipo_servicio"
              value={formData.tipo_servicio}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#D91E18] focus:border-transparent ${
                errors.tipo_servicio ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: Mantenimiento, Limpieza, Seguridad, etc."
            />
            {errors.tipo_servicio && (
              <p className="mt-1 text-sm text-red-500">{errors.tipo_servicio}</p>
            )}
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

          {/* Confirmar Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Correo Electrónico <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email_confirm"
              value={formData.email_confirm}
              onChange={handleInputChange}
              onPaste={handleBlockPaste}
              onCopy={handleBlockPaste}
              onCut={handleBlockPaste}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#D91E18] focus:border-transparent ${
                errors.email_confirm ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Vuelve a escribir tu correo"
            />
            {errors.email_confirm && (
              <p className="mt-1 text-sm text-red-500">{errors.email_confirm}</p>
            )}
            <p className="mt-1 text-xs text-gray-400">Escribe tu correo nuevamente para confirmar. No se permite copiar y pegar.</p>
          </div>

          {/* Foto para Credencial */}
          <div className="pt-6 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto para Credencial de Acceso <span className="text-red-500">*</span>
            </label>

            {/* Requisitos de la foto */}
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-800 mb-2">Para tomar tu foto:</p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Ubícate en un lugar con buena iluminación
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Centra tu rostro (sin lentes oscuros ni gorra)
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Busca un fondo liso (preferentemente claro)
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Permite el acceso a la cámara cuando se solicite
                </li>
              </ul>
            </div>

            {/* Canvas oculto para captura */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Modal de ayuda para permisos de cámara */}
            {showPermissionHelp && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Permitir acceso a la cámara</h3>
                      <button
                        onClick={() => setShowPermissionHelp(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800 font-medium mb-1">
                        El permiso de cámara está BLOQUEADO
                      </p>
                      <p className="text-xs text-red-700">
                        El navegador no puede mostrar el diálogo de permiso porque fue bloqueado anteriormente.
                        Debes habilitarlo manualmente siguiendo los pasos de abajo.
                      </p>
                      {cameraError && (
                        <p className="text-xs text-red-600 mt-2 font-mono bg-red-100 p-1 rounded">
                          {cameraError}
                        </p>
                      )}
                    </div>

                    {/* Instrucciones para Chrome/Edge */}
                    {(getBrowserName() === 'chrome' || getBrowserName() === 'edge') && (
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-700">Sigue estos pasos:</p>
                        <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                          <li>Haz clic en el icono de candado <span className="inline-flex items-center px-1 py-0.5 bg-gray-100 rounded text-xs">🔒</span> en la barra de direcciones</li>
                          <li>Busca la opción <strong>"Cámara"</strong></li>
                          <li>Cámbiala a <strong>"Permitir"</strong></li>
                          <li>Recarga la página o haz clic en "Reintentar"</li>
                        </ol>
                        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                          <p className="text-xs text-gray-500 mb-2">O copia esta dirección en tu navegador:</p>
                          <code className="text-xs bg-white px-2 py-1 rounded border block break-all">
                            {getBrowserName() === 'chrome' ? 'chrome://settings/content/camera' : 'edge://settings/content/camera'}
                          </code>
                        </div>
                      </div>
                    )}

                    {/* Instrucciones para Firefox */}
                    {getBrowserName() === 'firefox' && (
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-700">Sigue estos pasos:</p>
                        <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                          <li>Haz clic en el icono de escudo/candado en la barra de direcciones</li>
                          <li>Haz clic en <strong>"Permisos"</strong></li>
                          <li>Busca <strong>"Usar la cámara"</strong> y haz clic en la X para quitar el bloqueo</li>
                          <li>Recarga la página o haz clic en "Reintentar"</li>
                        </ol>
                      </div>
                    )}

                    {/* Instrucciones para Safari */}
                    {getBrowserName() === 'safari' && (
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-700">Sigue estos pasos:</p>
                        <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                          <li>Ve a <strong>Safari → Preferencias → Sitios web</strong></li>
                          <li>Selecciona <strong>"Cámara"</strong> en el menú izquierdo</li>
                          <li>Busca este sitio y cámbialo a <strong>"Permitir"</strong></li>
                          <li>Recarga la página</li>
                        </ol>
                      </div>
                    )}

                    {/* Instrucciones genéricas */}
                    {getBrowserName() === 'otro' && !isMobile() && (
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-700">Sigue estos pasos:</p>
                        <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                          <li>Busca el icono de candado o configuración en la barra de direcciones</li>
                          <li>Busca los permisos del sitio o configuración de cámara</li>
                          <li>Permite el acceso a la cámara para este sitio</li>
                          <li>Recarga la página</li>
                        </ol>
                      </div>
                    )}

                    {/* Instrucciones para iOS (iPhone/iPad) */}
                    {isIOS() && (
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-700">En tu iPhone/iPad:</p>
                        <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                          <li>Abre <strong>Configuración</strong> (⚙️) de tu dispositivo</li>
                          <li>Busca <strong>Safari</strong> (o el navegador que uses)</li>
                          <li>Toca <strong>Cámara</strong></li>
                          <li>Selecciona <strong>"Permitir"</strong></li>
                          <li>Regresa aquí y toca "Reintentar"</li>
                        </ol>
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <p className="text-xs text-blue-700">
                            💡 También puedes tocar el icono <strong>"aA"</strong> en la barra de Safari y seleccionar "Configuración del sitio web"
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Instrucciones para Android */}
                    {isMobile() && !isIOS() && (
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-700">En tu dispositivo Android:</p>
                        <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                          <li>Toca el icono de <strong>candado 🔒</strong> en la barra de direcciones</li>
                          <li>Toca <strong>"Permisos"</strong></li>
                          <li>Activa el permiso de <strong>"Cámara"</strong></li>
                          <li>Toca "Reintentar" abajo</li>
                        </ol>
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <p className="text-xs text-blue-700">
                            💡 Si no aparece, ve a Configuración del teléfono → Apps → Chrome → Permisos → Cámara
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => setShowPermissionHelp(false)}
                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => {
                          setShowPermissionHelp(false);
                          startCamera();
                        }}
                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Reintentar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Área de cámara/preview */}
            {!photoPreview ? (
              <div className="relative">
                {!isCameraActive ? (
                  // Botón para iniciar cámara
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={startCamera}
                      className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg transition-colors ${
                        errors.photo
                          ? 'border-red-400 bg-red-50 hover:bg-red-100'
                          : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <svg className={`w-16 h-16 mb-4 ${errors.photo ? 'text-red-400' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-lg font-semibold text-gray-700 mb-1">Tomar Foto</p>
                      <p className="text-sm text-gray-500">Haz clic para activar la cámara</p>
                    </button>
                    {cameraError && (
                      <p className="mt-3 text-sm text-red-500 text-center">{cameraError}</p>
                    )}
                  </div>
                ) : (
                  // Vista de cámara activa
                  <div className="flex flex-col items-center">
                    <div className="relative w-full max-w-sm mx-auto">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-80 object-cover rounded-lg border-4 border-blue-500 shadow-lg"
                        style={{ transform: 'scaleX(-1)' }}
                      />
                      {/* Guía de encuadre */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-40 h-52 border-2 border-white border-dashed rounded-full opacity-50"></div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600 text-center">Centra tu rostro dentro del óvalo</p>
                    <div className="flex gap-3 mt-4">
                      <button
                        type="button"
                        onClick={stopCamera}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={capturePhoto}
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <circle cx="12" cy="13" r="3" />
                        </svg>
                        Capturar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Preview de foto capturada
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={photoPreview}
                    alt="Foto capturada"
                    className="w-48 h-60 object-cover rounded-lg border-4 border-green-500 shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p className="mt-3 text-sm font-medium text-green-700">Foto capturada correctamente</p>
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Tomar otra foto
                </button>
              </div>
            )}

            {errors.photo && !isCameraActive && (
              <p className="mt-3 text-sm text-red-500 text-center">{errors.photo}</p>
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
              <>
                <div className="text-center text-green-600 p-4 bg-green-50 rounded-lg">
                  <p className="font-medium">Recibirás tu certificación por correo electrónico.</p>
                </div>

                <button
                  onClick={handleDownloadPDF}
                  disabled={isDownloadingPDF}
                  className={`w-full py-4 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    isDownloadingPDF
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#093D53] text-white hover:bg-[#0b4d68]'
                  }`}
                >
                  {isDownloadingPDF ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generando PDF...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Descargar Certificado PDF
                    </>
                  )}
                </button>
              </>
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
            {/* Redes sociales */}
            <div className="flex justify-center space-x-4 mb-4">
              <a href={config.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-500 hover:text-[#FFC600] transition-colors">
                <BiLogoFacebookCircle className="size-6" />
              </a>
              <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-500 hover:text-[#FFC600] transition-colors">
                <BiLogoInstagram className="size-6" />
              </a>
              <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-500 hover:text-[#FFC600] transition-colors">
                <BiLogoLinkedinSquare className="size-6" />
              </a>
              <a href={config.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-500 hover:text-[#FFC600] transition-colors">
                <BiLogoYoutube className="size-6" />
              </a>
            </div>
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
