import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Inicio', href: getPermalink('/') },
    { text: 'Bitácora', href: getBlogPermalink() },
    { text: 'Antonov', href: getPermalink('/antonov') },
    { text: 'El manifiesto', href: getPermalink('/elmanifiesto') },
  ],
  actions: [], // Aquí ya eliminamos botones de "Download" o "Get Started"
};

export const footerData = {
  links: [],
  secondaryLinks: [],
  socialLinks: [], // <-- Simplemente deja esto vacío
  footNote: `© 2026 E.U.L.M · El Universo de la Mente`,
};