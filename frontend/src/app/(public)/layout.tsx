// src/app/(public)/layout.tsx
import { PublicNavbar } from "@/components/shared/PublicNavbar"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative">
      
      <PublicNavbar />
      
      <main className="relative z-10 flex-1">
        {children}
      </main>
      
    </div>
  )
}