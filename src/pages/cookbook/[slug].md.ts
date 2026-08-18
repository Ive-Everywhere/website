import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

/**
 * The machine-readable recipe. The short copy-prompt tells the agent to FETCH
 * this URL, so `/cookbook/<slug>.md` returns the full workflow, skills, and
 * prompts as plain markdown for the agent to read and execute.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection('cookbook', ({ data }) => !data.draft);
  return entries.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
};

const kebab = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const BASE = 'https://eluu.ai';

export const GET: APIRoute = ({ props }) => {
  const { data: d, id: slug } = (props as any).entry;
  const L: string[] = [];
  L.push(`# ${d.title}`, '', d.description, '');
  if (d.integrations.length) L.push(`**Connects:** ${d.integrations.join(', ')}`, '');
  if (d.whatItDoes.length) {
    L.push('## What this does', '');
    d.whatItDoes.forEach((x: string) => L.push(`- ${x}`));
    L.push('');
  }
  if (d.workflow.length) {
    L.push('## Workflow', '');
    d.workflow.forEach((s: any, i: number) =>
      L.push(`${i + 1}. **[${s.kind}] ${s.title}**${s.body ? `, ${s.body}` : ''}`),
    );
    L.push('');
  }
  if (d.skills.length) {
    L.push('## Recommended skills', '');
    d.skills.forEach((s: any) =>
      L.push(
        `- **${s.name}**${s.description ? `, ${s.description}` : ''} — ${BASE}/cookbook/${slug}/skills/${kebab(s.name)}.md`,
      ),
    );
    L.push('');
  }
  if (d.prompt) L.push('## Prompt', '', '```', d.prompt.trim(), '```', '');

  // The sub-files the agent can fetch on demand — every one is a real URL.
  L.push('## Files', '');
  L.push(`- workflow.json — ${BASE}/cookbook/${slug}/workflow.json`);
  d.skills.forEach((s: any) => L.push(`- skills/${kebab(s.name)}.md — ${BASE}/cookbook/${slug}/skills/${kebab(s.name)}.md`));
  d.workflow
    .filter((s: any) => s.kind === 'prompt' || s.kind === 'shell')
    .forEach((s: any) => L.push(`- prompts/${kebab(s.title)}.md — ${BASE}/cookbook/${slug}/prompts/${kebab(s.title)}.md`));
  L.push('');

  return new Response(L.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
