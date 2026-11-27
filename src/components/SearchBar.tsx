import {ArrowRight, Search, X} from 'lucide-react';
import {useEffect, useMemo, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useApp} from '../context/AppContext';
import {searchEconomicsContent} from '../utils/search';

interface SearchBarProps {
  compact?: boolean;
}

export function SearchBar({compact = false}: SearchBarProps) {
  const {language, ui, setSelectedReportId, topics} = useApp();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const results = useMemo(
    () => searchEconomicsContent(query, language, topics),
    [query, language, topics]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (href: string, reportId: string) => {
    setSelectedReportId(reportId);
    setOpen(false);
    setQuery('');
    navigate(href);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative flex items-center">
        <Search
          aria-hidden="true"
          className="w-4 h-4 text-[#85C7F2] absolute left-3.5 pointer-events-none"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          aria-label="Search economic terms and topics across all reports"
          placeholder={ui('searchPlaceholder')}
          className={`w-full pl-10 pr-9 bg-[#052C5A] rounded-full text-sm text-white placeholder:text-[#85C7F2]/80 focus:outline-none transition-colors ${
            compact ? 'py-2' : 'py-2.5'
          }`}
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery('');
              setOpen(false);
            }}
            className="absolute right-3 p-1 text-[#85C7F2] hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {open && query.trim().length > 0 && (
        <div
          role="region"
          aria-label="Search results"
          className="absolute left-0 right-0 mt-2 bg-[#031F42] rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto space-y-1 p-1.5"
        >
          {results.length === 0 ? (
            <div className="p-4 text-sm text-[#B8D9F8]">
              No matching economic terms found for &quot;{query}&quot;.
            </div>
          ) : (
            results.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.href, item.reportId)}
                className="w-full text-left px-4 py-3 hover:bg-[#0A3A72] transition-colors flex items-start justify-between gap-3 cursor-pointer"
              >
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white truncate">
                    {item.title}
                  </div>
                  <p className="text-xs text-[#CFE8FC] line-clamp-2 mt-0.5">
                    {item.explanation}
                  </p>
                  <div className="mt-1 text-xs text-[#85C7F2] flex items-center gap-1.5 flex-wrap">
                    <span>{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {item.reportTitle} ({item.reportYear})
                    </span>
                  </div>
                </div>
                <ArrowRight
                  aria-hidden="true"
                  className="w-4 h-4 text-[#00AEEF] shrink-0 mt-1"
                />
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
