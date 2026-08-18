import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

/**
 * The machine-readable recipe. The short copy-prompt tells the agent to FETCH
 * this URL — so `/cookbook/<slug>.md` returns the full workflow, skills, and
 * prompts as plain markdown for the agent to read and execute.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection('cookbook', ({ data }) => !data.draft);
  return entries.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
};

export const GET: APIRoute = ({ props }) => {
  const { data: d } = (props as any).entry;
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
      L.push(`${i + 1}. **[${s.kind}] ${s.title}**${s.body ? ` — ${s.body}` : ''}`),
    );
    L.push('');
  }
  if (d.skills.length) {
    L.push('## Recommended skills', '');
    d.skills.forEach((s: any) => L.push(`- **${s.name}**${s.description ? ` — ${s.description}` : ''}`));
    L.push('');
  }
  if (d.prompt) L.push('## Prompt', '', '```', d.prompt.trim(), '```', '');
  return new Response(L.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
