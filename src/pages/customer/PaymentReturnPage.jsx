import { useEffect, useState } from 'react'
import { Button, Card, CardBody } from '../../components/ui'
import { CheckCircle2, XCircle } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { toastSuccess } from '../../lib/utils'

export default function PaymentReturnPage() {
  const { params, navigate, orders, confirmPayment } = useStore()
  const [status, setStatus] = useState('checking') // checking, success, failed
  const order = orders.find((o) => o.id === params.orderId)

  useEffect(() => {
    const verifyPayment = async () => {
      if (!order) {
        setStatus('failed')
        return
      }

      // Dalam implementasi nyata dengan backend, di sini frontend akan memanggil API backend
      // untuk mengecek status Transaksi ke iPaymu (API Check Transaction iPaymu).
      // Karena ini demo frontend murni, kita asumsikan jika user kembali ke URL ini,
      // pembayaran berhasil. Status akan otomatis terupdate dan kirim notif ke admin.
      
      setTimeout(() => {
        if (order.status === 'pending') {
          confirmPayment(order.id) // Ini akan trigger notifikasi ke admin di store
          toastSuccess('Pembayaran berhasil dikonfirmasi!')
        }
        setStatus('success')
      }, 2000)
    }

    verifyPayment()
  }, [])

  if (status === 'checking') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 mx-auto border-4 border-[#1e3a2b] border-t-transparent rounded-full animate-spin mb-4" />
        <h2 className="font-display text-2xl font-bold">Memverifikasi Pembayaran...</h2>
        <p className="text-gray-500 mt-2">Mohon tunggu, kami sedang mengkonfirmasi pembayaran Anda.</p>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
          <XCircle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="font-display text-2xl font-bold mb-2">Pembayaran Gagal</h2>
        <p className="text-gray-500 mb-6">Pesanan tidak ditemukan atau terjadi kesalahan.</p>
        <Button color="primary" onClick={() => navigate('home')}>Kembali ke Beranda</Button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4 animate-in zoom-in">
        <CheckCircle2 className="w-10 h-10 text-green-500" />
      </div>
      <h2 className="font-display text-2xl font-bold mb-2">Pembayaran Berhasil!</h2>
      <p className="text-gray-500 mb-6">Pembayaran Anda telah diterima. Admin telah diberi notifikasi untuk segera memproses pesanan.</p>
      <Button color="primary" size="lg" radius="full" onClick={() => navigate('order-status', { orderId: order?.id })}>
        Lihat Status Pesanan
      </Button>
    </div>
  )
}