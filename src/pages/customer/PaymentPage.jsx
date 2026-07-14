import { useState, useEffect } from 'react'
import { Spinner } from '../../components/ui'
import { useStore } from '../../store/useStore'
import { toastError } from '../../lib/utils'
import CryptoJS from 'crypto-js'

export default function PaymentPage() {
  const { orders, params, navigate, settings, updateOrderIpaymuTrxId } = useStore()
  const [loading, setLoading] = useState(true)
  const order = orders.find((o) => o.id === params.orderId)

  useEffect(() => {
    if (!order) {
      navigate('cart')
      return
    }

    const initiatePayment = async () => {
      try {
        const { ipaymu } = settings
        const body = {
          name: order.customer.name,
          phone: order.customer.phone,
          email: order.customer.email,
          amount: order.total,
          notifyUrl: 'https://yourweb.com/notify', // Webhook URL backend kamu (opsional untuk frontend demo)
          expired: 24,
          expiredType: 'hours',
          comments: `Pembayaran ${order.id}`,
          referenceId: order.id,
          returnUrl: `${window.location.origin}/?page=payment-return&orderId=${order.id}`,
        }

        const bodyStr = JSON.stringify(body)
        const signature = CryptoJS.MD5(ipaymu.va + ipaymu.apiKey + bodyStr).toString()
        const timestamp = Math.floor(Date.now() / 1000)

        const endpoint = ipaymu.sandbox 
          ? 'https://sandbox.ipaymu.com/api/v2/payment' 
          : 'https://my.ipaymu.com/api/v2/payment'

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'va': ipaymu.va,
            'signature': signature,
            'timestamp': timestamp.toString(),
          },
          body: bodyStr,
        })

        const data = await response.json()

        if (data.Status === 200) {
          updateOrderIpaymuTrxId(order.id, data.Data.TrxId)
          // Redirect ke halaman pembayaran iPaymu
          window.location.href = data.Data.PaymentURL
        } else {
          toastError(data.Message || 'Gagal membuat transaksi iPaymu')
          navigate('cart')
        }
      } catch (error) {
        toastError('Terjadi kesalahan saat menghubungi iPaymu')
        navigate('cart')
      }
    }

    initiatePayment()
  }, [])

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <Spinner size="lg" />
      <h2 className="font-display text-2xl font-bold mt-4">Memproses Pembayaran...</h2>
      <p className="text-gray-500 mt-2">Mohon tunggu, kami mengarahkan Anda ke gateway iPaymu.</p>
    </div>
  )
}