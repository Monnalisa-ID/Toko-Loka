import { useState } from 'react'
import { Button, Card, CardBody, Input, Textarea, RadioGroup, Radio, Divider } from '../../components/ui'
import { MapPin, Truck, Wallet, ChevronRight } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { formatRupiah, toastWarning, toastSuccess } from '../../lib/utils'

export default function CheckoutPage() {
  const { cart, settings, navigate, cartSubtotal, createOrder } = useStore()
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', zip: '' })
  const [selectedExp, setSelectedExp] = useState(null)
  const [payMethod, setPayMethod] = useState('')

  if (cart.length === 0) {
    return <div className="p-8 text-center"><p>Keranjang kosong</p></div>
  }

  const shippingCost = selectedExp ? selectedExp.price : 0
  const total = cartSubtotal() + shippingCost

  const handleCheckout = () => {
    if (!form.name || !form.phone || !form.address || !form.city) {
      toastWarning('Lengkapi alamat pengiriman')
      return
    }
    if (!selectedExp) {
      toastWarning('Pilih ekspedisi pengiriman')
      return
    }
    if (!payMethod) {
      toastWarning('Pilih metode pembayaran')
      return
    }

    const order = createOrder({
      customer: form,
      expedition: {
        id: selectedExp.expId,
        name: selectedExp.expName,
        service: selectedExp.svcName,
        code: selectedExp.svcCode,
        est: selectedExp.est,
      },
      shippingCost: selectedExp.price,
      paymentMethod: payMethod,
    })
    toastSuccess('Pesanan dibuat! Lanjut ke pembayaran')
    navigate('payment', { orderId: order.id })
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <button onClick={() => navigate('home')} className="hover:text-[#1e3a2b]">Beranda</button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={() => navigate('cart')} className="hover:text-[#1e3a2b]">Keranjang</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1a1d2e] font-medium">Checkout</span>
      </div>

      <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Address */}
          <Card className="border border-[#e7e2d8]" shadow="sm">
            <CardBody className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-[#1e3a2b]" /> Alamat Pengiriman</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Nama Lengkap" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input label="Nomor HP" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <Textarea label="Alamat Lengkap" className="md:col-span-2" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                 <Input type="email" label="Email (untuk Invoice)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <Input label="Kota" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                <Input label="Kode Pos" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} />
              </div>
            </CardBody>
          </Card>

          {/* Expedition */}
          <Card className="border border-[#e7e2d8]" shadow="sm">
            <CardBody className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Truck className="w-5 h-5 text-[#1e3a2b]" /> Pilih Ekspedisi</h3>
              <div className="space-y-3">
                {settings.expeditions.map((exp) => (
                  <div key={exp.id} className="border border-[#e7e2d8] rounded-xl overflow-hidden">
                    <div className="px-4 py-3 bg-[#fdfaf3] flex items-center gap-3">
                      <div className="px-3 py-1 rounded bg-[#1e3a2b] text-white text-xs font-bold">{exp.logo}</div>
                      <div className="font-semibold text-sm">{exp.name}</div>
                    </div>
                    <div className="p-3 space-y-2">
                      {exp.services.map((svc) => {
                        const isSelected = selectedExp?.svcCode === svc.code && selectedExp?.expId === exp.id
                        return (
                          <label
                            key={svc.code}
                            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer border-2 transition ${
                              isSelected ? 'border-[#1e3a2b] bg-[#e8efe9]' : 'border-transparent hover:bg-[#fdfaf3]'
                            }`}
                            onClick={() => setSelectedExp({
                              expId: exp.id, expName: exp.name,
                              svcCode: svc.code, svcName: svc.name,
                              est: svc.est, price: svc.price,
                            })}
                          >
                            <div className="flex items-center gap-3">
                              <input type="radio" checked={isSelected} readOnly />
                              <div>
                                <div className="font-medium text-sm">{svc.name}</div>
                                <div className="text-xs text-gray-500">Estimasi {svc.est}</div>
                              </div>
                            </div>
                            <div className="font-semibold text-sm">{formatRupiah(svc.price)}</div>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Payment */}
          <Card className="border border-[#e7e2d8]" shadow="sm">
            <CardBody className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Wallet className="w-5 h-5 text-[#1e3a2b]" /> Metode Pembayaran</h3>
              <RadioGroup value={payMethod} onValueChange={setPayMethod}>
                <div className="space-y-3">
                  <label className={`flex items-center gap-3 border-2 rounded-xl p-4 cursor-pointer transition ${payMethod === 'qris' ? 'border-[#1e3a2b] bg-[#e8efe9]' : 'border-[#e7e2d8]'}`}>
                    <Radio value="qris" />
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">QRIS</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">QRIS</div>
                      <div className="text-xs text-gray-500">Scan & bayar dengan semua e-wallet & m-banking</div>
                    </div>
                  </label>
                  <label className={`flex items-center gap-3 border-2 rounded-xl p-4 cursor-pointer transition ${payMethod === 'bank' ? 'border-[#1e3a2b] bg-[#e8efe9]' : 'border-[#e7e2d8]'}`}>
                    <Radio value="bank" />
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">BANK</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">Transfer Bank</div>
                      <div className="text-xs text-gray-500">BCA, Mandiri, BNI, BRI</div>
                    </div>
                  </label>
                </div>
              </RadioGroup>
            </CardBody>
          </Card>
        </div>

        {/* Summary */}
        <div>
          <Card className="border border-[#e7e2d8] sticky top-24" shadow="sm">
            <CardBody className="p-6">
              <h3 className="font-bold mb-4">Ringkasan Pesanan</h3>
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-2 text-sm">
                    <img src={item.image} className="w-10 h-10 rounded object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="line-clamp-1 text-xs">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.qty} × {formatRupiah(item.price)}</div>
                    </div>
                    <div className="text-xs font-semibold">{formatRupiah(item.price * item.qty)}</div>
                  </div>
                ))}
              </div>
              <Divider className="mb-4" />
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">{formatRupiah(cartSubtotal())}</span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span className="text-gray-500">Ongkir</span>
                <span className="font-semibold">{shippingCost > 0 ? formatRupiah(shippingCost) : 'Pilih ekspedisi'}</span>
              </div>
              <Divider className="mb-4" />
              <div className="flex justify-between items-end mb-4">
                <span className="text-sm">Total</span>
                <span className="font-display text-2xl font-bold text-[#1e3a2b]">{formatRupiah(total)}</span>
              </div>
              <Button color="warning" size="lg" radius="full" className="w-full font-semibold" onClick={handleCheckout}>
                Bayar dengan iPaymu
              </Button>
              <p className="text-xs text-gray-400 text-center mt-2">Anda akan diarahkan ke halaman pembayaran iPaymu</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}