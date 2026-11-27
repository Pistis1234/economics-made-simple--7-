import {MotionConfig} from 'motion/react';
import {useEffect} from 'react';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import {EverydayPulseStrip} from './components/EverydayPulseStrip';
import {Footer} from './components/Footer';
import {Navbar} from './components/Navbar';
import {SourceModal} from './components/SourceModal';
import {AppProvider} from './context/AppContext';
import {Actions} from './pages/Actions';
import {Admin} from './pages/Admin';
import {Home} from './pages/Home';
import {Learn} from './pages/Learn';
import {MalawiGrowthExperience} from './pages/MalawiGrowthExperience';
import {Methodology} from './pages/Methodology';
import {Numbers} from './pages/Numbers';
import {Quiz} from './pages/Quiz';
import {TopicDetail} from './pages/TopicDetail';

function ScrollToTop() {
  const {pathname, hash} = useLocation();
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({behavior: 'smooth'});
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function AppShell() {
  return (
    <div className="min-h-screen flex flex-col bg-[#052C5A] text-white">
      <ScrollToTop />
      <Navbar />
      <EverydayPulseStrip />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route
            path="/learn/malawi-economic-growth-2026"
            element={<MalawiGrowthExperience />}
          />
          <Route path="/learn/:topicSlug" element={<TopicDetail />} />
          <Route path="/numbers" element={<Numbers />} />
          <Route path="/actions" element={<Actions />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <SourceModal />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <AppProvider>
          <AppShell />
        </AppProvider>
      </BrowserRouter>
    </MotionConfig>
  );
}
