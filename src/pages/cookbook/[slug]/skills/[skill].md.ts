import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

const kebab = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/** One markdown file per skill, so the file-tree URLs actually resolve. */
export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection('cookbook', ({ data }) => !data.draft);
  const paths: { params: { slug: string; skill: string }; props: any }[] = [];
  for (const e of entries)
    for (const sk of e.data.skills)
      paths.push({ params: { slug: e.id, skill: kebab(sk.name) }, props: { recipe: e.data.title, skill: sk } });
  return paths;
};

export const GET: APIRoute = ({ props }) => {
  const { recipe, skill } = props as any;
  const md =
    `# ${skill.name}\n\n` +
    `A reusable skill the "${recipe}" recipe pulls in. Add it once and every agent on the team can use it.\n\n` +
    (skill.body
      ? `${skill.body.trim()}\n`
      : skill.description
        ? `${skill.description}\n`
        : '');
  return new Response(md, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
