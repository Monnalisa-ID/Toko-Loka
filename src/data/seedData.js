export const seedData = {
  products: [
    { id: 1, name: 'Kopi Arabika Gayo 250gr', category: 'Minuman', price: 65000, stock: 50, desc: 'Kopi arabika premium dari dataran tinggi Gayo, Aceh. Aroma floral dengan body medium, cocok untuk pour-over dan espresso.', image: 'https://picsum.photos/seed/kopiarabika/600/600.jpg', rating: 4.9, sold: 320 },
    { id: 2, name: 'Madu Hutan Sumbawa 500ml', category: 'Makanan', price: 85000, stock: 30, desc: 'Madu murni hutan Sumbawa, dipanen langsung oleh peternak lokal tanpa pemanis buatan.', image: 'https://picsum.photos/seed/maduhutan/600/600.jpg', rating: 4.8, sold: 215 },
    { id: 3, name: 'Keripik Singkong Pedas Balado', category: 'Makanan', price: 25000, stock: 100, desc: 'Keripik singkong renyah dengan bumbu balado pedas khas Padang.', image: 'https://picsum.photos/seed/keripikbalado/600/600.jpg', rating: 4.7, sold: 540 },
    { id: 4, name: 'Batik Tulis Madura Asli', category: 'Fashion', price: 350000, stock: 15, desc: 'Batik tulis handmade asli Madura dengan motif klasik dan pewarna alam.', image: 'https://picsum.photos/seed/batikmadura/600/600.jpg', rating: 5.0, sold: 89 },
    { id: 5, name: 'Tas Rattan Handmade Lombok', category: 'Fashion', price: 175000, stock: 25, desc: 'Tas rotan anyaman tangan pengrajin Lombok, dilengkapi strap kulit premium.', image: 'https://picsum.photos/seed/tasrotan/600/600.jpg', rating: 4.9, sold: 156 },
    { id: 6, name: 'Gula Aren Cair 1 Liter', category: 'Makanan', price: 45000, stock: 60, desc: 'Gula aren cair murni untuk pemanis kopi dan minuman, tanpa pengawet.', image: 'https://picsum.photos/seed/gulaaren/600/600.jpg', rating: 4.8, sold: 410 },
    { id: 7, name: 'Teh Hijau Gunung Halu 100gr', category: 'Minuman', price: 55000, stock: 40, desc: 'Teh hijau dari perkebunan Gunung Halu Bandung, dipetik tangan.', image: 'https://picsum.photos/seed/tehhijau/600/600.jpg', rating: 4.7, sold: 198 },
    { id: 8, name: 'Songket Palembang Klasik', category: 'Fashion', price: 450000, stock: 8, desc: 'Kain songket Palembang tenunan tangan dengan benang emas.', image: 'https://picsum.photos/seed/songketpalembang/600/600.jpg', rating: 5.0, sold: 45 },
    { id: 9, name: 'Talam Jati Ukir Premium', category: 'Dekorasi', price: 125000, stock: 20, desc: 'Talam kayu jati ukir tangan untuk dekorasi atau nampan saji.', image: 'https://picsum.photos/seed/talamjati/600/600.jpg', rating: 4.8, sold: 78 },
    { id: 10, name: 'Sambal Bawang Bu Rudy', category: 'Makanan', price: 35000, stock: 75, desc: 'Sambal bawang khas Surabaya, pedas nikmat untuk pelengkap makanan.', image: 'https://picsum.photos/seed/sambalburudy/600/600.jpg', rating: 4.9, sold: 680 },
    { id: 11, name: 'Lilin Aromaterapi Lavender', category: 'Dekorasi', price: 48000, stock: 35, desc: 'Lilin aromaterapi dengan essential oil lavender untuk relaksasi.', image: 'https://picsum.photos/seed/lilinaroma/600/600.jpg', rating: 4.6, sold: 132 },
    { id: 12, name: 'Topi Bambu Pertanian', category: 'Fashion', price: 38000, stock: 45, desc: 'Topi bambu anyaman tangan, cocok untuk aktivitas outdoor.', image: 'https://picsum.photos/seed/topibambu/600/600.jpg', rating: 4.5, sold: 95 },
  ],
  settings: {
    storeInfo: {
      name: 'Toko Loka',
      address: 'Jl. Malioboro No. 123, Yogyakarta',
      phone: '0812-3456-7890',
      email: 'hello@tokoloka.id',
    },
    ipaymu: {
      sandbox: true,
      va: 'YOUR_VA_HERE', // Ganti dengan VA iPaymu Anda
      apiKey: 'YOUR_API_KEY_HERE' // Ganti dengan API Key iPaymu Anda
    },
    banks: [
      { id: 'bca', bank: 'BCA', number: '1234567890', name: 'Toko Loka', color: '#005FAB', logo: 'BCA' },
      { id: 'mandiri', bank: 'Mandiri', number: '0987654321', name: 'Toko Loka', color: '#003A70', logo: 'MDR' },
      { id: 'bni', bank: 'BNI', number: '1122334455', name: 'Toko Loka', color: '#F37021', logo: 'BNI' },
      { id: 'bri', bank: 'BRI', number: '9988776655', name: 'Toko Loka', color: '#00529B', logo: 'BRI' },
    ],
    expeditions: [
      { id: 'jne', name: 'JNE Express', logo: 'JNE', services: [
        { code: 'REG', name: 'Regular', est: '2-3 hari', price: 12000 },
        { code: 'YES', name: 'Yakin Esok Sampai', est: '1 hari', price: 25000 },
      ]},
      { id: 'jnt', name: 'J&T Express', logo: 'J&T', services: [
        { code: 'EZ', name: 'Express', est: '2-3 hari', price: 11000 },
        { code: 'ECO', name: 'Economy', est: '4-5 hari', price: 8000 },
      ]},
      { id: 'sicepat', name: 'SiCepat', logo: 'SCP', services: [
        { code: 'REG', name: 'Regular', est: '2-3 hari', price: 10000 },
        { code: 'BEST', name: 'Besok Sampai', est: '1 hari', price: 22000 },
      ]},
      { id: 'anteraja', name: 'AnterAja', logo: 'ANT', services: [
        { code: 'REG', name: 'Regular', est: '2-3 hari', price: 10500 },
        { code: 'NDS', name: 'Next Day Service', est: '1 hari', price: 24000 },
      ]},
    ],
    chatbotRules: [
      { id: 1, keywords: 'halo, hai, hello, hi', response: 'Halo! Selamat datang di Toko Loka. Ada yang bisa saya bantu? Kami siap melayani kebutuhan belanja Anda.' },
      { id: 2, keywords: 'kirim, ongkir, pengiriman, ekspedisi', response: 'Kami menggunakan JNE, J&T, SiCepat, dan AnterAja. Tarif mulai Rp 8.000 tergantung tujuan dan layanan. Pilih saat checkout ya!' },
      { id: 3, keywords: 'bayar, pembayaran, transfer, qris', response: 'Pembayaran bisa melalui QRIS (semua e-wallet & m-banking) atau Transfer Bank (BCA, Mandiri, BNI, BRI). Pesanan otomatis dikonfirmasi setelah pembayaran.' },
      { id: 4, keywords: 'jam, buka, tutup, operasional', response: 'Toko online kami buka 24 jam. Untuk chat dengan admin, jam operasional 08.00-21.00 WIB.' },
      { id: 5, keywords: 'kembali, refund, retur', response: 'Barang dapat dikembalikan jika rusak/cacat dengan bukti foto dalam 1x24 jam setelah diterima.' },
      { id: 6, keywords: 'lokasi, alamat, toko', response: 'Toko Loka berlokasi di Jl. Malioboro No. 123, Yogyakarta. Kunjungi kami kapan saja!' },
      { id: 7, keywords: 'promo, diskon, sale, murah', response: 'Cek halaman utama untuk promo terbaru! Ada diskon spesial setiap minggu dan gratis ongkir untuk pembelian di atas Rp 200.000.' },
      { id: 8, keywords: 'stok, tersedia, habis', response: 'Stok produk ditampilkan real-time di halaman setiap produk. Jika stok habis, Anda bisa chat admin untuk info restock.' },
    ],
  },
}