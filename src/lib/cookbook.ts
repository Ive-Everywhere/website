/**
 * Per-category colour for the Cookbook — a soft surface tint, a stronger icon
 * tint, and the on-tint ink. Kept in one place so the gallery cards, the
 * collection cards and the recipe hero all read as one system.
 */
export interface CatColor {
  surface: string; // card fill
  tile: string; // icon tile fill
  ink: string; // icon + accent ink
}

export const categoryColor: Record<string, CatColor> = {
  Finance: { surface: 'bg-[#eef4ef]', tile: 'bg-[#dcebe1]', ink: 'text-[#2f7d54]' },
  Sales: { surface: 'bg-[#eef2f8]', tile: 'bg-[#dde7f5]', ink: 'text-[#3f5a86]' },
  Engineering: { surface: 'bg-[#f4eef3]', tile: 'bg-[#ecdfe9]', ink: 'text-[#8a5978]' },
  People: { surface: 'bg-[#f7f0e6]', tile: 'bg-[#efe1cd]', ink: 'text-[#8a6a3e]' },
  Apps: { surface: 'bg-[#efeaf6]', tile: 'bg-[#e2d9ee]', ink: 'text-[#5b4b7a]' },
  Data: { surface: 'bg-[#e9f2f2]', tile: 'bg-[#d5e8e6]', ink: 'text-[#2f7676]' },
  Legal: { surface: 'bg-[#f2eff5]', tile: 'bg-[#e4dcec]', ink: 'text-[#6a5688]' },
  Product: { surface: 'bg-[#eff3ee]', tile: 'bg-[#dfe9dc]', ink: 'text-[#57774f]' },
  'Customer Engineering': { surface: 'bg-[#edf2f6]', tile: 'bg-[#dbe6ef]', ink: 'text-[#3f6a8a]' },
};

export const catColor = (c: string): CatColor =>
  categoryColor[c] ?? { surface: 'bg-bg-weak-50', tile: 'bg-bg-soft-200', ink: 'text-text-sub-600' };

/** Icon per category for the gallery's left rail. Falls back to a book. */
export const categoryIcon: Record<string, string> = {
  Finance: 'ri-coins-line',
  Sales: 'ri-funds-line',
  Engineering: 'ri-terminal-box-line',
  People: 'ri-team-line',
  Apps: 'ri-layout-grid-line',
  Data: 'ri-database-2-line',
  Legal: 'ri-scales-3-line',
  Product: 'ri-compass-3-line',
  'Customer Engineering': 'ri-customer-service-2-line',
};
export const catIcon = (c: string): string => categoryIcon[c] ?? 'ri-book-2-line';

/**
 * Collection card copy + tint, shared by the gallery and the collection pages
 * so the two never drift.
 */
export const collectionMeta: Record<string, { blurb: string; tint: string }> = {
  'Month-end pack': { blurb: 'Everything finance runs at close.', tint: 'bg-[#bfcdf6]' },
  'Revenue ops': { blurb: 'Keep the pipeline honest.', tint: 'bg-[#cfe9d0]' },
  'Incident response': { blurb: 'From page to fix to post-mortem.', tint: 'bg-[#ecd7f7]' },
  'Pipeline & prospecting': { blurb: 'Research, map, and fill the pipeline.', tint: 'bg-[#c9def4]' },
  'Deal support': { blurb: 'Questionnaires, RFPs, and trials, unblocked.', tint: 'bg-[#c6e6e0]' },
  'Customer health': { blurb: 'See risk before the customer says it.', tint: 'bg-[#d3ecd9]' },
  'Cash & spend': { blurb: 'Where the money goes, verified.', tint: 'bg-[#f2e4bb]' },
  'Contract review': { blurb: 'First-pass redlines, checked twice.', tint: 'bg-[#e6d6f2]' },
  'Contract lifecycle': { blurb: 'Nothing signed slips through.', tint: 'bg-[#dcd3f0]' },
  'Discovery': { blurb: 'What users actually say and do.', tint: 'bg-[#d9e8c9]' },
  'Ship & tell': { blurb: 'Specs stress-tested, updates honest.', tint: 'bg-[#cfd8f3]' },
  'Hiring': { blurb: 'From JD to debrief, one thread.', tint: 'bg-[#f3ddc4]' },
  'Employee experience': { blurb: 'Answers, surveys, and clean exits.', tint: 'bg-[#f0d9cf]' },
};

/** Short rail labels where the full category name would widen the menu. */
export const categoryShort: Record<string, string> = {
  'Customer Engineering': 'Customer Eng.',
};
export const catShort = (c: string): string => categoryShort[c] ?? c;

/** URL slug for a collection name — same kebab rule the recipe file URLs use. */
export const collectionSlug = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
