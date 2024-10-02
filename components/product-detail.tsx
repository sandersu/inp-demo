'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import INPDisplay from './ui/inp-display'

type Color = 'red' | 'orange' | 'green'

export function ProductDetailComponent() {
  const [color, setColor] = useState<Color>('green')
  const [isChanging, setIsChanging] = useState(false)
  const [changingColor, setChangingColor] = useState<Color | null>(null)

  function blockFor(ms: number) {
    const target = performance.now() + ms;
    while (performance.now() < target);
  }  

  const handleColorChange = (newColor: Color, delay: number) => {
    blockFor(delay)
    setColor(newColor)
    setIsChanging(true)      
    setIsChanging(false)
    setChangingColor(null)
    setChangingColor(newColor)
  }

  const getColorClasses = (colorName: Color) => {
    switch (colorName) {
      case 'red': return 'bg-red-500 hover:bg-red-600'
      case 'orange': return 'bg-orange-500 hover:bg-orange-600'
      case 'green': return 'bg-green-500 hover:bg-green-600'
      default: return 'bg-red-500 hover:bg-red-600'
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Detail - INP Demo</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className={`relative w-full aspect-square rounded-lg shadow-lg overflow-hidden ${getColorClasses(color).split(' ')[0]}`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="300" fill="none"/>
                <text x="150" y="150" fontFamily="Arial" fontSize="24" fill="white" textAnchor="middle" dominantBaseline="middle">Product</text>
                <path d="M75 100 L150 50 L225 100 L225 200 L150 250 L75 200 Z" fill="none" stroke="white" strokeWidth="4"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Color: {color}</h2>
          <div className="space-y-4">
            <Button 
              onClick={() => handleColorChange('green', 0)} 
              disabled={isChanging || color === 'green'}
              className={`w-full ${getColorClasses('green')} text-white`}
            >
              Switch to Green (Instant)
            </Button>
            <Button 
              onClick={() => handleColorChange('orange', 440)} 
              disabled={isChanging || color === 'orange'}
              className={`w-full ${getColorClasses('orange')} text-white`}
            >
              Switch to Orange (440ms delay)
            </Button>
            <Button 
              onClick={() => handleColorChange('red', 5000)} 
              disabled={isChanging || color === 'red'}
              className={`w-full ${getColorClasses('red')} text-white`}
            >
              Switch to Red (5s delay)
            </Button>
          </div>
          {isChanging && (
            <div className="mt-4 p-2 bg-yellow-100 text-yellow-800 rounded">
              Changing to {changingColor}...
            </div>
          )}
        </div>
        <INPDisplay/>
      </div>
    </div>
  )
}