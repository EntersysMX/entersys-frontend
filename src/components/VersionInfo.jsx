/**
 * Componente para mostrar información de versión
 */
import React, { useState, useEffect } from 'react';
import { versionManager } from '../utils/version.js';

const VersionInfo = ({ showInFooter = false, showDebugInfo = false }) => {
  const [versionInfo, setVersionInfo] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const info = versionManager.getVersionInfo();
    setVersionInfo(info);
  }, []);

  const handleForceUpdate = () => {
    if (window.confirm('¿Está seguro que desea forzar la actualización? Se recargará la página.')) {
      versionManager.forceUpdate();
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!versionInfo) return null;

  // Versión simplificada para el footer
  if (showInFooter) {
    return (
      <div
        className="version-footer text-xs text-gray-400 cursor-pointer hover:text-gray-300 transition-colors"
        onClick={toggleExpanded}
        title="Click para ver detalles de versión"
      >
        v{versionInfo.current}
        {isExpanded && (
          <div className="mt-2 p-2 bg-gray-800 rounded text-white text-xs">
            <div>Build: {new Date(versionInfo.lastUpdate || '').toLocaleDateString()}</div>
            <button
              onClick={handleForceUpdate}
              className="mt-1 text-blue-300 hover:text-blue-200"
            >
              🔄 Forzar actualización
            </button>
          </div>
        )}
      </div>
    );
  }

  // Versión completa con información de debug
  if (showDebugInfo) {
    return (
      <div className="version-debug fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs max-w-sm">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-bold">Debug Version Info</h4>
          <button
            onClick={toggleExpanded}
            className="text-gray-300 hover:text-white"
          >
            {isExpanded ? '−' : '+'}
          </button>
        </div>

        <div className="space-y-1">
          <div><strong>Version:</strong> {versionInfo.current}</div>
          <div><strong>Stored:</strong> {versionInfo.stored || 'None'}</div>
          <div><strong>Has Update:</strong> {versionInfo.hasNewVersion ? '✅' : '❌'}</div>

          {isExpanded && (
            <>
              <div><strong>Last Update:</strong> {versionInfo.lastUpdate ? new Date(versionInfo.lastUpdate).toLocaleString() : 'Never'}</div>
              <div><strong>Timestamp:</strong> {new Date(versionInfo.timestamp).toLocaleString()}</div>
              <div><strong>User Agent:</strong> {versionInfo.userAgent.substring(0, 50)}...</div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleForceUpdate}
                  className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs"
                >
                  🔄 Force Update
                </button>
                <button
                  onClick={() => console.table(versionInfo)}
                  className="bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded text-xs"
                >
                  📊 Log Info
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Versión normal (badge pequeño)
  return (
    <div className="version-badge inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
      v{versionInfo.current}
      {versionInfo.hasNewVersion && (
        <span className="ml-1 text-orange-600" title="Nueva versión disponible">🔄</span>
      )}
    </div>
  );
};

export default VersionInfo;