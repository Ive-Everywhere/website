import { z } from 'astro:content';

/**
 * Shared shape for the two long-form marketing page types.
 *
 * Both are described in `projects/website-v3/content-src/eluu-website-content/
 * finalized-pages/INDEX.md`:
 *
 *   product pillar → hero · explanation · 3 numbers · feature cards ·
 *                    testimonial · 3 technical details · CTA
 *   use case       → hero · value prop · 3 numbers · 5 feature cards ·
 *                    testimonial · powered-by · proof · compliance ·
 *                    resources · CTA
 *
 * They share the first five sections, so those live here once and each
 * collection adds only its own tail.
 *
 * PLACEHOLDER RULE: the content marks unverified facts with `[VERIFY]`,
 * `[BENCHMARK]` or `[TO COLLECT]`. Every such field carries a `needsVerify`
 * flag, and the templates render those inside `.copy-needed`. Nothing is
 * invented to fill a slot — INDEX.md says so explicitly and so does our
 * grounding rule.
 */

/** Both CTAs are fixed site-wide, so pages only override them if they differ. */
export const SIGNUP_HREF = 'https://app.eluu.ai/signup';
export const DEMO_HREF = '/demo';

export const cta = z.object({
  label: z.string(),
  href: z.string(),
});

export const hero = z.object({
  eyebrow: z.string(),
  headline: z.string(),
  subhead: z.string(),
  primaryCta: cta.default({ label: 'Start for free', href: SIGNUP_HREF }),
  secondaryCta: cta.default({ label: 'Book a demo', href: DEMO_HREF }),
});

/**
 * The "explanation" slot on a product page and the "value prop" slot on a use
 * case are the same component with different emphasis: a lead line, a body, a
 * link out, and a product visual.
 */
export const pitch = z.object({
  heading: z.string(),
  body: z.string(),
  linkLabel: z.string().optional(),
  linkHref: z.string().optional(),
  /** Which animated illustration to show, if one fits. */
  art: z.enum(['c1-a-compose', 'c2-b-plan', 'c3-b-audit']).optional(),
  /**描述 for the reader when no art exists yet. */
  visualNote: z.string().optional(),
});

/** Three product numbers. `value` is the big figure, `label` the caption. */
export const stat = z.object({
  value: z.string(),
  label: z.string(),
  needsVerify: z.boolean().default(false),
});

/**
 * A feature card. `eyebrow` is the quoted line in the source
 * (`**N. Headline** — "eyebrow"`), `body` the sentence under it.
 * The `[Advantage/Speed/Cost/Risk]` tag is an internal value driver and is
 * deliberately NOT carried into the page.
 */
export const featureCard = z.object({
  headline: z.string(),
  /** Short label for the left rail; the card heading uses `headline`. */
  navLabel: z.string().optional(),
  eyebrow: z.string().optional(),
  body: z.string(),
  icon: z.string().default('ri-checkbox-circle-line'),
  linkHref: z.string().optional(),
  linkLabel: z.string().optional(),
  /** Feature-well illustration, relative to `public/` (e.g. brand/agents/feat1.webp). */
  art: z.string().optional(),
});

/** Always a placeholder today — every testimonial line is unverified. */
export const testimonial = z.object({
  quote: z.string(),
  attribution: z.string(),
  needsVerify: z.boolean().default(true),
});

/** Three cross-links: "powered by" on a use case, "docs" on a product page. */
export const linkCard = z.object({
  title: z.string(),
  body: z.string().optional(),
  href: z.string(),
  linkLabel: z.string().default('Learn more'),
  icon: z.string().default('ri-arrow-right-up-long-line'),
});

export const finalCta = z.object({
  headline: z.string(),
  primaryCta: cta.default({ label: 'Start for free', href: SIGNUP_HREF }),
  secondaryCta: cta.default({ label: 'Book a demo', href: DEMO_HREF }),
});

/** The five sections both page types share, in order. */
export const sharedSections = {
  hero,
  pitch,
  stats: z.array(stat).default([]),
  features: z.array(featureCard).default([]),
  testimonial: testimonial.optional(),
  finalCta,
};
