// /src/app/layout.tsx
import localFont from 'next/font/local'
import './globals.css'

const dejaVuSerif = localFont({
  src: [
    // Regular
    {
      path: '../fonts/DejaVuSerif.ttf',
      weight: '400',
      style: 'normal',
    },
    // Italic
    {
      path: '../fonts/DejaVuSerif-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    // Bold
    {
      path: '../fonts/DejaVuSerif-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    // Bold Italic
    {
      path: '../fonts/DejaVuSerif-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-dejavu',
})

const dejaVuCondensed = localFont({
  src: [
    // Condensed Regular
    {
      path: '../fonts/DejaVuSerifCondensed.ttf',
      weight: '400',
      style: 'normal',
    },
    // Condensed Italic
    {
      path: '../fonts/DejaVuSerifCondensed-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    // Condensed Bold
    {
      path: '../fonts/DejaVuSerifCondensed-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    // Condensed Bold Italic
    {
      path: '../fonts/DejaVuSerifCondensed-BoldItalic.ttf',
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