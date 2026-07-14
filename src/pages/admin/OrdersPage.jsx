import { useState } from 'react'
import { Button, Card, CardContent, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure } from '../../components/ui'
import { Truck, CheckCircle2, Eye } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { formatRupiah, formatDate, formatTime, toastSuccess } from '../../lib/utils'

export default function OrdersPage() {
  const { orders, confirmPayment, shipOrder, completeOrder } = useStore()
  const [filter, setFilter] = useState('all')
  const [shipOrderId, setShipOrderId] = useState(null)
  const [tracking, setTracking] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter)

  const tabs = [
    { id: 'all', label: 'Semua' },
    { id: 'pending', label: 'Menunggu Bayar' },
    { id: 'paid', label: 'Siap Dikirim' },
    { id: 'shipped', label: 'Dikirim' },
    { id: 'completed', label: 'Selesai' },
  ]

  const handleShip = () => {
    shipOrder(shipOrderId, tracking)
    onClose()
    setTracking('')
    setShipOrderId(null)
    toastSuccess('Pesanan dikirim')
  }

  const openShip = (orderId) => {
    setShipOrderId(orderId)
    onOpen()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Pesanan</h1>
        <p className="text-gray-500 text-sm">Kelola semua pesanan toko</p>
      </div>

      {/* Filter */}
      <div className="flex gap-1 border-b border-[#e7e2d8] overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const count = tab.id === 'all' ? orders.length : orders.filter((o) => o.status === tab.id).length
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                filter === tab.id ? 'border-[#1e3a2b] text-[#1e3a2b]' : 'border-transparent text-gray-500 hover:text-[#1a1d2e]'
              }`}
            >
              {tab.label} {count > 0 && `(${count})`}
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">Tidak ada pesanan</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => (
            <Card key={order.id} className={`border ${order.status === 'paid' ? 'border-[#e85d04] ring-2 ring-[#e85d04]/20' : 'border-[#e7e2d8]'}`} shadow="sm">
              <CardContent className="p-5">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold">{order.id}</span>
                      <Chip size="sm" className={`status-${order.status} font-bold`}>
                        {order.status === 'pending' ? 'Menunggu Bayar' : order.status === 'paid' ? 'SIAP DIKIRIM' : order.status === 'shipped' ? 'Dikirim' : 'Selesai'}
                      </Chip>
                    </div>
                    <div className="text-xs text-gray-500">{formatDate(order.createdAt)} • {formatTime(order.createdAt)}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-xl font-bold text-[#1e3a2b]">{formatRupiah(order.total)}</div>
                    <div className="text-xs text-gray-500">{order.paymentMethod === 'qris' ? 'QRIS' : 'Transfer Bank'}</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="text-sm">
                    <div className="text-xs text-gray-500 mb-1">Penerima</div>
                    <div className="font-medium">{order.customer.name}</div>
                    <div className="text-xs text-gray-500">{order.customer.phone}</div>
                    <div className="text-xs text-gray-500">{order.customer.address}, {order.customer.city} {order.customer.zip}</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-xs text-gray-500 mb-1">Pengiriman</div>
                    <div className="font-medium">{order.expedition.name} - {order.expedition.service}</div>
                    <div className="text-xs text-gray-500">Estimasi {order.expedition.est}</div>
                    {order.trackingNumber && <div className="text-xs mt-1">Resi: <span className="font-mono font-bold">{order.trackingNumber}</span></div>}
                  </div>
                </div>

                <div className="border-t border-[#e7e2d8] pt-3 flex gap-2 overflow-x-auto scrollbar-hide">
                  {order.items.map((item) => (
                    <div key={item.id} className="shrink-0 flex items-center gap-2 bg-[#faf6ef] rounded-lg p-2">
                      <img src={item.image} className="w-10 h-10 rounded object-cover" />
                      <div className="text-xs">
                        <div className="font-medium line-clamp-1 max-w-[120px]">{item.name}</div>
                        <div className="text-gray-500">{item.qty}×</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#e7e2d8] mt-3 pt-3 flex flex-wrap gap-2 justify-end">
                  {order.status === 'pending' && (
                    <Button size="sm" color="success" startContent={<CheckCircle2 className="w-3 h-3" />} onClick={() => { confirmPayment(order.id); toastSuccess('Pembayaran dikonfirmasi') }}>
                      Konfirmasi Pembayaran
                    </Button>
                  )}
                  {order.status === 'paid' && (
                    <Button size="sm" color="warning" startContent={<Truck className="w-3 h-3" />} onClick={() => openShip(order.id)}>
                      Proses Pengiriman
                    </Button>
                  )}
                  {order.status === 'shipped' && (
                    <Button size="sm" color="success" startContent={<CheckCircle2 className="w-3 h-3" />} onClick={() => { completeOrder(order.id); toastSuccess('Pesanan selesai') }}>
                      Tandai Selesai
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Ship Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Proses Pengiriman</ModalHeader>
          <ModalBody>
            <Input
              label="Nomor Resi (opsional)"
              placeholder="Auto-generate jika dikosongkan"
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
            />
            <p className="text-xs text-gray-500">Kosongkan untuk auto-generate nomor resi</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={onClose}>Batal</Button>
            <Button color="warning" onClick={handleShip}>Kirim</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}