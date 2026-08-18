export interface NavChild {
  label: string;
  href: string;
  description?: string;
  icon?: string;
}
export interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

export const primaryNav: NavItem[] = [
  {
    label: 'Product',
    children: [
      { label: 'Agents', href: '/platform/agents', description: 'A specialist for every role.', icon: 'ri-robot-3-line' },
      { label: 'Workforce', href: '/platform/workforce', description: 'Scale the work, not the headcount.', icon: 'ri-stack-line' },
      { label: 'Security', href: '/platform/security', description: 'Access, limits, and audit.', icon: 'ri-lock-2-line' },
    ],
  },
  // { label: 'Apps', href: '/apps' },            // hidden pre-prod (Krishna)
  /* Solutions dropdown hidden pre-prod (Krishna):
  {
    label: 'Solutions',
    children: [
      { label: 'Finance', href: '/solutions/finance', description: 'Close the month while you sleep.', icon: 'ri-bank-line' },
      { label: 'Sales', href: '/solutions/sales', description: 'Keep the pipeline clean.', icon: 'ri-line-chart-line' },
      { label: 'Customer Engineering', href: '/solutions/customer-engineering', description: 'From incident to fix.', icon: 'ri-terminal-box-line' },
      { label: 'People', href: '/solutions/people', description: 'Hire without the busywork.', icon: 'ri-team-line' },
    ],
  },
  */
  { label: 'Cookbook', href: '/cookbook' },
  { label: 'Docs', href: 'https://docs.eluu.ai' },
  { label: 'Pricing', href: '/pricing' },
];

export const footerColumns: { heading: string; links: NavChild[] }[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Agents', href: '/platform/agents' },
      { label: 'Workforce', href: '/platform/workforce' },
      { label: 'Security', href: '/platform/security' },
      // { label: 'Apps', href: '/apps' },            // hidden pre-prod (Krishna)
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  /* Solutions footer column hidden pre-prod (Krishna):
  {
    heading: 'Solutions',
    links: [
      { label: 'Finance', href: '/solutions/finance' },
      { label: 'Sales', href: '/solutions/sales' },
      { label: 'Customer Engineering', href: '/solutions/customer-engineering' },
      { label: 'People', href: '/solutions/people' },
    ],
  },
  */
  /* Company column (About / Careers / Contact) removed pre-prod (Krishna,
   * 2026-08-18): the pages do not exist yet. Restore when the Modal-style
   * company page ships (about + careers + contact with #-anchors). */
  {
    heading: 'Legal',
    links: [
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Security Statement', href: '/security-statement' },
    ],
  },
];

export const socialLinks = [
  { label: 'Facebook', icon: 'ri-facebook-circle-fill', href: 'https://facebook.com/eluuai' },
  { label: 'Instagram', icon: 'ri-instagram-fill', href: 'https://instagram.com/eluuai' },
  { label: 'X', icon: 'ri-twitter-x-line', href: 'https://x.com/eluuai' },
];
