import {ArrowUpRight} from 'lucide-react';
import {Link, useNavigate} from 'react-router-dom';
import {useApp} from '../context/AppContext';
import {LanguageDropdown} from './LanguageDropdown';
import {MadeSimpleWordmark} from './MadeSimpleWordmark';

export function Footer() {
  const {reports, selectedReportId, setSelectedReportId, bi} = useApp();
  const navigate = useNavigate();

  const linkGroups = [
    {
      heading: bi('Explore', 'Fufuzani'),
      links: [
        {to: '/learn', label: bi('Choose a Topic', 'Sankhani Mutu')},
        {
          to: '/learn/malawi-economic-growth-2026',
          label: bi('2026 Visual Guide', 'Nkhani ya Zithunzi 2026'),
        },
        {to: '/numbers', label: bi('Key Numbers', 'Ziwerengero Zazikulu')},
      ],
    },
    {
      heading: bi('Topics', 'Mitu'),
      links: [
        {
          to: '/learn/economic-growth',
          label: bi('Economic Growth', 'Kukula kwa Chuma'),
        },
        {to: '/learn/inflation', label: bi('Rising Prices', 'Kukwera kwa Mitengo')},
        {
          to: '/learn/exchange-rates',
          label: bi('Dollars & Forex', 'Madola & Kusinthana'),
        },
      ],
    },
    {
      heading: bi('Resources', 'Zothandiza'),
      links: [
        {
          to: '/actions',
          label: bi('Policy Actions', 'Njira Zothetsera Mavuto'),
        },
        {
          to: '/methodology',
          label: bi('Sources & Method', 'Magwero ndi Njira'),
        },
      ],
    },
    {
      heading: bi('Practice', 'Yesani'),
      links: [
        {to: '/quiz', label: bi('Quick Quiz', 'Mafunso Achidule')},
        {to: '/learn/employment', label: bi('Jobs & Businesses', 'Ntchito & Mabizinesi')},
        {to: '/learn/agriculture', label: bi('Farming & Food', 'Ulimi & Chakudya')},
      ],
    },
  ];

  return (
    <footer className="bg-[#031F42] text-[#B8D9F8]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Brand + Report Edition & Language */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <Link
                to="/"
                className="font-display font-bold text-lg text-white inline-flex items-center gap-2.5"
              >
                <span
                  aria-hidden="true"
                  className="w-5 h-5 rounded-full bg-[#00AEEF] flex items-center justify-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#052C5A]" />
                </span>
                <span className="inline-flex items-baseline gap-[0.26em]">
                  <span>Economics</span>
                  <MadeSimpleWordmark wordClassName="text-[#00AEEF]" />
                </span>
              </Link>
              <p className="text-sm text-[#B8D9F8] leading-relaxed max-w-xs">
                {bi(
                  'Short, clear visual explanations of economic reports — without the jargon.',
                  'Zithunzi ndi mafotokozedwe achidule, omveka bwino a malipoti a chuma — popanda mawu ovuta.'
                )}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-display font-semibold text-sm text-white">
                {bi('Report Edition & Language', 'Lipoti ndi Chiyankhulo')}
              </h3>
              <div className="flex flex-wrap items-center gap-2.5">
                {reports.map((report) => {
                  const isActive = report.id === selectedReportId;
                  return (
                    <button
                      key={report.id}
                      type="button"
                      onClick={() => {
                        setSelectedReportId(report.id);
                        navigate('/learn');
                      }}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium cursor-pointer transition-colors ${
                        isActive
                          ? 'bg-white text-[#031F42] font-semibold hover:bg-[#F3F6FB]'
                          : 'bg-transparent border border-white/80 text-white hover:bg-white/10'
                      }`}
                    >
                      <span>
                        {report.shortTitle} ({report.year})
                      </span>
                      {isActive && (
                        <ArrowUpRight
                          aria-hidden="true"
                          className="w-4 h-4 shrink-0"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-1">
                <LanguageDropdown menuPlacement="up" />
              </div>
            </div>
          </div>

          {/* 2x2 Clean Minimal Link Directory */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-9">
            {linkGroups.map((group) => (
              <div key={group.heading} className="space-y-4">
                <h3 className="font-display font-semibold text-sm sm:text-base text-white">
                  {group.heading}
                </h3>
                <ul className="space-y-3 text-sm">
                  {group.links.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="text-[#9AC2EA] hover:text-white transition-colors inline-block"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#9AC6F4]">
          <p>
            {bi(
              'Independent visual platform. Not affiliated with or endorsed by the World Bank.',
              'Tsamba lodziyimira palokha lofotokoza za chuma. Silinalumikizidwe kapena kuvomerezedwa ndi World Bank.'
            )}
          </p>
          <p className="shrink-0">
            © {new Date().getFullYear()} Economics Made Simple
          </p>
        </div>
      </div>
    </footer>
  );
}
