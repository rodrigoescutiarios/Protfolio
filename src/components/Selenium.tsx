import React, { useState } from 'react';
import { Github, BookOpen, Copy, CheckCircle, Terminal, FileCode, Folder, Play, AlertCircle, Package, Settings, Database } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Selenium() {
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
      title: t('selenium.step1.title'),
      description: t('selenium.step1.desc'),
      code: 'git clone https://github.com/rodrigoescutiarios/Selenium-automatizacion.git\ncd Selenium-automatizacion',
      icon: Terminal,
    },
    {
      id: 'step2',
      title: t('selenium.step2.title'),
      description: t('selenium.step2.desc'),
      code: 'java -version\nmvn -version\ngoogle-chrome --version',
      icon: CheckCircle,
    },
    {
      id: 'step3',
      title: t('selenium.step3.title'),
      description: t('selenium.step3.desc'),
      code: 'mvn clean install',
      icon: Package,
    },
    {
      id: 'step4',
      title: t('selenium.step4.title'),
      description: t('selenium.step4.desc'),
      code: 'Selenium-automatizacion/\n├── src/main/java/com/selenium/\n│   ├── contants/Urls.java\n│   ├── pages/LoginPage.java\n│   └── utils/\n│       ├── BasePage.java\n│       ├── DriverManager.java\n│       └── WordReporter.java\n└── src/test/\n    ├── java/com/selenium/\n    │   ├── hooks/Hooks.java\n    │   ├── runners/TestRunner.java\n    │   └── stepdefinitions/LoginSteps.java\n    └── resources/features/login.feature',
      icon: Folder,
    },
    {
      id: 'step5',
      title: t('selenium.step5.title'),
      description: t('selenium.step5.desc'),
      code: '// En src/main/java/com/selenium/utils/DriverManager.java\n// WebDriverManager descarga automáticamente ChromeDriver\nWebDriverManager.chromedriver().setup();\ndriver = new ChromeDriver(options);',
      icon: Settings,
    },
    {
      id: 'step6',
      title: t('selenium.step6.title'),
      description: t('selenium.step6.desc'),
      code: 'mvn clean test',
      icon: Play,
    },
    {
      id: 'step7',
      title: t('selenium.step7.title'),
      description: t('selenium.step7.desc'),
      code: '# Windows\nstart target/cucumber-reports/cucumber.html\n\n# Linux/Mac\nopen target/cucumber-reports/cucumber.html',
      icon: CheckCircle,
    },
    {
      id: 'step8',
      title: t('selenium.step8.title'),
      description: t('selenium.step8.desc'),
      code: 'ls test-reports/\n# Deberías ver archivos .docx con fecha y hora',
      icon: FileCode,
    },
  ];

  const guideSteps = [
    {
      id: 'guide1',
      title: t('selenium.guide1.title'),
      description: t('selenium.guide1.desc'),
      code: `package com.selenium.constants;

public class SearchUrls {
    public static final String GOOGLE_URL = "https://www.google.com";
    public static final String SEARCH_TERM = "Automatización";
}`,
      icon: FileCode,
    },
    {
      id: 'guide2',
      title: t('selenium.guide2.title'),
      description: t('selenium.guide2.desc'),
      code: `package com.selenium.pages;

import com.selenium.utils.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class GoogleSearchPage extends BasePage {

    // Selectores
    @FindBy(name = "q")
    private WebElement searchInput;

    @FindBy(id = "result-stats")
    private WebElement resultsStats;

    private By firstResult = By.cssSelector("h3");
    private By acceptCookiesButton = By.xpath("//button[contains(., 'Aceptar')]");

    public GoogleSearchPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }

    public void navigateToGoogle() {
        execute("Navegar a Google", () -> {
            driver.get("https://www.google.com");
        });
    }

    public void acceptCookiesIfPresent() {
        execute("Aceptar cookies si aparecen", () -> {
            try {
                WebElement acceptButton = wait.until(
                    ExpectedConditions.elementToBeClickable(acceptCookiesButton)
                );
                acceptButton.click();
            } catch (Exception e) {
                System.out.println("No apareció banner de cookies");
            }
        });
    }

    public void searchFor(String searchTerm) {
        execute("Buscar: " + searchTerm, () -> {
            searchInput.clear();
            searchInput.sendKeys(searchTerm);
            searchInput.submit();
        });
    }

    public void waitForResults() {
        execute("Esperar resultados de búsqueda", () -> {
            wait.until(ExpectedConditions.visibilityOf(resultsStats));
        });
    }

    public void verifyResultsContain(String expectedTerm) {
        execute("Verificar que resultados contienen: " + expectedTerm, () -> {
            WebElement firstResultElement = wait.until(
                ExpectedConditions.presenceOfElementLocated(firstResult)
            );
            String resultText = firstResultElement.getText().toLowerCase();
            
            if (!resultText.contains(expectedTerm.toLowerCase())) {
                throw new AssertionError(
                    "El primer resultado no contiene: " + expectedTerm
                );
            }
        });
    }

    public void getResultsCount() {
        execute("Obtener cantidad de resultados", () -> {
            String statsText = resultsStats.getText();
            System.out.println("Estadísticas de resultados: " + statsText);
        });
    }
}`,
      icon: FileCode,
    },
    {
      id: 'guide3',
      title: t('selenium.guide3.title'),
      description: t('selenium.guide3.desc'),
      code: `@google @search
Feature: Búsqueda en Google
  Como usuario de Google
  Quiero buscar información en el buscador
  Para encontrar resultados relevantes

  Background:
    Given el usuario navega a Google

  @smoke @TC01
  Scenario: Buscar la palabra "Automatización" en Google
    When el usuario acepta las cookies si aparecen
    And el usuario busca "Automatización"
    Then el usuario debería ver resultados de búsqueda
    And los resultados deberían contener "Automatización"

  @regression @TC02
  Scenario: Verificar estadísticas de resultados
    When el usuario acepta las cookies si aparecen
    And el usuario busca "Selenium WebDriver"
    Then el usuario debería ver resultados de búsqueda
    And el usuario puede ver la cantidad de resultados encontrados`,
      icon: FileCode,
    },
    {
      id: 'guide4',
      title: t('selenium.guide4.title'),
      description: t('selenium.guide4.desc'),
      code: `package com.selenium.stepdefinitions;

import com.selenium.pages.GoogleSearchPage;
import com.selenium.utils.DriverManager;
import io.cucumber.java.en.*;
import org.openqa.selenium.WebDriver;

public class GoogleSearchSteps {

    private WebDriver driver;
    private GoogleSearchPage googlePage;

    public GoogleSearchSteps() {
        this.driver = DriverManager.getDriver();
        this.googlePage = new GoogleSearchPage(driver);
    }

    @Given("el usuario navega a Google")
    public void elUsuarioNavegaAGoogle() {
        googlePage.navigateToGoogle();
    }

    @When("el usuario acepta las cookies si aparecen")
    public void elUsuarioAceptaLasCookiesSiAparecen() {
        googlePage.acceptCookiesIfPresent();
    }

    @When("el usuario busca {string}")
    public void elUsuarioBusca(String searchTerm) {
        googlePage.searchFor(searchTerm);
    }

    @Then("el usuario debería ver resultados de búsqueda")
    public void elUsuarioDeberiaVerResultadosDeBusqueda() {
        googlePage.waitForResults();
    }

    @Then("los resultados deberían contener {string}")
    public void losResultadosDeberianContener(String expectedTerm) {
        googlePage.verifyResultsContain(expectedTerm);
    }

    @Then("el usuario puede ver la cantidad de resultados encontrados")
    public void elUsuarioPuedeVerLaCantidadDeResultadosEncontrados() {
        googlePage.getResultsCount();
    }
}`,
      icon: FileCode,
    },
    {
      id: 'guide5',
      title: t('selenium.guide5.title'),
      description: t('selenium.guide5.desc'),
      code: `package com.selenium.hooks;

import com.selenium.utils.DriverManager;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;

public class Hooks {

    @Before
    public void setup(Scenario scenario) {
        System.out.println("Iniciando test: " + scenario.getName());
        DriverManager.initDriver();
    }

    @After
    public void teardown(Scenario scenario) {
        System.out.println("Finalizando test: " + scenario.getName());
        
        if (scenario.isFailed()) {
            System.out.println("Test falló: " + scenario.getName());
        }
        
        DriverManager.quitDriver();
    }
}`,
      icon: CheckCircle,
    },
    {
      id: 'guide6',
      title: t('selenium.guide6.title'),
      description: t('selenium.guide6.desc'),
      code: `package com.selenium.runners;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = "src/test/resources/features",
    glue = {"com.selenium.stepdefinitions", "com.selenium.hooks"},
    plugin = {
        "pretty",
        "html:target/cucumber-reports/cucumber.html",
        "json:target/cucumber-reports/cucumber.json",
        "com.selenium.utils.WordReporter"
    },
    tags = "@search"
)
public class TestRunner {
}`,
      icon: Settings,
    },
    {
      id: 'guide7',
      title: t('selenium.guide7.title'),
      description: t('selenium.guide7.desc'),
      code: '# Ejecutar solo tests con tag @search\nmvn clean test -Dcucumber.filter.tags="@search"\n\n# Ejecutar solo el TC01\nmvn clean test -Dcucumber.filter.tags="@TC01"\n\n# Ejecutar smoke tests\nmvn clean test -Dcucumber.filter.tags="@smoke"',
      icon: Play,
    },
    {
      id: 'guide8',
      title: t('selenium.guide8.title'),
      description: t('selenium.guide8.desc'),
      code: `# Reporte HTML de Cucumber
start target/cucumber-reports/cucumber.html

# Reportes Word se generan en:
# test-reports/test-report-[fecha-hora].docx

# Screenshots se guardan en:
# screenshots/[paso]_[timestamp].png`,
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
                    {t('selenium.step')} {index + 1}
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
                        <span>{t('selenium.copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t('selenium.copy')}</span>
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
              {t('selenium.title')} - {t('selenium.framework')}
            </h1>
            <p className="text-base text-white opacity-90">
              {t('selenium.subtitle')}
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
            <span>{t('selenium.tab.github')}</span>
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
            <span>{t('selenium.tab.guide')}</span>
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
                  {t('selenium.preReq.title')}
                </h3>
                <ul className="space-y-1 text-sm" style={{ color: colors.textSecondary }}>
                  <li>• {t('selenium.preReq.java')}</li>
                  <li>• {t('selenium.preReq.maven')}</li>
                  <li>• {t('selenium.preReq.ide')}</li>
                  <li>• {t('selenium.preReq.chrome')}</li>
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
                  {t('selenium.guide.intro.title')}
                </h3>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {t('selenium.guide.intro.desc')}
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
                {t('selenium.tips.title')}
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: colors.textSecondary }}>
                <li>• <strong>Selectores:</strong> {t('selenium.tips.selectors')}</li>
                <li>• <strong>Esperas:</strong> {t('selenium.tips.waits')} <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bgMain, fontFamily: 'monospace' }}>{t('selenium.tips.waits.code1')}</code> {t('selenium.tips.waits.with')} <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bgMain, fontFamily: 'monospace' }}>{t('selenium.tips.waits.code2')}</code></li>
                <li>• <strong>Page Factory:</strong> {t('selenium.tips.pagefactory')} <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bgMain, fontFamily: 'monospace' }}>{t('selenium.tips.pagefactory.code')}</code> {t('selenium.tips.pagefactory.desc')}</li>
                <li>• <strong>Tags:</strong> {t('selenium.tips.tags')}</li>
                <li>• <strong>Reportes:</strong> {t('selenium.tips.screenshots')} <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bgMain, fontFamily: 'monospace' }}>{t('selenium.tips.screenshots.code')}</code> {t('selenium.tips.screenshots.desc')}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}