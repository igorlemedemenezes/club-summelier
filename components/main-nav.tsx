"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface MainNavProps {
  cartCount?: number
}

export function MainNav({ cartCount = 0 }: MainNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/home" className="flex items-center">
            <div className="mr-2 h-8 w-8">
              <Image src="/images/logo.png" alt="Summelier Logo" width={32} height={32} />
            </div>
            <span className="font-cinzel text-xl font-bold text-[#CBA135]">SUMMELIER</span>
          </Link>

          <nav className="hidden md:flex md:items-center md:gap-6">
            <Link href="/home" className="text-sm font-medium text-gray-700 transition-colors hover:text-[#CBA135]">
              Catálogo
            </Link>
            <Link href="/plans" className="text-sm font-medium text-gray-700 transition-colors hover:text-[#CBA135]">
              Planos
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-700 transition-colors hover:text-[#CBA135]">
              Sobre
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/register">
            <Button
              variant="ghost"
              size="sm"
              className="hidden text-gray-700 hover:bg-gray-100 hover:text-[#CBA135] md:flex"
            >
              <User className="mr-2 h-4 w-4" />
              Cadastrar
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-700 hover:bg-gray-100 hover:text-[#CBA135]"
            onClick={() => router.push("/cart")}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#7B2E2E] text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Button>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5 text-gray-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-gray-200 bg-white p-0">
              <div className="flex flex-col gap-8 p-6">
                <Link
                  href="/home"
                  className="text-lg font-medium text-gray-700 transition-colors hover:text-[#CBA135]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Catálogo
                </Link>
                <Link
                  href="/plans"
                  className="text-lg font-medium text-gray-700 transition-colors hover:text-[#CBA135]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Planos
                </Link>
                <Link
                  href="#"
                  className="text-lg font-medium text-gray-700 transition-colors hover:text-[#CBA135]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sobre
                </Link>
                <Link
                  href="/register"
                  className="text-lg font-medium text-gray-700 transition-colors hover:text-[#CBA135]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cadastrar
                </Link>
                <Link
                  href="/cart"
                  className="text-lg font-medium text-gray-700 transition-colors hover:text-[#CBA135]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Carrinho {cartCount > 0 && `(${cartCount})`}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
