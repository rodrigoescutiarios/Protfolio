import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Code,
  Briefcase,
  Award,
  TrendingUp,
  Zap,
  Target,
  Calendar,
  Users,
  CheckCircle,
  Star,
  GitBranch,
  Database,
  Globe,
  Smartphone,
  Monitor,
  Coffee,
  Heart
} from 'lucide-react';

export default function Dashboard() {
  const { t } = useLanguage();
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    experience: 0,
    technologies: 0,
    certifications: 0
  });

  const colors = {
    primary: '#1b527c',
    secondary: '#55bff3',
    bgMain: '#f8fafc',
    bgCard: '#ffffff',
    textPrimary: '#111827',
    textSecondary: '#6b7280',
    border: '#e2e8f0',
    success: '#16a34a',
    warning: '#f59e0b',
    accentLight: '#f0f9ff',
  };

  // Animate stats on mount
  useEffect(() => {
    const targetStats = {
      projects: 25,
      experience: 9,
      technologies: 15,
      certifications: 8
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedStats({
        projects: Math.floor(targetStats.projects * progress),
        experience: Math.floor(targetStats.experience * progress),
        technologies: Math.floor(targetStats.technologies * progress),
        certifications: Math.floor(targetStats.certifications * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(targetStats);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const skillsData = [
    { name: 'Java', level: 95, color: '#ED8B00' },
    { name: 'JavaScript', level: 90, color: '#F7DF1E' },
    { name: 'TypeScript', level: 85, color: '#3178C6' },
    { name: 'Python', level: 80, color: '#3776AB' },
    { name: 'SQL', level: 85, color: '#4479A1' },
    { name: 'React', level: 88, color: '#61DAFB' },
    { name: 'IA/ML', level: 75, color: '#7C3AED' },
  ];

  const technologies = [
    { name: 'Selenium', icon: Monitor, categoryKey: 'dashboard.technologies.selenium' },
    { name: 'Appium', icon: Smartphone, categoryKey: 'dashboard.technologies.appium' },
    { name: 'Cypress', icon: Zap, categoryKey: 'dashboard.technologies.cypress' },
    { name: 'Playwright', icon: Code, categoryKey: 'dashboard.technologies.playwright' },
    { name: 'Karate BDD', icon: Target, categoryKey: 'dashboard.technologies.karate' },
    { name: 'Jenkins', icon: GitBranch, categoryKey: 'dashboard.technologies.jenkins' },
    { name: 'Docker', icon: Database, categoryKey: 'dashboard.technologies.docker' },
    { name: 'AWS', icon: Globe, categoryKey: 'dashboard.technologies.aws' },
    { name: 'ChatGPT', icon: Star, categoryKey: 'dashboard.technologies.chatgpt' },
    { name: 'Claude', icon: Star, categoryKey: 'dashboard.technologies.claude' },
    { name: 'GitHub Copilot', icon: Code, categoryKey: 'dashboard.technologies.copilot' },
  ];


  const achievements = [
    {
      icon: Award,
      titleKey: 'dashboard.achievements.experience',
      descriptionKey: 'dashboard.achievements.experience.desc'
    },
    {
      icon: Users,
      titleKey: 'dashboard.achievements.projects',
      descriptionKey: 'dashboard.achievements.projects.desc'
    },
    {
      icon: Star,
      titleKey: 'dashboard.achievements.certifications',
      descriptionKey: 'dashboard.achievements.certifications.desc'
    },
    {
      icon: TrendingUp,
      titleKey: 'dashboard.achievements.ai',
      descriptionKey: 'dashboard.achievements.ai.desc'
    }
  ];

  const renderSkillBar = (skill: typeof skillsData[0]) => (
    <div key={skill.name} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>
          {skill.name}
        </span>
        <span className="text-xs" style={{ color: colors.textSecondary }}>
          {skill.level}%
        </span>
      </div>
      <div
        className="w-full h-2 rounded-full"
        style={{ backgroundColor: colors.border }}
      >
        <div
          className="h-2 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${skill.level}%`,
            backgroundColor: skill.color
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bgMain }}>
      {/* Welcome Section */}
      <div className="mb-8">
        <div
          className="rounded-xl p-8 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            boxShadow: '0 4px 20px rgba(27, 82, 124, 0.25)',
          }}
        >
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div
                className="rounded-xl flex-shrink-0 relative overflow-hidden"
                style={{
                  width: 120,
                  height: 120,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                }}
              >
                <img
                  src="/assets/JoseRodrigoEscutiaRios.jpg"
                  alt="José Rodrigo Escutia Ríos"
                  className="w-full h-full object-cover rounded-xl"
                  style={{ filter: 'brightness(1.1)' }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)',
                  }}
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {t('dashboard.welcome.greeting')}
                </h1>
                <p className="text-lg text-white opacity-90 mb-4">
                  {t('dashboard.welcome.description')}
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                    <Code className="w-4 h-4 text-white" />
                    <span className="text-sm text-white">{t('dashboard.welcome.tag.testing')}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                    <Heart className="w-4 h-4 text-white" />
                    <span className="text-sm text-white">{t('dashboard.welcome.tag.mentor')}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                    <Coffee className="w-4 h-4 text-white" />
                    <span className="text-sm text-white">{t('dashboard.welcome.tag.learner')}</span>
                  </div>
                </div>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Briefcase, labelKey: 'dashboard.stats.projects', value: animatedStats.projects, color: colors.primary },
          { icon: Calendar, labelKey: 'dashboard.stats.experience', value: animatedStats.experience, color: colors.secondary },
          { icon: Code, labelKey: 'dashboard.stats.technologies', value: animatedStats.technologies, color: '#7C3AED' },
          { icon: Award, labelKey: 'dashboard.stats.certifications', value: animatedStats.certifications, color: '#16a34a' },
        ].map((stat, index) => (
          <div
            key={index}
            className="rounded-lg p-4 text-center transition-all hover:shadow-lg"
            style={{
              backgroundColor: colors.bgCard,
              border: `1px solid ${colors.border}`,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: stat.color + '15' }}
            >
              <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
            </div>
            <div className="text-2xl font-bold mb-1" style={{ color: colors.textPrimary }}>
              {stat.value}+
            </div>
            <div className="text-sm" style={{ color: colors.textSecondary }}>
              {t(stat.labelKey)}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Skills Section */}
        <div className="lg:col-span-2">
          <div
            className="rounded-lg p-6"
            style={{
              backgroundColor: colors.bgCard,
              border: `1px solid ${colors.border}`,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: colors.primary + '15' }}
              >
                <TrendingUp className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: colors.textPrimary }}>
                  {t('dashboard.skills.title')}
                </h3>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {t('dashboard.skills.subtitle')}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {skillsData.map(renderSkillBar)}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <div
            className="rounded-lg p-6"
            style={{
              backgroundColor: colors.bgCard,
              border: `1px solid ${colors.border}`,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: colors.success + '15' }}
              >
                <CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: colors.textPrimary }}>
                  {t('dashboard.achievements.title')}
                </h3>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {t('dashboard.achievements.subtitle')}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: colors.accentLight }}
                  >
                    <achievement.icon className="w-4 h-4" style={{ color: colors.primary }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1" style={{ color: colors.textPrimary }}>
                      {t(achievement.titleKey)}
                    </h4>
                    <p className="text-xs" style={{ color: colors.textSecondary }}>
                      {t(achievement.descriptionKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Technologies Grid */}
      <div className="mb-8">
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2" style={{ color: colors.textPrimary }}>
            {t('dashboard.technologies.title')}
          </h3>
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            {t('dashboard.technologies.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="rounded-lg p-4 text-center transition-all hover:shadow-lg hover:scale-105 cursor-pointer"
              style={{
                backgroundColor: colors.bgCard,
                border: `1px solid ${colors.border}`,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
              }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: colors.accentLight }}
              >
                <tech.icon className="w-6 h-6" style={{ color: colors.primary }} />
              </div>
              <h4 className="text-sm font-semibold mb-1" style={{ color: colors.textPrimary }}>
                {tech.name}
              </h4>
              <p className="text-xs" style={{ color: colors.textSecondary }}>
                {t(tech.categoryKey)}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
