"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ShoppingCart, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface RelatedProductsProps {
  currentProductId: string
  category: string
}

// Sample related products data
const relatedProductsData = [
  {
    id: "4",
    name: "Lagavulin 16 Anos",
    type: "Single Malt Whisky",
    origin: "Escócia",
    price: 890,
    rating: 4.7,
    reviewCount: 98,
    image: "/images/whisky-related1.png",
    category: "whisky",
  },
  {
    id: "5",
    name: "Glenfiddich 18 Anos",
    type: "Single Malt Whisky",
    origin: "Escócia",
    price: 750,
    rating: 4.6,
    reviewCount: 112,
    image: "/images/whisky-related2.png",
    category: "whisky",
  },
  {
    id: "6",
    name: "Montecristo No. 2",
    type: "Charuto Premium",
    origin: "Cuba",
    price: 320,
    rating: 4.8,
    reviewCount: 76,
    image: "/images/cigar-related1.png",
    category: "charutos",
  },
  {
    id: "7",
    name: "Opus X",
    type: "Charuto Premium",
    origin: "República Dominicana",
    price: 380,
    rating: 4.9,
    reviewCount: 64,
    image: "/images/cigar-related2.png",
    category: "charutos",
  },
  {
    id: "8",
    name: "Château Lafite Rothschild 2010",
    type: "Vinho Tinto",
    origin: "França",
    price: 1200,
    rating: 4.9,
    reviewCount: 87,
    image: "/images/wine-related1.png",
    category: "vinhos",
  },
  {
    id: "9",
    name: "Sassicaia 2018",
    type: "Vinho Tinto",
    origin: "Itália",
    price: 680,
    rating: 4.7,
    reviewCount: 72,
    image: "/images/wine-related2.png",
    category: "vinhos",
  },
]

export function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const [cartCount, setCartCount] = useState(0)

  // Filter related products by category and exclude current product
  const relatedProducts = relatedProductsData
    .filter((product) => product.category === category && product.id !== currentProductId)
    .slice(0, 4) // Limit to 4 products

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {relatedProducts.map((product) => (
        <motion.div
          key={product.id}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <Card className="overflow-hidden border border-gray-200 bg-white shadow-sm">
            <Link href={`/product/${product.id}`}>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
            </Link>

            <CardContent className="p-4">
              <div className="mb-1 flex items-center justify-between">
                <Badge className="bg-gray-100 text-xs text-gray-600">{product.type}</Badge>
                <div className="flex items-center">
                  <Star className="h-3 w-3 fill-[#CBA135] text-[#CBA135]" />
                  <span className="ml-1 text-xs text-gray-500">{product.rating}</span>
                </div>
              </div>

              <Link href={`/product/${product.id}`} className="group">
                <h3 className="mb-1 font-cinzel text-base font-semibold text-gray-800 group-hover:text-[#CBA135]">
                  {product.name}
                </h3>
              </Link>

              <div className="mb-3 text-xs text-gray-500">{product.origin}</div>

              <div className="flex items-center justify-between">
                <div className="font-cinzel text-lg font-bold text-[#CBA135]">{formatPrice(product.price)}</div>
                <Button
                  size="sm"
                  className="h-8 w-8 rounded-full bg-[#7B2E2E] p-0 text-white hover:bg-[#7B2E2E]/80"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
