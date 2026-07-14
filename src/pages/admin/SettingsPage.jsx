import { useState } from 'react'
import {
  Button, Card, CardBody, Input, Divider, Chip, Switch,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
} from '../../components/ui'
import { Store, Wallet, Building2, Truck, QrCode, Plus, Trash2 } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { formatRupiah, toastSuccess } from '../../lib/utils'

export default function SettingsPage() {
  const { settings, updateStoreInfo, addBank, deleteBank, addExpedition, deleteExpedition } = useStore()
  
  // State untuk form toko
  const [storeForm, setStoreForm] = useState(settings.storeInfo)
  
  // State untuk form iPaymu
  const [ipaymuForm, setIpaymuForm] = useState(settings.ipaymu || { sandbox: true, va: '', apiKey: '' })

  // Modal Bank
  const bankModal = useDisclosure()
  const [bankForm, setBankForm] = useState({ bank: '', logo: '', number: '', name: '', color: '#005FAB' })

  // Modal Ekspedisi
  const expModal = useDisclosure()
  const [expForm, setExpForm] = useState({ name: '', logo: '', services: [{ name: '', est: '', price: '' }] })

  const handleSaveStore = () => {
    updateStoreInfo(storeForm)
    toastSuccess('Informasi toko disimpan')
  }

  const handleSaveIpaymu = () => {
    // Karena di useStore belum ada updateIpaymuConfig, kita gunakan set langsung 
    // atau Anda bisa menambahkan action updateIpaymuConfig di useStore.js
    useStore.setState((state) => ({
      settings: {
        ...state.settings,
        ipaymu: ipaymuForm
      }
    }))
    toastSuccess('Konfigurasi iPaymu disimpan')
  }

  const handleSaveBank = () => {
    if (!bankForm.bank || !bankForm.number) return
    addBank(bankForm)
    setBankForm({ bank: '', logo: '', number: '', name: '', color: '#005FAB' })
    bankModal.onClose()
    toastSuccess('Rekening ditambahkan')
  }

  const handleSaveExp = () => {
    if (!expForm.name || !expForm.logo) return
    const services = expForm.services
      .filter((s) => s.name && s.price)
      .map((s) => ({ code: s.name.substring(0, 3).toUpperCase(), name: s.name, est: s.est, price: parseInt(s.price) }))
    if (services.length === 0) return
    addExpedition({ name: expForm.name, logo: expForm.logo, services })
    setExpForm({ name: '', logo: '', services: [{ name: '', est: '', price: '' }] })
    expModal.onClose()
    toastSuccess('Ekspedisi ditambahkan')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Pengaturan Toko</h1>
        <p className="text-gray-500 text-sm">Kelola informasi toko, payment gateway, dan ekspedisi</p>
      </div>

      {/* Store Info */}
      <Card className="border border-[#e7e2d8]" shadow="sm">
        <CardBody className="p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2"><Store className="w-5 h-5 text-[#1e3a2b]" /> Informasi Toko</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Nama Toko" value={storeForm.name} onChange={(e) => setStoreForm({ ...storeForm, name: e.target.value })} />
            <Input label="No. Telepon" value={storeForm.phone} onChange={(e) => setStoreForm({ ...storeForm, phone: e.target.value })} />
            <Input label="Email" value={storeForm.email} onChange={(e) => setStoreForm({ ...storeForm, email: e.target.value })} />
            <Input label="Alamat" value={storeForm.address} onChange={(e) => setStoreForm({ ...storeForm, address: e.target.value })} />
          </div>
          <Button color="primary" className="mt-4" onClick={handleSaveStore}>Simpan</Button>
        </CardBody>
      </Card>

      {/* iPaymu Config */}
      <Card className="border border-[#e7e2d8]" shadow="sm">
        <CardBody className="p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2"><Wallet className="w-5 h-5 text-[#1e3a2b]" /> Konfigurasi Payment Gateway (iPaymu)</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Input 
              label="iPaymu Virtual Account (VA)" 
              placeholder="000000xxxxxx" 
              value={ipaymuForm.va} 
              onChange={(e) => setIpaymuForm({ ...ipaymuForm, va: e.target.value })} 
            />
            <Input 
              label="iPaymu API Key" 
              type="password" 
              placeholder="Masukkan API Key" 
              value={ipaymuForm.apiKey} 
              onChange={(e) => setIpaymuForm({ ...ipaymuForm, apiKey: e.target.value })} 
            />
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Mode Environment</label>
              <div className="flex items-center gap-3 h-12 px-3 border border-[#e7e2d8] rounded-xl">
                <span className="text-sm font-medium">Production (Live)</span>
                <Switch 
                  isSelected={ipaymuForm.sandbox} 
                  onValueChange={(val) => setIpaymuForm({ ...ipaymuForm, sandbox: val })} 
                />
                <span className="text-sm font-medium">Sandbox (Testing)</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Dapatkan VA & API Key di dashboard merchant iPaymu Anda. Pastikan URL Return sudah diatur ke halaman pembayaran toko Anda.</p>
          <Button color="primary" className="mt-4" onClick={handleSaveIpaymu}>Simpan Konfigurasi</Button>
        </CardBody>
      </Card>

      {/* Banks (Manual Transfer - Opsional jika iPaymu gagal) */}
      <Card className="border border-[#e7e2d8]" shadow="sm">
        <CardBody className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2"><Building2 className="w-5 h-5 text-[#1e3a2b]" /> Rekening Bank Manual</h3>
            <Button size="sm" color="primary" variant="flat" startContent={<Plus className="w-3 h-3" />} onClick={bankModal.onOpen}>Tambah</Button>
          </div>
          <div className="space-y-2">
            {settings.banks.map((b) => (
              <div key={b.id} className="flex items-center justify-between p-3 bg-[#faf6ef] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-2 rounded text-white text-xs font-bold" style={{ background: b.color }}>{b.logo}</div>
                  <div>
                    <div className="font-semibold text-sm">{b.bank}</div>
                    <div className="text-xs text-gray-500 font-mono">{b.number} a.n. {b.name}</div>
                  </div>
                </div>
                <Button isIconOnly size="sm" variant="light" color="danger" onClick={() => { deleteBank(b.id); toastSuccess('Rekening dihapus') }}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
            {settings.banks.length === 0 && <p className="text-sm text-gray-400 text-center py-4">Belum ada rekening manual</p>}
          </div>
        </CardBody>
      </Card>

      {/* Expeditions */}
      <Card className="border border-[#e7e2d8]" shadow="sm">
        <CardBody className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2"><Truck className="w-5 h-5 text-[#1e3a2b]" /> Ekspedisi Pengiriman</h3>
            <Button size="sm" color="primary" variant="flat" startContent={<Plus className="w-3 h-3" />} onClick={expModal.onOpen}>Tambah</Button>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {settings.expeditions.map((exp) => (
              <div key={exp.id} className="border border-[#e7e2d8] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="px-2 py-1 rounded bg-[#1e3a2b] text-white text-xs font-bold">{exp.logo}</div>
                    <div className="font-semibold text-sm">{exp.name}</div>
                  </div>
                  <Button isIconOnly size="sm" variant="light" color="danger" onClick={() => { deleteExpedition(exp.id); toastSuccess('Ekspedisi dihapus') }}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  {exp.services.map((s, i) => <div key={i}>• {s.name} ({s.est}) - {formatRupiah(s.price)}</div>)}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* QRIS Info */}
      <Card className="border border-[#e7e2d8] bg-[#fdfaf3]" shadow="sm">
        <CardBody className="p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2"><QrCode className="w-5 h-5 text-[#1e3a2b]" /> Status QRis Dynamic</h3>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl bg-[#1e3a2b] flex items-center justify-center text-white">
              <QrCode className="w-10 h-10" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">QRIS dinamika dikelola sepenuhnya melalui iPaymu. Setiap transaksi yang menggunakan QRIS akan terverifikasi otomatis.</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Modal Tambah Bank */}
      <Modal isOpen={bankModal.isOpen} onClose={bankModal.onClose}>
        <ModalContent>
          <ModalHeader>Tambah Rekening Manual</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Nama Bank" placeholder="BCA" value={bankForm.bank} onChange={(e) => setBankForm({ ...bankForm, bank: e.target.value })} />
              <Input label="Logo (3-4 huruf)" placeholder="BCA" value={bankForm.logo} onChange={(e) => setBankForm({ ...bankForm, logo: e.target.value })} />
            </div>
            <Input label="Nomor Rekening" placeholder="1234567890" value={bankForm.number} onChange={(e) => setBankForm({ ...bankForm, number: e.target.value })} />
            <Input label="Nama Pemilik" placeholder="Toko Loka" value={bankForm.name} onChange={(e) => setBankForm({ ...bankForm, name: e.target.value })} />
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-500">Warna Logo:</label>
              <input type="color" value={bankForm.color} onChange={(e) => setBankForm({ ...bankForm, color: e.target.value })} className="w-12 h-8 rounded cursor-pointer" />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={bankModal.onClose}>Batal</Button>
            <Button color="primary" onClick={handleSaveBank}>Simpan</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal Tambah Ekspedisi */}
      <Modal isOpen={expModal.isOpen} onClose={expModal.onClose} size="lg">
        <ModalContent>
          <ModalHeader>Tambah Ekspedisi</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Nama Ekspedisi" placeholder="JNE Express" value={expForm.name} onChange={(e) => setExpForm({ ...expForm, name: e.target.value })} />
              <Input label="Logo (3-4 huruf)" placeholder="JNE" value={expForm.logo} onChange={(e) => setExpForm({ ...expForm, logo: e.target.value })} />
            </div>
            <Divider className="my-2" />
            <div className="text-sm font-semibold">Layanan & Harga</div>
            {expForm.services.map((svc, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-2">
                <Input
                  placeholder="Nama Layanan (REG)"
                  value={svc.name}
                  onChange={(e) => {
                    const services = [...expForm.services]
                    services[idx].name = e.target.value
                    setExpForm({ ...expForm, services })
                  }}
                />
                <Input
                  placeholder="Estimasi (2-3 hari)"
                  value={svc.est}
                  onChange={(e) => {
                    const services = [...expForm.services]
                    services[idx].est = e.target.value
                    setExpForm({ ...expForm, services })
                  }}
                />
                <Input
                  type="number"
                  placeholder="Harga (Rp)"
                  value={svc.price}
                  onChange={(e) => {
                    const services = [...expForm.services]
                    services[idx].price = e.target.value
                    setExpForm({ ...expForm, services })
                  }}
                />
              </div>
            ))}
            <Button
              size="sm"
              variant="flat"
              startContent={<Plus className="w-3 h-3" />}
              onClick={() => setExpForm({ ...expForm, services: [...expForm.services, { name: '', est: '', price: '' }] })}
            >
              Tambah Layanan Lain
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={expModal.onClose}>Batal</Button>
            <Button color="primary" onClick={handleSaveExp}>Simpan</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}