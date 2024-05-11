import '@/app/ui/global.css';
import * as Window from '@/app/ui/Window/window';
import { inter } from '@/app/ui/font';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Window.Root />
      </body>
    </html>
  );
}
