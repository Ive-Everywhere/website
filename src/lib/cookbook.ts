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
};

export const catColor = (c: string): CatColor =>
  categoryColor[c] ?? { surface: 'bg-bg-weak-50', tile: 'bg-bg-soft-200', ink: 'text-text-sub-600' };
