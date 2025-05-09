"use client"

import { useState, useEffect } from "react"
import { MainNav } from "@/components/main-nav"
import { ProductCard } from "@/components/product-card"
import { CategoryFilter } from "@/components/category-filter"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, Filter, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

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
  {
    id: 7,
    name: "Lagavulin 16 Anos",
    origin: "Escócia",
    type: "Single Malt Whisky",
    notes: "Defumado, Marítimo",
    price: 790,
    image: "/images/whisky-related1.png",
    category: "whisky",
  },
  {
    id: 8,
    name: "Opus X",
    origin: "República Dominicana",
    type: "Charuto Premium",
    notes: "Picante, Amadeirado",
    price: 420,
    image: "/images/cigar-related2.png",
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

const origins = [
  { id: "escocia", name: "Escócia" },
  { id: "cuba", name: "Cuba" },
  { id: "franca", name: "França" },
  { id: "guatemala", name: "Guatemala" },
  { id: "belgica", name: "Bélgica" },
  { id: "republica-dominicana", name: "República Dominicana" },
]

const notes = [
  { id: "amadeirado", name: "Amadeirado" },
  { id: "frutado", name: "Frutado" },
  { id: "defumado", name: "Defumado" },
  { id: "terroso", name: "Terroso" },
  { id: "apimentado", name: "Apimentado" },
  { id: "floral", name: "Floral" },
  { id: "doce", name: "Doce" },
  { id: "maltado", name: "Maltado" },
  { id: "maritimo", name: "Marítimo" },
  { id: "picante", name: "Picante" },
]

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 1500])
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([])
  const [selectedNotes, setSelectedNotes] = useState<string[]>([])
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [cartCount, setCartCount] = useState(0)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    // Apply filters
    let result = products

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.type.toLowerCase().includes(term) ||
          product.origin.toLowerCase().includes(term) ||
          product.notes.toLowerCase().includes(term),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((product) => product.category === selectedCategory)
    }

    // Filter by price range
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Filter by origins
    if (selectedOrigins.length > 0) {
      result = result.filter((product) =>
        selectedOrigins.some((origin) => product.origin.toLowerCase().includes(origin.toLowerCase())),
      )
    }

    // Filter by notes
    if (selectedNotes.length > 0) {
      result = result.filter((product) =>
        selectedNotes.some((note) => product.notes.toLowerCase().includes(note.toLowerCase())),
      )
    }

    setFilteredProducts(result)
  }, [searchTerm, selectedCategory, priceRange, selectedOrigins, selectedNotes])

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1)
  }

  const toggleOrigin = (origin: string) => {
    setSelectedOrigins((prev) => (prev.includes(origin) ? prev.filter((o) => o !== origin) : [...prev, origin]))
  }

  const toggleNote = (note: string) => {
    setSelectedNotes((prev) => (prev.includes(note) ? prev.filter((n) => n !== note) : [...prev, note]))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setPriceRange([0, 1500])
    setSelectedOrigins([])
    setSelectedNotes([])
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
        <div className="mb-8">
          <h1 className="mb-2 font-cinzel text-3xl font-bold text-[#CBA135] md:text-4xl">Busca Avançada</h1>
          <p className="text-gray-600">Encontre os produtos perfeitos para sua experiência sensorial.</p>
        </div>

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar produtos, origens, notas..."
              className="border-gray-200 pl-10 focus-visible:ring-[#CBA135]/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="border-gray-200 md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
                {(selectedOrigins.length > 0 ||
                  selectedNotes.length > 0 ||
                  priceRange[0] > 0 ||
                  priceRange[1] < 1500) && (
                  <span className="ml-2 rounded-full bg-[#CBA135] px-2 py-0.5 text-xs text-white">
                    {selectedOrigins.length +
                      selectedNotes.length +
                      (priceRange[0] > 0 || priceRange[1] < 1500 ? 1 : 0)}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
                <SheetDescription>Refine sua busca com os filtros abaixo</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="mb-3 font-medium">Faixa de Preço</h3>
                  <Slider
                    defaultValue={priceRange}
                    min={0}
                    max={1500}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-3 font-medium">Origem</h3>
                  <div className="space-y-2">
                    {origins.map((origin) => (
                      <div key={origin.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`origin-${origin.id}`}
                          checked={selectedOrigins.includes(origin.name)}
                          onCheckedChange={() => toggleOrigin(origin.name)}
                          className="border-gray-300 data-[state=checked]:bg-[#CBA135] data-[state=checked]:text-white"
                        />
                        <Label htmlFor={`origin-${origin.id}`} className="text-sm">
                          {origin.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-3 font-medium">Notas Sensoriais</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {notes.map((note) => (
                      <div key={note.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`note-${note.id}`}
                          checked={selectedNotes.includes(note.name)}
                          onCheckedChange={() => toggleNote(note.name)}
                          className="border-gray-300 data-[state=checked]:bg-[#CBA135] data-[state=checked]:text-white"
                        />
                        <Label htmlFor={`note-${note.id}`} className="text-sm">
                          {note.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={clearFilters} className="border-gray-200">
                    <X className="mr-2 h-4 w-4" />
                    Limpar Filtros
                  </Button>
                  <SheetClose asChild>
                    <Button className="bg-[#CBA135] text-white hover:bg-[#CBA135]/90">Aplicar</Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {filteredProducts.length} {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
          </p>
          {(selectedOrigins.length > 0 || selectedNotes.length > 0 || priceRange[0] > 0 || priceRange[1] < 1500) && (
            <Button variant="link" onClick={clearFilters} className="h-auto p-0 text-[#CBA135]">
              Limpar todos os filtros
            </Button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 text-gray-400">
              <Search className="mx-auto h-12 w-12" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-700">Nenhum produto encontrado</h2>
            <p className="mb-6 max-w-md text-gray-500">
              Não encontramos produtos que correspondam aos seus critérios de busca. Tente ajustar os filtros ou buscar
              por outro termo.
            </p>
            <Button onClick={clearFilters} className="bg-[#CBA135] text-white hover:bg-[#CBA135]/90">
              Limpar Filtros
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
