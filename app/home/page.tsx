"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { CategoryFilter } from "@/components/category-filter"
import { MainNav } from "@/components/main-nav"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Image from "next/image"

// Sample product data
const products = [
  {
    id: 1,
    name: "Macallan 18 Anos",
    origin: "Escócia",
    type: "Single Malt Whisky",
    notes: "Amadeirado, Frutado",
    price: 1290,
    image: "/images/whisky.png",
    category: "whisky",
  },
  {
    id: 2,
    name: "Cohiba Behike",
    origin: "Cuba",
    type: "Charuto Premium",
    notes: "Terroso, Apimentado",
    price: 450,
    image: "/images/cigar1.png",
    category: "charutos",
  },
  {
    id: 3,
    name: "Château Margaux 2015",
    origin: "França",
    type: "Vinho Tinto",
    notes: "Frutado, Floral",
    price: 890,
    image: "/images/wine.png",
    category: "vinhos",
  },
  {
    id: 4,
    name: "Zacapa XO",
    origin: "Guatemala",
    type: "Rum Premium",
    notes: "Doce, Amadeirado",
    price: 590,
    image: "/images/rum.png",
    category: "rum",
  },
  {
    id: 5,
    name: "Westvleteren 12",
    origin: "Bélgica",
    type: "Cerveja Trapista",
    notes: "Maltado, Frutado",
    price: 120,
    image: "/images/beer.png",
    category: "cervejas",
  },
  {
    id: 6,
    name: "Davidoff Royal Release",
    origin: "República Dominicana",
    type: "Charuto Premium",
    notes: "Amadeirado, Defumado",
    price: 380,
    image: "/images/cigar2.png",
    category: "charutos",
  },
]

const categories = [
  { id: "all", name: "Todos" },
  { id: "charutos", name: "Charutos" },
  { id: "tabacos", name: "Tabacos Especiais" },
  { id: "whisky", name: "Whiskys" },
  { id: "vinhos", name: "Vinhos" },
  { id: "rum", name: "Rums" },
  { id: "cervejas", name: "Cervejas Artesanais" },
]

export default function HomePage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cartCount, setCartCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <MainNav cartCount={cartCount} />

      {/* Hero Section */}
      <section className="relative bg-[#121212] py-16">
        <div className="absolute inset-0 opacity-30">
          <Image src="/images/hero-background.png" alt="Background" fill className="object-cover" priority />
        </div>
        <div className="container relative mx-auto px-4 text-center text-white">
          <h1 className="font-cinzel text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Experiências Sensoriais <span className="text-[#CBA135]">Premium</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Descubra nossa curadoria exclusiva de bebidas e tabacos refinados para os verdadeiros apreciadores.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Buscar produtos, origens, notas..."
                className="h-12 border-gray-700 bg-gray-800/50 pl-10 text-white placeholder:text-gray-400 focus-visible:ring-[#CBA135]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Button
                type="submit"
                className="absolute right-1 top-1/2 h-10 -translate-y-1/2 bg-[#CBA135] text-white hover:bg-[#CBA135]/90"
              >
                Buscar
              </Button>
            </form>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <h2 className="font-cinzel text-3xl font-bold text-[#CBA135] md:text-4xl">Catálogo Exclusivo</h2>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button onClick={() => router.push("/search")} className="bg-[#CBA135] text-white hover:bg-[#CBA135]/90">
            Ver Catálogo Completo
          </Button>
        </div>
      </main>

      {/* Featured Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-cinzel text-3xl font-bold text-gray-800">
            Por Que Escolher o <span className="text-[#CBA135]">Summelier</span>
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#CBA135]/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#CBA135]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-cinzel text-xl font-semibold text-gray-800">Curadoria Exclusiva</h3>
              <p className="text-gray-600">
                Selecionamos cuidadosamente cada produto para garantir a mais alta qualidade e experiências sensoriais
                únicas.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#CBA135]/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#CBA135]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-cinzel text-xl font-semibold text-gray-800">Entrega Especializada</h3>
              <p className="text-gray-600">
                Embalagens especiais que preservam as características dos produtos e garantem que cheguem em perfeitas
                condições.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#CBA135]/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#CBA135]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-2 font-cinzel text-xl font-semibold text-gray-800">Experiência Personalizada</h3>
              <p className="text-gray-600">
                Recomendações baseadas no seu perfil sensorial, garantindo que você descubra produtos que combinam com
                seu paladar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-cinzel text-3xl font-bold text-gray-800">
            O Que Nossos <span className="text-[#CBA135]">Membros</span> Dizem
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                  <Image src="/images/avatar1.png" alt="Avatar" width={48} height={48} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Carlos Mendes</h4>
                  <div className="flex text-[#CBA135]">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 15.585l-7.07 3.715 1.35-7.865L.36 7.13l7.91-1.15L10 0l2.73 5.98 7.91 1.15-5.92 5.305 1.35 7.865z"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="italic text-gray-600">
                "A curadoria do Summelier é impecável. Cada mês recebo produtos que superam minhas expectativas e me
                apresentam a novas experiências sensoriais que eu jamais descobriria sozinho."
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                  <Image src="/images/avatar2.png" alt="Avatar" width={48} height={48} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Mariana Silva</h4>
                  <div className="flex text-[#CBA135]">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 15.585l-7.07 3.715 1.35-7.865L.36 7.13l7.91-1.15L10 0l2.73 5.98 7.91 1.15-5.92 5.305 1.35 7.865z"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="italic text-gray-600">
                "Ser membro do Summelier elevou minha apreciação por bebidas finas. O conteúdo exclusivo e as
                recomendações personalizadas fizeram toda a diferença na minha jornada como apreciadora."
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                  <Image src="/images/avatar3.png" alt="Avatar" width={48} height={48} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Roberto Almeida</h4>
                  <div className="flex text-[#CBA135]">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 15.585l-7.07 3.715 1.35-7.865L.36 7.13l7.91-1.15L10 0l2.73 5.98 7.91 1.15-5.92 5.305 1.35 7.865z"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="italic text-gray-600">
                "A qualidade dos charutos que recebo mensalmente é incomparável. O Summelier consegue encontrar
                verdadeiras joias e entregá-las com um serviço impecável. Recomendo fortemente."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#121212] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-cinzel text-3xl font-bold text-white md:text-4xl">
            Pronto para Elevar sua <span className="text-[#CBA135]">Experiência Sensorial</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Junte-se ao Summelier hoje e descubra um mundo de sabores e aromas exclusivos.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={() => router.push("/plans")}
              className="bg-[#CBA135] text-white hover:bg-[#CBA135]/90"
              size="lg"
            >
              Ver Planos
            </Button>
            <Button
              onClick={() => router.push("/register")}
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800"
              size="lg"
            >
              Cadastre-se
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
