"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, Plus, Minus } from "lucide-react"
import Image from "next/image"
import { ProductReviews } from "@/components/product-reviews"
import { RelatedProducts } from "@/components/related-products"

// Sample product data - in a real app, this would come from an API
const products = [
  {
    id: "1",
    name: "Macallan 18 Anos",
    origin: "Escócia",
    type: "Single Malt Whisky",
    notes: ["Amadeirado", "Frutado", "Baunilha"],
    description:
      "O Macallan 18 Anos é um whisky single malt excepcional, envelhecido em barris de carvalho espanhol que anteriormente continham xerez. Apresenta notas complexas de frutas maduras, especiarias, chocolate e um toque de fumo. O paladar é rico e equilibrado, com um final longo e satisfatório.",
    details: {
      age: "18 anos",
      abv: "43%",
      volume: "700ml",
      region: "Speyside, Escócia",
      caskType: "Barris de Xerez Oloroso",
      color: "Âmbar escuro",
    },
    price: 1290,
    rating: 4.9,
    reviewCount: 124,
    images: ["/images/whisky.png", "/images/whisky-detail1.png", "/images/whisky-detail2.png"],
    category: "whisky",
    stock: 15,
    featured: true,
  },
  {
    id: "2",
    name: "Cohiba Behike",
    origin: "Cuba",
    type: "Charuto Premium",
    notes: ["Terroso", "Apimentado", "Amadeirado"],
    description:
      "O Cohiba Behike é considerado um dos charutos mais exclusivos e refinados do mundo. Produzido em Cuba com as melhores folhas de tabaco, apresenta uma complexidade de sabores que inclui notas de terra, especiarias, madeira e um toque adocicado. A construção impecável garante uma queima uniforme e uma experiência de fumo excepcional.",
    details: {
      length: "15,2 cm",
      ringGauge: "52",
      strength: "Médio-forte",
      origin: "Cuba",
      wrapper: "Folha de tabaco cubano selecionada",
      presentation: "Caixa de cedro com 10 unidades",
    },
    price: 450,
    rating: 4.8,
    reviewCount: 86,
    images: ["/images/cigar1.png", "/images/cigar-detail1.png", "/images/cigar-detail2.png"],
    category: "charutos",
    stock: 8,
    featured: true,
  },
  {
    id: "3",
    name: "Château Margaux 2015",
    origin: "França",
    type: "Vinho Tinto",
    notes: ["Frutado", "Floral", "Taninos macios"],
    description:
      "O Château Margaux 2015 é um vinho excepcional de Bordeaux, considerado uma das melhores safras recentes. Este Premier Grand Cru Classé apresenta aromas intensos de frutas negras, violetas e especiarias, com toques de cedro e tabaco. No paladar, é elegante e complexo, com taninos sedosos e um final persistente que revela camadas de sabores.",
    details: {
      vintage: "2015",
      region: "Margaux, Bordeaux, França",
      grapes: "Cabernet Sauvignon, Merlot, Petit Verdot, Cabernet Franc",
      abv: "13,5%",
      volume: "750ml",
      aging: "24 meses em barris de carvalho francês",
    },
    price: 890,
    rating: 4.7,
    reviewCount: 92,
    images: ["/images/wine.png", "/images/wine-detail1.png", "/images/wine-detail2.png"],
    category: "vinhos",
    stock: 12,
    featured: true,
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [cartCount, setCartCount] = useState(0)

  // Find the product by ID
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white">
        <h1 className="mb-4 text-2xl font-bold">Produto não encontrado</h1>
        <Button onClick={() => router.push("/home")}>Voltar para o catálogo</Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    setCartCount((prev) => prev + quantity)
    // In a real app, you would add the product to the cart state or context
    console.log(`Added ${quantity} of ${product.name} to cart`)
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <MainNav cartCount={cartCount} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            className="mb-4 flex items-center text-gray-600 hover:text-[#CBA135]"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <Image
                  src={product.images[activeImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative h-20 w-20 overflow-hidden rounded-md border ${
                      activeImageIndex === index ? "border-[#CBA135]" : "border-gray-200"
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - imagem ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col space-y-4">
              <div>
                <div className="mb-1 flex items-center">
                  <Badge className="bg-gray-100 text-gray-600">{product.type}</Badge>
                  <span className="ml-2 text-sm text-gray-500">Origem: {product.origin}</span>
                </div>
                <h1 className="font-cinzel text-3xl font-bold text-gray-800">{product.name}</h1>

                <div className="mt-2 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-[#CBA135] text-[#CBA135]" : "fill-gray-200 text-gray-200"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {product.rating} ({product.reviewCount} avaliações)
                  </span>
                </div>

                <div className="mt-4 font-cinzel text-3xl font-bold text-[#CBA135]">{formatPrice(product.price)}</div>

                <div className="mt-2 text-sm text-gray-500">
                  {product.stock > 10 ? (
                    <span className="text-green-600">Em estoque</span>
                  ) : product.stock > 0 ? (
                    <span className="text-amber-600">Apenas {product.stock} em estoque</span>
                  ) : (
                    <span className="text-red-600">Fora de estoque</span>
                  )}
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {product.notes.map((note, index) => (
                    <Badge key={index} variant="outline" className="border-[#CBA135]/30 bg-[#CBA135]/10 text-[#CBA135]">
                      {note}
                    </Badge>
                  ))}
                </div>

                <p className="text-gray-700">{product.description}</p>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center rounded-md border border-gray-200">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-none text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="flex h-10 w-12 items-center justify-center text-sm font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-none text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    className="flex-1 bg-[#CBA135] text-white hover:bg-[#CBA135]/90"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Adicionar ao Carrinho
                  </Button>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-gray-200">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-gray-200">
                    <Share2 className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="details" className="mt-12">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100">
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            <TabsTrigger value="shipping">Envio</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {Object.entries(product.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-gray-100 py-2">
                      <span className="font-medium capitalize text-gray-600">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <ProductReviews productId={product.id} rating={product.rating} reviewCount={product.reviewCount} />
          </TabsContent>
          <TabsContent value="shipping" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Informações de Envio</h3>
                    <p className="text-gray-600">
                      Entregamos para todo o Brasil. O prazo de entrega varia de acordo com a sua localização.
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-2 font-medium">Prazos estimados:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex justify-between">
                        <span>Capitais</span>
                        <span>2-3 dias úteis</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Regiões metropolitanas</span>
                        <span>3-4 dias úteis</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Demais localidades</span>
                        <span>4-7 dias úteis</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 font-medium">Frete grátis:</h4>
                    <p className="text-gray-600">Para compras acima de R$1.000,00 em todo o Brasil.</p>
                  </div>

                  <div>
                    <h4 className="mb-2 font-medium">Embalagem especial:</h4>
                    <p className="text-gray-600">
                      Todos os nossos produtos são enviados em embalagens especiais que garantem a integridade durante o
                      transporte.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-16">
          <h2 className="mb-6 font-cinzel text-2xl font-bold text-gray-800">Produtos Relacionados</h2>
          <RelatedProducts currentProductId={product.id} category={product.category} />
        </div>
      </main>
    </div>
  )
}
