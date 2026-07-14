import { Button, Card, CardBody, Divider } from '../../components/ui'
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { formatRupiah } from '../../lib/utils'

export default function CartPage() {
  const { cart, updateCartQty, removeFromCart, navigate, cartSubtotal } = useStore()

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-[#fdfaf3] flex items-center justify-center mb-6">
          <ShoppingCart className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="font-display text-2xl font-bold mb-2">Keranjang Belanja Kosong</h2>
        <p className="text-gray-500 mb-6">Yuk mulai belanja produk lokal favoritmu!</p>
        <Button color="primary" size="lg" radius="full" startContent={<ShoppingCart className="w-4 h-4" />} onClick={() => navigate('catalog')}>
          Mulai Belanja
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">Keranjang Belanja</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item) => (
            <Card key={item.id} className="border border-[#e7e2d8]" shadow="sm">
              <CardBody className="p-4 flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover cursor-pointer"
                  onClick={() => navigate('product', { id: item.id })}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm md:text-base line-clamp-2">{item.name}</h3>
                  <div className="text-gray-500 text-xs mt-1">{formatRupiah(item.price)}</div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <Button isIconOnly size="sm" variant="bordered" onClick={() => updateCartQty(item.id, item.qty - 1)}>
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-10 text-center font-semibold text-sm">{item.qty}</span>
                      <Button isIconOnly size="sm" variant="bordered" onClick={() => updateCartQty(item.id, item.qty + 1)}>
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#1e3a2b]">{formatRupiah(item.price * item.qty)}</div>
                      <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-600 hover:underline mt-1 flex items-center gap-1">
                        <Trash2 className="w-3 h-3" /> Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div>
          <Card className="border border-[#e7e2d8] sticky top-24" shadow="sm">
            <CardBody className="p-6">
              <h3 className="font-bold mb-4">Ringkasan Belanja</h3>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Subtotal ({cart.length} item)</span>
                <span className="font-semibold">{formatRupiah(cartSubtotal())}</span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span className="text-gray-500">Ongkir</span>
                <span className="text-gray-500">Dihitung checkout</span>
              </div>
              <Divider className="mb-4" />
              <div className="flex justify-between items-end mb-4">
                <span className="text-sm">Total</span>
                <span className="font-display text-2xl font-bold text-[#1e3a2b]">{formatRupiah(cartSubtotal())}</span>
              </div>
              <Button color="primary" size="lg" radius="full" className="w-full font-semibold" onClick={() => navigate('checkout')}>
                Checkout Sekarang
              </Button>
              <Button variant="light" className="w-full mt-2" onClick={() => navigate('catalog')}>
                Lanjut Belanja
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}