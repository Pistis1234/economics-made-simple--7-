import {Info} from 'lucide-react';
import {useApp} from '../../context/AppContext';
import type {SourceReference} from '../../types';

interface SourceInfoButtonProps {
  source: SourceReference;
  label: string;
  dark?: boolean;
}

export function SourceInfoButton({
  source,
  label,
}: SourceInfoButtonProps) {
  const {openSourceModal, bi} = useApp();

  return (
    <button
      type="button"
      onClick={() => openSourceModal(source)}
      aria-label={bi(
        `Inspect source wording and page citation for ${label}`,
        `Onani mawu enieni ndi tsamba la ${label}`
      )}
      title={bi(
        'View original report wording and page citation',
        'Onani mawu enieni a m’lipoti ndi tsamba lake'
      )}
      className="w-8 h-8 rounded-full bg-[#0A3A72] text-[#B8D9F8] hover:text-white hover:bg-[#164273] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
    >
      <Info aria-hidden="true" className="w-4 h-4" />
    </button>
  );
}

interface SourceInformationModalProps {
  source?: SourceReference | null;
  onClose?: () => void;
}

export function SourceInformationModal({
  source,
  onClose,
}: SourceInformationModalProps) {
  const {activeSource, closeSourceModal, bi} = useApp();
  const resolved = source ?? activeSource;
  if (!resolved || activeSource) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={bi('Source information', 'Gwero la mfundo')}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#031F42]/80 backdrop-blur-sm"
      onClick={onClose ?? closeSourceModal}
    >
      <div
        className="w-full max-w-lg bg-[#052C5A] text-white rounded-2xl p-6 space-y-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-[#00AEEF]">
              {resolved.publisher} · {resolved.pageReference}
            </div>
            <h3 className="font-display font-bold text-lg text-white mt-1">
              {resolved.reportTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose ?? closeSourceModal}
            className="px-3.5 py-1.5 rounded-full bg-[#0A3A72] hover:bg-[#164273] text-xs font-semibold text-white cursor-pointer transition-colors"
          >
            {bi('Close', 'Tsekani')}
          </button>
        </div>
        <p className="text-sm text-[#052C5A] leading-relaxed bg-[#F3F6FB] p-4 rounded-xl">
          {resolved.originalWording}
        </p>
      </div>
    </div>
  );
}
