'use client'

import { useState, useEffect, useCallback } from 'react'
import { Star } from 'lucide-react'
import INPDisplay from './ui/inp-display'
import { Button } from './ui/button'

type Product = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  rating: number
}

const generateProducts = (count: number): Product[] => {
  const tags = ['Small', 'Medium', 'Large', 'Red', 'Blue', 'Green', 'Cotton', 'Polyester', 'Wool']
  const brands = ['BrandA', 'BrandB', 'BrandC', 'BrandD', 'BrandE']

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Product ${i + 1}`,
    description: `This is a description for Product ${i + 1}. It's a great product with many features.`,
    image: `/placeholder.svg`,
    tags: [
      tags[Math.floor(Math.random() * tags.length)],
      brands[Math.floor(Math.random() * brands.length)],
    ],
    rating: Math.floor(Math.random() * 5) + 1,
  }))
}

function blockFor(ms: number) {
  const start = performance.now()
  while (performance.now() - start < ms);
}

function yieldToMain() {
    return new Promise(resolve => {
      setTimeout(resolve, 0);
    });
  }

export default function ProductListing() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [lastInteractionTime, setLastInteractionTime] = useState<number | null>(null)

  useEffect(() => {
    setProducts(generateProducts(200))
  }, [])

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  const applyFilter = useCallback(async (filter: string) => {
    const start = performance.now()
    
    setActiveFilters(prev => {
        if (prev.includes(filter)) {
          return prev.filter(f => f !== filter)
        } else {
          return [...prev, filter]
        }
      })

    // Simulate a delay
    blockFor(3000)  // 500ms delay



    const end = performance.now()
    setLastInteractionTime(end - start)
  }, [])

  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter(product => 
        activeFilters.every(filter => product.tags.includes(filter))
      ))
    }
  }, [activeFilters, products])

  const allTags = Array.from(new Set(products.flatMap(p => p.tags)))

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Product Listing</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Filters</h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <Button
              key={tag}
              onClick={() => applyFilter(tag)}
              variant={activeFilters.includes(tag) ? "default" : "outline"}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      <INPDisplay lastInteractionTime={lastInteractionTime} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-2" />
            <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <div className="flex items-center mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {product.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-200 rounded-full px-2 py-1">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}