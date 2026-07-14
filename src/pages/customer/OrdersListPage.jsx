import { Button, Card, CardBody, Chip } from '../../components/ui'
import { Receipt, ChevronRight } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { formatRupiah, formatDate, formatTime } from '../../lib/utils'

export default function OrdersListPage() {
  const { orders, navigate } = useStore()

  if (orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-[#fdfaf3] flex items-center justify-center mb-6">
          <Receipt className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="font-display text-2xl font-bold mb-2">Belum Ada Pesanan</h2>
        <Button color="primary" size="lg" radius="full" onClick={() => navigate('catalog')}>Mulai Belanja</Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">Riwayat Pesanan</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Card
            key={order.id}
            isPressable
            className="border border-[#e7e2d8] hover:border-[#1e3a2b] transition"
            shadow="sm"
            onClick={() => navigate('order-status', { orderId: order.id })}
          >
            <CardBody className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-semibold text-sm">{order.id}</div>
                  <div className="text-xs text-gray-500">{formatDate(order.createdAt)} • {formatTime(order.createdAt)}</div>
                </div>
                <Chip
                  size="sm"
                  className={`status-${order.status} font-bold`}
                >
                  {order.status === 'pending' ? 'Menunggu Bayar' :
                   order.status === 'paid' ? 'Dibayar' :
                   order.status === 'shipped' ? 'Dikirim' : 'Selesai'}
                </Chip>
              </div>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {order.items.slice(0, 4).map((item) => (
                  <img key={item.id} src={item.image} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                ))}
                {order.items.length > 4 && (
                  <div className="w-12 h-12 rounded-lg bg-[#fdfaf3] flex items-center justify-center text-xs font-bold shrink-0">
                    +{order.items.length - 4}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#e7e2d8]">
                <div className="text-sm">{order.items.length} produk • {order.expedition.name}</div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1e3a2b]">{formatRupiah(order.total)}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}