/**
 * Navigation model.
 *
 * The Figma nav (147:3071 / 144:2679 / 151:2679) is duplicated per page rather
 * than being a component, and it flags `Dropdown: true` on Platform, Use cases
 * and Resources without defining any menu contents. The menu contents below
 * come from the content pack's INDEX.md: the Platform menu is the four product
 * pillars, the Use cases menu is all eight use-case pages.
 */

export interface NavChild {
  label: string;
  href: string;
  description?: string;
  /** Remix Icon class shown beside the entry in the dropdown. */
  icon?: string;
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

export const primaryNav: NavItem[] = [
  {
    label: 'Platform',
    children: [
      { label: 'Agents', href: '/agents', description: 'A specialist for every role.', icon: 'ri-robot-3-line' },
      { label: 'Workspace', href: '/workspace', description: 'Run many agents in parallel.', icon: 'ri-folder-3-line' },
      { label: 'Connections', href: '/connections', description: 'Every tool your team uses.', icon: 'ri-plug-2-line' },
      { label: 'Security', href: '/security', description: 'Controls, limits and audit.', icon: 'ri-lock-2-line' },
    ],
  },
  {
    label: 'Use cases',
    children: [
      { label: 'Reconcile data across systems', href: '/use-cases/reconcile-data', icon: 'ri-arrow-left-right-line' },
      { label: 'Automate recurring reports', href: '/use-cases/recurring-reports', icon: 'ri-file-chart-line' },
      { label: 'Build internal apps', href: '/use-cases/build-apps', icon: 'ri-dashboard-line' },
      { label: 'Replace point SaaS', href: '/use-cases/replace-saas', icon: 'ri-exchange-box-line' },
      { label: 'Analyze data', href: '/use-cases/analyze-data', icon: 'ri-line-chart-line' },
      { label: 'Process documents', href: '/use-cases/process-documents', icon: 'ri-file-list-3-line' },
      { label: 'Connect AI to your stack', href: '/use-cases/connect-ai', icon: 'ri-plug-fill' },
      { label: 'Control AI cost', href: '/use-cases/ai-cost', icon: 'ri-money-dollar-circle-line' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: 'Blog', href: '/blog', icon: 'ri-article-line' },
      { label: 'Research', href: '/research', icon: 'ri-flask-line' },
      { label: 'Cookbook', href: '/cookbook', icon: 'ri-book-2-line' },
      { label: 'Compare', href: '/compare', icon: 'ri-scales-3-line' },
    ],
  },
  { label: 'Docs', href: '/docs' },
  { label: 'Pricing', href: '/pricing' },
];

/** Footer columns, transcribed verbatim from Figma `I…;15077`. */
export const footerColumns: { heading: string; links: NavChild[] }[] = [
  {
    heading: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Events', href: '/events' },
      { label: 'Product demos', href: '/demos' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Preferences', href: '/cookies' },
    ],
  },
];

export const socialLinks = [
  { label: 'Facebook', icon: 'ri-facebook-circle-fill', href: 'https://facebook.com/eluuai' },
  { label: 'Instagram', icon: 'ri-instagram-fill', href: 'https://instagram.com/eluuai' },
  { label: 'X', icon: 'ri-twitter-x-line', href: 'https://x.com/eluuai' },
];
