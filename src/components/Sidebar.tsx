import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { 
  LayoutDashboard, 
  Menu,
  X,
  User,
  ChevronRight,
  Mail,
  Phone,
  ChevronLeft
} from 'lucide-react';

export default function Sidebar() {
  const { t } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('/dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const sidebarOptions = [
    { label: t('sidebar.dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { label: t('sidebar.appium'), path: '/appium' },
    { label: t('sidebar.cypress'), path: '/cypress' },
    { label: t('sidebar.karatebdd'), path: '/karate-bdd' },
    { label: t('sidebar.mentoria'), path: '/mentoria' },
    { label: t('sidebar.playwright'), path: '/playwright' },
    { label: t('sidebar.selenium'), path: '/selenium' },
  ];

  const sortedOptions = [
    sidebarOptions[0],
    ...sidebarOptions.slice(1).sort((a, b) => a.label.localeCompare(b.label)),
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Botón flotante para móvil
  if (isMobile && !mobileMenuOpen) {
    return (
      <motion.button
        onClick={() => setMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-50 rounded-xl flex items-center justify-center shadow-lg cursor-pointer"
        style={{
          width: 56,
          height: 56,
          background: 'linear-gradient(135deg, #1b527c 0%, #55bff3 100%)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Menu className="w-6 h-6 text-white" />
      </motion.button>
    );
  }

  const handleNavClick = (path: string) => {
    setActiveTab(path);
    navigate(path);
    if (isMobile) {
      // Animación de salida hacia la izquierda en mobile
      setTimeout(() => setMobileMenuOpen(false), 150);
    }
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:rodrigoingsis@gmail.com';
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hola, mucho gusto. Estoy viendo tu perfil en OCC y me interesa platicarte sobre una vacante');
    window.open(`https://wa.me/525534010097?text=${message}`, '_blank');
  };



  return (
    <>
      {/* Overlay para móvil con blur mejorado */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40"
            style={{ 
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(27, 82, 124, 0.15)'
            }}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className="fixed left-0 top-0 h-screen bg-white flex flex-col"
        style={{ 
          borderRight: '1px solid #cbd5e1',
          boxShadow: '4px 0 12px rgba(27, 82, 124, 0.08)',
          zIndex: isMobile ? 50 : 50
        }}
        initial={{ width: isMobile ? 280 : 280, x: isMobile ? -280 : 0 }}
        animate={{ 
          width: isMobile ? 280 : (collapsed ? 88 : 280),
          x: isMobile && mobileMenuOpen ? 0 : (isMobile ? -280 : 0)
        }}
        exit={isMobile ? { x: -280 } : {}}
        transition={{ duration: 0.35, type: 'spring', stiffness: 280, damping: 28 }}
      >
        {/* Header con Perfil */}
        <div className="px-5 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-5" style={{ minHeight: '48px' }}>
            <div 
              className="rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
              style={{ 
                width: 48,
                height: 48,
                background: 'linear-gradient(135deg, #1b527c 0%, #55bff3 100%)',
                boxShadow: '0 4px 12px rgba(27, 82, 124, 0.25)'
              }}
            >
              <img
                src="/assets/JoseRodrigoEscutiaRios.jpg"
                alt="Foto de perfil de Jose Rodrigo Escutia Rios"
                style={{ width: 48, height: 48, objectFit: 'cover' }}
                className="rounded-xl"
                draggable={false}
              />
              <div 
                className="absolute inset-0 opacity-20"
                style={{ 
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)'
                }}
              />
            </div>
            
            {/* En móvil o desktop expandido, mostrar texto */}
            <AnimatePresence>
              {(isMobile || !collapsed) && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col flex-1"
                >
                  <span className="font-bold text-base leading-tight" style={{ color: '#111827' }}>
                    Mi Perfil
                  </span>
                  <span className="text-xs mt-0.5 font-medium" style={{ color: '#6b7280' }}>
                    QA Automation
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Botón cerrar en móvil */}
          {isMobile && (
            <motion.button
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer"
              style={{ 
                height: 44,
                backgroundColor: '#f8fafc',
                border: '1.5px solid #cbd5e1'
              }}
              whileHover={{ backgroundColor: '#e2e8f0' }}
              whileTap={{ scale: 0.98 }}
            >
              <X className="w-5 h-5 mr-2" style={{ color: '#1b527c' }} />
              <span className="text-sm font-semibold" style={{ color: '#1b527c' }}>
                Cerrar menú
              </span>
            </motion.button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto" style={{ backgroundColor: '#f8fafc' }}>
          {sortedOptions.map((opt, idx) => {
            const Icon = opt.icon;
            const isActive = activeTab === opt.path;
            const initial = opt.label.charAt(0).toUpperCase();
            
            return (
              <React.Fragment key={opt.path}>
                {idx === 1 && (
                  <div className="my-3 mx-2 border-t" style={{ borderColor: '#e2e8f0' }} />
                )}
                <motion.button
                  onClick={() => handleNavClick(opt.path)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl mb-1.5 transition-all duration-200 relative overflow-hidden group cursor-pointer"
                  style={{
                    backgroundColor: isActive ? '#1b527c' : 'transparent',
                  }}
                  whileHover={{ x: collapsed ? 0 : 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Hover Background */}
                  {!isActive && (
                    <div 
                      className="absolute inset-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100 rounded-xl"
                      style={{ backgroundColor: '#e2e8f0' }}
                    />
                  )}
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-1/2 w-1 rounded-r-full"
                      style={{ 
                        height: '60%',
                        backgroundColor: '#55bff3',
                        transform: 'translateY(-50%)'
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  {/* Mostrar ícono en Dashboard o inicial cuando está colapsado */}
                  {collapsed ? (
                    <div 
                      className="w-full flex items-center justify-center relative z-10 font-bold text-lg"
                      style={{ color: isActive ? '#55bff3' : '#6b7280' }}
                    >
                      {Icon ? <Icon className="w-5 h-5" /> : initial}
                    </div>
                  ) : (
                    <>
                      {Icon && (
                        <Icon 
                          className="w-5 h-5 flex-shrink-0 relative z-10 transition-transform duration-200 group-hover:scale-110" 
                          style={{ color: isActive ? '#55bff3' : '#6b7280' }}
                        />
                      )}
                      
                      <AnimatePresence>
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="text-sm font-semibold whitespace-nowrap relative z-10"
                          style={{ 
                            color: isActive ? '#ffffff' : '#6b7280',
                            marginLeft: Icon ? 0 : '8px'
                          }}
                        >
                          {opt.label}
                        </motion.span>
                      </AnimatePresence>
                      
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="ml-auto relative z-10"
                        >
                          <ChevronRight className="w-4 h-4" style={{ color: '#55bff3' }} />
                        </motion.div>
                      )}
                    </>
                  )}
                </motion.button>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Footer con datos de contacto */}
        <div className="p-4 border-t" style={{ borderColor: '#cbd5e1', backgroundColor: '#ffffff' }}>
          <AnimatePresence mode="wait">
            {!collapsed ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2"
              >
                <motion.button
                  onClick={handleEmailClick}
                  className="w-full flex items-center gap-2 p-2 rounded-lg transition-all duration-200 cursor-pointer"
                  style={{ backgroundColor: '#f8fafc' }}
                  whileHover={{ backgroundColor: '#e2e8f0', x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#1b527c' }} />
                  <span className="text-xs font-medium truncate" style={{ color: '#111827' }}>
                    rodrigoingsis@gmail.com
                  </span>
                </motion.button>
                
                <motion.button
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center gap-2 p-2 rounded-lg transition-all duration-200 cursor-pointer"
                  style={{ backgroundColor: '#f8fafc' }}
                  whileHover={{ backgroundColor: '#e2e8f0', x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#1b527c' }} />
                  <span className="text-xs font-medium" style={{ color: '#111827' }}>
                    (55) 3401 0097
                  </span>
                </motion.button>
                
                <div className="flex items-center justify-center gap-2 mt-2 pt-2 border-t" style={{ borderColor: '#e2e8f0' }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#16a34a' }} />
                  <p className="text-xs font-medium" style={{ color: '#6b7280' }}>
                    v1.0.0 • Online
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center gap-3"
              >
                <motion.button
                  onClick={handleEmailClick}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                  style={{ backgroundColor: '#f8fafc' }}
                  whileHover={{ backgroundColor: '#e2e8f0', scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5" style={{ color: '#1b527c' }} />
                </motion.button>
                
                <motion.button
                  onClick={handleWhatsAppClick}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                  style={{ backgroundColor: '#f8fafc' }}
                  whileHover={{ backgroundColor: '#e2e8f0', scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-5 h-5" style={{ color: '#1b527c' }} />
                </motion.button>
                
                <div className="w-2 h-2 rounded-full mt-1" style={{ backgroundColor: '#16a34a' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* Botón flotante de toggle a la altura del perfil (solo desktop) */}
      {!isMobile && (
        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          className="fixed rounded-full flex items-center justify-center cursor-pointer shadow-lg z-50"
          style={{ 
            top: 54,
            left: collapsed ? 72 : 268,
            width: 32,
            height: 32,
            backgroundColor: '#ffffff',
            border: '2px solid #1b527c'
          }}
          animate={{ 
            left: collapsed ? 72 : 268
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.35, type: 'spring', stiffness: 280, damping: 28 }}
          aria-label={collapsed ? "Expandir sidebar" : "Contraer sidebar"}
        >
          <AnimatePresence mode="wait">
            {collapsed ? (
              <motion.div
                key="right"
                initial={{ x: -5, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-5 h-5" style={{ color: '#1b527c' }} />
              </motion.div>
            ) : (
              <motion.div
                key="left"
                initial={{ x: 5, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronLeft className="w-5 h-5" style={{ color: '#1b527c' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </>
  );
}