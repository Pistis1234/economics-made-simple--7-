import {ArrowRight, Award, CheckCircle2, RotateCcw, XCircle} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {useState} from 'react';
import {useApp} from '../../context/AppContext';
import {STORY_QUIZ_QUESTIONS} from '../../data/malawiGrowth2026';
import {SourceInfoButton} from './SourceInformationModal';

export function KnowledgeCheck() {
  const {bi} = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const questions = STORY_QUIZ_QUESTIONS;
  const currentQ = questions[currentIndex];
  const selectedId = currentQ ? answers[currentQ.id] : undefined;

  const score = questions.reduce(
    (sum, q) => (answers[q.id] === q.correctOptionId ? sum + 1 : sum),
    0
  );

  const progressPct = isFinished
    ? 100
    : Math.round(
        ((currentIndex + (selectedId ? 1 : 0)) / questions.length) * 100
      );

  const handleSelect = (optionId: string) => {
    if (!currentQ || answers[currentQ.id]) return;
    setAnswers((prev) => ({...prev, [currentQ.id]: optionId}));
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setIsFinished(false);
  };

  return (
    <section
      id="knowledge-check"
      aria-labelledby="knowledge-check-heading"
      className="bg-[#031F42] rounded-3xl py-10 lg:py-12 shadow-xl"
    >
      <div className="max-w-3xl mx-auto px-5 sm:px-6 space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-bold text-[#00AEEF]">
            {bi(
              'QUICK KNOWLEDGE CHECK · 5 QUESTIONS',
              'KUDZIYESA KWACHANGU · MAFUNSO 5'
            )}
          </div>
          <h2
            id="knowledge-check-heading"
            className="font-display font-extrabold text-2xl sm:text-3xl text-white"
          >
            {bi(
              'Check What You Learned from Pages 17 & 18',
              'Yesani Zomwe Mwaphunzira pa Masamba 17 & 18'
            )}
          </h2>
          <p className="text-sm sm:text-base text-[#CFE8FC]">
            {bi(
              'Instant plain-language answers after every choice.',
              'Mayankho omveka bwino nthawi yomweyo mukasankha.'
            )}
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-[#B8D9F8] tabular-nums">
            <span>
              {isFinished
                ? bi(
                    `Completed ${questions.length} of ${questions.length}`,
                    `Mwamaliza ${questions.length} pa ${questions.length}`
                  )
                : bi(
                    `Question ${currentIndex + 1} of ${questions.length}`,
                    `Funso ${currentIndex + 1} pa ${questions.length}`
                  )}
            </span>
            <span>{progressPct}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#052C5A] overflow-hidden">
            <motion.div
              animate={{width: `${progressPct}%`}}
              transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
              className="h-full rounded-full bg-[#00AEEF]"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isFinished && currentQ ? (
            <motion.div
              key={currentQ.id}
              initial={{opacity: 0, x: 14}}
              animate={{opacity: 1, x: 0}}
              exit={{opacity: 0, x: -14}}
              transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
              className="bg-[#052C5A] rounded-2xl p-6 sm:p-8 space-y-6 shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-[#85C7F2]">
                    {bi('Source', 'Gwero')}: World Bank {bi(currentQ.pageRef, currentQ.pageRefNy)}
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white leading-snug">
                    {bi(currentQ.question, currentQ.questionNy)}
                  </h3>
                </div>
                <SourceInfoButton
                  source={currentQ.source}
                  label={bi('Knowledge check question', 'Funso lodziyesera')}
                  dark
                />
              </div>

              <div
                className="space-y-2.5"
                role="radiogroup"
                aria-label={bi(currentQ.question, currentQ.questionNy)}
              >
                {currentQ.options.map((opt) => {
                  const hasAnswered = Boolean(selectedId);
                  const isSelected = selectedId === opt.id;
                  const isCorrect = opt.id === currentQ.correctOptionId;

                  let stateClass =
                    'bg-[#F3F6FB] hover:bg-white text-[#052C5A]';
                  if (hasAnswered) {
                    if (isCorrect) {
                      stateClass =
                        'bg-white text-[#052C5A] shadow-[0_0_20px_rgba(0,174,239,0.45)]';
                    } else if (isSelected && !isCorrect) {
                      stateClass =
                        'bg-[#0A3A72] text-white';
                    } else {
                      stateClass =
                        'bg-[#031F42] text-[#85C7F2] opacity-80';
                    }
                  }

                  return (
                    <motion.button
                      key={opt.id}
                      type="button"
                      disabled={hasAnswered}
                      whileHover={hasAnswered ? undefined : {x: 3}}
                      whileTap={hasAnswered ? undefined : {scale: 0.99}}
                      onClick={() => handleSelect(opt.id)}
                      className={`w-full text-left p-4 rounded-xl transition-all flex items-center justify-between gap-3 shadow-md ${
                        hasAnswered ? 'cursor-default' : 'cursor-pointer'
                      } ${stateClass}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs font-bold uppercase text-[#00AEEF] mt-0.5">
                          {opt.id}.
                        </span>
                        <span className="text-sm sm:text-base font-semibold">
                          {bi(opt.text, opt.textNy)}
                        </span>
                      </div>
                      {hasAnswered && isCorrect && (
                        <CheckCircle2
                          aria-hidden="true"
                          className="w-5 h-5 text-[#00AEEF] shrink-0"
                        />
                      )}
                      {hasAnswered && isSelected && !isCorrect && (
                        <XCircle
                          aria-hidden="true"
                          className="w-5 h-5 text-[#85C7F2] shrink-0"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {selectedId && (
                <motion.div
                  initial={{opacity: 0, y: 6}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.2}}
                  className="space-y-4 pt-2"
                >
                  <div className="p-4 rounded-xl bg-[#031F42] space-y-1">
                    <div className="text-xs font-bold text-[#00AEEF]">
                      {selectedId === currentQ.correctOptionId
                        ? bi('Correct — plain-language takeaway', 'Mwakhoza — mfundo yomveka')
                        : bi('Not quite — here is what the report says', 'Osati ndendende — zomwe lipoti likunena')}
                    </div>
                    <p className="text-sm text-[#CFE8FC] leading-relaxed">
                      {bi(currentQ.explanation, currentQ.explanationNy)}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <motion.button
                      type="button"
                      whileTap={{scale: 0.97}}
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] font-bold text-sm transition-colors cursor-pointer"
                    >
                      <span>
                        {currentIndex + 1 < questions.length
                          ? bi('Next question', 'Funso lotsatira')
                          : bi('View your score', 'Onani zotsatira zanu')}
                      </span>
                      <ArrowRight aria-hidden="true" className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="quiz-finished"
              initial={{opacity: 0, scale: 0.97}}
              animate={{opacity: 1, scale: 1}}
              transition={{duration: 0.25, ease: [0.16, 1, 0.3, 1]}}
              className="bg-[#F3F6FB] text-[#052C5A] rounded-2xl p-8 sm:p-10 text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#00AEEF]/20 text-[#052C5A] flex items-center justify-center mx-auto">
                <Award aria-hidden="true" className="w-8 h-8" />
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold text-[#00AEEF]">
                  {bi('KNOWLEDGE CHECK COMPLETE', 'KUDZIYESA KWATHA')}
                </div>
                <div className="inline-block px-6 py-3 rounded-xl bg-white shadow-sm">
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#052C5A] tabular-nums">
                    {bi(
                      `You scored ${score} out of ${questions.length}`,
                      `Mwakhoza ${score} pa ${questions.length}`
                    )}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[#475E78] max-w-lg mx-auto leading-relaxed">
                  {score === questions.length
                    ? bi(
                        'Excellent work! You clearly understand why 2.7% GDP growth still feels modest and why food hardship rose.',
                        'Mwachita bwino kwambiri! Mukumvetsa chifukwa chake kukula kwa chuma pa 2.7% sikukumveka kwambiri ndi chifukwa chake vuto la chakudya linakwera.'
                      )
                    : bi(
                        'Great job! Review any step above anytime to sharpen the details.',
                        'Mwayesetsa! Bwerezani gawo lililonse pamwambapa nthawi ina kuti mumvetse bwino.'
                      )}
                </p>
              </div>

              <motion.button
                type="button"
                whileTap={{scale: 0.97}}
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#052C5A] hover:bg-[#0A3A72] text-white text-sm font-bold transition-colors cursor-pointer"
              >
                <RotateCcw aria-hidden="true" className="w-4 h-4" />
                <span>{bi('Try the 5 questions again', 'Yesaninso mafunso 5')}</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
