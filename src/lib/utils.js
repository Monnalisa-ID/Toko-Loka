import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatRupiah(num) {
  return 'Rp ' + (num || 0).toLocaleString('id-ID')
}

export function formatTime(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

export function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function toastSuccess(msg) {
  toast.success(msg)
}

export function toastWarning(msg) {
  toast.warning(msg)
}

export function toastError(msg) {
  toast.error(msg)
}

export function toastInfo(msg) {
  toast.info(msg)
}