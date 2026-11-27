import {AlertCircle, ExternalLink, FileText, X} from 'lucide-react';
import {useEffect} from 'react';
import {useApp} from '../context/AppContext';

export function SourceModal() {
  const {activeSource, closeSourceModal, bi} = useApp();

  useEffect(() => {
    if (!activeSource) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSourceModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeSource, closeSourceModal]);

  if (!activeSource) {
    return null;
  }

  const isInterpretation =
    activeSource.sourceType === 'platform_interpretation';
  const isSample =
    activeSource.verificationStatus === 'sample_pending_verification';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="source-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#031F42]/80 backdrop-blur-sm"
      onClick={closeSourceModal}
    >
      <div
        className="w-full max-w-xl bg-[#052C5A] text-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 bg-[#031F42] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <FileText
              aria-hidden="true"
              className="w-5 h-5 text-[#00AEEF] shrink-0"
            />
            <h2
              id="source-modal-title"
              className="font-display font-bold text-base sm:text-lg truncate"
            >
              {bi('Source & Verification', 'Gwero ndi Chitsimikizo')}
            </h2>
          </div>
          <button
            type="button"
            aria-label={bi('Close source information', 'Tsekani gwero')}
            onClick={closeSourceModal}
            className="p-2 rounded-full text-[#B8D9F8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          <div className="p-3.5 rounded-xl bg-[#031F42] text-xs sm:text-sm flex items-start gap-2.5 text-white">
            <AlertCircle
              aria-hidden="true"
              className="w-4 h-4 shrink-0 mt-0.5 text-[#00AEEF]"
            />
            <div>
              <div className="font-bold">
                {isSample
                  ? bi('Sample Educational Data', 'Zambiri Zachitsanzo')
                  : bi(
                      'Verified Against Original Report',
                      'Zotsimikiziridwa kuchokera ku Lipoti'
                    )}
              </div>
              <p className="text-xs text-[#CFE8FC] mt-0.5">
                {isSample
                  ? bi(
                      'Illustrative placeholder pending official verification.',
                      'Zitsanzo zophunzirira podikira chitsimikizo.'
                    )
                  : bi(
                      'Figures match the referenced World Bank report.',
                      'Ziwerengero zikugwirizana ndi lipoti la World Bank.'
                    )}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-bold tracking-wide text-[#85C7F2]">
              {bi('CLASSIFICATION', 'MTUNDU WA MFUNDO')}
            </div>
            <div className="text-sm font-semibold text-white">
              {isInterpretation
                ? bi('Platform Interpretation*', 'Kufotokoza kwa Tsamba*')
                : bi(
                    'Directly Reported Information',
                    'Zomwe Zinatchulidwa m’Lipoti'
                  )}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-xs font-bold tracking-wide text-[#85C7F2]">
              {bi(
                'ORIGINAL CONTEXT',
                'MAWU ENIENI A M’LIPOTI (CHINGEREZI)'
              )}
            </div>
            <p className="text-sm text-[#052C5A] leading-relaxed bg-[#F3F6FB] p-4 rounded-xl">
              {activeSource.originalWording}
            </p>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm">
            <div>
              <dt className="text-xs text-[#85C7F2]">{bi('Report', 'Lipoti')}</dt>
              <dd className="font-semibold text-white mt-0.5">
                {activeSource.reportTitle}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#85C7F2]">
                {bi('Publisher & Year', 'Wofalitsa & Chaka')}
              </dt>
              <dd className="font-semibold text-white mt-0.5">
                {activeSource.publisher} · {activeSource.publicationYear}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#85C7F2]">
                {bi('Reference', 'Tsamba la Lipoti')}
              </dt>
              <dd className="font-medium text-white mt-0.5">
                {activeSource.pageReference}
              </dd>
            </div>
            {activeSource.sourceUrl && (
              <div>
                <dt className="text-xs text-[#85C7F2]">
                  {bi('Publication', 'Buku la Lipoti')}
                </dt>
                <dd className="mt-0.5">
                  <a
                    href={activeSource.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#00AEEF] hover:underline font-bold text-sm"
                  >
                    <span>{bi('Open PDF', 'Tsegulani PDF')}</span>
                    <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
