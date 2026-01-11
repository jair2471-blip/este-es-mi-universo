import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Inicio', href: getPermalink('/') },
    { text: 'Bitácora', href: getBlogPermalink() },
    { text: 'Antonov', href: getPermalink('/antonov') },
    { text: 'Contador de Vida', href: getPermalink('/contadordevida') },
    { text: 'El manifiesto', href: getPermalink('/elmanifiesto') },
  ],
  actions: [], 
};

export const footerData = {
  links: [],
  secondaryLinks: [],
  socialLinks: [], 
  footNote: `© 2026 E.U.L.M · El Universo de la Mente`,
};