import type {Metadata} from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css'; 

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Santa Bronx Ops',
  description: 'Dashboard de gerenciamento operacional e financeiro da Santa Bronx.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} dark`}>
      <body className="bg-neutral-950 text-neutral-100 font-sans antialiased selection:bg-neutral-800 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
