import {BookOpen, Globe} from 'lucide-react';
import {useApp} from '../context/AppContext';
import {SearchBar} from './SearchBar';

export function ReportUtilityBar() {
  const {
    reports,
    selectedReportId,
    selectedReport,
    setSelectedReportId,
    language,
    setLanguage,
    ui,
  } = useApp();

  return (
    <section
      aria-label="Report edition, search, and language controls"
      className="bg-[#031F42] text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-[#B8D9F8]">
          <BookOpen
            aria-hidden="true"
            className="w-4 h-4 text-[#00AEEF] shrink-0"
          />
          <label htmlFor="report-selector" className="font-semibold text-white">
            Active report:
          </label>
          <select
            id="report-selector"
            value={selectedReportId}
            onChange={(e) => setSelectedReportId(e.target.value)}
            className="bg-[#052C5A] rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer"
          >
            {reports.map((report) => (
              <option key={report.id} value={report.id}>
                {report.shortTitle} ({report.year}) — {report.publisher}
              </option>
            ))}
          </select>
          <span aria-hidden="true" className="hidden sm:inline text-[#85C7F2]">
            ·
          </span>
          <span className="text-xs text-[#CFE8FC]">
            {selectedReport.verificationStatus === 'sample_pending_verification'
              ? 'Sample educational figures pending official verification'
              : `Verified excerpts · ${selectedReport.editionLabel}`}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 lg:w-[460px] shrink-0">
          <div className="flex-1 min-w-0">
            <SearchBar compact />
          </div>

          <div
            role="group"
            aria-label="Language selection"
            className="inline-flex items-center p-1 bg-[#052C5A] rounded-lg shrink-0 self-start sm:self-auto"
          >
            <Globe
              aria-hidden="true"
              className="w-3.5 h-3.5 text-[#85C7F2] ml-2 mr-1.5"
            />
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                language === 'en'
                  ? 'bg-[#00AEEF] text-[#052C5A]'
                  : 'text-[#B8D9F8] hover:text-white'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ny')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                language === 'ny'
                  ? 'bg-[#00AEEF] text-[#052C5A]'
                  : 'text-[#B8D9F8] hover:text-white'
              }`}
            >
              Chichewa (Beta)
            </button>
          </div>
        </div>
      </div>

      {language === 'ny' && (
        <div className="bg-[#052C5A] text-[#CFE8FC] text-xs py-2 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">{ui('chichewaNotice')}</div>
        </div>
      )}
    </section>
  );
}
