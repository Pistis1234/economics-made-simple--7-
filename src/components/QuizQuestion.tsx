import {CheckCircle2, Info, XCircle} from 'lucide-react';
import {useApp} from '../context/AppContext';
import {getTopicPhoto, PHOTO_ASSETS} from '../data/photoAssets';
import type {QuizQuestionData} from '../types';

interface QuizQuestionProps {
  question: QuizQuestionData;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string) => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export function QuizQuestion({
  question,
  selectedOptionId,
  onSelectOption,
}: QuizQuestionProps) {
  const {t, bi, openSourceModal} = useApp();
  const hasAnswered = selectedOptionId !== null;
  const isCorrect = selectedOptionId === question.correctOptionId;

  const qLower = question.question.en.toLowerCase();
  const photo = qLower.includes('electricity') || qLower.includes('industrial')
    ? PHOTO_ASSETS.solarGrid
    : qLower.includes('maize')
      ? PHOTO_ASSETS.maizeFarmerTractor
      : getTopicPhoto(question.topicSlug);

  return (
    <article className="relative overflow-hidden bg-[#031F42] rounded-3xl p-6 sm:p-8 shadow-xl">
      <img
        src={photo}
        alt=""
        aria-hidden="true"
        referrerPolicy="no-referrer"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#031F42]/90 via-[#031F42]/76 to-[#031F42]/94"
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <h2 className="font-display font-bold text-xl sm:text-2xl text-white leading-snug">
          {t(question.question)}
        </h2>
        <button
          type="button"
          onClick={() => openSourceModal(question.source)}
          aria-label={bi(
            'Source information for this question',
            'Gwero la funso ili'
          )}
          className="w-8 h-8 rounded-full bg-[#0A3A72]/90 flex items-center justify-center text-[#B8D9F8] hover:text-white hover:bg-[#164273] shrink-0 cursor-pointer transition-colors"
        >
          <Info aria-hidden="true" className="w-4 h-4" />
        </button>
      </div>

      <div
        className="relative z-10 mt-6 space-y-3"
        role="radiogroup"
        aria-label={t(question.question)}
      >
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          const isOptionCorrect = option.id === question.correctOptionId;

          let cardStyle =
            'bg-[#052C5A]/85 hover:bg-[#0A3A72] text-white backdrop-blur-sm';
          if (hasAnswered) {
            if (isOptionCorrect) {
              cardStyle =
                'bg-white text-[#052C5A] shadow-[0_0_20px_rgba(0,174,239,0.45)]';
            } else if (isSelected && !isOptionCorrect) {
              cardStyle = 'bg-[#0A3A72] text-white';
            } else {
              cardStyle = 'bg-[#031F42]/85 text-[#9AC2EA]';
            }
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={hasAnswered}
              onClick={() => onSelectOption(option.id)}
              className={`w-full text-left p-4 rounded-2xl transition-all flex items-center justify-between gap-4 shadow-md ${cardStyle} ${
                hasAnswered ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <span
                  className={`font-display-num text-xs font-bold w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                    hasAnswered && isOptionCorrect
                      ? 'bg-[#00AEEF] text-[#052C5A]'
                      : hasAnswered && isSelected && !isOptionCorrect
                        ? 'bg-[#85C7F2] text-[#052C5A]'
                        : 'bg-[#00AEEF] text-[#052C5A]'
                  }`}
                >
                  {OPTION_LETTERS[idx] ?? idx + 1}
                </span>
                <span className="text-sm sm:text-base font-semibold leading-snug">
                  {t(option.text)}
                </span>
              </div>

              {hasAnswered && isOptionCorrect && (
                <CheckCircle2
                  aria-label={bi('Correct answer', 'Yankho lolondola')}
                  className="w-5 h-5 text-[#00AEEF] shrink-0"
                />
              )}
              {hasAnswered && isSelected && !isOptionCorrect && (
                <XCircle
                  aria-label={bi('Not quite right', 'Sichoncho kwenikweni')}
                  className="w-5 h-5 text-[#85C7F2] shrink-0"
                />
              )}
            </button>
          );
        })}
      </div>

      {hasAnswered && (
        <div
          aria-live="polite"
          className="relative z-10 mt-6 p-5 rounded-2xl bg-[#052C5A]/90 backdrop-blur-sm"
        >
          <div className="font-display font-bold text-sm text-[#00AEEF]">
            {isCorrect
              ? bi('Nice work — that is right!', 'Kwakukulu — mwakhoza!')
              : bi(
                  'Good try — here is the simple takeaway:',
                  'Kuyesa kwabwino — mfundo yachidule ndi iyi:'
                )}
          </div>
          <p className="mt-1 text-sm text-[#CFE8FC] leading-relaxed">
            {t(question.explanation)}
          </p>
        </div>
      )}
    </article>
  );
}
