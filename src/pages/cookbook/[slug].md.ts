import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

/**
 * The machine-readable recipe overview. The short copy-prompt tells the agent
 * to FETCH this URL; the real payload is skill.md (the recipe as an importable
 * skill) plus the jobs-setup files — every link below is a real URL.
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

  L.push('## How to install', '');
  L.push(`1. Fetch ${BASE}/cookbook/${slug}/skill.md and save it into your skills folder as \`${slug}\`.`);
  L.push('2. Ask the user the first-run questions the skill lists, and store the answers in memory.');
  if (d.jobs.length)
    L.push('3. Offer to schedule the recurring jobs below; create only the ones the user approves.');
  L.push(`${d.jobs.length ? 4 : 3}. Run the skill once end to end and review the output with the user.`, '');

  if (d.whatItDoes.length) {
    L.push('## What this does', '');
    d.whatItDoes.forEach((x: string) => L.push(`- ${x}`));
    L.push('');
  }
  if (d.jobs.length) {
    L.push('## Recurring jobs', '');
    d.jobs.forEach((j: any) =>
      L.push(`- **${j.name}** (${j.cadence}) — ${BASE}/cookbook/${slug}/jobs-setup/${kebab(j.name)}.md`),
    );
    L.push('');
  }
  if (d.skills.length) {
    L.push('## Skills inside', '');
    L.push('The full method, including each of these, is in skill.md. Individually fetchable:', '');
    d.skills.forEach((s: any) =>
      L.push(
        `- **${s.name}**${s.description ? `, ${s.description}` : ''} — ${BASE}/cookbook/${slug}/skills/${kebab(s.name)}.md`,
      ),
    );
    L.push('');
  }

  // The sub-files the agent can fetch on demand — every one is a real URL.
  L.push('## Files', '');
  L.push(`- skill.md — ${BASE}/cookbook/${slug}/skill.md`);
  d.jobs.forEach((j: any) =>
    L.push(`- jobs-setup/${kebab(j.name)}.md — ${BASE}/cookbook/${slug}/jobs-setup/${kebab(j.name)}.md`),
  );
  d.skills.forEach((s: any) => L.push(`- skills/${kebab(s.name)}.md — ${BASE}/cookbook/${slug}/skills/${kebab(s.name)}.md`));
  L.push(`- workflow.json — ${BASE}/cookbook/${slug}/workflow.json`);
  L.push('');

  return new Response(L.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
