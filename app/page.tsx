import { Building2, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mb-2 flex items-center gap-2">
            <Building2 className="size-6" aria-hidden="true" />
            <span className="font-semibold">ADRIZIO</span>
          </div>

          <CardTitle>Foundation ADRIZIO</CardTitle>

          <CardDescription>
            Next.js, TypeScript, Tailwind CSS, shadcn/ui e Lucide integrados.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button className="w-full">
            <Search aria-hidden="true" />
            Encontrar imóvel
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
