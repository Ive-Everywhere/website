import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

const kebab = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/**
 * One markdown file per recurring job a recipe wants scheduled. The agent
 * reads this to create the job: the cadence, and a self-contained prompt —
 * fired runs are fresh sessions with no conversation context, so the prompt
 * carries everything and leans on the saved skill.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection('cookbook', ({ data }) => !data.draft);
  const paths: { params: { slug: string; job: string }; props: any }[] = [];
  for (const e of entries)
    for (const job of e.data.jobs)
      paths.push({ params: { slug: e.id, job: kebab(job.name) }, props: { recipe: e.data.title, slug: e.id, job } });
  return paths;
};

export const GET: APIRoute = ({ props }) => {
  const { recipe, slug, job } = props as any;
  const L: string[] = [];
  L.push(`# ${job.name}`, '');
  L.push(`A recurring job for the "${recipe}" recipe. Set it up only after the user approves it.`, '');
  L.push(`**Cadence:** ${job.cadence}`, '');
  L.push('**Job prompt** (each fired run is a fresh session — schedule this verbatim):', '');
  L.push('```');
  L.push(job.prompt.trim());
  L.push('```', '');
  L.push(`The prompt assumes the \`${slug}\` skill is saved in the agent's skills folder and its first-run answers are in memory.`);
  return new Response(L.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
