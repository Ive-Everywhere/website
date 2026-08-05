import { config, fields, collection } from '@keystatic/core';

/**
 * Keystatic is git-based: it edits the same MDX files in `src/content/` that
 * Astro's content collections read. There is no database and no second source
 * of truth. Schemas here must stay in step with `src/content.config.ts`.
 */

const seo = {
  title: fields.slug({ name: { label: 'Title' } }),
  description: fields.text({
    label: 'Description',
    description: 'Used for search results and social cards. Aim for 150 characters.',
    multiline: true,
    validation: { isRequired: true },
  }),
  publishedAt: fields.date({ label: 'Published', validation: { isRequired: true } }),
  updatedAt: fields.date({ label: 'Updated' }),
  draft: fields.checkbox({ label: 'Draft', defaultValue: true }),
  ogImage: fields.image({
    label: 'Social image',
    directory: 'public/images/og',
    publicPath: '/images/og/',
  }),
};

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'Eluu' },
  },
  collections: {
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        ...seo,
        author: fields.text({ label: 'Author', validation: { isRequired: true } }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        content: fields.mdx({ label: 'Content' }),
      },
    }),

    research: collection({
      label: 'Research',
      slugField: 'title',
      path: 'src/content/research/*',
      format: { contentField: 'content' },
      schema: {
        ...seo,
        authors: fields.array(fields.text({ label: 'Author' }), {
          label: 'Authors',
          itemLabel: (props) => props.value,
        }),
        pdf: fields.file({
          label: 'PDF',
          directory: 'public/files/research',
          publicPath: '/files/research/',
        }),
        content: fields.mdx({ label: 'Content' }),
      },
    }),

    cookbook: collection({
      label: 'Cookbook',
      slugField: 'title',
      path: 'src/content/cookbook/*',
      format: { contentField: 'content' },
      schema: {
        ...seo,
        colleague: fields.text({ label: 'Colleague' }),
        integrations: fields.array(fields.text({ label: 'Integration' }), {
          label: 'Integrations',
          itemLabel: (props) => props.value,
        }),
        difficulty: fields.select({
          label: 'Difficulty',
          options: [
            { label: 'Starter', value: 'starter' },
            { label: 'Intermediate', value: 'intermediate' },
            { label: 'Advanced', value: 'advanced' },
          ],
          defaultValue: 'starter',
        }),
        content: fields.mdx({ label: 'Content' }),
      },
    }),

    useCases: collection({
      label: 'Use cases',
      slugField: 'title',
      path: 'src/content/use-cases/*',
      format: { contentField: 'content' },
      schema: {
        ...seo,
        eyebrow: fields.text({ label: 'Eyebrow' }),
        persona: fields.text({ label: 'Persona' }),
        content: fields.mdx({ label: 'Content' }),
      },
    }),

    compare: collection({
      label: 'Compare',
      slugField: 'title',
      path: 'src/content/compare/*',
      format: { contentField: 'content' },
      schema: {
        ...seo,
        competitor: fields.text({ label: 'Competitor', validation: { isRequired: true } }),
        rows: fields.array(
          fields.object({
            label: fields.text({ label: 'Row label' }),
            eluu: fields.text({ label: 'Eluu', multiline: true }),
            them: fields.text({ label: 'Them', multiline: true }),
          }),
          { label: 'Comparison rows', itemLabel: (props) => props.fields.label.value },
        ),
        content: fields.mdx({ label: 'Content' }),
      },
    }),
  },
});
