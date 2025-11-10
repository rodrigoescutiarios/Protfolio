import React, { useState } from 'react';
import { Github, BookOpen, Copy, CheckCircle, Terminal, FileCode, Folder, Play, AlertCircle, Package, Settings, Database } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function KarateBdd() {
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
      title: t('karatebdd.step1.title'),
      description: t('karatebdd.step1.desc'),
      code: 'git clone https://github.com/rodrigoescutiarios/Karate-automatizacion.git\ncd Karate-Framework',
      icon: Terminal,
    },
    {
      id: 'step2',
      title: t('karatebdd.step2.title'),
      description: t('karatebdd.step2.desc'),
      code: 'java -version\nmvn -version',
      icon: CheckCircle,
    },
    {
      id: 'step3',
      title: t('karatebdd.step3.title'),
      description: t('karatebdd.step3.desc'),
      code: 'mvn clean install',
      icon: Package,
    },
    {
      id: 'step4',
      title: t('karatebdd.step4.title'),
      description: t('karatebdd.step4.desc'),
      code: 'Karate-Framework/\n├── src/\n│   └── test/\n│       ├── java/\n│       │   └── runners/\n│       │       ├── PostsRunner.java\n│       │       ├── TaggedRunner.java\n│       │       └── NegativeTaggedRunner.java\n│       └── resources/\n│           └── features/\n│               └── Posts.feature\n├── target/\n│   └── karate-reports/\n├── pom.xml\n└── README.md',
      icon: Folder,
    },
    {
      id: 'step5',
      title: t('karatebdd.step5.title'),
      description: t('karatebdd.step5.desc'),
      code: '@api @posts\nFeature: Validar API de Posts\n\n  @positive\n  Scenario: TC03 - Crear post exitoso\n    Given url \'https://jsonplaceholder.typicode.com\'\n    And path \'/posts\'\n    And request { title: \'foo\', body: \'bar\', userId: 1 }\n    When method POST\n    Then status 201',
      icon: FileCode,
    },
    {
      id: 'step6',
      title: t('karatebdd.step6.title'),
      description: t('karatebdd.step6.desc'),
      code: 'mvn clean test',
      icon: Play,
    },
    {
      id: 'step7',
      title: t('karatebdd.step7.title'),
      description: t('karatebdd.step7.desc'),
      code: '# Windows\nstart target\\karate-reports\\karate-summary.html\n\n# Linux/Mac\nopen target/karate-reports/karate-summary.html',
      icon: CheckCircle,
    },
    {
      id: 'step8',
      title: t('karatebdd.step8.title'),
      description: t('karatebdd.step8.desc'),
      code: '# Solo tests positivos\nmvn clean test -Dtest=TaggedRunner\n\n# Solo tests negativos\nmvn clean test -Dtest=NegativeTaggedRunner',
      icon: Play,
    },
    {
      id: 'step9',
      title: t('karatebdd.step9.title'),
      description: t('karatebdd.step9.desc'),
      code: '# Reporte principal\ntarget/karate-reports/karate-summary.html\n\n# Reporte por feature\ntarget/karate-reports/features.Posts.html\n\n# Timeline de ejecución\ntarget/karate-reports/karate-timeline.html\n\n# Reportes por tags\ntarget/karate-reports/karate-tags.html',
      icon: Database,
    },
  ];

  const guideSteps = [
    {
      id: 'guide1',
      title: t('karatebdd.guide1.title'),
      description: t('karatebdd.guide1.desc'),
      code: `@api @users
Feature: Validar API de Users de JSONPlaceholder
  Como tester de API
  Quiero validar los endpoints de usuarios
  Para asegurar que funcionan correctamente

  Background:
    * url 'https://jsonplaceholder.typicode.com'

  @positive @smoke
  Scenario: TC01 - Obtener todos los usuarios (200 OK)
    Given path '/users'
    When method GET
    Then status 200
    And match response == '#[10]'
    And match each response contains { id: '#number', name: '#string', email: '#string' }

  @positive
  Scenario: TC02 - Obtener un usuario específico (200 OK)
    Given path '/users/1'
    When method GET
    Then status 200
    And match response.id == 1
    And match response.name == 'Leanne Graham'
    And match response.email == 'Sincere@april.biz'

  @negative
  Scenario: TC03 - Obtener usuario inexistente (404)
    Given path '/users/999'
    When method GET
    Then status 404

  @positive
  Scenario: TC04 - Crear un nuevo usuario (201 Created)
    Given path '/users'
    And request 
      """
      {
        "name": "Rodrigo Escutia",
        "username": "rodrigotest",
        "email": "rodrigo@test.com"
      }
      """
    When method POST
    Then status 201
    And match response.name == 'Rodrigo Escutia'
    And match response.email == 'rodrigo@test.com'

  @negative
  Scenario: TC05 - Crear usuario con datos vacíos
    Given path '/users'
    And request {}
    When method POST
    Then status 201
    # JSONPlaceholder acepta cualquier payload, pero validamos que devuelva algo

  @positive
  Scenario: TC06 - Actualizar usuario completo (200 OK)
    Given path '/users/1'
    And request 
      """
      {
        "id": 1,
        "name": "Usuario Actualizado",
        "username": "updated_user",
        "email": "updated@test.com"
      }
      """
    When method PUT
    Then status 200
    And match response.name == 'Usuario Actualizado'

  @negative
  Scenario: TC07 - Actualizar usuario inexistente (404)
    Given path '/users/999'
    And request { "name": "Test" }
    When method PUT
    Then status 404

  @positive
  Scenario: TC08 - Modificar parcialmente un usuario (200 OK)
    Given path '/users/1'
    And request { "email": "newemail@test.com" }
    When method PATCH
    Then status 200
    And match response.email == 'newemail@test.com'

  @positive
  Scenario: TC09 - Eliminar un usuario (200 OK)
    Given path '/users/1'
    When method DELETE
    Then status 200

  @negative
  Scenario: TC10 - Eliminar usuario inexistente (404)
    Given path '/users/999'
    When method DELETE
    Then status 404`,
      icon: FileCode,
    },
    {
      id: 'guide2',
      title: t('karatebdd.guide2.title'),
      description: t('karatebdd.guide2.desc'),
      code: `package runners;

import com.intuit.karate.junit5.Karate;

public class UsersRunner {
    
    @Karate.Test
    Karate testUsers() {
        return Karate.run("classpath:features/users-api.feature")
                .relativeTo(getClass());
    }
}`,
      icon: FileCode,
    },
    {
      id: 'guide3',
      title: t('karatebdd.guide3.title'),
      description: t('karatebdd.guide3.desc'),
      code: `package runners;

import com.intuit.karate.junit5.Karate;

public class UsersPositiveRunner {
    
    @Karate.Test
    Karate testUsersPositive() {
        return Karate.run("classpath:features/users-api.feature")
                .tags("@positive")
                .relativeTo(getClass());
    }
}`,
      icon: FileCode,
    },
    {
      id: 'guide4',
      title: t('karatebdd.guide4.title'),
      description: t('karatebdd.guide4.desc'),
      code: `package runners;

import com.intuit.karate.junit5.Karate;

public class UsersNegativeRunner {
    
    @Karate.Test
    Karate testUsersNegative() {
        return Karate.run("classpath:features/users-api.feature")
                .tags("@negative")
                .relativeTo(getClass());
    }
}`,
      icon: FileCode,
    },
    {
      id: 'guide5',
      title: t('karatebdd.guide5.title'),
      description: t('karatebdd.guide5.desc'),
      code: `<dependencies>
    <dependency>
        <groupId>com.intuit.karate</groupId>
        <artifactId>karate-junit5</artifactId>
        <version>1.4.1</version>
        <scope>test</scope>
    </dependency>
</dependencies>

<build>
    <testResources>
        <testResource>
            <directory>src/test/resources</directory>
        </testResource>
    </testResources>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>2.22.2</version>
        </plugin>
    </plugins>
</build>`,
      icon: CheckCircle,
    },
    {
      id: 'guide6',
      title: t('karatebdd.guide6.title'),
      description: t('karatebdd.guide6.desc'),
      code: '# Ejecutar todos los tests de usuarios\nmvn clean test -Dtest=UsersRunner\n\n# Ver detalles de ejecución\nmvn clean test -Dtest=UsersRunner -X',
      icon: Play,
    },
    {
      id: 'guide7',
      title: t('karatebdd.guide7.title'),
      description: t('karatebdd.guide7.desc'),
      code: '# Solo tests positivos\nmvn clean test -Dtest=UsersPositiveRunner\n\n# Solo tests negativos\nmvn clean test -Dtest=UsersNegativeRunner\n\n# Solo tests con tag @smoke\nmvn clean test -Dkarate.options="--tags @smoke"',
      icon: Play,
    },
    {
      id: 'guide8',
      title: t('karatebdd.guide8.title'),
      description: t('karatebdd.guide8.desc'),
      code: `# Reporte principal (resumen ejecutivo)
start target\\karate-reports\\karate-summary.html

# Reporte detallado del feature
start target\\karate-reports\\features.users-api.html

# Timeline de ejecución
start target\\karate-reports\\karate-timeline.html

# Reportes agrupados por tags
start target\\karate-reports\\karate-tags.html`,
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
                    {t('karatebdd.step')} {index + 1}
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
                        <span>{t('karatebdd.copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t('karatebdd.copy')}</span>
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
              {t('karatebdd.title')} - {t('karatebdd.framework')}
            </h1>
            <p className="text-base text-white opacity-90">
              {t('karatebdd.subtitle')}
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
            <span>{t('karatebdd.tab.github')}</span>
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
            <span>{t('karatebdd.tab.guide')}</span>
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
                  {t('karatebdd.preReq.title')}
                </h3>
                <ul className="space-y-1 text-sm" style={{ color: colors.textSecondary }}>
                  <li>• {t('karatebdd.preReq.java')}</li>
                  <li>• {t('karatebdd.preReq.maven')}</li>
                  <li>• {t('karatebdd.preReq.editor')}</li>
                  <li>• {t('karatebdd.preReq.extension')}</li>
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
                  {t('karatebdd.guide.intro.title')}
                </h3>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {t('karatebdd.guide.intro.desc')}
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
                {t('karatebdd.tips.title')}
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: colors.textSecondary }}>
                <li>• <strong>{t('karatebdd.tips.tags')}</strong> {t('karatebdd.tips.tags.desc')}</li>
                <li>• <strong>{t('karatebdd.tips.background')}</strong> {t('karatebdd.tips.background.desc')} <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bgMain, fontFamily: 'monospace' }}>Background</code> {t('karatebdd.tips.background.desc2')}</li>
                <li>• <strong>{t('karatebdd.tips.validations')}</strong> <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bgMain, fontFamily: 'monospace' }}>match</code> {t('karatebdd.tips.validations.desc')} <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bgMain, fontFamily: 'monospace' }}>match each</code> {t('karatebdd.tips.validations.desc2')}</li>
                <li>• <strong>{t('karatebdd.tips.reports')}</strong> {t('karatebdd.tips.reports.desc')}</li>
                <li>• <strong>{t('karatebdd.tips.pageObjects')}</strong> {t('karatebdd.tips.pageObjects.desc')}</li>
                <li>• <strong>{t('karatebdd.tips.json')}</strong> {t('karatebdd.tips.json.desc')} <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bgMain, fontFamily: 'monospace' }}>"""</code> {t('karatebdd.tips.json.desc2')}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}