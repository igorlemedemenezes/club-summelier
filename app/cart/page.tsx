"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Sample cart items
const initialCartItems = [
  {
    id: 1,
    name: "Macallan 18 Anos",
    type: "Single Malt Whisky",
    price: 1290,
    quantity: 1,
    image: "/images/whisky.png",
  },
  {
    id: 2,
    name: "Cohiba Behike",
    type: "Charuto Premium",
    price: 450,
    quantity: 2,
    image: "/images/cigar1.png",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateShipping = () => {
    const subtotal = calculateSubtotal()
    return subtotal > 1000 ? 0 : 50
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <MainNav cartCount={cartItems.reduce((count, item) => count + item.quantity, 0)} />

      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 font-cinzel text-3xl font-bold text-[#CBA135] md:text-4xl">Seu Carrinho</h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-6 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-700">Seu carrinho está vazio</h2>
            <p className="mb-6 text-gray-500">Adicione alguns produtos para continuar</p>
            <Link href="/home">
              <Button className="bg-[#CBA135] text-white hover:bg-[#CBA135]/90">Continuar Comprando</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Itens do Carrinho</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                      <div className="relative h-24 w-24 overflow-hidden rounded-md bg-gray-100">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 96px"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-cinzel text-lg font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.type}</p>
                          <p className="mt-1 font-cinzel text-lg font-bold text-[#CBA135]">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:flex-col sm:items-end">
                        <div className="flex items-center rounded-md border border-gray-200">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="flex h-8 w-8 items-center justify-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link href="/home">
                    <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-100">
                      Continuar Comprando
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(calculateSubtotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete</span>
                    <span className="font-medium">
                      {calculateShipping() === 0 ? "Grátis" : formatPrice(calculateShipping())}
                    </span>
                  </div>
                  <Separator className="my-2 bg-gray-200" />
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-800">Total</span>
                    <span className="font-cinzel text-lg font-bold text-[#CBA135]">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#CBA135] text-white hover:bg-[#CBA135]/90">
                    Finalizar Compra
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h3 className="mb-2 font-medium text-gray-700">Informações de Entrega</h3>
                <p className="text-sm text-gray-500">
                  Entrega em até 3 dias úteis para capitais e 5 dias úteis para demais localidades.
                </p>
                <p className="mt-2 text-sm text-gray-500">Frete grátis para compras acima de R$1.000,00.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
