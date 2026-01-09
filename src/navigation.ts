import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Inicio',
      href: getPermalink('/'),
    },
    {
      text: 'Bitácora',
      href: getBlogPermalink(),
    },
    {
      text: 'Antonov',
      href: getPermalink('/antonov'),
    },
    {
      text: 'Elmanifiesto',
      href: getPermalink('/about'),
    },
  ],
  actions: [{ text: 'Suscribirse', href: '#', variant: 'primary' }],
};

export const footerData = {
  links: [],
  secondaryLinks: [
    { text: 'Términos', href: getPermalink('/terms') },
    { text: 'Privacidad', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/arthelokyo' },
  ],
  footNote: `
    © 2026 El Universo de la Mente · Todos los derechos reservados.
  `,
};
