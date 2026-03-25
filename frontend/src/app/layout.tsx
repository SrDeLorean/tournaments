import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/shared/ThemeProvider" // <--- Importamos nuestro ThemeProvider

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TourneyOS - Plataforma de Esports de Élite",
  description: "Organiza y compite en torneos de primer nivel. Gestión profesional para clubes y jugadores.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <--- IMPORTANTE: Asegúrate de que el html tenga esta estructura:
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class" // <--- Le dice a next-themes que use clases (como .dark)
          defaultTheme="system" // <--- Respeta el tema del sistema operativo (Windows/Android)
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}