import { useState } from 'react'
import {
  Button, Card, CardBody, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Input, Textarea, useDisclosure,
} from '../../components/ui'
import { Plus, Edit, Trash2, Bot, Info } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { toastSuccess } from '../../lib/utils'

export default function ChatbotPage() {
  const { settings, addChatbotRule, updateChatbotRule, deleteChatbotRule } = useStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ keywords: '', response: '' })

  const openAdd = () => {
    setEditing(null)
    setForm({ keywords: '', response: '' })
    onOpen()
  }

  const openEdit = (rule) => {
    setEditing(rule)
    setForm({ keywords: rule.keywords, response: rule.response })
    onOpen()
  }

  const handleSave = () => {
    if (!form.keywords || !form.response) return
    if (editing) {
      updateChatbotRule(editing.id, form)
      toastSuccess('Rule diperbarui')
    } else {
      addChatbotRule(form)
      toastSuccess('Rule ditambahkan')
    }
    onClose()
  }

  const handleDelete = (id) => {
    if (confirm('Hapus rule ini?')) {
      deleteChatbotRule(id)
      toastSuccess('Rule dihapus')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Pengaturan Chatbot</h1>
          <p className="text-gray-500 text-sm">Atur respons otomatis untuk pertanyaan pelanggan</p>
        </div>
        <Button color="primary" startContent={<Plus className="w-4 h-4" />} onClick={openAdd}>
          Tambah Rule
        </Button>
      </div>

      <Card className="border border-[#e7e2d8] bg-[#e8efe9]" shadow="sm">
        <CardBody className="p-4 flex gap-3">
          <Info className="w-5 h-5 text-[#1e3a2b] shrink-0 mt-0.5" />
          <div className="text-sm">
            <div className="font-semibold text-[#1e3a2b]">Cara kerja chatbot</div>
            <p className="text-xs text-gray-600 mt-1">
              Saat pelanggan mengirim pesan, sistem mencari keyword yang cocok. Jika ditemukan, bot membalas otomatis. Jika tidak ada yang cocok, pesan diteruskan ke admin.
            </p>
          </div>
        </CardBody>
      </Card>

      <div className="space-y-3">
        {settings.chatbotRules.map((rule) => (
          <Card key={rule.id} className="border border-[#e7e2d8]" shadow="sm">
            <CardBody className="p-4">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">Keywords</div>
                  <div className="flex flex-wrap gap-1">
                    {rule.keywords.split(',').map((k, i) => (
                      <Chip key={i} size="sm" variant="flat" className="font-medium">{k.trim()}</Chip>
                    ))}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button isIconOnly size="sm" variant="light" onClick={() => openEdit(rule)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button isIconOnly size="sm" variant="light" color="danger" onClick={() => handleDelete(rule.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="bg-[#faf6ef] rounded-xl p-3 text-sm">
                <div className="text-xs text-gray-500 mb-1">Respons</div>
                <div>{rule.response}</div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>{editing ? 'Edit' : 'Tambah'} Rule</ModalHeader>
          <ModalBody>
            <Input
              label="Keywords (pisahkan dengan koma)"
              placeholder="halo, hai, hello"
              value={form.keywords}
              onChange={(e) => setForm({ ...form, keywords: e.target.value })}
            />
            <Textarea
              label="Respons Bot"
              value={form.response}
              onChange={(e) => setForm({ ...form, response: e.target.value })}
            />
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