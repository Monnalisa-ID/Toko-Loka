import { useState, useEffect } from 'react'
import { Button, Input, Badge } from '../components/ui'
import {
  Leaf, Search, ShoppingCart, MessageCircle, Shield, LayoutGrid, Receipt, Menu,
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { formatRupiah, formatDate, formatTime } from '../lib/utils'
import ChatWidget from './ChatWidget'

// Daftar halaman customer (lazy load)
const pages = {
  home: () => import('../pages/customer/HomePage'),
  catalog: () => import('../pages/customer/CatalogPage'),
  product: () => import('../pages/customer/ProductPage'),
  cart: () => import('../pages/customer/CartPage'),
  checkout: () => import('../pages/customer/CheckoutPage'),
  payment: () => import('../pages/customer/PaymentPage'),
  'payment-return': () => import('../pages/customer/PaymentReturnPage'),
  'order-status': () => import('../pages/customer/OrderStatusPage'),
  orders: () => import('../pages/customer/OrdersListPage'),
}

export default function CustomerLayout() {
  const [PageComponent, setPageComponent] = useState(null)
  const { 
    page, params, navigate, switchView, cartCount, toggleChat, chat, notifications 
  } = useStore()

  useEffect(() => {
    // Tangkap return URL dari iPaymu setelah pembayaran
    const urlParams = new URLSearchParams(window.location.search)
    const pageParam = urlParams.get('page')
    const orderIdParam = urlParams.get('orderId')
    
    if (pageParam === 'payment-return' && orderIdParam) {
      navigate('payment-return', { orderId: orderIdParam })
      // Bersihkan URL agar tidak terus-terusan trigger navigate saat refresh
      window.history.replaceState({}, document.title, window.location.pathname)
      return
    }

    // Lazy load halaman yang dituju
    const loader = pages[page] || pages.home
    loader().then((mod) => setPageComponent(() => mod.default))
  }, [page, navigate])

  const count = cartCount()
  const categories = ['Minuman', 'Makanan', 'Fashion', 'Dekorasi']

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-[#e7e2d8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">
            {/* Logo */}
            <button onClick={() => navigate('home')} className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#1e3a2b] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div className="text-left hidden sm:block">
                <div className="font-display text-xl font-bold text-[#1e3a2b] leading-none">Toko Loka</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Belanja Lokal</div>
              </div>
            </button>

            {/* Search Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <Input
                placeholder="Cari produk lokal favoritmu..."
                className="w-full"
                size="lg"
                radius="full"
                startContent={<Search className="w-4 h-4 text-gray-400" />}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate('catalog', { search: e.target.value })
                  }
                }}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              <Button
                variant="bordered"
                radius="full"
                size="sm"
                className="hidden sm:flex"
                startContent={<Shield className="w-4 h-4" />}
                onClick={() => switchView('admin')}
              >
                <span className="hidden lg:inline">Mode Admin</span>
              </Button>
              <Button
                variant="light"
                radius="full"
                size="sm"
                className="hidden sm:flex"
                startContent={<LayoutGrid className="w-4 h-4" />}
                onClick={() => navigate('catalog')}
              >
                <span className="hidden lg:inline">Katalog</span>
              </Button>
              <Button
                variant="light"
                radius="full"
                size="sm"
                className="hidden sm:flex"
                startContent={<Receipt className="w-4 h-4" />}
                onClick={() => navigate('orders')}
              >
                <span className="hidden lg:inline">Pesanan</span>
              </Button>

              <Badge content={count > 0 ? count : ''} color="danger" shape="circle" size="sm">
                <Button isIconOnly variant="light" radius="full" onClick={() => navigate('cart')}>
                  <ShoppingCart className="w-5 h-5" />
                </Button>
              </Badge>

              {/*<Button isIconOnly variant="light" radius="full" onClick={toggleChat}>
                <MessageCircle className="w-5 h-5" />
                {chat.messages.length > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#e85d04] rounded-full" />
                )}
              </Button> */}
            </div>
          </div>

          {/* Search Mobile */}
          <div className="md:hidden pb-3">
            <Input
              placeholder="Cari produk..."
              size="sm"
              radius="full"
              startContent={<Search className="w-4 h-4 text-gray-400" />}
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigate('catalog', { search: e.target.value })
              }}
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="border-t border-[#e7e2d8] bg-[#fdfaf3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <Button
              size="sm"
              radius="full"
              color={params.category ? 'default' : 'primary'}
              variant={params.category ? 'bordered' : 'solid'}
              className="shrink-0"
              onClick={() => navigate('catalog')}
            >
              Semua
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                size="sm"
                radius="full"
                color={params.category === cat ? 'primary' : 'default'}
                variant={params.category === cat ? 'solid' : 'bordered'}
                className="shrink-0"
                onClick={() => navigate('catalog', { category: cat })}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 min-h-[60vh]">
        {PageComponent ? <PageComponent /> : (
          <div className="flex items-center justify-center h-96">
            <div className="w-8 h-8 border-4 border-[#1e3a2b] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#1e3a2b] text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display text-xl font-bold">Toko Loka</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-70">Belanja Lokal</div>
                </div>
              </div>
              <p className="text-sm opacity-80 mb-4">Mendukung UMKM Indonesia dengan produk lokal berkualitas.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Kategori</h4>
              <ul className="space-y-2 text-sm opacity-80">
                {categories.map((c) => (
                  <li key={c}><button onClick={() => navigate('catalog', { category: c })} className="hover:text-[#f48c06]">{c}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Bantuan</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><button onClick={toggleChat} className="hover:text-[#f48c06]">Chat Admin</button></li>
                <li><button onClick={() => navigate('orders')} className="hover:text-[#f48c06]">Lacak Pesanan</button></li>
                <li><a href="#" className="hover:text-[#f48c06]">Kebijakan Retur</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Pembayaran</h4>
              <div className="bg-white rounded-xl p-4 flex flex-wrap items-center justify-center gap-4 shadow-lg">
                {[
                  { name: 'QRIS', file: 'QRIS.svg' },
                  { name: 'BCA', file: 'BCA.svg' },
                  { name: 'Mandiri', file: 'MANDIRI.svg' },
                  { name: 'BNI', file: 'BNI.svg' },
                  { name: 'BRI', file: 'BRI.svg' },
                  { name: 'Visa', file: 'VISA.svg' },
                  { name: 'Mastercard', file: 'MASTERCARD.svg' },
                  { name: 'GPN', file: 'GPN.svg' },
                ].map((p) => (
                  <div key={p.name} className="h-8 w-14 flex items-center justify-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition">
                    <img 
                      src={`/images/${p.file}`} 
                      alt={p.name} 
                      className="max-h-full max-w-full object-contain" 
                      title={p.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-6 text-sm opacity-70 text-center">
            © 2024 Toko Loka. Dibuat dengan ♥ untuk UMKM Indonesia
          </div>
        </div>
      </footer>

      {/* Chat Widget Floating Button & Panel */}
      <ChatWidget />
    </div>
  )
}