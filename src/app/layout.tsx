// src/app/layout.tsx
import localFont from 'next/font/local'
import { Metadata } from 'next';
import './globals.css'
import Head from 'next/head'

const dejaVuSerif = localFont({
  src: [
    {
      path: '../../public/fonts/DejaVuSerif.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/DejaVuSerif-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/DejaVuSerif-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/DejaVuSerif-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-dejavu',
})

const dejaVuCondensed = localFont({
  src: [
    {
      path: '../../public/fonts/DejaVuSerifCondensed.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/DejaVuSerifCondensed-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/DejaVuSerifCondensed-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/DejaVuSerifCondensed-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-dejavu-condensed',
})

const EBGaramond = localFont({
  src: [
    // Regular
    {
      path: '../../public/fonts/EBGaramond-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    // Italic
    {
      path: '../../public/fonts/EBGaramond-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    // Medium
    {
      path: '../../public/fonts/EBGaramond-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    // Medium Italic
    {
      path: '../../public/fonts/EBGaramond-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    // SemiBold
    {
      path: '../../public/fonts/EBGaramond-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    // SemiBold Italic
    {
      path: '../../public/fonts/EBGaramond-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    // Bold
    {
      path: '../../public/fonts/EBGaramond-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    // Bold Italic
    {
      path: '../../public/fonts/EBGaramond-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    // ExtraBold (if supported by your design)
    {
      path: '../../public/fonts/EBGaramond-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-eb-garamond',
  display: 'swap',
});

const Lexend = localFont({
  src: [
    { path: '../../public/fonts/Lexend-Thin.ttf', weight: '100', style: 'normal' },
    { path: '../../public/fonts/Lexend-ExtraLight.ttf', weight: '200', style: 'normal' },
    { path: '../../public/fonts/Lexend-Light.ttf', weight: '300', style: 'normal' },
    { path: '../../public/fonts/Lexend-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Lexend-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/Lexend-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/Lexend-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../../public/fonts/Lexend-ExtraBold.ttf', weight: '800', style: 'normal' },
    { path: '../../public/fonts/Lexend-Black.ttf', weight: '900', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-lexend', 
});

export const metadata: Metadata = {
  title: {
    default: 'Oceanblu',
    template: '%s | Oceanblu'
  },
  description: "Ocean Conservation and Restoration Non-Profit Organization",
  keywords: ['ocean restoration', 
    'ocean', 'nature', 'marine', 'sea', 'animals', 'coral', 
    'reefs', 'coral reefs', 'marine biodiversity', 'biome', 'aquatic', 'conservation', 'sustainability', 'environment',
    'Indian Ocean', 'ocean conservation',
    'ecosystem', 'marine life', 'oceanblu'],
  authors: [{ name: 'Oceanblu' }],
  openGraph: {
    title: 'Oceanblu',
    description: "Let's save our Ocean!",
    url: 'https://oceanblu.vercel.app',
    siteName: 'Oceanblu',
    images: [
      {
        url: '/logo.webp', // Taruh foto di folder public
        width: 1200,
        height: 630,
      },
    ],
    locale: 'au_AUS',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="id" 
      className={`${dejaVuSerif.variable} 
        ${dejaVuCondensed.variable} 
        ${EBGaramond.variable} 
        ${Lexend.variable}`}
      suppressHydrationWarning
    >
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  var theme = saved || (supportDarkMode ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </Head>
      <body>{children}</body>
    </html>
  )
}