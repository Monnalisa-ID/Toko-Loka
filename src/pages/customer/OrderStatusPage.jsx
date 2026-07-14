import { Button, Card, CardBody, Chip } from '@heroui/react'
import { Clock, CheckCircle2, Truck, PackageOpen, Copy, MessageCircle, ShoppingBag } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { formatRupiah, formatDate, formatTime, toastSuccess } from '../../lib/utils'

export default function OrderStatusPage() {
  const { orders, params, navigate, toggleChat } = useStore()
  const order = orders.find((o) => o.id === params.orderId)

  if (!order) return <div className="p-8 text-center">Pesanan tidak ditemukan</div>

  const steps = [
    { key: 'pending', label: 'Menunggu Bayar', icon: Clock },
    { key: 'paid', label: 'Dibayar', icon: CheckCircle2 },
    { key: 'shipped', label: 'Dikirim', icon: Truck },
    { key: 'completed', label: 'Selesai', icon: PackageOpen },
  ]
  const currentIdx = steps.findIndex((s) => s.key === order.status)

  const copyTracking = () => {
    navigator.clipboard.writeText(order.trackingNumber)
    toastSuccess('Nomor resi disalin')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
          order.status === 'completed' ? 'bg-green-100' : order.status === 'shipped' ? 'bg-blue-100' : order.status === 'paid' ? 'bg-green-100' : 'bg-amber-100'
        }`}>
          {order.status === 'completed' ? <PackageOpen className="w-8 h-8 text-green-600" /> :
           order.status === 'shipped' ? <Truck className="w-8 h-8 text-blue-600" /> :
           order.status === 'paid' ? <CheckCircle2 className="w-8 h-8 text-green-600" /> :
           <Clock className="w-8 h-8 text-amber-500" />}
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-bold mb-1">
          {order.status === 'pending' ? 'Menunggu Pembayaran' :
           order.status === 'paid' ? 'Pembayaran Diterima!' :
           order.status === 'shipped' ? 'Pesanan Dikirim' : 'Pesanan Selesai'}
        </h1>
        <p className="text-gray-500 text-sm">Pesanan {order.id}</p>
      </div>

      {order.status === 'pending' && (
        <Card className="border border-amber-300 bg-amber-50 mb-6">
          <CardBody className="p-4 text-center">
            <p className="text-sm font-medium text-amber-700 mb-3">Selesaikan pembayaran dalam 24 jam</p>
            <Button color="warning" radius="full" onClick={() => navigate('payment', { orderId: order.id })}>Bayar Sekarang</Button>
          </CardBody>
        </Card>
      )}

      {order.status === 'paid' && (
        <Card className="border border-green-300 bg-green-50 mb-6">
          <CardBody className="p-4 text-center">
            <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-green-700">Pembayaran dikonfirmasi otomatis</p>
            <p className="text-xs text-gray-500 mt-1">Admin telah diberi notifikasi untuk segera memproses pesanan</p>
          </CardBody>
        </Card>
      )}

      {order.status === 'shipped' && (
        <Card className="border border-blue-300 bg-blue-50 mb-6">
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Nomor Resi</div>
                <div className="font-mono font-bold">{order.trackingNumber}</div>
              </div>
              <Button size="sm" variant="flat" startContent={<Copy className="w-3 h-3" />} onClick={copyTracking}>Salin</Button>
            </div>
            <div className="mt-2 text-xs text-gray-500">{order.expedition.name} - {order.expedition.service} (Estimasi {order.expedition.est})</div>
          </CardBody>
        </Card>
      )}

      {/* Stepper */}
      <Card className="border border-[#e7e2d8] mb-6" shadow="sm">
        <CardBody className="p-6">
          <div className="relative">
            <div className="absolute top-6 left-6 right-6 h-1 bg-[#e7e2d8] rounded">
              <div className="h-full bg-[#1e3a2b] rounded transition-all duration-500" style={{ width: `${(currentIdx / (steps.length - 1)) * 100}%` }} />
            </div>
            <div className="relative flex justify-between">
              {steps.map((step, idx) => {
                const Icon = step.icon
                return (
                  <div key={step.key} className="flex flex-col items-center text-center" style={{ width: 80 }}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition ${idx <= currentIdx ? 'bg-[#1e3a2b] text-white' : 'bg-[#e7e2d8] text-gray-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className={`text-[10px] font-medium ${idx <= currentIdx ? 'text-[#1a1d2e]' : 'text-gray-400'}`}>{step.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Detail */}
      <Card className="border border-[#e7e2d8] mb-6" shadow="sm">
        <CardBody className="p-6">
          <h3 className="font-bold mb-4">Detail Pesanan</h3>
          <div className="space-y-3 mb-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img src={item.image} className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="text-sm font-medium line-clamp-1">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.qty} × {formatRupiah(item.price)}</div>
                </div>
                <div className="text-sm font-semibold">{formatRupiah(item.price * item.qty)}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-[#e7e2d8] pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatRupiah(order.subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Ongkir ({order.expedition.name})</span><span>{formatRupiah(order.shipping)}</span></div>
            <div className="flex justify-between font-bold text-base pt-2 border-t border-[#e7e2d8]">
              <span>Total</span><span className="text-[#1e3a2b]">{formatRupiah(order.total)}</span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Shipping info */}
      <Card className="border border-[#e7e2d8] mb-6" shadow="sm">
        <CardBody className="p-6">
          <h3 className="font-bold mb-3">Informasi Pengiriman</h3>
          <div className="text-sm space-y-1">
            <div className="font-medium">{order.customer.name}</div>
            <div className="text-gray-500">{order.customer.phone}</div>
            <div className="text-gray-500">{order.customer.address}</div>
            <div className="text-gray-500">{order.customer.city} {order.customer.zip}</div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#e7e2d8] text-sm">
            <span className="text-gray-500">Ekspedisi: </span>
            <span className="font-medium">{order.expedition.name} - {order.expedition.service}</span>
          </div>
        </CardBody>
      </Card>

      <div className="flex gap-3">
        <Button variant="bordered" className="border-[#1e3a2b] text-[#1e3a2b] flex-1" radius="full" startContent={<ShoppingBag className="w-4 h-4" />} onClick={() => navigate('catalog')}>
          Belanja Lagi
        </Button>
        <Button color="primary" className="flex-1" radius="full" startContent={<MessageCircle className="w-4 h-4" />} onClick={toggleChat}>
          Hubungi Admin
        </Button>
      </div>
    </div>
  )
}