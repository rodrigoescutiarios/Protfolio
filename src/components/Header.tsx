
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const languages = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
];

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);
  const [isLangButtonHovered, setIsLangButtonHovered] = useState(false);

  const styles = {
    header: {
      backgroundColor: '#f8fafc',
      borderBottom: '1px solid #cbd5e1',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem',
    },
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: isMobile ? 'flex-end' : 'space-between',
      height: isMobile ? '96px' : '64px',
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#111827',
      margin: 0,
      letterSpacing: '-0.025em',
    },
    actionsContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    dropdownContainer: {
      position: 'relative' as const,
    },
    languageButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: isMobile ? '0.5rem' : '0.5rem 0.75rem',
      borderRadius: '0.5rem',
      backgroundColor: '#ffffff',
      border: '1px solid #cbd5e1',
      color: '#6b7280',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '0.875rem',
      fontWeight: '500',
    },
    languageButtonHover: {
      backgroundColor: '#f8fafc',
      borderColor: '#1b527c',
    },
    flag: {
      fontSize: '1.125rem',
    },
    arrow: {
      width: '16px',
      height: '16px',
      transition: 'transform 0.2s',
    },
    arrowRotated: {
      transform: 'rotate(180deg)',
    },
    dropdown: {
      position: 'absolute' as const,
      right: 0,
      marginTop: '0.5rem',
      width: '192px',
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: '1px solid #cbd5e1',
      overflow: 'hidden',
      zIndex: 9999,
    },
    dropdownItem: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.15s',
      fontSize: '0.875rem',
      fontWeight: '500',
      textAlign: 'left' as const,
    },
  };

  // Responsive: detectar mobile
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cerrar dropdown al hacer clic fuera
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isDropdownOpen && !target.closest('[data-dropdown-container]')) {
        setIsDropdownOpen(false);
      }
    };
    
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={{
          ...styles.flexContainer,
          flexDirection: isMobile ? 'row' : 'row',
          justifyContent: isMobile ? 'space-between' : 'space-between',
        }}>
          {/* Botón menú sidebar solo en mobile, alineado a la izquierda */}
          {/* En mobile, el botón de menú es flotante y no va dentro del header */}
          {/* Nombre solo en desktop */}
          {!isMobile && (
            <h1 style={styles.title}>{t('header.name')}</h1>
          )}
          {/* Acciones alineadas a la derecha */}
          <div style={{
            ...styles.actionsContainer,
            marginLeft: 'auto',
          }}>
            {/* Selector de idioma */}
            <div style={styles.dropdownContainer} data-dropdown-container>
              <button
                style={{
                  ...styles.languageButton,
                  ...(isLangButtonHovered ? styles.languageButtonHover : {}),
                }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseEnter={() => setIsLangButtonHovered(true)}
                onMouseLeave={() => setIsLangButtonHovered(false)}
              >
                <span style={styles.flag}>{languages.find(l => l.code === language)?.flag}</span>
                <span>{languages.find(l => l.code === language)?.label}</span>
                <svg style={{
                  ...styles.arrow,
                  ...(isDropdownOpen ? styles.arrowRotated : {}),
                }} viewBox="0 0 20 20" fill="currentColor" width={16} height={16}>
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.584l3.71-3.354a.75.75 0 111.02 1.1l-4.25 3.84a.75.75 0 01-1.02 0l-4.25-3.84a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div style={styles.dropdown}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      style={{
                        ...styles.dropdownItem,
                        backgroundColor: hoveredLang === lang.code ? '#f8fafc' : 'transparent',
                        color: language === lang.code ? '#1b527c' : '#374151',
                        fontWeight: language === lang.code ? '600' : '500',
                      }}
                      onClick={() => {
                        setLanguage(lang.code as 'es' | 'en');
                        setIsDropdownOpen(false);
                      }}
                      onMouseEnter={() => setHoveredLang(lang.code)}
                      onMouseLeave={() => setHoveredLang(null)}
                    >
                      <span style={styles.flag}>{lang.flag}</span>
                      <span>{lang.label}</span>
                      {language === lang.code && (
                        <svg style={{ width: 16, height: 16, marginLeft: 'auto' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Botón descargar CV */}
            <a
              href="/assets/JoseRodrigo_EscutiaRios_CV.docx"
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                background: '#1b527c',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
                marginLeft: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              download
            >
              <svg style={{width: 18, height: 18}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {isMobile ? t('header.downloadCVShort') : t('header.downloadCV')}
            </a>
            {/* Botón modo claro/oscuro eliminado */}
          </div>
        </div>
      </div>
    </header>
  );
}