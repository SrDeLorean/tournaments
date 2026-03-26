import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/shared/ThemeProvider"

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
    <html lang="es" suppressHydrationWarning>
      {/* Eliminamos 'inter.className'. Nuestro globals.css ya asigna Barlow y Bebas Neue */}
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}