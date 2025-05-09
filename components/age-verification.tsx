"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Wine } from "lucide-react"

interface AgeVerificationProps {
  onVerified: () => void
  onRejected: () => void
}

export function AgeVerification({ onVerified, onRejected }: AgeVerificationProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleVerify = () => {
    setIsAnimating(true)
    setTimeout(() => {
      onVerified()
    }, 500)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="w-full max-w-md"
      >
        <Card className="border border-gray-200 bg-white/90 shadow-lg backdrop-blur-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#7B2E2E]/10">
              <Wine className="h-6 w-6 text-[#CBA135]" />
            </div>
            <CardTitle className="font-cinzel text-2xl text-[#CBA135]">Verificação de Idade</CardTitle>
            <CardDescription className="text-gray-600">
              Para acessar o conteúdo do Summelier, precisamos confirmar sua idade.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg font-medium text-gray-800">Você tem 18 anos ou mais?</p>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={onRejected}
              className="border-gray-300 bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            >
              Não
            </Button>
            <Button onClick={handleVerify} className="bg-[#CBA135] text-white hover:bg-[#CBA135]/90">
              Sim
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
