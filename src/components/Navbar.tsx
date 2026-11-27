import {Menu, X} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {useEffect, useState} from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {useApp} from '../context/AppContext';
import {LanguageDropdown} from './LanguageDropdown';
import {MadeSimpleWordmark} from './MadeSimpleWordmark';

export function Navbar() {
  const {ui, bi} = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    {to: '/', label: ui('navHome'), end: true},
    {to: '/learn', label: ui('navLearn')},
    {to: '/numbers', label: ui('navNumbers')},
    {to: '/quiz', label: ui('navQuiz')},
  ];

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#031F42]/92 backdrop-blur-md">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Brand wordmark */}
          <Link
            to="/"
            className="font-display font-bold text-lg tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2.5"
          >
            <span
              aria-hidden="true"
              className="w-6 h-6 rounded-full bg-[#00AEEF] flex items-center justify-center shrink-0"
            >
              <span className="w-2 h-2 rounded-full bg-[#052C5A]" />
            </span>
            <span className="inline-flex items-baseline gap-[0.26em]">
              <span>Economics</span>
              <MadeSimpleWordmark wordClassName="text-[#00AEEF]" />
            </span>
          </Link>

          {/* Zone 2: Clean, minimal navigation links */}
          <nav
            aria-label={bi('Primary navigation', 'Menyu yayikulu')}
            className="hidden md:flex items-center gap-8"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({isActive}) =>
                  `relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-white font-semibold after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-[#00AEEF]'
                      : 'text-[#B8D9F8] hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Language Switcher & Primary CTA */}
          <div className="flex items-center gap-2.5 shrink-0">
            <LanguageDropdown />

            <button
              type="button"
              onClick={() => navigate('/learn')}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] text-sm font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              {bi('Choose a Topic', 'Sankhani Mutu')}
            </button>

            <button
              type="button"
              aria-label={
                mobileOpen
                  ? bi('Close navigation menu', 'Tsekani menyu')
                  : bi('Open navigation menu', 'Tsegulani menyu')
              }
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#052C5A] text-white hover:bg-[#0A3A72] cursor-pointer transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-end">
            {/* Left Blurred Backdrop */}
            <motion.button
              type="button"
              aria-label={bi('Close navigation menu', 'Tsekani menyu')}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.2}}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-[#021229]/60 backdrop-blur-md cursor-pointer"
            />

            {/* Right Slide-Over Panel */}
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label={bi('Mobile navigation', 'Menyu ya pafoni')}
              initial={{x: '100%'}}
              animate={{x: 0}}
              exit={{x: '100%'}}
              transition={{duration: 0.26, ease: [0.16, 1, 0.3, 1]}}
              className="relative z-10 h-dvh w-[72%] max-w-[340px] bg-[#031F42] border-l border-white/10 shadow-2xl flex flex-col"
            >
              {/* Drawer Top Header: Site Logo + Close Icon */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/10 shrink-0">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="font-display font-bold text-base tracking-tight text-white whitespace-nowrap flex items-center gap-2"
                >
                  <span
                    aria-hidden="true"
                    className="w-5 h-5 rounded-full bg-[#00AEEF] flex items-center justify-center shrink-0"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#052C5A]" />
                  </span>
                  <span className="inline-flex items-baseline gap-[0.24em]">
                    <span>Economics</span>
                    <span className="text-[#00AEEF]">MadeSimple</span>
                  </span>
                </Link>

                <button
                  type="button"
                  aria-label={bi('Close navigation menu', 'Tsekani menyu')}
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center w-9 h-9 -mr-1 rounded-full text-[#B8D9F8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Vertical Menu Options with Hairline Dividers */}
              <nav
                aria-label={bi('Mobile navigation', 'Menyu ya pafoni')}
                className="flex-1 overflow-y-auto px-6 py-3"
              >
                <div className="divide-y divide-white/10 border-b border-white/10">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={() => setMobileOpen(false)}
                      className={({isActive}) =>
                        `flex items-center justify-between py-4 text-lg transition-colors ${
                          isActive
                            ? 'text-white font-semibold'
                            : 'text-[#8FB4DA] hover:text-white font-medium'
                        }`
                      }
                    >
                      {({isActive}) => (
                        <>
                          <span>{item.label}</span>
                          {isActive && (
                            <span
                              aria-hidden="true"
                              className="w-2 h-2 rounded-full bg-[#00AEEF] shadow-[0_0_8px_#00AEEF]"
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              </nav>

              {/* Drawer Footer Controls */}
              <div className="px-6 pb-6 pt-4 border-t border-white/10 space-y-3 shrink-0">
                <LanguageDropdown fullWidth menuPlacement="up" />

                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    navigate('/learn');
                  }}
                  className="w-full py-3 px-4 rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] font-bold text-sm text-center transition-colors cursor-pointer"
                >
                  {bi('Choose a Topic', 'Sankhani Mutu')}
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
