import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toastService from '../services/toast';

/**
 * QR Generator Page
 * Permite generar códigos QR para cualquier URL
 */
const QRGenerator = () => {
  const [url, setUrl] = useState('');
  const [qrImage, setQrImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateQR = async (e) => {
    e.preventDefault();

    if (!url) {
      toastService.warning('Por favor ingresa una URL');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://api.entersys.mx/api/v1/qr/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          box_size: 10,
          border: 4,
          fill_color: 'black',
          back_color: 'white'
        })
      });

      const data = await response.json();

      if (data.success) {
        setQrImage(`data:image/png;base64,${data.qr_base64}`);
        toastService.success('Código QR generado exitosamente');
      } else {
        toastService.error(data.message || 'Error al generar el código QR');
      }
    } catch (error) {
      console.error('Error generating QR:', error);
      toastService.error('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!qrImage) return;

    // Crear link de descarga
    const link = document.createElement('a');
    link.href = qrImage;
    link.download = `qr_code_entersys_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toastService.success('Código QR descargado');
  };

  const handleClear = () => {
    setUrl('');
    setQrImage(null);
  };

  return (
    <>
      <Helmet>
        <title>Generador de Códigos QR | Entersys</title>
        <meta name="description" content="Genera códigos QR personalizados para cualquier URL" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img src="/entersys_logo.png" alt="Entersys" className="h-16" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Generador de Códigos QR
            </h1>
            <p className="text-lg text-gray-600">
              Crea códigos QR personalizados de forma profesional
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Configuración
              </h2>

              <form onSubmit={handleGenerateQR} className="space-y-6">
                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                    URL a codificar
                  </label>
                  <input
                    type="text"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://ejemplo.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#093D53] focus:border-transparent transition-colors"
                    required
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Ingresa cualquier URL válida. El código QR nunca expira.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">
                        Características
                      </h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <ul className="list-disc list-inside space-y-1">
                          <li>Logo de Entersys en el centro</li>
                          <li>Alta corrección de errores</li>
                          <li>Sin fecha de expiración</li>
                          <li>Descargable en formato PNG</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-[#093D53] text-white py-3 px-6 rounded-lg hover:bg-[#0a4a64] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generando...
                      </span>
                    ) : (
                      'Generar QR'
                    )}
                  </button>

                  {qrImage && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-gray-700"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Preview Section */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Previsualización
              </h2>

              {qrImage ? (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
                    <img
                      src={qrImage}
                      alt="Código QR generado"
                      className="max-w-full h-auto"
                      style={{ maxWidth: '300px' }}
                    />
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleDownload}
                      className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Descargar PNG
                    </button>

                    <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4">
                      <p className="font-medium mb-1">URL codificada:</p>
                      <p className="break-all text-gray-800">{url}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-center py-12">
                  <div>
                    <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <p className="mt-4 text-gray-500 text-lg">
                      Ingresa una URL y genera tu código QR
                    </p>
                    <p className="mt-2 text-sm text-gray-400">
                      El código QR aparecerá aquí
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              ¿Cómo funciona?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="bg-[#093D53] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Ingresa URL</h3>
                <p className="text-sm text-gray-600">
                  Escribe la URL que quieres codificar en el QR
                </p>
              </div>
              <div>
                <div className="bg-[#093D53] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Genera QR</h3>
                <p className="text-sm text-gray-600">
                  El sistema crea el QR automáticamente con diseño profesional
                </p>
              </div>
              <div>
                <div className="bg-[#093D53] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Descarga</h3>
                <p className="text-sm text-gray-600">
                  Descarga el código QR listo para usar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QRGenerator;
