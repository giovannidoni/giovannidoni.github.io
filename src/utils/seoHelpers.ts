export const generateMetaTags = (
  title: string,
  description: string,
  path: string = ""
) => ({
  title,
  description,
  canonical: `https://giovannidoni.github.io${path}`,
  openGraph: {
    title,
    description,
    url: `https://giovannidoni.github.io${path}`,
    site_name: "Giovanni Doni Portfolio",
    images: [
      {
        url: "https://giovannidoni.github.io/assets/6069157c-16af-41e6-a698-637aa684d8eb.webp",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      "https://giovannidoni.github.io/assets/6069157c-16af-41e6-a698-637aa684d8eb.webp",
    ],
    creator: "@back_slash_n",
  },
});

export const imageOptimizationProps = {
  loading: 'lazy' as const,
  decoding: 'async' as const,
};