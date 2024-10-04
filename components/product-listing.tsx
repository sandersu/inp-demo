'use client'

import { useState, useEffect, useCallback } from 'react'
import { Star, ChevronDown } from 'lucide-react'
import INPDisplay from "@/components/ui/inp-display"

interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  tags: {
    size: string;
    color: string;
    brand: string;
  };
  rating: number;
}

interface Filters {
  size: string;
  color: string;
  brand: string;
}

// Helper function to generate random products
const generateProducts = (count: number): Product[] => {
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Black', 'White']
  const brands = ['FashionX', 'UrbanChic', 'EcoWear', 'LuxeStyle', 'SportsPro', 'CasualCo']

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Product ${i + 1}`,
    image: `/placeholder.svg?height=200&width=200&text=Product+${i + 1}`,
    description: `This is a description for Product ${i + 1}. It's a great product with many features.`,
    tags: {
      size: sizes[i % sizes.length],
      color: colors[i % colors.length],
      brand: brands[i % brands.length],
    },
    rating: (i % 5) + 1,
  }))
}

function blockFor(ms: number) {
  const start = performance.now();
  while (performance.now() - start < ms);
}

export default function ProductListing() {
  const [products, setProducts] = useState<Product[]>([])
  const [filters, setFilters] = useState<Filters>({
    size: '',
    color: '',
    brand: '',
  })
  const [isClient, setIsClient] = useState(false)
  const [lastInteractionTime, setLastInteractionTime] = useState<number | null>(null)

  useEffect(() => {
    setProducts(generateProducts(200))
    setIsClient(true)
  }, [])

  const handleFilterChange = useCallback((filterType: keyof Filters, value: string) => {
    setLastInteractionTime(0)
    const start = performance.now();
    
    setFilters(prev => ({ ...prev, [filterType]: value }))
    
    // Introduce a delay to simulate a heavy computation
    blockFor(500); // 500ms delay
    
    const end = performance.now();
    setLastInteractionTime(end - start);
  }, [])

  const filteredProducts = products.filter(product => 
    (!filters.size || product.tags.size === filters.size) &&
    (!filters.color || product.tags.color === filters.color) &&
    (!filters.brand || product.tags.brand === filters.brand)
  )

  if (!isClient) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Product Listing</h1>
      
      {/* Filter Section */}
      <div className="mb-8 flex flex-wrap gap-4">
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleFilterChange('size', e.target.value)}
            value={filters.size}
          >
            <option value="">All Sizes</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleFilterChange('color', e.target.value)}
            value={filters.color}
          >
            <option value="">All Colors</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Yellow">Yellow</option>
            <option value="Purple">Purple</option>
            <option value="Orange">Orange</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleFilterChange('brand', e.target.value)}
            value={filters.brand}
          >
            <option value="">All Brands</option>
            <option value="FashionX">FashionX</option>
            <option value="UrbanChic">UrbanChic</option>
            <option value="EcoWear">EcoWear</option>
            <option value="LuxeStyle">LuxeStyle</option>
            <option value="SportsPro">SportsPro</option>
            <option value="CasualCo">CasualCo</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{product.tags.size}</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{product.tags.color}</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">{product.tags.brand}</span>
              </div>
              <div className="flex items-center mb-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
      <INPDisplay lastInteractionTime={lastInteractionTime} />
    </div>
  )
}