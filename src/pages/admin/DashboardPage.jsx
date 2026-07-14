import { Card, CardContent, Button, Badge } from '../../components/ui'
import { Receipt, Truck, TrendingUp, Package, Bell, TriangleAlert } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { formatRupiah, formatTime, formatDate } from '../../lib/utils'

export default function DashboardPage() {
  const { orders, products, notifications, setAdminTab } = useStore()

  const totalOrders = orders.length
  const paidOrders = orders.filter((o) => o.status === 'paid').length
  const revenue = orders.filter((o) => o.status !== 'pending').reduce((sum, o) => sum + o.total, 0)
  const lowStock = products.filter((p) => p.stock < 10)
  const recentOrders = orders.slice(0, 5)
  const unread = notifications.filter((n) => !n.read).length

  const stats = [
    { label: 'Total Pesanan', value: totalOrders, icon: Receipt, color: 'bg-blue-500' },
    { label: 'Perlu Dikirim', value: paidOrders, icon: Truck, color: 'bg-orange-500' },
    { label: 'Total Pendapatan', value: formatRupiah(revenue), icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Produk Aktif', value: products.length, icon: Package, color: 'bg-purple-500' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Ringkasan toko Anda hari ini</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" /> Notifikasi
              {unread > 0 && <Badge variant="destructive">{unread}</Badge>}
            </h3>
            {notifications.length === 0 ? (
              <div className="text-center py-6 text-sm text-muted-foreground">Belum ada notifikasi</div>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {notifications.slice(0, 8).map((n) => (
                  <div key={n.id} className={`p-3 rounded-xl ${n.read ? 'bg-muted' : 'bg-orange-50 border border-orange-200'}`}>
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <Receipt className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold">{n.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2">{n.message}</div>
                        <div className="text-[10px] text-muted-foreground mt-1">{formatTime(n.time)} • {formatDate(n.time)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Pesanan Terbaru</h3>
              <Button size="sm" variant="outline" onClick={() => setAdminTab('orders')}>Lihat Semua</Button>
            </div>
            {recentOrders.length === 0 ? (
              <div className="text-center py-8 text-sm text-muted-foreground">Belum ada pesanan</div>
            ) : (
              <div className="space-y-2">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition cursor-pointer"
                    onClick={() => setAdminTab('orders')}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Receipt className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold">{order.id}</div>
                      <div className="text-xs text-muted-foreground">{order.customer.name} • {order.items.length} produk</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{formatRupiah(order.total)}</div>
                      <Badge variant={order.status === 'paid' ? 'warning' : 'secondary'} className="mt-1">
                        {order.status === 'pending' ? 'Pending' : order.status === 'paid' ? 'Siap Kirim' : order.status === 'shipped' ? 'Dikirim' : 'Selesai'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {lowStock.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <h3 className="font-bold mb-3 flex items-center gap-2 text-orange-700">
              <TriangleAlert className="w-5 h-5" /> Stok Menipis
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {lowStock.map((p) => (
                <div key={p.id} className="bg-background rounded-xl p-3 flex items-center gap-3 border">
                  <img src={p.image} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium line-clamp-1">{p.name}</div>
                    <div className="text-xs text-red-600 font-bold">Sisa {p.stock}</div>
                  </div>
                  <Button size="sm" onClick={() => setAdminTab('products')}>Restok</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}