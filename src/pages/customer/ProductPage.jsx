import { useState } from 'react'
import {
  Button, Card, CardContent, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, Select, SelectItem,
  useDisclosure,
} from '../../components/ui'
import { Star, ShoppingCart, Zap, Minus, Plus, Truck, QrCode, MessageCircle } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { formatRupiah, toastSuccess } from '../../lib/utils'
import ProductCard from '../../components/ProductCard'

export default function ProductPage() {
  const { products, params, navigate, addToCart } = useStore()
  const [qty, setQty] = useState(1)
  const product = products.find((p) => p.id === params.id)

  if (!product) return <div className="p-8 text-center">Produk tidak ditemukan</div>

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAdd = () => {
    addToCart(product.id, qty)
    toastSuccess(`${product.name} ditambahkan ke keranjang`)
  }

  const handleBuyNow = () => {
    addToCart(product.id, qty)
    navigate('checkout')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 flex-wrap">
        <button onClick={() => navigate('home')} className="hover:text-[#1e3a2b]">Beranda</button>
        <span>/</span>
        <button onClick={() => navigate('catalog', { category: product.category })} className="hover:text-[#1e3a2b]">{product.category}</button>
        <span>/</span>
        <span className="text-[#1a1d2e] font-medium line-clamp-1">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-[#e7e2d8] shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.rating >= 4.8 && <Chip color="warning" className="font-bold">Best Seller</Chip>}
            {product.stock < 10 && <Chip color="danger" className="font-bold">Stok Terbatas</Chip>}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">{product.category}</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4 leading-tight">{product.name}</h1>

          <div className="flex items-center gap-4 mb-6 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold">{product.rating}</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-gray-500">Terjual {product.sold}</span>
            <span className="text-gray-400">|</span>
            <span className={product.stock > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
              {product.stock > 0 ? `Stok: ${product.stock}` : 'Stok Habis'}
            </span>
          </div>

          <div className="bg-[#fdfaf3] rounded-2xl p-6 mb-6">
            <div className="text-sm text-gray-500 mb-1">Harga</div>
            <div className="font-display text-4xl font-bold text-[#1e3a2b]">{formatRupiah(product.price)}</div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-2">Deskripsi Produk</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{product.desc}</p>
          </div>

          {/* Qty */}
          <div className="mb-6 flex items-center gap-4">
            <span className="text-sm font-medium">Jumlah</span>
            <div className="flex items-center gap-2">
              <Button isIconOnly size="sm" variant="bordered" onClick={() => setQty(Math.max(1, qty - 1))}>
                <Minus className="w-3 h-3" />
              </Button>
              <Input
                type="number"
                value={qty}
                onChange={(e) => setQty(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                className="w-20"
                classNames={{ input: 'text-center font-semibold' }}
              />
              <Button isIconOnly size="sm" variant="bordered" onClick={() => setQty(Math.min(product.stock, qty + 1))}>
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            <span className="text-sm text-gray-500">Stok {product.stock}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="bordered"
              size="lg"
              radius="full"
              className="border-[#1e3a2b] text-[#1e3a2b] font-semibold flex-1"
              startContent={<ShoppingCart className="w-4 h-4" />}
              onClick={handleAdd}
            >
              Tambah ke Keranjang
            </Button>
            <Button
              color="warning"
              size="lg"
              radius="full"
              className="font-semibold flex-1"
              startContent={<Zap className="w-4 h-4" />}
              onClick={handleBuyNow}
            >
              Beli Sekarang
            </Button>
          </div>

          {/* Service highlights */}
          <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-[#e7e2d8]">
            {[
              { icon: Truck, title: '4 Ekspedisi', desc: 'Pilih saat checkout' },
              { icon: QrCode, title: 'QRIS & Bank', desc: 'Otomatis konfirmasi' },
              { icon: MessageCircle, title: 'Chat Admin', desc: 'Respons cepat' },
            ].map((s) => {
              const Icon = s.icon
              return (
                <div key={s.title} className="text-center">
                  <Icon className="w-5 h-5 text-[#1e3a2b] mx-auto mb-1" />
                  <div className="text-xs font-medium">{s.title}</div>
                  <div className="text-[10px] text-gray-500">{s.desc}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Produk Serupa</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}