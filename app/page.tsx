import Link from 'next/link'

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-8">
        <ul className="flex space-x-4">
          <li>
            <Link href="/product-detail" className="text-blue-500 hover:text-blue-700 underline">
              Product Detail
            </Link>
          </li>
          <li>
            <Link href="/product-listing" className="text-blue-500 hover:text-blue-700 underline">
              Product Listing
            </Link>
          </li>
        </ul>
      </nav>
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Product Pages</h1>
      <p className="mb-4">Please select a page from the navigation menu above.</p>
    </div>
  )
}