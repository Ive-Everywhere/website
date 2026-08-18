import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

const kebab = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/** One markdown file per prompt/shell workflow step. */
export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection('cookbook', ({ data }) => !data.draft);
  const paths: { params: { slug: string; step: string }; props: any }[] = [];
  for (const e of entries)
    for (const step of e.data.workflow.filter((s: any) => s.kind === 'prompt' || s.kind === 'shell'))
      paths.push({ params: { slug: e.id, step: kebab(step.title) }, props: { step } });
  return paths;
};

export const GET: APIRoute = ({ props }) => {
  const { step } = props as any;
  const md = `# ${step.title}\n\n${step.body ? step.body + '\n' : ''}`;
  return new Response(md, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
