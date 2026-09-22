/**
 * Private-beta waitlist configuration.
 *
 * Every "join the waitlist" surface on the site reads from here, so the survey
 * id, the copy and the Typeform live in exactly one place.
 */

/**
 * The href every waitlist CTA points at.
 *
 * It is an anchor rather than a route on purpose: a global delegated click
 * handler in WaitlistModal.astro intercepts any `<a href="#waitlist">` and
 * opens the dialog instead of navigating. That means an MDX page can opt a CTA
 * into the modal by setting `href: '#waitlist'` in its frontmatter, with no
 * component change and no React island.
 */
export const WAITLIST_HREF = '#waitlist';

/** Krishna's cal.com link. `/demo` is a 302 to it, so both stay in step. */
export const DEMO_HREF = '/demo';

/** Labels, so a copy change lands everywhere at once. */
export const WAITLIST_LABEL = 'Join waitlist';
export const DEMO_LABEL = 'Book a demo';

/**
 * PostHog capture, via our own /ingest proxy (functions/ingest/[[path]].js).
 *
 * The project token is a PUBLIC write-only key — it is designed to ship in
 * client code and cannot read data back. It is not a secret.
 */
export const POSTHOG_KEY = 'phc_8iOFbUEdwxBaOjupzcOil97Rrf1c2n0P9qAJfmmPpEO';
export const POSTHOG_INGEST_PATH = '/ingest';

/**
 * Survey "Early access waitlist" (project 350411), type `api` — headless, so
 * the site renders its own modal and posts the response itself rather than
 * loading posthog-js and letting it draw a popover.
 * https://us.posthog.com/project/350411/surveys/01a0c601-c015-0000-551a-c7edf705f4cd
 */
export const SURVEY_ID = '01a0c601-c015-0000-551a-c7edf705f4cd';
export const SURVEY_QUESTION_ID = '2f944a79-81e2-4b8b-8968-9e092e6b0fe6';

/**
 * Typeform that collects the use case, so a signup can be onboarded ahead of
 * the queue. Set this to the form id only (the part after /to/ in the share
 * URL, e.g. `AbCdEfGh`).
 *
 * PENDING KRISHNA — while this is empty the modal's success state degrades to
 * the confirmation alone. Nothing renders broken, we simply lose the faster
 * onboarding path until the id lands here.
 */
export const TYPEFORM_ID = '';
