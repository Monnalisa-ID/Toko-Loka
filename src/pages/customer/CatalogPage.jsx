import { useStore } from '../../store/useStore'
import ProductCard from '../../components/ProductCard'

export default function CatalogPage() {
  const { products, params, navigate } = useStore()
  const search = params.search || ''
  const category = params.category || ''

  let filtered = products
  if (category) filtered = filtered.filter((p) => p.category === category)
  if (search) filtered = filtered.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <button onClick={() => navigate('home')} className="hover:text-[#1e3a2b]">Beranda</button>
        <span>/</span>
        <span className="text-[#1a1d2e] font-medium">{category || 'Semua Produk'}</span>
      </div>

      <h1 className="font-display text-3xl md:text-4xl font-bold mb-1">{category || 'Semua Produk'}</h1>
      <p className="text-gray-500 mb-6">{filtered.length} produk ditemukan</p>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-4">Produk tidak ditemukan</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}