import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

const kebab = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const BASE = 'https://eluu.ai';

/**
 * The recipe AS a skill, in standard skill format: YAML frontmatter with a
 * name and a use-when description, then the full method. The copy-prompt tells
 * the agent to save this file into its skills folder, so the skill fires
 * whenever the trigger condition comes up — not just when the user pastes the
 * recipe again.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection('cookbook', ({ data }) => !data.draft);
  return entries.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
};

export const GET: APIRoute = ({ props }) => {
  const { data: d, id: slug } = (props as any).entry;
  const trigger = d.workflow.find((s: any) => s.kind === 'trigger');
  const useWhen = trigger
    ? `Use this skill when: ${trigger.title}${trigger.body ? ` — ${trigger.body}` : ''}`
    : `Use this skill when asked to ${d.goal || d.title.toLowerCase()}.`;

  const L: string[] = [];
  L.push('---');
  L.push(`name: ${slug}`);
  L.push(`description: ${d.description} ${useWhen}`);
  L.push('---');
  L.push('');
  L.push(`# ${d.title}`, '');
  if (d.goal) L.push(`Goal: ${d.goal}.`, '');
  if (d.integrations.length) L.push(`Connected tools this skill uses: ${d.integrations.join(', ')}.`, '');

  L.push('## When to use', '');
  L.push(`- ${useWhen.replace(/^Use this skill when: /, '')}`);
  if (d.goal) L.push(`- Or when the user asks directly to ${d.goal}.`);
  L.push('');

  if (d.prompt) {
    L.push('## Method', '');
    L.push(d.prompt.trim(), '');
  }

  for (const s of d.skills) {
    L.push(`## ${s.name}`, '');
    if (s.body) L.push(s.body.trim(), '');
    else if (s.description) L.push(`${s.description}.`, '');
  }

  if (d.jobs.length) {
    L.push('## Recurring jobs', '');
    L.push(
      'This skill pairs with scheduled jobs. Offer to set each one up; only create the ones the user approves:',
      '',
    );
    for (const j of d.jobs)
      L.push(`- ${j.name} (${j.cadence}) — ${BASE}/cookbook/${slug}/jobs-setup/${kebab(j.name)}.md`);
    L.push('');
  }

  return new Response(L.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
