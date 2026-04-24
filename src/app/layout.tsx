// /src/app/layout.tsx
import localFont from 'next/font/local'
import './globals.css'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="id" 
      className={`${dejaVuSerif.variable} ${dejaVuCondensed.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}