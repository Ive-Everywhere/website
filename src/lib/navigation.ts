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
      { label: 'Agents', href: '/agents', description: 'A specialist for every role.', icon: 'ri-robot-3-line' },
      { label: 'Workforce', href: '/workforce', description: 'Scale the work, not the headcount.', icon: 'ri-stack-line' },
      { label: 'Security', href: '/security', description: 'Access, limits, and audit.', icon: 'ri-lock-2-line' },
    ],
  },
  { label: 'Apps', href: '/apps' },
  {
    label: 'Solutions',
    children: [
      { label: 'Finance', href: '/solutions/finance', description: 'Close the month while you sleep.', icon: 'ri-bank-line' },
      { label: 'Sales', href: '/solutions/sales', description: 'Keep the pipeline clean.', icon: 'ri-line-chart-line' },
      { label: 'Customer Engineering', href: '/solutions/customer-engineering', description: 'From incident to fix.', icon: 'ri-terminal-box-line' },
      { label: 'People', href: '/solutions/people', description: 'Hire without the busywork.', icon: 'ri-team-line' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: 'Blog', href: '/blog', icon: 'ri-article-line' },
      { label: 'Research', href: '/research', icon: 'ri-flask-line' },
      { label: 'Cookbook', href: '/cookbook', icon: 'ri-book-2-line' },
    ],
  },
  { label: 'Docs', href: '/docs' },
  { label: 'Pricing', href: '/pricing' },
];

export const footerColumns: { heading: string; links: NavChild[] }[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Agents', href: '/agents' },
      { label: 'Workforce', href: '/workforce' },
      { label: 'Security', href: '/security' },
      { label: 'Apps', href: '/apps' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'Finance', href: '/solutions/finance' },
      { label: 'Sales', href: '/solutions/sales' },
      { label: 'Customer Engineering', href: '/solutions/customer-engineering' },
      { label: 'People', href: '/solutions/people' },
    ],
  },
  {
    heading: 'Compare',
    links: [
      { label: 'vs ChatGPT', href: '/compare/chatgpt' },
      { label: 'vs Claude', href: '/compare/claude' },
      { label: 'vs Copilot', href: '/compare/copilot' },
      { label: 'vs Zapier', href: '/compare/zapier' },
      { label: 'vs building in-house', href: '/compare/building-in-house' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Cookie Preferences', href: '/cookies' },
    ],
  },
];

export const socialLinks = [
  { label: 'Facebook', icon: 'ri-facebook-circle-fill', href: 'https://facebook.com/eluuai' },
  { label: 'Instagram', icon: 'ri-instagram-fill', href: 'https://instagram.com/eluuai' },
  { label: 'X', icon: 'ri-twitter-x-line', href: 'https://x.com/eluuai' },
];
