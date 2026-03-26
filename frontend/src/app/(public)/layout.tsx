// src/app/(public)/layout.tsx
import { PublicNavbar } from "@/components/shared/PublicNavbar"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    /* Solo necesitamos flex-col para que el footer (cuando lo haya) se quede abajo */
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      
      <PublicNavbar />
      
      <main className="flex-1 relative z-10 w-full">
        {children}
      </main>
      
    </div>
  )
}