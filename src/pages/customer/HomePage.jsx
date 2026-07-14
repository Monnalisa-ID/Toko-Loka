import { Button, Card, CardBody } from '../../components/ui'
import {
  ArrowRight, MessageCircle, Truck, ShieldCheck, RotateCcw, Star,
  Coffee, Utensils, Shirt, Lamp, Leaf,
} from 'lucide-react'
import { useStore } from '../../store/useStore'
import ProductCard from '../../components/ProductCard'

const categoryIcons = {
  Minuman: Coffee,
  Makanan: Utensils,
  Fashion: Shirt,
  Dekorasi: Lamp,
}

const categoryColors = {
  Minuman: 'from-amber-400 to-orange-500',
  Makanan: 'from-red-400 to-rose-500',
  Fashion: 'from-purple-400 to-pink-500',
  Dekorasi: 'from-teal-400 to-emerald-500',
}

export default function HomePage() {
  const { products, navigate, toggleChat } = useStore()
  const featured = products.slice(0, 8)
  const categories = ['Minuman', 'Makanan', 'Fashion', 'Dekorasi'].map((name) => ({
    name,
    icon: categoryIcons[name],
    color: categoryColors[name],
    count: products.filter((p) => p.category === name).length,
  }))

  return (
    <div>
      {/* Hero */}
      <section className="hero-pattern relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8efe9] text-[#1e3a2b] text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-[#e85d04] animate-pulse-soft" />
                Dukung UMKM Indonesia
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] mb-6">
                Belanja <span className="gradient-text">Lokal</span>,<br />
                Berkualitas <span className="italic">Premium</span>.
              </h1>
              <p className="text-base md:text-lg text-gray-500 mb-8 max-w-lg">
                Temukan produk terbaik dari pengrajin dan petani lokal. Pengiriman cepat, pembayaran mudah, layanan chat 24/7.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  color="primary"
                  size="lg"
                  radius="full"
                  className="font-semibold"
                  endContent={<ArrowRight className="w-4 h-4" />}
                  onClick={() => navigate('catalog')}
                >
                  Mulai Belanja
                </Button>
                <Button
                  variant="bordered"
                  size="lg"
                  radius="full"
                  className="border-[#1e3a2b] text-[#1e3a2b] font-semibold"
                  startContent={<MessageCircle className="w-4 h-4" />}
                  onClick={toggleChat}
                >
                  Chat Admin
                </Button>
              </div>
              <div className="flex gap-6 mt-10">
                <div>
                  <div className="font-display text-3xl font-bold text-[#1e3a2b]">{products.length}+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Produk Lokal</div>
                </div>
                <div className="w-px bg-[#e7e2d8]" />
                <div>
                  <div className="font-display text-3xl font-bold text-[#1e3a2b]">4.9★</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Rating Toko</div>
                </div>
                <div className="w-px bg-[#e7e2d8]" />
                <div>
                  <div className="font-display text-3xl font-bold text-[#1e3a2b]">24/7</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Layanan Chat</div>
                </div>
              </div>
            </div>

            {/*  visual */}
            <div className="relative h-[400px] md:h-[500px] hidden lg:block">
              <div className="absolute top-0 right-0 w-72 h-72 rounded-3xl overflow-hidden shadow-2xl animate-float rotate-3">
                <img src="https://picsum.photos/seed/hero1/600/600.jpg" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-3xl overflow-hidden shadow-2xl animate-float-slow -rotate-6">
                <img src="https://picsum.photos/seed/hero2/600/600.jpg" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full overflow-hidden shadow-2xl animate-float border-8 border-white">
                <img src="https://picsum.photos/seed/hero3/600/600.jpg" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="absolute top-4 left-4 bg-white/85 backdrop-blur rounded-2xl px-4 py-3 shadow-xl animate-float-slow">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Pengiriman</div>
                    <div className="text-sm font-bold">4 Ekspedisi</div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-8 right-4 bg-white/85 backdrop-blur rounded-2xl px-4 py-3 shadow-xl animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-[#e85d04]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Pembayaran</div>
                    <div className="text-sm font-bold">QRIS & Bank</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-[#1e3a2b] text-white py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              <span className="flex items-center gap-2 text-sm"><Truck className="w-4 h-4 text-[#f48c06]" /> Gratis ongkir belanja di atas Rp 200rb</span>
              <span className="flex items-center gap-2 text-sm"><Star className="w-4 h-4 text-[#f48c06]" /> Proses pesanan maksimal 2 jam</span>
              <span className="flex items-center gap-2 text-sm"><ShieldCheck className="w-4 h-4 text-[#f48c06]" /> Pembayaran aman QRIS & Bank</span>
              <span className="flex items-center gap-2 text-sm"><MessageCircle className="w-4 h-4 text-[#f48c06]" /> Chat admin 24/7</span>
              <span className="flex items-center gap-2 text-sm"><Leaf className="w-4 h-4 text-[#f48c06]" /> Produk lokal berkualitas</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Kategori Pilihan</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.name}
                onClick={() => navigate('catalog', { category: cat.name })}
                className={`group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${cat.color} text-white text-left transition hover:scale-[1.03]`}
              >
                <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:opacity-30 transition">
                  <Icon className="w-20 h-20" />
                </div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg">{cat.name}</h3>
                  <p className="text-xs opacity-90">{cat.count} produk</p>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Produk Unggulan</h2>
            <p className="text-gray-500 mt-1">Pilihan terbaik dari toko kami</p>
          </div>
          <Button variant="light" color="primary" endContent={<ArrowRight className="w-4 h-4" />} onClick={() => navigate('catalog')}>
            Lihat Semua
          </Button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-br from-[#1e3a2b] to-[#2d5a3d] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#e85d04]/20 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Kenapa Belanja di Toko Loka?</h2>
              <p className="opacity-90">Kami berkomitmen memberikan pengalaman belanja terbaik dengan dukungan penuh untuk produk lokal Indonesia.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: MessageCircle, title: 'Chat Admin', desc: 'Respons cepat 24/7' },
                { icon: ShieldCheck, title: 'Pembayaran', desc: 'QRIS & Transfer Bank' },
                { icon: Truck, title: 'Pengiriman', desc: '4 ekspedisi pilihan' },
                { icon: RotateCcw, title: 'Retur Mudah', desc: 'Garansi 24 jam' },
              ].map((f) => {
                const Icon = f.icon
                return (
                  <div key={f.title} className="bg-white/10 backdrop-blur rounded-2xl p-4">
                    <div className="w-10 h-10 rounded-xl bg-[#e85d04]/20 flex items-center justify-center mb-2">
                      <Icon className="w-5 h-5 text-[#f48c06]" />
                    </div>
                    <h3 className="font-bold">{f.title}</h3>
                    <p className="text-xs opacity-80">{f.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}