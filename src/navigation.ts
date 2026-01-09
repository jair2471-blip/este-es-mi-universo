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
      text: 'El manifiesto',
      href: getPermalink('/elmanifiesto'),
    },
  ],
  actions: [], // <--- Déjalo vacío un momento para que el build pase
};
