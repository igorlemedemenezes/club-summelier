"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AgeVerification } from "@/components/age-verification"
import { motion } from "framer-motion"
import Image from "next/image"

export default function LandingPage() {
  const [showVerification, setShowVerification] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Show age verification after a short delay for better UX
    const timer = setTimeout(() => {
      setShowVerification(true)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white text-gray-800">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('/images/background.png')",
          backgroundBlendMode: "overlay",
        }}
      />

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[url('/images/wood-texture.png')] opacity-5" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 text-center"
        >
          <div className="mx-auto mb-6 w-40">
            <Image src="/images/logo.png" alt="Summelier Logo" width={160} height={160} />
          </div>
          <h1 className="font-cinzel text-4xl font-bold tracking-wider text-[#CBA135] md:text-6xl">SUMMELIER</h1>
          <p className="mt-4 font-playfair text-xl italic text-gray-700">O clube para apreciadores de excelência.</p>
        </motion.div>

        {showVerification && (
          <AgeVerification
            onVerified={() => router.push("/home")}
            onRejected={() => (window.location.href = "https://www.google.com")}
          />
        )}
      </div>
    </div>
  )
}
