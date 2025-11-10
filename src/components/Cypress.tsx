import React, { useState } from 'react';
import { Github, BookOpen, Copy, CheckCircle, Terminal, FileCode, Folder, Play, AlertCircle, Package, Settings } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Cypress() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'github' | 'guide'>('github');
  const [copiedSteps, setCopiedSteps] = useState<{ [key: string]: boolean }>({});

  const copyToClipboard = (text: string, stepId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSteps({ ...copiedSteps, [stepId]: true });
    setTimeout(() => {
      setCopiedSteps({ ...copiedSteps, [stepId]: false });
    }, 2000);
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
  };

  const githubSteps = [
    {
      id: 'step1',
      title: t('cypress.step1.title'),
      description: t('cypress.step1.desc'),
      code: 'git clone https://github.com/rodrigoescutiarios/Cypress-automatizacion.git\ncd Cypress-automatizacion',
      icon: Terminal,
    },
    {
      id: 'step2',
      title: t('cypress.step2.title'),
      description: t('cypress.step2.desc'),
      code: 'node --version\nnpm --version',
      icon: CheckCircle,
    },
    {
      id: 'step3',
      title: t('cypress.step3.title'),
      description: t('cypress.step3.desc'),
      code: 'npm install',
      icon: Package,
    },
    {
      id: 'step4',
      title: t('cypress.step4.title'),
      description: t('cypress.step4.desc'),
      code: 'npm install cypress-xpath --save-dev\nnpm install docx --save-dev',
      icon: Package,
    },
    {
      id: 'step5',
      title: t('cypress.step5.title'),
      description: t('cypress.step5.desc'),
      code: 'Cypress/\n├── constants/\n│   └── urls.ts\n├── pages/\n│   └── Login.ts\n├── tests/\n│   └── login.spec.ts\n├── utils/\n│   ├── base-page.ts\n│   └── support.ts\n├── reporters/\n│   └── word-reporter.ts\n├── test-reports/\n├── images/\n│   └── logo_original.png\n├── cypress.config.ts\n└── package.json',
      icon: Folder,
    },
    {
      id: 'step6',
      title: t('cypress.step6.title'),
      description: t('cypress.step6.desc'),
      code: '// En cypress.config.ts\nexport default defineConfig({\n  e2e: {\n    baseUrl: \'https://practica.testqacademy.com\',\n    specPattern: \'./tests/**/*.spec.ts\',\n    defaultCommandTimeout: 30000,\n    pageLoadTimeout: 30000,\n  }\n});',
      icon: Settings,
    },
    {
      id: 'step7',
      title: t('cypress.step7.title'),
      description: t('cypress.step7.desc'),
      code: 'npm run test',
      icon: Play,
    },
    {
      id: 'step8',
      title: t('cypress.step8.title'),
      description: t('cypress.step8.desc'),
      code: '# Windows\nstart test-reports/index.html\n\n# Linux/Mac\nopen test-reports/index.html',
      icon: CheckCircle,
    },
    {
      id: 'step9',
      title: t('cypress.step9.title'),
      description: t('cypress.step9.desc'),
      code: 'ls test-reports/\n# Deberías ver archivos .docx con fecha y hora',
      icon: FileCode,
    },
    {
      id: 'step10',
      title: t('cypress.step10.title'),
      description: t('cypress.step10.desc'),
      code: 'npm run test:open',
      icon: Play,
    },
  ];

  const guideSteps = [
    {
      id: 'guide1',
      title: t('cypress.guide1.title'),
      description: t('cypress.guide1.desc'),
      code: `export const GOOGLE_URL = 'https://www.google.com';
export const SEARCH_TERM = 'Automatización';`,
      icon: FileCode,
    },
    {
      id: 'guide2',
      title: t('cypress.guide2.title'),
      description: t('cypress.guide2.desc'),
      code: `import { BasePage } from '../utils/base-page';

export class GoogleSearchPage extends BasePage {
  
  // Selectores
  private searchInput = 'textarea[name="q"]';
  private resultsStats = '#result-stats';
  private firstResult = 'h3';
  private acceptCookiesButton = '//button[contains(., "Aceptar")]';

  async navigateToGoogle() {
    this.execute('Navegar a Google', () => {
      cy.visit('https://www.google.com');
    });
  }

  async acceptCookiesIfPresent() {
    this.execute('Aceptar cookies si aparecen', () => {
      cy.xpath(this.acceptCookiesButton, { timeout: 5000 })
        .should('be.visible')
        .click()
        .then(() => {
          cy.log('Cookies aceptadas');
        })
        .catch(() => {
          cy.log('No apareció banner de cookies');
        });
    });
  }

  async searchFor(searchTerm: string) {
    this.execute(\`Buscar: \${searchTerm}\`, () => {
      cy.get(this.searchInput)
        .clear()
        .type(\`\${searchTerm}{enter}\`);
    });
  }

  async waitForResults() {
    this.execute('Esperar resultados de búsqueda', () => {
      cy.get(this.resultsStats, { timeout: 10000 })
        .should('be.visible');
    });
  }

  async verifyResultsContain(expectedTerm: string) {
    this.execute(\`Verificar que resultados contienen: \${expectedTerm}\`, () => {
      cy.get(this.firstResult)
        .first()
        .invoke('text')
        .then((text) => {
          expect(text.toLowerCase()).to.include(expectedTerm.toLowerCase());
        });
    });
  }

  async getResultsCount() {
    this.execute('Obtener cantidad de resultados', () => {
      cy.get(this.resultsStats)
        .invoke('text')
        .then((text) => {
          cy.log(\`Estadísticas de resultados: \${text}\`);
        });
    });
  }
}`,
      icon: FileCode,
    },
    {
      id: 'guide3',
      title: t('cypress.guide3.title'),
      description: t('cypress.guide3.desc'),
      code: `import { GoogleSearchPage } from '../pages/GoogleSearchPage';

describe('Búsqueda en Google', () => {
  let googlePage: GoogleSearchPage;

  beforeEach(() => {
    googlePage = new GoogleSearchPage();
  });

  it('TC01 - Buscar la palabra "Automatización" en Google', () => {
    googlePage.navigateToGoogle();
    googlePage.acceptCookiesIfPresent();
    googlePage.searchFor('Automatización');
    googlePage.waitForResults();
    googlePage.verifyResultsContain('Automatización');
  });

  it('TC02 - Verificar estadísticas de resultados', () => {
    googlePage.navigateToGoogle();
    googlePage.acceptCookiesIfPresent();
    googlePage.searchFor('Cypress Testing');
    googlePage.waitForResults();
    googlePage.getResultsCount();
  });

  it('TC03 - Buscar múltiples términos', () => {
    googlePage.navigateToGoogle();
    googlePage.acceptCookiesIfPresent();
    
    const searchTerms = ['JavaScript', 'TypeScript', 'Cypress'];
    
    searchTerms.forEach((term) => {
      googlePage.searchFor(term);
      googlePage.waitForResults();
      googlePage.verifyResultsContain(term);
    });
  });
});`,
      icon: FileCode,
    },
    {
      id: 'guide4',
      title: t('cypress.guide4.title'),
      description: t('cypress.guide4.desc'),
      code: `export class BasePage {
  protected execute(stepName: string, action: () => void) {
    cy.log(\`📍 \${stepName}\`);
    
    // Ejecutar la acción
    action();
    
    // Captura automática de screenshot
    const timestamp = new Date().getTime();
    const sanitizedName = stepName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    cy.screenshot(\`\${sanitizedName}_\${timestamp}\`);
  }
}`,
      icon: CheckCircle,
    },
    {
      id: 'guide5',
      title: t('cypress.guide5.title'),
      description: t('cypress.guide5.desc'),
      code: `import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://practica.testqacademy.com',
    specPattern: './tests/**/*.spec.ts',
    screenshotsFolder: 'test-results/screenshots',
    videosFolder: 'test-results/videos',
    video: true,
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 30000,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'test-reports',
      overwrite: false,
      html: true,
      json: true,
    },
  },
});`,
      icon: Settings,
    },
    {
      id: 'guide6',
      title: t('cypress.guide6.title'),
      description: t('cypress.guide6.desc'),
      code: `{
  "scripts": {
    "test": "cypress run",
    "test:open": "cypress open",
    "test:google": "cypress run --spec tests/google-search.spec.ts",
    "test:headed": "cypress run --headed --browser chrome",
    "report": "npx cypress run --reporter mochawesome"
  }
}`,
      icon: Settings,
    },
    {
      id: 'guide7',
      title: t('cypress.guide7.title'),
      description: t('cypress.guide7.desc'),
      code: '# Ejecutar solo el test de Google\nnpm run test:google\n\n# Ejecutar con navegador visible\nnpm run test:headed\n\n# Ejecutar test específico por nombre\nnpx cypress run --spec "tests/google-search.spec.ts" --grep "TC01"',
      icon: Play,
    },
    {
      id: 'guide8',
      title: t('cypress.guide8.title'),
      description: t('cypress.guide8.desc'),
      code: `# Reporte HTML de Mochawesome
open test-reports/index.html

# Reportes Word se generan en:
# test-reports/test-report-[fecha-hora].docx

# Screenshots se guardan en:
# test-results/screenshots/

# Videos se guardan en:
# test-results/videos/`,
      icon: CheckCircle,
    },
  ];

  const renderSteps = (steps: typeof githubSteps) => (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCopied = copiedSteps[step.id];
        
        return (
          <div
            key={step.id}
            className="rounded-lg overflow-hidden transition-all hover:shadow-lg"
            style={{
              backgroundColor: colors.bgCard,
              border: `1px solid ${colors.border}`,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            }}
          >
            {/* Header */}
            <div 
              className="px-5 py-4 flex items-center gap-3" 
              style={{ 
                borderBottom: `1px solid ${colors.border}`,
                background: `linear-gradient(to right, ${colors.accentLight}, ${colors.bgCard})`,
              }}
            >
              <div
                className="rounded-lg flex items-center justify-center"
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: colors.primary,
                  boxShadow: '0 2px 8px rgba(27, 82, 124, 0.2)',
                }}
              >
                <Icon className="w-5 h-5" style={{ color: '#ffffff' }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span 
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ 
                      backgroundColor: colors.secondary,
                      color: '#ffffff',
                    }}
                  >
                    {t('cypress.step')} {index + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold" style={{ color: colors.textPrimary }}>
                  {step.title}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="px-5 py-4">
              <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>
                {step.description}
              </p>

              {/* Code Block */}
              <div
                className="rounded-md overflow-hidden"
                style={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                }}
              >
                <div
                  className="px-4 py-2 flex items-center justify-between"
                  style={{ backgroundColor: '#0f172a' }}
                >
                  <span className="text-xs font-mono" style={{ color: '#94a3b8' }}>
                    terminal
                  </span>
                  <button
                    onClick={() => copyToClipboard(step.code, step.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer"
                    style={{
                      backgroundColor: isCopied ? colors.success : '#334155',
                      color: '#ffffff',
                    }}
                    onMouseEnter={(e) => {
                      if (!isCopied) {
                        e.currentTarget.style.backgroundColor = '#475569';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isCopied) {
                        e.currentTarget.style.backgroundColor = '#334155';
                      }
                    }}
                  >
                    {isCopied ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{t('cypress.copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t('cypress.copy')}</span>
                      </>
                    )}
                  </button>
                </div>
                <pre
                  className="p-4 overflow-x-auto text-sm font-mono leading-relaxed"
                  style={{ color: '#e2e8f0' }}
                >
                  {step.code}
                </pre>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: colors.bgMain }}>
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <div
          className="rounded-xl p-8 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            boxShadow: '0 4px 20px rgba(27, 82, 124, 0.25)',
          }}
        >
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2">
              {t('cypress.title')} - {t('cypress.framework')}
            </h1>
            <p className="text-base text-white opacity-90">
              {t('cypress.subtitle')}
            </p>
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

      {/* Tabs */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex gap-1" style={{ borderBottom: `2px solid ${colors.border}` }}>
          <button
            onClick={() => setActiveTab('github')}
            className="flex items-center gap-2 px-5 py-3 font-semibold transition-all cursor-pointer"
            style={{
              color: activeTab === 'github' ? colors.primary : colors.textSecondary,
              borderBottom: activeTab === 'github' ? `3px solid ${colors.primary}` : '3px solid transparent',
              marginBottom: '-2px',
              backgroundColor: activeTab === 'github' ? colors.accentLight : 'transparent',
              borderRadius: '8px 8px 0 0',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'github') {
                e.currentTarget.style.backgroundColor = '#f8fafc';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'github') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <Github className="w-4 h-4" />
            <span>{t('cypress.tab.github')}</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className="flex items-center gap-2 px-5 py-3 font-semibold transition-all cursor-pointer"
            style={{
              color: activeTab === 'guide' ? colors.primary : colors.textSecondary,
              borderBottom: activeTab === 'guide' ? `3px solid ${colors.primary}` : '3px solid transparent',
              marginBottom: '-2px',
              backgroundColor: activeTab === 'guide' ? colors.accentLight : 'transparent',
              borderRadius: '8px 8px 0 0',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'guide') {
                e.currentTarget.style.backgroundColor = '#f8fafc';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'guide') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t('cypress.tab.guide')}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto">
        {activeTab === 'github' && (
          <div>
            <div
              className="mb-6 p-5 rounded-lg flex items-start gap-3"
              style={{
                backgroundColor: colors.accentLight,
                border: `1px solid ${colors.secondary}`,
              }}
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
              <div>
                <h3 className="text-sm font-bold mb-2" style={{ color: colors.primary }}>
                  {t('cypress.preReq.title')}
                </h3>
                <ul className="space-y-1 text-sm" style={{ color: colors.textSecondary }}>
                  <li>• {t('cypress.preReq.node')}</li>
                  <li>• {t('cypress.preReq.npm')}</li>
                  <li>• {t('cypress.preReq.editor')}</li>
                  <li>• {t('cypress.preReq.chrome')}</li>
                </ul>
              </div>
            </div>
            {renderSteps(githubSteps)}
          </div>
        )}

        {activeTab === 'guide' && (
          <div>
            <div
              className="mb-6 p-5 rounded-lg flex items-start gap-3"
              style={{
                backgroundColor: colors.accentLight,
                border: `1px solid ${colors.secondary}`,
              }}
            >
              <BookOpen className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
              <div>
                <h3 className="text-sm font-bold mb-2" style={{ color: colors.primary }}>
                  {t('cypress.guide.intro.title')}
                </h3>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {t('cypress.guide.intro.desc')}
                </p>
              </div>
            </div>
            {renderSteps(guideSteps)}

            {/* Footer Tips */}
            <div
              className="mt-6 p-5 rounded-lg"
              style={{
                backgroundColor: colors.bgCard,
                border: `1px solid ${colors.border}`,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: colors.textPrimary }}>
                <CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
                {t('cypress.tips.title')}
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: colors.textSecondary }}>
                <li>• <strong>{t('cypress.tips.selectors')}</strong> {t('cypress.tips.selectors.desc')}</li>
                <li>• <strong>{t('cypress.tips.waits')}</strong> {t('cypress.tips.waits.desc')} <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bgMain, fontFamily: 'monospace' }}>timeout</code> {t('cypress.tips.waits.desc2')}</li>
                <li>• <strong>{t('cypress.tips.pageObjects')}</strong> {t('cypress.tips.pageObjects.desc')} <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bgMain, fontFamily: 'monospace' }}>BasePage</code> {t('cypress.tips.pageObjects.desc2')}</li>
                <li>• <strong>{t('cypress.tips.hooks')}</strong> {t('cypress.tips.hooks.desc')} <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bgMain, fontFamily: 'monospace' }}>beforeEach()</code> {t('cypress.tips.hooks.desc2')} <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bgMain, fontFamily: 'monospace' }}>afterEach()</code> {t('cypress.tips.hooks.desc3')}</li>
                <li>• <strong>{t('cypress.tips.reports')}</strong> {t('cypress.tips.reports.desc')} <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bgMain, fontFamily: 'monospace' }}>execute()</code> {t('cypress.tips.reports.desc2')}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}