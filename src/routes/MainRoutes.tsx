import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
} from './Sections';
import Dashboard from '../components/Dashboard';
import Cypress from '../components/Cypress';
import KarateBDD from '../components/KarateBDD';
import Mentoria from '../components/Mentoria';
import Playwright from '../components/Playwright';
import Selenium from '../components/Selenium';
import Appium from '../components/Appium';
import '../styles/theme.css';

const MainRoutes: React.FC = () => {


  // Para sincronizar el ancho del sidebar en desktop
  const [sidebarWidth, setSidebarWidth] = React.useState(280);
  React.useEffect(() => {
    const handler = () => {
      // Detectar si sidebar está colapsado leyendo el DOM
      const sidebar = document.querySelector('aside.fixed');
      if (sidebar) {
        const width = (sidebar as HTMLElement).offsetWidth;
        setSidebarWidth(width);
      }
    };
    window.addEventListener('resize', handler);
    const interval = setInterval(handler, 200); // fallback para animación
    handler();
    return () => {
      window.removeEventListener('resize', handler);
      clearInterval(interval);
    };
  }, []);

  // Detectar mobile para ajustar el layout
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    handler();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <Router>
      <Sidebar />
      <div
        className="main-content-layout"
        style={{
          minHeight: '100vh',
          background: 'var(--color-bg-secondary)',
          transition: 'margin-left 0.35s cubic-bezier(.4,0,.2,1)',
          marginLeft: isMobile ? 0 : `max(${sidebarWidth}px, 0px)`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        <main style={{ flex: 1, padding: '2rem', background: 'var(--color-bg-secondary)', transition: 'background var(--transition-main)' }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/playwright" element={<Playwright />} />
            <Route path="/cypress" element={<Cypress />} />
            <Route path="/selenium" element={<Selenium />} />
            <Route path="/appium" element={<Appium />} />
            <Route path="/karate-bdd" element={<KarateBDD />} />
            <Route path="/mentoria" element={<Mentoria />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default MainRoutes;
