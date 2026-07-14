import { useStore } from './store/useStore'
import CustomerLayout from './components/CustomerLayout'
import AdminLayout from './components/AdminLayout'

export default function App() {
  const view = useStore((s) => s.view)
  return view === 'admin' ? <AdminLayout /> : <CustomerLayout />
}