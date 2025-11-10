import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Dashboard() {
  const { t } = useLanguage();
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>{t('dashboard.title')}</h2>
      <p>{t('dashboard.content')}</p>
    </div>
  );
}
