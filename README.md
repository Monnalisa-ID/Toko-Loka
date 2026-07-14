<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-5-433D37?style=for-the-badge" />
  <img src="https://img.shields.io/badge/iPaymu-Payment%20Gateway-FF6B00?style=for-the-badge" />
</p>

# 🌿 Toko Loka — Belanja Lokal Terpercaya

**Toko Loka** adalah platform e-commerce modern berbasis React yang dirancang khusus untuk mendukung **UMKM Indonesia**. Aplikasi ini menyediakan pengalaman belanja online lengkap — mulai dari katalog produk, keranjang belanja, checkout dengan pilihan ekspedisi, hingga pembayaran terintegrasi melalui **iPaymu Payment Gateway** (QRIS & Transfer Bank).

> 💡 Aplikasi ini berjalan sepenuhnya di sisi client (SPA) dengan state management menggunakan Zustand dan data yang di-persist di `localStorage`.

---

## ✨ Fitur Utama

### 🛍️ Sisi Pelanggan (Customer)
- **Halaman Beranda** — Hero section, produk unggulan, kategori, dan marquee promo
- **Katalog Produk** — Filter berdasarkan kategori (Minuman, Makanan, Fashion, Dekorasi) dan pencarian
- **Detail Produk** — Galeri gambar, deskripsi, rating, stok, dan tombol beli
- **Keranjang Belanja** — Tambah/kurangi qty, hapus item, ringkasan harga
- **Checkout** — Form alamat pengiriman, pilihan ekspedisi (JNE, J&T, SiCepat, AnterAja), dan metode pembayaran (QRIS / Transfer Bank)
- **Pembayaran iPaymu** — Redirect otomatis ke payment gateway iPaymu untuk pembayaran QRIS dinamis
- **Status Pesanan** — Lacak status pesanan secara real-time (Pending → Dibayar → Dikirim → Selesai)
- **Daftar Pesanan** — Riwayat semua pesanan yang pernah dibuat
- **Chat Widget** — Chatbot otomatis berbasis keyword + eskalasi ke admin

### 🔧 Sisi Admin (Admin Panel)
- **Dashboard** — Ringkasan statistik penjualan, pesanan, dan notifikasi
- **Manajemen Pesanan** — Konfirmasi pembayaran, kirim pesanan, input resi, dan tandai selesai
- **Manajemen Produk** — Tambah, edit, dan hapus produk (CRUD)
- **Chat Pelanggan** — Balas chat pelanggan secara langsung
- **Pengaturan Chatbot** — Kelola aturan keyword-response untuk chatbot otomatis
- **Pengaturan Toko** — Info toko, konfigurasi iPaymu (VA & API Key), rekening bank manual, dan ekspedisi pengiriman

---

## 🛠️ Tech Stack

| Teknologi | Versi | Keterangan |
|---|---|---|
| [React](https://react.dev) | 19 | Library UI berbasis komponen |
| [Vite](https://vite.dev) | 8 | Build tool & dev server cepat |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Utility-first CSS framework |
| [Zustand](https://zustand.docs.pmnd.rs) | 5 | State management ringan dengan persist middleware |
| [Framer Motion](https://motion.dev) | 12 | Library animasi untuk React |
| [Lucide React](https://lucide.dev) | 1.24 | Icon library modern |
| [Sonner](https://sonner.emilkowal.ski) | 2 | Toast notification |
| [CryptoJS](https://github.com/brix/crypto-js) | 4.2 | Enkripsi untuk signature iPaymu |
| [iPaymu](https://ipaymu.com) | API v2 | Payment gateway Indonesia (QRIS, VA, Transfer) |

---

## 📁 Struktur Proyek

```
toko-loka/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── images/              # Logo bank & payment (BCA, BNI, BRI, QRIS, dll.)
├── src/
│   ├── assets/               # Asset statis (hero, logo)
│   ├── components/
│   │   ├── ui.jsx            # Komponen UI reusable (Button, Card, Modal, Input, dll.)
│   │   ├── ProductCard.jsx   # Kartu produk untuk katalog
│   │   ├── ChatWidget.jsx    # Widget chat floating
│   │   ├── CustomerLayout.jsx # Layout utama pelanggan (header, footer, routing)
│   │   └── AdminLayout.jsx   # Layout admin panel (sidebar, navigasi tab)
│   ├── data/
│   │   └── seedData.js       # Data awal produk, bank, ekspedisi, chatbot rules
│   ├── lib/
│   │   └── utils.js          # Utility: cn(), formatRupiah(), formatDate(), dll.
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── OrdersPage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   ├── ChatbotPage.jsx
│   │   │   └── SettingsPage.jsx
│   │   └── customer/
│   │       ├── HomePage.jsx
│   │       ├── CatalogPage.jsx
│   │       ├── ProductPage.jsx
│   │       ├── CartPage.jsx
│   │       ├── CheckoutPage.jsx
│   │       ├── PaymentPage.jsx
│   │       ├── PaymentReturnPage.jsx
│   │       ├── OrderStatusPage.jsx
│   │       └── OrdersListPage.jsx
│   ├── store/
│   │   └── useStore.js       # Zustand store (state + actions)
│   ├── App.jsx               # Root component (routing customer/admin)
│   ├── App.css               # Styling tambahan
│   ├── index.css             # Global CSS + Tailwind + CSS variables
│   └── main.jsx              # Entry point React
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── eslint.config.js
```

---

## 🚀 Cara Menjalankan

### Prasyarat

- **Node.js** versi 18 atau lebih baru
- **npm** (sudah termasuk dengan Node.js)

### Instalasi

```bash
# 1. Clone repository
git clone https://github.com/username/toko-loka.git
cd toko-loka

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Aplikasi akan berjalan di **http://localhost:3000** dan otomatis terbuka di browser.

### Build untuk Produksi

```bash
npm run build
npm run preview
```

---

## ⚙️ Konfigurasi iPaymu

Toko Loka terintegrasi dengan [iPaymu](https://ipaymu.com) sebagai payment gateway. Untuk mengaktifkan fitur pembayaran:

### 1. Daftar di iPaymu

1. Buat akun merchant di [ipaymu.com](https://ipaymu.com)
2. Dapatkan **Virtual Account (VA)** dan **API Key** dari dashboard merchant

### 2. Konfigurasi di Aplikasi

Masuk ke **Admin Panel** → **Pengaturan** → **Konfigurasi Payment Gateway (iPaymu)**:

| Field | Keterangan |
|---|---|
| **iPaymu Virtual Account** | VA yang diberikan oleh iPaymu |
| **iPaymu API Key** | API Key dari dashboard merchant |
| **Mode Environment** | `Sandbox` untuk testing, `Production` untuk live |

### 3. Alur Pembayaran

```
Pelanggan Checkout → Buat Pesanan → Redirect ke iPaymu
→ Pelanggan Bayar (QRIS/VA) → Redirect Kembali ke Toko
→ Admin Konfirmasi Pembayaran → Proses Pengiriman
```

> ⚠️ **Catatan:** Untuk mode sandbox, gunakan VA dan API Key dari environment sandbox iPaymu. Notifikasi webhook (`notifyUrl`) membutuhkan backend server terpisah untuk verifikasi otomatis.

---

## 📖 Panduan Penggunaan

### Beralih antara Customer & Admin

- Dari **halaman pelanggan**: klik tombol **"Mode Admin"** di header
- Dari **panel admin**: klik **"Kembali ke Toko"** di sidebar

### Mengelola Produk

1. Buka **Admin Panel** → **Produk**
2. Klik **Tambah Produk** untuk menambah produk baru
3. Isi nama, kategori, harga, stok, deskripsi, dan URL gambar
4. Klik ikon edit/hapus untuk mengubah atau menghapus produk

### Memproses Pesanan

1. Pelanggan checkout dan bayar melalui iPaymu
2. Di **Admin Panel** → **Pesanan**, klik **Konfirmasi Bayar** setelah pembayaran masuk
3. Klik **Kirim** dan masukkan nomor resi pengiriman
4. Klik **Selesai** setelah paket diterima pelanggan

### Mengatur Chatbot

1. Buka **Admin Panel** → **Pengaturan Bot**
2. Tambahkan aturan baru dengan format: **Keywords** (dipisah koma) → **Response**
3. Jika tidak ada keyword yang cocok, chat otomatis di-eskalasi ke admin

---

## 🎨 Desain

- **Font**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) + [Fraunces](https://fonts.google.com/specimen/Fraunces)
- **Palet Warna**: Tema hijau alami (`#1e3a2b`) dengan aksen oranye (`#e85d04`) dan latar warm beige (`#faf6ef`)
- **Pendekatan UI**: Glassmorphism, smooth transitions, dan layout responsif
- **Ikon**: [Lucide Icons](https://lucide.dev)

---

## 📜 Script yang Tersedia

| Script | Perintah | Keterangan |
|---|---|---|
| Development | `npm run dev` | Jalankan dev server di port 3000 |
| Build | `npm run build` | Build untuk produksi |
| Preview | `npm run preview` | Preview hasil build |
| Lint | `npm run lint` | Jalankan ESLint |

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:

1. **Fork** repository ini
2. Buat **branch** baru (`git checkout -b fitur/fitur-baru`)
3. **Commit** perubahan (`git commit -m "Tambah fitur baru"`)
4. **Push** ke branch (`git push origin fitur/fitur-baru`)
5. Buat **Pull Request**

---

## 📄 Lisensi

Project ini bersifat open-source dan tersedia di bawah [MIT License](LICENSE).

---

<p align="center">
  Dibuat dengan ♥ untuk UMKM Indonesia 🇮🇩
</p>
