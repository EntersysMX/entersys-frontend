

import {
  Button,
  Checkbox,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@relume_io/relume-ui";
import React, { useState } from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";
import { useAnalytics, analyticsAPI } from '../../../hooks/useAnalytics';

export function ContactoContact06() {
  const { trackEvent, trackGoal } = useAnalytics();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    interest: 'general',
    message: '',
    source: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Logging para debug
    console.log('🔄 Form submission started', formData);

    setIsSubmitting(true);

    try {
      // Validación mejorada
      if (!formData.name?.trim() || !formData.email?.trim()) {
        console.error('❌ Validation failed: missing required fields');
        alert('Por favor completa todos los campos requeridos');
        return;
      }

      // Tracking de intento
      trackEvent('Form', 'Submit_Attempt', 'Contact Form');
      console.log('📊 Event tracked: Submit_Attempt');

      // API call con timeout y error handling mejorado
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 segundos timeout

      const result = await analyticsAPI.captureLead({
        ...formData,
        source: 'website_contact_form'
      }).catch(error => {
        console.error('❌ API call failed:', error);
        throw new Error(`API Error: ${error.message}`);
      });

      clearTimeout(timeoutId);

      console.log('✅ API Response:', result);

      if (result?.success) {
        // Success tracking
        trackEvent('Form', 'Submit_Success', 'Contact Form', 1);
        trackGoal(1, 50);

        // Store email for future tracking
        localStorage.setItem('leadEmail', formData.email);
        sessionStorage.setItem('leadEmail', formData.email);

        setShowThankYou(true);

        console.log('✅ Form submission successful');

        // *** NUEVO *** Track additional lead data
        await analyticsAPI.trackEvent({
          category: 'Lead',
          action: 'Profile_Created',
          name: `Lead Profile - ${formData.interest}`,
          value: 1,
          url: window.location.href
        });

        // Clear form after delay
        setTimeout(() => {
          setFormData({
            name: '', email: '', company: '', phone: '',
            interest: 'general', message: '', source: ''
          });
          setShowThankYou(false);
        }, 5000);

      } else {
        throw new Error(result?.error || 'API returned non-success response');
      }

    } catch (error) {
      console.error('❌ Form submission error:', error);

      // Error tracking
      trackEvent('Form', 'Submit_Error', 'Contact Form');

      // User-friendly error message
      const errorMessage = error.message.includes('API Error')
        ? 'Error de conexión con el servidor. Por favor intenta nuevamente.'
        : 'Error al enviar el formulario. Verifica tu conexión e intenta nuevamente.';

      alert(errorMessage);

    } finally {
      setIsSubmitting(false);
    }
  };

  if (showThankYou) {
    return (
      <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container text-center">
          <h2 className="mb-6 text-5xl font-bold text-green-600">¡Gracias!</h2>
          <p className="text-lg">Hemos recibido tu mensaje. Nos pondremos en contacto contigo pronto.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 items-start gap-y-12 md:grid-flow-row md:grid-cols-2 md:gap-x-12 lg:grid-flow-col lg:gap-x-20 lg:gap-y-16">
        <div>
          <div className="mb-6 md:mb-8">
            <p className="mb-3 font-semibold md:mb-4">Contacto</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Contáctanos
            </h2>
            <p className="md:text-md">
              Estamos listos para transformar tu operación
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 py-2">
            <div className="flex items-center gap-4">
              <BiEnvelope className="size-6 flex-none" />
              <p>hello@relume.io</p>
            </div>
            <div className="flex items-center gap-4">
              <BiPhone className="size-6 flex-none" />
              <p>+52 55 1234 5678</p>
            </div>
            <div className="flex items-center gap-4">
              <BiMap className="size-6 flex-none" />
              <p>Ciudad de México, México</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="grid max-w-lg grid-cols-1 grid-rows-[auto_auto] gap-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="grid w-full items-center">
              <Label htmlFor="name" className="mb-2">
                Nombre completo
              </Label>
              <Input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            <div className="grid w-full items-center">
              <Label htmlFor="company" className="mb-2">
                Empresa
              </Label>
              <Input
                type="text"
                id="company"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="grid w-full items-center">
              <Label htmlFor="email" className="mb-2">
                Correo
              </Label>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>
            <div className="grid w-full items-center">
              <Label htmlFor="phone" className="mb-2">
                Teléfono
              </Label>
              <Input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>
          </div>
          <div className="grid w-full items-center">
            <Label className="mb-2">¿En qué te podemos ayudar?</Label>
            <Select value={formData.interest} onValueChange={(value) => handleChange('interest', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Elige una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="automation">Automatización de procesos</SelectItem>
                <SelectItem value="integration">Integración de sistemas</SelectItem>
                <SelectItem value="consulting">Consultoría tecnológica</SelectItem>
                <SelectItem value="development">Desarrollo de software</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full items-center py-3 md:py-4">
            <Label className="mb-3 md:mb-4">¿Cómo nos conociste?</Label>
            <RadioGroup
              value={formData.source}
              onValueChange={(value) => handleChange('source', value)}
              className="grid grid-cols-2 gap-x-6 gap-y-3.5"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="referral" id="referral" />
                <Label htmlFor="referral">Referido</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="social_media" id="social_media" />
                <Label htmlFor="social_media">Redes sociales</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="event" id="event" />
                <Label htmlFor="event">Evento</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="web_search" id="web_search" />
                <Label htmlFor="web_search">Búsqueda web</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recommendation" id="recommendation" />
                <Label htmlFor="recommendation">Recomendación</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Otro</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid w-full items-center">
            <Label htmlFor="message" className="mb-2">
              Mensaje
            </Label>
            <Textarea
              id="message"
              placeholder="Escribe tu mensaje"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className="min-h-[11.25rem] overflow-auto"
            />
          </div>
          <div className="mb-3 flex items-center space-x-2 text-sm md:mb-4">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="cursor-pointer">
              Acepto términos y condiciones
            </Label>
          </div>
          <div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm ${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'
              }`}
            >
              {isSubmitting ? 'Enviando mensaje...' : 'Enviar mensaje'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
