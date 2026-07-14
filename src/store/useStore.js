import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedData } from '../data/seedData'

export const useStore = create(
persist(
    (set, get) => ({
    // ─── Navigation ───
    view: 'customer',
    page: 'home',
    params: {},
    adminTab: 'dashboard',
    chatOpen: false,

      // ─── Data ───
    cart: [],
    products: seedData.products,
    orders: [],
    chat: {
        messages: [{
        from: 'bot',
        text: 'Halo! Selamat datang di Toko Loka. Saya asisten virtual Anda. Ada yang bisa saya bantu?',
        time: new Date().toISOString(),
        }],
        mode: 'bot',
    },
    notifications: [],
    settings: seedData.settings,

      // ─── Navigation Actions ───
    navigate: (page, params = {}) => set({ page, params }),
    switchView: (view) => set({ view, ...(view === 'admin' ? { adminTab: 'dashboard' } : {}) }),
    setAdminTab: (tab) => set({ adminTab: tab }),
    toggleChat: () => set((s) => ({ chatOpen: !s.chatOpen })),
    setChatOpen: (val) => set({ chatOpen: val }),

      // ─── Cart Actions ───
    addToCart: (productId, qty = 1) => {
        const product = get().products.find((p) => p.id === productId)
        if (!product) return
        const cart = [...get().cart]
        const existing = cart.find((c) => c.id === productId)
        if (existing) {
        existing.qty = Math.min(existing.qty + qty, product.stock)
        } else {
        cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty, stock: product.stock })
        }
        set({ cart })
    },
    updateCartQty: (productId, qty) => {
        if (qty <= 0) {
        set({ cart: get().cart.filter((c) => c.id !== productId) })
        } else {
        set({ cart: get().cart.map((c) => (c.id === productId ? { ...c, qty: Math.min(qty, c.stock) } : c)) })
        }
    },
    removeFromCart: (productId) => set({ cart: get().cart.filter((c) => c.id !== productId) }),
    cartCount: () => get().cart.reduce((sum, item) => sum + item.qty, 0),
      cartSubtotal: () => get().cart.reduce((sum, item) => sum + item.price * item.qty, 0),

      // ─── Order Actions ───
    createOrder: (checkoutData) => {
        const subtotal = get().cart.reduce((sum, item) => sum + item.price * item.qty, 0)
        const order = {
        id: 'ORD-' + Date.now().toString().slice(-8),
        items: [...get().cart],
        subtotal,
        shipping: checkoutData.shippingCost,
        total: subtotal + checkoutData.shippingCost,
        customer: checkoutData.customer,
        expedition: checkoutData.expedition,
        paymentMethod: checkoutData.paymentMethod,
        status: 'pending',
        createdAt: new Date().toISOString(),
        paidAt: null,
        shippedAt: null,
        completedAt: null,
        trackingNumber: null,
        ipaymuTrxId: null,
        }
        set({ orders: [order, ...get().orders], cart: [] })
        return order
    },
    updateOrderIpaymuTrxId: (orderId, trxId) => set({
        orders: get().orders.map((o) => (o.id === orderId ? { ...o, ipaymuTrxId: trxId } : o))
    }),
    confirmPayment: (orderId) => {
        const order = get().orders.find((o) => o.id === orderId)
        if (!order) return
        set({
        orders: get().orders.map((o) =>
        o.id === orderId ? { ...o, status: 'paid', paidAt: new Date().toISOString() } : o
        ),
        notifications: [
            {
            id: 'N' + Date.now(),
            type: 'payment',
            title: 'Pembayaran Diterima',
            message: `Pesanan ${orderId} telah dibayar Rp ${order.total.toLocaleString('id-ID')}. Segera proses pengiriman!`,
            orderId,
            time: new Date().toISOString(),
            read: false,
            },
            ...get().notifications,
        ],
        })
    },
    shipOrder: (orderId, trackingNumber) => {
        set({
        orders: get().orders.map((o) =>
        o.id === orderId
            ? { ...o, status: 'shipped', trackingNumber: trackingNumber || 'TRK' + Date.now().toString().slice(-10), shippedAt: new Date().toISOString() }
            : o
        ),
        })
    },
    completeOrder: (orderId) => {
        set({
        orders: get().orders.map((o) =>
        o.id === orderId ? { ...o, status: 'completed', completedAt: new Date().toISOString() } : o
        ),
        })
    },

      // ─── Chat Actions ───
sendChatMessage: (text) => {
        if (!text.trim()) return
        const messages = [...get().chat.messages, { from: 'customer', text, time: new Date().toISOString() }]
        set({ chat: { ...get().chat, messages } })

        setTimeout(() => {
        const lowerText = text.toLowerCase()
        const rules = get().settings.chatbotRules
        let found = false
        for (const rule of rules) {
            const keywords = rule.keywords.split(',').map((k) => k.trim().toLowerCase())
            if (keywords.some((kw) => lowerText.includes(kw))) {
            set({ chat: { ...get().chat, messages: [...get().chat.messages, { from: 'bot', text: rule.response, time: new Date().toISOString() }] } })
            found = true
            break
            }
        }
        if (!found) {
            set({
            chat: {
                mode: 'admin',
                messages: [...get().chat.messages, { from: 'bot', text: 'Maaf, saya belum bisa menjawab pertanyaan tersebut. Menghubungkan Anda dengan admin toko kami...', time: new Date().toISOString() }],
            },
            })
            setTimeout(() => {
            set({
                chat: {
                ...get().chat,
                messages: [...get().chat.messages, { from: 'admin', text: 'Halo! Admin Toko Loka di sini. Ada yang bisa saya bantu?', time: new Date().toISOString() }],
                },
            })
            }, 1500)
        }
        }, 800)
    },
    adminReplyChat: (text) => {
        set({ chat: { ...get().chat, messages: [...get().chat.messages, { from: 'admin', text, time: new Date().toISOString() }] } })
    },
    setChatMode: (mode) => {
        const chat = get().chat
        if (chat.messages.length <= 1) {
        const welcomeMsg = mode === 'bot'
            ? 'Halo! Saya Bot asisten Toko Loka. Ada yang bisa saya bantu?'
            : 'Halo! Admin Toko Loka di sini. Ada yang bisa saya bantu?'
        set({ chat: { mode, messages: [{ from: mode === 'bot' ? 'bot' : 'admin', text: welcomeMsg, time: new Date().toISOString() }] } })
        } else {
        set({ chat: { ...chat, mode } })
        }
    },

      // ─── Product Actions ───
    addProduct: (product) => set({ products: [...get().products, { ...product, id: Date.now(), rating: 5.0, sold: 0 }] }),
    updateProduct: (id, updates) => set({ products: get().products.map((p) => (p.id === id ? { ...p, ...updates } : p)) }),
    deleteProduct: (id) => set({ products: get().products.filter((p) => p.id !== id) }),

      // ─── Chatbot Rule Actions ───
    addChatbotRule: (rule) => set({ settings: { ...get().settings, chatbotRules: [...get().settings.chatbotRules, { ...rule, id: Date.now() }] } }),
    updateChatbotRule: (id, updates) => set({ settings: { ...get().settings, chatbotRules: get().settings.chatbotRules.map((r) => (r.id === id ? { ...r, ...updates } : r)) } }),
    deleteChatbotRule: (id) => set({ settings: { ...get().settings, chatbotRules: get().settings.chatbotRules.filter((r) => r.id !== id) } }),

      // ─── Bank Actions ───
    addBank: (bank) => set({ settings: { ...get().settings, banks: [...get().settings.banks, { ...bank, id: 'b' + Date.now() }] } }),
    deleteBank: (id) => set({ settings: { ...get().settings, banks: get().settings.banks.filter((b) => b.id !== id) } }),

      // ─── Expedition Actions ───
    addExpedition: (expedition) => set({ settings: { ...get().settings, expeditions: [...get().settings.expeditions, { ...expedition, id: 'exp' + Date.now() }] } }),
    deleteExpedition: (id) => set({ settings: { ...get().settings, expeditions: get().settings.expeditions.filter((e) => e.id !== id) } }),

      // ─── Store Info ───
    updateStoreInfo: (info) => set({ settings: { ...get().settings, storeInfo: info } }),

      // ─── Notifications ───
    markNotificationsRead: () => set({ notifications: get().notifications.map((n) => ({ ...n, read: true })) }),
    unreadNotifications: () => get().notifications.filter((n) => !n.read).length,
    }),
    { name: 'tokoloka-storage' }
)
)