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
      href: getPermalink('/antonov'), // Sin la propiedad 'links' para que sea un botón directo
    },
          text: 'Herramientas de Mente',
          href: getPermalink('/antonov'),
        },
        // Aquí puedes añadir más herramientas luego
      ],
    },
    {
      text: 'Sobre el Universo',
      href: getPermalink('/about'),
    },
  ],
  actions: [{ text: 'Suscribirse', href: '#', variant: 'primary' }],
};

export const footerData = {
  links: [], // Limpiamos los links aburridos del footer
  secondaryLinks: [
    { text: 'Términos', href: getPermalink('/terms') },
    { text: 'Privacidad', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/tu-usuario' },
  ],
  footNote: `
    © 2026 El Universo de la Mente · Todos los derechos reservados.
  `,
};
