import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { sharedSections, linkCard } from './lib/page-schema';

/**
 * Shared front-matter every content type carries.
 * Keep this list short, anything optional belongs on the specific collection.
 */
const base = {
  title: z.string(),
  description: z.string(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  /** Social / OG image, relative to `public/`. */
  ogImage: z.string().optional(),
};

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    ...base,
    author: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

const research = defineCollection({
  loader: glob({ base: './src/content/research', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    ...base,
    authors: z.array(z.string()).default([]),
    /** Optional PDF companion, relative to `public/`. */
    pdf: z.string().optional(),
  }),
});

const cookbook = defineCollection({
  loader: glob({ base: './src/content/cookbook', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    ...base,
    /** Which packaged colleague this recipe belongs to. */
    colleague: z.string().optional(),
    integrations: z.array(z.string()).default([]),
    difficulty: z.enum(['starter', 'intermediate', 'advanced']).default('starter'),
    /** Gallery: icon, one primary category, an optional collection, featured flag. */
    icon: z.string().default('ri-book-2-line'),
    category: z.string().default('Automation'),
    collection: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    /** Detail page, the two bullet lists. */
    whatItDoes: z.array(z.string()).default([]),
    howToUse: z.array(z.string()).default([]),
    /** The workflow timeline; each step is a card in the left column. */
    workflow: z
      .array(
        z.object({
          kind: z.enum(['trigger', 'prompt', 'shell', 'result']).default('prompt'),
          title: z.string(),
          body: z.string().optional(),
        }),
      )
      .default([]),
    /** Recommended skills the recipe leans on (shown as cards). */
    skills: z
      .array(
        z.object({
          name: z.string(),
          description: z.string().optional(),
          /** Full skill content served at /cookbook/<slug>/skills/<skill>.md — the
           * instructions an agent actually imports: method, rules, output format. */
          body: z.string().optional(),
        }),
      )
      .default([]),
    /** Recurring jobs the agent offers to set up, served at jobs-setup/<job>.md. */
    jobs: z
      .array(
        z.object({
          name: z.string(),
          cadence: z.string(),
          /** Self-contained job prompt — fired runs are fresh sessions. */
          prompt: z.string(),
        }),
      )
      .default([]),
    /** One-line goal woven into the short fetch-prompt. */
    goal: z.string().default(''),
    /** The full copyable prompt shown on the right, with a Copy button. */
    prompt: z.string().default(''),
  }),
});

/**
 * The two long-form marketing page types. Both follow the structures set out in
 * the content pack's INDEX.md; the shared five sections live in
 * `src/lib/page-schema.ts` so the templates cannot drift apart.
 */
const platform = defineCollection({
  loader: glob({ base: './src/content/platform', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    ...base,
    ...sharedSections,
    /** Nav ordering and the home-page grid. */
    order: z.number().default(0),
    /** Up to three technical details, each linking to docs. */
    technical: z.array(linkCard).default([]),
  }),
});

const useCases = defineCollection({
  loader: glob({ base: './src/content/use-cases', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    ...base,
    ...sharedSections,
    order: z.number().default(0),
    /** Cross-links into the product pillars. */
    poweredBy: z.array(linkCard).default([]),
    /** One honest cross-customer anchor. Unverified today. */
    aggregateProof: z
      .object({ value: z.string(), label: z.string(), needsVerify: z.boolean().default(true) })
      .optional(),
    /** Recipe, demo, docs. */
    resources: z.array(linkCard).default([]),
  }),
});

/**
 * A single string transcribed from Figma.
 *  - `node`   is the Figma node id, emitted as an HTML comment beside the string
 *             so a reviewer can trace any word back to the drawing.
 *  - `needed` marks copy that is placeholder, duplicated, or names a competitor
 *             that is not the page's competitor. It renders inside
 *             `.copy-needed` so unwritten copy can never ship silently.
 */
const copy = z.object({
  text: z.string(),
  node: z.string().optional(),
  needed: z.boolean().default(false),
});

/** The title block that opens the pillars, table and proof sections. */
const sectionHeading = z.object({ title: copy, sub: copy });

/** The one card shell the whole page reuses: icon, heading, body, opt. body 2. */
const compareCard = z.object({
  /** Remix Icon class, e.g. `ri-lock-2-line`. */
  icon: z.string().default('ri-lock-2-line'),
  heading: copy,
  body: copy,
  /** Proof-grid cards only: a hairline divider then a second paragraph. */
  body2: copy.optional(),
});

/**
 * Competitor comparison pages. Content is mostly structured rows rather than
 * prose, so the comparison stack lives in front-matter and the body is optional.
 *
 * Every section below is optional: a new competitor page can ship the hero and
 * the table alone. `rows` stays the canonical comparison stack.
 */
const compare = defineCollection({
  loader: glob({ base: './src/content/compare', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    ...base,
    competitor: z.string(),
    /** One row of the comparison stack. */
    rows: z
      .array(
        z.object({
          label: z.string(),
          eluu: z.string(),
          them: z.string(),
          labelNode: z.string().optional(),
          eluuNode: z.string().optional(),
          themNode: z.string().optional(),
          eluuNeeded: z.boolean().default(false),
          themNeeded: z.boolean().default(false),
        }),
      )
      .default([]),

    hero: z
      .object({
        eyebrow: copy,
        /** Figma breaks the H1 with two U+2028 separators; one line per entry. */
        headingLines: z.array(z.string()).default([]),
        sub: copy,
        stats: z.array(z.object({ value: z.string(), caption: copy })).default([]),
        form: z.object({
          heading: z.string(),
          subheading: copy,
          fields: z
            .array(
              z.object({
                label: z.string(),
                icon: z.string().default('ri-user-6-line'),
                placeholder: copy,
                type: z.string().default('text'),
              }),
            )
            .default([]),
          submit: z.string(),
          finePrint: copy,
        }),
      })
      .optional(),

    pillars: z.object({ heading: sectionHeading, cards: z.array(compareCard) }).optional(),
    table: z.object({ heading: sectionHeading }).optional(),
    proof: z.object({ heading: sectionHeading, cards: z.array(compareCard) }).optional(),
    closing: z
      .object({ title: copy, sub: copy, cards: z.array(compareCard) })
      .optional(),
  }),
});

export const collections = { blog, research, cookbook, platform, useCases, compare };
