import {INDICATORS} from '../data/indicators';
import {RECOMMENDATIONS} from '../data/recommendations';
import {REPORTS} from '../data/reports';
import {TOPIC_CARDS} from '../data/topicCards';
import {TOPICS} from '../data/topics';
import type {LanguageCode, SearchResultItem, Topic} from '../types';
import {resolveLocalizedText} from './formatting';

export function searchEconomicsContent(
  query: string,
  language: LanguageCode,
  topicsList: Topic[] = TOPICS
): SearchResultItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [];
  }

  const reportMap = new Map(REPORTS.map((r) => [r.id, r]));
  const topicById = new Map(topicsList.map((t) => [t.id, t]));
  const results: SearchResultItem[] = [];

  for (const topic of topicsList) {
    const title = resolveLocalizedText(topic.title, language).value;
    const desc = resolveLocalizedText(topic.description, language).value;
    const why = resolveLocalizedText(topic.whyItMatters, language).value;
    const haystack = `${title} ${desc} ${why} ${topic.category}`.toLowerCase();

    if (haystack.includes(normalized)) {
      const report = reportMap.get(topic.reportId);
      results.push({
        id: `search-topic-${topic.id}`,
        type: 'topic',
        title,
        explanation: desc,
        category: topic.category,
        reportId: topic.reportId,
        reportTitle: report?.shortTitle ?? 'Report',
        reportYear: report?.year ?? 2024,
        href: `/learn/${topic.slug}?report=${topic.reportId}`,
      });
    }
  }

  for (const card of TOPIC_CARDS) {
    const heading = resolveLocalizedText(card.heading, language).value;
    const summary = resolveLocalizedText(card.oneLineSummary, language).value;
    const plain = resolveLocalizedText(card.plainExplanation, language).value;
    const haystack = `${heading} ${summary} ${plain}`.toLowerCase();

    if (haystack.includes(normalized)) {
      const topic = topicById.get(card.topicId);
      const report = reportMap.get(card.reportId);
      if (topic) {
        results.push({
          id: `search-card-${card.id}`,
          type: 'card',
          title: heading,
          explanation: summary,
          category: resolveLocalizedText(topic.shortTitle, language).value,
          reportId: card.reportId,
          reportTitle: report?.shortTitle ?? 'Report',
          reportYear: report?.year ?? 2024,
          href: `/learn/${topic.slug}?report=${card.reportId}`,
        });
      }
    }
  }

  for (const ind of INDICATORS) {
    const name = resolveLocalizedText(ind.name, language).value;
    const what = resolveLocalizedText(ind.whatItMeasures, language).value;
    const simple = resolveLocalizedText(ind.simpleExplanation, language).value;
    const haystack = `${name} ${what} ${simple} ${ind.category}`.toLowerCase();

    if (haystack.includes(normalized)) {
      const report = reportMap.get(ind.reportId);
      results.push({
        id: `search-ind-${ind.id}`,
        type: 'indicator',
        title: name,
        explanation: simple,
        category: ind.category,
        reportId: ind.reportId,
        reportTitle: report?.shortTitle ?? 'Report',
        reportYear: report?.year ?? 2024,
        href: `/learn/${ind.topicSlug}?report=${ind.reportId}`,
      });
    }
  }

  for (const rec of RECOMMENDATIONS) {
    const heading = resolveLocalizedText(rec.heading, language).value;
    const simple = resolveLocalizedText(rec.simpleExplanation, language).value;
    const haystack = `${heading} ${simple} ${rec.category}`.toLowerCase();

    if (haystack.includes(normalized)) {
      const report = reportMap.get(rec.reportId);
      results.push({
        id: `search-rec-${rec.id}`,
        type: 'recommendation',
        title: heading,
        explanation: simple,
        category: rec.category,
        reportId: rec.reportId,
        reportTitle: report?.shortTitle ?? 'Report',
        reportYear: report?.year ?? 2024,
        href: `/actions?report=${rec.reportId}`,
      });
    }
  }

  return results.slice(0, 12);
}
