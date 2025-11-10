import { useState } from 'react';
import { Github, BookOpen, Copy, CheckCircle, Terminal, FileCode, Folder, Play, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Appium() {
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
      title: t('appium.step1.title'),
      description: t('appium.step1.desc'),
      code: 'git clone https://github.com/TU_USUARIO/mobile-automation-framework.git\ncd mobile-automation-framework',
      icon: Terminal,
    },
    {
      id: 'step2',
      title: t('appium.step2.title'),
      description: t('appium.step2.desc'),
      code: 'java -version\nmvn -version\nnode --version\nappium --version',
      icon: CheckCircle,
    },
    {
      id: 'step3',
      title: t('appium.step3.title'),
      description: t('appium.step3.desc'),
      code: 'npm install -g appium@latest\nappium driver install uiautomator2\nappium driver list --installed',
      icon: Terminal,
    },
    {
      id: 'step4',
      title: t('appium.step4.title'),
      description: t('appium.step4.desc'),
      code: '$env:ANDROID_HOME = "C:\\Users\\TU_USUARIO\\AppData\\Local\\Android\\Sdk"\n[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\\Users\\TU_USUARIO\\AppData\\Local\\Android\\Sdk", [System.EnvironmentVariableTarget]::User)\n$env:PATH += ";$env:ANDROID_HOME\\platform-tools;$env:ANDROID_HOME\\tools"',
      icon: Folder,
    },
    {
      id: 'step5',
      title: t('appium.step5.title'),
      description: t('appium.step5.desc'),
      code: 'mvn clean install',
      icon: Terminal,
    },
    {
      id: 'step6',
      title: t('appium.step6.title'),
      description: t('appium.step6.desc'),
      code: '# src/test/resources/config/config.properties\ndevice.name=TU_DEVICE_ID\napp.package=com.android.chrome\napp.activity=com.google.android.apps.chrome.Main',
      icon: FileCode,
    },
    {
      id: 'step7',
      title: t('appium.step7.title'),
      description: t('appium.step7.desc'),
      code: 'appium',
      icon: Play,
    },
    {
      id: 'step8',
      title: t('appium.step8.title'),
      description: t('appium.step8.desc'),
      code: 'adb devices\nmvn clean test',
      icon: Terminal,
    },
  ];

  const guideSteps = [
    {
      id: 'guide1',
      title: t('appium.guide1.title'),
      description: t('appium.guide1.desc'),
      code: `@mobile @search @google
Feature: Búsqueda en Google Chrome
  Como usuario de la aplicación móvil
  Quiero buscar la palabra "Automatización" en Google
  Para verificar los resultados de búsqueda

  @smoke @regression
  Scenario: Buscar la palabra Automatización en Google Chrome
    Given el usuario abre Google Chrome en el dispositivo
    When el usuario busca "Automatización" en Google
    Then el usuario debería ver resultados relacionados con "Automatización"`,
      icon: FileCode,
    },
    {
      id: 'guide2',
      title: t('appium.guide2.title'),
      description: t('appium.guide2.desc'),
      code: `package com.mobile.automation.pages;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.WebElement;

public class GoogleSearchPage extends BasePage {

    @AndroidFindBy(id = "com.android.chrome:id/search_box_text")
    private WebElement searchBox;

    @AndroidFindBy(xpath = "//android.widget.EditText[@resource-id='APjFqb']")
    private WebElement searchInput;

    @AndroidFindBy(xpath = "//android.widget.Button[@text='Buscar con Google']")
    private WebElement searchButton;

    @AndroidFindBy(xpath = "//*[contains(@text, 'Automatización')]")
    private WebElement searchResults;

    public GoogleSearchPage(AppiumDriver driver) {
        super(driver);
    }

    public void clickSearchBox() {
        waitForElement(searchBox, 10);
        click(searchBox);
    }

    public void enterSearchTerm(String searchTerm) {
        waitForElement(searchInput, 10);
        sendKeys(searchInput, searchTerm);
    }

    public void clickSearchButton() {
        waitForElement(searchButton, 5);
        click(searchButton);
    }

    public boolean verifySearchResults(String expectedTerm) {
        waitForElement(searchResults, 15);
        String resultsText = getText(searchResults);
        return resultsText.toLowerCase().contains(expectedTerm.toLowerCase());
    }

    public void performSearch(String searchTerm) {
        clickSearchBox();
        enterSearchTerm(searchTerm);
        clickSearchButton();
    }
}`,
      icon: FileCode,
    },
    {
      id: 'guide3',
      title: t('appium.guide3.title'),
      description: t('appium.guide3.desc'),
      code: `package com.mobile.automation.stepdefinitions;

import com.mobile.automation.config.DriverManager;
import com.mobile.automation.pages.GoogleSearchPage;
import io.appium.java_client.AppiumDriver;
import io.cucumber.java.en.*;
import org.testng.Assert;

public class BusquedaAutomatizacionSteps {
    
    private AppiumDriver driver;
    private GoogleSearchPage googleSearchPage;
    private String searchTerm;

    @Given("el usuario abre Google Chrome en el dispositivo")
    public void elUsuarioAbreGoogleChrome() {
        driver = DriverManager.getDriver();
        googleSearchPage = new GoogleSearchPage(driver);
        
        // Verificar que Chrome esté abierto
        Assert.assertNotNull(driver, "El driver de Appium no está inicializado");
        System.out.println("✓ Google Chrome abierto correctamente");
    }

    @When("el usuario busca {string} en Google")
    public void elUsuariaBuscaEnGoogle(String termino) {
        searchTerm = termino;
        
        try {
            // Realizar búsqueda
            googleSearchPage.performSearch(searchTerm);
            System.out.println("✓ Búsqueda realizada: " + searchTerm);
            
            // Esperar resultados
            Thread.sleep(3000);
        } catch (Exception e) {
            Assert.fail("Error al realizar la búsqueda: " + e.getMessage());
        }
    }

    @Then("el usuario debería ver resultados relacionados con {string}")
    public void elUsuarioDeberiaVerResultados(String terminoEsperado) {
        boolean resultsFound = googleSearchPage.verifySearchResults(terminoEsperado);
        
        Assert.assertTrue(resultsFound, 
            "No se encontraron resultados para: " + terminoEsperado);
        
        System.out.println("✓ Resultados verificados correctamente para: " + terminoEsperado);
    }
}`,
      icon: FileCode,
    },
    {
      id: 'guide4',
      title: t('appium.guide4.title'),
      description: t('appium.guide4.desc'),
      code: `package com.mobile.automation.runners;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;

@CucumberOptions(
    features = "src/test/resources/features",
    glue = {"com.mobile.automation.stepdefinitions", 
            "com.mobile.automation.hooks"},
    tags = "@mobile",
    plugin = {
        "pretty",
        "html:test-output/cucumber-reports/cucumber-html-report.html",
        "json:test-output/cucumber-reports/cucumber.json",
        "com.aventstack.extentreports.cucumber.adapter.ExtentCucumberAdapter:"
    }
)
public class TestRunner extends AbstractTestNGCucumberTests {
}`,
      icon: FileCode,
    },
    {
      id: 'guide5',
      title: t('appium.guide5.title'),
      description: t('appium.guide5.desc'),
      code: `# Terminal - Obtener device ID
adb devices

# Editar config.properties
device.name=ABC123XYZ
app.package=com.android.chrome
app.activity=com.google.android.apps.chrome.Main`,
      icon: Terminal,
    },
    {
      id: 'guide6',
      title: t('appium.guide6.title'),
      description: t('appium.guide6.desc'),
      code: 'appium\n\n# Deberías ver:\n# [Appium] Appium REST http interface listener started on http://127.0.0.1:4723',
      icon: Play,
    },
    {
      id: 'guide7',
      title: t('appium.guide7.title'),
      description: t('appium.guide7.desc'),
      code: `# Ejecutar solo este test por tag
mvn clean test -Dcucumber.filter.tags="@search"

# O ejecutar el feature específico
mvn test -Dcucumber.features="src/test/resources/features/busqueda_automatizacion.feature"

# Ejecutar todos los tests
mvn clean test`,
      icon: Terminal,
    },
    {
      id: 'guide8',
      title: t('appium.guide8.title'),
      description: t('appium.guide8.desc'),
      code: `# Windows
start test-output\\ExtentReports\\ExtentReport.html

# Linux/Mac
open test-output/ExtentReports/ExtentReport.html`,
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
                    {t('appium.step')} {index + 1}
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
                        <span>{t('appium.copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t('appium.copy')}</span>
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
              {t('appium.title')} - {t('appium.framework')}
            </h1>
            <p className="text-base text-white opacity-90">
              {t('appium.subtitle')}
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
            <span>{t('appium.tab.github')}</span>
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
            <span>{t('appium.tab.guide')}</span>
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
                  {t('appium.preReq.title')}
                </h3>
                <ul className="space-y-1 text-sm" style={{ color: colors.textSecondary }}>
                  <li>• {t('appium.preReq.java')}</li>
                  <li>• {t('appium.preReq.maven')}</li>
                  <li>• {t('appium.preReq.node')}</li>
                  <li>• {t('appium.preReq.android')}</li>
                  <li>• {t('appium.preReq.device')}</li>
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
                  {t('appium.guide.intro.title')}
                </h3>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {t('appium.guide.intro.desc')}
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
                {t('appium.tips.title')}
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: colors.textSecondary }}>
                <li>• <strong>{t('appium.tips.locators')}</strong> {t('appium.tips.locators.desc')}</li>
                <li>• <strong>{t('appium.tips.waits')}</strong> {t('appium.tips.waits.desc')} <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bgMain, fontFamily: 'monospace' }}>waitForElement()</code></li>
                <li>• <strong>{t('appium.tips.tags')}</strong> {t('appium.tips.tags.desc')}</li>
                <li>• <strong>{t('appium.tips.screenshots')}</strong> {t('appium.tips.screenshots.desc')}</li>
                <li>• <strong>{t('appium.tips.reports')}</strong> {t('appium.tips.reports.desc')}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}