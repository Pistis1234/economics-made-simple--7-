import {Check, ChevronDown} from 'lucide-react';
import {useEffect, useRef, useState} from 'react';
import {useApp} from '../context/AppContext';

function UkFlagIcon() {
  return (
    <svg
      viewBox="0 0 24 16"
      className="w-5 h-3.5 rounded-[2px] shrink-0 overflow-hidden"
      aria-hidden="true"
    >
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#FFFFFF" strokeWidth="3.2" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#C8102E" strokeWidth="1.4" />
      <path d="M12 0 V16 M0 8 H24" stroke="#FFFFFF" strokeWidth="5" />
      <path d="M12 0 V16 M0 8 H24" stroke="#C8102E" strokeWidth="2.8" />
    </svg>
  );
}

function MalawiFlagIcon() {
  return (
    <svg
      viewBox="0 0 24 16"
      className="w-5 h-3.5 rounded-[2px] shrink-0 overflow-hidden"
      aria-hidden="true"
    >
      <rect width="24" height="5.33" y="0" fill="#0F172A" />
      <path d="M7.5 5.33 A4.5 4.5 0 0 1 16.5 5.33 Z" fill="#CE1126" />
      <rect width="24" height="5.34" y="5.33" fill="#CE1126" />
      <rect width="24" height="5.33" y="10.67" fill="#15803D" />
    </svg>
  );
}

interface LanguageDropdownProps {
  menuPlacement?: 'down' | 'up';
  fullWidth?: boolean;
}

export function LanguageDropdown({
  menuPlacement = 'down',
  fullWidth = false,
}: LanguageDropdownProps) {
  const {language, setLanguage, bi} = useApp();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const options = [
    {code: 'en' as const, label: 'English', flag: <UkFlagIcon />},
    {code: 'ny' as const, label: 'Chichewa', flag: <MalawiFlagIcon />},
  ];

  const activeOption =
    options.find((opt) => opt.code === language) ?? options[0];

  return (
    <div
      ref={containerRef}
      className={`relative ${fullWidth ? 'w-full' : 'inline-block'}`}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={bi('Choose language', 'Sankhani chiyankhulo')}
        onClick={() => setOpen((prev) => !prev)}
        className={`inline-flex items-center justify-between gap-2.5 px-4 py-2 rounded-full bg-[#052C5A] border border-white/20 hover:border-white/45 text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
          fullWidth ? 'w-full' : ''
        }`}
      >
        <span className="inline-flex items-center gap-2.5">
          {activeOption.flag}
          <span>{activeOption.label}</span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`w-3.5 h-3.5 text-[#B8D9F8] transition-transform duration-150 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={bi('Language options', 'Ziyankhulo')}
          className={`absolute left-0 z-50 min-w-[164px] w-full sm:w-auto rounded-2xl bg-[#031F42] border border-white/20 shadow-2xl p-1.5 space-y-1 ${
            menuPlacement === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
        >
          {options.map((option) => {
            const selected = option.code === language;
            return (
              <li key={option.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage(option.code);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    selected
                      ? 'bg-[#0A3A72] text-white font-semibold'
                      : 'text-[#CFE8FC] hover:bg-[#052C5A] hover:text-white'
                  }`}
                >
                  <span className="inline-flex items-center gap-2.5">
                    {option.flag}
                    <span>{option.label}</span>
                  </span>
                  {selected && (
                    <Check
                      aria-hidden="true"
                      className="w-3.5 h-3.5 text-[#00AEEF] shrink-0"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
