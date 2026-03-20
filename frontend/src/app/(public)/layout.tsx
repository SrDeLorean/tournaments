// src/app/(public)/layout.tsx
import { PublicNavbar } from "@/components/shared/PublicNavbar"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      
      {/* NAVBAR */}
      <PublicNavbar />

      {/* MAIN */}
      <main className="flex-1 pt-[88px] md:pt-[96px]">
        {children}
      </main>

      {/* OPCIONAL: FOOTER FUTURO */}
      {/* <PublicFooter /> */}
    </div>
  )
}