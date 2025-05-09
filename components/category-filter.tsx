"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  name: string
}

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="relative">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 p-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={cn(
                "inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                "border border-transparent",
                selectedCategory === category.id
                  ? "border-[#CBA135] bg-[#CBA135]/10 text-[#CBA135]"
                  : "border-gray-200 bg-gray-100/50 text-gray-600 hover:bg-gray-200 hover:text-gray-800",
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>
    </div>
  )
}
