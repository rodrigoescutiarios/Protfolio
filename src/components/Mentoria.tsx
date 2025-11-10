import { useState } from 'react';
import { Code, Rocket, Users, CheckCircle, Calendar, MessageCircle, Zap, Target, Lightbulb, Clock, TrendingUp, Mail, Linkedin, Github, Building2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Mentoria() {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleWhatsAppClick = () => {
    const phoneNumber = '5534010097';
    const message = encodeURIComponent('Hola, vi tu portafolio y me interesa recibir mentoría en testing automatizado. ¿Podrías darme más información?');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const colors = {
    primary: '#1b527c',
    secondary: '#55bff3',
    bgMain: '#f8fafc',
    bgCard: '#ffffff',
    textPrimary: '#111827',
    textSecondary: '#6b7280',
    border: '#e2e8f0',
    success: '#16a34a',
    accentLight: '#f0f9ff',
    warning: '#f59e0b',
  };

  const mentoriaServices = [
    {
      id: 'selenium',
      title: t('mentoria.service.selenium.title'),
      icon: Code,
      color: '#43B02A',
      description: t('mentoria.service.selenium.desc'),
      topics: [
        t('mentoria.selenium.topic1'),
        t('mentoria.selenium.topic2'),
        t('mentoria.selenium.topic3'),
        t('mentoria.selenium.topic4'),
        t('mentoria.selenium.topic5'),
        t('mentoria.selenium.topic6'),
        t('mentoria.selenium.topic7')
      ],
      duration: '8-12 semanas',
      level: 'Básico a Avanzado'
    },
    {
      id: 'playwright',
      title: t('mentoria.service.playwright.title'),
      icon: Rocket,
      color: '#2D6A4F',
      description: t('mentoria.service.playwright.desc'),
      topics: [
        t('mentoria.playwright.topic1'),
        t('mentoria.playwright.topic2'),
        t('mentoria.playwright.topic3'),
        t('mentoria.playwright.topic4'),
        t('mentoria.playwright.topic5'),
        t('mentoria.playwright.topic6'),
        t('mentoria.playwright.topic7')
      ],
      duration: '6-10 semanas',
      level: 'Básico a Avanzado'
    },
    {
      id: 'cypress',
      title: t('mentoria.service.cypress.title'),
      icon: Zap,
      color: '#17202C',
      description: t('mentoria.service.cypress.desc'),
      topics: [
        t('mentoria.cypress.topic1'),
        t('mentoria.cypress.topic2'),
        t('mentoria.cypress.topic3'),
        t('mentoria.cypress.topic4'),
        t('mentoria.cypress.topic5'),
        t('mentoria.cypress.topic6'),
        t('mentoria.cypress.topic7')
      ],
      duration: '6-10 semanas',
      level: 'Básico a Avanzado'
    },
    {
      id: 'karate',
      title: t('mentoria.service.karate.title'),
      icon: Target,
      color: '#FF6B35',
      description: t('mentoria.service.karate.desc'),
      topics: [
        t('mentoria.karate.topic1'),
        t('mentoria.karate.topic2'),
        t('mentoria.karate.topic3'),
        t('mentoria.karate.topic4'),
        t('mentoria.karate.topic5'),
        t('mentoria.karate.topic6'),
        t('mentoria.karate.topic7')
      ],
      duration: '4-8 semanas',
      level: 'Básico a Intermedio'
    },
    {
      id: 'postman',
      title: t('mentoria.service.postman.title'),
      icon: MessageCircle,
      color: '#FF6C37',
      description: t('mentoria.service.postman.desc'),
      topics: [
        t('mentoria.postman.topic1'),
        t('mentoria.postman.topic2'),
        t('mentoria.postman.topic3'),
        t('mentoria.postman.topic4'),
        t('mentoria.postman.topic5'),
        t('mentoria.postman.topic6'),
        t('mentoria.postman.topic7')
      ],
      duration: '4-6 semanas',
      level: 'Básico a Intermedio'
    },
    {
      id: 'appium',
      title: t('mentoria.service.appium.title'),
      icon: Users,
      color: '#662D91',
      description: t('mentoria.service.appium.desc'),
      topics: [
        t('mentoria.appium.topic1'),
        t('mentoria.appium.topic2'),
        t('mentoria.appium.topic3'),
        t('mentoria.appium.topic4'),
        t('mentoria.appium.topic5'),
        t('mentoria.appium.topic6'),
        t('mentoria.appium.topic7')
      ],
      duration: '8-12 semanas',
      level: 'Intermedio a Avanzado'
    },
    {
      id: 'ai-testing',
      title: t('mentoria.service.ai.title'),
      icon: Lightbulb,
      color: '#7C3AED',
      description: t('mentoria.service.ai.desc'),
      topics: [
        t('mentoria.ai.topic1'),
        t('mentoria.ai.topic2'),
        t('mentoria.ai.topic3'),
        t('mentoria.ai.topic4'),
        t('mentoria.ai.topic5'),
        t('mentoria.ai.topic6'),
        t('mentoria.ai.topic7')
      ],
      duration: '6-10 semanas',
      level: 'Intermedio a Avanzado'
    }
  ];

  const benefits = [
    {
      icon: Calendar,
      title: t('mentoria.benefit1.title'),
      description: t('mentoria.benefit1.desc')
    },
    {
      icon: Target,
      title: t('mentoria.benefit2.title'),
      description: t('mentoria.benefit2.desc')
    },
    {
      icon: Code,
      title: t('mentoria.benefit3.title'),
      description: t('mentoria.benefit3.desc')
    },
    {
      icon: MessageCircle,
      title: t('mentoria.benefit4.title'),
      description: t('mentoria.benefit4.desc')
    },
    {
      icon: TrendingUp,
      title: t('mentoria.benefit5.title'),
      description: t('mentoria.benefit5.desc')
    }
  ];

  const methodology = [
    {
      step: '01',
      title: t('mentoria.method1.title'),
      description: t('mentoria.method1.desc')
    },
    {
      step: '02',
      title: t('mentoria.method2.title'),
      description: t('mentoria.method2.desc')
    },
    {
      step: '03',
      title: t('mentoria.method3.title'),
      description: t('mentoria.method3.desc')
    },
    {
      step: '04',
      title: t('mentoria.method4.title'),
      description: t('mentoria.method4.desc')
    }
  ];

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: colors.bgMain }}>
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div
          className="rounded-xl p-10 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            boxShadow: '0 4px 20px rgba(27, 82, 124, 0.25)',
          }}
        >
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-3">
              {t('mentoria.title')}
            </h1>
            <p className="text-lg text-white opacity-90 mb-4">
              {t('mentoria.subtitle')}
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                <Clock className="w-4 h-4" style={{ color: colors.primary }} />
                <span className="text-sm font-medium" style={{ color: colors.primary }}>{t('mentoria.badge1')}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                <Users className="w-4 h-4" style={{ color: colors.primary }} />
                <span className="text-sm font-medium" style={{ color: colors.primary }}>{t('mentoria.badge2')}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                <Code className="w-4 h-4" style={{ color: colors.primary }} />
                <span className="text-sm font-medium" style={{ color: colors.primary }}>{t('mentoria.badge3')}</span>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.4) 0%, transparent 50%)',
            }}
          />
        </div>
      </div>

      {/* Beneficios */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: colors.textPrimary }}>
          <CheckCircle className="w-6 h-6" style={{ color: colors.success }} />
          {t('mentoria.benefits.title')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="p-5 rounded-lg transition-all hover:shadow-lg"
                style={{
                  backgroundColor: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: colors.accentLight }}
                >
                  <Icon className="w-6 h-6" style={{ color: colors.primary }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: colors.textPrimary }}>
                  {benefit.title}
                </h3>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card especial - Mentoría para Grupos */}
      <div className="max-w-6xl mx-auto mb-12">
        <div
          className="rounded-xl overflow-hidden"
          style={{
            backgroundColor: colors.bgCard,
            border: `2px solid ${colors.secondary}`,
            boxShadow: '0 8px 24px rgba(27, 82, 124, 0.15)',
          }}
        >
          {/* Header del card */}
          <div
            className="p-6"
            style={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Building2 className="w-8 h-8" style={{ color: colors.primary }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-white">
                    {t('mentoria.groups.title')}
                  </h2>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      color: colors.primary,
                    }}
                  >
                    {t('mentoria.badge.groups')}
                  </span>
                </div>
                <p className="text-base text-white opacity-90">
                  {t('mentoria.groups.subtitle')}
                </p>
              </div>
            </div>
          </div>

          {/* Content del card */}
          <div className="p-6">
            <p className="text-base mb-6" style={{ color: colors.textSecondary }}>
              {t('mentoria.groups.desc')}
            </p>

            {/* Características */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: colors.accentLight }}
                >
                  <CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                    {t('mentoria.groups.feature1')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: colors.accentLight }}
                >
                  <CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                    {t('mentoria.groups.feature2')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: colors.accentLight }}
                >
                  <CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                    {t('mentoria.groups.feature3')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: colors.accentLight }}
                >
                  <CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                    {t('mentoria.groups.feature4')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: colors.accentLight }}
                >
                  <CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                    {t('mentoria.groups.feature5')}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <button
                onClick={handleWhatsAppClick}
                className="px-8 py-3 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-2"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                  color: '#ffffff',
                  boxShadow: '0 4px 12px rgba(27, 82, 124, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(27, 82, 124, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(27, 82, 124, 0.3)';
                }}
              >
                <Building2 className="w-5 h-5" />
                {t('mentoria.groups.cta')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Servicios de Mentoría */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-2" style={{ color: colors.textPrimary }}>
          {t('mentoria.services.title')}
        </h2>
        <p className="text-base mb-6" style={{ color: colors.textSecondary }}>
          {t('mentoria.services.subtitle')}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {mentoriaServices.map((service) => {
            const Icon = service.icon;
            const isSelected = selectedService === service.id;
            
            return (
              <div
                key={service.id}
                className="rounded-lg overflow-hidden transition-all cursor-pointer"
                style={{
                  backgroundColor: colors.bgCard,
                  border: `2px solid ${isSelected ? service.color : colors.border}`,
                  boxShadow: isSelected ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.05)',
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                }}
                onClick={() => setSelectedService(isSelected ? null : service.id)}
              >
                {/* Header */}
                <div
                  className="p-5"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}15 0%, ${service.color}05 100%)`,
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: service.color }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold" style={{ color: colors.textPrimary }}>
                          {service.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="text-xs px-2 py-0.5 rounded font-medium"
                            style={{ backgroundColor: service.color, color: '#ffffff' }}
                          >
                            {service.level}
                          </span>
                          <span className="text-xs" style={{ color: colors.textSecondary }}>
                            {service.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {service.description}
                  </p>
                </div>

                {/* Content */}
                {isSelected && (
                  <div className="p-5">
                    <h4 className="text-sm font-bold mb-3" style={{ color: colors.textPrimary }}>
                      {t('mentoria.topics.title')}
                    </h4>
                    <ul className="space-y-2">
                      {service.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: colors.textSecondary }}>
                          <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: colors.success }} />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Footer */}
                <div
                  className="px-5 py-3 flex items-center justify-between"
                  style={{
                    backgroundColor: colors.bgMain,
                    borderTop: `1px solid ${colors.border}`,
                  }}
                >
                  <span className="text-xs font-medium" style={{ color: colors.textSecondary }}>
                    {isSelected ? t('mentoria.click.collapse') : t('mentoria.click.expand')}
                  </span>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center transition-transform"
                    style={{
                      backgroundColor: service.color,
                      transform: isSelected ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <span className="text-white text-xs">▼</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Metodología */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: colors.textPrimary }}>
          {t('mentoria.methodology.title')}
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          {methodology.map((item, index) => (
            <div
              key={index}
              className="relative p-5 rounded-lg"
              style={{
                backgroundColor: colors.bgCard,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div
                className="absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                style={{
                  backgroundColor: colors.primary,
                  color: '#ffffff',
                  boxShadow: '0 2px 8px rgba(27, 82, 124, 0.3)',
                }}
              >
                {item.step}
              </div>
              <h3 className="text-base font-bold mb-2 mt-2" style={{ color: colors.textPrimary }}>
                {item.title}
              </h3>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Final */}
      <div className="max-w-6xl mx-auto">
        <div
          className="rounded-xl p-8 text-center"
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            boxShadow: '0 4px 20px rgba(27, 82, 124, 0.25)',
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-3">
            {t('mentoria.cta.title')}
          </h2>
          <p className="text-base text-white opacity-90 mb-6">
            {t('mentoria.cta.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleWhatsAppClick}
              className="px-8 py-3 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-2"
              style={{
                backgroundColor: '#ffffff',
                color: colors.primary,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
            >
              <Calendar className="w-5 h-5" />
              {t('mentoria.cta.schedule')}
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="px-8 py-3 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-2"
              style={{
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '2px solid #ffffff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <MessageCircle className="w-5 h-5" />
              {t('mentoria.cta.info')}
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <p className="text-sm text-white opacity-75 mb-3">{t('mentoria.contact.direct')}</p>
            <div className="flex flex-wrap gap-4 justify-center text-sm text-white">
              <a 
                href="mailto:rodrigoingsis@gmail.com" 
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <Mail className="w-4 h-4" />
                <span>rodrigoingsis@gmail.com</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/rodrigo-escutia-522875152/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <Linkedin className="w-4 h-4" />
                <span>/in/rodrigo-escutia-522875152</span>
              </a>
              <a 
                href="https://github.com/rodrigoescutiarios" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <Github className="w-4 h-4" />
                <span>@rodrigoescutiarios</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonios (Opcional) */}
      <div className="max-w-6xl mx-auto mt-12">
        <div
          className="p-6 rounded-lg"
          style={{
            backgroundColor: colors.accentLight,
            border: `1px solid ${colors.secondary}`,
          }}
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 flex-shrink-0" style={{ color: colors.warning }} />
            <div>
              <h3 className="text-base font-bold mb-2" style={{ color: colors.textPrimary }}>
                {t('mentoria.custom.title')}
              </h3>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                {t('mentoria.custom.desc')}
                <strong> {t('mentoria.custom.topics')}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}