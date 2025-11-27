/**
 * SecureVideoPlayer.jsx
 * Componente de video con sistema anti-skip (Heartbeat) según MD050.
 *
 * Características:
 * - Bloqueo de adelanto (seek-bar lock)
 * - Envío de heartbeats cada 5 segundos
 * - Persistencia de progreso en el servidor
 * - Fallback a almacenamiento local si el servidor no responde
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { config } from '../config/environment';

const API_BASE_URL = config.urls.api;
const HEARTBEAT_INTERVAL = 5000; // 5 segundos

const SecureVideoPlayer = ({
  videoSrc,
  videoId = 'seguridad-2024',
  userId,
  onComplete,
  posterImage = null,
  title = 'Video de Capacitación',
  examPath = '/formulario-curso-seguridad'
}) => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const heartbeatIntervalRef = useRef(null);
  const lastTimeRef = useRef(0);
  const maxWatchedTimeRef = useRef(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [totalWatched, setTotalWatched] = useState(0);
  const [displayWatched, setDisplayWatched] = useState(0); // Tiempo mostrado en UI (sincronizado con video)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canAccessExam, setCanAccessExam] = useState(false);

  // Cargar progreso guardado al iniciar
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/progress/${userId}/${videoId}`,
          { method: 'GET' }
        );

        if (response.ok) {
          const data = await response.json();
          setTotalWatched(data.seconds_accumulated);
          maxWatchedTimeRef.current = data.seconds_accumulated;
        }
      } catch (err) {
        // Si falla, intentar cargar de localStorage
        const localProgress = localStorage.getItem(`video_progress_${userId}_${videoId}`);
        if (localProgress) {
          const parsed = JSON.parse(localProgress);
          setTotalWatched(parsed.seconds);
          maxWatchedTimeRef.current = parsed.seconds;
        }
      }
      setIsLoading(false);
    };

    if (userId) {
      loadProgress();
    } else {
      setIsLoading(false);
    }
  }, [userId, videoId]);

  // Enviar heartbeat al servidor
  const sendHeartbeat = useCallback(async (secondsWatched) => {
    if (!userId || secondsWatched <= 0) return;

    console.log(`[Heartbeat] Enviando ${secondsWatched.toFixed(2)}s para user ${userId}`);

    try {
      const response = await fetch(`${API_BASE_URL}/video-heartbeat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          video_id: videoId,
          seconds_watched: secondsWatched
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`[Heartbeat] Respuesta OK: total_seconds=${data.total_seconds}`);
        setTotalWatched(data.total_seconds);
        maxWatchedTimeRef.current = Math.max(maxWatchedTimeRef.current, data.total_seconds);
      } else {
        console.error(`[Heartbeat] Error HTTP: ${response.status}`);
      }
    } catch (err) {
      console.error('[Heartbeat] Error de red:', err);
      // Fallback: guardar en localStorage
      setTotalWatched(prev => {
        const newTotal = prev + secondsWatched;
        const currentProgress = {
          seconds: newTotal,
          timestamp: Date.now()
        };
        localStorage.setItem(
          `video_progress_${userId}_${videoId}`,
          JSON.stringify(currentProgress)
        );
        return newTotal;
      });
    }
  }, [userId, videoId]);

  // Iniciar intervalo de heartbeat cuando el video está reproduciéndose
  useEffect(() => {
    if (isPlaying && userId) {
      heartbeatIntervalRef.current = setInterval(() => {
        const video = videoRef.current;
        if (video && !video.paused) {
          const timeDiff = video.currentTime - lastTimeRef.current;
          if (timeDiff > 0 && timeDiff <= 6) { // Solo enviar si el avance es razonable
            sendHeartbeat(timeDiff);
          }
          lastTimeRef.current = video.currentTime;
        }
      }, HEARTBEAT_INTERVAL);
    }

    return () => {
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
    };
  }, [isPlaying, userId, sendHeartbeat]);

  // Manejar evento de metadata cargada
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
      setIsLoading(false);
      // Forzar velocidad normal
      video.playbackRate = 1.0;
    }
  };

  // Bloquear cambio de velocidad de reproducción
  const handleRateChange = () => {
    const video = videoRef.current;
    if (video && video.playbackRate !== 1.0) {
      console.log('[Video] Bloqueando cambio de velocidad');
      video.playbackRate = 1.0;
    }
  };

  // Manejar actualización del tiempo
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const currentVideoTime = video.currentTime;
      setCurrentTime(currentVideoTime);
      setProgress((currentVideoTime / video.duration) * 100);

      // Siempre actualizar el display con el tiempo actual del video
      setDisplayWatched(currentVideoTime);

      // Actualizar el máximo visto solo si avanza (no retrocede)
      if (currentVideoTime > maxWatchedTimeRef.current) {
        maxWatchedTimeRef.current = currentVideoTime;
      }
    }
  };

  // Bloquear el seek más allá del tiempo máximo visto
  const handleSeeking = () => {
    const video = videoRef.current;
    if (video) {
      // Si intenta ir más adelante del máximo permitido, regresarlo
      if (video.currentTime > maxWatchedTimeRef.current + 0.5) {
        video.currentTime = maxWatchedTimeRef.current;
      }
    }
  };

  // También bloquear en el evento seeked (después de que el seek se completa)
  const handleSeeked = () => {
    const video = videoRef.current;
    if (video && video.currentTime > maxWatchedTimeRef.current + 0.5) {
      video.currentTime = maxWatchedTimeRef.current;
    }
  };

  // Manejar play
  const handlePlay = () => {
    setIsPlaying(true);
    lastTimeRef.current = videoRef.current?.currentTime || 0;
  };

  // Manejar pause
  const handlePause = () => {
    setIsPlaying(false);
    // Enviar heartbeat final al pausar
    const video = videoRef.current;
    if (video) {
      const timeDiff = video.currentTime - lastTimeRef.current;
      if (timeDiff > 0) {
        sendHeartbeat(timeDiff);
      }
    }
  };

  // Manejar fin del video
  const handleEnded = () => {
    setIsPlaying(false);
    const video = videoRef.current;
    if (video) {
      // Enviar último heartbeat
      const timeDiff = video.currentTime - lastTimeRef.current;
      if (timeDiff > 0) {
        sendHeartbeat(timeDiff);
      }
      // Actualizar display al 100%
      setDisplayWatched(video.duration);
      maxWatchedTimeRef.current = video.duration;
    }
    // Activar acceso al examen automáticamente cuando termina el video
    setCanAccessExam(true);
    if (onComplete) {
      onComplete({ authorized: true, progress_percentage: 100, exam_url: examPath });
    }
  };

  // Validar si el usuario puede acceder al examen (llamado manualmente por botón)
  const validateCompletion = async () => {
    if (!duration) return;

    const video = videoRef.current;
    const currentWatched = video ? video.currentTime : displayWatched;
    const watchedPercentage = (currentWatched / duration) * 100;

    console.log(`[Validate] Progreso: ${watchedPercentage.toFixed(1)}%`);

    if (watchedPercentage >= 90) {
      setCanAccessExam(true);
      if (onComplete) {
        onComplete({ authorized: true, progress_percentage: watchedPercentage, exam_url: examPath });
      }
      return;
    }

    // Si tiene userId, intentar validar con el servidor
    if (userId) {
      try {
        const response = await fetch(`${API_BASE_URL}/validate-completion`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
            video_id: videoId,
            video_duration: duration
          })
        });

        if (response.ok) {
          const data = await response.json();
          setCanAccessExam(data.authorized);

          if (data.authorized && onComplete) {
            onComplete(data);
          }
        }
      } catch (err) {
        // Si falla el servidor, usar validación local
        console.warn('Error validando con servidor, usando validación local:', err);
        if (watchedPercentage >= 90) {
          setCanAccessExam(true);
        }
      }
    }
  };

  // Navegar al formulario de examen
  const handleGoToExam = () => {
    navigate(examPath);
  };

  // Formatear tiempo en mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Prevenir clic derecho
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-900 rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {userId && (
          <p className="text-sm text-gray-500">
            Tiempo acumulado: {formatTime(displayWatched)}
            {duration > 0 && ` / ${formatTime(duration)} (${Math.round((displayWatched / duration) * 100)}%)`}
          </p>
        )}
      </div>

      {/* Video Container */}
      <div
        className="relative bg-black rounded-lg overflow-hidden shadow-lg"
        onContextMenu={handleContextMenu}
      >
        <video
          ref={videoRef}
          className="w-full aspect-video"
          src={videoSrc}
          poster={posterImage}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onSeeking={handleSeeking}
          onSeeked={handleSeeked}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          onRateChange={handleRateChange}
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture
          playsInline
          controls
        >
          Tu navegador no soporta el elemento de video.
        </video>

        {/* Progress overlay mostrando máximo permitido */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
          <div
            className="h-full bg-green-500 transition-all"
            style={{ width: `${(maxWatchedTimeRef.current / duration) * 100}%` }}
          />
        </div>
      </div>

      {/* Progress Info */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progreso de visualización</span>
          <span className="text-sm text-gray-500">
            {Math.round((displayWatched / (duration || 1)) * 100)}% completado
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((displayWatched / (duration || 1)) * 100, 100)}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Debe visualizar al menos el 90% del video para acceder al examen.
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Exam Access Button */}
      <div className="mt-6 flex justify-center">
        {canAccessExam ? (
          <button
            onClick={handleGoToExam}
            className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md"
          >
            Continuar al Examen
          </button>
        ) : (
          <button
            onClick={validateCompletion}
            disabled={!duration || displayWatched < duration * 0.9}
            className={`px-8 py-3 font-semibold rounded-lg transition-colors shadow-md ${
              displayWatched >= duration * 0.9
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {displayWatched >= duration * 0.9
              ? 'Verificar y Acceder al Examen'
              : 'Complete el video para continuar'}
          </button>
        )}
      </div>
    </div>
  );
};

export default SecureVideoPlayer;
