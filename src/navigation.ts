import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Inicio', href: getPermalink('/') },
    { text: 'Bitácora', href: getBlogPermalink() },
    { text: 'Antonov', href: getPermalink('/antonov') },
    { text: 'El manifiesto', href: getPermalink('/elmanifiesto') },
  ],
  actions: [], // Lo dejamos vacío para evitar el error de TypeScript que vimos antes
};

// ESTO ES LO QUE FALTA O ESTÁ MAL:
export const footerData = {
  links: [],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/arthelokyo' },
  ],
  footNote: `© 2026 El Universo de la Mente · Todos los derechos reservados.`,
};
