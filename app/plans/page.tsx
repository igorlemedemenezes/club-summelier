"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { Check } from "lucide-react"
import { motion } from "framer-motion"

const plans = [
  {
    id: "essencial",
    name: "Essencial",
    price: 129,
    description: "Perfeito para iniciantes que desejam explorar o mundo das bebidas e tabacos premium.",
    features: ["1 produto premium por mês", "Conteúdo exclusivo", "Acesso à comunidade", "Guia de degustação"],
    recommended: false,
    color: "#7B2E2E",
  },
  {
    id: "classico",
    name: "Clássico",
    price: 219,
    description: "Nossa opção mais popular para apreciadores que buscam uma experiência completa.",
    features: [
      "2 produtos premium por mês",
      "Brindes mensais exclusivos",
      "Frete grátis",
      "Conteúdo exclusivo",
      "Acesso à comunidade",
      "Guia de degustação",
    ],
    recommended: true,
    color: "#CBA135",
  },
  {
    id: "reserva",
    name: "Reserva",
    price: 359,
    description: "A experiência definitiva para os verdadeiros conhecedores e colecionadores.",
    features: [
      "3 produtos top de linha por mês",
      "Convites para eventos exclusivos",
      "Atendimento VIP personalizado",
      "Brindes mensais exclusivos",
      "Frete grátis",
      "Conteúdo exclusivo",
      "Acesso à comunidade",
      "Guia de degustação",
    ],
    recommended: false,
    color: "#2C2C2C",
  },
]

export default function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState("classico")

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <MainNav />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-2 font-cinzel text-3xl font-bold text-[#CBA135] md:text-4xl">Escolha seu Plano</h1>
          <p className="mb-12 text-[#F4F4F4]/70">Selecione o plano que melhor se adapta ao seu perfil de apreciador.</p>

          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Card
                  className={`relative overflow-hidden border-2 transition-all ${
                    selectedPlan === plan.id ? `border-[${plan.color}]` : "border-gray-200"
                  } bg-white shadow-md`}
                  style={{
                    borderColor: selectedPlan === plan.id ? plan.color : "#e5e7eb",
                  }}
                >
                  {plan.recommended && (
                    <div className="absolute right-0 top-0">
                      <div className="bg-[#CBA135] px-3 py-1 text-xs font-bold uppercase text-[#121212]">
                        Recomendado
                      </div>
                    </div>
                  )}

                  <CardHeader className="text-center">
                    <CardTitle className="font-cinzel text-2xl" style={{ color: plan.color }}>
                      {plan.name}
                    </CardTitle>
                    <div className="mt-2">
                      <span className="font-cinzel text-3xl font-bold text-[#F4F4F4]">R${plan.price}</span>
                      <span className="text-[#F4F4F4]/70">/mês</span>
                    </div>
                    <CardDescription className="mt-2 text-[#F4F4F4]/70">{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="mr-2 h-5 w-5 shrink-0" style={{ color: plan.color }} />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <Button
                      className="w-full"
                      style={{
                        backgroundColor: plan.color,
                        color: plan.id === "reserva" ? "#F4F4F4" : "#121212",
                      }}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {selectedPlan === plan.id ? "Plano Selecionado" : "Selecionar Plano"}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <Button size="lg" className="bg-[#CBA135] text-[#121212] hover:bg-[#CBA135]/90">
              Assinar Agora
            </Button>
            <p className="mt-4 text-sm text-[#F4F4F4]/70">Cancele a qualquer momento. Sem compromisso.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
