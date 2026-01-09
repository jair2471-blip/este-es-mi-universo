---
import Layout from '~/layouts/PageLayout.astro';
import Hero from '~/components/widgets/Hero.astro';
import Content from '~/components/widgets/Content.astro';

const metadata = {
  title: 'El Manifiesto | El Universo de la Mente',
};
---

<Layout metadata={metadata}>
  <Hero
    tagline="Nuestra declaración de guerra"
    title="EL MANIFIESTO"
    subtitle="Si esperabas palmaditas en la espalda, estás en el hangar equivocado."
  />

  <Content
    isReversed
    title="La Ley del Boomerang"
    items={[
      {
        title: 'Causa y Efecto',
        description: 'No es mala suerte, es la cosecha de lo que sembraste ayer. Aquí aprendemos a sembrar con intención.',
      },
      {
        title: 'Honestidad de Acero',
        description: 'El espejo no miente, el que miente es el que se mira. Rompemos el cristal para ver la realidad.',
      },
      {
        title: 'Carga Pesada',
        description: 'Como un Antonov, estamos diseñados para llevar la carga que otros no pueden. Responsabilidad total.',
      },
    ]}
    image={{
      src: 'https://images.unsplash.com/photo-1494173853114-8a5146813805?q=80&w=1200&auto=format&fit=crop',
      alt: 'Determinación mental',
    }}
  >
    <Fragment slot="content">
      <h3 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">¿Por qué estamos aquí?</h3>
      Este no es un blog de psicología de salón. Es un espacio para los que entienden que el universo mental es vasto, peligroso y fascinante. Aquí el piloto eres tú.
    </Fragment>
  </Content>
</Layout>
