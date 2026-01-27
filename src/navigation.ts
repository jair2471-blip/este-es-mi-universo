export const headerData = {
  links: [
    {
      text: 'Inicio',
      href: '/',
    },
    {
      text: 'Bitácora',
      href: '/post', // <--- Ruta directa al listado de artículos
    },
    {
      text: 'Antonov',
      href: '/antonov',
    },
    {
      text: 'Herramientas',
      links: [
        {
          text: 'Contador de Vida',
          href: '/contadordevida',
        },
        {
          text: 'Compromisos',
          href: '/generador-compromisos',
        },
        {
          text: 'Oráculo de Hierro',
          href: '/oraculo',
        },
        {
          text: 'Portal Cósmico', // Añadí tu nuevo generador aquí
          href: '/portal',
        },
      ],
    },
    {
      text: 'El Manifiesto',
      href: '/elmanifiesto',
    },
  ],
  actions: [],
};

export const footerData = {
  links: [],
  secondaryLinks: [],
  socialLinks: [],
  footNote: `© 2026 E.U.L.M · El Universo de la Mente`,
};