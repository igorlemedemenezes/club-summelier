"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MainNav } from "@/components/main-nav"
import { ArrowLeft, ArrowRight, Check, CreditCard } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const flavorNotes = [
  { id: "amadeirado", label: "Amadeirado" },
  { id: "frutado", label: "Frutado" },
  { id: "apimentado", label: "Apimentado" },
  { id: "floral", label: "Floral" },
  { id: "citrico", label: "Cítrico" },
  { id: "defumado", label: "Defumado" },
  { id: "terroso", label: "Terroso" },
]

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1
    name: "",
    email: "",
    birthdate: "",
    address: "",
    phone: "",
    isAdult: false,

    // Step 2
    beverages: {
      whisky: false,
      wine: false,
      rum: false,
      beer: false,
      other: "",
    },
    tobacco: {
      cigars: false,
      pipe: false,
      rolled: false,
      flavored: false,
      none: false,
    },
    frequency: "",
    notes: [] as string[],

    // Step 3
    paymentMethod: "credit",
  })

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateNestedFormData = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const toggleNote = (note: string) => {
    setFormData((prev) => {
      const notes = [...prev.notes]
      if (notes.includes(note)) {
        return { ...prev, notes: notes.filter((n) => n !== note) }
      } else {
        return { ...prev, notes: [...notes, note] }
      }
    })
  }

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = () => {
    // Here you would typically submit the form data to your backend
    console.log("Form submitted:", formData)

    // Redirect to plans page
    router.push("/plans")
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <MainNav />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 text-center font-cinzel text-3xl font-bold text-[#CBA135] md:text-4xl">
            Junte-se ao Clube
          </h1>
          <p className="mb-8 text-center text-[#F4F4F4]/70">
            Preencha o formulário abaixo para começar sua jornada sensorial.
          </p>

          <div className="mb-8 flex justify-center">
            <div className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  step >= 1 ? "bg-[#CBA135]" : "bg-[#2C2C2C]"
                }`}
              >
                {step > 1 ? <Check className="h-5 w-5 text-[#121212]" /> : <span>1</span>}
              </div>
              <div className={`h-1 w-16 ${step > 1 ? "bg-[#CBA135]" : "bg-[#2C2C2C]"}`} />
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  step >= 2 ? "bg-[#CBA135]" : "bg-[#2C2C2C]"
                }`}
              >
                {step > 2 ? <Check className="h-5 w-5 text-[#121212]" /> : <span>2</span>}
              </div>
              <div className={`h-1 w-16 ${step > 2 ? "bg-[#CBA135]" : "bg-[#2C2C2C]"}`} />
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  step >= 3 ? "bg-[#CBA135]" : "bg-[#2C2C2C]"
                }`}
              >
                <span>3</span>
              </div>
            </div>
          </div>

          <Card className="border-gray-200 bg-white shadow-md">
            <CardHeader>
              <CardTitle className="font-cinzel text-xl text-[#CBA135]">
                {step === 1 && "Dados Pessoais"}
                {step === 2 && "Preferências"}
                {step === 3 && "Pagamento e Confirmação"}
              </CardTitle>
              <CardDescription className="text-[#F4F4F4]/70">
                {step === 1 && "Informe seus dados para cadastro"}
                {step === 2 && "Conte-nos sobre seus gostos"}
                {step === 3 && "Escolha sua forma de pagamento"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        className="border-gray-200 bg-gray-50/50 text-gray-800 focus-visible:ring-[#CBA135]/50"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        className="border-gray-200 bg-gray-50/50 text-gray-800 focus-visible:ring-[#CBA135]/50"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="birthdate">Data de nascimento</Label>
                      <Input
                        id="birthdate"
                        type="date"
                        value={formData.birthdate}
                        onChange={(e) => updateFormData("birthdate", e.target.value)}
                        className="border-gray-200 bg-gray-50/50 text-gray-800 focus-visible:ring-[#CBA135]/50"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="address">Endereço de entrega</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => updateFormData("address", e.target.value)}
                        className="border-gray-200 bg-gray-50/50 text-gray-800 focus-visible:ring-[#CBA135]/50"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        className="border-gray-200 bg-gray-50/50 text-gray-800 focus-visible:ring-[#CBA135]/50"
                      />
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox
                        id="isAdult"
                        checked={formData.isAdult}
                        onCheckedChange={(checked) => updateFormData("isAdult", checked)}
                        className="border-[#CBA135] data-[state=checked]:bg-[#CBA135] data-[state=checked]:text-[#121212]"
                      />
                      <Label htmlFor="isAdult" className="text-sm">
                        Confirmo que tenho 18 anos ou mais
                      </Label>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="space-y-3">
                      <Label className="text-base">Quais tipos de bebidas você aprecia?</Label>
                      <div className="grid gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="whisky"
                            checked={formData.beverages.whisky}
                            onCheckedChange={(checked) => updateNestedFormData("beverages", "whisky", checked)}
                            className="border-[#CBA135] data-[state=checked]:bg-[#CBA135] data-[state=checked]:text-[#121212]"
                          />
                          <Label htmlFor="whisky">Whisky</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="wine"
                            checked={formData.beverages.wine}
                            onCheckedChange={(checked) => updateNestedFormData("beverages", "wine", checked)}
                            className="border-[#CBA135] data-[state=checked]:bg-[#CBA135] data-[state=checked]:text-[#121212]"
                          />
                          <Label htmlFor="wine">Vinho</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="rum"
                            checked={formData.beverages.rum}
                            onCheckedChange={(checked) => updateNestedFormData("beverages", "rum", checked)}
                            className="border-[#CBA135] data-[state=checked]:bg-[#CBA135] data-[state=checked]:text-[#121212]"
                          />
                          <Label htmlFor="rum">Rum</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="beer"
                            checked={formData.beverages.beer}
                            onCheckedChange={(checked) => updateNestedFormData("beverages", "beer", checked)}
                            className="border-[#CBA135] data-[state=checked]:bg-[#CBA135] data-[state=checked]:text-[#121212]"
                          />
                          <Label htmlFor="beer">Cerveja artesanal</Label>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="other">Outros</Label>
                          <Input
                            id="other"
                            value={formData.beverages.other}
                            onChange={(e) => updateNestedFormData("beverages", "other", e.target.value)}
                            className="border-gray-200 bg-gray-50/50 text-gray-800 focus-visible:ring-[#CBA135]/50"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base">Quais tipos de tabaco você consome?</Label>
                      <div className="grid gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="cigars"
                            checked={formData.tobacco.cigars}
                            onCheckedChange={(checked) => updateNestedFormData("tobacco", "cigars", checked)}
                            className="border-[#CBA135] data-[state=checked]:bg-[#CBA135] data-[state=checked]:text-[#121212]"
                          />
                          <Label htmlFor="cigars">Charutos</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="pipe"
                            checked={formData.tobacco.pipe}
                            onCheckedChange={(checked) => updateNestedFormData("tobacco", "pipe", checked)}
                            className="border-[#CBA135] data-[state=checked]:bg-[#CBA135] data-[state=checked]:text-[#121212]"
                          />
                          <Label htmlFor="pipe">Fumo para cachimbo</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="rolled"
                            checked={formData.tobacco.rolled}
                            onCheckedChange={(checked) => updateNestedFormData("tobacco", "rolled", checked)}
                            className="border-[#CBA135] data-[state=checked]:bg-[#CBA135] data-[state=checked]:text-[#121212]"
                          />
                          <Label htmlFor="rolled">Cigarros enrolados</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="flavored"
                            checked={formData.tobacco.flavored}
                            onCheckedChange={(checked) => updateNestedFormData("tobacco", "flavored", checked)}
                            className="border-[#CBA135] data-[state=checked]:bg-[#CBA135] data-[state=checked]:text-[#121212]"
                          />
                          <Label htmlFor="flavored">Aromatizados (baunilha, cereja, etc.)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="none"
                            checked={formData.tobacco.none}
                            onCheckedChange={(checked) => updateNestedFormData("tobacco", "none", checked)}
                            className="border-[#CBA135] data-[state=checked]:bg-[#CBA135] data-[state=checked]:text-[#121212]"
                          />
                          <Label htmlFor="none">Nenhum</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base">Frequência de consumo:</Label>
                      <RadioGroup
                        value={formData.frequency}
                        onValueChange={(value) => updateFormData("frequency", value)}
                        className="grid gap-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="occasional"
                            id="occasional"
                            className="border-[#CBA135] text-[#CBA135]"
                          />
                          <Label htmlFor="occasional">Ocasional</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="regular" id="regular" className="border-[#CBA135] text-[#CBA135]" />
                          <Label htmlFor="regular">Regular</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="special" id="special" className="border-[#CBA135] text-[#CBA135]" />
                          <Label htmlFor="special">Só em ocasiões especiais</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base">Notas preferidas:</Label>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {flavorNotes.map((note) => (
                          <div key={note.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={note.id}
                              checked={formData.notes.includes(note.id)}
                              onCheckedChange={() => toggleNote(note.id)}
                              className="border-[#CBA135] data-[state=checked]:bg-[#CBA135] data-[state=checked]:text-[#121212]"
                            />
                            <Label htmlFor={note.id}>{note.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="space-y-3">
                      <Label className="text-base">Forma de Pagamento:</Label>
                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) => updateFormData("paymentMethod", value)}
                        className="grid gap-4"
                      >
                        <div className="flex items-center space-x-2 rounded-lg border border-[#2C2C2C] p-4">
                          <RadioGroupItem value="credit" id="credit" className="border-[#CBA135] text-[#CBA135]" />
                          <Label htmlFor="credit" className="flex items-center">
                            <CreditCard className="mr-2 h-5 w-5 text-[#CBA135]" />
                            Cartão de Crédito
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 rounded-lg border border-[#2C2C2C] p-4">
                          <RadioGroupItem value="pix" id="pix" className="border-[#CBA135] text-[#CBA135]" />
                          <Label htmlFor="pix" className="flex items-center">
                            <svg
                              className="mr-2 h-5 w-5 text-[#CBA135]"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 2L2 7L12 12L22 7L12 2Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M2 17L12 22L22 17"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M2 12L12 17L22 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            Pix
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="rounded-lg border border-[#2C2C2C] bg-[#2C2C2C]/20 p-4">
                      <h3 className="mb-2 font-medium text-[#CBA135]">Resumo do Cadastro</h3>
                      <div className="grid gap-1 text-sm">
                        <p>
                          <span className="text-[#F4F4F4]/70">Nome:</span> {formData.name || "Não informado"}
                        </p>
                        <p>
                          <span className="text-[#F4F4F4]/70">Email:</span> {formData.email || "Não informado"}
                        </p>
                        <p>
                          <span className="text-[#F4F4F4]/70">Bebidas:</span>{" "}
                          {Object.entries(formData.beverages)
                            .filter(([key, value]) => value === true || (key === "other" && value))
                            .map(([key]) =>
                              key === "whisky"
                                ? "Whisky"
                                : key === "wine"
                                  ? "Vinho"
                                  : key === "rum"
                                    ? "Rum"
                                    : key === "beer"
                                      ? "Cerveja"
                                      : formData.beverages.other,
                            )
                            .join(", ") || "Não informado"}
                        </p>
                        <p>
                          <span className="text-[#F4F4F4]/70">Tabacos:</span>{" "}
                          {Object.entries(formData.tobacco)
                            .filter(([key, value]) => value === true && key !== "none")
                            .map(([key]) =>
                              key === "cigars"
                                ? "Charutos"
                                : key === "pipe"
                                  ? "Cachimbo"
                                  : key === "rolled"
                                    ? "Enrolados"
                                    : "Aromatizados",
                            )
                            .join(", ") || (formData.tobacco.none ? "Nenhum" : "Não informado")}
                        </p>
                        <p>
                          <span className="text-[#F4F4F4]/70">Frequência:</span>{" "}
                          {formData.frequency === "occasional"
                            ? "Ocasional"
                            : formData.frequency === "regular"
                              ? "Regular"
                              : formData.frequency === "special"
                                ? "Ocasiões especiais"
                                : "Não informado"}
                        </p>
                        <p>
                          <span className="text-[#F4F4F4]/70">Notas preferidas:</span>{" "}
                          {formData.notes
                            .map((note) => {
                              const noteObj = flavorNotes.find((n) => n.id === note)
                              return noteObj ? noteObj.label : note
                            })
                            .join(", ") || "Não informado"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        className="border-[#CBA135] data-[state=checked]:bg-[#CBA135] data-[state=checked]:text-[#121212]"
                      />
                      <Label htmlFor="terms" className="text-sm">
                        Concordo com os termos de uso e política de privacidade
                      </Label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>

            <CardFooter className="flex justify-between">
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-[#2C2C2C] bg-transparent text-[#F4F4F4] hover:bg-[#2C2C2C] hover:text-[#F4F4F4]"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <Button onClick={handleNext} className="bg-[#CBA135] text-[#121212] hover:bg-[#CBA135]/90">
                  Próximo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-[#CBA135] text-[#121212] hover:bg-[#CBA135]/90">
                  Finalizar Cadastro
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
