import { useState } from 'react'
import {
  Button, Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, Select, SelectItem,
  useDisclosure,
} from '../../components/ui'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { formatRupiah, toastSuccess } from '../../lib/utils'

const categories = ['Minuman', 'Makanan', 'Fashion', 'Dekorasi']

export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', category: 'Minuman', price: '', stock: '', image: '', desc: '' })

  const openAdd = () => {
    setEditing(null)
    setForm({ name: '', category: 'Minuman', price: '', stock: '', image: '', desc: '' })
    onOpen()
  }

  const openEdit = (product) => {
    setEditing(product)
    setForm({ name: product.name, category: product.category, price: product.price, stock: product.stock, image: product.image, desc: product.desc })
    onOpen()
  }

  const handleSave = () => {
    if (!form.name || !form.price) return
    const data = {
      name: form.name,
      category: form.category,
      price: parseInt(form.price),
      stock: parseInt(form.stock) || 0,
      image: form.image || `https://picsum.photos/seed/${Date.now()}/600/600.jpg`,
      desc: form.desc,
    }
    if (editing) {
      updateProduct(editing.id, data)
      toastSuccess('Produk diperbarui')
    } else {
      addProduct(data)
      toastSuccess('Produk ditambahkan')
    }
    onClose()
  }

  const handleDelete = (id) => {
    if (confirm('Hapus produk ini?')) {
      deleteProduct(id)
      toastSuccess('Produk dihapus')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Produk</h1>
          <p className="text-gray-500 text-sm">Kelola katalog produk toko</p>
        </div>
        <Button color="primary" startContent={<Plus className="w-4 h-4" />} onClick={openAdd}>
          Tambah Produk
        </Button>
      </div>

      <Card className="border border-[#e7e2d8]" shadow="sm">
        <CardBody className="p-0">
          <Table aria-label="Products table">
            <TableHeader>
              <TableColumn>Produk</TableColumn>
              <TableColumn>Kategori</TableColumn>
              <TableColumn>Harga</TableColumn>
              <TableColumn>Stok</TableColumn>
              <TableColumn>Terjual</TableColumn>
              <TableColumn align="end">Aksi</TableColumn>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={p.image} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="font-medium line-clamp-1 max-w-xs">{p.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500">{p.category}</TableCell>
                  <TableCell className="font-semibold">{formatRupiah(p.price)}</TableCell>
                  <TableCell className={p.stock < 10 ? 'text-red-600 font-bold' : ''}>{p.stock}</TableCell>
                  <TableCell className="text-gray-500">{p.sold}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-end">
                      <Button isIconOnly size="sm" variant="light" onClick={() => openEdit(p)}>
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button isIconOnly size="sm" variant="light" color="danger" onClick={() => handleDelete(p.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          <ModalHeader>{editing ? 'Edit' : 'Tambah'} Produk</ModalHeader>
          <ModalBody>
            <Input label="Nama Produk" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <div className="grid grid-cols-2 gap-4">
              <Select label="Kategori" selectedKeys={[form.category]} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {categories.map((c) => <SelectItem key={c}>{c}</SelectItem>)}
              </Select>
              <Input type="number" label="Harga (Rp)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input type="number" label="Stok" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
              <Input label="URL Gambar" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            </div>
            <Textarea label="Deskripsi" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={onClose}>Batal</Button>
            <Button color="primary" onClick={handleSave}>Simpan</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}