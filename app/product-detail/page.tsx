import Link from 'next/link'
import { ProductDetailComponent } from "@/components/product-detail"

export default function ProductDetailPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-8">
        <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
          Back to Home
        </Link>
      </nav>
      <ProductDetailComponent />
    </div>
  )
}