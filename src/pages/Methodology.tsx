import {BookOpen, CheckCircle2, Globe, ShieldAlert} from 'lucide-react';
import {Link} from 'react-router-dom';
import {useApp} from '../context/AppContext';
import {PHOTO_ASSETS} from '../data/photoAssets';

export function Methodology() {
  const {bi} = useApp();

  return (
    <div className="bg-[#052C5A] text-white min-h-screen py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-8">
        <div>
          <div className="inline-flex px-4 py-1 rounded-full bg-[#00AEEF] text-[#052C5A] text-xs font-bold">
            {bi('SOURCES & TRANSPARENCY', 'MAGWERO & KUONERERA POYERA')}
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white mt-2 tracking-tight">
            {bi('How We Explain the Economy', 'Momwe Timafotokozera za Chuma')}
          </h1>
          <p className="mt-3 text-base text-[#CFE8FC] leading-relaxed">
            {bi(
              'Long reports turned into brief visuals — every number linked to its report page.',
              'Malipoti ataliatali asinthidwa kukhala zithunzi zazifupi — nambala iliyonse ili ndi tsamba lake.'
            )}
          </p>
        </div>

        <section
          id="sources"
          className="bg-[#031F42] rounded-2xl p-7 sm:p-8 space-y-6 shadow-xl"
        >
          <div className="flex items-start gap-3">
            <BookOpen
              aria-hidden="true"
              className="w-6 h-6 text-[#00AEEF] shrink-0 mt-0.5"
            />
            <div>
              <h2 className="font-display font-bold text-xl text-white">
                {bi(
                  '1. Report Facts vs. Simple Guides',
                  '1. Zomwe Zili m’Lipoti vs. Mafotokozedwe'
                )}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#CFE8FC] leading-relaxed">
                {bi(
                  'Every card separates direct report facts from plain examples:',
                  'Khadi lililonse limasiyanitsa mfundo za m’lipoti ndi zitsanzo zosavuta:'
                )}
              </p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative overflow-hidden p-5 rounded-xl bg-[#052C5A] text-white shadow-md">
              <img
                src={PHOTO_ASSETS.farmersVegetables}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-38"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[#052C5A]/82"
              />
              <div className="relative z-10">
                <div className="font-display font-bold text-sm text-[#00AEEF]">
                  {bi('A. From the Report', 'A. Za m’Lipoti Lenileni')}
                </div>
                <p className="mt-1.5 text-sm text-[#E6F1FF] leading-relaxed">
                  {bi(
                    'Facts and figures quoted straight from the PDF with page numbers.',
                    'Mfundo ndi manambala ochokera m’lipoti ndi tsamba lake.'
                  )}
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden p-5 rounded-xl bg-[#052C5A] text-white shadow-md">
              <img
                src={PHOTO_ASSETS.tailorShop}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-38"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[#052C5A]/82"
              />
              <div className="relative z-10">
                <div className="font-display font-bold text-sm text-[#00AEEF]">
                  {bi('B. Plain Guide*', 'B. Mafotokozedwe*')}
                </div>
                <p className="mt-1.5 text-sm text-[#E6F1FF] leading-relaxed">
                  {bi(
                    'Short everyday examples marked * showing what leads to what.',
                    'Zitsanzo zazifupi zolembedwa * zosonyeza zotsatira zake.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#031F42] rounded-2xl p-7 sm:p-8 space-y-4 shadow-xl">
          <img
            src={PHOTO_ASSETS.forexBureau}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-30"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#031F42]/92 via-[#031F42]/80 to-[#031F42]/92"
          />
          <div className="relative z-10 flex items-start gap-3">
            <ShieldAlert
              aria-hidden="true"
              className="w-6 h-6 text-[#85C7F2] shrink-0 mt-0.5"
            />
            <div>
              <h2 className="font-display font-bold text-xl text-white">
                {bi('2. Verified Figures', '2. Manambala Otsimikizika')}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#CFE8FC] leading-relaxed">
                {bi(
                  'No made-up quotes or numbers — sample placeholders are clearly tagged.',
                  'Palibe mawu kapena manambala ongopeka — zitsanzo zimalembedwa momveka.'
                )}
              </p>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#031F42] rounded-2xl p-7 sm:p-8 space-y-4 shadow-xl">
          <img
            src={PHOTO_ASSETS.marketBaskets}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-32"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#031F42]/92 via-[#031F42]/80 to-[#031F42]/92"
          />
          <div className="relative z-10 flex items-start gap-3">
            <Globe
              aria-hidden="true"
              className="w-6 h-6 text-[#00AEEF] shrink-0 mt-0.5"
            />
            <div>
              <h2 className="font-display font-bold text-xl text-white">
                {bi('3. Two Languages', '3. Ziyankhulo Ziwiri')}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#CFE8FC] leading-relaxed">
                {bi(
                  'Switch cleanly between plain English and plain Chichewa anywhere.',
                  'Sinthani pakati pa Chingerezi chosavuta ndi Chichewa paliponse.'
                )}
              </p>
            </div>
          </div>
        </section>

        <div className="relative overflow-hidden flex flex-wrap items-center justify-between gap-4 bg-[#031F42] text-white rounded-2xl p-6 sm:p-7 shadow-xl">
          <img
            src={PHOTO_ASSETS.harvestHills}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-35"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[#031F42]/78"
          />
          <div className="relative z-10 flex items-center gap-3">
            <CheckCircle2
              aria-hidden="true"
              className="w-5 h-5 text-[#00AEEF] shrink-0"
            />
            <span className="text-sm sm:text-base font-bold">
              {bi(
                'Ready to explore the topic summaries?',
                'Mwakonzeka kuwerenga mwachidule mitu ya chuma?'
              )}
            </span>
          </div>
          <Link
            to="/learn"
            className="relative z-10 px-6 py-2.5 rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] text-sm font-bold whitespace-nowrap shrink-0 transition-colors"
          >
            {bi('Choose a Topic', 'Sankhani Mutu')}
          </Link>
        </div>
      </div>
    </div>
  );
}
