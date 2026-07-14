import { useState, useRef, useEffect } from 'react'
import { Button, Input } from '../components/ui'
import { MessageCircle, X, Bot, Headphones, Send } from 'lucide-react'
import { useStore } from '../store/useStore'
import { formatTime } from '../lib/utils'

export default function ChatWidget() {
  const { chatOpen, setChatOpen, chat, sendChatMessage, setChatMode } = useStore()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat.messages, chatOpen])

  const handleSend = () => {
    if (!input.trim()) return
    sendChatMessage(input)
    setInput('')
  }

  if (!chatOpen) {
    return (
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#1e3a2b] text-white shadow-2xl flex items-center justify-center hover:scale-110 transition"
      >
        <span className="absolute inset-0 rounded-full bg-[#1e3a2b] opacity-30 animate-ping" />
        <MessageCircle className="w-7 h-7 relative z-10" />
        {chat.messages.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#e85d04] rounded-full text-xs font-bold flex items-center justify-center">
            {chat.messages.length}
          </span>
        )}
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[600px] max-h-[calc(100vh-3rem)] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e3a2b] to-[#2d5a3d] text-white p-4 flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            {chat.mode === 'bot' ? <Bot className="w-5 h-5" /> : <Headphones className="w-5 h-5" />}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1e3a2b]" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-sm">{chat.mode === 'bot' ? 'Toko Loka Bot' : 'Admin Toko Loka'}</div>
          <div className="text-xs opacity-80">{chat.mode === 'bot' ? 'Asisten otomatis • Online' : 'Admin sedang online'}</div>
        </div>
        <Button isIconOnly size="sm" variant="light" className="text-white" onClick={() => setChatOpen(false)}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Mode toggle */}
      <div className="px-4 py-2 bg-[#fdfaf3] flex gap-2">
        <Button
          size="sm"
          radius="full"
          color={chat.mode === 'bot' ? 'primary' : 'default'}
          variant={chat.mode === 'bot' ? 'solid' : 'flat'}
          startContent={<Bot className="w-3 h-3" />}
          onClick={() => setChatMode('bot')}
        >
          Chat Bot
        </Button>
        <Button
          size="sm"
          radius="full"
          color={chat.mode === 'admin' ? 'primary' : 'default'}
          variant={chat.mode === 'admin' ? 'solid' : 'flat'}
          startContent={<Headphones className="w-3 h-3" />}
          onClick={() => setChatMode('admin')}
        >
          Admin
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#faf6ef]">
        {chat.messages.length <= 1 && chat.mode === 'bot' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#e8efe9] flex items-center justify-center mb-3">
              <Bot className="w-8 h-8 text-[#1e3a2b]" />
            </div>
            <h3 className="font-bold text-sm mb-1">Halo! Saya Bot Asisten</h3>
            <p className="text-xs text-gray-500 mb-4">Tanyakan seputar produk, pembayaran, atau pengiriman</p>
            <div className="space-y-2">
              {['Pembayaran bisa lewat apa?', 'Berapa ongkirnya?', 'Jam buka toko?'].map((q) => (
                <button
                  key={q}
                  onClick={() => sendChatMessage(q)}
                  className="block w-full text-xs px-3 py-2 rounded-full bg-white border border-[#e7e2d8] hover:border-[#1e3a2b] hover:text-[#1e3a2b] transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        {chat.messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.from === 'customer' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[80%]">
              {msg.from !== 'customer' && (
                <div className="text-[10px] text-gray-500 mb-1 ml-1">
                  {msg.from === 'admin' ? 'Admin' : 'Bot'} • {formatTime(msg.time)}
                </div>
              )}
              <div
                className={`px-4 py-2.5 text-sm ${
                  msg.from === 'customer'
                    ? 'bg-[#1e3a2b] text-white rounded-2xl rounded-br-md'
                    : msg.from === 'admin'
                    ? 'bg-gradient-to-br from-[#e85d04] to-[#f48c06] text-white rounded-2xl rounded-bl-md'
                    : 'bg-white text-[#1a1d2e] border border-[#e7e2d8] rounded-2xl rounded-bl-md'
                }`}
              >
                {msg.text}
              </div>
              {msg.from === 'customer' && (
                <div className="text-[10px] text-gray-500 mt-1 mr-1 text-right">{formatTime(msg.time)}</div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick replies */}
      {chat.mode === 'bot' && chat.messages.length > 1 && (
        <div className="px-4 py-2 bg-white border-t border-[#e7e2d8] flex gap-2 overflow-x-auto scrollbar-hide">
          {['Promo', 'Ongkir', 'Pembayaran', 'Retur'].map((q) => (
            <button
              key={q}
              onClick={() => sendChatMessage(q)}
              className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-[#fdfaf3] hover:bg-[#1e3a2b] hover:text-white transition"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 bg-white border-t border-[#e7e2d8] flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ketik pesan..."
          size="sm"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button isIconOnly color="primary" size="sm" onClick={handleSend}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}