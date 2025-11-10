import React, { useState } from 'react';
import { Github, BookOpen, Copy, CheckCircle, Terminal, FileCode, Folder, Play, AlertCircle, Package, Settings } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Playwright() {
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
      title: t('playwright.step1.title'),
      description: t('playwright.step1.desc'),
      code: 'git clone https://github.com/rodrigoescutiarios/Playwright-automatizacion.git\ncd Playwright-automatizacion',
      icon: Terminal,
    },
    {
      id: 'step2',
      title: t('playwright.step2.title'),
      description: t('playwright.step2.desc'),
      code: 'node --version\nnpm --version',
      icon: CheckCircle,
    },
    {
      id: 'step3',
      title: t('playwright.step3.title'),
      description: t('playwright.step3.desc'),
      code: 'npm install',
      icon: Package,
    },
    {
      id: 'step4',
      title: t('playwright.step4.title'),
      description: t('playwright.step4.desc'),
      code: 'npx playwright install',
      icon: Terminal,
    },
    {
      id: 'step5',
      title: t('playwright.step5.title'),
      description: t('playwright.step5.desc'),
      code: 'npm install docx --save-dev',
      icon: Package,
    },
    {
      id: 'step6',
      title: t('playwright.step6.title'),
      description: t('playwright.step6.desc'),
      code: 'Playwright/\n├── constants/\n│   └── urls.ts\n├── pages/\n│   └── Login.tsx\n├── tests/\n│   └── login.spec.ts\n├── utils/\n│   └── base-page.ts\n├── reporters/\n│   └── word-reporter.ts\n└── playwright.config.ts',
      icon: Folder,
    },
    {
      id: 'step7',
      title: t('playwright.step7.title'),
      description: t('playwright.step7.desc'),
      code: 'npx playwright test',
      icon: Play,
    },
    {
      id: 'step8',
      title: t('playwright.step8.title'),
      description: t('playwright.step8.desc'),
      code: 'npx playwright show-report',
      icon: CheckCircle,
    },
  ];

  const guideSteps = [
    {
      id: 'guide1',
      title: t('playwright.guide1.title'),
      description: t('playwright.guide1.desc'),
      code: `export const BASE_URL = 'https://www.google.com';
export const SEARCH_TERM = 'Automatización';`,
      icon: FileCode,
    },
    {
      id: 'guide2',
      title: t('playwright.guide2.title'),
      description: t('playwright.guide2.desc'),
      code: `import { expect } from '@playwright/test';
import { BasePage } from '../utils/base-page';

export class GoogleSearchPage extends BasePage {
    // Selectores
    private searchInput = 'textarea[name="q"]';
    private searchButton = 'input[name="btnK"]';
    private resultsStats = '#result-stats';
    private firstResult = 'h3';

    // Métodos
    async navigateToGoogle() {
        await this.execute('Navegar a Google', async () => {
            await this.page.goto('https://www.google.com');
        });
    }

    async acceptCookies() {
        try {
            await this.execute('Aceptar cookies si aparecen', async () => {
                const acceptButton = this.page.locator('button:has-text("Aceptar todo")');
                if (await acceptButton.isVisible({ timeout: 3000 })) {
                    await acceptButton.click();
                }
            });
        } catch (error) {
            console.log('No apareció banner de cookies');
        }
    }

    async searchFor(term: string) {
        await this.execute(\`Buscar: "\${term}"\`, async () => {
            await this.page.fill(this.searchInput, term);
            await this.page.press(this.searchInput, 'Enter');
        });
    }

    async waitForResults() {
        await this.execute('Esperar resultados de búsqueda', async () => {
            await this.page.waitForSelector(this.resultsStats, { 
                timeout: 10000 
            });
        });
    }

    async verifyResultsContain(term: string) {
        await this.execute(\`Verificar resultados contienen: "\${term}"\`, async () => {
            const firstResultText = await this.page
                .locator(this.firstResult)
                .first()
                .textContent();
            
            expect(firstResultText?.toLowerCase()).toContain(term.toLowerCase());
        });
    }

    async getResultsCount() {
        await this.execute('Obtener cantidad de resultados', async () => {
            const statsText = await this.page.textContent(this.resultsStats);
            console.log('Estadísticas de resultados:', statsText);
        });
    }
}`,
      icon: FileCode,
    },
    {
      id: 'guide3',
      title: t('playwright.guide3.title'),
      description: t('playwright.guide3.desc'),
      code: `import { test } from '@playwright/test';
import { GoogleSearchPage } from '../pages/GoogleSearchPage';
import { BASE_URL, SEARCH_TERM } from '../constants/search-urls';

test.describe('Búsqueda en Google', () => {
    
    test('TC01 - Buscar la palabra "Automatización" en Google', async ({ page }) => {
        const googlePage = new GoogleSearchPage(page);
        
        // Paso 1: Navegar a Google
        await googlePage.navigateToGoogle();
        
        // Paso 2: Aceptar cookies si aparecen
        await googlePage.acceptCookies();
        
        // Paso 3: Realizar búsqueda
        await googlePage.searchFor(SEARCH_TERM);
        
        // Paso 4: Esperar y verificar resultados
        await googlePage.waitForResults();
        
        // Paso 5: Verificar que los resultados contienen el término
        await googlePage.verifyResultsContain(SEARCH_TERM);
        
        // Paso 6: Obtener estadísticas
        await googlePage.getResultsCount();
    });

    test('TC02 - Verificar múltiples resultados de búsqueda', async ({ page }) => {
        const googlePage = new GoogleSearchPage(page);
        
        await googlePage.navigateToGoogle();
        await googlePage.acceptCookies();
        await googlePage.searchFor('Playwright testing');
        await googlePage.waitForResults();
        await googlePage.verifyResultsContain('playwright');
    });
});`,
      icon: FileCode,
    },
    {
      id: 'guide4',
      title: t('playwright.guide4.title'),
      description: t('playwright.guide4.desc'),
      code: `// utils/base-page.ts ya incluye el método execute()
// que captura screenshots automáticamente

import { Page } from '@playwright/test';

export class BasePage {
    constructor(protected page: Page) {}

    async execute(stepName: string, action: () => Promise<void>) {
        await test.step(stepName, async () => {
            await action();
            await this.page.screenshot({ 
                path: \`screenshots/\${stepName}.png\` 
            });
        });
    }
}`,
      icon: CheckCircle,
    },
    {
      id: 'guide5',
      title: t('playwright.guide5.title'),
      description: t('playwright.guide5.desc'),
      code: `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [
    ['html'],
    ['./reporters/word-reporter.ts']
  ],
  use: {
    trace: 'on',
    screenshot: 'on',
    video: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});`,
      icon: Settings,
    },
    {
      id: 'guide6',
      title: t('playwright.guide6.title'),
      description: t('playwright.guide6.desc'),
      code: 'npx playwright test google-search.spec.ts',
      icon: Play,
    },
    {
      id: 'guide7',
      title: t('playwright.guide7.title'),
      description: t('playwright.guide7.desc'),
      code: 'npx playwright test google-search.spec.ts --ui',
      icon: Play,
    },
    {
      id: 'guide8',
      title: t('playwright.guide8.title'),
      description: t('playwright.guide8.desc'),
      code: `# Reporte HTML interactivo
npx playwright show-report

# Reporte Word se genera en:
# test-reports/test-report-[fecha].docx`,
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
                    {t('playwright.step')} {index + 1}
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
                        <span>{t('playwright.copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t('playwright.copy')}</span>
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
              {t('playwright.title')} - {t('playwright.framework')}
            </h1>
            <p className="text-base text-white opacity-90">
              {t('playwright.subtitle')}
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
            <span>{t('playwright.tab.github')}</span>
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
            <span>{t('playwright.tab.guide')}</span>
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
                  {t('playwright.preReq.title')}
                </h3>
                <ul className="space-y-1 text-sm" style={{ color: colors.textSecondary }}>
                  <li>• {t('playwright.preReq.node')}</li>
                  <li>• {t('playwright.preReq.npm')}</li>
                  <li>• {t('playwright.preReq.vscode')}</li>
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
                  {t('playwright.guide.intro.title')}
                </h3>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {t('playwright.guide.intro.desc')}
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
                {t('playwright.tips.title')}
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: colors.textSecondary }}>
                <li>• <strong>Selectores:</strong> {t('playwright.tips.selectors')}</li>
                <li>• <strong>Esperas:</strong> {t('playwright.tips.waits')} <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bgMain, fontFamily: 'monospace' }}>{t('playwright.tips.waits.code')}</code> {t('playwright.tips.waits.when')}</li>
                <li>• <strong>Screenshots:</strong> {t('playwright.tips.screenshots')} <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bgMain, fontFamily: 'monospace' }}>{t('playwright.tips.screenshots.code')}</code></li>
                <li>• <strong>Reportes Word:</strong> {t('playwright.tips.reports')} <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bgMain, fontFamily: 'monospace' }}>{t('playwright.tips.reports.path')}</code></li>
                <li>• <strong>UI Mode:</strong> {t('playwright.tips.uimode')} <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bgMain, fontFamily: 'monospace' }}>{t('playwright.tips.uimode.code')}</code> {t('playwright.tips.uimode.desc')}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}