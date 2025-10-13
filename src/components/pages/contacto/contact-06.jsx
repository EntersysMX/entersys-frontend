"use client";

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
import { Card } from "../../ui/Card";
import React, { useState, useEffect } from "react";
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import { mauticService } from '../../../services/mautic';
import { analyticsService } from '../../../services/analytics';
import './contact.css';

export function Contact06({ colorScheme = 2, ...props }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formStarted, setFormStarted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    interest: 'automation',
    source: ''
  });

  // Inicializar tracking services
  useEffect(() => {
    mauticService.initializeTracking();
    analyticsService.initialize();
    analyticsService.trackPageView('Contact Page');

    // Track user context inicial como visitor
    analyticsService.trackUserContext({
      userType: 'visitor',
      leadSource: 'direct',
      journeyStage: 'consideration'
    });
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Track cuando el usuario empieza a llenar el formulario
    if (!formStarted && value.trim()) {
      setFormStarted(true);
      analyticsService.trackEvent('Form', 'Form Start', 'contact_form');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🔄 Formulario de contacto enviado', formData);

    setIsSubmitting(true);

    try {
      // Validación
      if (!formData.firstName?.trim() || !formData.email?.trim()) {
        alert('Por favor completa nombre y correo electrónico');
        return;
      }

      // Capturar lead en Mautic con campos exactos
      const result = await mauticService.captureLead({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        message: formData.message,
        source: formData.source || 'website_contact_form'
      });

      if (result.success) {
        // Guardar email para tracking futuro
        localStorage.setItem('leadEmail', formData.email);
        sessionStorage.setItem('leadEmail', formData.email);

        // Guardar Mautic Lead ID si está disponible
        if (result.leadId) {
          localStorage.setItem('mauticLeadId', result.leadId);
        }

        // Tracking de conversión en Mautic
        await mauticService.trackConversion(formData.email, 'form_submit', 50);

        // NUEVO: Track user context con Custom Dimensions
        const leadSource = formData.source || 'website_contact_form';
        analyticsService.trackUserContext({
          userType: 'lead',
          industry: formData.interest || 'unknown', // Usar el campo interest como industry
          companySize: formData.company ? 'unknown' : null, // Si tiene company, es empresa
          leadSource: leadSource,
          mauticLeadId: result.leadId || null,
          journeyStage: 'decision'
        });

        // Tracking en Matomo con eventos estructurados
        analyticsService.trackFormSubmission('contact_form');
        analyticsService.trackConversion('Contact Form Submission', 1);

        // Track el origen del lead
        analyticsService.trackEvent('Lead Generation', 'Lead Source', leadSource);

        // Mostrar mensaje de éxito
        setShowThankYou(true);
        console.log('✅ Lead capturado exitosamente en Mautic y tracked en Matomo con Custom Dimensions');

        // Limpiar formulario después de 5 segundos
        setTimeout(() => {
          setFormData({
            firstName: '', lastName: '', email: '', company: '', phone: '',
            message: '', interest: 'automation', source: ''
          });
          setShowThankYou(false);
        }, 5000);

      } else {
        throw new Error(result.error || 'Error capturando lead en Mautic');
      }

    } catch (error) {
      console.error('❌ Error enviando formulario:', error);

      // Track error en Matomo
      analyticsService.trackEvent('Form', 'Form Error', 'contact_form', error.message);

      let errorMessage = 'Hubo un error enviando el formulario. ';
      if (error.message.includes('timeout') || error.message.includes('Network')) {
        errorMessage += 'Verifica tu conexión a internet e intenta nuevamente.';
        analyticsService.trackEvent('Error', 'Network Error', 'contact_form_submit');
      } else {
        errorMessage += 'Por favor intenta nuevamente o contacta al soporte.';
        analyticsService.trackEvent('Error', 'Form Submission Error', error.message);
      }

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
    <section id="formulario-contacto" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
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
              <MdEmail className="size-6 flex-none" />
              <a href="mailto:contacto@entersys.mx" className="hover:underline">
                contacto@entersys.mx
              </a>
            </div>
            <div className="flex items-center gap-4">
              <MdPhone className="size-6 flex-none" />
              <a href="tel:+525512345678" className="hover:underline">
                +52 55 1234 5678
              </a>
            </div>
            <div className="flex items-center gap-4">
              <MdLocationOn className="size-6 flex-none" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Ciudad+de+México,+México"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Ciudad de México, México
              </a>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="grid max-w-lg grid-cols-1 grid-rows-[auto_auto] gap-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="grid w-full items-center">
              <Label htmlFor="firstName" className="mb-2">
                Nombre *
              </Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                required
              />
            </div>
            <div className="grid w-full items-center">
              <Label htmlFor="lastName" className="mb-2">
                Apellido
              </Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="grid w-full items-center">
              <Label htmlFor="email" className="mb-2">
                Correo *
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
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
                name="company"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
              />
            </div>
          </div>
          <div className="grid w-full items-center">
            <Label htmlFor="phone" className="mb-2">
              Teléfono
            </Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
          <div className="grid w-full items-center">
            <Label id="interest-label" htmlFor="interest" className="mb-2">¿En qué te podemos ayudar?</Label>
            <Select name="interest" value={formData.interest} onValueChange={(value) => handleChange('interest', value)}>
              <SelectTrigger id="interest" aria-labelledby="interest-label">
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
            <Label id="source-label" className="mb-3 md:mb-4">¿Cómo nos conociste?</Label>
            <RadioGroup
              name="source"
              value={formData.source}
              onValueChange={(value) => handleChange('source', value)}
              className="grid grid-cols-2 gap-x-6 gap-y-3.5"
              aria-labelledby="source-label"
            >
              <div className="flex items-center space-x-3 min-h-[48px]">
                <RadioGroupItem value="referral" id="referral" className="w-5 h-5" />
                <Label htmlFor="referral" className="cursor-pointer text-sm">Referido</Label>
              </div>
              <div className="flex items-center space-x-3 min-h-[48px]">
                <RadioGroupItem value="social_media" id="social_media" className="w-5 h-5" />
                <Label htmlFor="social_media" className="cursor-pointer text-sm">Redes sociales</Label>
              </div>
              <div className="flex items-center space-x-3 min-h-[48px]">
                <RadioGroupItem value="event" id="event" className="w-5 h-5" />
                <Label htmlFor="event" className="cursor-pointer text-sm">Evento</Label>
              </div>
              <div className="flex items-center space-x-3 min-h-[48px]">
                <RadioGroupItem value="web_search" id="web_search" className="w-5 h-5" />
                <Label htmlFor="web_search" className="cursor-pointer text-sm">Búsqueda web</Label>
              </div>
              <div className="flex items-center space-x-3 min-h-[48px]">
                <RadioGroupItem value="recommendation" id="recommendation" className="w-5 h-5" />
                <Label htmlFor="recommendation" className="cursor-pointer text-sm">Recomendación</Label>
              </div>
              <div className="flex items-center space-x-3 min-h-[48px]">
                <RadioGroupItem value="other" id="other" className="w-5 h-5" />
                <Label htmlFor="other" className="cursor-pointer text-sm">Otro</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid w-full items-center">
            <Label htmlFor="message" className="mb-2">
              Mensaje
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Escribe tu mensaje"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className="min-h-[11.25rem] overflow-auto"
            />
          </div>
          <div className="mb-3 flex items-center space-x-2 text-sm md:mb-4 min-h-[48px]">
            <Checkbox id="terms" name="terms" className="w-5 h-5" />
            <Label htmlFor="terms" className="cursor-pointer">
              Acepto términos y condiciones
            </Label>
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="contact-button-custom w-full px-6 py-3 rounded-md font-semibold text-base"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
