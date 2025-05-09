"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ShoppingCart, MapPin } from "lucide-react"
import Link from "next/link"

interface Product {
  id: number
  name: string
  origin: string
  type: string
  notes: string
  price: number
  image: string
  category: string
}

interface ProductCardProps {
  product: Product
  onAddToCart: () => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden border border-gray-200 bg-white shadow-md">
        <Link href={`/product/${product.id}`}>
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 ease-out"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800/60 to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="font-cinzel text-xl font-bold text-white">{product.name}</h3>
              <div className="mt-1 flex items-center gap-1 text-sm text-white/70">
                <MapPin className="h-3 w-3" />
                <span>{product.origin}</span>
              </div>
            </div>
          </div>
        </Link>

        <CardContent className="p-4">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-600">{product.type}</div>
            <div className="flex flex-wrap gap-2">
              {product.notes.split(", ").map((note, index) => (
                <Badge key={index} variant="outline" className="border-[#CBA135]/30 bg-[#CBA135]/10 text-[#CBA135]">
                  {note}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-gray-200 p-4">
          <div className="font-cinzel text-xl font-bold text-[#CBA135]">{formatPrice(product.price)}</div>
          <Button size="sm" onClick={onAddToCart} className="bg-[#7B2E2E] text-white hover:bg-[#7B2E2E]/80">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
