"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Star, ThumbsUp } from "lucide-react"

interface ProductReviewsProps {
  productId: string
  rating: number
  reviewCount: number
}

// Sample reviews data
const sampleReviews = [
  {
    id: 1,
    author: "Carlos Mendes",
    avatar: "/images/avatar1.png",
    rating: 5,
    date: "12/04/2023",
    content:
      "Excepcional! O sabor é complexo e equilibrado, com notas de frutas maduras e um toque de carvalho. Definitivamente vale cada centavo investido.",
    helpful: 24,
    isHelpful: false,
  },
  {
    id: 2,
    author: "Mariana Silva",
    avatar: "/images/avatar2.png",
    rating: 4,
    date: "28/03/2023",
    content:
      "Muito bom, mas esperava um pouco mais pelo preço. A apresentação é impecável e o sabor é excelente, mas já experimentei outros similares por um valor menor.",
    helpful: 8,
    isHelpful: false,
  },
  {
    id: 3,
    author: "Roberto Almeida",
    avatar: "/images/avatar3.png",
    rating: 5,
    date: "15/02/2023",
    content:
      "Uma verdadeira obra-prima! Cada gole revela camadas de sabores diferentes. A experiência sensorial é incrível do início ao fim.",
    helpful: 17,
    isHelpful: false,
  },
]

export function ProductReviews({ productId, rating, reviewCount }: ProductReviewsProps) {
  const [reviews, setReviews] = useState(sampleReviews)
  const [newReview, setNewReview] = useState("")
  const [showReviewForm, setShowReviewForm] = useState(false)

  // Calculate rating distribution
  const ratingDistribution = [
    { stars: 5, percentage: 70 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 7 },
    { stars: 2, percentage: 2 },
    { stars: 1, percentage: 1 },
  ]

  const handleHelpful = (reviewId: number) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) => {
        if (review.id === reviewId) {
          return {
            ...review,
            helpful: review.isHelpful ? review.helpful - 1 : review.helpful + 1,
            isHelpful: !review.isHelpful,
          }
        }
        return review
      }),
    )
  }

  const handleSubmitReview = () => {
    if (!newReview.trim()) return

    const newReviewObj = {
      id: reviews.length + 1,
      author: "Você",
      avatar: "",
      rating: 5, // Default rating
      date: new Date().toLocaleDateString("pt-BR"),
      content: newReview,
      helpful: 0,
      isHelpful: false,
    }

    setReviews([newReviewObj, ...reviews])
    setNewReview("")
    setShowReviewForm(false)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-gray-800">{rating.toFixed(1)}</div>
              <div className="mb-1 flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(rating) ? "fill-[#CBA135] text-[#CBA135]" : "fill-gray-200 text-gray-200"}`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500">Baseado em {reviewCount} avaliações</div>
            </div>

            <div className="space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-2">
                  <div className="flex w-20 items-center justify-end">
                    <span className="mr-1 text-sm">{item.stars}</span>
                    <Star className="h-4 w-4 fill-[#CBA135] text-[#CBA135]" />
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                  <span className="w-10 text-xs text-gray-500">{item.percentage}%</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button
                className="w-full bg-[#CBA135] text-white hover:bg-[#CBA135]/90"
                onClick={() => setShowReviewForm(!showReviewForm)}
              >
                Escrever Avaliação
              </Button>
            </div>
          </div>

          <div className="md:col-span-2">
            {showReviewForm && (
              <div className="mb-6 rounded-lg border border-gray-200 p-4">
                <h3 className="mb-3 font-medium">Sua avaliação</h3>
                <div className="mb-3 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 cursor-pointer fill-[#CBA135] text-[#CBA135]" />
                  ))}
                </div>
                <Textarea
                  placeholder="Compartilhe sua experiência com este produto..."
                  className="mb-3 min-h-[100px] resize-none border-gray-200"
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                    Cancelar
                  </Button>
                  <Button className="bg-[#CBA135] text-white hover:bg-[#CBA135]/90" onClick={handleSubmitReview}>
                    Enviar Avaliação
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.author} />
                        <AvatarFallback className="bg-[#CBA135]/10 text-[#CBA135]">
                          {review.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{review.author}</div>
                        <div className="text-xs text-gray-500">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-[#CBA135] text-[#CBA135]" : "fill-gray-200 text-gray-200"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mb-3 text-gray-700">{review.content}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-1 text-xs ${review.isHelpful ? "text-[#CBA135]" : "text-gray-500"}`}
                    onClick={() => handleHelpful(review.id)}
                  >
                    <ThumbsUp className="h-3 w-3" />
                    <span>Útil ({review.helpful})</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
