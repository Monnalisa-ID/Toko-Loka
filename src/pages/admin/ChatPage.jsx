import { useState, useRef, useEffect } from 'react'
import { Card, CardBody, Input, Button } from '../../components/ui'
import { Send, Lightbulb } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { formatTime } from '../../lib/utils'

export default function ChatPage() {
  const { chat, adminReplyChat } = useStore()
  const [input, setInput] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat.messages])

  const handleSend = () => {
    if (!input.trim()) return
    adminReplyChat(input)
    setInput('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Chat Pelanggan</h1>
        <p className="text-gray-500 text-sm">Balas pesan dari pelanggan secara langsung</p>
      </div>

      <Card className="border border-[#e7e2d8] h-[600px] flex flex-col" shadow="sm">
        <div className="p-4 border-b border-[#e7e2d8] bg-gradient-to-r from-[#1e3a2b] to-[#2d5a3d] text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-sm font-bold">P</span>
            </div>
            <div>
              <div className="font-bold text-sm">Pelanggan</div>
              <div className="text-xs opacity-80">{chat.messages.filter((m) => m.from === 'customer').length} pesan</div>
            </div>
          </div>
        </div>

        <CardBody className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#faf6ef]">
          {chat.messages.length <= 1 ? (
            <div className="text-center py-12 text-gray-500">
              <p>Belum ada pesan dari pelanggan</p>
            </div>
          ) : (
            chat.messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === 'customer' ? 'justify-start' : 'justify-end'}`}>
                <div className="max-w-[80%]">
                  <div className={`px-4 py-2.5 text-sm ${
                    msg.from === 'customer'
                      ? 'bg-white border border-[#e7e2d8] rounded-2xl rounded-bl-md'
                      : msg.from === 'admin'
                      ? 'bg-gradient-to-br from-[#e85d04] to-[#f48c06] text-white rounded-2xl rounded-br-md'
                      : 'bg-white border border-[#e7e2d8] rounded-2xl rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`text-[10px] text-gray-400 mt-1 ${msg.from === 'customer' ? 'ml-1' : 'mr-1 text-right'}`}>
                    {msg.from === 'customer' ? 'Pelanggan' : msg.from === 'admin' ? 'Admin' : 'Bot'} • {formatTime(msg.time)}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={endRef} />
        </CardBody>

        <div className="p-3 border-t border-[#e7e2d8] flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik balasan..."
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button isIconOnly color="warning" onClick={handleSend}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      <Card className="border border-[#e7e2d8] bg-[#fdfaf3]" shadow="sm">
        <CardBody className="p-4">
          <h4 className="font-bold mb-2 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-[#e85d04]" /> Tips</h4>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Pesan yang Anda balas akan langsung diterima pelanggan di chat widget</li>
            <li>• Untuk pertanyaan umum, atur respons otomatis di menu "Pengaturan Bot"</li>
            <li>• Chatbot akan otomatis menjawab pertanyaan yang sesuai dengan rules</li>
          </ul>
        </CardBody>
      </Card>
    </div>
  )
}