import { Card, CardBody, CardFooter, Chip } from '../components/ui'
import { Star, Plus } from 'lucide-react'
import { useStore } from '../store/useStore'
import { formatRupiah, toastSuccess } from '../lib/utils'

export default function ProductCard({ product }) {
  const { navigate, addToCart } = useStore()

  const handleAdd = (e) => {
    e.stopPropagation() // Mencegah klik menyebar ke Card
    addToCart(product.id)
    toastSuccess(`${product.name} ditambahkan ke keranjang`)
  }

  return (
    <Card
      isPressable
      isHoverable
      className="product-card overflow-hidden border border-[#e7e2d8]"
      shadow="sm"
      onClick={() => navigate('product', { id: product.id })}
    >
      <CardBody className="p-0 overflow-hidden">
        <div className="aspect-square overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            loading="lazy"
          />
          {product.stock < 10 && (
            <Chip size="sm" color="danger" className="absolute top-2 left-2 font-bold">
              Sisa {product.stock}
            </Chip>
          )}
          {/* Kita ganti <Button> menjadi <span> agar tidak terjadi nested button */}
          <span
            onClick={handleAdd}
            className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-[#e85d04] text-white flex items-center justify-center shadow-lg hover:scale-110 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </span>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col items-start gap-1 p-3">
        <div className="text-[10px] text-gray-500 uppercase tracking-wider">{product.category}</div>
        <h3 className="font-semibold text-sm line-clamp-2 leading-snug w-full">{product.name}</h3>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="font-medium text-[#1a1d2e]">{product.rating}</span>
          <span>•</span>
          <span>Terjual {product.sold}</span>
        </div>
        <div className="font-display font-bold text-[#1e3a2b] text-base md:text-lg">
          {formatRupiah(product.price)}
        </div>
      </CardFooter>
    </Card>
  )
}