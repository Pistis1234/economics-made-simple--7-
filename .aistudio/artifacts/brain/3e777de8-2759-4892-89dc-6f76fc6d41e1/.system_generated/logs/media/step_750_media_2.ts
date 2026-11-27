/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  BarChart3,
  BookOpen,
  Compass,
  HelpCircle,
  Home,
  Info,
} from 'lucide-react';
import { malawiEconomicMonitorReport } from './data/reports/malawiEconomicMonitor';
import { UI_STRINGS, t } from './data/uiStrings';
import type { EconomicReport, Language, SourceCitation } from './types/report';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineBanner } from './components/OfflineBanner';
import { SourceModal } from './components/SourceModal';
import { AboutReportModal } from './components/AboutReportModal';
import { HomeView } from './components/views/HomeView';
import { LearnView } from './components/views/LearnView';
import { NumbersView } from './components/views/NumbersView';
import { ActionsView } from './components/views/ActionsView';
import { QuizView } from './components/views/QuizView';

type TabId = 'home' | 'learn' | 'numbers' | 'actions' | 'quiz';

export default function App() {
  const [reports, setReports] = useState<EconomicReport[]>([malawiEconomicMonitorReport]);
  const [activeReportId, setActiveReportId] = useState<string>(malawiEconomicMonitorReport.id);
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [activeTopicId, setActiveTopicId] = useState<string>(
    malawiEconomicMonitorReport.topics[0]?.id || 'prices'
  );
  const [lang, setLang] = useState<Language>('en');
  const [activeSource, setActiveSource] = useState<SourceCitation | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  const report = reports.find((r) => r.id === activeReportId) || reports[0];

  const handleOpenTopic = (topicId: string) => {
    setActiveTopicId(topicId);
    setActiveTab('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImportCustomReport = (newReport: EconomicReport) => {
    setReports((prev) => {
      const exists = prev.some((r) => r.id === newReport.id);
      return exists
        ? prev.map((r) => (r.id === newReport.id ? newReport : r))
        : [...prev, newReport];
    });
    setActiveReportId(newReport.id);
    if (newReport.topics[0]) {
      setActiveTopicId(newReport.topics[0].id);
    }
    setActiveTab('home');
  };

  const navItems: Array<{ id: TabId; label: string; icon: typeof Home }> = [
    { id: 'home', label: t(UI_STRINGS.tabs.home, lang), icon: Home },
    { id: 'learn', label: t(UI_STRINGS.tabs.learn, lang), icon: BookOpen },
    { id: 'numbers', label: t(UI_STRINGS.tabs.numbers, lang), icon: BarChart3 },
    { id: 'actions', label: t(UI_STRINGS.tabs.actions, lang), icon: Compass },
    { id: 'quiz', label: t(UI_STRINGS.tabs.quiz, lang), icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-[#080A0F] text-[#F4F6FA] flex flex-col">
      {/* Sticky Top Bar: Strictly 3 Zones */}
      <header className="sticky top-0 z-30 h-14 border-b border-white/10 bg-[#080A0F]/85 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleTabChange('home')}
            className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 text-left focus-visible:outline-2 focus-visible:outline-amber-400"
          >
            {t(UI_STRINGS.appName, lang)}
          </button>

          {/* Zone 2: 5 Desktop Nav Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7"
          >
            {navItems.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabChange(item.id)}
                  className={`relative py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    active ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-amber-400"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <PWAInstallButton lang={lang} />
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-24 md:pb-14">
        {/* Page Sub-Toolbar on non-Home tabs for quick language & report switching */}
        {activeTab !== 'home' && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/8 pb-4">
            <button
              type="button"
              onClick={() => setIsAboutOpen(true)}
              className="inline-flex min-h-[40px] items-center gap-2 text-xs text-slate-300 hover:text-white"
            >
              <Info className="h-4 w-4 text-amber-400" aria-hidden="true" />
              <span>
                {t(report.title, lang)} · {report.edition}
              </span>
            </button>

            <div
              className="inline-flex items-center rounded-xl border border-white/12 bg-[#0E121B] p-1"
              role="group"
              aria-label="Language selector"
            >
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`min-h-[34px] rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  lang === 'en' ? 'bg-white text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('ny')}
                className={`min-h-[34px] rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  lang === 'ny' ? 'bg-white text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Chichewa
              </button>
            </div>
          </div>
        )}

        {activeTab === 'home' && (
          <HomeView
            report={report}
            lang={lang}
            onChangeLang={setLang}
            onSelectTopic={handleOpenTopic}
            onGoToNumbers={() => handleTabChange('numbers')}
            onOpenAbout={() => setIsAboutOpen(true)}
            onOpenSource={setActiveSource}
          />
        )}

        {activeTab === 'learn' && (
          <LearnView
            report={report}
            activeTopicId={activeTopicId}
            lang={lang}
            onSelectTopic={setActiveTopicId}
            onOpenSource={setActiveSource}
          />
        )}

        {activeTab === 'numbers' && (
          <NumbersView
            report={report}
            lang={lang}
            onSelectTopic={handleOpenTopic}
            onOpenSource={setActiveSource}
          />
        )}

        {activeTab === 'actions' && (
          <ActionsView
            report={report}
            lang={lang}
            onSelectTopic={handleOpenTopic}
            onOpenSource={setActiveSource}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            report={report}
            lang={lang}
            onSelectTopic={handleOpenTopic}
            onOpenSource={setActiveSource}
          />
        )}
      </main>

      {/* Mobile Fixed 5-Tab Bottom Navigation Bar */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0A0D14]/92 backdrop-blur-lg pb-safe"
      >
        <div className="grid grid-cols-5 h-16 items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTabChange(item.id)}
                className={`flex flex-col items-center justify-center min-h-[48px] transition-colors ${
                  active ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.8} aria-hidden="true" />
                <span className="mt-1 text-[10px] font-semibold tracking-tight whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Modals & Offline Indicator */}
      <OfflineBanner lang={lang} />
      <SourceModal
        citation={activeSource}
        lang={lang}
        onClose={() => setActiveSource(null)}
      />
      <AboutReportModal
        isOpen={isAboutOpen}
        report={report}
        availableReports={reports}
        lang={lang}
        onSelectReport={(id) => {
          setActiveReportId(id);
          const chosen = reports.find((r) => r.id === id);
          if (chosen?.topics[0]) setActiveTopicId(chosen.topics[0].id);
        }}
        onImportCustomReport={handleImportCustomReport}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}
