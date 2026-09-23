import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

/** The workflow steps as JSON, so the file-tree `workflow.json` URL resolves. */
export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection('cookbook', ({ data }) => !data.draft);
  return entries.map((e) => ({ params: { slug: e.id }, props: { workflow: e.data.workflow } }));
};

export const GET: APIRoute = ({ props }) =>
  new Response(JSON.stringify((props as any).workflow, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
