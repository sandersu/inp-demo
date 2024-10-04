import Link from 'next/link'
import ProductListing from "@/components/product-listing"

export default function ProductListingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-8">
        <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
          Back to Home
        </Link>
      </nav>
      <ProductListing />
    </div>
  )
}