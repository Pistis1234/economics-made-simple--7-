import {ArrowRight, ArrowUpRight, Award, RotateCcw} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {useEffect, useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {QuizQuestion} from '../components/QuizQuestion';
import {useApp} from '../context/AppContext';
import {getTopicPhoto, PHOTO_ASSETS} from '../data/photoAssets';

export function Quiz() {
  const {selectedReport, selectedReportId, quizzes, t, bi} = useApp();

  const questions = useMemo(
    () => quizzes.filter((q) => q.reportId === selectedReportId),
    [quizzes, selectedReportId]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setAnswers({});
    setIsFinished(false);
  }, [selectedReportId]);

  if (questions.length === 0) {
    return (
      <div className="bg-[#052C5A] min-h-[70vh] py-16 px-4">
        <div className="relative overflow-hidden max-w-2xl mx-auto bg-[#031F42] rounded-2xl p-8 text-center shadow-xl">
          <img
            src={PHOTO_ASSETS.marketBaskets}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-35"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[#031F42]/80"
          />
          <h1 className="relative z-10 font-display font-bold text-2xl text-white">
            {bi(
              `Quiz coming soon for ${selectedReport.shortTitle}`,
              `Mafunso akukonzedwa a ${selectedReport.shortTitle}`
            )}
          </h1>
          <p className="relative z-10 mt-2 text-sm text-[#B8D9F8]">
            {bi(
              'Explore the topic summaries while questions for this edition are prepared.',
              'Werengani mwachidule za mitu pamene mafunso a bukuli akukonzedwa.'
            )}
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const currentSelected = currentQuestion
    ? answers[currentQuestion.id] ?? null
    : null;

  const score = questions.reduce((acc, q) => {
    return answers[q.id] === q.correctOptionId ? acc + 1 : acc;
  }, 0);

  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion || answers[currentQuestion.id]) return;
    setAnswers((prev) => ({...prev, [currentQuestion.id]: optionId}));
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

  const progressPct = isFinished
    ? 100
    : Math.round(((currentIndex + (currentSelected ? 1 : 0)) / questions.length) * 100);

  return (
    <div className="bg-[#052C5A] text-white min-h-screen py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 space-y-8">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#00AEEF] text-[#052C5A] text-xs font-bold">
              <span>{bi('2-MINUTE CHECK', 'KUDZIYESA KWA MPHINDI 2')}</span>
              <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
            </span>
            <Link
              to="/learn"
              className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-transparent border border-[#00AEEF]/60 hover:bg-[#00AEEF]/10 text-[#CFE8FC] text-xs font-semibold transition-colors"
            >
              {selectedReport.shortTitle} ({selectedReport.year})
            </Link>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white mt-2.5 tracking-tight">
            {bi('Check What You Learned', 'Yesani Zomwe Mwaphunzira')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#CFE8FC]">
            {bi(
              'Short questions with instant plain-language answers.',
              'Mafunso achidule okhala ndi mayankho omveka nthawi yomweyo.'
            )}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#B8D9F8] tabular-nums">
            <span>
              {isFinished
                ? bi(
                    `Completed all ${questions.length} questions`,
                    `Mwamaliza mafunso onse ${questions.length}`
                  )
                : bi(
                    `Question ${currentIndex + 1} of ${questions.length}`,
                    `Funso ${currentIndex + 1} pa ${questions.length}`
                  )}
            </span>
            <span>{progressPct}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-[#031F42] overflow-hidden">
            <motion.div
              animate={{width: `${progressPct}%`}}
              transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
              className="h-full bg-[#00AEEF]"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isFinished && currentQuestion ? (
            <motion.div
              key={currentQuestion.id}
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -10}}
              transition={{duration: 0.2}}
              className="space-y-6"
            >
              <QuizQuestion
                question={currentQuestion}
                selectedOptionId={currentSelected}
                onSelectOption={handleSelectOption}
              />

              {currentSelected && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] font-bold text-sm transition-colors cursor-pointer"
                  >
                    <span>
                      {currentIndex + 1 < questions.length
                        ? bi('Next question', 'Funso lotsatira')
                        : bi('See your summary', 'Onani zotsatira zanu')}
                    </span>
                    <ArrowRight aria-hidden="true" className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="quiz-done"
              initial={{opacity: 0, scale: 0.98}}
              animate={{opacity: 1, scale: 1}}
              className="bg-[#031F42] text-white rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#00AEEF]/20 text-[#00AEEF] flex items-center justify-center mx-auto">
                <Award aria-hidden="true" className="w-8 h-8" />
              </div>

              <div>
                <div className="text-xs font-extrabold text-[#00AEEF]">
                  {bi('QUIZ COMPLETE', 'MAFUNSO ATHA')}
                </div>
                <h2 className="font-display-num font-extrabold text-3xl text-white mt-1 tabular-nums">
                  {bi(
                    `You scored ${score} out of ${questions.length}`,
                    `Mwakhoza ${score} pa ${questions.length}`
                  )}
                </h2>
                <p className="mt-2 text-base text-[#DCEBFC] max-w-lg mx-auto leading-relaxed">
                  {score === questions.length
                    ? bi(
                        'Great work — you nailed the key links between growth, prices, and jobs.',
                        'Mwachita bwino — mwamvetsa momwe chuma, mitengo, ndi ntchito zimagwirizanirana.'
                      )
                    : bi(
                        'Good effort! Tap any topic below for a fast refresher.',
                        'Mwayesetsa! Tsegulani mutu pansipa kuti muwone chidule.'
                      )}
                </p>
              </div>

              <div className="text-left pt-4 space-y-3">
                <h3 className="font-display font-bold text-sm text-[#85C7F2]">
                  {bi('Quick Recap', 'Chidule Chachangu')}
                </h3>
                {questions.map((q, idx) => {
                  const gotRight = answers[q.id] === q.correctOptionId;
                  return (
                    <div
                      key={q.id}
                      className="relative overflow-hidden p-4 rounded-xl bg-[#052C5A] shadow-sm flex items-center justify-between gap-4 text-sm"
                    >
                      <img
                        src={getTopicPhoto(q.topicSlug)}
                        alt=""
                        aria-hidden="true"
                        referrerPolicy="no-referrer"
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-28"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[#052C5A]/82"
                      />
                      <span className="relative z-10 text-white font-medium">
                        {idx + 1}. {t(q.question)}
                      </span>
                      <Link
                        to={`/learn/${q.topicSlug}`}
                        className={`relative z-10 text-xs font-bold shrink-0 hover:underline ${
                          gotRight ? 'text-[#00AEEF]' : 'text-[#85C7F2]'
                        }`}
                      >
                        {gotRight
                          ? bi('Correct · Review', 'Mwakhoza · Bwerezani')
                          : bi('Open summary', 'Tsegulani chidule')}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A3A72] hover:bg-[#164273] text-white text-sm font-bold cursor-pointer"
                >
                  <RotateCcw aria-hidden="true" className="w-4 h-4" />
                  <span>{bi('Restart quiz', 'Yambiraninso mafunso')}</span>
                </button>
                <Link
                  to="/learn"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] text-sm font-bold"
                >
                  <span>{bi('Choose a topic', 'Sankhani mutu')}</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
