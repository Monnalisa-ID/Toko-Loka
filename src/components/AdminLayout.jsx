import { useState, useEffect } from 'react'
import { Button, Badge } from '../components/ui'
import {
  Leaf, LayoutDashboard, Receipt, Package, MessageSquare, Bot, Settings,
  Store, Menu, X, Bell,
} from 'lucide-react'
import { useStore } from '../store/useStore'

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Pesanan', icon: Receipt },
  { id: 'products', label: 'Produk', icon: Package },
  { id: 'chat', label: 'Chat Pelanggan', icon: MessageSquare },
  { id: 'chatbot', label: 'Pengaturan Bot', icon: Bot },
  { id: 'settings', label: 'Pengaturan', icon: Settings },
]

const adminPages = {
  dashboard: () => import('../pages/admin/DashboardPage'),
  orders: () => import('../pages/admin/OrdersPage'),
  products: () => import('../pages/admin/ProductsPage'),
  chat: () => import('../pages/admin/ChatPage'),
  chatbot: () => import('../pages/admin/ChatbotPage'),
  settings: () => import('../pages/admin/SettingsPage'),
}

export default function AdminLayout() {
  const [PageComponent, setPageComponent] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { adminTab, setAdminTab, switchView, orders, notifications, markNotificationsRead } = useStore()

  useEffect(() => {
    adminPages[adminTab]().then((mod) => setPageComponent(() => mod.default))
  }, [adminTab])

  const paidCount = orders.filter((o) => o.status === 'paid').length
  const unread = notifications.filter((n) => !n.read).length

  const handleTabClick = (tabId) => {
    setAdminTab(tabId)
    setMobileOpen(false)
    if (tabId === 'orders') markNotificationsRead()
  }

  return (
    <div className="min-h-screen flex bg-[#faf6ef]">
      {/* Sidebar */}
      <aside className={`w-64 bg-white border-r border-[#e7e2d8] flex flex-col fixed lg:sticky top-0 h-screen z-50 transition-transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-[#e7e2d8]">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#1e3a2b] flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-display text-lg font-bold">Toko Loka</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Admin Panel</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = adminTab === tab.id
            const badge = tab.id === 'orders' && paidCount > 0 ? paidCount : 0
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive ? 'bg-[#1e3a2b] text-white' : 'hover:bg-[#e8efe9] text-[#1a1d2e]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1 text-left">{tab.label}</span>
                {badge > 0 && (
                  <span className="bg-[#e85d04] text-white text-xs font-bold px-2 py-0.5 rounded-full">{badge}</span>
                )}
                {tab.id === 'orders' && unread > 0 && badge === 0 && (
                  <span className="bg-[#e85d04] text-white text-xs font-bold px-2 py-0.5 rounded-full">{unread}</span>
                )}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-[#e7e2d8]">
          <Button
            variant="light"
            className="w-full justify-start"
            startContent={<Store className="w-5 h-5" />}
            onClick={() => switchView('customer')}
          >
            Kembali ke Toko
          </Button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-[#e7e2d8] px-4 py-3 flex items-center justify-between">
          <button onClick={() => setMobileOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="font-bold">Admin Panel</div>
          <button onClick={() => switchView('customer')}>
            <Store className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 md:p-8">
          {PageComponent ? <PageComponent /> : (
            <div className="flex items-center justify-center h-96">
              <div className="w-8 h-8 border-4 border-[#1e3a2b] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}